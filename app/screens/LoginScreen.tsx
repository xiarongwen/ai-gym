import React, {useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Divider,
  useToast,
  Box,
  Icon,
  Pressable,
//   Image,
} from 'native-base';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {loginWithPhone, loginWithApple} from '../services/auth';
import {saveUserToken} from '../services/user';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

interface LoginScreenProps {
  navigation: any;
}

export function LoginScreen({navigation}: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSendVerificationCode = async () => {
    if (!phone || phone.length !== 11) {
      toast.show({
        description: '请输入正确的手机号',
        placement: 'top',
      });
      return;
    }

    setIsSendingCode(true);
    try {
      // Mock: 发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.show({
        description: '验证码已发送',
        placement: 'top',
      });
    } catch (error) {
      toast.show({
        description: '发送验证码失败',
        placement: 'top',
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handlePhoneLogin = async () => {
    if (!phone || !verificationCode) {
      toast.show({
        description: '请输入手机号和验证码',
        placement: 'top',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginWithPhone(phone, verificationCode);
      if (response.success && response.token) {
        await saveUserToken(response.token);
        navigation.replace('Home');
      }
    } catch (error) {
      toast.show({
        description: '登录失败，请重试',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    if (Platform.OS !== 'ios') {
      toast.show({
        description: 'Apple 登录仅支持 iOS 设备',
        placement: 'top',
      });
      return;
    }

    try {
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {identityToken} = appleAuthResponse;
      if (identityToken) {
        const response = await loginWithApple(identityToken);
        if (response.success && response.token) {
          await saveUserToken(response.token);
          navigation.replace('Home');
        }
      }
    } catch (error: any) {
      console.log('Apple login error:', error);
      if (error.code === appleAuth.Error.CANCELED) {
        toast.show({
          description: '已取消 Apple 登录',
          placement: 'top',
        });
        return;
      }
      toast.show({
        description: 'Apple 登录失败，请重试',
        placement: 'top',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
    
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <Box
            bg="rgba(255,255,255,0.95)"
            rounded="2xl"
            p={6}
            width={width * 0.9}
            shadow={5}>
            <VStack space={6}>
              <VStack space={2} alignItems="center">
                {/* <Image
                  source={require('../assets/images/logo.png')}
                  alt="Logo"
                  size="lg"
                  resizeMode="contain"
                /> */}
                <Text fontSize="3xl" fontWeight="bold" color="primary.600">
                  欢迎回来
                </Text>
                <Text fontSize="sm" color="gray.500">
                  请登录您的账号继续使用
                </Text>
              </VStack>

              <VStack space={4}>
                <Box>
                  <Input
                    size="lg"
                    placeholder="请输入手机号"
                    keyboardType="number-pad"
                    value={phone}
                    onChangeText={setPhone}
                    maxLength={11}
                    InputLeftElement={
                      <Icon
                        as={MaterialIcons}
                        name="phone"
                        size={5}
                        ml={2}
                        color="gray.400"
                      />
                    }
                  />
                </Box>
                <HStack space={2}>
                  <Input
                    flex={1}
                    size="lg"
                    placeholder="请输入验证码"
                    type={showPassword ? 'text' : 'password'}
                    keyboardType="number-pad"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    maxLength={6}
                    InputLeftElement={
                      <Icon
                        as={MaterialIcons}
                        name="lock"
                        size={5}
                        ml={2}
                        color="gray.400"
                      />
                    }
                    InputRightElement={
                      <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                          as={MaterialIcons}
                          name={showPassword ? 'visibility' : 'visibility-off'}
                          size={5}
                          mr={2}
                          color="gray.400"
                        />
                      </Pressable>
                    }
                  />
                  <Button
                    w="35%"
                    onPress={handleSendVerificationCode}
                    isLoading={isSendingCode}
                    variant="outline"
                    colorScheme="primary">
                    发送验证码
                  </Button>
                </HStack>
                <Button
                  size="lg"
                  onPress={handlePhoneLogin}
                  isLoading={isLoading}
                  colorScheme="primary"
                  _text={{fontSize: 'md'}}>
                  登录
                </Button>
              </VStack>

              <HStack alignItems="center" space={2}>
                <Divider flex={1} bg="gray.300" />
                <Text color="gray.500">或</Text>
                <Divider flex={1} bg="gray.300" />
              </HStack>

              {Platform.OS === 'ios' && (
                <Button
                  size="lg"
                  onPress={handleAppleLogin}
                  variant="outline"
                  colorScheme="gray"
                  leftIcon={
                    <Icon as={MaterialIcons} name="apple" size={6} color="black" />
                  }>
                  使用 Apple 登录
                </Button>
              )}
            </VStack>
          </Box>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
}); 