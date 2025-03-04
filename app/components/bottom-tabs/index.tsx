import React from 'react';
import { Box, HStack, Pressable, Text, useColorMode } from 'native-base';
import { respDims } from '../../utils/dimensions';

interface TabItem {
  key: string;
  title: string;
  icon: string;
}

const tabs: TabItem[] = [
  {
    key: 'training',
    title: '训练',
    icon: '💪'
  },
  {
    key: 'exercises',
    title: '动作',
    icon: '🎯'
  },
  {
    key: 'start',
    title: '开始训练',
    icon: '▶️'
  },
  {
    key: 'history',
    title: '历史',
    icon: '📅'
  },
  {
    key: 'profile',
    title: '我的',
    icon: '👤'
  }
];

interface BottomTabsProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export function BottomTabs({ activeTab, onChangeTab }: BottomTabsProps): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <Box 
      position="absolute" 
      bottom={0} 
      left={0} 
      right={0}
      bg={colorMode === 'dark' ? 'coolGray.800' : 'white'}
      shadow={5}
      safeAreaBottom
    >
      <HStack justifyContent="space-around" py={respDims(4)}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            opacity={activeTab === tab.key ? 1 : 0.5}
            py={respDims(6)}
            flex={1}
            onPress={() => onChangeTab(tab.key)}
          >
            <Box alignItems="center">
              <Text fontSize={tab.key === 'start' ? respDims(24) : respDims(20)}>
                {tab.icon}
              </Text>
              <Text 
                fontSize={respDims(10)}
                color={colorMode === 'dark' ? 'warmGray.50' : 'coolGray.800'}
              >
                {tab.title}
              </Text>
            </Box>
          </Pressable>
        ))}
      </HStack>
    </Box>
  );
}
