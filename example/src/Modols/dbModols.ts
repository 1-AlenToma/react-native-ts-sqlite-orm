import { ITableBuilder, Table } from "react-native-ts-sqlite-orm"
export type TableNames = 'DetaliItems' | 'Chapters' | "ChapterChildren";

export class DetaliItems extends Table<TableNames> {
    title: string;
    description?: string;
    novel: string;
    children?: Chapters[];
    constructor() {
        super("DetaliItems")
    }

    config() {
        return this.TableBuilder<DetaliItems, TableNames>("DetaliItems")
            .column("title")
            .column("description").nullable
            .column("novel")
            .encrypt("testEncryptions")
            .hasMany<Chapters>("children", "Chapters", "detaliItem_Id")
    };
}

export class Chapters extends Table<TableNames> {
    chapterUrl: string;
    detaliItem_Id?: number;
    parent?: DetaliItems;
    children?: ChaptersChildren[];
    constructor() {
        super("Chapters")
    }

    config() {
        return this.TableBuilder<Chapters, TableNames>("Chapters")
            .column("chapterUrl").encrypt("testEncryptions")
            .column("detaliItem_Id").number.nullable
            .hasMany<ChaptersChildren>("children", "ChapterChildren", "childrenId")
            .hasParent<DetaliItems>("parent", "DetaliItems", "detaliItem_Id")
            .constrain<DetaliItems>("detaliItem_Id", "DetaliItems", "id")
    }
}

export class ChaptersChildren extends Table<TableNames> {
    chapterUrl: string;
    childrenId?: number;
    constructor() {
        super("ChapterChildren")
    }

    config() {
        return this.TableBuilder<ChaptersChildren, TableNames>("ChapterChildren")
            .column("chapterUrl").encrypt("testEncryptions")
            .column("childrenId").number.nullable
            .constrain<Chapters>("childrenId", "Chapters", "id")
    }
}