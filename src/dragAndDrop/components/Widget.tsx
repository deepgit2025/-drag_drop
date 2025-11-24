import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { adjustLayout } from "../utils/layoutUtils";
import Layover from "../UIComps/popup/Layover";

export default function Widget(WrappedComponent) {
  return function Enhanced(props) {
    const [selected, setSelected] = useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "WIDGET",
      item: { id: props.id, name: props.name, component: WrappedComponent },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
    const handleWidgetClick = (e:Object)=>{
        setSelected(prev=>{
          if(!props.data || Object.keys(props.data).length === 0) return false;
          return !prev;
        });
    }
    return (
      <>  
        <div
          ref={drag}
          className={`group border-gray-300 rounded-lg p-2 hover:shadow-md transition cursor-move ${
            isDragging ? "opacity-50" : "" 
          } ${selected ? "border-red" : "border"}`} onClick={e=>handleWidgetClick(e)}
        >
          <p className="text-xs text-gray-500 mb-1">{props.name}</p>
          <WrappedComponent {...props} />
        </div>
        {selected && 
        <div>
            <Layover {...props} selected={selected} setSelected={setSelected} name={props.name} />
        </div>}
      </>
    );
  };
}

