import React from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { BUTTON_IMAGES } from '@/constants/pokemonTypes';
import { useMatchLab, type RecentMatchRecord } from '@/context/MatchLabContext';
import {
  HomeIndicator,
  MatchLabBackground,
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
  const multiplierTextColor =
    record.multiplier === 0
      ? MatchLabColors.weakRed
      : MatchLabColors.recentRecordCyan;

  return (
    <View style={styles.recordRow}>
      {/* 1. Attack sword icon */}
      <Image
        source={BUTTON_IMAGES.attackIcon}
        style={styles.attackIcon}
        resizeMode="contain"
      />

      {/* 2. Attack type small token */}
      <TypeSmallToken
        type={record.attackType}
        width={44}
        height={56}
      />

      {/* 3. Vertical divider */}
      <View style={styles.recordDivider} />

      {/* 4. Defense shield icon */}
      <Image
        source={BUTTON_IMAGES.defenceIcon}
        style={styles.defenceIcon}
        resizeMode="contain"
      />

      {/* 5. First defense type small token */}
      <TypeSmallToken
        type={record.defenseTypes[0] ?? 'noType'}
        width={44}
        height={56}
      />

      {/* 6. Second defense type small token */}
      <TypeSmallToken
        type={record.defenseTypes[1] ?? 'noType'}
        width={44}
        height={56}
        style={{ marginLeft: 6 }}
      />

      {/* 7. Multiplier text */}
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
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { recentRecords, clearRecentRecords, t } = useMatchLab();

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
            {/* Back Button */}
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

            {/* Header Title */}
            <Text style={styles.headerTitle}>{t.menuRecent}</Text>

            {/* Trash Button */}
            <Pressable
              onPress={clearRecentRecords}
              accessibilityRole="button"
              accessibilityLabel={t.accessibilityCloseMenu}
              hitSlop={8}
              style={styles.headerButton}
            >
              <Ionicons
                name="trash"
                size={20}
                color={MatchLabColors.weakRed}
              />
            </Pressable>
          </View>
        </View>

        {/* Scrollable Records Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {recentRecords.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>-</Text>
            </View>
          ) : (
            recentRecords.map((record) => (
              <RecentRecordRow key={record.id} record={record} />
            ))
          )}
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
    paddingHorizontal: 26,
    paddingTop: 22,
    paddingBottom: 24,
    gap: 14,
  },
  emptyCard: {
    height: 78,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  recordRow: {
    height: 78,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attackIcon: {
    width: 13,
    height: 13,
    opacity: 0.75,
    marginRight: 8,
  },
  recordDivider: {
    width: 1,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  defenceIcon: {
    width: 13,
    height: 13,
    opacity: 0.75,
    marginRight: 6,
  },
  multiplierText: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    marginLeft: 'auto',
  },
});
