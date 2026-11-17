import { useState } from 'react';
import { View, Text, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EVENTS, CATEGORIES } from '../../../src/data/events';
import EventCard from '../../../src/components/EventCard';

export default function EventsScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);

  const data = category === 'All' ? EVENTS : EVENTS.filter((e) => e.category === category);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.count}>{data.length} events · {category}</Text>
        <Pressable style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Ionicons name="filter" size={16} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => router.push(`/events/${item.id}`)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events in this category.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Filter by category</Text>
            {CATEGORIES.map((c) => (
              <Pressable
                key={c}
                style={[styles.option, c === category && styles.optionActive]}
                onPress={() => {
                  setCategory(c);
                  setFilterVisible(false);
                }}
              >
                <Text style={[styles.optionText, c === category && { color: '#fff' }]}>{c}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setFilterVisible(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F4' },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  count: { fontWeight: '600', color: '#334155' },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#0F766E', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  filterText: { color: '#fff', fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, color: '#64748B' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  option: { padding: 14, borderRadius: 10, backgroundColor: '#F1F5F9', marginBottom: 8 },
  optionActive: { backgroundColor: '#0F766E' },
  optionText: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  cancel: { textAlign: 'center', color: '#E11D48', fontWeight: '700', marginTop: 8, padding: 8 },
});
