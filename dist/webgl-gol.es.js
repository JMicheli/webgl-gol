import { css, LitElement, html } from "lit";
import { property, query, customElement } from "lit/decorators.js";
class Shader {
  constructor(glContext, vSource, fSource) {
    const gl = this.gl = glContext;
    const prog = glContext.createProgram();
    if (!prog) {
      throw new Error("Failed to create program");
    } else {
      this.program = prog;
    }
    const vShader = this.createGLShader(vSource, gl.VERTEX_SHADER);
    const fShader = this.createGLShader(fSource, gl.FRAGMENT_SHADER);
    gl.attachShader(prog, vShader);
    gl.deleteShader(vShader);
    gl.attachShader(prog, fShader);
    gl.deleteShader(fShader);
    gl.linkProgram(prog);
    const error = gl.getProgramInfoLog(prog);
    if (error) {
      throw new Error("Problem with program creation: " + error);
    }
  }
  createGLShader(source, type) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) {
      throw console.error("Failed to create shader of type " + type);
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const error = gl.getShaderInfoLog(shader);
    if (error) {
      throw new Error("Shader compiler error: " + error);
    }
    return shader;
  }
  uniform2f(name, x, y) {
    this.use();
    const location = this.gl.getUniformLocation(this.program, name);
    if (location == -1) {
      this.disable();
      return false;
    }
    this.gl.uniform2f(location, x, y);
    this.disable();
    return true;
  }
  use() {
    this.gl.useProgram(this.program);
  }
  disable() {
    this.gl.useProgram(null);
  }
  delete() {
    this.disable();
    this.gl.deleteProgram(this.program);
  }
}
function createShader(gl, shader_source) {
  return new Shader(gl, shader_source.Vertex, shader_source.Fragment);
}
const UpdateVertexSource = `#version 300 es
layout(location = 0) in vec2 a_pos;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;
const UpdateFragmentSource = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_scale;
out vec4 color;

int cell_value(vec2 offset) {
  //Compute uvs from pixel space coordinates
  vec2 state_coords = (gl_FragCoord.xy + offset) / u_scale;
  return int(texture(u_state, state_coords));
}

int neighbors() {
  int count = 0;

  //Sum up all states
  count += cell_value(vec2(0,  1));
  count += cell_value(vec2(1,  1));
  count += cell_value(vec2(1,  0));
  count += cell_value(vec2(1, -1));
  count += cell_value(vec2(0, -1));
  count += cell_value(vec2(-1,-1));
  count += cell_value(vec2(-1, 0));
  count += cell_value(vec2(-1, 1));

  return count;
}

void main() {
  //Grab number of neighbors
  int n = neighbors();

  if (n < 2) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  if (n > 3) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }
  if (n == 3) {
    color = vec4(1.0, 1.0, 1.0, 1.0);
    return;
  }
  else {
    float state_color = float(cell_value(vec2(0.0, 0.0)));
    color = vec4(state_color, state_color, state_color, 1.0);
    return;
  }
}`;
const DrawVertexSource = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_pos;
out vec2 v_texcoord;

void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
  v_texcoord = vec2((a_pos.x + 1.0)/2.0, (a_pos.y + 1.0)/2.0);
}`;
const DrawFragmentSource = `#version 300 es
precision highp float;

in vec2 v_texcoord;

uniform sampler2D u_texture;
out vec4 color;

