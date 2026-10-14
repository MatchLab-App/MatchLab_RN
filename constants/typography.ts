export const fontFamily = {
  thin: 'AppleSDGothicNeoThin',
  extraLight: 'AppleSDGothicNeoExtraLight',
  light: 'AppleSDGothicNeoLight',
  regular: 'AppleSDGothicNeoRegular',
  medium: 'AppleSDGothicNeoMedium',
  semiBold: 'AppleSDGothicNeoSemiBold',
  bold: 'AppleSDGothicNeoBold',
  extraBold: 'AppleSDGothicNeoExtraBold',
  black: 'AppleSDGothicNeoBlack',
} as const;

export type FontFamily = typeof fontFamily;
export type FontWeightKey = keyof typeof fontFamily;

export const typography = {
  titleLg: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
  },
  titleMd: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
  },
  titleSm: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
  },
  buttonLg: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
  },
  buttonMd: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 26,
  },
  bodyLg: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18,
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
  },
  bodySemiBold: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    lineHeight: 21,
  },
  captionSm: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    lineHeight: 18,
  },
  captionXs: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
  tokenLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    lineHeight: 14,
  },
  subLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

export type TypographyPresets = typeof typography;
export type TypographyKey = keyof typeof typography;
