import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { typography } from "@/constants/typography";

function BigButton({ title, onpress }: { title: string; onpress: () => void }) {
  return (
    <Pressable onPress={onpress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: "#111827",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#ffffff",
    textAlign: "center",
    ...typography.buttonLg,
  },
});

export default BigButton;
