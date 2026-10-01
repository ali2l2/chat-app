import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type FeatherName = React.ComponentProps<typeof Feather>['name'];

const mainNavItems: { id: string; label: string; icon: FeatherName; count?: number }[] = [
  { id: 'my-day', label: 'My Day', icon: 'sun', count: 2 },
  { id: 'important', label: 'Important', icon: 'star', count: 1 },
  { id: 'tasks', label: 'Tasks', icon: 'home' },
];

const customLists: { id: string; label: string; count?: number }[] = [
  { id: 'general', label: 'General', count: 19 },
];

export default function SideNav() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('General');

  const NavRow = ({
    label,
    icon,
    count,
  }: {
    label: string;
    icon: FeatherName;
    count?: number;
  }) => (
    <Pressable
      onPress={() => setActiveItem(label)}
      style={[styles.navItem, activeItem === label && styles.activeNavItem]}
    >
      <View style={styles.itemLeft}>
        <Feather name={icon} size={18} color="#aaa" />
        <Text style={[styles.navText, activeItem === label && { color: '#fff' }]}>
          {label}
        </Text>
      </View>
      {count !== undefined && <Text style={styles.count}>{count}</Text>}
    </Pressable>
  );

  return (
    <View style={styles.sidebar}>
      {/* Profile / header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AA</Text>
          </View>
          <View>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>alex alex</Text>
              <Feather name="chevron-down" size={14} color="#e1e1e1" style={{ marginLeft: 4 }} />
            </View>
            <Text style={styles.userEmail}>gmail....</Text>
          </View>
          <Pressable onPress={() => router.push('/Setting' as any)} hitSlop={8}>
            <Feather name="settings" size={22} color="#e1e1e1" />
          </Pressable>
        </View>
        <Feather name="search" size={18} color="#aaa" />
      </View>

      <ScrollView>
        {/* Main system views */}
        {mainNavItems.map(item => (
          <NavRow key={item.id} label={item.label} icon={item.icon} count={item.count} />
        ))}

        <View style={styles.divider} />

        {/* Custom lists */}
        {customLists.map(item => (
          <NavRow key={item.id} label={item.label} icon="list" count={item.count} />
        ))}
      </ScrollView>

      {/* Footer / new list */}
      <View style={styles.footer}>
        <Pressable style={styles.newListBtn}>
          <Feather name="plus" size={18} color="#aaa" style={{ marginRight: 8 }} />
          <Text style={styles.navText}>New list</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: { flex: 1, backgroundColor: '#1f1f1f', paddingVertical: 12 },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  profileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  userNameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { color: '#e1e1e1', fontSize: 14, fontWeight: '600' },
  userEmail: { color: '#888', fontSize: 12 },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  activeNavItem: { backgroundColor: '#2c2c2c' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  navText: { color: '#ccc', fontSize: 14 },
  count: { color: '#888', fontSize: 12 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#333', marginVertical: 12 },
  footer: { paddingHorizontal: 16, paddingVertical: 12 },
  newListBtn: { flexDirection: 'row', alignItems: 'center' },
});