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