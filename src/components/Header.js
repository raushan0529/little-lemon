import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';

export function Avatar({ profile, size = 44 }) {
  const initials =
    `${(profile.firstName || '').charAt(0)}${(profile.lastName || '').charAt(0)}`.toUpperCase() || '?';
  if (profile.avatar) {
    return (
      <Image
        source={{ uri: profile.avatar }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    );
  }
  return (
    <View
      style={[
        styles.initials,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={{ color: colors.white, fontWeight: '700', fontSize: size * 0.4 }}>{initials}</Text>
    </View>
  );
}

export function Logo() {
  return (
    <View style={styles.logo}>
      <Text style={styles.lemon}>🍋</Text>
      <Text style={styles.logoText}>LITTLE LEMON</Text>
    </View>
  );
}

// Header: back button (when applicable) · logo · profile avatar
export default function Header({ profile, onBack, onProfile }) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {onBack ? (
          <Pressable onPress={onBack} style={styles.back} accessibilityLabel="Back">
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
        ) : null}
      </View>
      <Logo />
      <View style={[styles.side, { alignItems: 'flex-end' }]}>
        {onProfile ? (
          <Pressable onPress={onProfile} accessibilityLabel="Open profile">
            <Avatar profile={profile} />
          </Pressable>
        ) : (
          <Avatar profile={profile} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  side: { width: 48 },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { color: colors.white, fontSize: 18, fontWeight: '700' },
  logo: { flexDirection: 'row', alignItems: 'center' },
  lemon: { fontSize: 26, marginRight: 6 },
  logoText: { letterSpacing: 2, fontWeight: '700', color: colors.green, fontSize: 13 },
  initials: { backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
});
