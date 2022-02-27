import Shader from "./shader";
import { Pos } from "./utils";
import { UpdateSource, DrawSource } from "./shader-sources";

/**
 * An application for simulation Conway's Game of life on GPU with WebGL.
 */
export class GoLApp {
  // Private properties
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private cellWidth: number;

  // Drawing surface variables
  private width = 0;
  private height = 0;
  private widthInCells = 0;
  private heightInCells = 0;

  // OpenGL vars
  private curFBIndex = 0;
  private FBTextures: WebGLTexture[];
  private framebuffer: WebGLFramebuffer;
  private vao: WebGLVertexArrayObject;

  // Shaders
  private drawShader: Shader;
  private updateShader: Shader;

  /** Create a SimulationApp.
   * @constructor
   * @param {HTMLCanvasElement} canvas A canvas to draw the game on.
   * @param {number} cellWidth The width of a grid cell in pixels.
   */
  constructor(canvas: HTMLCanvasElement, cellWidth: number) {
    this.canvas = canvas;
    this.cellWidth = cellWidth;
    this.regenerateBoundaries();

    // Grab GL context
    const gl = (this.gl = this.getWebGLContext(canvas));

    // Initialize framebuffers
    // Create the framebuffer and set the index
    const fb = gl.createFramebuffer();
    if (fb == null) {
      throw new ReferenceError("Framebuffer creation failed");
    }
    this.framebuffer = fb;
    this.curFBIndex = 0; // Currently using FBTextures[0]
    // Generate two framebuffer textures for swapping
    const t1 = gl.createTexture();
    const t2 = gl.createTexture();
    if (t1 == null || t2 == null) {
      throw new ReferenceError("Texture creation failed");
    }
    this.FBTextures = [t1, t2];
    // Set parameters for both buffer textures
    for (let i = 0; i < 2; i++) {
      gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[i]);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    }

    // Regenerate buffer textures
    this.regenerateBufferTextures(0.5);

    // Generate vertex array/load geometry
    // Create vertex array and bind it
    const va = gl.createVertexArray();
    if (va == null) {
      throw new ReferenceError("Vertex Array Object creation failed");
    }
    this.vao = va;
    gl.bindVertexArray(this.vao);
    // Create quad vertices
    const vertices = new Float32Array([-1, -1, -1, 1, 1, -1, 1, 1]);
    const vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Create shaders
    this.updateShader = new Shader(gl, UpdateSource.Vertex, UpdateSource.Fragment);
    this.drawShader = new Shader(gl, DrawSource.Vertex, DrawSource.Fragment);

