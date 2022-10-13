import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {ASCIITable} from './utility';

const DeviceStatus = ({selectedDevice, setDeviceStatus}) => {
  const {BluetoothRWModule} = NativeModules;
  const eventEmitter = new NativeEventEmitter(BluetoothRWModule);
  const [textValue, settextValue] = useState('');
  const [DeviceValue, setDeviceValue] = useState('00');
  const InputValue = useRef(null);
  const [connectedStatus, setconnectedStatus] = useState(false);
  const [WriteData, setWriteData] = useState('');
  const [data, setdata] = useState([]);
  const listData = useRef([]);

  useEffect(() => {
    listData.current = data;
  }, [data]);

  useEffect(() => {
    eventEmitter.addListener('read', event => {
      if (event.given_msg === 'y') {
        setdata(pre => [...pre, event.response]);
      } else if (event.given_msg === '#') {
        if (event.response !== '<') {
          let findASCII = ASCIITable.find(ele =>
            event.response.includes(ele.data),
          );
          if (findASCII !== undefined) {
            setDeviceValue(findASCII.value);
          }
        }
      } else if (event.given_msg === 'x') {
        setDeviceValue('00');
      }
    });
    eventEmitter.addListener('connectionFailed', event => {
      setdata(pre => [...pre, event]);
      setconnectedStatus(false);
    });
  }, []);

  const handleConnect = async () => {
    BluetoothRWModule.connect(selectedDevice.address);
    setconnectedStatus(true);
    // BluetoothSerial.connect(selectedDevice.address)
    //   .then(paired => {
    //
    //   })
    //   .catch(err => {
    //     console.log(err, 'aguyaguy');
    //   });
  };

  useEffect(() => {
    BluetoothSerial.withDelimiter('\n')
      .then(res => {
        console.log(res, '===> withDelimiter');
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDisConnect = () => {
    BluetoothSerial.disconnect()
      .then(paired => {
        setconnectedStatus(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSend = value => {
    settextValue('');
    BluetoothRWModule.writeData(value)
      .then(res => {
        console.log(res, '===> Write');
        setWriteData(res.Data);
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.Device}>
      <View style={[styles.HeadingSec, {height: 50}]}>
        <View>
          <TouchableOpacity
            style={[
              styles.connectSec,
              {borderColor: '#000', borderWidth: 1, marginTop: 2},
            ]}
            onPress={() => {
              setDeviceStatus(false);
            }}>
            <Text style={styles.Textsec}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 4}}>
          <Text style={[styles.Textsec, {textAlign: 'center'}]}>
            {selectedDevice?.name}
          </Text>
          <Text style={styles.Textsec}>{selectedDevice?.address}</Text>
        </View>
        {connectedStatus ? (
          <TouchableOpacity
            style={[styles.connectSec, {backgroundColor: 'red'}]}
            onPress={() => handleDisConnect()}>
            <Text style={styles.conTextsec}>Disconnect</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.connectSec, {backgroundColor: 'green'}]}
            onPress={() => handleConnect()}>
            <Text style={styles.conTextsec}>Connect</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{paddingTop: 10}}>
        <Text style={styles.Textsec}>Device Value is : {DeviceValue}</Text>
      </View>
      <View
        style={{
          flex: 1,

          marginVertical: 20,
        }}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <View>
              <Text style={styles.Textsec}>{item}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputSec}>
        <TextInput
          style={styles.textinput}
          value={textValue}
          onChangeText={value => {
            InputValue.current = value;
            settextValue(value);
          }}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => {
            handleSend(textValue);
          }}>
          <Text style={styles.Textsec}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Device: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  HeadingSec: {
    flex: 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSec: {
    flexDirection: 'row',
  },
  textinput: {
    borderRadius: 11,
    backgroundColor: '#fff',
    color: '#000',
    width: '85%',
    borderColor: '#000',
    borderWidth: 1,
  },
  sendBtn: {
    backgroundColor: 'aqua',
    width: '15%',
    borderRadius: 11,
    padding: 10,
    paddingTop: 15,
    textAlign: 'center',
    marginLeft: 5,
  },
  Textsec: {
    color: '#000',
  },
  conTextsec: {
    color: '#fff',
  },
  connectSec: {
    height: 40,
    padding: 10,
    borderRadius: 11,
  },
});

export default DeviceStatus;
