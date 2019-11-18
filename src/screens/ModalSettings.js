import React from 'react';
import { Text, View, AsyncStorage, Switch, StyleSheet } from 'react-native';

import { gStyle, colors } from '../constants';

import Normalize from '../components/Normalize';
import ModalHeader from '../components/ModalHeader';

class ModalSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueDataEnabled: false,
      liveDrawOnMap: false
    };
  }
  componentDidMount = async () => {
    const uniqueDataEnabled = JSON.parse(
      await AsyncStorage.getItem('uniqueDataEnabled')
    );
    const liveDrawOnMap = JSON.parse(
      await AsyncStorage.getItem('liveDrawOnMap')
    );

    this.setState({
      uniqueDataEnabled: uniqueDataEnabled,
      liveDrawOnMap: liveDrawOnMap
    });
  };
  changeAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    this.setState({ [key]: value });
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={gStyle.container}>
        <ModalHeader navigation={navigation} text="Settings" />
        <View
          style={{
            flexDirection: 'row',
            paddingTop: '3%',
            paddingHorizontal: '3%',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 0.8 }}>
            <Text style={{ fontSize: 18 }}>Unique Data (By location)</Text>
          </View>
          <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
            <Switch
              onValueChange={value => {
                this.changeAsyncStorage('uniqueDataEnabled', value);
              }}
              value={this.state.uniqueDataEnabled}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: '3%'
          }}
        >
          <Text style={styles.note}>
            {' '}
            <Text style={{ color: colors.red }}>*</Text> Filtering can take some
            time when you open the data page.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: '3%',
            paddingHorizontal: '3%',
            alignItems: 'center'
          }}
        >
          <View style={{ flex: 0.8 }}>
            <Text style={{ fontSize: 18 }}>Live drawing on map</Text>
          </View>
          <View style={{ flex: 0.2, alignItems: 'flex-end' }}>
            <Switch
              onValueChange={value => {
                this.changeAsyncStorage('liveDrawOnMap', value);
                var changeStatusLiveDrawOnMap = navigation.getParam(
                  'changeStatusLiveDrawOnMap'
                );
                changeStatusLiveDrawOnMap();
              }}
              value={this.state.liveDrawOnMap}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: '3%'
          }}
        >
          <Text style={styles.note}>
            {' '}
            <Text style={{ color: colors.red }}>*</Text> If disabled, drawing is
            done after recording is finished. It can be disabled for application
            speed.
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  note: {
    fontSize: Normalize(10),
    color: colors.black40
  }
});
export default ModalSettings;
