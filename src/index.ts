interface ScratchCardOption {
  readonly canvas: HTMLCanvasElement,
  showAllPercent?: number,
  devicePixelRatio?: number,
  radius?: number,
  coverColor?: string,
  coverImg?: string,
  callback?: Function,
}

class ScratchCard {
  canvas: HTMLCanvasElement;
  showAllPercent: Number;
  private readonly radius: number;
  private readonly coverColor: string;
  private readonly coverImg: string;
  private readonly callback: Function;
  devicePixelRatio: number;
  private ctx: CanvasRenderingContext2D;
  private offsetX: number;
  private offsetY: number;
  private hasDone: boolean;
  private animationFrameId: null | number;
  constructor(options: ScratchCardOption) {
    this.canvas = options.canvas;
    this.showAllPercent = options.showAllPercent || 80;
    this.radius = options.radius || 20;
    this.coverColor = options.coverColor || '#666';
    this.coverImg = options.coverImg;
    this.callback = options.callback;
    this.ctx = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.hasDone = false;
    this.devicePixelRatio = window.devicePixelRatio;
    this.animationFrameId = null;
    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext('2d',);
    this.offsetX = this.canvas.offsetLeft;
    this.offsetY = this.canvas.offsetTop;
    this.addEvent();
    if (this.coverImg) {
      const coverImgDom = new Image();
      coverImgDom.setAttribute('src', this.coverImg);
      coverImgDom.setAttribute('crossOrigin', 'anonymous');
      coverImgDom.onload = () => {
        this.ctx.drawImage(coverImgDom, 0, 0);
        this.ctx.globalCompositeOperation = 'destination-out';
      }
    } else {
      this.ctx.fillStyle = this.coverColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.globalCompositeOperation = 'destination-out';
    }
  }

  /**
   * 添加事件
   */
  addEvent() {
    this.canvas.addEventListener('touchmove', this.scratchEvent.bind(this), {passive: false});
  }

  scratchEvent(e: TouchEvent) {
    e.preventDefault();
    if (!this.hasDone) {
      if (e.changedTouches) {
        const event = e.changedTouches[e.changedTouches.length - 1];
        const {clientX, clientY} = event;
        const [x, y] = [parseInt(String(clientX - this.offsetX)), parseInt(String(clientY - this.offsetY))];
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.radius * this.devicePixelRatio, 0, Math.PI * 2);
        this.ctx.fill();
        if (this.getFulledPercentage() > this.showAllPercent) {
          this.hasDone = true;
          window.requestAnimationFrame(this.randomDrawArc.bind(this));
        }
      }
    }
  }

  /**
   * 获取绘制比例
   */
  getFulledPercentage() {
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = imgData.data;
    const transPixels = [];
    for (let i = 0; i < pixels.length; i+=4) {
      if (pixels[i + 3] < 128) {
        transPixels.push(pixels[i + 3])
      }
    }
    return (transPixels.length / (pixels.length / 4) * 100);
  }

  /**
   * 随机绘制
   */
  randomDrawArc() {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius * this.devicePixelRatio, 0, Math.PI * 2);
    this.ctx.fill();
    if (this.getFulledPercentage() > 90) {
      this.animationFrameId && window.cancelAnimationFrame(this.animationFrameId);
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.callback && typeof this.callback === 'function') {
        this.callback();
      };
      return;
    }
    if (this.getFulledPercentage() > this.showAllPercent) {
      this.animationFrameId = window.requestAnimationFrame(this.randomDrawArc.bind(this));
    }
  }
};

export default ScratchCard;
