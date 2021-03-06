import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import OpenTok, { Subscriber, Publisher } from 'react-native-opentok';
// import type { Ref } from 'react';
var { height, width } = Dimensions.get('window');
import Styles from './Styles';

import Icon from 'react-native-vector-icons/Ionicons';

const sessionId = '1_MX40NjA3MTEyMn5-MTUyMDM3MTA2NTc5OX5pdTRHZm1YQWc5ZWc4OGduby9DVytQQk1-fg';
const token =
  'T1==cGFydG5lcl9pZD00NjA3MTEyMiZzaWc9ODM0YTM0NzYwMjYwY2NiZGZhNGJjNjczMWNiMzE3ZWQ1YTFiMzNkOTpzZXNzaW9uX2lkPTFfTVg0ME5qQTNNVEV5TW41LU1UVXlNRE0zTVRBMk5UYzVPWDVwZFRSSFptMVlRV2M1WldjNE9HZHVieTlEVnl0UVFrMS1mZyZjcmVhdGVfdGltZT0xNTIwNDQ2MDgzJm5vbmNlPTAuNjk4Njg3MjgxNzc2NDY4NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTIzMDM0NDgyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
const SESSION_ID = '2_MX40NjA3MTEyMn5-MTUyMDYxNTY4ODg2NH56bGtWSHZjZ1pUZ2x3cDBiSHBQMlNUNWR-fg';
const TOKEN =
  'T1==cGFydG5lcl9pZD00NjA3MTEyMiZzaWc9YWQ3MWMyMjY3MmMwNzcwZjUzMzQ5NDRiYmJjYWE2ZmIxZTVhMjM1ZTpzZXNzaW9uX2lkPTJfTVg0ME5qQTNNVEV5TW41LU1UVXlNRFl4TlRZNE9EZzJOSDU2Ykd0V1NIWmpaMXBVWjJ4M2NEQmlTSEJRTWxOVU5XUi1mZyZjcmVhdGVfdGltZT0xNTIwNjE1NzAxJm5vbmNlPTAuNjk0NzEzNTU1ODE3MTQ1OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTIzMjA0MTAwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

export default class Viewer extends Component {
  ref;
  async componentWillMount() {
    const res = await OpenTok.connect(sessionId, token);
    const res2 = await OpenTok.connect(SESSION_ID, TOKEN);
    console.log('lool', res, res2);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={Styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => this.cancelAndBack()}>
          <Icon
            name="ios-arrow-back-outline"
            size={28}
            color="white"
            style={{ fontWeight: 'bold' }}
          />
        </TouchableOpacity>
        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
          <Text style={Styles.locBtnText}> Publish </Text>
        </View>
      </View>
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.9 }}>
          <Publisher
            sessionId={SESSION_ID}
            style={{ backgroundColor: 'black', height: '50%', width: '50%' }}
            onPublishStart={() => {
              console.log('started');
            }}
            ref={ref => {
              this.ref = ref;
            }}
          />
          <Subscriber
            sessionId={sessionId}
            style={{ backgroundColor: 'red', height: '50%', width: '50%' }}
            onSubscribeStart={() => {
              console.log('Watching started');
            }}
            onSubscribeStop={() => {
              console.log('Watching stopped');
            }}
            onSubscribeError={() => {
              console.log('Watching error');
            }}
            ref={ref => {
              this.ref = ref;
            }}
          />
        </View>
        <View style={{ flex: 0.1, flexDirection: 'row' }}>
          <TouchableOpacity style={styles.cancel} onPress={() => this.cancelAndBack()}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  cancelAndBack() {
    OpenTok.disconnect(sessionId);
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cancel: {
    backgroundColor: '#E74C3C',
    flex: 1,
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center'
  }
});
