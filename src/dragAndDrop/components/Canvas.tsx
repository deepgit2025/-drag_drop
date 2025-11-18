import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { adjustLayout } from "../utils/layoutUtils";
import Widget from "./Widget";
import {resolveWidgetSize, isColliding, canPlaceWidget, sizePxToPercent} from "../utils/canvasFunctions"

const Canvas = ({ droppedItems, setDroppedItems }) => {
  const dropRef = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WIDGET",
    hover(item, monitor) {
      const canvasRect = dropRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      const offset = monitor.getClientOffset();
      if (!offset) return;
      const exists = droppedItems.some((w) => w.id === item.id);
      if (!exists) return;
      const initialMouse = monitor.getInitialClientOffset();
      const initialWidget = monitor.getInitialSourceClientOffset();
      const grabOffsetX = initialMouse.x - initialWidget.x;
      const grabOffsetY = initialMouse.y - initialWidget.y;
      const widgetX = offset.x - grabOffsetX;
      const widgetY = offset.y - grabOffsetY;
      const newX = ((widgetX - canvasRect.left) / canvasRect.width) * 100;
      const newY = ((widgetY - canvasRect.top) / canvasRect.height) * 100;
      setDroppedItems((prev) => {
        const updated = prev.map((w) =>
          w.id === item.id ? { ...w, position: { x: newX, y: newY } } : w
        );
        return adjustLayout(updated, item.id, { x: newX, y: newY });
      });
    },
    drop(item, monitor) {
      const canvasRect = dropRef.current?.getBoundingClientRect();
      const offset = monitor.getClientOffset();
      if (!offset || !canvasRect) return;
      const initialMouse = monitor.getInitialClientOffset();
      const initialWidget = monitor.getInitialSourceClientOffset();
      const grabOffsetX = initialMouse.x - initialWidget.x;
      const grabOffsetY = initialMouse.y - initialWidget.y;
      const widgetX = offset.x - grabOffsetX;
      const widgetY = offset.y - grabOffsetY;
      const newX = ((widgetX - canvasRect.left) / canvasRect.width) * 100;
      const newY = ((widgetY - canvasRect.top) / canvasRect.height) * 100;
      setDroppedItems((prev) => {
        const exists = prev.some((w) => w.id === item.id);
        if (exists) {
          const updated = prev.map((w) =>
            w.id === item.id
              ? { ...w, position: { x: newX, y: newY } }
              : w
          );
          const updatedItem = updated.find(w=>w.id=== item.id);
          if (!canPlaceWidget(updatedItem, prev, canvasRect)){
            console.warn("Drop rejected: Collision detected");
            return prev;
          }
          return adjustLayout(updated, item.id, { x: 0, y: 0 }, canvasRect);
        } else {
          const uniqueId = `${item.id}-${Date.now()}`;
          const newWidget = {
            ...item,
            id: uniqueId,
            position: { x: newX, y: newY },
            size: resolveWidgetSize(item),
            data: item.data || {},
          };
          if (!canPlaceWidget(newWidget, prev, canvasRect)) {
            console.warn("Drop rejected: Collision detected");
            return prev;
          }
          return [...prev, newWidget];
        }
      });
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  drop(dropRef);
  const handleDataUpdate = (id, newData) => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, ...newData } } : item
      )
    );
  };
  return (
    <div
      ref={dropRef}
      className={`bg-gray-50 w-full h-full border-dashed rounded-md transition-all duration-200 relative ${
        isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
      }`}
    >
      {droppedItems.map((item) => {
        const Comp = item.component;
        const WrappedComp = Widget(Comp);
        return (
          <div
            key={item.id}
            className="absolute transition-all duration-100"
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
            }}
          >
            <WrappedComp
              id={item.id}
              name={item.name}
              data={item.data}
              onDataUpdate={(data) => handleDataUpdate(item.id, data)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;