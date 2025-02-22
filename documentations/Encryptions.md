# Encryptions
You could encrypt data that are send to the db by specifying those to `TableBuilder`

See below

```ts
import  { Table } from 'react-native-sqlite-orm'
class User extends Table<TableNames>{
    name: string;
    password: string;
    constructor(){
      super("Users")
      this.name = "test";
      this.password= "secret";
    }
    
  static tb = this.TableBuilder<User, TableNames>("Users").
    column("name").
    column("password").encrypt("myscret key").
    objectPrototype(User.prototype)
  }
}

```
`Save` method will make sure to `encrypt` the above column before inserting and updating the database.

`find` method will make sure to `decrypt` the data before retuning the data to the user.

## Searching
To be able to search those column, you have tow diffrent ways. 

1- Using `querySelector` to search as it will make sure to encrypt your search when it is send to the database

2- Manually encrypt your search and compare it.

### example 1
```ts
  // 123 will be encrypted so it could be compare to the value in the database
  var item = await dbContext.querySelector<User>("Users").column(x=> x.password).EqualTo("123").toList();

```

### example 2
```ts
  import  { encrypt, decrypt } from 'react-native-sqlite-orm'
  // manually encrypt the value and send it to the database
  var items = await dbContext.find("select * from Users where password = ?", [encrypt("123", "myscret key")], "Users");
```
