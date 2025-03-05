import React, { useEffect } from 'react'
import { TouchableOpacity, Animated, StyleSheet, Text } from 'react-native'
import { Box } from 'native-base'
import { respDims } from '../../utils/dimensions'

interface FanMenuItem {
  label: string
  onPress: () => void
  color: string
}

interface FanMenuProps {
  isOpen: boolean
  onClose: () => void
  items: FanMenuItem[]
}

export function FanMenu({ isOpen, onClose, items }: FanMenuProps) {
  const animations = items.map(() => new Animated.Value(0))

  useEffect(() => {
    if (isOpen) {
      Animated.stagger(100, 
        animations.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 50,
            friction: 7
          })
        )
      ).start()
    } else {
      Animated.parallel(
        animations.map(anim =>
          Animated.spring(anim, {
            toValue: 0,
            useNativeDriver: true
          })
        )
      ).start()
    }
  }, [isOpen, animations])

  return (
    <Box position="absolute" bottom={respDims(70)} left={0} right={0} alignItems="center">
      {items.map((item, index) => {
        const rotateZ = animations[index].interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg']
        })

        const translateY = animations[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -respDims(60 + index * 60)]
        })

        return (
          <Animated.View
            key={index}
            style={[
              styles.menuItem,
              {
                transform: [{ translateY }, { rotateZ }],
                backgroundColor: item.color,
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
    width: respDims(50),
    height: respDims(50),
    borderRadius: respDims(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: respDims(16),
    fontWeight: 'bold',
  }
}) 