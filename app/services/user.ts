import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@user_token';

export interface UserInfo {
  token: string;
  // 可以根据需要添加更多用户信息字段
}

export async function checkLoginStatus(): Promise<boolean> {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  } catch (error) {
    return false;
  }
}

export async function saveUserToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('保存用户token失败:', error);
  }
}

export async function clearUserToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('清除用户token失败:', error);
  }
} 