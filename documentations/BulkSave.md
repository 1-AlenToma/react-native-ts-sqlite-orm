# BulkSave
When saving many data, it is best to skip some operation that `save` operation do.

That is why there is a simple way `react-native-ts-sqlite-orm` present (`BulkSave`)

Note: `BulkSave` will only trigger `Watchers.onBulkSave`
## example

```ts
const dbContext = new DbContext();
const itemsToAdd =[...]
const itemsToUpdate = [....]
const itemsToRemove = [...]
const bulkSave = await dbContext.Parents.bulkSave();
itemsToAdd.forEach(x=> bulkSave.insert(x));
itemsToUpdate.forEach(x=> bulkSave.update(x));
itemsToRemove.forEach(x=> bulkSave.delete(x));
// execute will send all the queries to the database
await bulkSave.execute();

```
