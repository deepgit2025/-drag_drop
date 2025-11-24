import React, { useState } from 'react'
import {componentList} from "../libs/Components"
import Widget from './Widget';
import DataWrapper from './DataWrapper';

export const WidgetWrapper = () => {
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
        {componentList.map(({ id, name, component: Comp }) => {
          if (!Comp) {
            console.error("Invalid component:", name);
            return null;
          }
          const WrappedComp = Widget(Comp);
         // const WrappedComp = DataWrapper(WrappedCompInitial);
          return (
            <div key={id} className= {`p-2 border rounded shadow-sm`} >
              <h3 className="text-sm font-semibold mb-1">{name}</h3>
              <WrappedComp id={id} name={name} />
            </div>
          );
        })}
      </div>
  )
}
