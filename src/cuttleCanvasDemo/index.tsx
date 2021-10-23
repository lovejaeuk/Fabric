import * as React from "react";
import * as classNames from 'classnames';
import {
  IOverlayConfig,
  IInnerConfig,
  setControlOfLayer,
  getFabricClippingPath
} from './fabricCustomize';
import {
  overlayConfig,
  innerConfig,
} from './config';
import { roratingIconSrc } from './common';


export class CuttleCanvas extends React.Component<{}, {}> {
  private canvasHTMLElment: any;
  private canvasInstance: any;
  private hoverLayer: any;

  public constructor(props: any) {
    super(props);
    const ctx: this = this;
    [
      'canvasRef',
      'componentDidMount',
      'registerCanvasEvents',
      'setOverlayAndBg',
      'setHoverLayer',
      'canvasMouseOver',
      'canvasMouseDown',
      'canvasMouseOut',
      'canvasSelectionCreated',
      'canvasSelectionUpdated',
      'mockLayer0',
      'mockLayer1',
    ].forEach((action: string) => {
        ctx[action] = ctx[action].bind(ctx);
    });
  }

  public canvasRef(ref: any) {
    this.canvasHTMLElment = ref;
  }

  public componentDidMount() {
    const ctx: this = this;
    this.canvasInstance = new window.fabric.Canvas(ctx.canvasHTMLElment, {
      enableRetinaScaling: true,
      width: overlayConfig.width,
      height: overlayConfig.height,
    });
    this.setOverlayAndBg();
    this.setHoverLayer();
    this.registerCanvasEvents();
    this.mockLayer0();
    this.mockLayer1();
  }

  public render() {
    return (
      <div>
        <canvas ref={this.canvasRef}></canvas>
      </div>
    );
  }

  public registerCanvasEvents() {
    const ctx: this = this;
    this.canvasInstance.on('mouse:over', ctx.canvasMouseOver);
    this.canvasInstance.on('mouse:down', ctx.canvasMouseDown);
    this.canvasInstance.on('mouse:out', ctx.canvasMouseOut);
    this.canvasInstance.on('selection:created', ctx.canvasSelectionCreated);
    this.canvasInstance.on('selection:updated', ctx.canvasSelectionUpdated);
  }

  public setOverlayAndBg() {
    const fabric: any = window.fabric;
    const overlayPath: string = getFabricClippingPath(overlayConfig, innerConfig);
    const overlayFill: string = 'rgba(0,0,0,0.2)';
    const overlayLayer: any = new fabric.Path(overlayPath, {
      left: 0,
      top: 0,
      fill: overlayFill,
    });
    const overlayLayerGroup: any = new fabric.Group([overlayLayer], {
      left: 0,
      top: 0
    });
    this.canvasInstance.setOverlayImage(overlayLayerGroup);
    this.canvasInstance.setBackgroundImage(new fabric.Rect({
      left: innerConfig.left,
      top: innerConfig.top,
      width: innerConfig.right - innerConfig.left,
      height: innerConfig.bottom - innerConfig.top,
      fill: 'green',
      strokeWidth: 0,
    })); // <-- now it fill 
  }

  public setHoverLayer() {
    const fabric: any = window.fabric;
    const hoverLayer: any = new fabric.Rect({
      visible: false,
      opacity: 1,
      fill: 'rgba(255,255,255, 0.2)',
      stroke: 'rgba(178, 192, 200, 1)',
      strokeWidth: 4,
      strokeDashArray: [4, 4],
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    });
    this.hoverLayer = hoverLayer;
    this.canvasInstance.add(hoverLayer);
    this.canvasInstance.renderAll();
  }

  public canvasMouseOver(e: any) {
    const ctx: this = this;
    console.log(e.target);
    if (e.target === undefined || e.target === null) {
      return;
    }
    let hoverLayerWidth = e.target.width;
    let hoverLayerHeight = e.target.height;
    if (e.target.scaleX) {
      hoverLayerWidth = ((e.target.width * e.target.scaleX) + 16).toFixed(1);
    }
    if (e.target.scaleY) {
      hoverLayerHeight = ((e.target.height * e.target.scaleY) + 16).toFixed(1);
    }
    ctx.hoverLayer.set({
      visible: true,
      left: e.target.left - 8,
      top: e.target.top - 8,
      width: parseFloat(hoverLayerWidth),
      height: parseFloat(hoverLayerHeight),
    });
    ctx.canvasInstance.bringToFront(ctx.hoverLayer);
    ctx.canvasInstance.renderAll();
  }

  public canvasMouseDown(e: any) {
    const ctx: this = this;
    ctx.hoverLayer.set({ visible: false, });
    ctx.canvasInstance.renderAll();
  }

  public canvasMouseOut(e: any) {
    const ctx: this = this;
    ctx.hoverLayer.set({ visible: false, });
    ctx.canvasInstance.renderAll();
  }

  public canvasSelectionCreated(e: any) {
    const ctx: this = this;
    console.log('--- canvasSelectionCreated ---');
    console.log(e);
    console.log(e.target);
    // console.log(ctx.canvasInstance);
  }

  public canvasSelectionUpdated(e: any) {
    const ctx: this = this;
    console.log('--- canvasSelectionUpdated ---');
    console.log(e);
    console.log(e.target);
  }

  public mockLayer0() {
    const fabric: any = window.fabric;
    let textContent: string = '编辑模式 与 普通模式';
    let textLayer: any = new fabric.Text(textContent, {
      left: innerConfig.left - 50,
      top: innerConfig.top,
      fontSize: 18,
    });
    // setControlOfLayer(textLayer);
    this.canvasInstance.add(textLayer);
    this.canvasInstance.renderAll();
  }

  public mockLayer1() {
    const ctx: this = this;
    const fabric: any = window.fabric;
    const testImageSrc = roratingIconSrc;
    fabric.Image.fromURL(testImageSrc, function (imgLayer: any) {
      imgLayer.set({
        left: innerConfig.left - 50,
        top: innerConfig.top + 50,
      });
      // setControlOfLayer(imgLayer);
      ctx.canvasInstance.add(imgLayer);
      ctx.canvasInstance.renderAll();
    });
  }

  public mockLayer2() {
    const fabric: any = window.fabric;
  }
}