import React, {useEffect, useState} from 'react';
import {
  Box,
  VStack,
  Text,
  Avatar,
  Pressable,
  Icon,
  ScrollView,
  HStack,
  Divider,
  useColorModeValue,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {checkLoginStatus, clearUserToken} from '../services/user';

interface ProfileScreenProps {
  navigation: any;
}

interface MenuItemProps {
  icon: string;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
}

function MenuItem({icon, title, onPress, showArrow = true}: MenuItemProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <Pressable onPress={onPress}>
      <Box bg={bgColor} py={4} px={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space={3} alignItems="center">
            <Icon as={MaterialIcons} name={icon} size={6} color="gray.500" />
            <Text fontSize="md">{title}</Text>
          </HStack>
          {showArrow && (
            <Icon
              as={MaterialIcons}
              name="chevron-right"
              size={6}
              color="gray.400"
            />
          )}
        </HStack>
      </Box>
    </Pressable>
  );
}

export function ProfileScreen({navigation}: ProfileScreenProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  useEffect(() => {
    checkLoginStatus().then(status => {
      setIsLoggedIn(status);
      if (!status) {
        navigation.navigate('Login');
      }
    });
  }, [navigation]);

  const handleLogout = async () => {
    await clearUserToken();
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

  if (!isLoggedIn) {
    return null; // 未登录时不显示内容，会自动跳转到登录页
  }

  return (
    <Box flex={1} bg={bgColor} safeArea>
      <ScrollView>
        <VStack space={4}>
          {/* 用户信息区域 */}
          <Pressable onPress={() => navigation.navigate('EditProfile')}>
            <Box bg="white" p={4}>
              <HStack space={4} alignItems="center">
                <Avatar
                  size="lg"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
                  }}>
                  用户
                </Avatar>
                <VStack>
                  <Text fontSize="lg" fontWeight="bold">
                    用户昵称
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    查看并编辑个人资料
                  </Text>
                </VStack>
                <Icon
                  as={MaterialIcons}
                  name="chevron-right"
                  size={6}
                  color="gray.400"
                  ml="auto"
                />
              </HStack>
            </Box>
          </Pressable>

          {/* 功能菜单 */}
          <VStack>
            <MenuItem icon="notifications" title="消息中心" />
            <Divider />
            <MenuItem icon="favorite" title="我的收藏" />
            <Divider />
            <MenuItem icon="history" title="浏览历史" />
          </VStack>

          <VStack mt={2}>
            <MenuItem icon="settings" title="设置" />
            <Divider />
            <MenuItem icon="help" title="帮助与反馈" />
            <Divider />
            <MenuItem icon="info" title="关于我们" />
          </VStack>

          {/* 退出登录按钮 */}
          <Box p={4}>
            <Pressable
              onPress={handleLogout}
              bg="white"
              rounded="lg"
              p={4}
              android_ripple={{color: 'gray.200'}}>
              <Text
                fontSize="md"
                color="red.500"
                textAlign="center"
                fontWeight="bold">
                退出登录
              </Text>
            </Pressable>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
} 