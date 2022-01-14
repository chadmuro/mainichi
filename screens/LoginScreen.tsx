import { StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to Mainichi!</Text>
      <Text>What's your name?</Text>
      <Input
        placeholder="Enter your name..."
        containerStyle={{ width: 300, marginVertical: 10 }}
      />
      <Button
        title="Submit"
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
