import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push('/notice')}
      accessibilityRole="button"
      accessibilityLabel={t.touchTheScreen}
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

      {/* Foreground */}
      <SafeAreaView style={styles.safeArea} pointerEvents="none">
        {/* Top right version text */}
        <View style={styles.topSection}>
          <Text style={styles.versionText}>{t.version}</Text>
        </View>

        {/* Center section */}
        <View style={styles.centerSection}>
          <Image
            source={LOGO_WHITE_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>{t.welcome}</Text>
          <Text style={styles.touchText}>{t.touchTheScreen}</Text>
        </View>

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          <View style={styles.divider} />
          <Text style={styles.disclaimerText}>{t.startDisclaimer}</Text>
        </View>
      </SafeAreaView>
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
    gap: 12,
    opacity: 0.8,
    transform: [{ rotate: '-8deg' }, { translateY: -26 }],
  },
  cloudItem: {
    width: 58,
    height: 58,
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    alignItems: 'flex-end',
    marginTop: 18,
    marginRight: 23,
  },
  versionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite75,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 234,
    height: 36,
  },
  welcomeText: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: MatchLabColors.neonCyan,
    marginTop: 120,
  },
  touchText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite,
    marginTop: 52,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  divider: {
    width: 300,
    height: 1,
    backgroundColor: MatchLabColors.divider,
    marginBottom: 15,
  },
  disclaimerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: MatchLabColors.textWhite75,
    textAlign: 'center',
    width: 308,
  },
});
