import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import OpenTok, { Publisher, Subscriber } from 'react-native-opentok';
import Styles from './Styles';
// import type { Ref } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
var { height, width } = Dimensions.get('window');

const sessionId = '1_MX40NjA3MTEyMn5-MTUyMDM3MTA2NTc5OX5pdTRHZm1YQWc5ZWc4OGduby9DVytQQk1-fg';
const token =
  'T1==cGFydG5lcl9pZD00NjA3MTEyMiZzaWc9ODM0YTM0NzYwMjYwY2NiZGZhNGJjNjczMWNiMzE3ZWQ1YTFiMzNkOTpzZXNzaW9uX2lkPTFfTVg0ME5qQTNNVEV5TW41LU1UVXlNRE0zTVRBMk5UYzVPWDVwZFRSSFptMVlRV2M1WldjNE9HZHVieTlEVnl0UVFrMS1mZyZjcmVhdGVfdGltZT0xNTIwNDQ2MDgzJm5vbmNlPTAuNjk4Njg3MjgxNzc2NDY4NCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTIzMDM0NDgyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';
const SESSION_ID = '2_MX40NjA3MTEyMn5-MTUyMDYxNTY4ODg2NH56bGtWSHZjZ1pUZ2x3cDBiSHBQMlNUNWR-fg';
const TOKEN =
  'T1==cGFydG5lcl9pZD00NjA3MTEyMiZzaWc9YWQ3MWMyMjY3MmMwNzcwZjUzMzQ5NDRiYmJjYWE2ZmIxZTVhMjM1ZTpzZXNzaW9uX2lkPTJfTVg0ME5qQTNNVEV5TW41LU1UVXlNRFl4TlRZNE9EZzJOSDU2Ykd0V1NIWmpaMXBVWjJ4M2NEQmlTSEJRTWxOVU5XUi1mZyZjcmVhdGVfdGltZT0xNTIwNjE1NzAxJm5vbmNlPTAuNjk0NzEzNTU1ODE3MTQ1OCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTIzMjA0MTAwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

export default class Publish extends Component {
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

  ref;

  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    const res2 = await OpenTok.connect(SESSION_ID, TOKEN);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.7 }}>
          <Publisher
            sessionId={sessionId}
            style={{ backgroundColor: 'black', height: '50%', width: '50%' }}
            mute={true}
            onPublishStart={() => {
              console.log('started');
            }}
            ref={ref => {
              this.ref = ref;
            }}
          />
          <Subscriber
            sessionId={SESSION_ID}
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
            // ref={ref => {
            //   this.ref = ref;
            // }}
          />
        </View>
        <View style={{ flex: 0.15, flexDirection: 'row' }}>
          <View style={{ flex: 0.2 }} />
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => {
              if (typeof this.ref !== 'string') this.ref.switchCamera();
            }}
          >
            <Icon
              name="ios-reverse-camera"
              size={40}
              color="white"
              style={{ fontWeight: 'bold' }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBox}>
            <Icon name="ios-volume-off" size={40} color="white" style={{ fontWeight: 'bold' }} />
          </TouchableOpacity>
          <View style={{ flex: 0.2 }} />
        </View>
        <View style={{ flex: 0.15, flexDirection: 'row' }}>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => this.cancelAndBack()}>
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
  publisher: {
    backgroundColor: 'black',
    height: height,
    width: width
  },
  iconBox: {
    flex: 0.3,
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'white'
  },
  cancelBtn: {
    backgroundColor: '#E74C3C',
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIcon: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingTop: 10
  }
});
