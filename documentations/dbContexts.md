# Setup dbContexts
It is very easy to create the `repository`, it only taks few line. See below
the library do not depends on any sqlite library, you could use api for all that is worth.

here is an example For `expo.sqlite` setup

```ts
import { Database, DatabaseDrive } from "react-native-ts-sqlite-orm";
import * as SQLite from 'expo-sqlite';
export type TableNames = "Parents" | "Childrens";

export default class DbContext extends Database<TableNames> {
    readonly Parents = this.DbSet<Parent>(Parent);
    readonly Childrens = this.DbSet<Child>(Child);
    constructor() {
        super(async () => {
            let db = await SQLite.openDatabaseAsync("test.db");
            let driver: DatabaseDrive = {
                close: async () => await db.closeAsync(),
                executeSql: async (sql, args, operation) => {
                    let result: any[] = [];
                    console.info("Sql Operation", operation);
                    if (operation == "WRITE") { // Write, no return result is needed in this case
                        await db.runAsync(sql, args);
                    } else { // select or any other query and return its result
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

