import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './screens/HomeScreen';
import SetupScreen from './screens/SetupScreen';
import TipPageScreen from './screens/TipPageScreen';
import MyLinksScreen from './screens/MyLinksScreen';
import ViewTipScreen from './screens/ViewTipScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f0f1e',
          },
          headerTintColor: '#00D9FF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#1a1a2e',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '🔒 Anonymous Tips' }}
        />
        <Stack.Screen
          name="Setup"
          component={SetupScreen}
          options={{ title: 'Create Tip Page' }}
        />
        <Stack.Screen
          name="TipPage"
          component={TipPageScreen}
          options={{ title: 'Your Tip Page' }}
        />
        <Stack.Screen
          name="MyLinks"
          component={MyLinksScreen}
          options={{ title: 'My Tip Links' }}
        />
        <Stack.Screen
          name="ViewTip"
          component={ViewTipScreen}
          options={{ title: 'Tip Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
