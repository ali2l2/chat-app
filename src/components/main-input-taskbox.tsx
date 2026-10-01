import { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { usecontext1 } from '@/context';
import TaskEnergy from '@/components/task-energy';

const makeId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

const dayName = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-US', { weekday: 'long' });
};

export default function MainInputTaskbox({ theNew, state1, crit, critria }: any) {
  const ctx = useContext(usecontext1);
  const multiInputValue: any[][] = ctx[0];
  const setMultiInputValue = ctx[1];
  const blueprint: any[][] = ctx[2];

  const [inputValue, setInputValue] = useState('');
  const [showDateMenu, setShowDateMenu] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const submit = () => {
    const title = inputValue.trim();
    if (!title) return;

    // give the last (blank) task its title, then add a fresh blank one
    const updated = multiInputValue.map(t => [...t]);
    if (updated.length > 0) updated[updated.length - 1][1] = title;
    updated.push([makeId(), 'a', blueprint.map(r => [...r]), 0]);
    setMultiInputValue(updated);

    setInputValue('');
    theNew(true);
    inputRef.current?.focus();
  };

  if (!state1) return null;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.wrapper}
    >
      {showDateMenu && (
        <View style={styles.menu}>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>📅  Today ({dayName(0)})</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>➡️  Tomorrow ({dayName(1)})</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>⏩  Next week ({dayName(7)})</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>🗓️  Pick a date</Text>
          </View>
        </View>
      )}

      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Text style={styles.circleIcon}>◯</Text>
          <TextInput
            ref={inputRef}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Add a task"
            placeholderTextColor="#888"
            autoFocus
            style={styles.input}
            onSubmitEditing={submit}
            blurOnSubmit={false}
            onBlur={() => {
              theNew(false);
              setShowDateMenu(false);
            }}
          />
          <Pressable onPress={submit} hitSlop={8}>
            <Text style={styles.submit}>👍</Text>
          </Pressable>
        </View>

        {crit && (
          <TaskEnergy
            critria={critria}
            activoo={1}
            theDemandTask={multiInputValue.at(-1)}
          />
        )}

        <Pressable
          style={styles.actionItem}
          onPress={() => setShowDateMenu(v => !v)}
        >
          <Text>📅</Text>
          <Text style={styles.actionText}>Set due date</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    gap: 12,
  },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  circleIcon: { color: '#888', fontSize: 18 },
  input: { flex: 1, color: '#fff', fontSize: 16, paddingVertical: 4 },
  submit: { fontSize: 20 },
  actionItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { color: '#ccc', fontSize: 13 },
  menu: {
    position: 'absolute',
    bottom: '100%',
    left: 16,
    width: 240,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
  menuText: { color: '#fff', fontSize: 14 },
});