import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { ProfileContext } from './src/ProfileContext';
import { loadProfile, saveProfile, clearProfile, defaultProfile } from './src/storage';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(defaultProfile);

  // Splash/loading state while we read AsyncStorage on launch.
  useEffect(() => {
    (async () => {
      setProfile(await loadProfile());
      setLoading(false);
    })();
  }, []);

  const updateProfile = useCallback(async (next) => {
    setProfile(next);
    await saveProfile(next);
  }, []);

  const logout = useCallback(async () => {
    await clearProfile();
    setProfile(defaultProfile);
  }, []);

  const value = useMemo(() => ({ profile, updateProfile, logout }), [profile, updateProfile, logout]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }}>
        <ActivityIndicator size="large" color={colors.green} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ProfileContext.Provider value={value}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {profile.onboarded ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            ) : (
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </ProfileContext.Provider>
    </SafeAreaProvider>
  );
}
