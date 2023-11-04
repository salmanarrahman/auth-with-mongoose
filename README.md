
### Model:

### User Model:
- _id
- phoneNumber
- role   → enums → [‘seller’,’ buyer’]
- password 
- name	
   - firstName
   - lastName
- address
- budget → Savings for buying the cow
- income → money from selling the cow
- createdAt
- updatedAt


### Sample Data: (User as Buyer)
```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
  "password":"abrakadabra",
  "role": "buyer",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":70000,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```

### Sample Data: (User as Seller)
```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
  "password":"abrakadabra",
  "role": "seller",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":0,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```

### Cow Model:

- name: The name of the cow.
- age: The age of the cow in years.
- price: The price of the cow.
- location: Enums of location
  - Dhaka
  - Chattogram
  - Barishal
  - Rajshahi
  - Sylhet
  - Comilla
  - Rangpur
  - Mymensingh

- breed: The breed of the cow
  - Brahman 
  - Nellore 
  - Sahiwal 
  - Gir 
  - Indigenous 
  - Tharparkar 
  - Kankrej 

- weight: The weight of the cow in kilograms.
- label: The enums of the label.
  - for sale → Default value
  - sold out

- category: An enum representing the category of the cow.
  - Dairy = "Dairy",  // Represents cows bred primarily for milk production.
  - Beef = "Beef", // Represents cows bred primarily for meat production.
  - DualPurpose = "Dual Purpose", // Represents cows bred for both milk and meat production.

- seller: A reference ID that identifies the seller of the cow, allowing for tracking and association with the seller's information.

### Sample Data: (Cow)

```json
{
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "ObjectId(609c17fc1281bb001f523456)"
}

```


## Implement Create, Read, Update, and Delete Operations for Users Listing

### Create a new User 

 Route:  /api/v1/auth/signup (POST)
 
 Request body:
 
 ```json
 {
  "password":"abrakadabra",
  "role": "buyer",
   "name": {
     "firstName": "Kopa",
      "lastName": "Samsu"
   },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":30000  // money to buy the cow
  "income":0 // By Default 0
}
```
 
 Response: The newly created user object.
 
 Response Sample Pattern:

```json
 {
      "success": true, 
      "statusCode":200,
      "message": "Users created successfully",
      "data": {}, 
  }
```

           
### Get All Users

 Route:  /api/v1/users (GET)
 
 Request body:
 
 Response: The user's array of objects.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Users retrieved successfully",
      "data": [{},{}], 
  }
```


### Get a Single User

Route:  /api/v1/users/:id (GET)

Request Param: :id

Response: The specified user object.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "User retrieved successfully",
      "data": {}, 
  }
  ```

### Update a Single User

 Route:  /api/v1/users/:id (PATCH)
 
 Request Param: :id
 
 Response: The updated user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "User updated successfully",
      "data": {}, 
  }
  ```
  
  ### Delete a User

 Route:  /api/v1/users/:id ( DELETE)
 
 Request Param: :id
 
 Response:  The deleted user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Uers deleted successfully",
      "data": {}, 
  }
```

## Implement Create, Read, Update, and Delete Operations for COW listings.

### Create a New Cow

 Route:  /api/v1/cows (POST)

Request body:

```json
 {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}

```
 
 Response: The newly created cow object.

 Response Sample Pattern:

```json
 {
      "success": true, 
      "statusCode":200,
      "message": "Cow created successfully",
      "data": {}, 
  }
```
           
### Get All Cows

 Route:  /api/v1/cows (GET)

 Request body:

 Response: The cows array of objects.

 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        "count":1050
        }
      "data": [{},{}] , 
  }
  ```


### Retrieve paginated and filtered cow listings: ( You do not need to implement pagination as we implemented, you can do as you want )

Route:  /api/v1/cows?

Query parameters:  (Case Insensitive)
- page: The page number for pagination (e.g., ?page=1).
- limit: The number of cow listings per page (e.g., ?limit=10).
- sortBy: The field to sort the cow listings (e.g., ?sortBy=price).
- sortOrder : The order of sorting, either 'asc' or 'desc' (e.g., ?sortOrder=asc).
- minPrice: The minimum price for filtering (e.g., ?minPrice=1000).
- maxPrice: The maximum price for filtering (e.g., ?maxPrice=5000).
- location: The location for filtering (e.g., ?location=chattogram).
- searchTerm: The search query string for searching cows (e.g., ?query=Dhaka). (Search Fields should be location, breed, and category) 

Response: An array of cow listing objects that match the provided filters, limited to the specified page and limit.

Response Sample Pattern:
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        }
      "data": [{},{}], 
  }
```


### Get a Single Cow

Route:  /api/v1/cows/:id (GET)

Request Param: :id

Response: The specified cow object.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow retrieved successfully",
      "data": {}, 
  }
```


### Update a Single Cow

 Route:  /api/v1/cows/:id (PATCH)
 
 Request Param: :id
 
 Response: The updated cow object.

 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow updated successfully",
      "data": {}, 
  }

```  
### Delete a Cow

 Route:  /api/v1/cows/:id ( DELETE)
 
 Request Param: :id
 
 Response: The deleted cow object
 
 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow deleted successfully",
      "data": {}, 
  }
```

Live link 

https://eid-hut-saallu.vercel.app


Application Routes:

Auth (User)
Route: https://eid-hut-saallu.vercel.app/api/v1/auth/login (POST)
Route: https://eid-hut-saallu.vercel.app/api/v1/auth/signup (POST)
Route: https://eid-hut-saallu.vercel.app/api/v1/auth/refresh-token (POST)
Auth (Admin)
Route: https://eid-hut-saallu.vercel.app/api/v1/admins/create-admin (POST)
Route: https://eid-hut-saallu.vercel.app/api/v1/admins/login (POST)

BOTH ADMIN LOGIN AND USER LOGIN SHOULD BE DONE WITH PHONE NUMBER AND PASSWORD,

YOU MUST LOGIN TO GENERATE NEW ACCESS TOKEN.

header key should be "authorization" and value is access token.

USER :

https://eid-hut-saallu.vercel.app/api/v1/users [GET]

https://eid-hut-saallu.vercel.app/api/v1/users/649968d0f6b7210cdff75ee3 [SINGLE USER GET]

https://eid-hut-saallu.vercel.app/api/v1/users/649968d0f6b7210cdff75ee3 [PATCH]

https://eid-hut-saallu.vercel.app/api/v1/users/649968d0f6b7210cdff75ee3 [DELETE]

COWS : 

https://eid-hut-saallu.vercel.app/api/v1/cows/create-cow [POST]

https://eid-hut-saallu.vercel.app/api/v1/cows [GET]

https://eid-hut-saallu.vercel.app/api/v1/cows/64905c5b7788bbba45ed8513 [single get]

https://eid-hut-saallu.vercel.app/api/v1/cows/64905c5b7788bbba45ed8513 [patch]

https://eid-hut-saallu.vercel.app/api/v1/cows/64905c5b7788bbba45ed8513 [delete]









