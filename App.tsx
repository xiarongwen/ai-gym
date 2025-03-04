import React from 'react';
import { useColorScheme } from 'react-native';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { HomePage } from './app/pages/home';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <HomePage />
    </NativeBaseProvider>
  )
}

export default App;
