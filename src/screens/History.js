import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';

import { gStyle } from '../constants';

import Normalize from '../components/Normalize';
import ModalHeader from '../components/ModalHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentDidMount() {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory).then(files => {
      this.setState({
        files: files.filter(file => file.match('.csv') != null).reverse()
      });
    });
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View />;
    }
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          this.props.navigation.navigate('RecordDetail', { fileName: item })
        }
      >
        <Text style={styles.title}>
          File: {item}
          {'\n'}
        </Text>
        <Text style={styles.title}>
          Date:{' '}
          {moment
            .unix(item.replace('.csv', '').substring(0, 10))
            .format('DD MMM hh:mm:ss A')}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const { files } = this.state;
    return (
      <View style={gStyle.container}>
        <ModalHeader navigation={navigation} text="History" backIcon={true} />
        <ScrollView style={gStyle.p24}>
          <FlatList
            data={files}
            renderItem={this.renderItem}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: Normalize(3),
    height: DEVICE_HEIGHT / 8,
    backgroundColor: 'gray'
  },
  title: {
    fontSize: Normalize(13),
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '#ffffff'
  }
});

export default History;
