import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import {
  SELECTABLE_POKEMON_TYPES,
  getSmallTypeImage,
  type PokemonType,
} from '@/constants/pokemonTypes';
import { calculateMultiplier } from '@/services/pokemonDataStore';
import { useMatchLab } from '@/context/MatchLabContext';
import {
  MatchLabBackground,
  MatchLabTopBar,
  HomeIndicator,
  TypeSmallToken,
} from '@/components/common';

type ViewMode = 'byType' | 'matrix';

export default function TypeChartScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, t } = useMatchLab();

  const [viewMode, setViewMode] = useState<ViewMode>('byType');
  const [selectedAttackType, setSelectedAttackType] =
    useState<PokemonType>('fire');

  // Categorize defending types for the selected attacking type
  const { superEffective, notVeryEffective, noEffect, normalEffective } =
    useMemo(() => {
      const superEff: PokemonType[] = [];
      const notVeryEff: PokemonType[] = [];
      const noEff: PokemonType[] = [];
      const normEff: PokemonType[] = [];

      for (const defType of SELECTABLE_POKEMON_TYPES) {
        const mult = calculateMultiplier(selectedAttackType, [defType]);
        if (mult === 2) {
          superEff.push(defType);
        } else if (mult === 0.5) {
          notVeryEff.push(defType);
        } else if (mult === 0) {
          noEff.push(defType);
        } else {
          normEff.push(defType);
        }
      }

      return {
        superEffective: superEff,
        notVeryEffective: notVeryEff,
        noEffect: noEff,
        normalEffective: normEff,
      };
    }, [selectedAttackType]);

  const modeLabels = useMemo(() => {
    switch (language) {
      case 'ja':
        return {
          byType: 'タイプ別',
          matrix: '全体相性表',
          superEffective: '効果は抜群 (2倍)',
          notVeryEffective: '効果はいまひとつ (0.5倍)',
          noEffect: '効果がない (0倍)',
          normal: '等倍 (1倍)',
          atkLabel: '攻撃側',
          defLabel: '防御側',
          none: 'なし',
        };
      case 'en':
        return {
          byType: 'By Attack Type',
          matrix: 'Full Table',
          superEffective: 'Super Effective (2x)',
          notVeryEffective: 'Not Very Effective (0.5x)',
          noEffect: 'No Effect (0x)',
          normal: 'Normal (1x)',
          atkLabel: 'Attack',
          defLabel: 'Defense',
          none: 'None',
        };
      default:
        return {
          byType: '공격 타입별',
          matrix: '전체 상성표',
          superEffective: '효과가 굉장함 (2배)',
          notVeryEffective: '효과가 별로임 (0.5배)',
          noEffect: '효과가 없음 (0배)',
          normal: '보통 효과 (1배)',
          atkLabel: '공격',
          defLabel: '방어',
          none: '없음',
        };
    }
  }, [language]);

  return (
    <MatchLabBackground>
      <View style={styles.container}>
        {/* Top Header */}
        <View
          style={[
            styles.headerContainer,
            { paddingTop: insets.top + 12 },
          ]}
        >
          <MatchLabTopBar
            title={t.menuTypeChart}
            showsLogo={false}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityBack}
            onLeftTap={() => router.back()}
          />
        </View>

        {/* Mode Selector Tabs */}
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setViewMode('byType')}
            accessibilityRole="tab"
            accessibilityState={{ selected: viewMode === 'byType' }}
            style={[
              styles.tabButton,
              viewMode === 'byType' && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                viewMode === 'byType' && styles.tabTextActive,
              ]}
            >
              {modeLabels.byType}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setViewMode('matrix')}
            accessibilityRole="tab"
            accessibilityState={{ selected: viewMode === 'matrix' }}
            style={[
              styles.tabButton,
              viewMode === 'matrix' && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                viewMode === 'matrix' && styles.tabTextActive,
              ]}
            >
              {modeLabels.matrix}
            </Text>
          </Pressable>
        </View>

        {/* View Mode 1: By Attack Type */}
        {viewMode === 'byType' ? (
          <ScrollView
            style={styles.contentScroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Attack Type Selector Carousel */}
            <View style={styles.selectorSection}>
              <Text style={styles.sectionTitle}>{modeLabels.atkLabel}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typeCarouselContent}
              >
                {SELECTABLE_POKEMON_TYPES.map((type) => {
                  const isSelected = selectedAttackType === type;
                  return (
                    <Pressable
                      key={type}
                      onPress={() => setSelectedAttackType(type)}
                      accessibilityRole="button"
                      accessibilityLabel={t.typeLabels[type]}
                      style={[
                        styles.typePill,
                        isSelected && styles.typePillSelected,
                      ]}
                    >
                      <Image
                        source={getSmallTypeImage(type)}
                        style={styles.pillIcon}
                        resizeMode="contain"
                      />
                      <Text
                        style={[
                          styles.pillText,
                          isSelected && styles.pillTextSelected,
                        ]}
                      >
                        {t.typeLabels[type]}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            {/* Selected Attack Type Header Card */}
            <View style={styles.selectedTypeCard}>
              <View style={styles.selectedTypeRow}>
                <Image
                  source={getSmallTypeImage(selectedAttackType)}
                  style={styles.selectedTypeIcon}
                  resizeMode="contain"
                />
                <Text style={styles.selectedTypeTitle}>
                  {t.typeLabels[selectedAttackType]}
                </Text>
              </View>
              <Text style={styles.selectedTypeSub}>
                {t.roleAttack}
              </Text>
            </View>

            {/* Group 1: 2X Super Effective */}
            <View style={styles.groupCard}>
              <View style={styles.groupHeaderRow}>
                <View style={[styles.badge, styles.badgeSuper]}>
                  <Text style={styles.badgeTextSuper}>2X</Text>
                </View>
                <Text style={[styles.groupTitle, { color: MatchLabColors.neonCyan }]}>
                  {modeLabels.superEffective}
                </Text>
                <Text style={styles.groupCount}>({superEffective.length})</Text>
              </View>
              <View style={styles.tokenGrid}>
                {superEffective.length === 0 ? (
                  <Text style={styles.emptyGroupText}>{modeLabels.none}</Text>
                ) : (
                  superEffective.map((defType) => (
                    <TypeSmallToken
                      key={defType}
                      type={defType}
                      width={44}
                      height={56}
                    />
                  ))
                )}
              </View>
            </View>

            {/* Group 2: 0.5X Not Very Effective */}
            <View style={styles.groupCard}>
              <View style={styles.groupHeaderRow}>
                <View style={[styles.badge, styles.badgeWeak]}>
                  <Text style={styles.badgeTextWeak}>0.5X</Text>
                </View>
                <Text style={[styles.groupTitle, { color: MatchLabColors.weakRed }]}>
                  {modeLabels.notVeryEffective}
                </Text>
                <Text style={styles.groupCount}>({notVeryEffective.length})</Text>
              </View>
              <View style={styles.tokenGrid}>
                {notVeryEffective.length === 0 ? (
                  <Text style={styles.emptyGroupText}>{modeLabels.none}</Text>
                ) : (
                  notVeryEffective.map((defType) => (
                    <TypeSmallToken
                      key={defType}
                      type={defType}
                      width={44}
                      height={56}
                    />
                  ))
                )}
              </View>
            </View>

            {/* Group 3: 0X No Effect */}
            <View style={styles.groupCard}>
              <View style={styles.groupHeaderRow}>
                <View style={[styles.badge, styles.badgeWeak]}>
                  <Text style={styles.badgeTextWeak}>0X</Text>
                </View>
                <Text style={[styles.groupTitle, { color: MatchLabColors.weakRed }]}>
                  {modeLabels.noEffect}
                </Text>
                <Text style={styles.groupCount}>({noEffect.length})</Text>
              </View>
              <View style={styles.tokenGrid}>
                {noEffect.length === 0 ? (
                  <Text style={styles.emptyGroupText}>{modeLabels.none}</Text>
                ) : (
                  noEffect.map((defType) => (
                    <TypeSmallToken
                      key={defType}
                      type={defType}
                      width={44}
                      height={56}
                    />
                  ))
                )}
              </View>
            </View>

            {/* Group 4: 1X Normal */}
            <View style={styles.groupCard}>
              <View style={styles.groupHeaderRow}>
                <View style={[styles.badge, styles.badgeNeutral]}>
                  <Text style={styles.badgeTextNeutral}>1X</Text>
                </View>
                <Text style={[styles.groupTitle, { color: MatchLabColors.textWhite75 }]}>
                  {modeLabels.normal}
                </Text>
                <Text style={styles.groupCount}>({normalEffective.length})</Text>
              </View>
              <View style={styles.tokenGrid}>
                {normalEffective.map((defType) => (
                  <TypeSmallToken
                    key={defType}
                    type={defType}
                    width={44}
                    height={56}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          /* View Mode 2: Interactive 18x18 Table */
          <ScrollView
            style={styles.contentScroll}
            contentContainerStyle={styles.matrixContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendBadge, styles.badgeSuper]}>
                  <Text style={styles.badgeTextSuper}>2</Text>
                </View>
                <Text style={styles.legendText}>2X</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBadge, styles.badgeWeak]}>
                  <Text style={styles.badgeTextWeak}>½</Text>
                </View>
                <Text style={styles.legendText}>0.5X</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBadge, styles.badgeWeak]}>
                  <Text style={styles.badgeTextWeak}>0</Text>
                </View>
                <Text style={styles.legendText}>0X</Text>
              </View>
              <View style={styles.legendItem}>
                <Text style={styles.legendNeutralDot}>·</Text>
                <Text style={styles.legendText}>1X</Text>
              </View>
            </View>

            {/* Matrix Table */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.tableScrollContent}
            >
              <View>
                {/* Header Row: Defending Types */}
                <View style={styles.tableHeaderRow}>
                  <View style={styles.cornerCell}>
                    <Text style={styles.cornerText}>
                      {modeLabels.atkLabel} \ {modeLabels.defLabel}
                    </Text>
                  </View>
                  {SELECTABLE_POKEMON_TYPES.map((defType) => (
                    <View key={`def-head-${defType}`} style={styles.colHeaderCell}>
                      <Image
                        source={getSmallTypeImage(defType)}
                        style={styles.colHeaderIcon}
                        resizeMode="contain"
                      />
                    </View>
                  ))}
                </View>

                {/* Table Data Rows: Attacking Types */}
                {SELECTABLE_POKEMON_TYPES.map((atkType) => (
                  <View key={`row-${atkType}`} style={styles.tableDataRow}>
                    {/* Row Header Cell */}
                    <View style={styles.rowHeaderCell}>
                      <Image
                        source={getSmallTypeImage(atkType)}
                        style={styles.rowHeaderIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.rowHeaderText} numberOfLines={1}>
                        {t.typeLabels[atkType]}
                      </Text>
                    </View>

                    {/* Multiplier Cells */}
                    {SELECTABLE_POKEMON_TYPES.map((defType) => {
                      const mult = calculateMultiplier(atkType, [defType]);
                      return (
                        <View
                          key={`cell-${atkType}-${defType}`}
                          style={[
                            styles.cell,
                            mult === 2 && styles.cellSuper,
                            (mult === 0.5 || mult === 0) && styles.cellWeak,
                          ]}
                        >
                          {mult === 2 ? (
                            <Text style={styles.cellTextSuper}>2</Text>
                          ) : mult === 0.5 ? (
                            <Text style={styles.cellTextWeak}>½</Text>
                          ) : mult === 0 ? (
                            <Text style={styles.cellTextZero}>0</Text>
                          ) : (
                            <Text style={styles.cellTextNeutral}>·</Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        )}

        {/* Bottom Home Indicator */}
        <HomeIndicator style={{ marginBottom: Math.max(insets.bottom, 5) }} />
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
    paddingBottom: 9,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    padding: 3,
  },
  tabButton: {
    flex: 1,
    height: 36,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(0, 244, 219, 0.25)',
    borderWidth: 1,
    borderColor: MatchLabColors.neonCyan,
  },
  tabText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: MatchLabColors.textWhite70,
  },
  tabTextActive: {
    color: MatchLabColors.neonCyan,
    fontFamily: fontFamily.bold,
  },
  contentScroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 14,
  },
  selectorSection: {
    gap: 8,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: MatchLabColors.textWhite70,
    paddingLeft: 6,
  },
  typeCarouselContent: {
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
  },
  typePillSelected: {
    backgroundColor: 'rgba(20, 245, 222, 0.2)',
    borderColor: MatchLabColors.neonCyan,
  },
  pillIcon: {
    width: 20,
    height: 20,
  },
  pillText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: MatchLabColors.textWhite,
  },
  pillTextSelected: {
    color: MatchLabColors.neonCyan,
    fontFamily: fontFamily.bold,
  },
  selectedTypeCard: {
    height: 60,
    borderRadius: 18,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedTypeIcon: {
    width: 30,
    height: 30,
  },
  selectedTypeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: MatchLabColors.textWhite,
  },
  selectedTypeSub: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: MatchLabColors.textWhite70,
  },
  groupCard: {
    borderRadius: 20,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    padding: 14,
    gap: 12,
  },
  groupHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeSuper: {
    backgroundColor: 'rgba(20, 245, 222, 0.2)',
    borderWidth: 1,
    borderColor: MatchLabColors.neonCyan,
  },
  badgeWeak: {
    backgroundColor: 'rgba(255, 38, 97, 0.2)',
    borderWidth: 1,
    borderColor: MatchLabColors.weakRed,
  },
  badgeNeutral: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
  },
  badgeTextSuper: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: MatchLabColors.neonCyan,
  },
  badgeTextWeak: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: MatchLabColors.weakRed,
  },
  badgeTextNeutral: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: MatchLabColors.textWhite75,
  },
  groupTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  groupCount: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: MatchLabColors.textWhite45,
  },
  tokenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  emptyGroupText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: MatchLabColors.textWhite45,
    paddingVertical: 4,
  },
  matrixContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 12,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendNeutralDot: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.5)',
    width: 14,
    textAlign: 'center',
  },
  legendText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: MatchLabColors.textWhite70,
  },
  tableScrollContent: {
    paddingBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: MatchLabColors.borderHeader,
    paddingBottom: 6,
  },
  cornerCell: {
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    color: MatchLabColors.textWhite45,
  },
  colHeaderCell: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colHeaderIcon: {
    width: 22,
    height: 22,
  },
  tableDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  rowHeaderCell: {
    width: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingRight: 6,
  },
  rowHeaderIcon: {
    width: 20,
    height: 20,
  },
  rowHeaderText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: MatchLabColors.textWhite,
    flex: 1,
  },
  cell: {
    width: 32,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginHorizontal: 0,
  },
  cellSuper: {
    backgroundColor: 'rgba(20, 245, 222, 0.15)',
  },
  cellWeak: {
    backgroundColor: 'rgba(255, 38, 97, 0.15)',
  },
  cellTextSuper: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: MatchLabColors.neonCyan,
  },
  cellTextWeak: {
    fontFamily: fontFamily.bold,
    fontSize: 13,
    color: MatchLabColors.weakRed,
  },
  cellTextZero: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: MatchLabColors.weakRed,
  },
  cellTextNeutral: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.25)',
    fontWeight: 'bold',
  },
});
