import React from 'react';
import {
  DimensionValue,
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
  BUTTON_IMAGES,
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
  const { t } = useMatchLab();

  const defaultLeftLabel = leftIconType === 'back'
    ? t.accessibilityBack
    : t.accessibilityMenu;

  return (
    <View style={styles.topBar}>
      {/* Left button */}
      <Pressable
        onPress={onLeftTap}
        accessibilityRole="button"
        accessibilityLabel={leftAccessibilityLabel ?? defaultLeftLabel}
        hitSlop={8}
        style={styles.topBarButton}
      >
        <Image
          source={
            leftIconType === 'back'
              ? require('@/assets/images/button/Back.png')
              : require('@/assets/images/button/DropdownButton.png')
          }
          style={styles.topBarIconImage}
          resizeMode="contain"
        />
      </Pressable>

      {/* Center */}
      <View style={styles.topBarCenter}>
        {showsLogo ? (
          <Image
            source={LOGO_WHITE_IMAGE}
            style={styles.logoImage}
            resizeMode="contain"
            accessibilityLabel={t.accessibilityLogo}
          />
        ) : title ? (
          <Text
            style={styles.topBarTitle}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            accessibilityRole="header"
          >
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
        accessibilityElementsHidden={!showsTrailingAction || !trailingAccessibilityLabel}
        hitSlop={8}
        style={[
          styles.topBarButton,
          { opacity: showsTrailingAction ? 1 : 0 },
        ]}
      >
        <Image
          source={require('@/assets/images/button/Plane.png')}
          style={styles.topBarIconImage}
          resizeMode="contain"
        />
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
        <Ionicons name={iconName} size={22} color={contentColor} />
      )}
      <Text
        style={[styles.pillButtonText, { color: contentColor }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
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

export const TypeSmallToken: React.FC<TypeSmallTokenProps> = ({
  type,
  width = 48,
  height = 61,
  style,
}) => {
  const { t } = useMatchLab();
  const label = t.typeLabels[type] ?? (type === 'noType' ? '미선택' : type);

  return (
    <View
      accessible={true}
      accessibilityLabel={label}
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
        minimumFontScale={0.7}
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
  const { t } = useMatchLab();
  const slotCount = width > 120 ? 2 : 1;
  const paddedTypes: PokemonType[] = [...types];
  while (paddedTypes.length < slotCount) {
    paddedTypes.push('noType' as PokemonType);
  }
  const displayTypes = paddedTypes.slice(0, slotCount);

  const isAttack = role ? role === 'attack' : width <= 120;

  const accessibilityValueText = displayTypes
    .map((type) => t.typeLabels[type] ?? type)
    .join(', ');

  const cardBoxStyle: ViewStyle = {
    width,
    height: 93,
    borderRadius: 12,
    backgroundColor: 'rgba(2, 16, 15, 0.55)',
    borderTopWidth: 1.2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0.5,
    borderColor: isHighlighted
      ? 'rgba(255, 255, 255, 0.32)'
      : 'rgba(255, 255, 255, 0.16)',
  };

  const cardContent = (
    <View style={cardBoxStyle}>
      {/* Header Row */}
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardHeaderText} numberOfLines={1}>
          {title}
        </Text>
        <Image
          source={isAttack ? BUTTON_IMAGES.attackIcon : BUTTON_IMAGES.defenceIcon}
          style={styles.cardHeaderIcon}
          resizeMode="contain"
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

  return (
    <View style={[styles.cardContainer, style]}>
      {isHighlighted ? (
        <Image
          source={BUTTON_IMAGES.selectedTriangle}
          style={styles.selectedTriangle}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.trianglePlaceholder} />
      )}
      {onPress ? (
        <Pressable
          onPress={onPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? title}
          accessibilityValue={{ text: accessibilityValueText }}
          style={({ pressed }) => [pressed && styles.cardPressed]}
        >
          {cardContent}
        </Pressable>
      ) : (
        <View
          accessible={true}
          accessibilityLabel={accessibilityLabel ?? title}
          accessibilityValue={{ text: accessibilityValueText }}
        >
          {cardContent}
        </View>
      )}
    </View>
  );
};

// MARK: - 7. MatchLabSkeleton
export interface MatchLabSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  cornerRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const MatchLabSkeleton: React.FC<MatchLabSkeletonProps> = ({
  width,
  height,
  cornerRadius = 12,
  style,
}) => {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: cornerRadius,
        },
        style,
      ]}
    />
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
  topBarIconImage: {
    width: 23,
    height: 23,
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
  cardContainer: {
    alignItems: 'center',
  },
  selectedTriangle: {
    width: 12,
    height: 8,
    marginBottom: 10,
  },
  trianglePlaceholder: {
    height: 8,
    marginBottom: 10,
  },
  cardHeaderRow: {
    paddingHorizontal: 9,
    paddingTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardHeaderIcon: {
    width: 12,
    height: 12,
    opacity: 0.75,
  },
  cardTokensRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 6,
  },
  cardPressed: {
    opacity: 0.8,
  },
  skeleton: {
    backgroundColor: 'rgba(142, 142, 147, 0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
});

export default {
  Background: MatchLabBackground,
  TopBar: MatchLabTopBar,
  HomeIndicator,
  PillButton: MatchLabPillButton,
  TypeSmallToken,
  TypeSelectionCard,
  Skeleton: MatchLabSkeleton,
};
