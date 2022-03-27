import { LitElement } from "lit";
/**
 * The main WebGL Game of Life element.
 */
export declare class WebGLGol extends LitElement {
    /**
     * The width of a cell on the canvas in pixels.
     */
    cellWidth: number;
    /**
     * The ratio of live/total cells after randomization.
     * Should be between 0 and 1.
     */
    randomizeRatio: number;
    /**
     * The time between simulation ticks in milliseconds.
     */
    updateTimestep: number;
    canvas: HTMLCanvasElement;
    private application;
    private isMouseDown;
    private isPaused;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleKeyUp;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private updateStep;
}
declare global {
    interface HTMLElementTagNameMap {
        "webgl-gol": WebGLGol;
    }
}
