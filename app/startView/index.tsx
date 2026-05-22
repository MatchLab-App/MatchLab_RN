import { StyleSheet, Text, View } from "react-native";
import { typography } from "@/constants/typography";

export default function StartViewScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MatchLab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    ...typography.titleLg,
  },
});
