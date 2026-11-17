import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useApp } from '../../src/context/AppContext';
import { sendNow } from '../../src/services/notifications';

export default function StatusScreen() {
  const { currentState, foregroundCount, lastResumed, favorites } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>App Status</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current AppState</Text>
        <Text style={styles.value}>{currentState}</Text>

        <Text style={styles.label}>Returned from background</Text>
        <Text style={styles.value}>{foregroundCount} time(s)</Text>

        <Text style={styles.label}>Last resumed at</Text>
        <Text style={styles.value}>{lastResumed ?? 'Not yet'}</Text>

        <Text style={styles.label}>Favorites saved</Text>
        <Text style={styles.value}>{favorites.length}</Text>
      </View>

      <Text style={styles.hint}>
        Switch to another app (or the home screen) and come back to see the counter update.
      </Text>

      <Pressable
        style={styles.btn}
        onPress={() => sendNow('Test notification 🔔', 'Local notifications are working!')}
      >
        <Text style={styles.btnText}>Send test notification</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F1F5F4' },
  heading: { fontSize: 24, fontWeight: '800', marginBottom: 14, color: '#0F172A' },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 14, elevation: 2 },
  label: { color: '#64748B', fontSize: 13, marginTop: 10 },
  value: { fontSize: 18, fontWeight: '700', color: '#0F766E' },
  hint: { color: '#475569', marginVertical: 16 },
  btn: { backgroundColor: '#0F766E', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
