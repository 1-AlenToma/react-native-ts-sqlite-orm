# Modules Setup
The first step is to create and configure your modules.

For this example, we will create two `classes` `Parent` and `Child`

```ts
import  { Table, ColumnType, IQueryResultItem } from 'react-native-ts-sqlite-orm'

// We created `TableNames` so that it will be simpler when you are working in typescript
export type TableNames = "Parents" | "Childrens";
export class Parent extends Table<TableNames>{
 name: string;
 email: string;
 // Using IQueryResultItem is optional, you could simple use Child[]
 children: IQueryResultItem<Child,TableNames>[];
 constructor(name:string, email: string ){
   super("Parents");
   this.name = name;
   this.email = email;
   this.children = [];
 }
  
  // This is an abstract methods that must be implemented
  // This method will return the table setup that Database will be using later.
  config(){ 
    return this.TableBuilder<Parent, TableNames>("Parents").
    column("name").
    objectPrototype(Parent.prototype).
    //unique acts as an Id too as the library will chack if there exist an item with the same field value and will update instead.
    column("email").unique.
    // this is so you could load its content by load methods that exist in table
    hasMany<Child>("children", "Childrens", "parentId")
  }
}

```

And then we have `Child`

```ts
export class Child extends Table<TableNames>{
 someField: string;
 parentId?: number;
 parent?: Parent;
 constructor(someField:string, parentId?: number ){
   super("Childrens");
   this.someField = someField;
   this.parentId = parentId;
 }
  
config()  {
  return this.TableBuilder<Child, TableNames>("Childrens").
    column("someField").
    column("parentId").number.nullable.
    hasParent<DetaliItems>("parent", "Parents", "parentId").
    constrain<Parent>("parentId", "Parents", "id").
    onItemCreate(x=> {
           var child= new Child(item.someField, item.parentId);
           child.id= item.id;
           return child;
    });
  }
}
```

With this we are done with our modules.

`TableBuilder` is usefull to setup your table. the methods available is as follow.


## Properties

`hasMany` assign an object property so you could load it later by simple calling .load("children"), see [querySelector](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/querySelector.md) for more info

`hasOne` same as hasMany except it will only load as an object and not array, eg select top 1

`hasParent` same as hasMany except for parent object. see [querySelector](https://github.com/1-AlenToma/react-native-ts-sqlite-orm/blob/main/documentations/querySelector.md) for more info

`json` the column is a json(string), the lib will stringify and parse the column when called. this is so you could save an objects

`boolean` the column is of boolean type.

`blob` the column is of blob type.

`number` the column is of integer type.

`decimal` the column is of decimal type.

`datetime` the column is of datetime type.

`string` the column is of string type.

`nullable` the column is nullable.

`primary` the column is primarykey.

`autoIncrement` the column autoIncrement.

`unique` the column act as an id, this is only apply when you are using the library `save` to insert or update your items.

`encrypt(encryptionKey)` incrypt the data in the column, this is only applied for string and json types.

`objectPrototype()` instead of using `onItemCreate` you could use this instead to convert json item to a `class`. Note that it will skip the contructor call

`onItemCreate(func)` the data gets returned as json from the db, you could use this prop to convert it to a `class`

`column(columnKey)` add column to the table and specify it props there after.

`constrain` Specify a foreign key for the table
