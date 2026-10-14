import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

export interface SearchButtonProps {
  onPress: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  onPress,
  placeholder,
  style,
}) => {
  const { t } = useMatchLab();
  const displayText = placeholder ?? t.searchPlaceholder;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={displayText}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Ionicons name="search" size={22} color="rgba(255, 255, 255, 0.55)" style={styles.icon} />
      <Text style={styles.text} numberOfLines={1}>
        {displayText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    borderRadius: 27,
    marginHorizontal: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default SearchButton;
