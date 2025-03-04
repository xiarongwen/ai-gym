import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';

import { HomePage } from './app/pages/home';
import { LoginScreen } from './app/screens/LoginScreen';
import { ProfileScreen } from './app/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
