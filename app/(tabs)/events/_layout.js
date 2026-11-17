import { Stack } from 'expo-router';

// Nested stack inside the Events tab: list -> detail
export default function EventsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0F766E' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Ceylon Events' }} />
      <Stack.Screen name="[id]" options={{ title: 'Event Details' }} />
    </Stack>
  );
}
