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
import { BUTTON_IMAGES, LOGO_WHITE_IMAGE } from '@/constants/pokemonTypes';
import type { AppLanguage } from '@/constants/i18n';
import { useMatchLab } from '@/context/MatchLabContext';
import {
  MatchLabBackground,
  HomeIndicator,
} from '@/components/common';

const getFlagEmoji = (lang: AppLanguage) => {
  if (lang === 'ko') return '🇰🇷';
  if (lang === 'en') return '🇺🇸';
  return '🇯🇵';
};

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
              paddingTop: Math.max(insets.top, 16) + 4,
              paddingBottom: 10,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <Pressable
              onPress={() => {
                if (router.canGoBack()) {
                  router.back();
                } else {
                  router.replace('/home');
                }
              }}
              accessibilityRole="button"
              accessibilityLabel={t.accessibilityBack}
              hitSlop={8}
              style={styles.headerButton}
            >
              <Image
                source={BUTTON_IMAGES.back}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </Pressable>

            <Text style={styles.headerTitle}>{t.menuSettings}</Text>

            {/* Spacer to balance header */}
            <View style={styles.headerSpacer} />
          </View>
        </View>

        {/* Scrollable Main Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Language Section Label */}
          <Text style={styles.sectionLabel}>{t.settingsLanguage}</Text>

          {/* Language Selector Pill */}
          <View>
            <Pressable
              onPress={() => setIsDropdownOpen((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel={t.settingsLanguage}
              accessibilityValue={{ text: currentLanguageLabel }}
              style={styles.languagePill}
            >
              <View style={styles.languageLeft}>
                <View style={styles.flagBadge}>
                  <Text style={styles.flagEmoji}>{getFlagEmoji(language)}</Text>
                </View>
                <Text style={styles.languageText}>{currentLanguageLabel}</Text>
              </View>
              <Ionicons
                name={isDropdownOpen ? 'caret-up' : 'caret-down'}
                size={14}
                color="#FFFFFF"
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
                      <View style={styles.dropdownItemLeft}>
                        <View style={styles.flagBadge}>
                          <Text style={styles.flagEmoji}>
                            {getFlagEmoji(opt.code)}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.dropdownItemText,
                            isSelected && styles.dropdownItemTextSelected,
                          ]}
                        >
                          {opt.label}
                        </Text>
                      </View>
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

          {/* File Access Permission Pill */}
          <View style={styles.permissionPill}>
            <Text style={styles.pillBoldText}>{t.fileAccessPermission}</Text>
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
              minimumFontScale={0.8}
            >
              {t.appServiceTitle}
            </Text>
            <Text style={styles.noticeDescription}>
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

          {/* Version Pill */}
          <View style={styles.versionPill}>
            <Text style={styles.versionLabel}>Ver.</Text>
            <Text style={styles.versionValue}>{t.version}</Text>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Image
              source={LOGO_WHITE_IMAGE}
              style={styles.footerLogo}
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
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 44,
    height: 44,
  },
  backIcon: {
    width: 23,
    height: 23,
  },
  headerTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 18,
    paddingBottom: 24,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
    paddingLeft: 12,
    marginBottom: 8,
  },
  languagePill: {
    height: 58,
    borderRadius: 29,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagBadge: {
    width: 32,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagEmoji: {
    fontSize: 16,
  },
  languageText: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: '#FFFFFF',
  },
  dropdownContainer: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    overflow: 'hidden',
    marginTop: 8,
  },
  dropdownItem: {
    height: 50,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownItemPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  dropdownItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dropdownItemText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  dropdownItemTextSelected: {
    color: MatchLabColors.neonCyan,
    fontFamily: fontFamily.bold,
  },
  permissionPill: {
    marginTop: 16,
    height: 58,
    borderRadius: 29,
    paddingHorizontal: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillBoldText: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: '#FFFFFF',
  },
  noticeCard: {
    marginTop: 16,
    borderRadius: 28,
    paddingVertical: 22,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
  },
  noticeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noticeDescription: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12.5,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    marginTop: 12,
  },
  noticeCapsuleButton: {
    alignSelf: 'center',
    marginTop: 16,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  noticeButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: MatchLabColors.neonCyan,
  },
  versionPill: {
    marginTop: 16,
    height: 58,
    borderRadius: 29,
    paddingHorizontal: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  versionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 17,
    color: '#FFFFFF',
  },
  versionValue: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  footerContainer: {
    marginTop: 32,
    paddingBottom: 24,
    alignItems: 'center',
    gap: 6,
  },
  footerLogo: {
    width: 118,
    height: 19,
    marginBottom: 4,
  },
  footerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.75)',
  },
});
