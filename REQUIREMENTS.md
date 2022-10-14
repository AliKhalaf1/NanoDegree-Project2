# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index get all products
  -HTTP verb `GET`
  -Endpoint: `api/products`
  -Request Body:NA

  -Response Body: `Array of products data`

  ```json
  {
    "data": [
      {
        "id": "ad54dfc4-89b9-4869-a5b0-08409f69e99b",
        "name": "product name",
        "price": 1
      },
      {
        "id": "3823800b-1067-4d8c-868e-6fab6fb8acec",
        "name": "product name",
        "price": 10
      }
    ],
    "status": "success",
    "message": "products retrieved succesfully"
  }
  ```

- Show (get product by id)

  -HTTP verb `GET`
  -Endpoint: `/api/products/:id`
  -Request Body:

  -Response Body: `product data`

  ```json
  {
    "data": {
      "id": "ad54dfc4-89b9-4869-a5b0-08409f69e99b",
      "name": "aaa",
      "price": 1
    },
    "status": "success",
    "message": "product retrieved succesfully"
  }
  ```

- Create [token required]

  -HTTP verb `POST`
  -Endpoint: `/api/products`
  -Request Body:

  ```json
  {
    "name": "test",
    "price": 10
  }
  ```

  -Response Body:`created product data`

  ```json
  {
    "data": {
      "id": "3823800b-1067-4d8c-868e-6fab6fb8acec",
      "name": "test",
      "price": 10
    },
    "status": "success",
    "message": "product created succesfully"
  }
  ```

#### Users

- Index [token required]
  -HTTP verb `GET`
  -Endpoint: `/api/users`
  -Request Body:NA
  -Response Body: `Array of users data`

  ```json
  {
    "data": [
      {
        "id": "80fa8e77-8e57-4d5c-831c-b80efc995f80",
        "email": "test@test",
        "firstname": "firstname",
        "lastname": "lastname"
      },
      {
        "id": "48527902-0956-491d-ade8-6cde08e82db5",
        "email": "test@test2",
        "firstname": "firstname2",
        "lastname": "lastname2"
      }
    ],
    "status": "success",
    "message": "users retrieved succesfully"
  }
  ```

- Create User
  -HTTP verb `POST`
  -Endpoint: `/api/users`
  -Request Body:

  ```json
  {
    "email": "TEST@test",
    "firstname": "firstname",
    "lastname": "lastname",
    "password": "pass"
  }
  ```

  -Response Body:

  ```json
  {
    "data": {
      "id": "80fa8e77-8e57-4d5c-831c-b80efc995f80",
      "email": "ali@test",
      "firstname": "ali",
      "lastname": "aaa",
      "password": "$2b$10$lTdk/5lsPIRYfe/Ua5AlIO6aPLUWxPbMoEHzEiUftJEuiu7rn32KK"
    },
    "status": "success",
    "message": "user created succesfully"
  }
  ```

- Show [token required]
  -HTTP verb `POST`
  -Endpoint: `/api/users/:id`
  -Request Body:NA
  -Response Body: `user data`

  ```json
  {
    "data": {
      "id": "80fa8e77-8e57-4d5c-831c-b80efc995f80",
      "email": "test@test",
      "firstname": "firstname",
      "lastname": "lastname"
    },
    "status": "success",
    "message": "user retrieved succesfully"
  }
  ```

- Delete User[token required]
  -HTTP verb `DELETE`
  -Endpoint: `/api/users/:id`
  -Request Body:NA
  -Response Body: `DELETED user data`

  ```json
  {
    "data": {
      "id": "80fa8e77-8e57-4d5c-831c-b80efc995f80",
      "email": "TEST@test",
      "firstname": "firstname",
      "lastname": "lastname"
    },
    "status": "success",
    "message": "user deleted"
  }
  ```

- Patch User [token required]
  -HTTP verb `PATCH`
  -Endpoint: `/api/users`
  -Request Body:

  ```json
  {
    "id": "5ed23707-fe93-4186-974d-fd032f196b4c",
    "email": "test3@test",
    "firstname": "fristname",
    "lastname": "lastname",
    "password": "password"
  }
  ```

  -Response Body:

  ```json
  {
    "data": {
      "id": "5ed23707-fe93-4186-974d-fd032f196b4c",
      "email": "test3@test",
      "firstname": "fristname",
      "lastname": "lastname"
    },
    "status": "success",
    "message": "users updated succesfully"
  }
  ```

