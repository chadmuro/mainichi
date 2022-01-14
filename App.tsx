import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/BottomTabs";
import LoginScreen from "./screens/LoginScreen";
import DailyScreen from "./screens/DailyScreen";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
      {/* <LoginScreen /> */}
      {/* <DailyScreen /> */}
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
