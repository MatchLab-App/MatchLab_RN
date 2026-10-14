import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  MatchLabBackground,
  MatchLabPillButton,
  MatchLabTopBar,
} from '@/components/common';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

export default function NoticeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useMatchLab();

  return (
    <MatchLabBackground>
      <View style={styles.container}>
        <View style={{ paddingTop: insets.top }}>
          <MatchLabTopBar
            showsLogo={false}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityBack}
            onLeftTap={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/startView');
              }
            }}
          />
        </View>

        <View style={styles.body}>
          <Text
            style={styles.title}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
            accessibilityRole="header"
          >
            {t.appServiceTitle}
          </Text>
          <Text style={styles.paragraphs}>
            {`${t.appServiceDescription1}\n\n${t.appServiceDescription2}\n\n${t.appServiceDescription3}`}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <MatchLabPillButton
            title={t.confirmed}
            isPrimary={true}
            onPress={() => router.replace('/home')}
          />
        </View>
      </View>
    </MatchLabBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 29,
    paddingTop: 39,
    flex: 1,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
    color: MatchLabColors.textWhite,
  },
  paragraphs: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 19,
    color: MatchLabColors.textWhite75,
    marginTop: 8,
  },
  bottomContainer: {
    paddingHorizontal: 46,
    paddingBottom: 38,
  },
});
