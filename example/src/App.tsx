import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import * as React from "react";
import repository from './Modols/respository';
import { Chapters, DetaliItems } from './Modols/dbModols';
import { IWatcher } from 'react-native-ts-sqlite-orm';
let result = 0;
const dbContext = new repository();

const addTestData = async () => {
  const item = new DetaliItems();
  item.novel = "test Novel";
  item.description = "test Data";
  item.title = "Super Gene";
  await dbContext.DetaliItems.save(item);
  console.log("test Item Added, ItemId", item.id);
  for (let i = 0; i <= 5; i++) {
    let chapter = new Chapters();
    chapter.detaliItem_Id = item.id;
    chapter.chapterUrl = "google.com";
    await dbContext.Chapters.save(chapter);
  }
}

export default function App() {
  const [data, setData] = React.useState<DetaliItems[]>()

  React.useEffect(() => {
    let watch: IWatcher<any, any> = {} as any;
    (async () => {
      try {
        await dbContext.dropTables();
        //  await dbContext.setUpDataBase();
        // await dbContext.migrateNewChanges();
        await addTestData();
        watch = dbContext.DetaliItems.watch();
        let dWatch = dbContext.Chapters.watch()
        watch.onDelete = dWatch.onDelete = async () => {
          console.warn("watch triggerd")
          setData(await dbContext.DetaliItems.query.load("children").toList());
        }
        await dbContext.DetaliItems.getAll()
        setData(await dbContext.DetaliItems.query.load("children").toList());
      } catch (e) {
        console.error(e)
      }

    })();

    return () => watch.removeWatch?.();
  }, [])

  React.useEffect(() => {
    (async () => {
      return;
      if (data && data.length > 0) {
        for (let item of data) {
          await item.load("children");
          for (let c of item.children)
            await c.load("parent")
        }
        // console.warn(JSON.stringify(data, undefined, 4))

      }

    })();
  }, [data])


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ height: "80%", ...styles.container }}>
        {
          data?.map((x, i) => (
            <View key={i} style={{ justifyContent: "space-between", flexDirection: "row" }}>
              <Text >Result:{i} {x.novel}</Text>
              <View style={{ height: 50 }}>
                <Button title='delete' onPress={() => {
                  x.delete();
                }}></Button>
              </View>
              <View style={{ paddingLeft: 10 }}>
                <Text >Chidren:</Text>
                {
                  x.children?.map((c, ci) => (
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                      <Text >{ci} {c.chapterUrl}</Text>
                      <Button title='delete' onPress={() => {
                        c.delete();
                      }}></Button>
                    </View>
                  ))
                }
              </View>
            </View>
          ))
        }

      </ScrollView>
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
