import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { adjustLayout } from "../utils/layoutUtils";
import Widget from "./Widget";

const Canvas = ({ droppedItems, setDroppedItems }) => {
  const dropRef = useRef(null);
// 
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WIDGET",

    // 🔹 Handle reposition (hover)
    hover(item, monitor) {
      const canvasRect = dropRef.current?.getBoundingClientRect();
      if (!canvasRect) return;
      const offset = monitor.getClientOffset();
      if (!offset) return;

      const exists = droppedItems.some((w) => w.id === item.id);
      if (!exists) return;

      // const newX =
      //   ((offset.x - canvasRect.left) / canvasRect.width) * 100;
      // const newY =
      //   ((offset.y - canvasRect.top) / canvasRect.height) * 100;

      const initialMouse = monitor.getInitialClientOffset();
      const initialWidget = monitor.getInitialSourceClientOffset();

      const grabOffsetX = initialMouse.x - initialWidget.x;
      const grabOffsetY = initialMouse.y - initialWidget.y;

      // now pointer position - grab offset gives the actual widget top-left
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

    // 🔹 Handle drop
    drop(item, monitor) {
      const canvasRect = dropRef.current?.getBoundingClientRect();
      const offset = monitor.getClientOffset();
      if (!offset || !canvasRect) return;

      // const newX =
      //   ((offset.x - canvasRect.left) / canvasRect.width) * 100;
      // const newY =
      //   ((offset.y - canvasRect.top) / canvasRect.height) * 100;

      const initialMouse = monitor.getInitialClientOffset();
      const initialWidget = monitor.getInitialSourceClientOffset();

      const grabOffsetX = initialMouse.x - initialWidget.x;
      const grabOffsetY = initialMouse.y - initialWidget.y;

      // now pointer position - grab offset gives the actual widget top-left
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
          // const uniqueId = `${item.id}-${Date.now()}`;
          // return [
          //   ...prev,
          //   {
          //     ...item,
          //     id: uniqueId,
          //     position: { x: newX, y: newY },
          //     size: resolveWidgetSize(item.name),
          //     data: item.data || {}, // store initial data
          //   },
          // ];
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
  const resolveWidgetSize = (widget)=>  {
    // A clean map for all default widget sizes
    const DEFAULT_SIZES = {
      Button: { width: 120, height: 40 },
      Text: { width: 200, height: 60 },
      Card: { width: 300, height: 180 },
      Image: { width: 150, height: 150 },
      datasource1: { width: 200, height: 100 },

      // fallback
      default: { width: 100, height: 50 },
    };

    // priority:
    // 1. widget.size (if widget already carries a size)
    // 2. widget.data?.type (if type is stored in data)
    // 3. compName argument (explicit type)
    // 4. fallback default
    const type =
      widget ||
      widget?.type ||
      "default";

    const size = DEFAULT_SIZES[type] || DEFAULT_SIZES.default;

    return {
      width: Number(size.width),
      height: Number(size.height),
    };
  }
  function isColliding(a, b, canvasRect) {
    const aSize = sizePxToPercent(a.size, canvasRect);
    const bSize = sizePxToPercent(b.size, canvasRect);

    return !(
      a.position.x + aSize.width <= b.position.x ||
      a.position.x >= b.position.x + bSize.width ||
      a.position.y + aSize.height <= b.position.y ||
      a.position.y >= b.position.y + bSize.height
    );
  }

  function canPlaceWidget(newWidget, allWidgets, canvasRect) {
    for (const w of allWidgets) {
      if (w.id === newWidget.id) continue; // skip itself
      if (isColliding(newWidget, w, canvasRect)) return false; // found overlap
    }
    return true;
  }
  function sizePxToPercent(size, canvasRect) {
    return {
      width: (size.width / canvasRect.width) * 100,
      height: (size.height / canvasRect.height) * 100
    };
  }
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