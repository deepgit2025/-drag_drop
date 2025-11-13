// // app/client/src/experiments/dragdrop/context/DndContext.tsx
// import * as React from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// console.log("React instance:", React.version);
// (window as any).React = React;
// export const DndContext = ({ children }: { children: React.ReactNode }) => {
//   React.useEffect(() => {
//     console.log("DND backend active");
//   }, []);
//   console.log("✅ DndContext mounted using React:", React.version);
//   return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
// };

// export default DndContext;

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DndContext({
  children,
}: {
  children: React.ReactNode;
}) {

  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}
