import { useContext, useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usecontext1 } from '@/context';
import Button from '@/components/button';

export default function Home() {
  const router = useRouter();
  const ctx = useContext(usecontext1);
  const multiInputValue: any[][] = ctx[0];
  const searchState: boolean = ctx[6];

  // keyed by task id (not list position), so sorting doesn't shuffle them
  const [starred, setStarred] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const [crit, critria] = useState(true);
  const [state1, theNew] = useState(false);
  const [state2, theNew2] = useState(false);

  // each task: [id, text, blueprintCopy, gap]
  const ordered = searchState
    ? [...multiInputValue].sort((a, b) => a[3] - b[3])
    : multiInputValue;

  const items = ordered
    .filter(task => task[1] !== 'a')
    .map(task => ({ id: task[0] as string, text: task[1] as string }));

  const toggleStar = (id: string) =>
    setStarred(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleComplete = (id: string) =>
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const isDone = !!completed[item.id];
          const isStarred = !!starred[item.id];
          return (
            <View style={styles.item}>
              <Pressable
                onPress={() => toggleComplete(item.id)}
                style={[
                  styles.circle,
                  isDone && { borderColor: '#8ab4f8', backgroundColor: '#8ab4f8' },
                ]}
              />

              <Pressable
                style={styles.textWrap}
                onPress={() =>
                  router.push({
                    pathname: '/TaskDetailScreen/[id]',
                    params: { id: item.text },
                  } as any)
                }
              >
                <Text
                  style={[
                    styles.text,
                    isDone && { textDecorationLine: 'line-through', color: '#8e8e93' },
                  ]}
                >
                  {item.text}
                </Text>
              </Pressable>

              <Pressable onPress={() => toggleStar(item.id)} hitSlop={8}>
                <Text style={[styles.star, isStarred && { color: '#8ab4f8' }]}>
                  {isStarred ? '★' : '☆'}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />

      <Button
        critria={critria}
        theNew={theNew}
        state1={state1}
        theNew2={theNew2}
        state2={state2}
        crit={crit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16 },
  list: {
    flexGrow: 0,
    backgroundColor: '#252525',
    borderRadius: 4,
  },
  separator: { height: 1, backgroundColor: '#333333' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#8e8e93',
  },
  textWrap: { flex: 1 },
  text: { fontSize: 16, color: '#e3e3e3', letterSpacing: 0.2 },
  star: { fontSize: 22, color: '#8e8e93' },
});