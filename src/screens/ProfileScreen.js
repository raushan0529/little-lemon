import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Header, { Avatar } from '../components/Header';
import { useProfile } from '../ProfileContext';
import { colors } from '../theme';
import { validateEmail, validateName, validatePhone } from '../utils';

const NOTIFS = [
  ['orderStatuses', 'Order statuses'],
  ['passwordChanges', 'Password changes'],
  ['specialOffers', 'Special offers'],
  ['newsletter', 'Newsletter'],
];

function Checkbox({ checked, label, onToggle }) {
  return (
    <Pressable style={styles.checkRow} onPress={onToggle}>
      <View style={[styles.box, checked && styles.boxOn]}>
        {checked ? <Text style={styles.tick}>✓</Text> : null}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
  );
}

function Field({ label, error, ...props }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, error && { borderColor: '#C0392B' }]} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const { profile, updateProfile, logout } = useProfile();
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const toggleNotif = (k) =>
    setDraft((d) => ({ ...d, notifications: { ...d.notifications, [k]: !d.notifications[k] } }));

  const pickAvatar = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow photo access to choose an avatar.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!res.canceled) set('avatar', res.assets[0].uri);
  };

  const save = async () => {
    const e = {};
    if (!validateName(draft.firstName)) e.firstName = 'Enter a valid first name.';
    if (draft.lastName && !validateName(draft.lastName)) e.lastName = 'Enter a valid last name.';
    if (!validateEmail(draft.email)) e.email = 'Enter a valid email.';
    if (!validatePhone(draft.phone)) e.phone = 'Enter a 10-digit phone number.';
    setErrors(e);
    if (Object.keys(e).length) return;
    await updateProfile({ ...draft, onboarded: true });
    Alert.alert('Saved', 'Your changes have been saved.');
  };

  const discard = () => {
    setDraft(profile);
    setErrors({});
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header profile={draft} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.card} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Personal information</Text>

        <Text style={styles.small}>Avatar</Text>
        <View style={styles.avatarRow}>
          <Avatar profile={draft} size={76} />
          <Pressable style={styles.change} onPress={pickAvatar}>
            <Text style={styles.changeText}>Change</Text>
          </Pressable>
          <Pressable style={styles.remove} onPress={() => set('avatar', null)}>
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>

        <Field label="First name" value={draft.firstName} onChangeText={(v) => set('firstName', v)} error={errors.firstName} />
        <Field label="Last name" value={draft.lastName} onChangeText={(v) => set('lastName', v)} error={errors.lastName} />
        <Field label="Email" value={draft.email} onChangeText={(v) => set('email', v)} keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Field label="Phone number" value={draft.phone} onChangeText={(v) => set('phone', v)} keyboardType="phone-pad" placeholder="(217) 555-0113" error={errors.phone} />

        <Text style={styles.section}>Email notifications</Text>
        {NOTIFS.map(([k, label]) => (
          <Checkbox key={k} label={label} checked={!!draft.notifications[k]} onToggle={() => toggleNotif(k)} />
        ))}

        <Pressable style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>

        <View style={styles.actions}>
          <Pressable style={styles.discard} onPress={discard}>
            <Text style={styles.discardText}>Discard changes</Text>
          </Pressable>
          <Pressable style={styles.save} onPress={save}>
            <Text style={styles.saveText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  card: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: '700', color: '#2B2B45', marginBottom: 10 },
  small: { fontSize: 12, color: '#7A7A9D', marginBottom: 6 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  change: { backgroundColor: colors.green, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 18, marginLeft: 18 },
  changeText: { color: colors.white, fontWeight: '700' },
  remove: { borderWidth: 1, borderColor: colors.green, borderRadius: 6, paddingVertical: 10, paddingHorizontal: 18, marginLeft: 14 },
  removeText: { color: colors.green, fontWeight: '600' },
  label: { fontSize: 12, fontWeight: '600', color: colors.dark, marginBottom: 6 },
  input: { height: 44, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, fontSize: 15 },
  error: { color: '#C0392B', fontSize: 12, marginTop: 4 },
  section: { fontSize: 17, fontWeight: '700', color: '#2B2B45', marginTop: 8, marginBottom: 10 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  box: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: colors.green, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  boxOn: { backgroundColor: colors.green },
  tick: { color: colors.white, fontSize: 13, fontWeight: '800', lineHeight: 16 },
  checkLabel: { fontSize: 14, color: colors.dark },
  logout: { backgroundColor: colors.yellow, borderRadius: 8, borderWidth: 1, borderColor: '#D4AA00', paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  logoutText: { fontWeight: '700', fontSize: 16, color: '#000' },
  actions: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  discard: { borderWidth: 1, borderColor: colors.green, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 18, marginRight: 16 },
  discardText: { color: colors.green, fontWeight: '600' },
  save: { backgroundColor: colors.green, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 22 },
  saveText: { color: colors.white, fontWeight: '700' },
});