    // Draw initial state
    this.draw();
  }

  /**
   * Destroy the simulation.
   */
  public destroy(): void {
    const gl = this.gl;
    // Unbind texture, delete both framebuffer textures
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.deleteTexture(this.FBTextures[0]);
    gl.deleteTexture(this.FBTextures[1]);
    // Unbind framebuffer, delete VAO
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteVertexArray(this.vao);
    // Delete shaders
    this.updateShader.delete();
    this.drawShader.delete();
  }

  /**
   * Set all grid cells to "dead."
   */
  public clear(): void {
    const gl = this.gl;
    // Set up blank data
    const data = new Uint8Array(4 * this.heightInCells * this.widthInCells);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    // Bind current framebuffer texture and overwrite texture
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      this.widthInCells,
      this.heightInCells,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      data
    );

    // Trigger re-draw
    this.draw();
  }

  /**
   * Change the cell width of the simulation.
   * @param {number} width The new cell width
   */
  public changeCellWidth(width: number): void {
    this.cellWidth = width;
    this.regenerateBoundaries();
    this.clear();

    // Trigger re-draw
    this.draw();
  }

  /**
   * Mouse input at a particular pixel coordinate in the simulation.
   * @param {number} x x coordinate in pixels
   * @param {number} y y coordinate in pixels
   * @param {boolean} killCell Should inputs kill cells?
   */
  public mouseInput(input_pos: Pos, killCell = false): void {
    const gl = this.gl;
    // Generate update pixel
    const offset: Pos = {
      x: Math.floor(input_pos.x / this.cellWidth),
      y: this.heightInCells - (Math.floor(input_pos.y / this.cellWidth) + 1)
    };
    const value = killCell ? 0 : 255;
    const pixelData = new Uint8Array([value, value, value, 255]);
    // Bind current framebuffer texture and replace relevant pixel
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    gl.texSubImage2D(
      gl.TEXTURE_2D,
      0,
      offset.x,
      offset.y,
      1,
      1,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      pixelData
    );

    // Trigger re-draw
    this.draw();
  }

  /**
   * Randomize the simulation's cells.
   * @param {number} percentageAlive Ratio of alive/dead cells
   */
  public randomize(percentageAlive = 0.5): void {
    this.regenerateBufferTextures(percentageAlive);
    // Trigger re-draw
    this.draw();
  }

  /**
   * A simulation update tick.
   */
  public update(): void {
    const gl = this.gl;
    // Bind state framebuffer, set viewport to state texture size
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.viewport(0, 0, this.widthInCells, this.heightInCells);
    // Grab textures
    const nextIndex = this.curFBIndex ^ 1; // Bitwise XOR cycles 0 and 1
    const currentTexture = this.FBTextures[this.curFBIndex];
    const nextTexture = this.FBTextures[nextIndex];
    // currentTexture used as state, nextTexture used as frame buffer
    gl.bindTexture(gl.TEXTURE_2D, currentTexture);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, nextTexture, 0);
    // Bind scale uniform
    this.updateShader.uniform2f("u_scale", this.widthInCells, this.heightInCells);
    // Clear
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Bind update shader, draw call
    this.updateShader.use();
    gl.bindVertexArray(this.vao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // Advance index
    this.curFBIndex = nextIndex;

    // Trigger re-draw
    this.draw();
  }

  /**
   * Draw the simulation to canvas.
   */
  private draw(): void {
    const gl = this.gl;
    // Use default framebuffer for screen out, set viewport to canvas size
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.width, this.height);
    // Bind current state texture
    gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[this.curFBIndex]);
    // Clear
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Bind draw shader, draw call
    this.drawShader.use();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  /**
   * Set the simulation boundaries based on canvas dimensions.
   */
  private regenerateBoundaries(): void {
    // Set width/height in pixels
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;

    // Set width/height in cells
    this.widthInCells = Math.round(this.width / this.cellWidth);
    this.heightInCells = Math.round(this.height / this.cellWidth);
  }

  /**
   * Generate new buffer textures.
   * @param {number} fractionAlive Ratio of alive/dead cells
   */
  private regenerateBufferTextures(fractionAlive = 0.5): void {
    const gl = this.gl;
    const pixelCount = this.widthInCells * this.heightInCells;
    // Loop over both buffer textures
    for (let i = 0; i < 2; i++) {
      // Generate random data and store it to GPU memory
      const textureArray = this.randomizedTextureArray(pixelCount, fractionAlive);
      gl.bindTexture(gl.TEXTURE_2D, this.FBTextures[i]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        this.widthInCells,
        this.heightInCells,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textureArray
      );
    }
  }

  /**
   * Get an array of rgba values for an input number of pixels.
   * @param {number} pixels Pixel count
   * @param {number} fractionAlive Ratio of alive/dead cells
   * @return {Uint8Array} An array of rgba values
   */
  private randomizedTextureArray(pixels: number, fractionAlive = 0.5): Uint8Array {
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

  /**
   * Get a WebGL rendering context from an input canvas object.
   * @param {HTMLCanvasElement} canvas The input canvas
   * @return {WebGL2RenderingContext} The resulting context
   */
  private getWebGLContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
    const gl = canvas.getContext("webgl2", { antialias: false });
    const isWebGL2 = !!gl;
    if (!isWebGL2 || !gl) {
      throw console.error("No WebGL2 context");
    }

    return gl;
  }
}
