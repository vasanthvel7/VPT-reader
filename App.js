import React from 'react';
import {SafeAreaView} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SerialApp from './Src/SerialApp';
import DeviceStatus from './Src/DeviceStatus';
import DetailsScreen from './Src/DetailsScreen';
import PreviewScreen from './Src/PreviewScreen';
import UserDetails from './Src/UserDetails';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={SerialApp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="device"
            component={DeviceStatus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="userdata"
            component={UserDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="readingData"
            component={DetailsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="preview"
            component={PreviewScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
