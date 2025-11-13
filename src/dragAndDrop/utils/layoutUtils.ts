// // utils/layoutUtils.js
// export function adjustLayout(widgets, movedId, delta, canvasRect) {
//   if (!delta) return widgets;
//   if (!canvasRect) return widgets;

//   return widgets.map((w) => {
//     if (w.id === movedId) {
//       const newX =
//         w.position.x +
//         (delta.x / canvasRect.width) * 100;
//       const newY =
//         w.position.y +
//         (delta.y / canvasRect.height) * 100;

//       return {
//         ...w,
//         position: { x: newX, y: newY },
//       };
//     }

//     // basic overlap push down (optional)
//     const moved = widgets.find((x) => x.id === movedId);
//     if (moved) {
//       const overlapX =
//         Math.abs(moved.position.x - w.position.x) < 10; // 10% tolerance
//       const overlapY =
//         Math.abs(moved.position.y - w.position.y) < 10;
//       if (overlapX && overlapY) {
//         return {
//           ...w,
//           position: { ...w.position, y: w.position.y + 15 },
//         };
//       }
//     }

//     return w;
//   });
// }

export function adjustLayout(widgets, movedId, delta, canvasRect) {
  if (!canvasRect) return widgets;

  return widgets.map((w) => {
    if (w.id === movedId) return w; // moved one handled above

    const moved = widgets.find((x) => x.id === movedId);
    if (!moved) return w;

    // simple collision avoidance
    const overlapX = Math.abs(moved.position.x - w.position.x) < 8;
    const overlapY = Math.abs(moved.position.y - w.position.y) < 8;

    if (overlapX && overlapY) {
      return {
        ...w,
        position: { ...w.position, y: w.position.y + 12 },
      };
    }
    return w;
  });
}

export function snapToGrid(x: number, y: number, size = 20) {
  const snappedX = Math.round(x / size) * size;
  const snappedY = Math.round(y / size) * size;
  return [snappedX, snappedY];
}