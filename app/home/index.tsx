import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  CustomDivider,
  MatchLabBackground,
  MatchLabPillButton,
  MatchLabTopBar,
  SearchButton,
  TypeSelectCarousel,
  TypeSelectionCard,
} from '@/components/common';
import { HomeMenuOverlay } from '@/components/home/HomeMenuOverlay';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

export default function HomeScreen() {
  const router = useRouter();
  const {
    step,
    primaryDefenseType,
    secondaryDefenseType,
    selectedAttackType,
    isMenuPresented,
    setIsMenuPresented,
    effectivenessSummary,
    title,
    subtitle,
    prompt,
    actionTitle,
    actionEnabled,
    selectType,
    performPrimaryAction,
    goBackHomeStep,
    editDefenseSelection,
    t,
  } = useMatchLab();

  const titleColor =
    step === 'result' && effectivenessSummary.multiplier === 0
      ? effectivenessSummary.tint
      : MatchLabColors.textWhite;

  const subtitleColor =
    step === 'result'
      ? effectivenessSummary.tint
      : MatchLabColors.textWhite75;

  return (
    <MatchLabBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* 1. Top Bar */}
        <MatchLabTopBar
          leftIconType={step === 'selectFirstOpponentType' ? 'menu' : 'back'}
          leftAccessibilityLabel={
            step === 'selectFirstOpponentType'
              ? t.accessibilityMenu
              : t.accessibilityBack
          }
          onLeftTap={() => {
            if (step === 'selectFirstOpponentType') {
              setIsMenuPresented(true);
            } else {
              goBackHomeStep();
            }
          }}
          showsTrailingAction={step !== 'selectFirstOpponentType'}
        />

        {/* 2. Search button or spacer */}
        {step === 'selectFirstOpponentType' ? (
          <SearchButton
            onPress={() => router.push('/search')}
            style={styles.searchButton}
          />
        ) : (
          <View style={styles.searchSpacer} />
        )}

        {/* 3. Title block */}
        <View style={styles.titleBlock}>
          <Text
            style={[styles.titleText, { color: titleColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            style={[styles.subtitleText, { color: subtitleColor }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        </View>

        {/* 4. Type selection block */}
        <View style={styles.typeSelectionBlock}>
          {step === 'selectFirstOpponentType' || step === 'selectSecondOpponentType' ? (
            <TypeSelectionCard
              title={t.roleDefense}
              role="defense"
              types={[primaryDefenseType, secondaryDefenseType]}
              width={158}
              isHighlighted={true}
            />
          ) : (
            <View style={styles.cardsRow}>
              <TypeSelectionCard
                title={t.roleDefense}
                role="defense"
                types={[primaryDefenseType, secondaryDefenseType]}
                width={158}
                isHighlighted={false}
                onPress={editDefenseSelection}
              />
              <TypeSelectionCard
                title={t.roleAttack}
                role="attack"
                types={[selectedAttackType]}
                width={100}
                isHighlighted={true}
              />
            </View>
          )}
        </View>

        {/* 5. Prompt text */}
        <Text
          style={[
            styles.promptText,
            { marginTop: step === 'selectFirstOpponentType' ? 32 : 22 },
          ]}
        >
          {prompt}
        </Text>

        {/* 6. Action Pill Button (only when step !== 'selectFirstOpponentType') */}
        {step !== 'selectFirstOpponentType' && (
          <View style={styles.actionButtonContainer}>
            <MatchLabPillButton
              title={actionTitle}
              isPrimary={step !== 'selectAttackType'}
              isEnabled={actionEnabled}
              onPress={performPrimaryAction}
            />
          </View>
        )}

        {/* 7. Custom Divider */}
        <CustomDivider
          style={{
            marginTop: step === 'selectFirstOpponentType' ? 40 : 28,
            marginBottom: 36,
          }}
        />

        {/* 8. Carousel */}
        <TypeSelectCarousel
          selectedType1={primaryDefenseType}
          selectedType2={secondaryDefenseType}
          selectedAttackType={selectedAttackType}
          onSelect={selectType}
        />
      </SafeAreaView>

      {/* 9. Home Menu Overlay */}
      <HomeMenuOverlay
        visible={isMenuPresented}
        onClose={() => setIsMenuPresented(false)}
        onRecentResults={() => {
          setIsMenuPresented(false);
          router.push('/recentResults');
        }}
        onTypeChart={() => {
          setIsMenuPresented(false);
          router.push('/typeChart');
        }}
        onSettings={() => {
          setIsMenuPresented(false);
          router.push('/settings');
        }}
      />
    </MatchLabBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  searchButton: {
    marginTop: 19,
    marginBottom: 24,
  },
  searchSpacer: {
    height: 32,
  },
  titleBlock: {
    marginTop: 16,
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
  subtitleText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
  },
  typeSelectionBlock: {
    marginTop: 28,
    alignItems: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 27,
  },
  promptText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 20,
    color: MatchLabColors.textWhite75,
    textAlign: 'center',
    maxWidth: 296,
    alignSelf: 'center',
  },
  actionButtonContainer: {
    paddingHorizontal: 46,
    marginTop: 24,
    width: '100%',
  },
});
