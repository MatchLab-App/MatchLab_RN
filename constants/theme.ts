/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const MatchLabColors = {
  backgroundGradient: ['#000000', '#06413B'] as const,
  startOverlayGradient: ['rgba(0, 0, 0, 0.15)', 'rgba(0, 31, 28, 0.85)'] as const,
  buttonPrimary: 'rgba(0, 244, 219, 0.6)',
  buttonSecondary: 'rgba(255, 255, 255, 0.1)',
  neonCyan: '#14F5DE', // rgb(0.08, 0.96, 0.87)
  recentRecordCyan: '#40EBD9', // rgb(0.25, 0.92, 0.85)
  weakRed: '#FF2661', // rgb(1.0, 0.15, 0.38)
  cardSurface: 'rgba(3, 13, 13, 0.3)',
  headerSurface: 'rgba(3, 23, 20, 0.35)',
  rowSurface: 'rgba(255, 255, 255, 0.1)',
  borderSubtle: 'rgba(255, 255, 255, 0.14)',
  borderHeader: 'rgba(255, 255, 255, 0.16)',
  divider: 'rgba(255, 255, 255, 0.2)',
  textWhite: '#FFFFFF',
  textWhite75: 'rgba(255, 255, 255, 0.75)',
  textWhite70: 'rgba(255, 255, 255, 0.7)',
  textWhite45: 'rgba(255, 255, 255, 0.45)',
  textGray: '#D2D2D2',
};

export type MatchLabColorKey = keyof typeof MatchLabColors;
