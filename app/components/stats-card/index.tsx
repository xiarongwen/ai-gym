import React from 'react';
import { HStack, VStack, Text } from 'native-base';
import { respDims } from '../../utils/dimensions';
import {
    Card,
  } from '@fruits-chain/react-native-xiaoshu'

interface StatsCardProps {
  totalWorkouts: number;
  totalMinutes: number;
  totalCalories: number;
}

export function StatsCard({ totalWorkouts, totalMinutes, totalCalories }: StatsCardProps) {
  return (
    <Card 
      title="本月训练"
      style={{
        width: '90%',
        alignSelf: 'center',}}
    >
      <HStack justifyContent="space-between" alignItems="center">
        <VStack alignItems="flex-start" space={respDims(5)}>
          <Text fontSize={respDims(14)} color="gray.500">
            本月训练
          </Text>
          <Text fontSize={respDims(24)} fontWeight="600">
            {totalWorkouts}次
          </Text>
        </VStack>
        
        <VStack alignItems="center" space={respDims(4)}>
          <Text fontSize={respDims(14)} color="gray.500">
            总时长
          </Text>
          <Text fontSize={respDims(24)} fontWeight="600">
            {totalMinutes}分钟
          </Text>
        </VStack>
        
        <VStack alignItems="flex-end" space={respDims(4)}>
          <Text fontSize={respDims(14)} color="gray.500">
            消耗热量
          </Text>
          <Text fontSize={respDims(24)} fontWeight="600">
            {totalCalories}千卡
          </Text>
        </VStack>
      </HStack>
    </Card>
  );
} 