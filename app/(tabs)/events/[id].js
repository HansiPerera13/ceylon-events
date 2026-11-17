import { View, Text, Image, Pressable, ScrollView, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EVENTS } from '../../../src/data/events';
import { useApp } from '../../../src/context/AppContext';
import { scheduleReminder } from '../../../src/services/notifications';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useApp();
  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Event not found.</Text>
        <Pressable onPress={() => router.back()}><Text style={styles.link}>Go back</Text></Pressable>
      </View>
    );
  }

  const fav = isFavorite(event.id);

  const handleReminder = async () => {
    await scheduleReminder('Event reminder ⏰', `Don't forget: ${event.title} at ${event.time}`, 10);
    Alert.alert('Reminder set', 'You will be notified in 10 seconds (demo).');
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.category}>{event.category.toUpperCase()}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>📅 {event.date} · {event.time}</Text>
        <Text style={styles.meta}>📍 {event.location}</Text>
        <Text style={styles.meta}>🎟️ {event.price}</Text>
        <Text style={styles.desc}>{event.description}</Text>

        <Pressable style={[styles.btn, fav && styles.btnActive]} onPress={() => toggleFavorite(event)}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={20} color="#fff" />
          <Text style={styles.btnText}>{fav ? 'Remove from favorites' : 'Add to favorites'}</Text>
        </Pressable>

        <Pressable style={[styles.btn, { backgroundColor: '#334155' }]} onPress={handleReminder}>
          <Ionicons name="alarm" size={20} color="#fff" />
          <Text style={styles.btnText}>Remind me in 10 seconds</Text>
        </Pressable>

        <Pressable style={styles.back} onPress={() => router.back()}>
          <Text style={styles.link}>← Back to events</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 240 },
  body: { padding: 20 },
  category: { color: '#0F766E', fontWeight: '700', letterSpacing: 1, fontSize: 12 },
  title: { fontSize: 26, fontWeight: '800', marginVertical: 6, color: '#0F172A' },
  meta: { fontSize: 15, color: '#475569', marginTop: 4 },
  desc: { fontSize: 16, lineHeight: 24, color: '#1E293B', marginVertical: 18 },
  btn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#0F766E', padding: 14, borderRadius: 12, marginBottom: 10 },
  btnActive: { backgroundColor: '#E11D48' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  back: { alignItems: 'center', padding: 12 },
  link: { color: '#0F766E', fontWeight: '700' },
});
