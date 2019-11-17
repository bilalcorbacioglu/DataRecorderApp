import React from 'react';
import { Linking, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { colors, device, fonts, gStyle } from '../constants';

// components
import RequestRideType from '../components/RequestRideType';
import SelectRideType from '../components/SelectRideType';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';
import Information from '../components/Information';

// icons
import SvgMenu from '../components/icons/Svg.Menu';

const { PROVIDER_GOOGLE } = MapView;
const timePeriod = 2000;
const types = {
  car: {
    image: 'carSm',
    imageLg: 'carLg',
    text: 'Special For Car'
  },
  bike: {
    image: 'bikeSm',
    imageLg: 'bikeLg',
    text: 'Special For Bike'
  },
  ship: {
    image: 'shipSm',
    imageLg: 'shipLg',
    text: 'Special For Ship'
  }
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'car',
      selectType: false,
      showMap: false,
      userLat: null,
      userLon: null,
      recordData: [],
      recordStatus: false,
      accelerometerData: null,
      liveDrawOnMap: false,
    };

    this.toggleTypeModal = this.toggleTypeModal.bind(this);
    this.changeRideType = this.changeRideType.bind(this);
  }

  async componentDidMount() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync();
    
    this.setState({
      showMap: true,
      userLat: coords.latitude,
      userLon: coords.longitude,
      liveDrawOnMap: JSON.parse(await AsyncStorage.getItem("liveDrawOnMap")),
    });
  }

  _changeStatusLiveDrawOnMap = () => {
    this.setState(prevState => ({ 
      liveDrawOnMap: !prevState.liveDrawOnMap
    }));
  };

  toggleTypeModal() {
    this.setState(prevState => ({
      selectType: !prevState.selectType
    }));
  }

  changeRideType(type) {
    this.setState({
      type
    });
  }
  
  async toggleRecord() {
    this.setState(prevState => ({
      recordStatus: !prevState.recordStatus
    }))

    if(!this.state.recordStatus) {
      this.setState({recordData: []});
      Accelerometer.setUpdateInterval(timePeriod);
      this._interval = setInterval(() => { 
        this.triggerRecord();
      }, timePeriod);
    }
    else { 
      clearInterval(this._interval);
    }
  }

  triggerRecord = async () => {
    let currentData = await Location.getCurrentPositionAsync();
    
    this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({accelerometerData: accelerometerData})
      Accelerometer.removeAllListeners()
    });
    currentData.accelerometerData = this.state.accelerometerData ? this.state.accelerometerData : {x:"",y:"",z:""} ;
    this.setState(prevState => ({
      recordData: [...prevState.recordData, currentData]
    }))
  }

  render() {
    const { navigation } = this.props;
    const { type, selectType, showMap, userLat, userLon, recordStatus, recordData, liveDrawOnMap } = this.state;

    return (
      <View style={gStyle.container}>
        {showMap && (
          <MapView
            followsUserLocation
            showsUserLocation
            showsTraffic
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLat,
              longitude: userLon,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
            style={styles.map}
          >
            {(liveDrawOnMap || (!liveDrawOnMap && !recordStatus)) && 
            <MapView.Polyline
              coordinates={
                recordData.map((point, index) => {
                  return {
                    latitude: point.coords.latitude,
                    longitude: point.coords.longitude
                  }
                })
              }
              strokeWidth={4}
              strokeColor="blue"
            /> }
          </MapView>
        )}

        {!showMap && (
          <View style={styles.containerNoLocation}>
            <Text style={styles.textLocationNeeded}>
              We need your location data...
            </Text>
            <TouchText
              onPress={() => Linking.openURL('app-settings:')}
              style={styles.btnGoTo}
              styleText={styles.btnGoToText}
              text="Go To Permissions"
            />
          </View>
        )}

        <View style={styles.rightContainer}>
          <View>
            <TouchIcon
              icon={<Feather style={{alignItems: 'center', textAlign: 'center'}} name="settings" color="white" />}
              iconSize={20}
              onPress={() => navigation.navigate('ModalSettings', { changeStatusLiveDrawOnMap: this._changeStatusLiveDrawOnMap })}
              style={[styles.icon, styles.iconSettings]}
            />
            {!recordStatus ? 
            <TouchIcon
              icon={<MaterialIcons style={{alignItems: 'center', textAlign: 'center'}} name="play-arrow" color="white" />}
              iconSize={20}
              onPress={() => this.toggleRecord()}
              style={[styles.icon, styles.iconPlay]}
            />
            :
            <TouchIcon
              icon={<MaterialIcons style={{alignItems: 'center', textAlign: 'center'}} name="stop" color="white" />}
              iconSize={20}
              onPress={() => this.toggleRecord()}
              style={[styles.icon, styles.iconStop]}
            />
            }
            <TouchIcon
              icon={<Feather style={{alignItems: 'center', textAlign: 'center'}} name="database" color="white" />}
              iconSize={20}
              onPress={() => this.props.navigation.navigate('ModalData', {data: recordData, recordStatus: recordStatus})}
              style={[styles.icon, styles.iconShowData]}
            />
          </View>
        </View>

        <View style={styles.header}>
          <TouchIcon
            icon={<SvgMenu />}
            iconSize={32}
            onPress={() => navigation.toggleDrawer()}
          />
          <RequestRideType
            image={types[type].image}
            onPress={this.toggleTypeModal}
            text={types[type].text}
          />

          <View style={styles.placeholder} />
        </View>

        <SelectRideType
          data={types}
          onClose={this.toggleTypeModal}
          onSelect={this.changeRideType}
          visible={selectType}
        />

        {type === 'car' && <Information />}
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  map: {
    height: device.height,
    position: 'absolute',
    width: device.width
  },
  containerNoLocation: {
    alignItems: 'center',
    height: device.height,
    justifyContent: 'center',
    position: 'absolute',
    width: device.width
  },
  textLocationNeeded: {
    fontFamily: fonts.sansProMedium,
    fontSize: 16,
    marginBottom: 16
  },
  btnGoTo: {
    backgroundColor: colors.black,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  btnGoToText: {
    color: colors.white,
    fontFamily: fonts.sansProMedium,
    fontSize: 16
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: device.iPhoneX ? 58 : 34
  },
  placeholder: {
    height: 32,
    width: 32
  },
  rightContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 40
  },
  icon: {
    borderRadius: 18,
    height: 36,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    width: 36
  },
  iconSettings: {
    backgroundColor: colors.blue
  },
  iconPlay: {
    backgroundColor: colors.green    
  },
  iconStop: {
    backgroundColor: colors.red
  },
  iconShowData: {
    backgroundColor: colors.greyAbbey
  }
});

export default Home;
