import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Show notifications even while the app is open.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Ask permission and create the Android channel. Returns true if granted.
export async function setupNotifications() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Event alerts',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const current = await Notifications.getPermissionsAsync();
  let status = current.status;
  if (status !== 'granted') {
    const asked = await Notifications.requestPermissionsAsync();
    status = asked.status;
  }
  return status === 'granted';
}

// Immediate notification (trigger: null).
export async function sendNow(title, body) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}

// Scheduled notification after `seconds` seconds.
export async function scheduleReminder(title, body, seconds = 10) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: 'default',
    },
  });
}
