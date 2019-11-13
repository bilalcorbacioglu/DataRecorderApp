import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { colors, device, fonts, gStyle } from '../constants';
import SvgClose from './icons/Svg.Close';

const ModalHeader = ({ navigation, style, text }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
      onPress={() => navigation.goBack(null)}
      style={styles.containerIconRight}
    >
      <SvgClose />
    </TouchableOpacity>
    {text && <Text style={styles.header}>{text}</Text>}
  </View>
);

ModalHeader.defaultProps = {
  style: {},
  text: null
};

ModalHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ficonicBackground,
    paddingHorizontal: 24,
    paddingTop: device.iPhoneX ? 48 : 24
  },
  containerIconRight: {
    width: 20
  },
  header: {
    color: colors.black,
    fontFamily: fonts.sansProMedium,
    fontSize: 28,
    paddingVertical: 16
  }
});

export default ModalHeader;
