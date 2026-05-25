import { IId, IQueryResultItem, ITableBuilder, NonFunctionPropertyNames, ObjectPropertyNamesNames } from "./sql.wrapper.types";
import TableBuilder from "./TableStructor";

export default abstract class Table<D extends string> extends IId<D> implements IQueryResultItem<any, D> {
    constructor(tableName: D, id?: number) {
        super(tableName, id);
    }

    saveChanges: () => Promise<IQueryResultItem<this, D>>;
    delete: () => Promise<void>;
    update: (...keys: NonFunctionPropertyNames<this>[]) => Promise<void>;
    load: (...props: ObjectPropertyNamesNames<this>[]) => Promise<void>;

    abstract config(): ITableBuilder<any, D>;

    protected TableBuilder<T extends object>(tableName?: D) {
        return TableBuilder<any, D>(tableName ?? this.tableName) as ITableBuilder<T, D>;
    }
}
