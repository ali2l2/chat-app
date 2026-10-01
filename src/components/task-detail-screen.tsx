import { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usecontext1 } from '@/context';
import TaskEnergy from '@/components/task-energy';

const actions: { icon: React.ComponentProps<typeof Feather>['name']; label: string }[] = [
  { icon: 'align-left', label: 'Add details' },
  { icon: 'target', label: 'Add deadline' },
  { icon: 'clock', label: 'Add date/time' },
  { icon: 'arrow-right', label: 'Add subtasks' },
];

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const ctx = useContext(usecontext1);
  const multiInputValue: any[][] = ctx[0];
  const setMultiInputValue = ctx[1];

  const [isStarred, setIsStarred] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const task = multiInputValue.find(t => t[0] === id);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Feather name="arrow-left" size={22} color="#f5e0d3" />
        </Pressable>
        <Text style={styles.notFound}>Task not found.</Text>
      </SafeAreaView>
    );
  }

  const updateTitle = (text: string) => {
    setMultiInputValue((prev: any[][]) =>
      prev.map(t => {
        if (t[0] !== id) return t;
        const copy = [...t];
        copy[1] = text;
        return copy;
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Feather name="arrow-left" size={22} color="#f5e0d3" />
        </Pressable>
        <View style={styles.topBarRight}>
          <Pressable onPress={() => setIsStarred(v => !v)} style={styles.iconBtn}>
            <Text style={[styles.star, isStarred && { color: '#f0c08d' }]}>
              {isStarred ? '★' : '☆'}
            </Text>
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Feather name="more-vertical" size={22} color="#f5e0d3" />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.main}
        contentContainerStyle={{ gap: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable style={styles.listSelector}>
          <Feather name="chevron-down" size={16} color="#e8c3aa" />
        </Pressable>

        <TextInput
          value={String(task[1])}
          onChangeText={updateTitle}
          style={styles.titleInput}
          placeholderTextColor="#8a766a"
        />

        <TaskEnergy theDemandTask={task} activoo={0} />

        <View style={styles.actionList}>
          {actions.map(a => (
            <Pressable key={a.label} style={styles.actionItem}>
              <Feather name={a.icon} size={20} color="#d8c2b5" />
              <Text style={styles.actionText}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Pressable
          onPress={() => setIsCompleted(v => !v)}
          style={[styles.completeBtn, isCompleted && styles.completeBtnDone]}
        >
          <Text style={[styles.completeText, isCompleted && { color: '#e8c3aa' }]}>
            {isCompleted ? 'Mark uncompleted' : 'Mark completed'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c140e', padding: 16 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  topBarRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 8, borderRadius: 20 },
  star: { fontSize: 24, color: '#f5e0d3' },
  main: { flex: 1 },
  listSelector: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  titleInput: { color: '#f5e0d3', fontSize: 24, padding: 0 },
  actionList: { gap: 16, paddingTop: 8 },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 8 },
  actionText: { color: '#d8c2b5', fontSize: 14, fontWeight: '500' },
  bottomBar: { alignItems: 'flex-end', paddingBottom: 16 },
  completeBtn: {
    backgroundColor: '#f0c08d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  completeBtnDone: { backgroundColor: '#382c22' },
  completeText: { color: '#2a1b0e', fontWeight: '600', fontSize: 14 },
  notFound: { color: '#f5e0d3', fontSize: 16, marginTop: 24 },
});