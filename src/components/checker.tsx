import { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usecontext1 } from '@/context';

export default function Checker({ theNew2 }: { theNew2: (v: boolean) => void }) {
  const ctx = useContext(usecontext1);
  const multiInputValue: any[][] = ctx[0];
  const setMultiInputValue = ctx[1];
  const blueprint: any[][] = ctx[2];
  const dataForChecker: any[][] = ctx[4];
  const setDataForChecker = ctx[5];
  const setSearchState = ctx[7];

  const selectValue = (row: number, value: number) => {
    const copy = dataForChecker.map(r => [...r]);
    copy[row][0] = value;
    setDataForChecker(copy);
  };

  const computeGaps = () => {
    const updated = multiInputValue.map(task => {
      let generalGap = 0;
      const taskBlueprint: any[][] = task[2];
      for (let k = 0; k < taskBlueprint.length; k++) {
        generalGap += taskBlueprint[k].at(-2) - (dataForChecker[k]?.[0] ?? 0);
      }
      const copy = [...task];
      copy[3] = generalGap;
      return copy;
    });
    setMultiInputValue(updated);
  };

  const onSearch = () => {
    theNew2(false);
    computeGaps();
    setSearchState(true);
  };

  return (
    <View style={styles.card}>
      {blueprint.map((row, i) => {
        const max: number = dataForChecker[i]?.at(-1) ?? 0;
        const selected: number = dataForChecker[i]?.[0] ?? 0;
        return (
          <View key={i} style={styles.bar}>
            <View style={styles.labels}>
              <Text style={styles.label}>{row[3]}</Text>
              <Text style={styles.label}>{row[4]}</Text>
              <Text style={styles.label}>{row[5]}</Text>
            </View>
            <View style={styles.circles}>
              {Array.from({ length: max }).map((_, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => selectValue(i, idx + 1)}
                  style={[
                    styles.circle,
                    selected === idx + 1 && styles.circleSelected,
                  ]}
                />
              ))}
            </View>
          </View>
        );
      })}

      <Pressable onPress={onSearch} style={styles.searchButton}>
        <Text style={styles.searchText}>🔎</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    top: '25%',
    backgroundColor: '#190624',
    padding: 16,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  bar: { marginBottom: 14 },
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
  searchButton: { alignSelf: 'center', padding: 8 },
  searchText: { fontSize: 22 },
});