import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { adjustLayout } from "../utils/layoutUtils";
import Layover from "../UIComps/popup/Layover";
import { componentRegistry } from "../libs/Components";
export default function Widget(WrappedComponent) {
  return function Enhanced(props) {
    const [selected, setSelected] = useState(false);
    const wrapperRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(e) {
        if (!selected) return;                      
        if (!wrapperRef.current) return;
        if (!wrapperRef.current.contains(e.target)) {
          setSelected(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selected]);

    const [{ isDragging }, drag] = useDrag(() => ({
      type: "WIDGET",
      item: { 
        id: props.id, 
        name: props.name, 
        type: props.type       // <-- important!
      },
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
    const handleWidgetDelete = (e:Object) => {
      props.onDataDelete(props.id);
    }
  const Component = componentRegistry[props.type];

  if (!Component) {
    return <div>Component not found for type: {props.type}</div>;
  }
  return (
    <>
      <div ref={wrapperRef}>
        {props.onDataDelete && (
          <button
            title="delete"
            onClick={handleWidgetDelete}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "10px",
              color: "#666",
              transition: "color 0.2s ease",
              position:"absolute",
              right:"0",
            }}
            className="delete-btn"
          >
            🗑️
          </button>
        )}
        <div
          ref={drag}
          className={`group border-gray-300 rounded-lg p-2 hover:shadow-md transition cursor-move ${
            isDragging ? "opacity-50" : ""
          } ${selected ? "border-red" : "border"}`}
          onClick={handleWidgetClick}
        >
          <p className="text-xs text-gray-500 mb-1">{props.name}</p>
          <Component {...props} />   {/* ✔ always works */}
        </div>

        {selected && (
          <Layover {...props} selected={selected} setSelected={setSelected} name={props.name}  />
        )}
      </div>
    </>
    )};
  }

