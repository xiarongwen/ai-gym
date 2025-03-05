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
import { FanMenu } from '../../components/fan-menu'

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
  const [isFanMenuOpen, setIsFanMenuOpen] = useState(false)

  const handleTabChange = async (tab: string) => {
    if (tab === 'training') {
    }
    if (tab === 'profile') {
      const isLoggedIn = await checkLoginStatus()
      if (!isLoggedIn) {
        navigation.navigate('Login')
        return
      }
    }
    if (tab === 'start') {
      setIsFanMenuOpen(!isFanMenuOpen)
      return
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

  const fanMenuItems = [
    {
      label: '跑步',
      onPress: () => console.log('Running'),
      color: '#FF4B4B'
    },
    {
      label: '骑行',
      onPress: () => console.log('Cycling'),
      color: '#4CAF50'
    },
    {
      label: '游泳',
      onPress: () => console.log('Swimming'),
      color: '#2196F3'
    },
    {
      label: '力量',
      onPress: () => console.log('Strength'),
      color: '#9C27B0'
    },
    {
      label: '瑜伽',
      onPress: () => console.log('Yoga'),
      color: '#FF9800'
    }
  ]

  return (
    <Box flex={1} safeArea>
      {renderContent()}
      <FanMenu 
        isOpen={isFanMenuOpen}
        onClose={() => setIsFanMenuOpen(false)}
        items={fanMenuItems}
      />
      <BottomTabs 
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
    </Box>
  )
}

export default HomePage;
