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
var item = await dbContext.save(new Parent("testName", "test@gmail.com"));
var child = await dbContext.save(new Child("testName",item.id));
```

For selecting the data you have more then one method to do that.
You can use the normal way for which `sqlite`
`find` will return a simple json array.
```ts
  var items=  (await dbContext.find("Select * from Parents where (name in (?,?)) OR (email like %?%)", ["name", "testName","test@" ])) as Parent[];
```

There is also another way for which you can use `querySelector` builder

See [querySelector](https://github.com/AlenToma/react-native-sqlite-orm/blob/main/documentations/querySelector.md) for more info
```ts
   var item = await dbContext.querySelector<Parent>("Parents").where
   .column(x=> x.name)
   .equalTo("testName")
   .firstOrDefault();
   item.name= "test"
   await item.saveChanges();
```

You could also use `querySelector` builder to load children.

```ts
      var item = await dbContext.querySelector<Parent>("Parents").LoadChildren<Child>("Childrens", "parentId", "id", "children", true).where
     .start.column(x=> x.name).in(["name", "testName"]).end
     .or
     .start.column(x=> x.email).contains("test@").end
     .toList();
```

You could also use `querySelector` to delete items
```ts
      await dbContext.query<Parent>("Parents")
     .start.column(x=> x.name).in(["name", "testName"]).end
     .or
     .start.column(x=> x.email).Contains("test@").end.delete();
```

