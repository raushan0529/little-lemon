import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'littleLemon:profile';

export const defaultProfile = {
  onboarded: false,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  avatar: null,
  notifications: {
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  },
};

export async function loadProfile() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return defaultProfile;
    const saved = JSON.parse(raw);
    return {
      ...defaultProfile,
      ...saved,
      notifications: { ...defaultProfile.notifications, ...(saved.notifications || {}) },
    };
  } catch (e) {
    return defaultProfile;
  }
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}

// Log out: wipe every stored value so the Profile screen is empty
// and the app returns to Onboarding.
export async function clearProfile() {
  await AsyncStorage.clear();
}
