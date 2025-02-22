import { Database, DatabaseDrive } from "react-native-sqlite-orm";
import { TableNames, Chapters, DetaliItems } from "./dbModols";
import * as SQLite from 'expo-sqlite';

export default class repository extends Database<TableNames> {
    constructor() {
        super([DetaliItems.tb, Chapters.tb], async () => {
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