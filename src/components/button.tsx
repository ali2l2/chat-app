import { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usecontext1 } from '@/context';
import MainInputTaskbox from '@/components/main-input-taskbox';
import Checker from '@/components/checker';

// simple unique id, since crypto.randomUUID doesn't exist in React Native
const makeId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 10);

function Fab({
  label,
  bottom,
  onPress,
}: {
  label: string;
  bottom: number;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.fab, { bottom }]} onPress={onPress}>
      <Text style={styles.fabText}>{label}</Text>
    </Pressable>
  );
}

export default function Button({
  theNew,
  critria,
  state1,
  crit,
  state2,
  theNew2,
}: any) {
  const ctx = useContext(usecontext1);
  const setMultiInputValue = ctx[1];
  const blueprint: any[][] = ctx[2];
  const setSearchState = ctx[7];

  const addTask = () => {
    setSearchState(false);
    const blueprintCopy = blueprint.map(r => [...r]);
    setMultiInputValue((prev: any[]) => [
      ...prev,
      [makeId(), 'a', blueprintCopy, 0],
    ]);
    theNew(true);
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {!state2 && <Fab label="+" bottom={24} onPress={addTask} />}

      {state1 && (
        <MainInputTaskbox
          theNew={theNew}
          critria={critria}
          state1={state1}
          crit={crit}
        />
      )}

      {!state1 && <Fab label="🔎" bottom={90} onPress={() => theNew2(true)} />}

      {state2 && <Checker theNew2={theNew2} />}
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    zIndex: 1000,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7b8ce8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  fabText: { fontSize: 28 },
});