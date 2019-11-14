import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

import preloadFonts from './preloadFonts';
import preloadImages from './preloadImages';

// cache fonts
const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

// cache images
const cacheImages = images => {
  const imagesArray = Object.values(images);

  return imagesArray.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }

    return Asset.fromModule(image).downloadAsync();
  });
};

// preload async
const loadAssetsAsync = async () => {
  // preload assets
  const fontAssets = cacheFonts(preloadFonts);
  const imageAssets = cacheImages(preloadImages);

  // promise load all
  return Promise.all([...fontAssets, ...imageAssets]);
};

const convertUniqueArray = array => {
  return array.filter((point, index) => {
    const _point = JSON.stringify(point);
    return index === array.findIndex(obj => {
      return JSON.stringify(obj) === _point;
    });
  });
}

const convertStringCSV = array => {
  var csvstring = "";
  var csvstringColumn = "Timestamp,Latitude,Longitude,Altitude,Accuracy,Speed,Accelerometer X, Accelerometer Y, Accelerometer Z\n";
  csvstring += csvstringColumn;
  array.forEach((item) => {
    csvstring = csvstring + item.timestamp + "," +
                item.coords.latitude + "," + item.coords.longitude + "," +
                item.coords.altitude + "," + item.coords.accuracy + "," +
                item.coords.speed + "," +
                item.accelerometerData.x + "," + item.accelerometerData.y + "," +
                item.accelerometerData.z +  "\n";
  });
  return csvstring;
}

export default {
  cacheFonts,
  cacheImages,
  loadAssetsAsync,
  convertUniqueArray,
  convertStringCSV
};
