import {PermissionsAndroid} from 'react-native';
import {requestLocationPermission} from './requestLocationPermission';

export function requestBluetoothPermission() {
  return new Promise(async (resolve, reject) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Bluetooth Scan permission',
          buttonNegative: 'Reject',
          buttonPositive: 'Accept',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        requestLocationPermission().then(res => {
          if (res.status) {
            resolve({status: true});
          }
        });
      } else {
        resolve({status: false});
      }
    } catch (err) {
      console.log(err, '===>err');
      reject(err);
    }
  });
}
