import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { queryClient } from '@/apis/config';
import { migrateDbIfNeeded } from '@/repository';
import { useTheme } from '@/stores/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colors = useTheme(s => s.colors);
  const isDark = useTheme(s => s.isDark);

  return (

    <SQLiteProvider databaseName="medxcore.db" onInit={migrateDbIfNeeded}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
          <Stack screenOptions={{
            contentStyle: {
              backgroundColor: colors.bg
            }
          }} >
            <Stack.Screen name="(tabs)" options={{
              headerShown: false, contentStyle: {
                backgroundColor: colors.bg,
                flex: 1
              }
            }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>

        </SafeAreaView>

        <StatusBar style={isDark ? 'light' : "dark"} />

      </QueryClientProvider>
    </SQLiteProvider>

  );
}
