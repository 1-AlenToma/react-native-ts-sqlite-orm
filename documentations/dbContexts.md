# Setup dbContexts
It is very easy to create the `repository`, it only taks few line. See below


```ts
import createDbContext, { IDatabase, IQueryResultItem, Table } from 'react-native-sqlite-orm'
import {
  openDatabase
} from "react-native-sqlite-storage";
const tables = [Parent.GetTableStructor(), Child.GetTableStructor()]
export default class DbContext {
  databaseName: string = "mydatabase.db";
  database: IDatabase<TableNames>;
  constructor() {
    this.database = createDbContext<TableNames>(tables, async () => await openDatabase({ name: this.databaseName, location: "default" }));
  }
}
```
For more advanced setup you could use  this instead

```ts
export default class DbContext {
  databaseName: string = "mydatabase.db";
  database: IDatabase<TableNames>;
  constructor() {
 this.database = createDbContext<TableNames>(tables, async () => {
      return await openDatabase({ name: this.databaseName, location: "default" })
    }, async (db) => {
      try {
        for (let sql of `
      PRAGMA cache_size=8192;
      PRAGMA encoding="UTF-8";
      PRAGMA synchronous=NORMAL;
      PRAGMA temp_store=FILE;
      `.split(";").filter(x=> x.length>2).map(x => {
          return { sql: x, args: [] }
        })) {
          await db.executeRawSql([sql], false);
        }
      } catch (e) {
        console.error(e);
      } finally {
        db.startRefresher(3600000);
      }
    }, !__DEV__);
  }
}

```

