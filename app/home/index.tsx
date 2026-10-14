import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';
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
  const { height: windowHeight } = useWindowDimensions();
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

  // Responsive scaling for smaller devices (< 812pt)
  const isSmallScreen = windowHeight < 812;
  const scale = isSmallScreen ? Math.max(windowHeight / 812, 0.75) : 1;
  const s = (v: number) => Math.round(v * scale);

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
            style={{
              marginTop: s(19),
              marginBottom: s(33),
            }}
          />
        ) : (
          <View style={{ height: s(40) }} />
        )}

        {/* 3. Title block */}
        <View style={[styles.titleBlock, { marginTop: s(24) }]}>
          <Text
            style={[styles.titleText, { color: titleColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {title}
          </Text>
          <Text
            style={[styles.subtitleText, { color: subtitleColor }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
          >
            {subtitle}
          </Text>
        </View>

        {/* Spacer below TitleBlock */}
        <View style={{ height: s(32) }} />

        {/* 4. Type selection block with Reanimated layout and card transitions */}
        <View style={styles.typeSelectionBlock}>
          <Animated.View
            layout={LinearTransition.springify().damping(18).stiffness(180)}
            style={styles.cardsRow}
          >
            {/* Defense Card */}
            <Animated.View layout={LinearTransition.springify().damping(18).stiffness(180)}>
              <TypeSelectionCard
                title={t.roleDefense}
                role="defense"
                types={[primaryDefenseType, secondaryDefenseType]}
                width={158}
                isHighlighted={
                  step === 'selectFirstOpponentType' ||
                  step === 'selectSecondOpponentType'
                }
                onPress={
                  step === 'selectAttackType' || step === 'result'
                    ? editDefenseSelection
                    : undefined
                }
              />
            </Animated.View>

            {/* Attack Card */}
            {(step === 'selectAttackType' || step === 'result') && (
              <Animated.View
                entering={FadeInRight.duration(220)}
                exiting={FadeOutLeft.duration(180)}
                layout={LinearTransition.springify().damping(18).stiffness(180)}
              >
                <TypeSelectionCard
                  title={t.roleAttack}
                  role="attack"
                  types={[selectedAttackType]}
                  width={100}
                  isHighlighted={step === 'selectAttackType' || step === 'result'}
                />
              </Animated.View>
            )}
          </Animated.View>
        </View>

        {/* 5. Prompt text */}
        <Text
          style={[
            styles.promptText,
            { marginTop: s(step === 'selectFirstOpponentType' ? 40 : 26) },
          ]}
        >
          {prompt}
        </Text>

        {/* 6. Action Pill Button (only when step !== 'selectFirstOpponentType') */}
        {step !== 'selectFirstOpponentType' && (
          <View style={[styles.actionButtonContainer, { marginTop: s(30) }]}>
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
            marginTop: s(step === 'selectFirstOpponentType' ? 57 : 43),
            marginBottom: s(48),
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
  titleBlock: {
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
    alignItems: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 27,
  },
  promptText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 17,
    color: MatchLabColors.textWhite75,
    textAlign: 'center',
    maxWidth: 296,
    alignSelf: 'center',
  },
  actionButtonContainer: {
    paddingHorizontal: 46,
    width: '100%',
  },
});
