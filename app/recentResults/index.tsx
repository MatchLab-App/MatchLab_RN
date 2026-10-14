import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import type { PokemonType } from '@/constants/pokemonTypes';
import { useMatchLab, type RecentMatchRecord } from '@/context/MatchLabContext';
import {
  MatchLabBackground,
  MatchLabTopBar,
  HomeIndicator,
  TypeSmallToken,
} from '@/components/common';

function formatMultiplier(value: number): string {
  if (value === 0.25) return '0.25';
  if (value === 0.5) return '0.5';
  if (Number.isInteger(value)) return String(Math.round(value));
  return String(value);
}

interface RecentRecordRowProps {
  record: RecentMatchRecord;
}

function RecentRecordRow({ record }: RecentRecordRowProps) {
  const source = [...record.defenseTypes, record.attackType].slice(0, 3);
  const displayTypes: PokemonType[] = [
    ...source,
    ...Array(Math.max(0, 3 - source.length)).fill('noType' as PokemonType),
  ];

  const multiplierTextColor =
    record.multiplier === 0
      ? MatchLabColors.weakRed
      : MatchLabColors.recentRecordCyan;

  return (
    <View style={styles.recordRow}>
      {/* 3 Type tokens */}
      <View style={styles.recordTokens}>
        {displayTypes.map((type, idx) => (
          <TypeSmallToken
            key={`${type}-${idx}`}
            type={type}
            width={40}
            height={54}
          />
        ))}
      </View>

      {/* Vertical divider */}
      <View style={styles.recordDivider} />

      {/* Multiplier text */}
      <Text
        style={[styles.multiplierText, { color: multiplierTextColor }]}
        numberOfLines={1}
      >
        {`${formatMultiplier(record.multiplier)}X`}
      </Text>
    </View>
  );
}

export default function RecentResultsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { recentRecords, t } = useMatchLab();

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
            title={t.menuRecent}
            showsLogo={false}
            leftIconType="back"
            leftAccessibilityLabel={t.accessibilityBack}
            onLeftTap={() => router.back()}
          />
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionLabel}>{t.menuRecent}</Text>

          {/* Records List */}
          <View style={styles.recordsList}>
            {recentRecords.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>-</Text>
              </View>
            ) : (
              recentRecords.slice(0, 5).map((record) => (
                <RecentRecordRow key={record.id} record={record} />
              ))
            )}
          </View>
        </View>

        {/* Bottom Home Indicator */}
        <HomeIndicator style={styles.homeIndicator} />
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
  contentContainer: {
    paddingHorizontal: 30,
    paddingTop: 16,
    gap: 18,
    flex: 1,
  },
  sectionLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite75,
    paddingLeft: 20,
  },
  recordsList: {
    gap: 10,
  },
  emptyCard: {
    height: 72,
    borderRadius: 17,
    backgroundColor: MatchLabColors.rowSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  recordRow: {
    height: 72,
    borderRadius: 17,
    backgroundColor: MatchLabColors.rowSurface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recordTokens: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordDivider: {
    width: 1,
    height: 36,
    backgroundColor: MatchLabColors.divider,
  },
  multiplierText: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
  },
  homeIndicator: {
    marginBottom: 8,
  },
});
