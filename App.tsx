/* eslint-disable react/style-prop-object */
import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import theme from './styles/theme';
import Navigation from './Navigation';

export default function App() {
  return (
    <Suspense fallback={null}>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Navigation />
            <StatusBar style="light" />
          </RecoilRoot>
        </ThemeProvider>
      </NavigationContainer>
    </Suspense>
  );
}
