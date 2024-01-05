import { ShaderSource } from "./shader";

// Vertex shader for update call
import UpdateVertexSource from "./shaders/update_vert.glsl?raw";
// Fragment shader for updating grid
import UpdateFragmentSource from "./shaders/update_frag.glsl?raw";

// Vertex shader for draw call
import DrawVertexSource from "./shaders/draw_vert.glsl?raw";
// Fragment shader coloring grid on draw call
import DrawFragmentSource from "./shaders/draw_frag.glsl?raw";

/**
 * Source code for the update program, which is responsible for
 * updating the state of Conway's Game of Life at each iteration.
 */
export const UpdateSource: ShaderSource = {
  Vertex: UpdateVertexSource,
  Fragment: UpdateFragmentSource
};

/**
 * Source code for the draw program, which is responsible for
 * drawing the state of the game to the screen on each frame.
 */
export const DrawSource: ShaderSource = {
  Vertex: DrawVertexSource,
  Fragment: DrawFragmentSource
};
