import { Text, View, StyleSheet } from 'react-native';
import * as React from "react";
import repository from './Modols/respository';
import { DetaliItems, Chapters } from './Modols/dbModols';

const result = 0;

const dbContext = new repository();
export default function App() {

  React.useEffect(() => {
    (async () => {
      try {
        // await dbContext.dropTables();
        await dbContext.setUpDataBase();
        await dbContext.migrateNewChanges();
        let emptyItem = new DetaliItems();
        emptyItem.novel = "test";
        emptyItem.title = "tll";
        let item = await dbContext.querySelector<DetaliItems>("DetaliItems")
        .include<Chapters>("Chapters").column("id", "detaliItem_Id").toList("children")
          .where.column(x => x.id).equalAndGreaterThen(0).findOrSave(emptyItem)

        /*  for (let i = 0; i < 2; i++) {
            let chap = new Chapters();
            chap.chapterUrl = "http:" + i;
            chap.detaliItem_Id = item.id;
            dbContext.save(chap);
          }
    */
        console.log(item)
      } catch (e) {
        console.error(e)
      }
    })();
  }, [])


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
