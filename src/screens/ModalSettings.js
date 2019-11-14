import React from 'react';
import { Text, View, AsyncStorage, Switch } from 'react-native';

import { gStyle } from '../constants';

import ModalHeader from '../components/ModalHeader';

class ModalSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueDataEnabled: false
    }
  }
  componentDidMount = async () => {
    const uniqueDataEnabled = JSON.parse(await AsyncStorage.getItem("uniqueDataEnabled"));
    this.setState({uniqueDataEnabled: uniqueDataEnabled});

  }
  changeAsyncStorage = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    this.setState({[key]:value})
  }
  render() {
    const {navigation} = this.props;
    return(
      <View style={gStyle.container}>
        <ModalHeader navigation={navigation} text="Settings"/>
        <View style={{
              flexDirection: "row",
              paddingTop: "3%",
              paddingHorizontal: "3%",
              alignItems: "center"
            }}>
          <View style={{flex:0.5}}>
            <Text style={{ fontSize: 18 }}>Unique Data</Text>
          </View>
          <View style={{flex:0.5}}>
            <Switch
              onValueChange={value => {
                this.changeAsyncStorage(
                  "uniqueDataEnabled",
                  value
                );
              }}
              value={this.state.uniqueDataEnabled}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default ModalSettings;
