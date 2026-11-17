import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

// Shown briefly when the app returns from background to foreground.
export default function WelcomeBackBanner() {
  const { showWelcomeBack, lastResumed } = useApp();
  const insets = useSafeAreaInsets();
  if (!showWelcomeBack) return null;

  return (
    <Text style={[styles.banner, { top: insets.top + 8 }]}>
      👋 Welcome back! Resumed at {lastResumed}
    </Text>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 100,
    backgroundColor: '#0F766E',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: '600',
    overflow: 'hidden',
  },
});
