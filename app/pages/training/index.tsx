import React, { useEffect, useState } from 'react';
import { Linking, StatusBar } from 'react-native';  // 从 react-native 导入 Linking 和 StatusBar
import { Box, Text, VStack, HStack, Pressable, Image, ScrollView } from 'native-base';
import { respDims } from '../../utils/dimensions';
import { ChevronRightIcon } from 'native-base'; // 假设使用 native-base 的图标
import { getHealthData } from '../../services/health';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth'; // 假设有这个 hook 来获取登录状态

interface ExerciseItemProps {
  title: string;
  reps: string;
  sets: number;
}

const ExerciseItem = ({ title, reps, sets }: ExerciseItemProps) => {
  return (
    <Pressable>
      <HStack 
        bg="white" 
        p={respDims(16)} 
        borderRadius={respDims(8)}
        mb={respDims(12)}
        alignItems="center"
        justifyContent="space-between"
        shadow={2}
      >
        <HStack space={respDims(12)} alignItems="center">
          <Box 
            bg="coolGray.200"
            w={respDims(40)} 
            h={respDims(40)} 
            borderRadius={respDims(8)}
          />
          <VStack>
            <Text fontSize={respDims(16)} color="coolGray.800">
              {title}
            </Text>
            <Text fontSize={respDims(14)} color="coolGray.500">
              {reps} × {sets}组
            </Text>
          </VStack>
        </HStack>
        <Icon name="person-circle-outline" size={respDims(20)} color="coolGray.400"  />
      </HStack>
    </Pressable>
  );
};

export function TrainingPage(): React.JSX.Element {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const [healthData, setHealthData] = useState<{ isAuthorized: boolean, steps?: number, heartRate?: number, calories?: number }>({ isAuthorized: false });

  useEffect(() => {
    async function fetchHealthData() {
      const data = await getHealthData();
      console.log('data', data);
      setHealthData(data);
    }
    fetchHealthData();
  }, []);

  const handleHealthKitPress = () => {
    Linking.openURL('app-settings:');
  };

  const handleProfilePress = () => {
    if (isAuthenticated) {
      navigation.navigate('Profile' as never);
    } else {
      navigation.navigate('Login' as never); 
    }
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box flex={1} bg="#8B5CF6">
        {/* 固定的顶部区域 */}
        <VStack 
          pt={StatusBar.currentHeight} 
          p={respDims(16)} 
          space={respDims(12)}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize={respDims(24)} color="white" fontWeight="bold">
              跟着感觉走
            </Text>
            <Pressable onPress={handleProfilePress}>
              <Box 
                w={respDims(40)} 
                h={respDims(40)} 
                bg="rgba(255, 255, 255, 0.2)"
                borderRadius={respDims(20)}
                alignItems="center"
                justifyContent="center"
              >
                <Icon 
                  name="person-circle-outline" 
                  size={respDims(24)} 
                  color="white" 
                />
              </Box>
            </Pressable>
          </HStack>
          
          <Text color="white" fontSize={respDims(14)}>
            今天是否要锻炼还是休息？可以根据自己的健身目标和心情决定。
          </Text>

          {/* 健康数据提示 */}
          <Pressable onPress={handleHealthKitPress}>
            <Box 
              bg="rgba(255, 255, 255, 0.1)" 
              p={respDims(12)}
              borderRadius={respDims(8)}
            >
              <HStack alignItems="center" space={respDims(8)}>
                <Box 
                  bg="rgba(255, 255, 255, 0.2)"
                  w={respDims(24)} 
                  h={respDims(24)} 
                  borderRadius={respDims(12)}
                />
                <Text color="white" flex={1}>
                  {!healthData.isAuthorized 
                    ? "未获取到健康数据，请在带 Apple Watch 开打 Health 数据授权，以便于能够根据你的健康数据更更准确地给你建议。"
                    : `今日数据：步数 ${healthData.steps}，心率 ${healthData.heartRate}，消耗 ${healthData.calories} 卡路里`
                  }
                </Text>
                <Icon name="chevron-forward-outline" size={respDims(20)} color="white" />
              </HStack>
            </Box>
          </Pressable>
        </VStack>

        {/* 可滚动的内容区域 */}
        <ScrollView 
          flex={1} 
          showsVerticalScrollIndicator={false}
        >
          <VStack 
            p={respDims(16)} 
            space={respDims(16)}
            pb={respDims(80)}
          >
            {/* 区块2: 训练计划区域 */}
            <VStack space={respDims(12)} bg="white" p={respDims(16)} borderRadius={respDims(12)} shadow={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>今日训练：</Text>
                <HStack space={respDims(4)} alignItems="center">
                  <Text>背 + 二头</Text>
                  <Box bg="purple.100" px={respDims(4)} py={respDims(1)} borderRadius={respDims(4)}>
                    <Text color="purple.600" fontSize={respDims(12)}>AI 推荐</Text>
                  </Box>
                </HStack>
                <Pressable>
                  <HStack space={respDims(4)} alignItems="center">
                    <Text color="purple.600">下一个训练</Text>
                    <Icon name="chevron-forward-outline" size={respDims(16)} color="purple.600" />
                  </HStack>
                </Pressable>
              </HStack>

              <HStack space={respDims(12)}>
                <Box flex={1} bg="purple.50" p={respDims(8)} borderRadius={respDims(8)}>
                  <Text color="purple.900">训练类型</Text>
                  <Text color="purple.700" fontSize={respDims(14)}>四分化训练</Text>
                </Box>
                <Box flex={1} bg="purple.50" p={respDims(8)} borderRadius={respDims(8)}>
                  <Text color="purple.900">目标肌群</Text>
                  <Text color="purple.700" fontSize={respDims(14)}>背、二头</Text>
                </Box>
                <Box flex={1} bg="purple.50" p={respDims(8)} borderRadius={respDims(8)}>
                  <Text color="purple.900">预估时长</Text>
                  <Text color="purple.700" fontSize={respDims(14)}>1小时</Text>
                </Box>
              </HStack>

              <Pressable>
                <Box 
                  bg="purple.600" 
                  py={respDims(12)}
                  borderRadius={respDims(8)}
                  alignItems="center"
                >
                  <Text color="white" fontSize={respDims(16)} fontWeight="bold">
                    开始训练
                  </Text>
                </Box>
              </Pressable>
            </VStack>

            {/* 区块3: 训练动作列表 */}
            <VStack space={respDims(12)} bg="white" p={respDims(16)} borderRadius={respDims(12)} shadow={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize={respDims(16)} fontWeight="bold">
                  6 个训练动作
                </Text>
                <HStack space={respDims(8)}>
                  <Pressable>
                    <Box bg="purple.50" px={respDims(12)} py={respDims(4)} borderRadius={respDims(16)}>
                      <Text color="purple.600">添加动作</Text>
                    </Box>
                  </Pressable>
                  <Pressable>
                    <Box bg="purple.50" px={respDims(12)} py={respDims(4)} borderRadius={respDims(16)}>
                      <Text color="purple.600">指导</Text>
                    </Box>
                  </Pressable>
                </HStack>
              </HStack>

              <VStack space={respDims(8)}>
                <ExerciseItem 
                  title="引体向上"
                  reps="8次"
                  sets={4}
                />
                <ExerciseItem 
                  title="俯卧杠铃划船"
                  reps="30 下 × 8"
                  sets={4}
                />
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </Box>
    </>
  );
}
