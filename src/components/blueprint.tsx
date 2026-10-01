import { useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { usecontext1 } from '@/context';

function BlueprintRow({
  whichRow,
  onDeleteRow,
}: {
  whichRow: number;
  onDeleteRow: () => void;
}) {
  const ctx = useContext(usecontext1);
  const blueprint: any[][] = ctx[2];
  const setBlueprint = ctx[3];
  const dataForChecker: any[][] = ctx[4];
  const setDataForChecker = ctx[5];

  const row = blueprint[whichRow];
  const numberOfButtons: number = row[7];

  const updateField = (col: number, val: string) => {
    const copy = blueprint.map(r => [...r]);
    copy[whichRow][col] = val;
    setBlueprint(copy);
  };

  const adjustButtons = (sign: 1 | 2) => {
    const x = row[7];
    let newMax = x;
    if (sign === 1 && x < 10) newMax = x + 1;
    if (sign === 2 && x > 0) newMax = x - 1;
    if (newMax === x) return;

    const copy = blueprint.map(r => [...r]);
    copy[whichRow][7] = newMax;
    setBlueprint(copy);

    // keep the checker's max in sync, and clamp its selected value
    const checker = dataForChecker.map(r => [...r]);
    checker[whichRow] = [Math.min(checker[whichRow][0], newMax), newMax];
    setDataForChecker(checker);
  };

  return (
    <View style={styles.rowWrap}>
      <View style={styles.inputsRow}>
        <TextInput
          style={styles.input}
          value={String(row[0])}
          onChangeText={t => updateField(0, t)}
        />
        <TextInput
          style={styles.input}
          value={String(row[1])}
          onChangeText={t => updateField(1, t)}
        />
        <TextInput
          style={styles.input}
          value={String(row[2])}
          onChangeText={t => updateField(2, t)}
        />
      </View>

      <View style={styles.controlsRow}>
        <View style={styles.circlesRow}>
          {Array.from({ length: numberOfButtons }).map((_, i) => (
            <Pressable key={i} style={styles.circle} />
          ))}
        </View>
        <View style={styles.icons}>
          <Text style={styles.icon} onPress={() => adjustButtons(1)}>➕</Text>
          <Text style={styles.icon} onPress={() => adjustButtons(2)}>➖</Text>
          <Text style={styles.icon} onPress={onDeleteRow}>×</Text>
        </View>
      </View>
    </View>
  );
}

export default function Blueprint() {
  const ctx = useContext(usecontext1);
  const blueprint: any[][] = ctx[2];
  const setBlueprint = ctx[3];
  const dataForChecker: any[][] = ctx[4];
  const setDataForChecker = ctx[5];

  const urgency = [
    'important & urgent',
    'urgent but not important',
    'important but not urgent',
    'not important & not urgent',
  ];

  const handleAddBar = () => {
    setBlueprint([...blueprint, ['a', 'a', 'a', 'a', 'a', 'a', 0, 5]]);
    setDataForChecker([...dataForChecker, [0, 5]]);
  };

  const handleDeleteBar = (index: number) => {
    setBlueprint(blueprint.filter((_, i) => i !== index));
    setDataForChecker(dataForChecker.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.urgencyRow}>
        {urgency.map((label, i) => (
          <View key={i} style={styles.urgencyCell}>
            <Text style={styles.urgencyText}>{label}</Text>
            <Pressable style={styles.circle} />
          </View>
        ))}
      </View>

      {blueprint.map((_, index) => (
        <BlueprintRow
          key={index}
          whichRow={index}
          onDeleteRow={() => handleDeleteBar(index)}
        />
      ))}

      <Pressable onPress={handleAddBar} style={styles.addButton}>
        <Text style={styles.addText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '90%', alignSelf: 'center' },
  urgencyRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  urgencyCell: { alignItems: 'center', flex: 1 },
  urgencyText: { fontSize: 10, textAlign: 'center', marginBottom: 6, color: '#888' },
  rowWrap: { marginBottom: 14 },
  inputsRow: { flexDirection: 'row', gap: 6 },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#555',
    color: '#ddd',
    paddingVertical: 4,
  },
  controlsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  circlesRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  circle: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#7b5a8f',
    borderRadius: 14,
    backgroundColor: 'transparent',
  },
  icons: { flexDirection: 'row', gap: 12, marginLeft: 8 },
  icon: { fontSize: 18, color: '#ddd' },
  addButton: { alignSelf: 'flex-start', padding: 8 },
  addText: { fontSize: 24, color: '#ddd' },
});