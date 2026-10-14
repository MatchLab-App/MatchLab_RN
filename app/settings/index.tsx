import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { LOGO_WHITE_IMAGE } from '@/constants/pokemonTypes';
import type { AppLanguage } from '@/constants/i18n';
import { useMatchLab } from '@/context/MatchLabContext';
import {
  MatchLabBackground,
  MatchLabTopBar,
  HomeIndicator,
} from '@/components/common';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    language,
    setLanguage,
    isFileAccessEnabled,
    setIsFileAccessEnabled,
    t,
  } = useMatchLab();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentLanguageLabel =
    language === 'ko'
      ? t.languageKorean
      : language === 'en'
      ? t.languageEnglish
      : t.languageJapanese;

  const languageOptions: { code: AppLanguage; label: string }[] = [
    { code: 'ko', label: t.languageKorean },
    { code: 'en', label: t.languageEnglish },
    { code: 'ja', label: t.languageJapanese },
  ];

  return (
    <MatchLabBackground>
      <View style={styles.container}>
        {/* Top Header */}
        <View
          style={[
            styles.headerContainer,
            {
              paddingTop: Math.max(insets.top, 20) + 12,
              paddingBottom: 12,
            },
          ]}
        >
          <MatchLabTopBar
            title={t.menuSettings}
            showsLogo={false}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityBack}
            onLeftTap={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/home');
              }
            }}
          />
        </View>

        {/* Scrollable Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Language Section Label */}
          <Text style={styles.sectionLabel}>{t.settingsLanguage}</Text>

          {/* Language Selector Row */}
          <View>
            <Pressable
              onPress={() => setIsDropdownOpen((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel={t.settingsLanguage}
              accessibilityValue={{ text: currentLanguageLabel }}
              style={styles.settingsRow}
            >
              <Text style={styles.rowTitleText}>{currentLanguageLabel}</Text>
              <Ionicons
                name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={MatchLabColors.textWhite75}
              />
            </Pressable>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <View style={styles.dropdownContainer}>
                {languageOptions.map((opt) => {
                  const isSelected = language === opt.code;
                  return (
                    <Pressable
                      key={opt.code}
                      onPress={() => {
                        setLanguage(opt.code);
                        setIsDropdownOpen(false);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={opt.label}
                      style={({ pressed }) => [
                        styles.dropdownItem,
                        pressed && styles.dropdownItemPressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          isSelected && styles.dropdownItemTextSelected,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color={MatchLabColors.neonCyan}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          {/* File Access Permission Row */}
          <View style={styles.settingsRow}>
            <Text style={styles.rowTitleText}>{t.fileAccessPermission}</Text>
            <Switch
              value={isFileAccessEnabled}
              onValueChange={setIsFileAccessEnabled}
              trackColor={{
                false: 'rgba(255, 255, 255, 0.2)',
                true: MatchLabColors.buttonPrimary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Notice Card */}
          <View style={styles.noticeCard}>
            <Text
              style={styles.noticeTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {t.appServiceTitle}
            </Text>
            <Text style={styles.noticeDescription} numberOfLines={3}>
              {t.appServiceDescription1}
            </Text>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: '/notice',
                  params: { from: 'settings' },
                } as any)
              }
              accessibilityRole="button"
              accessibilityLabel={t.readFullNotice}
              style={({ pressed }) => [
                styles.noticeCapsuleButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.noticeButtonText}>{t.readFullNotice}</Text>
            </Pressable>
          </View>

          {/* Version Row */}
          <View style={styles.settingsRow}>
            <View style={styles.versionContainer}>
              <Text style={styles.rowTitleText}>Ver.</Text>
              <Text style={styles.versionText}>{t.version}</Text>
            </View>
          </View>

          {/* Footer (Pushed toward bottom with marginTop: 'auto') */}
          <View style={styles.footerContainer}>
            <Image
              source={LOGO_WHITE_IMAGE}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.footerText}>{t.contact}</Text>
            <Text style={styles.footerText}>{t.contactEmail}</Text>
          </View>
        </ScrollView>

        {/* Bottom Home Indicator */}
        <HomeIndicator
          style={{ marginBottom: Math.max(insets.bottom, 5) }}
        />
      </View>
    </MatchLabBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: MatchLabColors.headerSurface,
    borderBottomWidth: 1,
    borderColor: MatchLabColors.borderHeader,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 18,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite75,
    paddingLeft: 20,
  },
  settingsRow: {
    height: 58,
    borderRadius: 28,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitleText: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: MatchLabColors.textWhite,
  },
  dropdownContainer: {
    borderRadius: 20,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    overflow: 'hidden',
    marginTop: 8,
  },
  dropdownItem: {
    height: 48,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownItemPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dropdownItemText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: MatchLabColors.textWhite,
  },
  dropdownItemTextSelected: {
    color: MatchLabColors.neonCyan,
    fontFamily: fontFamily.bold,
  },
  noticeCard: {
    height: 195,
    minHeight: 195,
    borderRadius: 28,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    padding: 17,
    gap: 13,
  },
  noticeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: MatchLabColors.textWhite,
  },
  noticeDescription: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
    color: MatchLabColors.textWhite75,
  },
  noticeCapsuleButton: {
    alignSelf: 'flex-start',
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  noticeButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.neonCyan,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  versionText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: MatchLabColors.textWhite75,
  },
  footerContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 9,
    paddingTop: 16,
    paddingBottom: 36,
  },
  logoImage: {
    width: 124,
    height: 20,
  },
  footerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite75,
  },
});
