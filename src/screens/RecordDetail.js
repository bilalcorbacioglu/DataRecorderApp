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
class RecordDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordData: [],
      fileName: "",
    }
  }

  componentDidMount() {
    const fileName = this.props.navigation.getParam("fileName", null);
    this.setState({fileName: fileName})

    FileSystem.readAsStringAsync(FileSystem.documentDirectory+fileName).then(string=>{
      this.setState({recordData: func.csvStringToObject(string)});
   })
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
      const {recordData, fileName} = this.state;
      return (
        <View style={gStyle.container}>
          <ModalHeader navigation={navigation} text="Record Detail" backIcon={true}/>
          <View style={styles.subHeader}>
          <View style={styles.subHeaderView}>
                <TouchableOpacity onPress={this.onShare}><Text style={styles.subViewText}>Export</Text></TouchableOpacity>
            </View>
            <View style={styles.subHeaderView}>
              <Text style={styles.subViewText}>Count: {recordData.length}</Text>
            </View>
          </View>
          {recordData.length > 0 && 
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: recordData[0].Latitude,
                longitude: recordData[0].Longitude,
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