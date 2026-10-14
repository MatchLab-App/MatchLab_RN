import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';
import {
  MatchLabBackground,
  HomeIndicator,
  TypeSmallToken,
} from '@/components/common';
import type { PokemonSearchResult } from '@/services/pokemonDataStore';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { searchQuery, setSearchQuery, searchResults, addDefenseTypes, t } =
    useMatchLab();

  const handleSelectResult = (result: PokemonSearchResult) => {
    addDefenseTypes(result.types);
    router.back();
  };

  return (
    <MatchLabBackground>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            {/* Back Button */}
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel={t.accessibilityBack}
              hitSlop={8}
              style={styles.backButton}
            >
              <Image
                source={require('@/assets/images/button/Back.png')}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </Pressable>

            {/* Search Capsule */}
            <View style={styles.searchCapsule}>
              <Ionicons
                name="search"
                size={22}
                color="rgba(255, 255, 255, 0.5)"
              />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t.searchPlaceholder}
                placeholderTextColor="rgba(255, 255, 255, 0.45)"
                style={styles.searchInput}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel={t.accessibilitySearch}
              />
              {searchQuery.length > 0 && (
                <Pressable
                  onPress={() => setSearchQuery('')}
                  accessibilityRole="button"
                  accessibilityLabel={t.accessibilityCloseMenu}
                  hitSlop={6}
                  style={styles.clearButton}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={MatchLabColors.textWhite75}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>

        {/* Results List */}
        <ScrollView
          style={styles.resultsScroll}
          contentContainerStyle={styles.resultsContent}
          keyboardShouldPersistTaps="handled"
        >
          {searchResults.slice(0, 12).map((result) => (
            <View
              key={result.id}
              style={styles.resultRowWrapper}
            >
              <Pressable
                onPress={() => handleSelectResult(result)}
                accessibilityRole="button"
                accessibilityLabel={result.name}
                accessibilityHint={result.englishName}
                style={({ pressed }) => [
                  styles.resultRow,
                  pressed && styles.rowPressed,
                ]}
              >
                {/* Left column: Korean and English name */}
                <View style={styles.nameColumn}>
                  <Text
                    style={styles.koreanName}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                  >
                    {result.name}
                  </Text>
                  <Text
                    style={styles.englishName}
                    numberOfLines={1}
                  >
                    {result.englishName}
                  </Text>
                </View>

                {/* Right row: Type small tokens */}
                <View style={styles.tokenRow}>
                  {result.types.slice(0, 2).map((type, idx) => (
                    <TypeSmallToken
                      key={`${type}-${idx}`}
                      type={type}
                    />
                  ))}
                  {result.types.length === 1 && (
                    <TypeSmallToken type="noType" />
                  )}
                </View>
              </Pressable>
            </View>
          ))}
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
    height: 140,
    backgroundColor: MatchLabColors.headerSurface,
    borderBottomWidth: 1,
    borderColor: MatchLabColors.borderHeader,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 19,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 23,
    height: 23,
  },
  searchCapsule: {
    flex: 1,
    height: 58,
    borderRadius: 28,
    backgroundColor: MatchLabColors.rowSurface,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 19,
    gap: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: MatchLabColors.textWhite,
  },
  clearButton: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsScroll: {
    flex: 1,
  },
  resultsContent: {
    paddingTop: 12,
    paddingBottom: 24,
  },
  resultRowWrapper: {
    paddingHorizontal: 40,
    paddingVertical: 8,
  },
  resultRow: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowPressed: {
    opacity: 0.75,
  },
  nameColumn: {
    gap: 2,
    flex: 1,
  },
  koreanName: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: MatchLabColors.textWhite,
  },
  englishName: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: MatchLabColors.textWhite45,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
