import { IOverlayConfig, IInnerConfig } from './fabricCustomize';

export const overlayConfig: IOverlayConfig = {
  width: 400,
  height: 400
};

export const innerConfig: IInnerConfig = {
  left: 100,
  top: 100,
  right: overlayConfig.width - 100,
  bottom: overlayConfig.height - 100,
};