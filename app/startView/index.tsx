import { StyleSheet, Text, View } from "react-native";

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
    fontSize: 24,
    fontWeight: "700",
  },
});
