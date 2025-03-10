import React, { useState } from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  IconButton,
  Progress,
  Center,
  Pressable,
} from 'native-base';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';


interface LoginScreenProps {
  navigation: any;
}

interface UserProfile {
  height: number;
  weight: number;
  bodyFat: number;
  goal: 'increase' | 'decrease' | 'shape' | 'specific';
}

const NumberInput = ({ 
  value, 
  onChange, 
  min, 
  max,
  step = 1
}: {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}) => {
  const options = [];
  for (let i = min; i <= max; i += step) {
    options.push(i);
  }

  return (
    <Box borderWidth={1} borderColor="gray.300" rounded="lg">
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(Number(itemValue))}
        style={{ height: 150 }}
      >
        {options.map((num) => (
          <Picker.Item key={num} label={String(num)} value={num} />
        ))}
      </Picker>
    </Box>
  );
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    height: 170,
    weight: 65,
    bodyFat: 20,
    goal: 'increase'
  });


  const handlePhoneLogin = async () => {
    if (!phone || phone.length !== 11) {
      Alert.alert('提示', '请输入正确的手机号');
      return;
    }
    setCurrentStep(1);
  };

  const handleAppleLogin = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('提示', 'Apple 登录仅支持 iOS 设备');
      return;
    }

    try {
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (appleAuthResponse.identityToken) {
        setCurrentStep(1);
      }
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        Alert.alert('提示', '已取消 Apple 登录');
        return;
      }
      Alert.alert('提示', 'Apple 登录失败，请重试');
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigation.goBack();
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // 这里添加完成注册的逻辑
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('提示', '设置失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <VStack space={6} w="full">
            <Box borderWidth={1} borderColor="gray.300" rounded="lg" flexDirection="row" alignItems="center">
              <Icon
                as={MaterialIcons}
                name="phone"
                size={5}
                ml={2}
                color="gray.400"
              />
              <TextInput
                placeholder="请输入手机号"
                keyboardType="number-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={11}
                style={{
                  flex: 1,
                  height: 48,
                  paddingHorizontal: 12,
                  fontSize: 16,
                }}
              />
            </Box>
            <Button size="lg" onPress={handlePhoneLogin} colorScheme="primary">
              下一步
            </Button>
            <Center>
              <IconButton
                size="lg"
                variant="ghost"
                colorScheme="gray"
                icon={<Icon as={MaterialIcons} name="apple" size={8} />}
                onPress={handleAppleLogin}
                rounded="full"
              />
            </Center>
          </VStack>
        );

      case 1:
        return (
          <VStack space={6} w="full">
            <VStack space={4}>
              <Text fontSize="md">身高 (cm)</Text>
              <NumberInput
                value={userProfile.height}
                onChange={(value) => setUserProfile(prev => ({...prev, height: value}))}
                min={140}
                max={220}
                step={1}
              />
              
              <Text fontSize="md">体重 (kg)</Text>
              <NumberInput
                value={userProfile.weight}
                onChange={(value) => setUserProfile(prev => ({...prev, weight: value}))}
                min={30}
                max={200}
                step={0.5}
              />
              
              <Text fontSize="md">体脂率 (%)</Text>
              <NumberInput
                value={userProfile.bodyFat}
                onChange={(value) => setUserProfile(prev => ({...prev, bodyFat: value}))}
                min={5}
                max={50}
                step={0.1}
              />
            </VStack>
            <Button size="lg" onPress={handleNext} colorScheme="primary">
              下一步
            </Button>
          </VStack>
        );

      case 2:
        return (
          <VStack space={6} w="full" flex={1}>
            <Box flex={1} w="full">
              <HStack flexWrap="wrap" justifyContent="space-between">
                {[
                  { key: 'increase', label: '增肌', icon: 'fitness-center' },
                  { key: 'decrease', label: '减脂', icon: 'whatshot' },
                  { key: 'shape', label: '塑形', icon: 'accessibility' },
                  { key: 'specific', label: '专项', icon: 'track-changes' },
                ].map((item) => (
                  <Pressable
                    key={item.key}
                    onPress={() => setUserProfile(prev => ({...prev, goal: item.key as UserProfile['goal']}))}
                    w="48%"
                    mb={4}
                  >
                    <Box
                      bg={userProfile.goal === item.key ? 'primary.500' : 'gray.100'}
                      p={6}
                      rounded="xl"
                      alignItems="center"
                      justifyContent="center"
                      h={40}
                      w="full"
                    >
                      <Icon
                        as={MaterialIcons}
                        name={item.icon}
                        size={10}
                        color={userProfile.goal === item.key ? 'white' : 'gray.500'}
                      />
                      <Text
                        mt={4}
                        fontSize="lg"
                        fontWeight="medium"
                        color={userProfile.goal === item.key ? 'white' : 'gray.700'}
                      >
                        {item.label}
                      </Text>
                    </Box>
                  </Pressable>
                ))}
              </HStack>
            </Box>
            <Button
              size="lg"
              onPress={handleComplete}
              isLoading={isLoading}
              colorScheme="primary"
            >
              完成
            </Button>
          </VStack>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Box safeArea flex={1} bg="white">
        <HStack p={4} alignItems="center">
          <IconButton
            icon={<Icon as={MaterialIcons} name={currentStep === 0 ? 'close' : 'arrow-back'} />}
            onPress={handleBack}
          />
          <Progress
            value={(currentStep + 1) * 33.33}
            flex={1}
            mx={4}
            size="xs"
            colorScheme="primary"
          />
        </HStack>
        
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Box px={6} w="full">
            <VStack space={8} w="full">
              <VStack space={2}>
                <Text fontSize="3xl" fontWeight="bold">
                  {currentStep === 0 ? '登录' : currentStep === 1 ? '基本信息' : '训练目标'}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {currentStep === 0 ? '请登录后继续' : currentStep === 1 ? '请填写您的身体数据' : '选择您的训练目标'}
                </Text>
              </VStack>
              {renderStepContent()}
            </VStack>
          </Box>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
  },
}); 