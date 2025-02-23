import { Text, View, StyleSheet } from 'react-native';
import * as React from "react";
import repository from './Modols/respository';
import { DetaliItems } from './Modols/dbModols';
let result = 0;
const dbContext = new repository();

export default function App() {
  const [data, setData] = React.useState<DetaliItems[]>()

  React.useEffect(() => {
    (async () => {
      try {
       // await dbContext.dropTables();
        await dbContext.setUpDataBase();
      //  await dbContext.migrateNewChanges();
        setData(await dbContext.DetaliItems.getAll());
      } catch (e) {
        console.error(e)
      }
    })();
  }, [])

  React.useEffect(() => {
    (async () => {
      if (data && data.length > 0) {
        for (let item of data) {
          await item.load("children");
          for (let c of item.children)
            await c.load("parent")
        }
        // console.warn(JSON.stringify(data, undefined, 4))

      }
      if (data) {
        if (result == 0)
          dbContext.DetaliItems.query.where.column(x => x.novel).not.contains("test").delete();
        result++;
      }
    })();
  }, [data])


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
