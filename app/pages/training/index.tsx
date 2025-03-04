import React, { useState } from 'react';
import { Box, Text, useColorMode, VStack, HStack, Pressable, ScrollView, Image } from 'native-base';
import { respDims } from '../../utils/dimensions';

interface TrainingPlanProps {
  title: string;
  subtitle: string;
  isPro?: boolean;
}

const tabBar = [
  {
    title: '减脂塑形',
    value: 'fat-loss',
  },
  {
    title: '部位专攻',
    value: 'targeted-training',
  },
  {
    title: '增肌·男',
    value: 'muscle-gain-male',
  },
  {
    title: '增肌·女',
    value: 'muscle-gain-female',
  },
]

const TrainingPlanCard = ({ title, subtitle, isPro }: TrainingPlanProps) => {
  const { colorMode } = useColorMode();
  
  return (
    <Pressable>
      <Box 
        bg={colorMode === 'dark' ? 'coolGray.800' : 'white'} 
        p={respDims(12)}
        mb={respDims(8)}
        borderRadius={respDims(8)}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text
              fontSize={respDims(16)}
              color={colorMode === 'dark' ? 'warmGray.50' : 'coolGray.800'}
            >
              {title}
            </Text>
            <Text
              fontSize={respDims(14)}
              color={colorMode === 'dark' ? 'warmGray.400' : 'coolGray.600'}
            >
              {subtitle}
            </Text>
          </VStack>
          {isPro && (
            <Box
              bg="coolGray.700"
              px={respDims(6)}
              py={respDims(2)}
              borderRadius={respDims(4)}
            >
              <Text color="white" fontSize={respDims(12)}>Pro</Text>
            </Box>
          )}
        </HStack>
      </Box>
    </Pressable>
  );
};

interface PlanTemplateProps {
  title: string;
  imageUrl: string;
}

const PlanTemplate = ({ title, imageUrl }: PlanTemplateProps) => {
  return (
    <Pressable>
      <Box
        borderRadius={respDims(8)}
        overflow="hidden"
        mb={respDims(12)}
      >
        <Image
          source={{ uri: imageUrl }}
          alt={title}
          width="100%"
          height={respDims(120)}
        />
        <Text
          position="absolute"
          bottom={respDims(8)}
          left={respDims(8)}
          color="white"
          fontSize={respDims(16)}
          fontWeight="bold"
        >
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};

export function TrainingPage(): React.JSX.Element {
  const { colorMode } = useColorMode();
  const [selectedTab, setSelectedTab] = useState<string>(tabBar[0].value);
  return (
    <Box flex={1} bg={colorMode === 'dark' ? 'coolGray.900' : 'coolGray.100'}>
      <Box p={respDims(16)} flex={1}>
        <VStack flex={1} space={respDims(24)}>
          <Box>
            <Text
              fontSize={respDims(20)}
              fontWeight="bold"
              color={colorMode === 'dark' ? 'warmGray.50' : 'coolGray.800'}
              mb={respDims(16)}
            >
              即将到来
            </Text>

            <TrainingPlanCard
              title="胸·三头·腹肌"
              subtitle="减脂·6组"
            />
            <TrainingPlanCard
              title="休息日"
              subtitle="练 1休 1"
            />
          </Box>

          <Box flex={1}>
            <HStack justifyContent="space-between" alignItems="center" mb={respDims(12)}>
              <Text
                fontSize={respDims(20)}
                fontWeight="bold"
                color={colorMode === 'dark' ? 'warmGray.50' : 'coolGray.800'}
              >
                官方计划
              </Text>
              <Text
                fontSize={respDims(14)}
                color="coolGray.500"
              >
                个人模板
              </Text>
            </HStack>
            <Box>
              <HStack space={respDims(12)} overflow="scroll" mb={respDims(12)}>
                {tabBar.map((item) => (
                  <Pressable key={item.value} onPress={() => setSelectedTab(item.value)}>
                    <Box
                      px={respDims(12)}
                      py={respDims(6)}
                      bg={selectedTab === item.value ? 'blue.500' : 'coolGray.200'}
                      borderRadius={respDims(16)}
                  >
                    <Text color="white">{item.title}</Text>
                  </Box>
                </Pressable>
              ))}
              </HStack>
            </Box>
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <PlanTemplate
                title="男生减脂塑形提径"
                imageUrl="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=3540&auto=format&fit=crop"
              />
               <PlanTemplate
                title="男生减脂塑形提径"
                imageUrl="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=3540&auto=format&fit=crop"
              />
               <PlanTemplate
                title="男生减脂塑形提径"
                imageUrl="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=3540&auto=format&fit=crop"
              />
            </ScrollView>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
