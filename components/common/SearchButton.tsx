import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MatchLabColors } from '@/constants/theme';
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
  let context: ReturnType<typeof useMatchLab> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    context = useMatchLab();
  } catch {
    context = null;
  }

  const t = context?.t;
  const displayText = placeholder ?? t?.searchPlaceholder ?? '이름으로 타입 검색';

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
      <Ionicons name="search" size={24} color="#8E8E93" style={styles.icon} />
      <Text style={styles.text} numberOfLines={1}>
        {displayText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderRadius: 28,
    marginHorizontal: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    marginRight: 22,
  },
  text: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: '#8E8E93',
  },
});

export default SearchButton;
