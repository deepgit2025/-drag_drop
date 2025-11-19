import { create } from "zustand";

export const useCanvasStore = create((set) => ({
  widgets: [],
  addWidget: (widgetArray) =>
    set(() => ({
      widgets: widgetArray,
    })),

  updateWidget: (id, updates) =>
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    })),

  updateWidgetData: (id, dataUpdates) =>
    set((state) => ({
      widgets: state.widgets.map((w) =>
        w.id === id
          ? { ...w, data: { ...w.data, ...dataUpdates } }
          : w
      ),
    })),
}));
