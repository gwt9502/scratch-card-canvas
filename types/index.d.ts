interface ScratchCardOption {
    readonly canvas: HTMLCanvasElement;
    showAllPercent?: number;
    devicePixelRatio?: number;
    radius?: number;
    coverColor?: string;
    coverImg?: string;
    callback?: Function;
}
declare class ScratchCard {
    canvas: HTMLCanvasElement;
    showAllPercent: Number;
    private readonly radius;
    private readonly coverColor;
    private readonly coverImg;
    private readonly callback;
    devicePixelRatio: number;
    private ctx;
    private offsetX;
    private offsetY;
    private hasDone;
    private animationFrameId;
    constructor(options: ScratchCardOption);
    init(): void;
    addEvent(): void;
    scratchEvent(e: TouchEvent): void;
    getFulledPercentage(): number;
    randomDrawArc(): void;
}
export default ScratchCard;
