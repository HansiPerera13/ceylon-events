import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { setupNotifications, sendNow } from '../services/notifications';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ----- Shared state: bookmarked event ids -----
  const [favorites, setFavorites] = useState([]);

  // ----- AppState tracking -----
  const appState = useRef(AppState.currentState);
  const [currentState, setCurrentState] = useState(AppState.currentState);
  const [foregroundCount, setForegroundCount] = useState(0);
  const [lastResumed, setLastResumed] = useState(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      // Detect background/inactive -> active (foreground)
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        setForegroundCount((c) => c + 1);
        setLastResumed(new Date().toLocaleTimeString());
        setShowWelcomeBack(true);
        setTimeout(() => setShowWelcomeBack(false), 3500);
      }
      appState.current = nextState;
      setCurrentState(nextState);
    });
    return () => subscription.remove();
  }, []);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = async (event) => {
    if (favorites.includes(event.id)) {
      setFavorites((prev) => prev.filter((id) => id !== event.id));
    } else {
      setFavorites((prev) => [...prev, event.id]);
      await sendNow('Event bookmarked! 🎉', `${event.title} was added to your favorites.`);
    }
  };

  const removeFavorite = (id) => setFavorites((prev) => prev.filter((f) => f !== id));

  return (
    <AppContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        currentState,
        foregroundCount,
        lastResumed,
        showWelcomeBack,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
