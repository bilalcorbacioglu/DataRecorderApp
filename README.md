<br>
<p align="center">
  <a href="https://strapi.io">
    <img src="https://www.ficonicsolutions.com/img/logo.e810f519.png" width="258px" alt="Strapi logo" />
  </a>
</p>
<h3 align="center">Data Record App</h3>
<p align="center">Basically, it is an application that records data at regular intervals and enables export in CSV format.</p>
<br />

<p align="center">
  <a href="#">
    <img src="https://i.ibb.co/yPMnd8d/screenshot-1.png" width="258px" />
  </a>
  <a href="#">
    <img src="https://i.ibb.co/Tqr4sSB/screenshot-2.png" width="258px" />
  </a><br>
  <a href="#">
    <img src="https://i.ibb.co/v1MrLcx/screenshot-3.png" width="258px" />
  </a>
  <a href="#">
    <img src="https://i.ibb.co/nwXghQ0/screenshot-4.png" width="258px" />
  </a>
</p>
<br>

# DataRecordApp
[![CodeFactor](https://www.codefactor.io/repository/github/bilalcorbacioglu/datarecorderapp/badge?s=d4f76f4724205da9bd82695c8d498a3df028daa7)](https://www.codefactor.io/repository/github/bilalcorbacioglu/datarecorderapp) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat&logo=EXPO&labelColor=ffffff&logoColor=000)](https://expo.io/@bilalc/DataRecorderApp) ![supports iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=for-the-badge&logo=APPLE&labelColor=000&logoColor=fff) ![supports Android](https://img.shields.io/badge/Android-4630EB.svg?style=for-the-badge&logo=ANDROID&labelColor=000&logoColor=fff)

  
## Table of Contents

- [Install & Build Project](#install--build)
- [Demo & Direct APK Link](#demo)
- [Stats](#stats)
- [Features](#features)

## Install & Build
Install: `yarn install` | `npm install`
Run Project Locally: `expo start`

#### Requirements
[NodeJS](https://nodejs.org/) (version >=10.13.0)
Expo CLI: `npm install -g expo-cli`

## Demo
Multiple options are available to test the application.
#### A) Direct Simulation on Android Phone via Browser
1- Visit the address of the application  ([Data Recorder App](https://expo.io/@bilalc/DataRecorderApp)).
2- You can start the simulation on a mobile device by clicking the **Open project in the browser link** on the right side of the screen. Sometimes you may have to wait for the queue.
3- Once the queue is over, you will see the **Open Project using Expo** option when you scroll down a page on the mobile device. The application will open when you click this option.

> You can choose the following methods to get full performance.

#### B) From iOS or Android Phone
1- First of all you need to have [Expo Client](https://expo.io/tools) installed on your test device. 
[App Store](https://itunes.apple.com/app/apple-store/id982107779) or  [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) / [Download IPA  2.13.0](https://dpq5q02fu5f55.cloudfront.net/Exponent-2.13.0.tar.gz) or  [Download APK  2.13.1](https://d1ahtucjixef4r.cloudfront.net/Exponent-2.13.1.apk).
2- Open project **[Data Recorder App](https://expo.io/@bilalc/DataRecorderApp)** by scanning QR code.
3- It will automatically redirect to the Expo application and launch the Data Recorder App.
 
#### C) Direct APK & IPA Link
APK:  
IPA:   


## Stats

- React Native 0.59.10
- Expo SDK 35
- iOS, Android
- React Navigation v3
- PropTypes

## Features

Considerations and improvements made in the application are summarized briefly.

- OTA (Over-The-Air) Deployment
- Cache System
- Log System
- Google Map Request (API Request)
- Preload all fonts and images
- Responsive Screens (FontSize, Icons, Images etc.)
- Special Navigation for iOS (Modal Navigation)
- Dynamic Settings & AsyncStorage
- Performance improvements
- Eslint & Stylelint  integration
- Record each 1000 ms (Alterable)
- CSV Export & Save (Export -> Another Application, Mail etc.) (Save -> Inapp storage)
- Record History 

- The data points are drawn in red on the map immediately after the registration is finished.
- Without stopping the recording, the supplied button can be clicked. The records up to the time it was clicked can be displayed and the relevant records can be exported. Too many recordings are not a burden on the model screen. New data will continue to come as we go down.
- Data received in the same location can be cleared if desired. (Unique data set procure)
