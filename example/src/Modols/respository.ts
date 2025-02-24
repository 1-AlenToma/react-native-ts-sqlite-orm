import { Database, DatabaseDrive } from "react-native-ts-sqlite-orm";
import { TableNames, Chapters, DetaliItems, ChaptersChildren } from "./dbModols";
import * as SQLite from 'expo-sqlite';

export default class repository extends Database<TableNames> {
    readonly Chapters = this.DbSet<Chapters>(Chapters);
    readonly ChaptersChildren = this.DbSet<ChaptersChildren>(ChaptersChildren);
    readonly DetaliItems = this.DbSet<DetaliItems>(DetaliItems);

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