import dayjs from 'dayjs';
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import FooterContainer from './FooterContainer';

const PreviewScreen = ({navigation, route}) => {
  let selectedDevice = route.params;

  const getBorderWidth = () => {
    return 1;
  };

  const getBorderColor = num => {
    return '#000';
  };
  const handleUpdateBorder = num => {
    handleSend('u');
    handleSend('v');
    setFocusedNode(num);
    inputValue.current = num;
  };

  return (
    <>
      <View style={styles.Device}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('./assets/footcare_logo.png')}
            resizeMode="contain"
            style={{height: 100, width: '100%'}}
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0.1,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: '#000',
          }}>
          <View
            style={[
              styles.headingTitle,
              {
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              },
            ]}>
            <Text
              style={[
                styles.Textsec,
                {width: '50%', fontWeight: 'bold', fontSize: 17},
              ]}>
              Name : {selectedDevice?.WriteData?.name}
            </Text>
            <Text
              style={[
                styles.Textsec,
                {width: '50%', fontWeight: 'bold', fontSize: 17},
              ]}>
              {' '}
              Date :{' '}
              {dayjs(selectedDevice?.WriteData?.date).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, paddingTop: 30, alignItems: 'center'}}>
          <Text style={styles.headingTitle}>Report</Text>
          <FooterContainer
            isDisabled={true}
            getBorderWidth={getBorderWidth}
            handleUpdateBorder={handleUpdateBorder}
            getBorderColor={getBorderColor}
            PointerValue={selectedDevice?.FooterValues}
            top={55}
          />

          {/* <View style={{height: 100, paddingVertical: 50}}>
            <TouchableOpacity
              style={[styles.submitBtn, {marginBottom: 20, width: 150}]}>
              <Text
                style={[
                  {
                    fontSize: 13,
                    color: 'black',
                  },
                ]}>
                Download
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitBtn,
                {
                  marginBottom: 20,
                  width: 150,
                  backgroundColor: '#fff',
                  borderColor: '#F7AD19',
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: 13,
                    color: 'black',
                  },
                ]}>
                Share
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
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
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
});

export default PreviewScreen;
