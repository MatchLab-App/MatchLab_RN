import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { fontFamily } from "@/constants/typography";
import { MatchLabProvider } from "@/context/MatchLabContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <MatchLabProvider>
      <LinearGradient
        colors={["#000000", "#06413B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="startView/index" />
          <Stack.Screen name="notice/index" />
          <Stack.Screen name="home/index" />
          <Stack.Screen name="search/index" />
          <Stack.Screen name="recentResults/index" />
          <Stack.Screen name="settings/index" />
          <Stack.Screen name="typeChart/index" />
        </Stack>
      </LinearGradient>
      <StatusBar style="light" />
    </MatchLabProvider>
  );
}
