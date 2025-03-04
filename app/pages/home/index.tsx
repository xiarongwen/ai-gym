import React, { useState } from 'react'
// import { useColorScheme } from 'react-native'
import { Box } from 'native-base'
import { BottomTabs } from '../../components/bottom-tabs'
import { TrainingPage } from '../training'
import { ExercisesPage } from '../exercises'
import { StartTrainingPage } from '../start-training'
import { HistoryPage } from '../history'
import { ProfilePage } from '../profile'

export function HomePage(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark'
  const [activeTab, setActiveTab] = useState('training')

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
        onChangeTab={setActiveTab}
      />
    </Box>
  )
}

export default HomePage;