- Authenticate
  -HTTP verb `POST`
  -Endpoint: `/api/users/authenticate`
  -Request Body:

  ```json
  {
    "email": "test3@test",
    "password": "password"
  }
  ```

  -Response Body:

  ```json
  {
    "data": {
      "id": "5ed23707-fe93-4186-974d-fd032f196b4c",
      "firstname": "fristname",
      "lastname": "lastname",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVkMjM3MDctZmU5My00MTg2LTk3NGQtZmQwMzJmMTk2YjRjIiwiZmlyc3RuYW1lIjoiZnJpc3RuYW1lIiwibGFzdG5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjU3NTAzODJ9.zW5VlnZQNFwg0f5AO_l9U1Y0uPokrdE_bommRugDnqg"
    },
    "status": "success",
    "message": "user authenticated successfully"
  }
  ```

- Create order[token required]
  -HTTP verb `POST`
  -Endpoint: `/api/orders`
  -Request Body: `user id`

  ```json
  {
    "id": "6ab3c834-f529-4bd6-93b9-4ed8d2cbdabe"
  }
  ```

  -Response Body:

  ```json
  {
    "data": {
      "id": "7697bc12-d176-4013-bbe1-0e01ccd18bf5",
      "status": "pending",
      "user_id": "6ab3c834-f529-4bd6-93b9-4ed8d2cbdabe"
    },
    "status": "success",
    "message": "order created succesfully"
  }
  ```

#### Orders

- get all orders[token required]
  -HTTP verb `GET`
  -Endpoint: `api/orders`
  -Request Body:NA

  -Response Body: `Array of users orders`

  ```json
  {
    "data": [
      {
        "user_id": "ffe9a7b7-1ff7-4fbc-b75b-03e7ca9d610f",
        "firstname": "firstname",
        "lastname": "lastname",
        "email": "test1@test",
        "status": "pending"
      },
      {
        "user_id": "6ab3c834-f529-4bd6-93b9-4ed8d2cbdabe",
        "firstname": "firstname",
        "lastname": "lastname",
        "email": "test2@test",
        "status": "pending"
      }
    ],
    "status": "success",
    "message": "orders retreived succesfully"
  }
  ```

- Current Order by user (args: user id)[token required]
  -HTTP verb `GET`
  -Endpoint: `/apiapi/orders/user/:user_id`
  -Request Body:

  -Response Body: `data of orders made by user`

  ```json
  {
    "data": [
        {
            "order_id": "7697bc12-d176-4013-bbe1-0e01ccd18bf5",
            "product_id": "ad54dfc4-89b9-4869-a5b0-08409f69e99b",
            "product_name": "aaa",
            "product_price": 1,
            "quantity": 10,
            "status": "pending"
        }
        {
            "order_id": "7697bc12-d176-4013-bbe1-0e01ccd18bf5",
            "product_id": "3823800b-1067-4d8c-868e-6fab6fb8acec",
            "product_name": "test",
            "product_price": 10,
            "quantity": 10,
            "status": "pending"
        }
    ],
    "status": "success",
    "message": "orders retreived succesfully"
  }
  ```

Authenticate
-HTTP verb `POST`
-Endpoint: `/api/users/authenticate`
-Request Body:

```json
{
  "email": "test3@test",
  "password": "password"
}
```

-Response Body:

```json
{
  "data": {
    "id": "5ed23707-fe93-4186-974d-fd032f196b4c",
    "firstname": "fristname",
    "lastname": "lastname",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWVkMjM3MDctZmU5My00MTg2LTk3NGQtZmQwMzJmMTk2YjRjIiwiZmlyc3RuYW1lIjoiZnJpc3RuYW1lIiwibGFzdG5hbWUiOiJsYXN0bmFtZSJ9LCJpYXQiOjE2NjU3NTAzODJ9.zW5VlnZQNFwg0f5AO_l9U1Y0uPokrdE_bommRugDnqg"
  },
  "status": "success",
  "message": "user authenticated successfully"
}
```

- add products to orders
  -HTTP verb `POST`
  -Endpoint: `/api/orders/order_id`
  -Request Body:

  ```json
  {
    "productId": "3823800b-1067-4d8c-868e-6fab6fb8acec",
    "quantity": 10
  }
  ```

  -Response Body:

  ```json
  {
    "data": {
      "id": "24d4d4fb-7383-42da-a83b-5bad76140216",
      "quantity": 10,
      "order_id": "7697bc12-d176-4013-bbe1-0e01ccd18bf5",
      "product_id": "3823800b-1067-4d8c-868e-6fab6fb8acec"
    },
    "status": "success",
    "message": "product added to order succesfully"
  }
  ```

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
