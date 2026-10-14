import React from 'react';
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
  PokemonType,
  getSmallTypeImage,
  LOGO_WHITE_IMAGE,
} from '@/constants/pokemonTypes';
import { MatchLabColors } from '@/constants/theme';
import { fontFamily } from '@/constants/typography';
import { useMatchLab } from '@/context/MatchLabContext';

// MARK: - 1. MatchLabBackground
export interface MatchLabBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const MatchLabBackground: React.FC<MatchLabBackgroundProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient
      colors={[MatchLabColors.backgroundGradient[0], MatchLabColors.backgroundGradient[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[children ? styles.backgroundWithChildren : StyleSheet.absoluteFill, style]}
    >
      {children}
    </LinearGradient>
  );
};

// MARK: - 2. MatchLabTopBar
export interface MatchLabTopBarProps {
  title?: string;
  showsLogo?: boolean;
  leftIconType?: 'menu' | 'back';
  leftAccessibilityLabel?: string;
  onLeftTap: () => void;
  showsTrailingAction?: boolean;
  trailingAccessibilityLabel?: string;
  onTrailingTap?: () => void;
}

export const MatchLabTopBar: React.FC<MatchLabTopBarProps> = ({
  title,
  showsLogo = true,
  leftIconType = 'menu',
  leftAccessibilityLabel,
  onLeftTap,
  showsTrailingAction = false,
  trailingAccessibilityLabel,
  onTrailingTap,
}) => {
  return (
    <View style={styles.topBar}>
      {/* Left button */}
      <Pressable
        onPress={onLeftTap}
        accessibilityRole="button"
        accessibilityLabel={
          leftAccessibilityLabel ?? (leftIconType === 'back' ? 'Back' : 'Menu')
        }
        hitSlop={8}
        style={styles.topBarButton}
      >
        {leftIconType === 'back' ? (
          <Ionicons name="chevron-back" size={24} color={MatchLabColors.textWhite} />
        ) : (
          <Ionicons name="menu" size={24} color={MatchLabColors.textWhite} />
        )}
      </Pressable>

      {/* Center */}
      <View style={styles.topBarCenter}>
        {showsLogo ? (
          <Image
            source={LOGO_WHITE_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
          />
        ) : title ? (
          <Text style={styles.topBarTitle} numberOfLines={1}>
            {title}
          </Text>
        ) : (
          <View style={styles.logoImage} />
        )}
      </View>

      {/* Right button */}
      <Pressable
        onPress={showsTrailingAction ? onTrailingTap : undefined}
        disabled={!showsTrailingAction}
        accessibilityRole="button"
        accessibilityLabel={trailingAccessibilityLabel ?? 'Send'}
        hitSlop={8}
        style={[
          styles.topBarButton,
          { opacity: showsTrailingAction ? 1 : 0 },
        ]}
      >
        <Ionicons name="paper-plane-outline" size={21} color={MatchLabColors.textWhite} />
      </Pressable>
    </View>
  );
};

// MARK: - 3. HomeIndicator
export interface HomeIndicatorProps {
  style?: StyleProp<ViewStyle>;
}

export const HomeIndicator: React.FC<HomeIndicatorProps> = ({ style }) => {
  return <View style={[styles.homeIndicator, style]} />;
};

// MARK: - 4. MatchLabPillButton
export interface MatchLabPillButtonProps {
  title: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  isPrimary?: boolean;
  isEnabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MatchLabPillButton: React.FC<MatchLabPillButtonProps> = ({
  title,
  iconName,
  isPrimary = true,
  isEnabled = true,
  onPress,
  style,
}) => {
  const contentColor = isPrimary ? MatchLabColors.textWhite : 'rgba(255, 255, 255, 0.5)';
  const backgroundColor = isPrimary
    ? MatchLabColors.buttonPrimary
    : MatchLabColors.buttonSecondary;

  return (
    <Pressable
      onPress={isEnabled ? onPress : undefined}
      disabled={!isEnabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isEnabled }}
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.pillButton,
        {
          backgroundColor,
          opacity: isEnabled ? (pressed ? 0.8 : 1) : 0.55,
        },
        style,
      ]}
    >
      {iconName && (
        <Ionicons name={iconName} size={24} color={contentColor} />
      )}
      <Text style={[styles.pillButtonText, { color: contentColor }]}>
        {title}
      </Text>
    </Pressable>
  );
};

