export function setControlOfLayer(layer: any) {
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
  layer.setControlsVisibility({
    bl: true,
    br: true,
    tl: true,
    tr: true,
    mb: false,
    ml: false,
    mr: false,
    mt: false,
    mtr: true
  });
  layer.set(controllingStyle);
}

export interface IOverlayConfig {
  width: number;
  height: number;
}
export interface IInnerConfig {
  top: number;
  left: number;
  bottom: number;
  right: number;
}
export function getFabricClippingPath(
  overlayConfig: IOverlayConfig,
  innerConfig: IInnerConfig
): string {
  return (
    "M 0 0 H " +
    overlayConfig.width +
    " V " +
    innerConfig.top +
    " H " +
    innerConfig.left +
    " V " +
    innerConfig.bottom +
    " H " +
    innerConfig.right +
    " V " +
    innerConfig.top +
    " H " +
    overlayConfig.width +
    " V " +
    overlayConfig.height +
    " H 0 Z"
  );
}
