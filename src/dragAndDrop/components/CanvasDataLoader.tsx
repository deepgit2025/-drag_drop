import { useEffect } from "react";
import { useAndUpdateDatasource } from "../api/hooks/useDatasources";
import { useCanvasStore } from "../store/useCanvasStore";

export default function CanvasDataLoader() {
  const { data, isPending } = useAndUpdateDatasource("droppedComponents");
  const addWidget = useCanvasStore((s:any) => s.addWidget);

  useEffect(() => {
    if (!isPending && data) {
      addWidget(data); // hydrate Zustand
    }
  }, [isPending, data, addWidget]);

  return null;
}