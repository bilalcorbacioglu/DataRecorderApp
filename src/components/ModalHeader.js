import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { colors, device, fonts, gStyle } from '../constants';
import SvgClose from './icons/Svg.Close';
import { Ionicons } from "@expo/vector-icons";

const ModalHeader = ({ navigation, style, backIcon ,text }) => (
  <View style={[styles.container, style]}>
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
      onPress={() => navigation.goBack(null)}
      style={styles.containerIconRight}
    >
      {backIcon ? <Ionicons name={'ios-arrow-back'} size={25} color={colors.black}/>
      : <SvgClose />
      }
    </TouchableOpacity>
    {text && <Text style={styles.header}>{text}</Text>}
  </View>
);

ModalHeader.defaultProps = {
  style: {},
  text: null,
  backIcon: false
};

ModalHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  backIcon: PropTypes.bool,
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
