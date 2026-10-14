import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
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
const PADDING_HORIZONTAL = 24;
const MIN_THRESHOLD = 1.5 * ONE_CYCLE; // 747px
const MAX_THRESHOLD = 7 * ONE_CYCLE; // 3486px
const EXTREME_MIN = 0.5 * ONE_CYCLE; // 249px
const EXTREME_MAX = 8 * ONE_CYCLE; // 3984px

interface TypeBadgeProps {
  type: PokemonType;
  isSelected: boolean;
  onPress: (type: PokemonType) => void;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(type)}
      accessibilityRole="button"
      accessibilityLabel={type}
      style={styles.badge}
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
  const { width: windowWidth } = useWindowDimensions();
  const [viewportWidth, setViewportWidth] = useState(windowWidth || 390);

  // Generate 9 copies of the 18 selectable types (162 total items)
  const loopedTypes = useMemo(() => {
    const list: PokemonType[] = [];
    for (let i = 0; i < LOOP_COPIES; i++) {
      list.push(...SELECTABLE_POKEMON_TYPES);
    }
    return list;
  }, []);

  // Separate into 3 horizontal row strips (54 items each)
  const row0Types = useMemo(() => {
    const items: PokemonType[] = [];
    for (let c = 0; c < 54; c++) {
      items.push(loopedTypes[c * 3 + 0]);
    }
    return items;
  }, [loopedTypes]);

  const row1Types = useMemo(() => {
    const items: PokemonType[] = [];
    for (let c = 0; c < 54; c++) {
      items.push(loopedTypes[c * 3 + 1]);
    }
    return items;
  }, [loopedTypes]);

  const row2Types = useMemo(() => {
    const items: PokemonType[] = [];
    for (let c = 0; c < 54; c++) {
      items.push(loopedTypes[c * 3 + 2]);
    }
    return items;
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

  const calculateInitialScrollX = useCallback((width: number) => {
    return PADDING_HORIZONTAL + 4 * ONE_CYCLE - width / 2 + BADGE_SIZE / 2;
  }, []);

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0) {
      setViewportWidth(width);
      if (!hasInitialScrolledRef.current) {
        hasInitialScrolledRef.current = true;
        const initialX = calculateInitialScrollX(width);
        scrollViewRef.current?.scrollTo({ x: initialX, animated: false });
      }
    }
  };

  const handleContentSizeChange = () => {
    if (!hasInitialScrolledRef.current && viewportWidth > 0) {
      hasInitialScrolledRef.current = true;
      const initialX = calculateInitialScrollX(viewportWidth);
      scrollViewRef.current?.scrollTo({ x: initialX, animated: false });
    }
  };

  const checkAndRecenter = useCallback((currentX: number) => {
    if (isAdjustingRef.current) return;
    const contentX = currentX - PADDING_HORIZONTAL;
    if (contentX < MIN_THRESHOLD || contentX > MAX_THRESHOLD) {
      const cycleOffset = ((contentX % ONE_CYCLE) + ONE_CYCLE) % ONE_CYCLE;
      const targetContentX = 4 * ONE_CYCLE + cycleOffset;
      const targetX = targetContentX + PADDING_HORIZONTAL;
      isAdjustingRef.current = true;
      scrollViewRef.current?.scrollTo({ x: targetX, animated: false });
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 50);
    }
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const contentX = x - PADDING_HORIZONTAL;

    // Extreme outer edge guard during active scrolling
    if (contentX < EXTREME_MIN || contentX > EXTREME_MAX) {
      if (isAdjustingRef.current) return;
      const cycleOffset = ((contentX % ONE_CYCLE) + ONE_CYCLE) % ONE_CYCLE;
      const targetContentX = 4 * ONE_CYCLE + cycleOffset;
      const targetX = targetContentX + PADDING_HORIZONTAL;
      isAdjustingRef.current = true;
      scrollViewRef.current?.scrollTo({ x: targetX, animated: false });
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 50);
    }
  };

  const handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    checkAndRecenter(event.nativeEvent.contentOffset.x);
  };

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    checkAndRecenter(event.nativeEvent.contentOffset.x);
  };

  const defaultInitialX = useMemo(() => {
    return calculateInitialScrollX(windowWidth || 390);
  }, [calculateInitialScrollX, windowWidth]);

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onLayout={handleLayout}
        onContentSizeChange={handleContentSizeChange}
        contentOffset={{ x: defaultInitialX, y: 0 }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Row 0 */}
        <View style={styles.row}>
          {row0Types.map((type, idx) => (
            <TypeBadge
              key={`row0-${idx}`}
              type={type}
              isSelected={isTypeSelected(type)}
              onPress={onSelect}
            />
          ))}
        </View>

        {/* Row 1 (staggered middle row shifted right by 36px) */}
        <View style={[styles.row, styles.middleRow]}>
          {row1Types.map((type, idx) => (
            <TypeBadge
              key={`row1-${idx}`}
              type={type}
              isSelected={isTypeSelected(type)}
              onPress={onSelect}
            />
          ))}
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          {row2Types.map((type, idx) => (
            <TypeBadge
              key={`row2-${idx}`}
              type={type}
              isSelected={isTypeSelected(type)}
              onPress={onSelect}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 263,
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'column',
    gap: GAP,
    paddingVertical: 12,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
    marginLeft: 0,
  },
  middleRow: {
    marginLeft: 36,
  },
  badge: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
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
