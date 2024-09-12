# Poixel Test

## Setup and Running Instruction

1. Clone this repository: https://github.com/rexali/poixel-test.git

   ```shell
    git clone https://github.com/rexali/poixel-test.git
   ``` 

2. Run in your command terminal: run
    
   ```shell
    cd poixel-test
   ```

3. Download and install nodejs into your machine: https://nodejs.org/en 
   
   and then open your command line and run:

   ```shell
   npm install
   ```

4. Download and install MYSQL database installer or workbench:
   
    * installer:  https://dev.mysql.com/downloads/installer 
    
    OR
    
    * workbench:  https://dev.mysql.com/downloads/workbench
   
   1. create a database and name it "poixeldb",
      
      Query Tab: run

      ```sql
      CREATE DATABASE poixeldb;
      ```
   
   2. create a table in the database and name it 'users' table with columns as follow: 
      * name, 
      * email (set the unique to true)
      * password 
      * role (set the default value to "user")
      * businessType
      
      Query Tab: run

      ```sql
      CREATE TABLE users(
      userId int primary key auto_increment,
      name varchar(200),
      email varchar(200),
      password varchar(255),
      role varchar(10),
      businessType varchar(100)
      );  
      ````

5. Add new ".env" file to the project root folder and then add the following configuration:
  
    1. DB_HOST=localhost
    2. DB_PORT=your database port
    3. DB_USER=your database username
    4. DB_PASS=your database password
    5. DB_NAME=poixeldb
    6. SECRET_KEY=asdfghjkil
  
   e.g.,

   ![Dot Env File](https://github.com/rexali/poixel-test/blob/master/env.png "DOT ENV FILE EXAMPLE")


6. Then open command line and run: npm start

## CURL for Client-Server Requests and Responses

7. Curl Commands:

    1. To rgister a client as the first user, 
       
       Terminal: run
       
       ```shell
         curl -d '{ "name":"Aliyu", "email":"talk2bb@yahoo.com", "businessType":"Farming", "password":"ab1234567&^$"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/register
       ```

    2. Register another client as the second user and so on , 
       
       Terminal: run
       
       ```shell
          curl -d '{ "name":"Rexali", "email":"baba@yahoo.com", "businessType":"Fishing", "password":"768?1ghtp"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/register
       ```

    3. Log in a client (e.g., the first client) to get client authentication token with user role; 
        
        Terminal: run
        
        ```shell
        curl -d '{"email":"talk2bb@yahoo.com", "password":"1234567"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/login
        ```

    4. Then verify the client authentication token to prevent CSRF attack & before giving access to the user dashboard;
        
        Terminal: run
        
        ```shell
        curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM4LCJlbWFpbCI6InRhbGsyYmJAeWFob28uY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE3MjYxNzYxOTN9.i2wjNxnvNxu7YEC9wNZIbDhZbUAqZ5GAC6oMsR84CQQ" -X POST localhost:3001/auth/verify
        ```

    5. To register an admin user before giving access to the admin to manage clients

       Terminal: run
       
       ```shell
        curl -d '{ "name":"Bello", "email":"talk2baba@gmail.com", "businessType":"Farming", "password":"1234567", "role":"admin"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/register
       ```

    6. Log in an admin to get admin authentication token with admin role; 
        
        Terminal: run
        
        ```shell
        curl -d '{ "email":"talk2baba@gmail.com", "password":"1234567"}' -H "Content-Type:application/json" -X POST localhost:3001/auth/login
        ```

    7. Then verify the admin authentication token to prevent CSRF attack & before giving access to the admin dashboard to manage clients;
        
        Terminal: run
        
        ```shell
         curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM5LCJlbWFpbCI6InRhbGsyYmFiYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MjYxNzc3MjN9.Ld0wY-fnmwFrjliW42M0hpYA8wRlRwPBKCSD4nRxKvo" -X POST localhost:3001/auth/verify
        ```

    8. Get a list of all registered clients. Before you run this command, copy and use the admin authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer":
      
        Terminal: run
        
        ```shell
        curl -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM5LCJlbWFpbCI6InRhbGsyYmFiYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MjYxNzc3MjN9.Ld0wY-fnmwFrjliW42M0hpYA8wRlRwPBKCSD4nRxKvo" -X GET localhost:3001/admins/getclients
        ````

    9. Update or modify a client data or details. Before you run this command, copy and use the admin authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer"
      
        Terminal: run
        
        ```shell
        curl -d '{ "userId":1, "role":"user", "name":"Aliyu", "email":"talk2bb@yahoo.com", "businessType":"School"}' -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM5LCJlbWFpbCI6InRhbGsyYmFiYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MjYxNzc3MjN9.Ld0wY-fnmwFrjliW42M0hpYA8wRlRwPBKCSD4nRxKvo" -H "Content-Type:application/json" -X PATCH localhost:3001/admins/updateclient
        ```

    10. Delete or remove a client data or details. Before you run this command, copy and use the admin authentication token in the step 6 or step 7 and add it to this request header as shown below after "Bearer"
       
        Terminal: run
        
        ```shell
         curl -d '{ "userId":2, "role":"user"}' -H "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM5LCJlbWFpbCI6InRhbGsyYmFiYUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MjYxNzc3MjN9.Ld0wY-fnmwFrjliW42M0hpYA8wRlRwPBKCSD4nRxKvo" -H "Content-Type:application/json" -X DELETE localhost:3001/admins/deleteclient
        ```


