import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  NativeModules,
  Image,
  ToastAndroid,
  NativeEventEmitter,
} from 'react-native';

import RefreshImg from '../assets/refresh.svg';

const Header = ({
  selectedDevice,
  connectedStatus,
  setconnectedStatus,
  navigation,
}) => {
  const {BluetoothRWModule} = NativeModules;
  const eventEmitter = new NativeEventEmitter(BluetoothRWModule);

  const [isConnected, setisConnected] = useState(true);
  const [disableRefresh, setdisableRefresh] = useState(true);
  useEffect(() => {
    eventEmitter.addListener('connectionSuccess', event => {
      handleSend('y');
    });
    eventEmitter.addListener('connectionFailed', event => {
      setconnectedStatus(false);
      setdisableRefresh(true);
    });
  }, []);

  const handleSend = value => {
    BluetoothRWModule.writeData(value)
      .then(res => {
        console.log(res, 'gyaugyuag');
        if (res.status) {
          setisConnected(true);
          setconnectedStatus(true);
        } else {
          ToastAndroid.show('Please Restart app...', ToastAndroid.SHORT);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log(connectedStatus);
    if (!connectedStatus) {
      setTimeout(() => {
        setisConnected(false);
      }, 2000);
    }
  }, [isConnected, connectedStatus]);

  return (
    <View>
      <View style={[styles.HeadingSec]}>
        <View>
          <TouchableOpacity
            style={[
              styles.connectSec,
              {borderColor: '#000', borderWidth: 1, marginTop: 2},
            ]}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.Textsec}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 4, marginLeft: 25}}>
          <Text style={[styles.Textsec, {textAlign: 'center'}]}>
            {selectedDevice?.name}
          </Text>
          <Text style={styles.Textsec}>{selectedDevice?.address}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {disableRefresh && !connectedStatus && (
            <TouchableOpacity
              disabled={isConnected}
              onPress={() => {
                BluetoothRWModule.connect(selectedDevice.address)
                  .then(res => {
                    if (res.status) {
                      setdisableRefresh(true);
                      ToastAndroid.show('Connecting...', ToastAndroid.SHORT);
                      handleSend('y');
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
              style={[styles.connectSec]}>
              <RefreshImg fill={'#000'} height={24} width={24} />
            </TouchableOpacity>
          )}
          {connectedStatus ? (
            <TouchableOpacity
              disabled
              style={[styles.connectSec, {backgroundColor: 'green'}]}>
              <Text style={[styles.conTextsec]}>Connected</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled
              style={[
                styles.connectSec,
                {backgroundColor: isConnected ? 'green' : 'red'},
              ]}>
              <Text style={styles.conTextsec}>
                {isConnected ? 'Connecting...' : 'Not Connected'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/footcare_logo.png')}
          resizeMode="contain"
          style={{height: 100, width: '100%', marginRight: 10}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeadingSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Textsec: {
    color: '#000',
    fontSize: 13,
  },
  conTextsec: {
    color: '#fff',
    fontSize: 13,
  },
  connectSec: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 11,
    borderRadius: 11,
  },
});

export default Header;
