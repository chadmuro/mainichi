import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/BottomTabs";
import LoginScreen from "./screens/LoginScreen";
import { theme } from "./styles/theme";

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <BottomTabs />
        {/* <LoginScreen /> */}
        <StatusBar style="dark" />
      </ThemeProvider>
    </NavigationContainer>
  );
}
