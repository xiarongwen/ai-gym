import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { Provider as XiaoshuProvider } from '@fruits-chain/react-native-xiaoshu';

import { HomePage } from './app/pages/home';
import { LoginScreen } from './app/screens/LoginScreen';
import { ProfileScreen } from './app/screens/ProfileScreen';
import { SelectTrainingPlanPage } from './app/pages/select-training-plan';

const Stack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
  return (
    <NativeBaseProvider>
      <XiaoshuProvider>
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
            <Stack.Screen 
              name="SelectTrainingPlan" 
              component={SelectTrainingPlanPage}
              options={{
                title: '选择训练计划',
                headerShown: false,
                presentation: 'transparentModal',
                animation: 'slide_from_bottom',
                contentStyle: {
                  backgroundColor: 'white',
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </XiaoshuProvider>
    </NativeBaseProvider>
  );
}
