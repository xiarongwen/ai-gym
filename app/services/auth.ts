interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export async function loginWithPhone(
  phone: string,
  verificationCode: string,
): Promise<LoginResponse> {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (phone === '13800138000' && verificationCode === '123456') {
    return {
      success: true,
      token: 'mock_token_' + Date.now(),
    };
  }
  
  return {
    success: false,
    error: '手机号或验证码错误',
  };
}

export async function loginWithApple(
  identityToken: string,
): Promise<LoginResponse> {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (identityToken) {
    return {
      success: true,
      token: 'mock_apple_token_' + Date.now(),
    };
  }
  
  return {
    success: false,
    error: 'Apple 登录失败',
  };
} 