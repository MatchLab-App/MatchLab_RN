import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  MatchLabBackground,
  MatchLabPillButton,
  MatchLabTopBar,
} from '@/components/common';
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
          <Text style={styles.paragraph}>{t.appServiceDescription1}</Text>
          <Text style={styles.paragraph}>{t.appServiceDescription2}</Text>
          <Text style={styles.paragraph}>{t.appServiceDescription3}</Text>
        </ScrollView>

        <View
          style={[
            styles.bottomContainer,
            { paddingBottom: Math.max(insets.bottom, 16) + 20 },
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
    paddingHorizontal: 32,
    paddingTop: 52,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: 23,
    lineHeight: 30,
    color: '#FFFFFF',
  },
  paragraph: {
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
    fontSize: 14.5,
    lineHeight: 21,
    color: 'rgba(255, 255, 255, 0.78)',
    marginTop: 18,
  },
  bottomContainer: {
    paddingHorizontal: 38,
  },
});
