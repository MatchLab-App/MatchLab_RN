import React, { useCallback, useMemo, useRef } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  PokemonType,
  SELECTABLE_POKEMON_TYPES,
  getBigTypeImage,
} from '@/constants/pokemonTypes';

export interface TypeSelectCarouselProps {
  selectedType1: PokemonType;
  selectedType2: PokemonType;
  selectedAttackType?: PokemonType;
  onSelect: (type: PokemonType) => void;
  style?: StyleProp<ViewStyle>;
}

const LOOP_COPIES = 9;
const BADGE_SIZE = 73;
const GAP = 10;
const COLUMN_PITCH = BADGE_SIZE + GAP; // 83px
const COLUMNS_PER_COPY = 6; // 18 types / 3 rows = 6 columns
const ONE_CYCLE = COLUMNS_PER_COPY * COLUMN_PITCH; // 6 * 83 = 498px
const INITIAL_SCROLL_X = 4 * ONE_CYCLE; // 1992px
const MIN_THRESHOLD = 1.5 * ONE_CYCLE; // 747px
const MAX_THRESHOLD = 7 * ONE_CYCLE; // 3486px

interface TypeBadgeProps {
  type: PokemonType;
  isSelected: boolean;
  onPress: (type: PokemonType) => void;
  isMiddleRow?: boolean;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  isSelected,
  onPress,
  isMiddleRow = false,
}) => {
  return (
    <Pressable
      onPress={() => onPress(type)}
      accessibilityRole="button"
      accessibilityLabel={type}
      style={[styles.badge, isMiddleRow && styles.middleRowBadge]}
    >
      <Image
        source={getBigTypeImage(type)}
        style={styles.badgeImage}
        resizeMode="contain"
      />
      {isSelected && (
        <View style={styles.selectedBorder} pointerEvents="none" />
      )}
    </Pressable>
  );
};

export const TypeSelectCarousel: React.FC<TypeSelectCarouselProps> = ({
  selectedType1,
  selectedType2,
  selectedAttackType,
  onSelect,
  style,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const isAdjustingRef = useRef(false);
  const hasInitialScrolledRef = useRef(false);

  // Generate 9 copies of the 18 selectable types (162 total items)
  const loopedTypes = useMemo(() => {
    const list: PokemonType[] = [];
    for (let i = 0; i < LOOP_COPIES; i++) {
      list.push(...SELECTABLE_POKEMON_TYPES);
    }
    return list;
  }, []);

  // Arrange into 54 columns of 3 rows each
  const columns = useMemo(() => {
    const totalColumns = loopedTypes.length / 3;
    const cols: {
      type0: PokemonType;
      type1: PokemonType;
      type2: PokemonType;
    }[] = [];

    for (let col = 0; col < totalColumns; col++) {
      cols.push({
        type0: loopedTypes[col * 3 + 0],
        type1: loopedTypes[col * 3 + 1],
        type2: loopedTypes[col * 3 + 2],
      });
    }
    return cols;
  }, [loopedTypes]);

  const isTypeSelected = useCallback(
    (type: PokemonType) => {
      return (
        type === selectedType1 ||
        type === selectedType2 ||
        (selectedAttackType != null && type === selectedAttackType)
      );
    },
    [selectedType1, selectedType2, selectedAttackType]
  );

  const handleLayout = () => {
    if (!hasInitialScrolledRef.current) {
      hasInitialScrolledRef.current = true;
      scrollViewRef.current?.scrollTo({ x: INITIAL_SCROLL_X, animated: false });
    }
  };

  const handleContentSizeChange = () => {
    if (!hasInitialScrolledRef.current) {
      hasInitialScrolledRef.current = true;
      scrollViewRef.current?.scrollTo({ x: INITIAL_SCROLL_X, animated: false });
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isAdjustingRef.current) {
      isAdjustingRef.current = false;
      return;
    }

    const x = event.nativeEvent.contentOffset.x;
    if (x < MIN_THRESHOLD || x > MAX_THRESHOLD) {
      const remainder = ((x % ONE_CYCLE) + ONE_CYCLE) % ONE_CYCLE;
      const targetX = INITIAL_SCROLL_X + remainder;
      isAdjustingRef.current = true;
      scrollViewRef.current?.scrollTo({ x: targetX, animated: false });
    }
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onLayout={handleLayout}
        onContentSizeChange={handleContentSizeChange}
        contentOffset={{ x: INITIAL_SCROLL_X, y: 0 }}
        contentContainerStyle={styles.scrollContent}
      >
        {columns.map((col, colIndex) => (
          <View key={`col-${colIndex}`} style={styles.column}>
            <TypeBadge
              type={col.type0}
              isSelected={isTypeSelected(col.type0)}
              onPress={onSelect}
            />
            <TypeBadge
              type={col.type1}
              isSelected={isTypeSelected(col.type1)}
              onPress={onSelect}
              isMiddleRow
            />
            <TypeBadge
              type={col.type2}
              isSelected={isTypeSelected(col.type2)}
              onPress={onSelect}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: 40,
  },
  column: {
    width: BADGE_SIZE,
    marginRight: GAP,
    flexDirection: 'column',
    gap: GAP,
  },
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRowBadge: {
    transform: [{ translateX: 36 }],
  },
  badgeImage: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
  },
  selectedBorder: {
    position: 'absolute',
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.9,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
});

export default TypeSelectCarousel;
