import React, { Suspense } from 'react';
import { View, Text } from 'react-native';
import BottomTabs from './components/BottomTabs';
import LoginScreen from './screens/LoginScreen';
import { useUser } from './contexts/user';

export default function Navigation() {
  const { user, loading } = useUser();

  let mainContent: React.ReactNode = null;
  if (loading) {
    mainContent = (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!loading && !user) {
    mainContent = <LoginScreen />;
  } else if (!loading && user) {
    mainContent = <BottomTabs />;
  }

  return <Suspense fallback={null}>{mainContent}</Suspense>;
}
