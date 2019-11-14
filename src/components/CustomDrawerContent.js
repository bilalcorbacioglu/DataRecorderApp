import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import Constants from 'expo-constants';
import { colors, device, fonts } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

const CustomDrawerContent = ({navigation}) => (
  //TODO: Convert Dynamic -> Drawer Items
  <View style={styles.container}>
    <SafeAreaView
      forceInset={{ top: "always", horizontal: "never" }}
      style={{
        marginTop: 44,
        alignItems: "flex-end",
        alignContent: "flex-end",
        alignSelf: "flex-end"
      }}
    > 
      <View style={{marginRight: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={{ color: "black", fontSize: 20, marginTop: 14, textAlign: "center" }}>
            Home
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "flex-start",
            alignSelf: "flex-start"
          }}
        >
          <Text
            style={{
              marginTop: 14,
              width: 198,
              marginLeft: 22,
              height: 3,
              borderColor: "#000000",
              backgroundColor: "black"
            }}
          />
        </View>
      </View>
      <View style={{marginRight: 20}}>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Text style={{ color: "black", fontSize: 20, marginTop: 14, textAlign: "center" }}>
            History
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "flex-start",
            alignContent: "flex-start",
            alignSelf: "flex-start"
          }}
        >
          <Text
            style={{
              marginTop: 14,
              width: 198,
              marginLeft: 22,
              height: 3,
              borderColor: "#000000",
              backgroundColor: "black"
            }}
          />
        </View>
      </View>
    </SafeAreaView>
    <View style={styles.containerVersion}>
      <Text style={styles.versionText}>{`v${Constants.manifest.version}`}</Text>
    </View>
  </View>
);

CustomDrawerContent.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  containerVersion: {
    bottom: device.iPhoneX ? 40 : 16,
    paddingHorizontal: 38,
    position: 'absolute',
    width: '100%'
  },
  versionText: {
    color: colors.grey,
    fontFamily: fonts.sansProRegular,
    fontSize: 20,
    textAlign: 'right'
  },
  list: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    padding:40
  },
  listItem: {
    flex:1,
    flexDirection:'row'
  }
});

export default CustomDrawerContent;
