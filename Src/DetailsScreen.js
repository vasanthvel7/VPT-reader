import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {ASCIITable} from './utility';
import FooterContainer from './FooterContainer';
import VerifyModal from './VerifyModal';
import Header from './components/Header';
var count = 0;
var zcount = 0;
const DetailsScreen = ({navigation, route}) => {
  const {BluetoothRWModule} = NativeModules;
  let selectedDevice = route.params;
  let inputValue = useRef(1);
  const eventEmitter = new NativeEventEmitter(BluetoothRWModule);
  const [FocusedNode, setFocusedNode] = useState(1);
  const [PointerValue, setPointerValue] = useState({
    value_1: 'NR',
    value_2: 'NR',
    value_3: 'NR',
    value_4: 'NR',
    value_5: 'NR',
    value_6: 'NR',
    value_7: 'NR',
    value_8: 'NR',
    value_9: 'NR',
    value_10: 'NR',
    value_11: 'NR',
    value_12: 'NR',
  });
  const [DeviceValue, setDeviceValue] = useState('00');
  const [data, setdata] = useState([]);
  const listData = useRef([]);
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    listData.current = data;
  }, [data]);

  useEffect(() => {
    const readDataListener = eventEmitter.addListener('read', event => {
      if (event.given_msg === 'y') {
        setdata(pre => [...pre, event.response]);
      } else if (event.given_msg === '#') {
        let findASCII = ASCIITable.find(ele =>
          event.response.includes(ele.data),
        );
        if (findASCII !== undefined) {
          setDeviceValue(findASCII.value);
        }
      } else if (event.given_msg === 'v') {
        if (event.response === '[' || count === 1) {
          if (count === 1) {
            let findASCII = ASCIITable.find(ele =>
              event.response.includes(ele.data),
            );
            if (findASCII !== undefined) {
              setPointerValue(pre => ({
                ...pre,
                ['value_' + inputValue.current]: findASCII.value,
              }));
            }

            handleSend('z');
          }
          count = count + 1;
        } else {
          let findASCII = ASCIITable.find(ele =>
            event.response.includes(ele.data),
          );
          if (findASCII !== undefined) {
            setDeviceValue(findASCII.value);
          }
        }
      } else if (event.given_msg === 'x') {
        setDeviceValue('00');
      } else if (event.given_msg === 'z') {
        if (zcount === 0) {
          zcount = zcount + 1;
        } else if (zcount === 1) {
          let findASCII = ASCIITable.find(ele =>
            event.response.includes(ele.data),
          );

          if (findASCII !== undefined) {
            console.log(findASCII.value);
            zcount = 0;
            setDeviceValue(findASCII.value);
          }
        }
      }
    });
    const failedListener = eventEmitter.addListener(
      'connectionFailed',
      event => {
        setdata(pre => [...pre, event]);
        navigation.navigate('Home');
      },
    );
    return () => {
      readDataListener.remove();
      failedListener.remove();
    };
  }, []);

  const handleSend = (value, num) => {
    BluetoothRWModule.writeData(value)
      .then(res => {
        count = 0;
      })
      .catch(err => console.log(err));
  };

  const getBorderWidth = num => {
    return FocusedNode === num ? 3 : 1;
  };

  const getBorderColor = num => {
    return FocusedNode === num ? 'red' : '#000';
  };

  const handleUpdateBorder = num => {
    handleSend('u');
    handleSend('v');
    setFocusedNode(num);
    inputValue.current = num;
  };

  useEffect(() => {
    handleSend('#');
    handleSend('u');
    handleSend('v');
  }, []);

  return (
    <>
      <View style={styles.Device}>
        <Header
          navigation={navigation}
          selectedDevice={selectedDevice}
          connectedStatus={true}
          handleRefresh={() => {
            console.log('refresh');
          }}
          onConnectDevice={() => {
            console.log('connected');
          }}
        />

        <View
          style={{
            paddingTop: 20,
            paddingVertical: 90,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.headingTitle,
              {
                padding: 10,
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 11,
              },
            ]}>
            Data : {DeviceValue}
          </Text>
        </View>

        <View
          style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.headingTitle}>Reading</Text>
          <FooterContainer
            handleUpdateBorder={handleUpdateBorder}
            getBorderWidth={getBorderWidth}
            getBorderColor={getBorderColor}
            PointerValue={PointerValue}
            isDisabled={false}
            top={-30}
          />

          <View style={{height: 100, paddingVertical: 50}}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                setVisible(true);
              }}>
              <Text
                style={[
                  {
                    color: 'black',
                    fontSize: 13,
                  },
                ]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <VerifyModal
        Visible={Visible}
        setVisible={setVisible}
        onComplete={() => {
          navigation.navigate('preview', {
            ...selectedDevice,
            Value: DeviceValue,
            FooterValues: PointerValue,
          });
        }}
      />
    </>
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

  headingTitle: {
    color: '#000',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '900',
  },
  textColor: {
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#F7AD19',
    borderWidth: 1,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
});

export default DetailsScreen;
