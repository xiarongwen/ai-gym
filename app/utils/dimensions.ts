import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const baseWidth = 375

export function respDims(size: number): number {
  return (width / baseWidth) * size
} 