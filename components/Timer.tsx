import { View, Text, StyleSheet } from "react-native";

export default function Timer({ time }: { time: number }) {
  const formattedTime = `${Math.floor(time / 60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center"
  }
});
