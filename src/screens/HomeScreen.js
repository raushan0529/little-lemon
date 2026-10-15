import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, TextInput, Image, FlatList, Pressable, StyleSheet, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useProfile } from '../ProfileContext';
import { colors } from '../theme';
import { fallbackMenu, MENU_URL, imageUrl, categories } from '../menu';

export default function HomeScreen({ navigation }) {
  const { profile } = useProfile();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selected, setSelected] = useState([]); // selected category chips

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(MENU_URL);
        const json = await res.json();
        const items = (json.menu || []).map((m) => ({
          name: m.name,
          price: m.price,
          description: m.description,
          image: m.image,
          category: m.category,
        }));
        if (!cancelled) setMenu(items.length ? items : fallbackMenu);
      } catch (e) {
        if (!cancelled) setMenu(fallbackMenu);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const toggle = (c) =>
    setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const data = useMemo(
    () =>
      menu.filter(
        (m) =>
          (selected.length === 0 || selected.includes(m.category)) &&
          m.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [menu, selected, query]
  );

  const ListHeader = (
    <View>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSub}>Chicago</Text>
        <View style={styles.heroRow}>
          <Text style={styles.heroText}>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served
            with a modern twist.
          </Text>
          <Image source={{ uri: imageUrl('bruschetta.jpg') }} style={styles.heroImage} />
        </View>
        <Pressable style={styles.searchBtn} onPress={() => setShowSearch((v) => !v)} accessibilityLabel="Search">
          <Text style={{ fontSize: 18 }}>🔍</Text>
        </Pressable>
        {showSearch && (
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search menu"
            placeholderTextColor="#777"
            autoFocus
          />
        )}
      </View>

      {/* Menu breakdown */}
      <View style={styles.breakdown}>
        <Text style={styles.delivery}>ORDER FOR DELIVERY!</Text>
        <View style={styles.chips}>
          {categories.map((c) => {
            const on = selected.includes(c);
            return (
              <Pressable key={c} onPress={() => toggle(c)} style={[styles.chip, on && styles.chipOn]}>
                <Text style={[styles.chipText, on && styles.chipTextOn]}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <Header profile={profile} onProfile={() => navigation.navigate('Profile')} />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" color={colors.green} />
      ) : (
        /* Food menu list */
        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={<Text style={styles.empty}>No dishes match your filters.</Text>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <Image source={{ uri: imageUrl(item.image) }} style={styles.itemImage} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  hero: { backgroundColor: colors.green, padding: 16 },
  heroTitle: { fontSize: 44, color: colors.yellow, fontWeight: '700' },
  heroSub: { fontSize: 26, color: colors.white, marginBottom: 8 },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroText: { flex: 1, color: colors.white, fontSize: 16, lineHeight: 22, paddingRight: 12 },
  heroImage: { width: 110, height: 120, borderRadius: 16 },
  searchBtn: {
    marginTop: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    marginTop: 10,
    backgroundColor: colors.light,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 16,
  },
  breakdown: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  delivery: { fontSize: 18, fontWeight: '800', color: colors.dark, marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    backgroundColor: colors.light,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 8,
  },
  chipOn: { backgroundColor: colors.green },
  chipText: { color: colors.green, fontWeight: '700' },
  chipTextOn: { color: colors.white },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  itemName: { fontSize: 18, fontWeight: '700', color: colors.dark, marginBottom: 4 },
  itemDesc: { color: colors.green, fontSize: 14, marginBottom: 6 },
  itemPrice: { color: colors.green, fontSize: 16, fontWeight: '600' },
  itemImage: { width: 90, height: 90, borderRadius: 8, backgroundColor: colors.light },
  empty: { textAlign: 'center', padding: 24, color: colors.green },
});
