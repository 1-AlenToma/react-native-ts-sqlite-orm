import { Table } from "react-native-sqlite-orm"
export type TableNames = 'DetaliItems' | 'Chapters';

export class DetaliItems extends Table<TableNames> {
    title: string;
    description?: string;
    novel: string;
    children?: Chapters[];
    constructor() {
        super("DetaliItems")
    }

    static tb = this.TableBuilder<DetaliItems, TableNames>("DetaliItems")
        .column("title")
        .column("description").nullable
        .column("novel").encrypt("testEncryptions")
}

export class Chapters extends Table<TableNames> {
    chapterUrl: string;
    detaliItem_Id: number;

    constructor() {
        super("Chapters")
    }

    static tb = this.TableBuilder<Chapters, TableNames>("Chapters")
        .column("chapterUrl").encrypt("testEncryptions")
        .column("detaliItem_Id").number
        .constrain<DetaliItems>("detaliItem_Id", "DetaliItems", "id")
}