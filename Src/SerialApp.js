import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial';
import DeviceStatus from './DeviceStatus';
import {requestBluetoothPermission} from './requestBluetoothPermission';

const SerialApp = ({navigation}) => {
  const {BluetoothRWModule} = NativeModules;
  const [DeviceList, setDeviceList] = useState([]);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const [selectedDevice, setselectedDevice] = useState();
  const [blueToothEnabled, setblueToothEnabled] = useState(false);
  const [bluetoothupdated, setbluetoothupdated] = useState(false);

  const getBluetoothData = useCallback(() => {
    if (Math.floor(parseFloat(Platform.constants.Release)) <= 11) {
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
        values => {
          const [isEnabled, devices] = values;
          setblueToothEnabled(isEnabled);
          setDeviceList(devices);
        },
      );
    } else {
      requestBluetoothPermission().then(res => {
        console.log(res, 'vayayfyuagyu');
        if (res.status) {
          Promise.all([
            BluetoothSerial.isEnabled(),
            BluetoothSerial.list(),
          ]).then(values => {
            const [isEnabled, devices] = values;
            setblueToothEnabled(isEnabled);

            setDeviceList(devices);
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getBluetoothData();
    }, 1000);
  }, [bluetoothupdated]);

  const renderDeviceItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onSelectDevice(item)}
        style={{
          padding: 10,
          marginVertical: 10,
          borderRadius: 10,
          marginHorizontal: 10,
          alignItems: 'flex-start',
          justifyContent: 'center',
          borderColor: '#000',
          borderWidth: 1,
        }}>
        <View>
          <Text style={{color: '#000'}}>{item.name}</Text>
          <Text note style={{color: '#000'}}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onSelectDevice = device => {
    BluetoothRWModule.connect(device.address)
      .then(res => {
        if (res.status) {
          navigation.navigate('userdata', {...device});
          setselectedDevice(device);
        } else {
          ToastAndroid.show('Device not Connected', ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(err, 'ahuaih');
      });
  };

  const handleEnableBlueTooth = () => {
    BluetoothSerial.enable()
      .then(res => {
        getBluetoothData();
        setbluetoothupdated(!bluetoothupdated);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {selectedDevice && deviceStatus ? (
        <>
          <DeviceStatus
            selectedDevice={selectedDevice}
            setDeviceStatus={setDeviceStatus}
          />
        </>
      ) : (
        <>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#000',
                marginLeft: 10,
                padding: 10,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Bluetooth
            </Text>
            {blueToothEnabled ? (
              <TouchableOpacity
                disabled
                style={{
                  marginRight: 30,
                  backgroundColor: 'green',
                  height: 40,
                  borderRadius: 11,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text style={{color: '#fff', fontSize: 13}}>Enabled</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  padding: 10,
                  marginRight: 30,
                  backgroundColor: 'green',
                  height: 40,
                  borderRadius: 11,
                }}
                onPress={() => handleEnableBlueTooth()}>
                <Text style={{color: '#fff'}}>Enable</Text>
              </TouchableOpacity>
            )}
          </View>
          {blueToothEnabled && DeviceList.length !== 0 && (
            <View style={{flex: 1, paddingVertical: 20}}>
              <View
                style={{
                  paddingBottom: 10,
                  borderBottomWidth: 1,

                  borderBottomColor: '#000',
                  marginHorizontal: 10,
                  marginBottom: 30,
                }}>
                <Text style={{color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                  Available Devices
                </Text>
              </View>
              <FlatList
                data={DeviceList}
                renderItem={renderDeviceItem}
                keyExtractor={item => item.address}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default SerialApp;

const styles = StyleSheet.create({});
