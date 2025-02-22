import { Text, View, StyleSheet } from 'react-native';
import * as React from "react";
import repository from './Modols/respository';
import { DetaliItems, Chapters } from './Modols/dbModols';

const result = 0;

const dbContext = new repository();
export default function App() {
  const [data, loading] = dbContext.useQuery<DetaliItems>("DetaliItems",
    dbContext.querySelector<DetaliItems>("DetaliItems")
      .include<Chapters>("Chapters").column("id", "detaliItem_Id").toList("children")
      .where.column(x => x.id).equalAndGreaterThen(0)
  )

  React.useEffect(() => {
    (async () => {
      try {
        // await dbContext.dropTables();
        await dbContext.setUpDataBase();
        await dbContext.migrateNewChanges();
      } catch (e) {
        console.error(e)
      }
    })();
  }, [])

  React.useEffect(()=>{
    if (!loading)
        console.warn(data)
  },[loading])


  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
