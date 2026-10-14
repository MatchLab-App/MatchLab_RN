import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  MatchLabBackground,
  MatchLabTopBar,
} from '@/components/common';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

export interface HomeMenuOverlayProps {
  visible: boolean;
  onClose: () => void;
  onRecentResults: () => void;
  onTypeChart: () => void;
  onSettings: () => void;
}

interface MenuActionRowProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const MenuActionRow: React.FC<MenuActionRowProps> = ({
  title,
  icon,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.menuRow,
        pressed && styles.menuRowPressed,
      ]}
    >
      <View style={styles.iconBadge}>
        <Ionicons name={icon} size={24} color="rgba(255, 255, 255, 0.86)" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </Pressable>
  );
};

export const HomeMenuOverlay: React.FC<HomeMenuOverlayProps> = ({
  visible,
  onClose,
  onRecentResults,
  onTypeChart,
  onSettings,
}) => {
  const { t } = useMatchLab();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <MatchLabBackground>
        <SafeAreaView style={styles.safeArea}>
          <MatchLabTopBar
            showsLogo={true}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityCloseMenu}
            onLeftTap={onClose}
          />
          <View style={styles.spacer} />
          <View style={styles.menuList}>
            <MenuActionRow
              title={t.menuRecent}
              icon="time-outline"
              onPress={onRecentResults}
            />
            <MenuActionRow
              title={t.menuTypeChart}
              icon="grid-outline"
              onPress={onTypeChart}
            />
            <MenuActionRow
              title={t.menuSettings}
              icon="settings-sharp"
              onPress={onSettings}
            />
          </View>
        </SafeAreaView>
      </MatchLabBackground>
    </View>
  );
};

export default HomeMenuOverlay;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  safeArea: {
    flex: 1,
  },
  spacer: {
    height: 74,
  },
  menuList: {
    paddingHorizontal: 27,
    paddingTop: 17,
    gap: 20,
  },
  menuRow: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuRowPressed: {
    opacity: 0.8,
  },
  iconBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: MatchLabColors.buttonPrimary,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: MatchLabColors.textWhite,
  },
});
