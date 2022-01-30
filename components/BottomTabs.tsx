import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CreateScreen from '../screens/CreateScreen';
import DailyScreen from '../screens/DailyScreen';
import MonthlyScreen from '../screens/MonthlyScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#000' },
        headerStyle: { backgroundColor: '#000' },
        headerTitleStyle: { color: theme.colors?.white },
        headerTitleContainerStyle: { marginBottom: 0 },
      }}
    >
      <Tab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Monthly"
        component={MonthlyScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="date-range" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
