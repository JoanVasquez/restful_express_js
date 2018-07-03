# Restful Api Express JS
In this code I will show you how to create an **API** using **Node Js** and **Express Js**. For the **JWT** we will use **JSONWEBTOKEN** module and for the DB **MySQL**. I hope you enjoy it this code. Whether this code helped you, please donate for a coffee. Thanks.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AFSV8TQBVW6LC)

## Instruction
Remember to make **npm i or npm install** in the root of the app to install the **modules**

## Structure

* src
  * app
    * routes
      * user.js
    * validations
      * Jwt.js
      * Response.js
      * Validator.js
  * config
    * database
      * dao
        * UserDao.js
      * queries
        * queries.js
      * config.json
      * dbConnection.js
    * server.js
* db.sql
* dbUserDiagram.mwb -> workbench

## Demonstration

```JSON

/*-----------------------------------------------------------------*/

//localhost:3000/api/user/register
//method: put
//content-type: application/json
//parameters: name, email, password
//result
{
  "success": true,
  "result": {
    "id": 1,
    "name": "test",
    "email": "test02@test.com",
    "password": "$2b$10$otdk88F.pff6kpaP6ngFt.STzA7KBlocK6rZQIKZi3I7I3ER4sA6u"
  }
}

/*-----------------------------------------------------------------*/

//localhost:3000/api/user/login
//method: post
//content-type: application/json
//parameters: email, password
//result
{
  "success": true,
  "result": {
    "id": 1,
    "name": "test",
    "email": "test02@test.com",
    "password": "$2b$10$otdk88F.pff6kpaP6ngFt.STzA7KBlocK6rZQIKZi3I7I3ER4sA6u"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUzMDY0MzA2NywiZXhwIjoxNTMwNzI5NDY3fQ.gYyEwFyHFgX2VwfLppdG0OTZgnBvFcHXF3tYwjpnhIk"
}

/*-----------------------------------------------------------------*/

//localhost:3000/api/user/read
//method: get
//content-type: application/json
//x-access-token: token generated when login
//result
{
  "success": true,
  "result": [
    {
      "id": 1,
      "name": "test",
      "email": "test02@test.com",
      "password": "$2b$10$otdk88F.pff6kpaP6ngFt.STzA7KBlocK6rZQIKZi3I7I3ER4sA6u"
    }
  ]
}

/*-----------------------------------------------------------------*/

//localhost:3000/api/user/update
//method: post
//content-type: application/json
//x-access-token: token generated when login
//parameters: id, name, email, password
//generate
{
  "success": true,
  "result": true
}
//The reason why we don't send the update user back it's because the client already has it in there!

//localhost:3000/api/user/delete : eg. localhost:3000/api/user/1
//method: delete
//x-access-token: token generated when login
//parameters: id
//generate
{
  "success": true,
  "result": true
}
```
