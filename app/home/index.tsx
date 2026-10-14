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
  const bottomInset = Math.max(insets.bottom, 12) + 8;
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
      <View
        style={[
          styles.container,
          { paddingTop: topInset, paddingBottom: bottomInset },
          isMenuPresented && styles.blurredContent,
        ]}
      >
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
          showsTrailingAction={step === 'result'}
          trailingAccessibilityLabel={t.goFirst}
          onTrailingTap={resetHome}
        />

        {/* Middle Section */}
        <View style={styles.middleSection}>
          {step === 'selectFirstOpponentType' ? (
            <>
              {/* Step 1 */}
              <SearchButton
                onPress={() => router.push('/search')}
                style={{ marginTop: s(18) }}
              />

              <View style={[styles.titleBlock, { marginTop: s(38) }]}>
                <Text
                  style={[styles.titleText, { color: titleColor }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                >
                  {title}
                </Text>
                <Text
                  style={[styles.subtitleText, { color: subtitleColor, marginTop: 6 }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {subtitle}
                </Text>
              </View>

              <View style={[styles.typeSelectionBlock, { marginTop: s(24) }]}>
                <TypeSelectionCard
                  title={t.roleDefense}
                  role="defense"
                  types={[primaryDefenseType, secondaryDefenseType]}
                  width={158}
                  isHighlighted={true}
                />
              </View>

              <View style={[styles.promptContainer, { marginTop: s(38) }]}>
                <Text
                  style={styles.promptText}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                >
                  {prompt}
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* Steps 2, 3, 4 */}
              <View style={[styles.titleBlock, { marginTop: s(28) }]}>
                <Text
                  style={[styles.titleText, { color: titleColor }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                >
                  {title}
                </Text>
                <Text
                  style={[styles.subtitleText, { color: subtitleColor, marginTop: 6 }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {subtitle}
                </Text>
              </View>

              <View style={[styles.typeSelectionBlock, { marginTop: s(22) }]}>
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
                      isHighlighted={step === 'selectSecondOpponentType'}
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

              <View style={[styles.promptContainer, { marginTop: s(24) }]}>
                <Text
                  style={styles.promptText}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                >
                  {prompt}
                </Text>
              </View>

              <View style={[styles.actionButtonContainer, { marginTop: s(24) }]}>
                <MatchLabPillButton
                  title={actionTitle}
                  isPrimary={step !== 'selectAttackType'}
                  isEnabled={actionEnabled}
                  onPress={performPrimaryAction}
                />
              </View>
            </>
          )}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <CustomDivider style={{ marginBottom: s(24) }} />
          <TypeSelectCarousel
            selectedType1={primaryDefenseType}
            selectedType2={secondaryDefenseType}
            selectedAttackType={selectedAttackType}
            mode={step === 'result' ? 'attack' : 'defense'}
            onSelect={selectType}
          />
        </View>
      </View>

      {/* Home Menu Overlay */}
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
  blurredContent: {
    filter: [{ blur: 10 }],
    opacity: 0.85,
  },
  middleSection: {
    flex: 1,
  },
  titleBlock: {
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  promptText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 21,
    color: MatchLabColors.textWhite75,
    textAlign: 'center',
    maxWidth: 296,
  },
  actionButtonContainer: {
    paddingHorizontal: 38,
    width: '100%',
  },
  bottomSection: {
    width: '100%',
  },
});
