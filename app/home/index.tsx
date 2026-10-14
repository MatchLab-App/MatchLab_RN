import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
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
    resetHome,
    t,
  } = useMatchLab();

  // Responsive spacing calculation using safe area insets and window dimensions
  const topInset = Math.max(insets.top, 16) + 4;
  const bottomInset = Math.max(insets.bottom, 12);
  const availableHeight = windowHeight - topInset - bottomInset;
  const spacingScale = Math.min(Math.max((availableHeight - 560) / 215, 0.35), 1.0);
  const s = (v: number) => Math.round(v * spacingScale);

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
      <View style={[styles.container, { paddingTop: topInset, paddingBottom: bottomInset }]}>
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
          trailingAccessibilityLabel={t.goFirst}
          onTrailingTap={resetHome}
        />

        {/* 2. Search button (Step 1) or Spacer (Steps 2-4) */}
        {step === 'selectFirstOpponentType' ? (
          <SearchButton
            onPress={() => router.push('/search')}
            style={{
              marginTop: s(19),
              marginBottom: s(33),
            }}
          />
        ) : (
          <View style={{ height: s(32) }} />
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
        <View style={{ height: s(26) }} />

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
        <View style={[styles.promptContainer, { marginTop: s(22) }]}>
          <Text
            style={styles.promptText}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
          >
            {prompt}
          </Text>
        </View>

        {/* 6. Action Pill Button (only when step !== 'selectFirstOpponentType') */}
        {step !== 'selectFirstOpponentType' && (
          <View style={[styles.actionButtonContainer, { marginTop: s(20) }]}>
            <MatchLabPillButton
              title={actionTitle}
              isPrimary={step !== 'selectAttackType'}
              isEnabled={actionEnabled}
              onPress={performPrimaryAction}
            />
          </View>
        )}

        {/* 7. Custom Divider & 8. Carousel with Reanimated layout transition */}
        <Animated.View
          layout={LinearTransition.springify().damping(20).stiffness(200)}
          style={styles.bottomSection}
        >
          <CustomDivider
            style={{
              marginTop: s(28),
              marginBottom: s(34),
            }}
          />
          <TypeSelectCarousel
            selectedType1={primaryDefenseType}
            selectedType2={secondaryDefenseType}
            selectedAttackType={selectedAttackType}
            onSelect={selectType}
          />
        </Animated.View>
      </View>

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
  container: {
    flex: 1,
  },
  titleBlock: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
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
  promptContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  promptText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 18,
    color: MatchLabColors.textWhite75,
    textAlign: 'center',
    maxWidth: 296,
  },
  actionButtonContainer: {
    paddingHorizontal: 46,
    width: '100%',
  },
  bottomSection: {
    width: '100%',
  },
});
