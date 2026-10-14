import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const { from } = useLocalSearchParams<{ from?: string }>();
  const { t } = useMatchLab();

  const handleBack = () => {
    if (from === 'settings') {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/settings');
      }
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/startView');
      }
    }
  };

  const handleConfirm = () => {
    if (from === 'settings') {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/settings');
      }
    } else {
      router.replace('/home');
    }
  };

  return (
    <MatchLabBackground>
      <View style={styles.container}>
        <View style={{ paddingTop: Math.max(insets.top, 16) + 4 }}>
          <MatchLabTopBar
            showsLogo={false}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityBack}
            onLeftTap={handleBack}
          />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
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
        </ScrollView>

        <View
          style={[
            styles.bottomContainer,
            { paddingBottom: Math.max(insets.bottom + 12, 38) },
          ]}
        >
          <MatchLabPillButton
            title={t.confirmed}
            isPrimary={true}
            onPress={handleConfirm}
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
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 29,
    paddingTop: 39,
    paddingBottom: 24,
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
  },
});
