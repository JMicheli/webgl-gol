import { Pos } from "./utils";
/**
 * An application for simulation Conway's Game of life on GPU with WebGL.
 */
export declare class AutomataApp {
    private canvas;
    private gl;
    private cellWidth;
    private width;
    private height;
    private widthInCells;
    private heightInCells;
    private curFBIndex;
    private FBTextures;
    private framebuffer;
    private vao;
    private drawShader;
    private updateShader;
    /** Create a SimulationApp.
     * @constructor
     * @param {HTMLCanvasElement} canvas A canvas to draw the game on.
     * @param {number} cellWidth The width of a grid cell in pixels.
     */
    constructor(canvas: HTMLCanvasElement, cellWidth: number);
    /**
     * Destroy the simulation.
     */
    destroy(): void;
    /**
     * Set all grid cells to "dead."
     */
    clear(): void;
    /**
     * Change the cell width of the simulation.
     * @param {number} width The new cell width
     */
    changeCellWidth(width: number): void;
    /**
     * Mouse input at a particular pixel coordinate in the simulation.
     * @param {number} x x coordinate in pixels
     * @param {number} y y coordinate in pixels
     * @param {boolean} killCell Should inputs kill cells?
     */
    mouseInput(input_pos: Pos, killCell?: boolean): void;
    /**
     * Randomize the simulation's cells.
     * @param {number} percentageAlive Ratio of alive/dead cells
     */
    randomize(percentageAlive?: number): void;
    /**
     * A simulation update tick.
     */
    update(): void;
    /**
     * Draw the simulation to canvas.
     */
    private draw;
    /**
     * Set the simulation boundaries based on canvas dimensions.
     */
    private regenerateBoundaries;
    /**
     * Generate new buffer textures.
     * @param {number} fractionAlive Ratio of alive/dead cells
     */
    private regenerateBufferTextures;
    /**
     * Get an array of rgba values for an input number of pixels.
     * @param {number} pixels Pixel count
     * @param {number} fractionAlive Ratio of alive/dead cells
     * @return {Uint8Array} An array of rgba values
     */
    private randomizedTextureArray;
    /**
     * Get a WebGL rendering context from an input canvas object.
     * @param {HTMLCanvasElement} canvas The input canvas
     * @return {WebGL2RenderingContext} The resulting context
     */
    private getWebGLContext;
}
