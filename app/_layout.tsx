import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { fontFamily } from "@/constants/typography";
import { useColorScheme } from "@/hooks/use-color-scheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    [fontFamily.thin]: require("../assets/fonts/AppleSDGothicNeo-Thin.ttf"),
    [fontFamily.extraLight]: require("../assets/fonts/AppleSDGothicNeo-ExtraLight.ttf"),
    [fontFamily.light]: require("../assets/fonts/AppleSDGothicNeo-Light.ttf"),
    [fontFamily.regular]: require("../assets/fonts/AppleSDGothicNeo-Regular.ttf"),
    [fontFamily.medium]: require("../assets/fonts/AppleSDGothicNeo-Medium.ttf"),
    [fontFamily.semiBold]: require("../assets/fonts/AppleSDGothicNeo-SemiBold.ttf"),
    [fontFamily.bold]: require("../assets/fonts/AppleSDGothicNeo-Bold.ttf"),
    [fontFamily.extraBold]: require("../assets/fonts/AppleSDGothicNeo-ExtraBold.ttf"),
    [fontFamily.black]: require("../assets/fonts/AppleSDGothicNeo-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LinearGradient
        colors={["#000000", "#06413B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <Stack
          screenOptions={{ contentStyle: { backgroundColor: "transparent" } }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </LinearGradient>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
