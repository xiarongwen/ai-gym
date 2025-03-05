import React, { useState } from 'react'
// import { useColorScheme } from 'react-native'
import { Box } from 'native-base'
import {
  Overlay,
} from '@fruits-chain/react-native-xiaoshu'
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
import { StatsCard } from '../../components/stats-card'

type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Home: undefined;
  SelectTrainingPlan: undefined;
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
      label: '新建有氧',
      onPress: () => console.log('Running'),
      color: '#FF4B4B',
      icon: 'walk'
    },
    {
      label: '新建骑行',
      onPress: () => console.log('Cycling'),
      color: '#4CAF50',
      icon: 'bicycle'
    },
    {
      label: '新建训练',
      onPress: () => {
        setIsFanMenuOpen(false)
        navigation.navigate('SelectTrainingPlan')
      },
      color: '#9C27B0',
      icon: 'barbell'
    },
    {
      label: '新建游泳',
      onPress: () => console.log('Swimming'),
      color: '#2196F3',
      icon: 'water'
    },
    {
      label: '休息日',
      onPress: () => console.log('Yoga'),
      color: '#FF9800',
      icon: 'bed'
    }
  ]

  return (
    <Box flex={1} safeArea>
      {renderContent()}
      <Overlay visible={isFanMenuOpen} onPress={() => setIsFanMenuOpen(false)}>
        <Box position="absolute" top={0} left={0} right={0} bottom={0} justifyContent="center" alignItems="center">
          <StatsCard 
            totalWorkouts={1}
            totalMinutes={36}
            totalCalories={280}
          />
        </Box>
        <FanMenu 
            isOpen={isFanMenuOpen}
            onClose={() => setIsFanMenuOpen(false)}
            items={fanMenuItems}
          />
      </Overlay>
      <BottomTabs 
        activeTab={activeTab}
        onChangeTab={handleTabChange}
      />
    </Box>
  )
}

export default HomePage;
