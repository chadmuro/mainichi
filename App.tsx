/* eslint-disable react/style-prop-object */
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import theme from './styles/theme';
import { UserProvider } from './contexts/user';
import { HabitProvider } from './contexts/habits';
import Navigation from './Navigation';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <UserProvider>
            <HabitProvider>
              <Navigation />
              <StatusBar style="light" />
            </HabitProvider>
          </UserProvider>
        </RecoilRoot>
      </ThemeProvider>
    </NavigationContainer>
  );
}
