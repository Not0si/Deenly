import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/stores/theme';

export default function TabLayout() {
  const colors = useTheme(s => s.colors);

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accent,
        tabBarStyle: {
          padding: 0,
          backgroundColor: colors.bg_canvas,
          height: 60,
          borderRadius: 9999,
          marginInline: 20,
          shadowColor: 'transparent',
          borderColor: 'transparent',
          alignItems: 'center'
        },
        tabBarIconStyle: {
          backgroundColor: colors.bg_surfaceAlt,
          borderRadius: 9999,
          width: 48,
          height: 48
        },
        sceneStyle: {
          backgroundColor: colors.bg,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="salat"
        options={{
          title: 'Salat',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
