/**
 * A position with an `x` and `y` coordinate.
 */
export interface Pos {
  x: number;
  y: number;
}

/**
 * A function normalizing a screen space position to the input 
 * HTMLCanvasElement's local space.
 * @param canvas HTML canvas element to normalize `pos` relative to.
 * @param pos Position in screen space to normalize.
 * @returns Position in `canvas`'s local space.
 */
export function getCanvasPos(canvas: HTMLCanvasElement, pos: Pos): Pos {
  const rect = canvas.getBoundingClientRect();

  return {
    x: pos.x - rect.left,
    y: pos.y - rect.top
  };
}