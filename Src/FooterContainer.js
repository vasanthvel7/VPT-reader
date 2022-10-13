import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FootImg from './assets/footImg_new.svg';

const FooterContainer = ({
  handleUpdateBorder,
  getBorderWidth,
  PointerValue,
  getBorderColor,
  isDisabled,
  top,
}) => {
  return (
    <>
      <FootImg height={400} width={400} />
      <View
        style={{
          position: 'absolute',
          top: top,
          width: '100%',
          height: 370,
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(1);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: 30,
              right: 60,
              borderRadius: 30,
              height: 38,
              width: 38,
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
              top: 92,
              right: 53,
              borderRadius: 30,
              height: 33,
              width: 33,
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
              top: 104,
              left: 50,
              borderRadius: 30,
              height: 33,
              width: 33,
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
              top: 144,
              left: 18,
              borderRadius: 30,
              height: 33,
              width: 33,
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
              top: '56%',
              right: 73,
              borderRadius: 30,
              height: 38,
              width: 38,
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
              bottom: 18,
              right: 77,
              borderRadius: 30,
              height: 38,
              width: 38,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: getBorderWidth(6),
              borderColor: getBorderColor(6),
            }}>
            <Text style={styles.textColor}>{PointerValue?.value_6}</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '50%'}}>
          <TouchableOpacity
            onPress={() => {
              handleUpdateBorder(7);
            }}
            disabled={isDisabled}
            style={{
              position: 'absolute',
              backgroundColor: '#fff',
              top: 30,
              left: 60,
              borderRadius: 30,
              height: 38,
              width: 38,
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
              top: 92,
              left: 53,
              borderRadius: 30,
              height: 33,
              width: 33,
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
              top: 104,
              right: 50,
              borderRadius: 30,
              height: 33,
              width: 33,
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
              top: 144,
              right: 18,
              borderRadius: 30,
              height: 33,
              width: 33,
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
              top: '56%',
              left: 73,
              borderRadius: 30,
              height: 38,
              width: 38,
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
              bottom: 18,
              left: 77,
              borderRadius: 30,
              height: 38,
              width: 38,
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
