import { create } from "zustand";
import { useAndUpdateDatasource } from "../api/hooks/useDatasources";

export const useCanvasStore = create((set) => ({
  widgets: [],
  addWidget: (widgetArray:any) =>
    set(() => ({
      widgets: widgetArray,
    })),

  updateWidget: (id:any, updates:any) =>
    set((state:any) => ({
      widgets: state.widgets.map((w:any) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    })),

  updateWidgetData: (id:any, dataUpdates:any) =>
    set((state:any) => ({
      widgets: state.widgets.map((w:any) =>
        w.id === id
          ? { ...w, data: { ...w.data, ...dataUpdates } }
          : w
      ),
    })),
}));
