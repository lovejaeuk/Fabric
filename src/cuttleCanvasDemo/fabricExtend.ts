import { roratingIcon } from "./common";

export function fabricExtend() {
  const fabric: any = window.fabric;
  // overriding _drawControl method
  fabric.util.object.extend(fabric.Object.prototype, {
    hasRotatingPoint: true,
    selectedIconImage: roratingIcon,
    _drawControl: function(
      control: string,
      ctx: any,
      methodName: string,
      left: number,
      top: number,
      styleOverride: any
    ) {
      var self = this;
      styleOverride = styleOverride || {};
      if (!this.isControlVisible(control)) {
        return;
      }
      var size = this.cornerSize,
        stroke = !this.transparentCorners && this.cornerStrokeColor;
      if (control === "mtr") {
        ctx.drawImage(self.selectedIconImage, left, top, size, size);
        return;
      }
      switch (styleOverride.cornerStyle || this.cornerStyle) {
        case "circle":
          ctx.beginPath();
          ctx.arc(
            left + size / 2,
            top + size / 2,
            size / 2,
            0,
            2 * Math.PI,
            false
          );
          ctx[methodName]();
          if (stroke) {
            ctx.stroke();
          }
          break;

        default:
          this.transparentCorners || ctx.clearRect(left, top, size, size);
          ctx[methodName + "Rect"](left, top, size, size);
          if (stroke) {
            ctx.strokeRect(left, top, size, size);
          }
      }
    }
  });

  // overriding setControl style
  const controllingStyle = {
    transparentCorners: false,
    cornerSize: 16,
    cornerStyle: "circle",
    cornerColor: "rgba(66, 79, 104, 1)",
    cornerStrokeColor: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(178, 192, 200, 1)",
    borderDashArray: [4, 4],
    borderScaleFactor: 4,
    padding: 8,
    selectionBackgroundColor: "rgba(255, 255, 255, 0.3)"
  };
  // fabric.Object.prototype.set(controllingStyle);
  // [
  //   'transparentCorners',
  //   'cornerSize',
  //   'cornerStyle',
  //   'cornerColor',
  //   'cornerStrokeColor',
  //   'borderColor',
  //   'borderDashArray',
  //   'borderScaleFactor',
  //   'padding',
  //   'selectionBackgroundColor',
  // ].forEach((key: string) => {
  //     fabric.Object.prototype[key] = controllingStyle[key];
  // });

  fabric.Canvas.prototype._exportCropperCanvas = function(
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    let ctx = this;
    ctx.discardActiveObject().renderAll(true);
    let canvasEl = this.lowerCanvasEl || this.upperCanvasEl;
    let printEl = canvasEl;
    if (x || y || width || height) {
      // Defaults
      x = x || 0;
      y = y || 0;
      width = width || canvasEl.width - x;
      height = height || canvasEl.height - y;
      // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
      // s: source
      // d: destination
      // Calculate spaces over canvas bounds
      let d = {
        left: x > 0 ? 0 : -x,
        top: y > 0 ? 0 : -y,
        right: x + width < canvasEl.width ? 0 : width + x - canvasEl.width,
        bottom: y + height < canvasEl.height ? 0 : height + y - canvasEl.height
      };
      let sx = x + d.left;
      let sy = y + d.top;
      let sWidth = width - d.right - d.left;
      let sHeight = height - d.bottom - d.top;
      let dx = d.left;
      let dy = d.top;
      let dWidth = width - d.right - d.left;
      let dHeight = height - d.bottom - d.top;

      printEl = document.createElement("canvas");
      printEl.width = width;
      printEl.height = height;
      if (window.devicePixelRatio !== 1) {
        sx = sx * window.devicePixelRatio;
        sy = sy * window.devicePixelRatio;
        sWidth = sWidth * window.devicePixelRatio;
        sHeight = sHeight * window.devicePixelRatio;
        // printEl.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio); // 加了这句就是可以在 retina 导出 2x 图
      }
      // Print section
      printEl
        .getContext("2d")
        .drawImage(canvasEl, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
    return printEl;
  };
}
