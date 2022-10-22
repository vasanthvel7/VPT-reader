import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from './components/Header';
import {useFormik} from 'formik';
import * as yup from 'yup';
import 'dayjs/locale/es';
import dayjs from 'dayjs';

let schema = yup.object().shape({
  name: yup.string().required('*name is a required field'),
  date: yup.string().required('*date is a required field'),
});

const UserDetails = ({navigation, route}) => {
  const [connectedStatus, setconnectedStatus] = useState(false);
  let selectedDevice = route.params;
  const formik = useFormik({
    initialValues: {
      name: '',
      date: Date.now(),
    },
    validationSchema: schema,
    onSubmit: values => {
      navigation.navigate('readingData', {
        ...selectedDevice,
        WriteData: values,
      });
    },
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    formik.setFieldValue('date', date);
    hideDatePicker();
  };

  return (
    <>
      <View style={{backgroundColor: '#fff', padding: 15}}>
        <Header
          navigation={navigation}
          selectedDevice={selectedDevice}
          connectedStatus={connectedStatus}
          setconnectedStatus={setconnectedStatus}
        />
      </View>
      <View style={styles.Device}>
        {connectedStatus ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.headingTitle}>Patient Details</Text>
            <View
              style={{
                paddingVertical: 20,
                width: '80%',
                borderColor: '#000',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                borderRadius: 11,
                marginVertical: 40,
                justifyContent: 'center',
              }}>
              <View style={styles.inputSec}>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                  }}>
                  <Text style={styles.lableInput}>Patient Name</Text>
                  <TextInput
                    style={[
                      styles.textinput,
                      {paddingHorizontal: 10, fontSize: 15, width: '100%'},
                    ]}
                    placeholder="Enter your name"
                    placeholderTextColor="grey"
                    value={formik.values.name}
                    onChangeText={value => {
                      formik.setFieldValue('name', value);
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                  }}>
                  <Text style={styles.lableInput}>Date</Text>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    disabled
                    style={[
                      styles.textinput,
                      {
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        fontSize: 15,
                        width: '100%',
                      },
                    ]}>
                    <Text style={[{color: '#000'}]}>
                      {dayjs(formik.values.date).format('DD/MM/YYYY')}
                    </Text>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={false}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>
              </View>
              <View style={{display: 'flex', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => {
                    formik.handleSubmit();
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
        ) : (
          <View
            style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.headingTitle}>Please Connect Device...</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Device: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 0,
  },

  Textsec: {
    color: '#000',
  },
  conTextsec: {
    color: '#fff',
  },
  textColor: {
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#F7AD19',
    borderWidth: 1,
    width: 100,
    height: 40,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },

  textinput: {
    borderRadius: 11,
    backgroundColor: '#fff',
    color: '#000',
    width: '85%',
    height: 50,
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
  inputSec: {
    width: '100%',
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
  lableInput: {
    color: '#000',
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: '500',
    textAlign: 'left',
  },
  headingTitle: {
    color: '#000',
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '900',
    paddingLeft: 20,

    textAlign: 'center',
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

export default UserDetails;
