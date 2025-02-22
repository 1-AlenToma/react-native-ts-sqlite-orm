# Setup dbContexts
It is very easy to create the `repository`, it only taks few line. See below


```ts
import { Database, DatabaseDrive } from "react-native-ts-sqlite-orm";
import {
  openDatabase
} from "react-native-sqlite-storage";
export type TableNames = "Parents" | "Childrens";
const tables = [Parent.tb, Child.tb]
export default class DbContext extends Database<TableNames> {
    constructor() {
        super(tables, async () => {
            let db = await openDatabase("test.db");
            return db;
        });
    }
}
```
For `expo.sqlite`  setup

```ts
import { Database, DatabaseDrive } from "react-native-ts-sqlite-orm";
import * as SQLite from 'expo-sqlite';
export type TableNames = "Parents" | "Childrens";
const tables = [Parent.tb, Child.tb]
export default class DbContext extends Database<TableNames> {
    constructor() {
        super(tables, async () => {
            let db = await SQLite.openDatabaseAsync("test.db");
            let driver: DatabaseDrive = {
                close: async () => await db.closeAsync(),
                executeSql: async (operation, sql, args) => {
                    let result: any[] = [];
                    console.info("Sql Operation", operation);
                    if (operation == "WRITE") {
                        await db.runAsync(sql, args);
                    } else {
                        result = await db.getAllAsync(sql, args);
                    }
                    return result;
                },
            }
            return driver;
        });
    }
}

```

