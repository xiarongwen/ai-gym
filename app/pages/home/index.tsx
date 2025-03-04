import React, { useState } from 'react'
// import { useColorScheme } from 'react-native'
import { Box } from 'native-base'
import { BottomTabs } from '../../components/bottom-tabs'
import { TrainingPage } from '../training'
import { ExercisesPage } from '../exercises'
import { StartTrainingPage } from '../start-training'
import { HistoryPage } from '../history'
import { ProfilePage } from '../profile'
import { checkLoginStatus } from '../../services/user'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Home: undefined;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

export function HomePage(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark'
  const navigation = useNavigation<NavigationProp>()
  const [activeTab, setActiveTab] = useState('training')

  const handleTabChange = async (tab: string) => {
    if (tab === 'profile') {
      const isLoggedIn = await checkLoginStatus()
      if (!isLoggedIn) {
        navigation.navigate('Login')
        return
      }
    }
    setActiveTab(tab)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'training':
        return <TrainingPage />
      case 'exercises':
        return <ExercisesPage />
      case 'start':
        return <StartTrainingPage />
      case 'history':
        return <HistoryPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <TrainingPage />
    }
  }

  return (
    <Box flex={1} safeArea>
      {renderContent()}
      <BottomTabs 
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
    </Box>
  )
}

export default HomePage;
