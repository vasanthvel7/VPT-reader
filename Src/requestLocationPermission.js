import {PermissionsAndroid} from 'react-native';

export async function requestLocationPermission() {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Bluetooth Connect permission',

          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        resolve({status: true});
      } else {
        resolve({status: false});
      }
    } catch (err) {
      reject(err);
    }
  });
}
