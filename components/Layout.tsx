import { StyleSheet, View } from "react-native";

interface DailyScreenProps {
  children: React.ReactNode;
}

export default function DailyScreen({ children }: DailyScreenProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});
