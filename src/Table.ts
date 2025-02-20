import { IBaseModule, ITableBuilder } from "./sql.wrapper.types";
import TableBuilder from "./TableStructor";

export default abstract class Table<D extends string> extends IBaseModule<D> {
    constructor(tableName: D, id?: number) {
        super(tableName, id);
    }

    static TableBuilder<T extends object, D extends string>(tableName: D){
        return TableBuilder<T, D>(tableName) as ITableBuilder<T, D>;
    }
}
