 export const resolveWidgetSize = (widget)=>  {
    const DEFAULT_SIZES = {
      Button: { width: 120, height: 40 },
      Text: { width: 200, height: 60 },
      Card: { width: 300, height: 180 },
      Image: { width: 150, height: 150 },
      datasource1: { width: 200, height: 100 },
      default: { width: 100, height: 50 },
    };
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
  export const isColliding = (a, b, canvasRect) => {
    const aSize = sizePxToPercent(a.size, canvasRect);
    const bSize = sizePxToPercent(b.size, canvasRect);
    return !(
      a.position.x + aSize.width <= b.position.x ||
      a.position.x >= b.position.x + bSize.width ||
      a.position.y + aSize.height <= b.position.y ||
      a.position.y >= b.position.y + bSize.height
    );
  }

   export const canPlaceWidget = (newWidget, allWidgets, canvasRect) =>{
    for (const w of allWidgets) {
      if (w.id === newWidget.id) continue;
      if (isColliding(newWidget, w, canvasRect)) return false;
    }
    return true;
  }
  export const sizePxToPercent = (size, canvasRect) => {
    return {
      width: (size.width / canvasRect.width) * 100,
      height: (size.height / canvasRect.height) * 100
    };
  }