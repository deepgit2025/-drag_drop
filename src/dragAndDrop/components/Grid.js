export const GRID_SIZE = 20;

export const snapToGrid = (x: number, y: number) => {
  const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
  const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
  return [snappedX, snappedY];
};