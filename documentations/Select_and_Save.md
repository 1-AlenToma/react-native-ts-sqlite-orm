# Using the dbContexts

The first thing you will have to do is make sure that you setup your tables.
for that you run `setUpDataBase` at the app startup

```ts
const dbContext = new DbContext();
const App =()=> {
  useEffct(()=> {
    (async()=>{
      await dbContext.setUpDataBase();
    })();
   },[])
}

```

Using the dbcontext to create/update and select data could not be more simpler.

```ts
// depending on item `id` and `unique` column `save` will update or insert the item
var item = await dbContext.Parents.save(new Parent("testName", "test@gmail.com"));
var child = await dbContext.Childrens.save(new Child("testName",item.id));
```

For selecting the data you have more then one method to do that.
You can use the normal way for which `sqlite`
`find` will return a simple json array.
```ts
  var items=  (await dbContext.find("Select * from Parents where (name in (?,?)) OR (email like %?%)", ["name", "testName","test@" ])) as Parent[];
```

There is also another way for which you can use `querySelector` builder

See [querySelector](https://github.com/AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/querySelector.md) for more info
```ts
   var item = await dbContext.Parents.query.where
   .column(x=> x.name)
   .equalTo("testName")
   .firstOrDefault();
   item.name= "test"
   await item.saveChanges();
```

You could also use `querySelector` builder to load children.

```ts
      var item = await dbContext.Parents.query.where.load("children")
     .start.column(x=> x.name).in(["name", "testName"]).end
     .or
     .start.column(x=> x.email).contains("test@").end
     .toList();
      // or you could skip load in the query and only call it on desires items
     item[0].load("children");
```

You could also use `querySelector` to delete items
```ts
      await dbContext.Parents.query.where
     .start.column(x=> x.name).in(["name", "testName"]).end
     .or
     .start.column(x=> x.email).Contains("test@").end.delete();
```

