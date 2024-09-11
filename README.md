# Poixel Test

## Setup and Running Instruction

1. Clone this repository: https://github.com/rexali/poixel-test.git 

2. Run in your command terminal: 'cd poixel-test'

3. Download and install nodejs into you machine: https://nodejs.org/en 
   
   and then open your command line and run: npm install

4. Download and install MYSQL database installer or workbench:
   
    * installer:  https://dev.mysql.com/downloads/installer 
    
    OR
    
    * workbench:  https://dev.mysql.com/downloads/workbench
   
   1. create a database and name it "poixeldb",
   
   2. create a table in the database and name it 'users' table with columns as follow: 
      * name, 
      * email (set the unique to true)
      * password 
      * role (set the default value to "user")
      * businessType

5. Add new .env file to the project root folder and then add the following configuration:
  
    1. DB_HOST=localhost
    2. DB_PORT= <your database port> 
    3. DB_USER= <your database username>
    4. DB_PASS= <your database password>
    5. DB_NAME= poixeldb
    6. SECRET_KEY=asdfghjkil

6. Then open command line and run: npm start

## CURL for Client-Server Requests and Responses

7. Curl Commands:

    1. To rgister a client or an admin user, 
       
       Terminal: run
       
       ```shell
       curl -d '{"username": "admin","email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/register
       ```

    2. Log in to get login authentication token; 
        
        Terminal: run
        
        ```shell
        curl -d '{"username": "admin","email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/register
        ```

    3. Then verify the authentication token to prevent CSRF attack and before given access to the dashboard;
        
        Terminal: run
        
        ```shell
        curl -d '{"email": "admin@bazzsolutions.com","password": "bazzsolution001"}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X POST http://localhost:3001/login
        ```

    4. Get a list of all registered clients
      
        Terminal: run
        
        ```shell
        curl -d '{"userId": 1}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X GET http://localhost:3001/admins/getclients
        ````

    5. Update or modify a client data or details
      
        Terminal: run
        
        ```shell
        curl -d '{"userId": 1, "email":"admin@bazzsolutions.com", "date_of_birth":"6/7/1960", "permanent_address":"28 Enyinare Quarters, Okene, Kogi State", "present_address":"463 N-Tsakiya, Kumbotso, Kano State", "city":"Kano", "postal_code":"70001", "country":"Nigeria", token:""}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X PATCH http://localhost:3001/admins/update
        ```

    5. Delete or remove a client data or details
       
        Terminal: run
        
        ```shell
        curl -d '{"userId": 1, "email":"admin@bazzsolutions.com", "date_of_birth":"6/7/1960", "permanent_address":"28 Enyinare Quarters, Okene, Kogi State", "present_address":"463 N-Tsakiya, Kumbotso, Kano State", "city":"Kano", "postal_code":"70001", "country":"Nigeria", token:""}' -H "Content-Type:application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWx5IiwiaWF0IjoxNzIwMjYxOTE4fQ.35XWUPp5aK1wxTpOLCVUqwojU7FqEr5LrkNq8ehXO-s" -X DELETE http://localhost:3001/admins/delete
        ```


## Postman for Client-Server Requests and Responses
    
8. Use Postman and use the headers and body data from the above curls commands below:
   
   1. POST http://localhost:3001/auth/register 

      Header:

        ```h
          { 
            "Content-Type: application/json"
          }
        ```

      Body:

        ```json 
        {
            "name": "string",  
            "email": "string",
            "password": "string",
            "role":"string"  /// e.g., "user" or "admin"
        }
        ```
   
   2. POST http://localhost:3001/auth/login

   Header:
   
        ```h
        {   
            "Content-Type: application/json"
        }
        ```

    Body:

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
          "userId": 1  // which is the client’s userId
      }
      ```


# Test: Unit Test

  1. Note: Before you run the test make sure you stop the server

  2. Then in your command terminal, run: npm test


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




      

                  
