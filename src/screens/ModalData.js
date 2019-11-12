import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, FlatList, ScrollView, Dimensions, StyleSheet} from 'react-native';
import { gStyle } from '../constants';

// components
import Normalize from '../components/Normalize';
import ModalHeader from '../components/ModalHeader';
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class ModalData extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("data", null);
    return (
      <View style={gStyle.container}>
        <ModalHeader navigation={navigation} text="Data"/>
        <Text> Count: {data.length}</Text>
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
});

ModalData.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ModalData;
