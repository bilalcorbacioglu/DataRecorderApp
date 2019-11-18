import { Dimensions, PixelRatio } from 'react-native';
import { device } from '../constants';

const { width: DEVICE_WIDTH } = Dimensions.get('window');
const scale = DEVICE_WIDTH / 320;

export default function normalize(size) {
  const newSize = size * scale;
  if (device.iOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
