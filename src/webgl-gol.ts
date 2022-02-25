import { html, css, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { GoLApp, getCanvasPos } from "./app";

// Handy constants
const LEFT_MOUSE = 0;
const R_KEY = "r";
const C_KEY = "c";
const S_KEY = "s";
const SPACE_KEY = " ";

/**
 * The main WebGL Game of Life element.
 */
@customElement("webgl-gol")
export class WebGLGol extends LitElement {
  // LitElement properties
  @property({type: Number})
  cellWidth = 5;

  @property({type: Number})
  updateTimestep = 100;

  @query("#webgl-gol-canvas", true)
  canvas: HTMLCanvasElement;

  // Private properties
  private application: GoLApp | null = null;
  private isMouseDown = false;
  private isPaused = false;

  //Event listeners
  private handleMouseDown: (event: MouseEvent) => void;
  private handleMouseMove: (event: MouseEvent) => void;
  private handleMouseUp: (event: MouseEvent) => void;
  private handleKeyUp: (event: KeyboardEvent) => void;

  static styles = css`
    :host {
      display: block;
      width: 800px;
      height: 600px;
    }

    #webgl-gol-canvas {
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <canvas id="webgl-gol-canvas"></canvas>
    `;
  }

  constructor() {
    super();

    // Define MouseDown callback
    this.handleMouseDown = (event: MouseEvent) => {
      if (!this.application || !this.canvas) { return; }
      
      if (event.button == LEFT_MOUSE) {
        this.isMouseDown = true;
        const should_kill = event.ctrlKey;
  
        const canvas_pos = getCanvasPos(this.canvas, { x: event.x, y: event.y });
        this.application.mouseInput(canvas_pos, should_kill);
      }
    };

    // Define MouseMove callback
    this.handleMouseMove = (event: MouseEvent) => {
      if (!this.isMouseDown || !this.application || !this.canvas) { return; }
  
      const should_kill = event.ctrlKey;
      const canvas_pos = getCanvasPos(this.canvas, { x: event.x, y: event.y });
      this.application.mouseInput(canvas_pos, should_kill);
    };
  
    // Define MouseUp callback
    this.handleMouseUp = (event: MouseEvent) => {
      if (event.button == LEFT_MOUSE && this.isMouseDown) {
        this.isMouseDown = false;
      }
    };
    
    // Define KeyUp callback
    this.handleKeyUp = (event: KeyboardEvent) => {
      if (!this.application || !this.canvas) { return; }
  
      switch (event.key) {
        case R_KEY:
          this.application.randomize(0.5);
          break;
        case C_KEY:
          this.application.clear();
          break;
        case S_KEY:
          if (this.isPaused) { this.application.update(); }
          break;
        case SPACE_KEY:
          this.isPaused = !this.isPaused;
          event.preventDefault(); //Stop scrolling
          break;
      }
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    
    html`foo ${"bar"}`;

    // Wait until JS Event Loop is empty to attach listeners
    setTimeout(() => {
      // Create application
      if (this.canvas == null) { throw new Error("Canvas not available"); }
      this.application = new GoLApp(this.canvas, this.cellWidth);
      
      // Add event listeners
      window.addEventListener("keyup", this.handleKeyUp);
      window.addEventListener("mouseup", this.handleMouseUp);
      this.addEventListener("mousemove", this.handleMouseMove);
      this.addEventListener("mousedown", this.handleMouseDown);
      
      // Begin update loop
      this.updateStep();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    // Remove event listeners
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.removeEventListener("mousemove", this.handleMouseMove);
    this.removeEventListener("mousedown", this.handleMouseDown);

    //Release application resources
    this.application?.destroy();
  }

  private updateStep(): void {
    if (this.application && !this.isPaused) {
      this.application.update();
    }

    setTimeout(() => { this.updateStep(); }, this.updateTimestep);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "webgl-gol": WebGLGol
  }
}
