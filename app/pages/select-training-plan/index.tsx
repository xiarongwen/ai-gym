import React from 'react'
import { Box, Text, VStack, HStack, IconButton } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function SelectTrainingPlanPage(): React.JSX.Element {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  return (
    <Box flex={1} bg="white">
      <HStack 
        px={4} 
        pt={`${insets.top}px`}
        pb={3}
        alignItems="center" 
        borderBottomWidth={1}
        borderBottomColor="gray.200"
        bg="white"
      >
        <IconButton
          icon={<Icon name="arrow-back" size={24} color="black" />}
          onPress={() => navigation.goBack()}
          position="absolute"
          left={2}
          top={`${insets.top + 8}px`}
          zIndex={1}
        />
        <Text 
          fontSize="lg" 
          fontWeight="bold"
          flex={1}
          textAlign="center"
        >
          选择训练计划
        </Text>
      </HStack>

      <VStack space={4} p={4}>
        {/* 这里添加训练计划列表 */}
      </VStack>
    </Box>
  )
}

export default SelectTrainingPlanPage 