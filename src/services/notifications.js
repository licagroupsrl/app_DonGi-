import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications behave when the app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Registers the device for push notifications.
 * @returns {Promise<string|undefined>} The push token if successful.
 */
export async function registerForPushNotificationsAsync() {
  let token;

  // 1. Check if physical device (Notifications don't work on simulators usually)
  if (!Device.isDevice) {
    console.log('Must use physical device for Push Notifications');
    return; // Returing undefined for simulator
  }

  // 2. Request Permissions
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  // 3. Get the Token (Expo Push Token or FCM Token)
  // For standard Expo usage, we use getExpoPushTokenAsync.
  // Expo handles the communication with FCM.
  // Make sure to add "google-services.json" in app.json/app.config.js for Android.
  token = (await Notifications.getExpoPushTokenAsync({
    // projectId: 'your-project-id', // Optional: needed for Expo SDK 49+ if not standard
  })).data;

  // 4. Android Channel Configuration
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

/**
 * INSTRUCTIONS FOR SENDING NOTIFICATIONS (FCM):
 *
 * 1. Setup Firebase Project and download `google-services.json`.
 * 2. Place `google-services.json` in the root of your project.
 * 3. Configure `app.json` (Expo):
 *    "android": {
 *       "googleServicesFile": "./google-services.json",
 *       "package": "com.dongio.app"
 *    }
 * 4. Upload your FCM Server Key (or Service Account) to Expo Credentials if building via EAS,
 *    OR use the direct FCM integration if using "Prebuild" / "Bare Workflow".
 *
 * 5. To send a notification:
 *    - Use the Expo Push API: https://exp.host/--/api/v2/push/send
 *    - Or use Firebase Cloud Messaging Console targeting the device token.
 */
