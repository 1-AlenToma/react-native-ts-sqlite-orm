# querySelector
With `querySelector` you could build your sql using expression.

That mean when you make changes to your objects and so on, You will notice those changes even in your sql queries.

## Example
```ts
const query= dbContext.Parents.query;

// you could load children and join parentId with Id and assign the result to children
query.include<Child>("Childrens").column("id", "parentId").toList("children");
// or if you has already set up hasMany in setup Module then use only
query.load("children")
// note method load also exist in Table class so you could skip this now and load only in the desire objects

// Simple Where
query.where.column(x=> x.id).equalTo(1);

// you could join, left join, crossjoin and innerJoin
query.join<Child, "b">("Children", "b").column(x=> x.a.id).equalTo(x=> x.b.parentId)
.where.column(x=> x.b.name).not.in(["test", "test"]);

// You could Select
query.join<Child, "b" >("Children", "b").column(x=> x.a.id).equalTo(x=> x.b.parentId)
.where.column(x=> x.b.name).not.in(["test", "test"]).select.columns((x, as) => [x.a.id, x.b.name, as(x.a.email, "user email")]);

// you could use sqlite aggrigatos like count, min, max and more
query.join<Child, "b">("Children", "b").column(x=> x.a.id).equalTo(x=> x.b.parentId)
.where.column(x=> x.b.name).not.in(["test", "test"])
.select.count(x=> x.a.id, "idCount").count(x=> "*", "AllRows");

// you could also use having
query.join<Child, "b">("Children", "b").column(x=> x.a.id).equalTo(x=> x.b.parentId)
.where.column(x=> x.b.name).not.in(["test", "test"])
.select.count(x=> x.a.id, "idCount").having.column("idCount").greaterThen(5);

// You could also cast or convert your data to different objects
const items = query.join<Child, "b">("Children", "b").column(x=> x.a.id).equalTo(x=> x.b.parentId)
.where.column(x=> x.b.name).not.in(["test", "test"])
.select.count(x=> x.a.id, "idCount").having.column("idCount").greaterThen(5)
.cast<MyJoinObject>().toList();
// or to convert
const item = query.join<Child, "b">("Children", "b").column(x=> x.a.id).equalTo(x=> x.b.parentId)
.where.column(x=> x.b.name).not.in(["test", "test"])
.select.count(x=> x.a.id, "idCount")
.having.column("idCount").greaterThen(5)
.cast<MyJoinObject>(x=> new MyJoinObject(x)).toList();

// You could also use inner select this will be converted to `select * from Parents where id in (select parentId from Childrens)`
query.where.column(x=> x.id).in(dbContext.querySelector<Child>("Childrens").select.columns(x=> [x.parentId]))

// Loading the data tolist, delete, firstOrDefault...
const items= await query.toList();

// There is way more you could use.

```
