import { Dimensions, PixelRatio, Platform } from 'react-native';
const { width: DEVICE_WIDTH } = Dimensions.get('window');
const scale = DEVICE_WIDTH / 320;

export default function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