## Postman for Client-Server Requests and Responses
    
8. Use Postman and use the headers and body data from the above curls commands below:
   
   1. POST http://localhost:3001/auth/register 

      - Header:

        ```h
          { 
            "Content-Type: application/json"
          }
        ```

      - Body:

        ```json 
        {
            "name": "string",  
            "email": "string",
            "password": "string",
            "role":"string"  /// e.g., "user" or "admin"
        }
        ```
   
   2. POST http://localhost:3001/auth/login

      - Header:
   
        ```h
        {   
            "Content-Type: application/json"
        }
        ```

      - Body:

      ```json 
        {
            "email": "string",  //which is an email,
            "password": "string" // which is a password
        }
      ```

   3. GET http://localhost:3001/admins/getclients

      - Headers:

          ```h
            {

              "Authorization: Bearer <TOKEN>",    
              "Content-Type: application/json"

            }
          ```

      - Request Body: None
   
   4. PATCH http://localhost:3001/admins/updateclient

      - Headers:

        ```h
        {

          "Authorization: Bearer <TOKEN>",    
          "Content-Type: application/json"
        }
        ```

      - Request Body: 

        ```json
        {
            "userId": "integer", // number which is the user id
            "name":"string", 
            "email":"string",
            "role":"string",
            "businessType":"string"
        }
        ```
  
   5. DELETE http://localhost:3001/admins/deleteclient

      - Request Headers:

        ```h
        {
          "Authorization: Bearer <TOKEN>",    
          "Content-Type: application/json"
        }
        ```

      - Request Body: 

        ```json
        {
            "userId": 1,  // which is the client’s userId
            "role":"user"
        }
        ```


# Test: Unit Test

  1. Note: Before you run the test make sure you stop the server

  2. Then in your command terminal, run:
     
     ```shell
     npm test
     ```


# Endpoints Documentation:


POST '/auth/register'

- Sends a post request to register a client or an admin

- Request Headers:

```h
 { 
    "Content-Type: application/json"
 }
 ```

- Request Body:

```json 
{
    "name": "string",  
    "email": "string",
    "password": "string",
    "role":"string"  /// e.g., "user" or "admin"
 }
 ```

- Returns: an object of multiple keys e.g.,

```json 
{
    "status": "string", // e.g, "success", 
    "message": "string", //e.g, "registration successful", 
    "data": "object" // e.g, registraton data
}
```

POST '/auth/login'

- Sends a post request in order to login a user which is an admin

- Request Headers:

```h
 {   
    "Content-Type: application/json"
 }
```

- Request Body:

```json 
{
    "email": "string",  //which is an email,
    "password": "string" // which is a password
 }
 ```

- Returns: a single an object of success e.g.,

```json
{
    "status": "string", 
    "message": "string", 
    "data": "object"
}
```


GET '/admins/getclients'

- Fetches all registered clients

- Request Arguments: None

- Request Headers:

```h
 {

  "Authorization: Bearer <TOKEN>",    
  "Content-Type: application/json"

}
```

- Request Body: None

- Returns: An array of client data object e.g.,

```json
{

    "status": "success", 
    "message": "Clients found", 
    "data": [{
      "name":"string", 
      "email":"string",
      "role":"string",
      "businessType":"string" 
      }]
}
```


PATCH '/admins/updateclient'

- Update or modify a client data

- Request Arguments: None

- Request Headers: e.g.,

```h
{

   "Authorization: Bearer <TOKEN>",    
   "Content-Type: application/json"
}
```

- Request Body: 

```json
{
    "userId": "integer", // number which is the user id
    "name":"string", 
    "email":"string",
    "role":"string",
    "businessType":"string"
}
```

- Returns: An object with with a multiple key e.g.,

```json
{

    "status": "string", 
    "message": "string",
    "data": {
      "affectedRows":"integer" // a number
      }
}
```


DELETE '/admins/deleteclient'

- Delete a client data

- Request Arguments: None

- Request Headers:

```h
 {
   "Authorization: Bearer <TOKEN>",    
   "Content-Type: application/json"
}
```

- Request Body: 
```json
{
    "userId": 1  // which is the client’s userId
}
```

- Returns: An object with with a multiple key e.g.,

```json
{

    "status": "string", 
    "message": "string", // client deleted 
    "data": {
      "affectedRows":"integer" // a number
      }
}
``` 




      

                  
