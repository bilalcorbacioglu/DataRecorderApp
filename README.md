<br>
<p align="center">
  <a href="https://www.ficonicsolutions.com">
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
    <img src="https://i.ibb.co/cCRyg2X/screenshot-2.png" width="258px" />
  </a>
  <a href="#">
    <img src="https://i.ibb.co/v1MrLcx/screenshot-3.png" width="258px" />
  </a><br>
  <a href="#">
    <img src="https://i.ibb.co/jktcThS/screenshot-3.png" width="258px" />
  </a>
  <a href="#">
    <img src="https://i.ibb.co/mXctYyj/screenshot-1.png" width="258px" />
  </a>
</p>
<br>

# DataRecordApp
[![CodeFactor](https://www.codefactor.io/repository/github/bilalcorbacioglu/datarecorderapp/badge?s=d4f76f4724205da9bd82695c8d498a3df028daa7)](https://www.codefactor.io/repository/github/bilalcorbacioglu/datarecorderapp) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat&logo=EXPO&labelColor=ffffff&logoColor=000)](https://expo.io/@bilalc/DataRecorderApp) ![supports iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=for-the-badge&logo=APPLE&labelColor=000&logoColor=fff) ![supports Android](https://img.shields.io/badge/Android-4630EB.svg?style=for-the-badge&logo=ANDROID&labelColor=000&logoColor=fff)

  
## Table of Contents

- [Install & Build Project](#install--build)
- [Demo](#demo)
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
<ol>  
  <li>Visit the address of the application (<a href="https://expo.io/appetize-simulator?url=https://expo.io/@bilalc/DataRecorderApp&appetizeCode=adfhadfh">Data Recorder App</a>). *Sometimes you may have to wait for the queue.</li>  
<li>You can start the simulation on a mobile device by clicking the <strong>Open project using Expo</strong> on the bottom side of the screen. </li>
</ol>

> You can choose the following method to get full performance.

#### B) From iOS or Android Phone
<ol>  
<li>First of all you need to have <a href="https://expo.io/tools">Expo Client</a> installed on your test device. 
<br><a href="https://itunes.apple.com/app/apple-store/id982107779">App Store</a> or <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www">Play Store</a> / <a href="https://dpq5q02fu5f55.cloudfront.net/Exponent-2.13.0.tar.gz">Download IPA  2.13.0</a> or <a href="https://d1ahtucjixef4r.cloudfront.net/Exponent-2.13.1.apk">Download APK 2.13.1</a></li>  
  <li>Open project <strong><a href="https://expo.io/@bilalc/DataRecorderApp">Data Recorder App</a></strong> by scanning QR code.
</li>
<li>It will automatically redirect to the Expo application and launch the Data Recorder App.</li> 
</ol>

## Stats

- React Native 0.59.10
- Expo SDK 35
- iOS, Android
- React Navigation v3
- PropTypes
- Moment

## Features

Considerations and improvements made in the application are summarized briefly.

- OTA (Over-The-Air) Deployment
- Cache System
- Log System
- Google Map Request (API Request(In RecordDetail Screen)) 
- Preload all fonts and images
- Responsive Screens (FontSize, Icons, Images etc.)
- Special Navigation for iOS (Modal Navigation)
- Dynamic Settings & AsyncStorage
- Performance improvements
- Eslint & Stylelint  integration
- Record each 1000 ms (Alterable)
- CSV Export & Save (Export -> Another Application, Mail etc.) (Save -> Inapp storage)
- Record History 

- Data points are drawn with blue color on the map.
- You can navigate through all pages in the application without interrupting record.
- Without stopping the recording, the supplied button can be clicked. The records up to the time it was clicked can be displayed and the relevant records can be exported. Too many recordings are not a burden on the model screen. New data will continue to come as we go down.
- Data received in the same location can be cleared if desired. (Unique data set procure)
