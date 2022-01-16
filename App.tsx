import { useState } from "react";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabs from "./components/BottomTabs";
import LoginScreen from "./screens/LoginScreen";
import { theme } from "./styles/theme";

export default function App() {
  const [username, setUsername] = useState("");
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      if (value !== null) {
        setUsername(value);
      }
      console.log(value);
    } catch (err: any) {
      Alert.alert(err.message);
    }
  };

  getData();

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        {username ? <BottomTabs /> : <LoginScreen />}
        <StatusBar style="light" />
      </ThemeProvider>
    </NavigationContainer>
  );
}
