import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-elements";
import Layout from "../components/Layout";

export default function SettingsScreen() {
  const { theme } = useTheme();

  return (
    <Layout>
      <Text style={{ color: theme.colors?.white }}>Coming soon...</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({});
