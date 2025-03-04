import React from 'react';
import { Box, Text, useColorMode } from 'native-base';
import { respDims } from '../../utils/dimensions';

export function ProfilePage(): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <Box flex={1} p={respDims(16)}>
      <Text
        fontSize={respDims(24)}
        fontWeight="bold"
        color={colorMode === 'dark' ? 'warmGray.50' : 'coolGray.800'}
      >
        我的
      </Text>
    </Box>
  );
}
