import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const VerifyModal = ({Visible, setVisible, onComplete}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={Visible}
      onRequestClose={() => {
        setVisible(!Visible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you confirm to submit ?</Text>
          <View style={styles.btnSec}>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                setVisible(!Visible);
                onComplete();
              }}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setVisible(!Visible);
              }}>
              <Text style={[styles.textStyle]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '45%',
  },
  buttonOpen: {
    backgroundColor: '#F7AD19',
  },
  buttonClose: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F7AD19',
    borderWidth: 1,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
  modalText: {
    marginBottom: 15,
    paddingVertical: 20,
    letterSpacing: 0.082,
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    width: 250,
  },
  btnSec: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '70%',
    alignSelf: 'center',
  },
});

export default VerifyModal;
