import React from 'react';
import { Text, View, FlatList, ScrollView, Share, Dimensions, StyleSheet, Button, AsyncStorage } from 'react-native';
import { gStyle, fonts, colors, func } from '../constants';
import * as FileSystem from 'expo-file-system';

// components
import Normalize from '../components/Normalize';
import ModalHeader from '../components/ModalHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class ModalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount = async () => {
    this.setState({
      data: this.props.navigation.getParam("data", null),
      recordStatus: this.props.navigation.getParam("recordStatus",null),
    })

    const uniqueDataEnabled = JSON.parse(await AsyncStorage.getItem('uniqueDataEnabled'));
    if (uniqueDataEnabled)
      this.setState({data: func.convertUniqueArray(this.state.data)})
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
        return <View/>;
    }
    return (
      <View style={{...styles.card, backgroundColor: 'gray'}}>
        <Text style={styles.title}>Timestamp: {item.timestamp}{'\n'}</Text>
        <Text style={styles.title}>Latitude: {item.coords.latitude}</Text>
        <Text style={styles.title}>Longitude: {item.coords.longitude}</Text>
        <Text style={styles.title}>Altitude: {item.coords.altitude}</Text>
        <Text style={styles.title}>Speed: {item.coords.speed}</Text>
        <Text style={styles.title}>Accuracy: {item.coords.accuracy}</Text>
      </View>
    )
  }

  onShare = async () => {
    var csvStringFormat = func.convertStringCSV(this.state.data);

    const uri = FileSystem.cacheDirectory + Date.now() + ".csv";
    await FileSystem.writeAsStringAsync(
      uri,
      csvStringFormat,
      { encoding:FileSystem.EncodingType.UTF8 }
    );
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
    const { navigation } = this.props;
    const { data, recordStatus } = this.state;
    return (
      <View style={gStyle.container}>
        <ModalHeader navigation={navigation} text="Data"/>
        <View style={styles.subHeader}>
          <View style={styles.subHeaderView}>
            {data.length > 0 &&
              <TouchableOpacity onPress={this.onShare}><Text style={styles.countText}>Export</Text></TouchableOpacity>
            }
          </View>
          <View style={styles.subHeaderView}>
            {!recordStatus && data.length > 0 ?
              <TouchableOpacity onPress={this.onShare}><Text style={styles.countText}>Save</Text></TouchableOpacity> 
              : <View/>
            }
          </View>
          <View style={styles.subHeaderView}>
            <Text style={styles.countText}>Count: {data.length}</Text>
          </View>
        </View>
        <ScrollView style={gStyle.p24}>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              numColumns={1}
              keyExtractor={(item,index)=> index.toString()}
            />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex:1, 
    flexDirection:'column',
    marginBottom: Normalize(3),
    height: DEVICE_HEIGHT/6
  },
  title: {
    fontSize: Normalize(10),
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
    color: "#ffffff"
  },
  subHeader: {
    flexDirection:'row'
  },
  subHeaderView: {
    flex: 0.3
  },
  countText: {
    color: colors.black50,
    fontFamily: fonts.sansProMedium,
    fontSize: 20,
    paddingHorizontal: 6,
    paddingVertical: 6,
    textAlign: 'center'
  },
});

export default ModalData;
