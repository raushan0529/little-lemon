import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../components/Header';
import { useProfile } from '../ProfileContext';
import { colors } from '../theme';
import { validateEmail, validateName } from '../utils';

export default function OnboardingScreen() {
  const { profile, updateProfile } = useProfile();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  // Next is only enabled when both fields are valid.
  const valid = validateName(firstName) && validateEmail(email);

  const onNext = () =>
    updateProfile({
      ...profile,
      firstName: firstName.trim(),
      email: email.trim(),
      onboarded: true,
    });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Logo />
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>Let us get to know you</Text>

            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Tilly"
              autoCapitalize="words"
              textContentType="givenName"
            />

            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="tillydoe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={onNext}
              disabled={!valid}
              style={[styles.button, !valid && styles.buttonDisabled]}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light },
  header: { backgroundColor: colors.white, paddingVertical: 14, alignItems: 'center' },
  body: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: colors.green, textAlign: 'center', marginBottom: 32 },
  label: { fontSize: 20, fontWeight: '600', color: colors.green, marginBottom: 8 },
  input: {
    height: 48,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: colors.white,
    marginBottom: 24,
  },
  footer: { padding: 24, alignItems: 'flex-end' },
  button: {
    backgroundColor: colors.green,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 36,
  },
  buttonDisabled: { backgroundColor: '#B8C2BE' },
  buttonText: { color: colors.white, fontSize: 18, fontWeight: '700' },
});
