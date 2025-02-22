# react-native-ts-sqlite-orm
 This is an ORM, build around `sqlite`. It will make operation like `UPDATE`, `SELECT` AND `INSERT` a lot easier to handle
 
 ## Installations

First install the desire sqlite database such as `react-native-sqlite-storage`.
note that the library do not depends on which type of database you are using eg you could also use `expo-sqlite`

```sh
npm install --save react-native-sqlite-storage
```

```sh
 npm react-native-ts-sqlite-orm
```
Installation for `react-native-sqlite-storage` read [react-native-sqlite-storage](https://www.npmjs.com/package/react-native-sqlite-storage)

## Documentations
* [Modules Setup](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/SetupModules.md)
* [DbContext](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/dbContexts.md)
* [Select and save operations](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/Select_and_Save.md)
* [Watch the db operations](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/Watcher.md)
* [BulkSave](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/BulkSave.md)
* [Encryptions](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/Encryptions.md)
* [useQuery](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/useQuery.md)
* [querySelector](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/querySelector.md)


### IDatabase(available methods )
```ts
export interface IDatabase<D extends string> {
 /**
   * This is a hook you could use in a component
   */
  useQuery: <T extends IId<D>>(
    tableName: D,
    query: | Query | IReturnMethods<T, D>
      | (() => Promise<T[]>),
    onDbItemsChanged?: (items: T[]) => T[]
  ) => readonly [
    IQueryResultItem<T, D>[],
    boolean,
    () => Promise<void>,
    IDatabase<D>
  ]

  /**
   * Freeze all watchers, this is usefull when for example doing many changes to the db
   * and you dont want the watchers to be triggerd many times
   */
  disableWatchers: () => IDatabase<D>;
  /**
   * enabling Watchers will call all the frozen watchers that has not been called when it was frozen
   */
  enableWatchers: () => Promise<void>;

  /**
   * Freeze all hooks, this is usefull when for example doing many changes to the db
   * and you dont want the hooks to be triggerd(rerender components) many times
   */
  disableHooks: () => IDatabase<D>;

  /**
   * enabling Hooks will call all the frozen hooks that has not been called when it was frozen
   */
  enableHooks: () => Promise<void>;

  /**
   * BulkSave object
   * This will only watchers.onBulkSave
   */
  bulkSave: <T extends IId<D>>(
    tabelName: D
  ) => Promise<BulkSave<T, D>>;

  isClosed?: boolean;
  /**
   * Its importend that,createDbContext return new database after this is triggered
   */
  tryToClose: () => Promise<boolean>;
  /**
   * Its importend that,createDbContext return new database after this is triggered
   */
  close: () => Promise<void>;
  /**
   * begin transaction
   */
  beginTransaction: () => Promise<void>;
  /**
   * comit the transaction
   */
  commitTransaction: () => Promise<void>;
  /**
   * rollback the transaction
   */
  rollbackTransaction: () => Promise<void>;
  /**
    Auto close the db after every ms.
    The db will be able to refresh only if there is no db operation is ongoing.
    This is useful, so that it will use less memory as SQlite tends to store transaction in memories which causes the increase in memory over time.
    its best to use ms:3600000
    the db has to be ideal for ms to be able to close it.
    */
  startRefresher: (ms: number) => void;
  /**
   * return column name for the specific table
   */
  allowedKeys: (
    tableName: D
  ) => Promise<string[]>;
  /**
   * convert json to IQueryResultItem object, this will add method as saveChanges, update and delete methods to an object
   */
  asQueryable: <T extends IId<D>>(
    item: IId<D>,
    tableName?: D
  ) => Promise<IQueryResultItem<T, D>>;
  watch: <T extends IId<D>>(
    tableName: D
  ) => IWatcher<T, D>;

  /**
   * More advanced queryBuilder
   * It include join and aggregators and better validations
   */
  querySelector: <T extends IId<D>>(
    tabelName: D
  ) => IQuerySelector<T, D>;
  /**
   * execute sql eg
   * query: select * from users where name = ?
   * args: ["test"]
   */
  find: (
    query: string,
    args?: any[],
    tableName?: D
  ) => Promise<IId<D>[]>;
  /**
   * trigger save, update will depend on id and unique columns
   */
  save: <T extends IId<D>>(
    item: T | T[],
    insertOnly?: Boolean,
    tableName?: D,
    saveAndForget?: boolean
  ) => Promise<T[]>;
  where: <T extends IId<D>>(
    tableName: D,
    query?: any | T
  ) => Promise<T[]>;
  /**
   * delete object based on Id
   */
  delete: (
    item: IId<D> | IId<D>[],
    tableName?: D
  ) => Promise<void>;
  /**
   * execute sql without returning anyting
   */
  execute: (
    query: string,
    args?: any[]
  ) => Promise<boolean>;
  /**
   * Drop all tables
   */
  dropTables: () => Promise<void>;
  /**
   * Setup your table, this will only create a table if it dose not exist
   */
  setUpDataBase: (
    forceCheck?: boolean
  ) => Promise<void>;
  /**
   * find out if there some changes between object and db table
   */
  tableHasChanges: <T extends IId<D>>(
    item: ITableBuilder<T, D>
  ) => Promise<boolean>;
  /**
   * execute an array of sql
   */
  executeRawSql: (
    queries: Query[]
  ) => Promise<void>;

  /**
   * migrate new added or removed columns
   *  constrains is not supported to add
   */
  migrateNewChanges: () => Promise<void>;

}

```

Please report any issues that you find so we could make this lib even better.

