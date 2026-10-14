import React from 'react';
import {
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

function renderHighlightedName(name: string, rawQuery: string) {
  const query = rawQuery.trim();
  if (!query) {
    return <Text style={styles.koreanName}>{name}</Text>;
  }

  const lowerName = name.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: { text: string; isMatch: boolean }[] = [];
  let startIndex = 0;

  while (startIndex < name.length) {
    const matchIndex = lowerName.indexOf(lowerQuery, startIndex);
    if (matchIndex === -1) {
      parts.push({ text: name.slice(startIndex), isMatch: false });
      break;
    }
    if (matchIndex > startIndex) {
      parts.push({ text: name.slice(startIndex, matchIndex), isMatch: false });
    }
    parts.push({
      text: name.slice(matchIndex, matchIndex + query.length),
      isMatch: true,
    });
    startIndex = matchIndex + query.length;
  }

  return (
    <Text
      style={styles.koreanName}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.8}
    >
      {parts.map((part, index) => (
        <Text
          key={index}
          style={part.isMatch ? styles.highlightedText : styles.normalText}
        >
          {part.text}
        </Text>
      ))}
    </Text>
  );
}

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { searchQuery, setSearchQuery, searchResults, addDefenseTypes, t } =
    useMatchLab();

  const goBackSafely = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  const handleSelectResult = (result: PokemonSearchResult) => {
    addDefenseTypes(result.types);
    goBackSafely();
  };

  return (
    <MatchLabBackground>
      <View style={styles.container}>
        {/* Top Header */}
        <View
          style={[
            styles.headerContainer,
            {
              paddingTop: Math.max(insets.top, 16) + 8,
              paddingBottom: 16,
            },
          ]}
        >
          {/* Full-width Search Capsule */}
          <View style={styles.searchCapsule}>
            <Ionicons
              name="search"
              size={22}
              color="rgba(255, 255, 255, 0.55)"
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
            <Pressable
              onPress={() => {
                if (searchQuery.length > 0) {
                  setSearchQuery('');
                } else {
                  goBackSafely();
                }
              }}
              accessibilityRole="button"
              accessibilityLabel={
                searchQuery.length > 0
                  ? t.accessibilityCloseMenu
                  : t.accessibilityBack
              }
              hitSlop={10}
              style={styles.clearButton}
            >
              <Ionicons
                name="close"
                size={24}
                color="rgba(255, 255, 255, 0.65)"
              />
            </Pressable>
          </View>
        </View>

        {/* Results List */}
        <ScrollView
          style={styles.resultsScroll}
          contentContainerStyle={styles.resultsContent}
          keyboardShouldPersistTaps="handled"
        >
          {searchResults.length === 0 ? (
            <Text
              style={
                searchQuery.trim().length === 0
                  ? styles.emptyPromptText
                  : styles.emptyDashText
              }
            >
              {searchQuery.trim().length === 0 ? t.searchPlaceholder : '-'}
            </Text>
          ) : (
            searchResults.map((result) => (
              <Pressable
                key={result.id}
                onPress={() => handleSelectResult(result)}
                accessibilityRole="button"
                accessibilityLabel={result.name}
                accessibilityHint={result.englishName}
                style={({ pressed }) => [
                  styles.resultRow,
                  pressed && styles.rowPressed,
                ]}
              >
                {/* Left side: Highlighted Pokemon Name */}
                <View style={styles.nameColumn}>
                  {renderHighlightedName(result.name, searchQuery)}
                </View>

                {/* Right side: 2 Type small tokens */}
                <View style={styles.tokenRow}>
                  <TypeSmallToken type={result.types[0] ?? 'noType'} />
                  <TypeSmallToken type={result.types[1] ?? 'noType'} />
                </View>
              </Pressable>
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
    paddingHorizontal: 28,
  },
  searchCapsule: {
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.bold,
    fontSize: 19,
    color: '#FFFFFF',
  },
  clearButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsScroll: {
    flex: 1,
  },
  resultsContent: {
    paddingBottom: 24,
  },
  emptyPromptText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: MatchLabColors.textWhite45,
    marginTop: 48,
    textAlign: 'center',
  },
  emptyDashText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    color: MatchLabColors.textWhite45,
    marginTop: 48,
    textAlign: 'center',
  },
  resultRow: {
    height: 74,
    paddingHorizontal: 34,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.07)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  nameColumn: {
    flex: 1,
    marginRight: 16,
    justifyContent: 'center',
  },
  koreanName: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: '#FFFFFF',
  },
  highlightedText: {
    color: MatchLabColors.neonCyan,
  },
  normalText: {
    color: '#FFFFFF',
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
