import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FootImg from './assets/footImg_new.svg';
import {windowHeight, windowWidth} from './utility';

const FooterContainer = ({
  handleUpdateBorder,
  getBorderWidth,
  PointerValue,
  getBorderColor,
  isDisabled,
  top,
}) => {
  const [layout, setLayout] = useState({width: 10, height: 10});
  return (
    <>
      <FootImg
        height={windowHeight / 2}
        width={windowWidth}
        onLayout={event => {
          console.log(event.nativeEvent.layout);
          setLayout(event.nativeEvent.layout);
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: top,
          width: layout?.width,
          height: layout?.height,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{width: layout?.width / 2}}>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(1);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 6,
              left: layout?.width / 3.8,
              borderRadius: 30,
              height: layout?.height / 11,
              width: layout?.width / 11,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(1),
              borderColor: getBorderColor(1),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(2);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 3.1,
              right: layout?.width / 7,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(2),
              borderColor: getBorderColor(2),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_2}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(3);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 2.7,
              left: layout?.width / 6,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(3),
              borderColor: getBorderColor(3),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_3}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(4);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 2.3,
              left: layout?.width / 11,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(4),
              borderColor: getBorderColor(4),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_4}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(5);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 1.9,
              right: layout?.width / 6,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(5),
              borderColor: getBorderColor(5),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_5}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(6);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              bottom: layout?.height / 20,
              right: layout?.width / 5,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(6),
              borderColor: getBorderColor(6),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_6}</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: layout?.width / 2}}>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(7);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 6,
              left: layout?.width / 7,
              borderRadius: 30,
              height: layout?.height / 11,
              width: layout?.width / 11,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(7),
              borderColor: getBorderColor(7),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_7}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(8);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 3.1,
              left: layout?.width / 7,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(8),
              borderColor: getBorderColor(8),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_8}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(9);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 2.7,
              right: layout?.width / 6,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(9),
              borderColor: getBorderColor(9),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_9}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(10);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 2.3,
              right: layout?.width / 11,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(10),
              borderColor: getBorderColor(10),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_10}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(11);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: layout?.height / 1.9,
              left: layout?.width / 6,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(11),
              borderColor: getBorderColor(11),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_11}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(12);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              bottom: layout?.height / 20,
              left: layout?.width / 5,
              borderRadius: 30,
              height: layout?.height / 12,
              width: layout?.width / 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(12),
              borderColor: getBorderColor(12),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_12}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: '#000',
  },
});

export default FooterContainer;
