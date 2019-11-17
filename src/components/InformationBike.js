import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, device, fonts } from '../constants';
import { MaterialCommunityIcons } from "@expo/vector-icons";


const InformationBike = () => (
  <View style={styles.container}>
    <View style={styles.containerBanner}>
      <Text style={styles.bannerText}>Elapsed Time: 01:22:23</Text>
      <Text style={styles.bannerNearDistance}>Cloudy · 44°F</Text>
    </View>
    <View style={styles.containerInput}>
      <View style={styles.containerSquare}>
        <View style={styles.square} />
      </View>
      <Text style={styles.text}>1881 Calories burned</Text>
      <View style={styles.containerIcon}>
        <MaterialCommunityIcons 
          style={{alignItems: 'center', textAlign: 'center'}} 
          name="bike" 
          color="green" 
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
    backgroundColor: colors.turquoise,
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

export default InformationBike;
