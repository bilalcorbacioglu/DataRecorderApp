import React from 'react';
import { Text, View, StyleSheet, Card, ScrollView, FlatList, Dimensions, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import moment from "moment";
import { gStyle, colors, func, device, fonts} from '../constants';
import MapView from 'react-native-maps';

import Normalize from '../components/Normalize';
import ModalHeader from '../components/ModalHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const { PROVIDER_GOOGLE } = MapView;
const GOOGLEMAPSAPICODE = 'AIzaSyAqv1HRHa0zSN2NmX-CbraN50VovMuXDfo';
class RecordDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordData: [],
      fileName: "",
      fromAddress: "",
      toAddress: ""
    }
  }

  async componentDidMount() {
    const fileName = this.props.navigation.getParam("fileName", null);
    this.setState({fileName: fileName})
    await FileSystem.readAsStringAsync(FileSystem.documentDirectory+fileName).then(string=>{
      this.setState({recordData: func.csvStringToObject(string)});
    })
    
    if (this.state.recordData.length > 0) {
      const fromAddress = await this.getLocationAddress(this.state.recordData[0].Latitude,this.state.recordData[0].Longitude);
      const toAddress = await this.getLocationAddress(this.state.recordData[this.state.recordData.length-1].Latitude,this.state.recordData[this.state.recordData.length-1].Longitude);
      this.setState({fromAddress: fromAddress});
      this.setState({toAddress: toAddress});
    }
  }

  async getLocationAddress(latitude, longitude) {
    console.log(latitude, longitude);
    let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLEMAPSAPICODE}`)
    let resultJson = await result.json();
    console.log(resultJson.results);
    return resultJson.results[0].formatted_address;
  }


  onShare = async () => {
    const uri = FileSystem.documentDirectory + this.state.fileName;
    
    const result = await Share.share({
      url: uri,
    }); 

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  }

  render() {
      const {navigation} = this.props;
      const {recordData, fromAddress, toAddress} = this.state;
      const recordDataLength = recordData.length;
      return (
        <View style={gStyle.container}>
          <ModalHeader navigation={navigation} text="Record Detail" backIcon={true}/>
          {recordDataLength > 0 && 
            <View style={styles.subHeader}>
              <View style={styles.subHeaderView}>
                <Text style={styles.subViewText}>From: {fromAddress}</Text>
              </View>
              <View style={styles.subHeaderView}>
                <Text style={styles.subViewText}>To: {toAddress}</Text>
              </View>
            </View>
          }
          <View style={styles.subHeader}>
            <View style={styles.subHeaderView}>
              <TouchableOpacity onPress={this.onShare}><Text style={styles.subViewText}>Export</Text></TouchableOpacity>
            </View>
            <View style={styles.subHeaderView}>
              <Text style={styles.subViewText}>Count: {recordDataLength}</Text>
            </View>
          </View>
          {recordDataLength > 0 && 
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: Number(recordData[0].Latitude),
                longitude: Number(recordData[0].Longitude),
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
              }}
              style={styles.map}
            >
              <MapView.Polyline
                coordinates={
                  recordData.map((point, index) => {
                    return {
                      latitude: Number(point.Latitude),
                      longitude: Number(point.Longitude)
                    }
                  })
                }
                strokeWidth={4}
                strokeColor="blue"
              />
            </MapView>
          }
        </View>
      )
  }
}

const styles = StyleSheet.create({
  card: {
    flex:1, 
    flexDirection:'column',
    marginBottom: Normalize(3),
    height: DEVICE_HEIGHT/8,
    backgroundColor: 'gray'
  },
  title: {
    fontSize: Normalize(13),
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
    color: "#ffffff"
  },
  map: {
    height: device.height/1.3,
    position: 'relative',
    width: device.width
  },
  subHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 10
  },
  subHeaderView: {
    flex: 0.5
  },
  subViewText: {
    color: colors.black50,
    fontFamily: fonts.sansProMedium,
    fontSize: Normalize(15),
    paddingHorizontal: 6,
    paddingVertical: 6,
    textAlign: 'center'
  },
})

export default RecordDetail;