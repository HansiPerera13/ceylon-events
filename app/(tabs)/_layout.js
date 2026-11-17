import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';

export default function TabsLayout() {
  const { favorites } = useApp();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0F766E', headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          headerShown: false, // nested stack renders its own header
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Status',
          tabBarIcon: ({ color, size }) => <Ionicons name="pulse" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
