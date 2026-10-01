import { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usecontext1 } from '@/context';

const urgency = [
  'important & urgent',
  'urgent but not important',
  'important but not urgent',
  'not important & not urgent',
];

function EnergyRow({ taskId, rowIndex }: { taskId: string; rowIndex: number }) {
  const ctx = useContext(usecontext1);
  const multiInputValue: any[][] = ctx[0];
  const setMultiInputValue = ctx[1];

  const task = multiInputValue.find(t => t[0] === taskId);
  const row = task?.[2]?.[rowIndex];
  if (!row) return null;

  const numberOfButtons: number = row[7];
  const selected: number = row[6];

  const select = (value: number) => {
    setMultiInputValue((prev: any[][]) =>
      prev.map(t => {
        if (t[0] !== taskId) return t;
        const blueprintCopy = t[2].map((r: any[]) => [...r]);
        blueprintCopy[rowIndex][6] = value;
        const copy = [...t];
        copy[2] = blueprintCopy;
        return copy;
      })
    );
  };

  return (
    <View style={styles.row}>
      <View style={styles.labels}>
        <Text style={styles.label}>{row[0]}</Text>
        <Text style={styles.label}>{row[1]}</Text>
        <Text style={styles.label}>{row[2]}</Text>
      </View>
      <View style={styles.circles}>
        {Array.from({ length: numberOfButtons }).map((_, i) => (
          <Pressable
            key={i}
            onPress={() => select(i + 1)}
            style={[styles.circle, selected === i + 1 && styles.circleSelected]}
          />
        ))}
      </View>
    </View>
  );
}

export default function TaskEnergy({
  activoo,
  theDemandTask,
}: {
  activoo?: number;
  critria?: any;
  theDemandTask?: any[];
}) {
  const [urgencyIndex, setUrgencyIndex] = useState<number | null>(null);

  if (!theDemandTask) return null;

  return (
    <View>
      {/* Urgency selection */}
      <View style={styles.urgencyRow}>
        {urgency.map((label, i) => (
          <View key={i} style={styles.urgencyCell}>
            <Text style={styles.urgencyText}>{label}</Text>
            <Pressable
              onPress={() => setUrgencyIndex(i)}
              style={[styles.circle, urgencyIndex === i && styles.circleSelected]}
            />
          </View>
        ))}
      </View>

      {/* One row per blueprint entry */}
      {theDemandTask[2]?.map((_: any, index: number) => (
        <EnergyRow key={index} taskId={theDemandTask[0]} rowIndex={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  urgencyRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  urgencyCell: { alignItems: 'center', flex: 1 },
  urgencyText: { fontSize: 10, color: '#888', textAlign: 'center', marginBottom: 6 },
  row: { marginBottom: 14 },
  labels: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: '#ddd', fontSize: 12, flex: 1, textAlign: 'center' },
  circles: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 6 },
  circle: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: '#7b5a8f',
    borderRadius: 14,
    backgroundColor: 'transparent',
  },
  circleSelected: { backgroundColor: '#7b5a8f' },
});