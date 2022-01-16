import { StyleSheet, Text } from "react-native";
import { Input, Button, useTheme } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, styles.title]}>Welcome to Mainichi!</Text>
      <Text style={styles.text}>What's your name?</Text>
      <Input
        placeholder="Enter your name..."
        containerStyle={{ width: 300, marginTop: 30 }}
        inputStyle={{ color: theme.colors?.white }}
      />
      <Button
        title="Submit"
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FAF9F6",
  },
  title: {
    fontSize: 24,
  },
});
