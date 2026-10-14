import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { MatchLabTopBar } from '@/components/common';
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
        <Ionicons name={icon} size={24} color="#FFFFFF" />
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
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(insets.top, 16) + 4;

  return (
    <View
      style={styles.overlayWrapper}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      {visible && (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(180)}
          style={[styles.overlay, { paddingTop: topPadding }]}
        >
          <MatchLabTopBar
            showsLogo={false}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityCloseMenu}
            onLeftTap={onClose}
          />
          <View style={styles.menuList}>
            <MenuActionRow
              title={t.menuRecent}
              icon="folder"
              onPress={onRecentResults}
            />
            <MenuActionRow
              title={t.menuTypeChart}
              icon="apps"
              onPress={onTypeChart}
            />
            <MenuActionRow
              title={t.menuSettings}
              icon="settings-sharp"
              onPress={onSettings}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default HomeMenuOverlay;

const styles = StyleSheet.create({
  overlayWrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 18, 16, 0.42)',
  },
  menuList: {
    paddingHorizontal: 30,
    marginTop: 22,
    gap: 20,
  },
  menuRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuRowPressed: {
    opacity: 0.8,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(20, 215, 195, 0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#14F5DE',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: '#FFFFFF',
  },
});
