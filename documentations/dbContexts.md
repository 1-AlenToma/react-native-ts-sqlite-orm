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
                    console.info("Sql Operation", operation);
                    switch (operation) {
                        case "Bulk":
                            await db.execAsync(sql);
                            break;
                        case "READ":
                            return await db.getAllAsync(sql, args);
                        case "WRITE":
                            let item = await db.runAsync(sql, args);
                            return item?.lastInsertRowId;
                    }
                    return undefined;
                },
            }
            return driver;
        });
    }
}

```

