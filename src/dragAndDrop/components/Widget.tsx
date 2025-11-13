import React from "react";
import { useDrag } from "react-dnd";
import { adjustLayout } from "../utils/layoutUtils";

export default function Widget(WrappedComponent) {
  return function Enhanced(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "WIDGET",
      item: { id: props.id, name: props.name, component: WrappedComponent },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className={`group border border-gray-300 rounded-lg p-2 hover:shadow-md transition cursor-move ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <p className="text-xs text-gray-500 mb-1">{props.name}</p>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

