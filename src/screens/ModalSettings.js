import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

import { gStyle } from '../constants';

import ModalHeader from '../components/ModalHeader';

const ModalSettings = ({ navigation }) => (
  <View style={gStyle.container}>
    <ModalHeader navigation={navigation} text="Map Settings"/>
    <Text>External Modal</Text>
  </View>
);

ModalSettings.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ModalSettings;
