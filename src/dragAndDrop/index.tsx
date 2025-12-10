import React, { useState } from "react";
import DndContext from "./context/DndContext";
import { componentList } from "./libs/Components";
import Widget from "./components/Widget";
import Canvas from "./components/Canvas";
import Navbar from "./UIComps/Navbar";
import datasource1 from './libs/datasources/datasource1.json'
import { WidgetWrapper } from "./components/WidgetWrapper";
import CanvasDataLoader from "./components/CanvasDataLoader";

export default function DragDropPlayground() {
  return (
    <>
        <Navbar/>
        <DndContext>
        <div className="flex w-full h-screen">
          {/* Left panel */}
          <div className="w-1/3 p-4 border-r overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Available Widgets</h2>
            <WidgetWrapper/>
          </div>

          {/* Right panel */}
          <div className="flex-1 p-4">
            <Canvas/>
            <CanvasDataLoader/>
          </div>
        </div>
      </DndContext>
    </>
  );
}

