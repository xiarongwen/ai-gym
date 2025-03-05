import React, { useEffect, useRef } from 'react'
import { TouchableOpacity, Animated, StyleSheet, Text, Platform } from 'react-native'
import { Box } from 'native-base'
import { respDims } from '../../utils/dimensions'

import Icon from 'react-native-vector-icons/Ionicons'

interface FanMenuItem {
  label: string
  onPress: () => void
  color: string
  icon: string
}

interface FanMenuProps {
  isOpen: boolean
  onClose: () => void
  items: FanMenuItem[]
}

export function FanMenu({ isOpen, onClose, items }: FanMenuProps) {
  const animations = useRef(items.map(() => new Animated.Value(0))).current

  useEffect(() => {
    if (isOpen) {
      Animated.stagger(30, [
        ...animations.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 70,
            friction: 12
          })
        )
      ]).start()
    } else {
      Animated.parallel([
        ...animations.map(anim =>
          Animated.spring(anim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 60,
            friction: 10
          })
        )
      ]).start()
    }
  }, [isOpen])

  return (
      <Box 
        position="absolute" 
        bottom={respDims(70)} 
        left={0} 
        right={0} 
        alignItems="center"
      >
        {items.map((item, index) => {
          const totalAngle = Math.PI  // 180度
          const startAngle = Math.PI  // 90度，正上方
          const angle = startAngle - (totalAngle / (items.length - 1)) * index
          const radius = respDims(130)

          const translateX = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.cos(angle) * radius]  // 使用 cos 计算 X 轴位移
          })

          const translateY = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -Math.sin(angle) * radius]  // 使用 -sin 计算 Y 轴位移
          })

          const scale = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          })

          const opacity = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })

          return (
            <Animated.View
              key={index}
              style={[
                styles.menuItem,
                {
                  transform: [
                    { translateX },
                    { translateY },
                    { scale }
                  ],
                  opacity,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                }
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  item.onPress()
                  onClose()
                }}
                style={styles.button}
              >
                <Box 
                  style={[
                    styles.iconContainer,
                    { backgroundColor: item.color }
                  ]}
                >
                  <Icon name={item.icon} size={respDims(24)} color="white" />
                </Box>
                <Text style={styles.buttonText}>{item.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          )
        })}
      </Box>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    position: 'absolute',
    width: respDims(80),
    height: respDims(80),
    borderRadius: respDims(16),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: '50%',
    marginLeft: respDims(-40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
      },
      android: {
        backgroundColor: 'white',
      }
    })
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: respDims(8),
  },
  iconContainer: {
    width: respDims(40),
    height: respDims(40),
    borderRadius: respDims(20),
    marginBottom: respDims(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: respDims(12),
    fontWeight: '500',
    textAlign: 'center',
    marginTop: respDims(4),
  }
}) 