import { useState } from 'react';
import { View, Text, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { EVENTS } from '../../src/data/events';
import { useApp } from '../../src/context/AppContext';
import EventCard from '../../src/components/EventCard';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFavorite } = useApp();
  const [pendingRemove, setPendingRemove] = useState(null);

  const data = EVENTS.filter((e) => favorites.includes(e.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <EventCard event={item} onPress={() => router.push(`/events/${item.id}`)} />
            <Pressable style={styles.removeBtn} onPress={() => setPendingRemove(item)}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No favorites yet 💔</Text>
            <Text style={styles.emptyText}>Tap the heart on any event to bookmark it.</Text>
          </View>
        }
      />

      {/* Confirmation Modal */}
      <Modal visible={!!pendingRemove} transparent animationType="fade" onRequestClose={() => setPendingRemove(null)}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Remove favorite?</Text>
            <Text style={styles.dialogText}>"{pendingRemove?.title}" will be removed from your favorites.</Text>
            <View style={styles.actions}>
              <Pressable style={[styles.actionBtn, { backgroundColor: '#E2E8F0' }]} onPress={() => setPendingRemove(null)}>
                <Text style={{ fontWeight: '700' }}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.actionBtn, { backgroundColor: '#E11D48' }]}
                onPress={() => {
                  removeFavorite(pendingRemove.id);
                  setPendingRemove(null);
                }}
              >
                <Text style={{ fontWeight: '700', color: '#fff' }}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F4' },
  removeBtn: { alignSelf: 'flex-end', marginRight: 20, marginTop: -4 },
  removeText: { color: '#E11D48', fontWeight: '700', padding: 6 },
  emptyBox: { alignItems: 'center', marginTop: 80, paddingHorizontal: 30 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  emptyText: { color: '#64748B', marginTop: 6, textAlign: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 30 },
  dialog: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  dialogTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  dialogText: { color: '#475569', marginBottom: 18 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
});