// MARK: - 5. TypeSmallToken
export interface TypeSmallTokenProps {
  type: PokemonType;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_TYPE_NAMES: Record<PokemonType, string> = {
  normal: '노말',
  fire: '불꽃',
  water: '물',
  grass: '풀',
  electric: '전기',
  ice: '얼음',
  fighting: '격투',
  poison: '독',
  ground: '땅',
  flying: '비행',
  psychic: '에스퍼',
  bug: '벌레',
  rock: '바위',
  ghost: '고스트',
  dragon: '드래곤',
  steel: '강철',
  dark: '악',
  fairy: '페어리',
  noType: '미선택',
};

export const TypeSmallToken: React.FC<TypeSmallTokenProps> = ({
  type,
  width = 48,
  height = 61,
  style,
}) => {
  let context: ReturnType<typeof useMatchLab> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    context = useMatchLab();
  } catch {
    context = null;
  }

  const label =
    context?.t?.typeLabels?.[type] ??
    DEFAULT_TYPE_NAMES[type] ??
    (type === 'noType' ? '미선택' : type);

  return (
    <View
      style={[
        styles.tokenContainer,
        { width, height },
        style,
      ]}
    >
      <Image
        source={getSmallTypeImage(type)}
        style={styles.tokenImage}
        resizeMode="contain"
      />
      <Text
        style={styles.tokenText}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {label}
      </Text>
    </View>
  );
};

// MARK: - 6. TypeSelectionCard
export interface TypeSelectionCardProps {
  title: string;
  role?: 'attack' | 'defense';
  types: PokemonType[];
  width?: number;
  accessibilityLabel?: string;
  isHighlighted?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const TypeSelectionCard: React.FC<TypeSelectionCardProps> = ({
  title,
  role,
  types,
  width = 158,
  accessibilityLabel,
  isHighlighted = false,
  onPress,
  style,
}) => {
  const slotCount = width > 120 ? 2 : 1;
  const paddedTypes: PokemonType[] = [...types];
  while (paddedTypes.length < slotCount) {
    paddedTypes.push('noType' as PokemonType);
  }
  const displayTypes = paddedTypes.slice(0, slotCount);

  const isAttack = role ? role === 'attack' : width <= 120;
  const iconName = isAttack ? 'flash' : 'shield';

  const cardStyle: ViewStyle = {
    width,
    height: 93,
    borderRadius: 11,
    backgroundColor: MatchLabColors.cardSurface,
    borderWidth: 1,
    borderColor: isHighlighted
      ? 'rgba(255, 255, 255, 0.45)'
      : MatchLabColors.borderSubtle,
    ...(isHighlighted
      ? {
          shadowColor: '#FFFFFF',
          shadowOpacity: 0.55,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 0 },
          elevation: 6,
        }
      : {}),
  };

  const cardContent = (
    <View style={styles.cardInner}>
      {/* Header Row */}
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardHeaderText} numberOfLines={1}>
          {title}
        </Text>
        <Ionicons
          name={iconName}
          size={12}
          color={MatchLabColors.textWhite70}
        />
      </View>

      {/* Tokens Row */}
      <View style={styles.cardTokensRow}>
        {displayTypes.map((type, index) => (
          <TypeSmallToken key={`${type}-${index}`} type={type} />
        ))}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title}
        style={({ pressed }) => [cardStyle, pressed && styles.cardPressed, style]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? title}
      style={[cardStyle, style]}
    >
      {cardContent}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundWithChildren: {
    flex: 1,
  },
  topBar: {
    height: 47,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarButton: {
    width: 47,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 124,
    height: 20,
  },
  topBarTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    color: MatchLabColors.textWhite,
  },
  homeIndicator: {
    width: 153,
    height: 4,
    borderRadius: 2,
    backgroundColor: MatchLabColors.textWhite,
    alignSelf: 'center',
  },
  pillButton: {
    height: 58,
    borderRadius: 28,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: MatchLabColors.borderSubtle,
  },
  pillButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
  },
  tokenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tokenImage: {
    width: 30,
    height: 30,
  },
  tokenText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: MatchLabColors.textWhite,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    paddingHorizontal: 7,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: MatchLabColors.textWhite70,
  },
  cardTokensRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 10,
  },
  cardPressed: {
    opacity: 0.8,
  },
});

export default {
  Background: MatchLabBackground,
  TopBar: MatchLabTopBar,
  HomeIndicator,
  PillButton: MatchLabPillButton,
  TypeSmallToken,
  TypeSelectionCard,
};
