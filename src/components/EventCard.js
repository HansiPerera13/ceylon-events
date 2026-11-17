import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function EventCard({ event, onPress }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(event.id);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Pressable onPress={() => toggleFavorite(event)} hitSlop={10}>
            <Ionicons name={fav ? 'heart' : 'heart-outline'} size={24} color={fav ? '#E11D48' : '#64748B'} />
          </Pressable>
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>📅 {event.date} · {event.time}</Text>
        <Text style={styles.meta}>📍 {event.location}</Text>
        <Text style={styles.price}>{event.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: '100%', height: 150 },
  body: { padding: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { color: '#0F766E', fontWeight: '700', fontSize: 12, letterSpacing: 1 },
  title: { fontSize: 18, fontWeight: '700', marginVertical: 4, color: '#0F172A' },
  meta: { color: '#475569', fontSize: 13, marginTop: 2 },
  price: { marginTop: 8, fontWeight: '700', color: '#0F766E' },
});