void main() {
  color = texture(u_texture, v_texcoord);
}`;
const UpdateSource = {
  Vertex: UpdateVertexSource,
  Fragment: UpdateFragmentSource
};
const DrawSource = {
  Vertex: DrawVertexSource,
  Fragment: DrawFragmentSource
};
class AutomataApp {
  constructor(canvas, cellWidth) {
    this.width = 0;
    this.height = 0;
    this.widthInCells = 0;
    this.heightInCells = 0;
    this.curFBIndex = 0;
    this.canvas = canvas;
    this.cellWidth = cellWidth;
    this.regenerateBoundaries();
    const gl = this.gl = this.getWebGLContext(canvas);
    const fb = gl.createFramebuffer();
    if (fb == null) {
      throw new ReferenceError("Framebuffer creation failed");
    }
    this.framebuffer = fb;
    this.curFBIndex = 0;
    const t1 = gl.createTexture();
    const t2 = gl.createTexture();
    if (t1 == null || t2 == null) {
      throw new ReferenceError("Texture creation failed");
    }
    this.FBTextures = [t1, t2];
    for (let i = 0; i < 2; i++) {
      gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[i]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    }
    this.regenerateBufferTextures(0.5);
    const va = gl.createVertexArray();
    if (va == null) {
      throw new ReferenceError("Vertex Array Object creation failed");
    }
    this.vao = va;
    gl.bindVertexArray(this.vao);
    const vertices = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]);
    const vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    this.updateShader = createShader(gl, UpdateSource);
    this.drawShader = createShader(gl, DrawSource);
    this.draw();
  }
  destroy() {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteTexture(this.FBTextures[0]);
    gl.deleteTexture(this.FBTextures[1]);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(this.framebuffer);
    gl.deleteVertexArray(this.vao);
    this.updateShader.delete();
    this.drawShader.delete();
  }
  clear() {
    const gl = this.gl;
    const data = new Uint8Array(4 * this.heightInCells * this.widthInCells);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.widthInCells, this.heightInCells, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    this.draw();
  }
  changeCellWidth(width) {
    this.cellWidth = width;
    this.regenerateBoundaries();
    this.clear();
    this.draw();
  }
  mouseInput(input_pos, killCell = false) {
    const pixelLocation = {
      x: Math.floor(input_pos.x / this.cellWidth),
      y: this.heightInCells - (Math.floor(input_pos.y / this.cellWidth) + 1)
    };
    const gl = this.gl;
    const value = killCell ? 0 : 255;
    const pixelData = new Uint8Array([value, value, value, 255]);
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, pixelLocation.x, pixelLocation.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelData);
    this.draw();
  }
  randomize(percentageAlive = 0.5) {
    this.regenerateBufferTextures(percentageAlive);
    this.draw();
  }
  update() {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.viewport(0, 0, this.widthInCells, this.heightInCells);
    const nextIndex = this.curFBIndex ^ 1;
    const currentTexture = this.FBTextures[this.curFBIndex];
    const nextTexture = this.FBTextures[nextIndex];
    gl.bindTexture(gl.TEXTURE_2D, currentTexture);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, nextTexture, 0);
    this.updateShader.uniform2f("u_scale", this.widthInCells, this.heightInCells);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.updateShader.use();
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this.curFBIndex = nextIndex;
    this.draw();
  }
  draw() {
    const gl = this.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.drawShader.use();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  regenerateBoundaries() {
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;
    this.widthInCells = Math.round(this.width / this.cellWidth);
    this.heightInCells = Math.round(this.height / this.cellWidth);
  }
  regenerateBufferTextures(fractionAlive = 0.5) {
    const gl = this.gl;
    const pixelCount = this.widthInCells * this.heightInCells;
    for (let i = 0; i < 2; i++) {
      const textureArray = this.randomizedTextureArray(pixelCount, fractionAlive);
      gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[i]);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.widthInCells, this.heightInCells, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray);
    }
  }
  randomizedTextureArray(pixels, fractionAlive = 0.5) {
    const texArray = new Uint8Array(4 * pixels);
    for (let i = 0; i < texArray.length; i += 4) {
      const value = Math.random() < fractionAlive ? 255 : 0;
      texArray[i] = value;
      texArray[i + 1] = value;
      texArray[i + 2] = value;
      texArray[i + 3] = 255;
    }
    return texArray;
  }
  getWebGLContext(canvas) {
    const gl = canvas.getContext("webgl2", { antialias: false });
    const isWebGL2 = !!gl;
    if (!isWebGL2 || !gl) {
      throw console.error("No WebGL2 context");
    }
    return gl;
  }
}
function getCanvasPos(canvas, pos) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: pos.x - rect.left,
    y: pos.y - rect.top
  };
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const LEFT_MOUSE = 0;
const R_KEY = "r";
const C_KEY = "c";
const S_KEY = "s";
const SPACE_KEY = " ";
let WebGLGol = class extends LitElement {
  constructor() {
    super();
    this.cellWidth = 5;
    this.randomizeRatio = 0.5;
    this.updateTimestep = 100;
    this.application = null;
    this.isMouseDown = false;
    this.isPaused = false;
    this.handleMouseDown = (event) => {
      if (!this.application || !this.canvas) {
        return;
      }
      if (event.button == LEFT_MOUSE) {
        this.isMouseDown = true;
        const should_kill = event.ctrlKey;
        const canvas_pos = getCanvasPos(this.canvas, {
          x: event.x,
          y: event.y
        });
        this.application.mouseInput(canvas_pos, should_kill);
      }
    };
    this.handleMouseMove = (event) => {
      if (!this.isMouseDown || !this.application || !this.canvas) {
        return;
      }
      const should_kill = event.ctrlKey;
      const canvas_pos = getCanvasPos(this.canvas, { x: event.x, y: event.y });
      this.application.mouseInput(canvas_pos, should_kill);
    };
    this.handleMouseUp = (event) => {
      if (event.button == LEFT_MOUSE && this.isMouseDown) {
        this.isMouseDown = false;
      }
    };
    this.handleKeyUp = (event) => {
      if (!this.application || !this.canvas) {
        return;
      }
      switch (event.key) {
        case R_KEY:
          this.application.randomize(this.randomizeRatio);
          break;
        case C_KEY:
          this.application.clear();
          break;
        case S_KEY:
          if (this.isPaused) {
            this.application.update();
          }
          break;
        case SPACE_KEY:
          this.isPaused = !this.isPaused;
          event.preventDefault();
          break;
      }
    };
  }
  render() {
    return html` <canvas id="webgl-gol-canvas"></canvas> `;
  }
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      if (this.canvas == null) {
        throw new Error("Canvas not available");
      }
      this.application = new AutomataApp(this.canvas, this.cellWidth);
      window.addEventListener("keyup", this.handleKeyUp);
      window.addEventListener("mouseup", this.handleMouseUp);
      this.addEventListener("mousemove", this.handleMouseMove);
      this.addEventListener("mousedown", this.handleMouseDown);
      this.updateStep();
    });
  }
  disconnectedCallback() {
    var _a;
    super.disconnectedCallback();
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.removeEventListener("mousemove", this.handleMouseMove);
    this.removeEventListener("mousedown", this.handleMouseDown);
    (_a = this.application) == null ? void 0 : _a.destroy();
  }
  updateStep() {
    if (this.application && !this.isPaused) {
      this.application.update();
    }
    setTimeout(() => {
      this.updateStep();
    }, this.updateTimestep);
  }
};
WebGLGol.styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }

    #webgl-gol-canvas {
      width: 100%;
      height: 100%;
    }
  `;
__decorateClass([
  property({ type: Number, attribute: true })
], WebGLGol.prototype, "cellWidth", 2);
__decorateClass([
  property({ type: Number, attribute: true })
], WebGLGol.prototype, "randomizeRatio", 2);
__decorateClass([
  property({ type: Number, attribute: true })
], WebGLGol.prototype, "updateTimestep", 2);
__decorateClass([
  query("#webgl-gol-canvas", true)
], WebGLGol.prototype, "canvas", 2);
WebGLGol = __decorateClass([
  customElement("webgl-gol")
], WebGLGol);
export { WebGLGol };
