export const fontFamily = {
  thin: "AppleSDGothicNeoThin",
  extraLight: "AppleSDGothicNeoExtraLight",
  light: "AppleSDGothicNeoLight",
  regular: "AppleSDGothicNeoRegular",
  medium: "AppleSDGothicNeoMedium",
  semiBold: "AppleSDGothicNeoSemiBold",
  bold: "AppleSDGothicNeoBold",
  extraBold: "AppleSDGothicNeoExtraBold",
  black: "AppleSDGothicNeoBlack",
} as const;

export const typography = {
  titleLg: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
  },
  buttonLg: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 30,
  },
  bodyMd: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 22,
  },
} as const;
