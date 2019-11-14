import React from 'react';
import { Text, View, AsyncStorage, Switch, StyleSheet } from 'react-native';

import { gStyle, colors } from '../constants';

import Normalize from '../components/Normalize';
import ModalHeader from '../components/ModalHeader';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueDataEnabled: false,
      liveDrawOnMap: false
    }
  }

  render() {
      const {navigation} = this.props;
      return (
          <View style={gStyle.container}>
            <ModalHeader navigation={navigation} text="History"/>
          </View>
      )
  }
}

export default History;