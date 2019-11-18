import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts } from '../constants';
import { AntDesign } from '@expo/vector-icons';

const InformationCar = () => (
  <View style={styles.container}>
    <View style={styles.containerBanner}>
      <Text style={styles.bannerText}>Welcome Back Bilal!</Text>
      <Text style={styles.bannerNearDistance}>After 20Km</Text>
    </View>
    <View style={styles.containerInput}>
      <View style={styles.containerSquare}>
        <View style={styles.square} />
      </View>
      <Text style={styles.text}>Road Damages / Rantaväylä, Jyväskylä</Text>
      <View style={styles.containerIcon}>
        <AntDesign
          style={{ alignItems: 'center', textAlign: 'center' }}
          name="warning"
          color="red"
          size={23}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    top: device.iPhoneX ? 144 : 120,
    width: device.width - 40
  },
  containerBanner: {
    backgroundColor: colors.orange,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.sansProMedium,
    fontSize: 12
  },
  bannerNearDistance: {
    color: colors.greyGallery,
    fontFamily: fonts.sansProMedium,
    fontSize: 12
  },
  containerInput: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 48
  },
  containerSquare: {
    alignItems: 'center',
    flex: 1.3
  },
  square: {
    backgroundColor: colors.black,
    height: 8,
    width: 8
  },
  text: {
    color: colors.greyAbbey,
    flex: 8,
    fontFamily: fonts.sansProMedium,
    fontSize: 20
  },
  containerIcon: {
    alignItems: 'center',
    borderLeftColor: colors.greyMercury,
    borderLeftWidth: 1,
    flex: 1.5
  }
});

export default InformationCar;
