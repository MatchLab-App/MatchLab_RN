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
  BUTTON_IMAGES,
  LOGO_WHITE_IMAGE,
  START_CLOUD_TYPES,
  getBigTypeImage,
  type PokemonType,
} from '@/constants/pokemonTypes';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

interface HoneycombRowConfig {
  count: number;
  blur: number;
  opacity: number;
}

const HONEYCOMB_CONFIG: HoneycombRowConfig[] = [
  { count: 4, blur: 0, opacity: 0.92 },
  { count: 3, blur: 0, opacity: 0.92 },
  { count: 4, blur: 0, opacity: 0.92 },
  { count: 3, blur: 0, opacity: 0.92 },
  { count: 4, blur: 4, opacity: 0.75 },
  { count: 3, blur: 8, opacity: 0.6 },
  { count: 4, blur: 14, opacity: 0.45 },
  { count: 3, blur: 14, opacity: 0.45 },
];

let globalTypeIndex = 0;
const HONEYCOMB_ROWS = HONEYCOMB_CONFIG.map((cfg, rowIndex) => {
  const types: PokemonType[] = [];
  for (let i = 0; i < cfg.count; i++) {
    types.push(START_CLOUD_TYPES[globalTypeIndex % START_CLOUD_TYPES.length]);
    globalTypeIndex++;
  }
  return {
    rowIndex,
    types,
    blur: cfg.blur,
    opacity: cfg.opacity,
  };
});

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

      {/* Honeycomb TypeIconCloud with Progressive Blur */}
      <View style={styles.cloudWrapper} pointerEvents="none">
        <View style={styles.cloudGrid}>
          {HONEYCOMB_ROWS.map((row) => (
            <View
              key={`cloud-row-${row.rowIndex}`}
              style={[
                styles.cloudRow,
                row.blur > 0 ? ({ filter: [{ blur: row.blur }] } as any) : undefined,
              ]}
            >
              {row.types.map((type, idx) => (
                <Image
                  key={`cloud-${row.rowIndex}-${idx}-${type}`}
                  source={getBigTypeImage(type)}
                  style={[styles.cloudItem, { opacity: row.opacity }]}
                  blurRadius={row.blur > 0 ? row.blur : undefined}
                  resizeMode="contain"
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Overlay LinearGradient */}
      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(2,28,25,0.55)', '#04322D']}
        locations={[0, 0.52, 0.88]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Foreground */}
      <View style={styles.foreground} pointerEvents="none">
        {/* Top version text */}
        <Text
          style={[
            styles.versionText,
            { top: insets.top + 10 },
          ]}
        >
          {t.version}
        </Text>

        {/* Center section */}
        <View
          style={[
            styles.centerSection,
            { marginTop: Math.round(windowHeight * 0.46) - insets.top },
          ]}
        >
          <Image
            source={LOGO_WHITE_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={[styles.welcomeText, { marginTop: s(125) }]}>
            {t.welcome}
          </Text>
          <Image
            source={BUTTON_IMAGES.selectedTriangle}
            style={[
              styles.triangleIcon,
              { marginTop: s(30), marginBottom: 8 },
            ]}
            resizeMode="contain"
          />
          <Text style={styles.touchText}>
            {t.touchTheScreen}
          </Text>
        </View>

        {/* Bottom section */}
        <View
          style={[
            styles.bottomSection,
            { paddingBottom: Math.max(insets.bottom, 16) + 8 },
          ]}
        >
          <View style={styles.divider} />
          <Text style={styles.disclaimerText}>
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
    position: 'absolute',
    top: -28,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cloudGrid: {
    gap: 6,
    alignItems: 'center',
  },
  cloudRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  cloudItem: {
    width: 68,
    height: 68,
  },
  foreground: {
    flex: 1,
  },
  versionText: {
    position: 'absolute',
    right: 24,
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
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
  triangleIcon: {
    width: 11,
    height: 7,
    tintColor: '#FFFFFF',
  },
  touchText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  bottomSection: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  divider: {
    width: 300,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 14,
  },
  disclaimerText: {
    width: 308,
    fontFamily: fontFamily.semiBold,
    fontSize: 12.5,
    lineHeight: 17.5,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
  },
});
