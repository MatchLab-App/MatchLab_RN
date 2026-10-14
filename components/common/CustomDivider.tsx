import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MatchLabColors } from '@/constants/theme';

export interface CustomDividerProps {
  style?: StyleProp<ViewStyle>;
}

export const CustomDivider: React.FC<CustomDividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: MatchLabColors.divider,
    marginHorizontal: 51,
  },
});

export default CustomDivider;
