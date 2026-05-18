import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LinearGradient
        colors={["#000000", "#06413B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ contentStyle: { backgroundColor: "transparent" } }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </LinearGradient>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
