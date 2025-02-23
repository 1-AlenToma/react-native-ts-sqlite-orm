# useQuery

`react-native-ts-sqlite-orm` have hooks that you could use in a components.

The hook is able to tracks changes done globally, so if you change an item in the database `useQuery` will be able to track the changes and render the component.

Here is how simple it is to use it.

```tsx
const Name =()=> {
 const [users, loading] = 
  DbContext.Users.useQuery(DbContext.Users.query.where.column(x=> x.name).startsWith("t"));

return (
    <>
    {
        users.map((x,i)=> <Text key={i}>{x.name}</Text>)
    }
    </>
)
}

```

## Properties useQuery

### tableName
The TableName

### query
Could be one of the folowing `(Query) | (IReturnMethods<T, D>) | (() => Promise<T[]>`

The initiated data.


