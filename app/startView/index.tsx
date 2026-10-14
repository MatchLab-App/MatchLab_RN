import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MatchLabBackground } from '@/components/common';
import {
  START_CLOUD_TYPES,
  getBigTypeImage,
  LOGO_WHITE_IMAGE,
} from '@/constants/pokemonTypes';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

export default function StartViewScreen() {
  const router = useRouter();
  const { t } = useMatchLab();
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const scale = Math.min(Math.max((windowHeight - insets.top - insets.bottom) / 760, 0.72), 1.08);
  const s = (v: number) => Math.round(v * scale);

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push('/notice')}
      accessibilityRole="button"
      accessibilityLabel={`${t.welcome}, ${t.touchTheScreen}`}
    >
      {/* Background base */}
      <MatchLabBackground />

      {/* TypeIconCloud */}
      <View style={styles.cloudWrapper} pointerEvents="none">
        <View style={styles.cloudGrid}>
          {START_CLOUD_TYPES.map((type, index) => (
            <Image
              key={`${type}-${index}`}
              source={getBigTypeImage(type)}
              style={styles.cloudItem}
              resizeMode="contain"
              blurRadius={1}
            />
          ))}
        </View>
      </View>

      {/* Overlay LinearGradient */}
      <LinearGradient
        colors={[MatchLabColors.startOverlayGradient[0], MatchLabColors.startOverlayGradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Foreground matching StartView.swift VStack */}
      <View style={styles.foreground} pointerEvents="none">
        {/* Top row: version */}
        <View
          style={[
            styles.topRow,
            {
              paddingTop: Math.max(insets.top + 10, s(62)),
              paddingRight: 23,
            },
          ]}
        >
          <Text style={styles.versionText}>{t.version}</Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Center section */}
        <View style={styles.centerSection}>
          <Image
            source={LOGO_WHITE_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={[styles.welcomeText, { marginTop: s(140) }]}>
            {t.welcome}
          </Text>
          <Text style={[styles.touchText, { marginTop: s(48) }]}>
            {t.touchTheScreen}
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          <View style={styles.divider} />
          <Text
            style={[
              styles.disclaimerText,
              { marginBottom: Math.max(insets.bottom + 12, s(32)) },
            ]}
          >
            {t.startDisclaimer}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cloudWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cloudGrid: {
    width: 268,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    opacity: 0.8,
    transform: [{ rotate: '-8deg' }, { translateY: -26 }],
  },
  cloudItem: {
    width: 58,
    height: 58,
  },
  foreground: {
    flex: 1,
  },
  topRow: {
    alignItems: 'flex-end',
  },
  versionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite75,
  },
  spacer: {
    flex: 1,
  },
  centerSection: {
    alignItems: 'center',
  },
  logoImage: {
    width: 234,
    height: 36,
  },
  welcomeText: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: MatchLabColors.neonCyan,
  },
  touchText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite,
  },
  bottomSection: {
    alignItems: 'center',
  },
  divider: {
    width: 300,
    height: 1,
    backgroundColor: MatchLabColors.divider,
    marginBottom: 15,
  },
  disclaimerText: {
    width: 308,
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 17,
    color: MatchLabColors.textWhite75,
    textAlign: 'center',
  },
});
