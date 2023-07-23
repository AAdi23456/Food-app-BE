# Food-app


```markdown


These API provides endpoints for user registration, login, and password reset.

## Endpoints

### Register User

Registers a new user with the provided details.

**URL**: `/register`

**Method**: `POST`

**Request Body**

| Field    | Type   | Description             |
|----------|--------|-------------------------|
| name     | string | User's name             |
| email    | string | User's email address    |
| password | string | User's password         |
| address  | string | User's address          |

**Example Request Body**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "secretpassword",
  "address": "123 Main St, City, Country"
}
```

**Response**

- If the user already exists, the API will return a JSON object with a status code of 200 and a "msg" field indicating that the user already exists.

```json
{
  "msg": "user already exists"
}
```

- If the user is successfully registered, the API will return a JSON object with a status code of 201 and a "msg" field indicating the registration was successful.

```json
{
  "msg": "registration success"
}
```

- If there is an error during the registration process, the API will return a JSON object with a status code of 500 and a "msg" field indicating that the registration failed.

```json
{
  "msg": "registration failed"
}
```

### User Login

Logs in a user with the provided email and password.

**URL**: `/login`

**Method**: `POST`

**Request Body**

| Field    | Type   | Description             |
|----------|--------|-------------------------|
| email    | string | User's email address    |
| password | string | User's password         |

**Example Request Body**

```json
{
  "email": "johndoe@example.com",
  "password": "secretpassword"
}
```

**Response**

- If the user is successfully logged in, the API will return a JSON object with a status code of 201, a "msg" field indicating the login was successful, and a JWT token for authentication.

```json
{
  "msg": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- If the user does not exist, the API will return a JSON object with a status code of 400 and a "msg" field indicating that the user needs to register first.

```json
{
  "msg": "Please register first"
}
```

- If the password provided is incorrect, the API will return a JSON object with a status code of 400 and a "msg" field indicating that the credentials are wrong.

```json
{
  "msg": "Wrong credentials"
}
```

### Reset User Password

Resets the user's password with a new password.

**URL**: `/user/:id/reset`

**Method**: `POST`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| id        | User's ID               |

**Request Body**

| Field        | Type   | Description             |
|--------------|--------|-------------------------|
| password     | string | Current password        |
| newpassword  | string | New password            |

**Example Request Body**

```json
{
  "password": "currentpassword",
  "newpassword": "newpassword"
}
```

**Response**

- If the password reset is successful, the API will return a JSON object with a status code of 204 and a "msg" field indicating the password change was successful.

```json
{
  "msg": "Password changed successfully"
}
```

- If the current password provided is incorrect, the API will return a JSON object with a status code of 400 and a "msg" field indicating that the password is wrong.

```json
{
  "msg": "Wrong password"
}
```

- If an error occurs during the password reset process, the API will return a JSON object with a status code of 500 and a "msg" field indicating that something went wrong.

```json
{
  "msg": "Something went wrong"
}
```


```markdown


These API provides endpoints for managing orders and restaurants.

## Endpoints

### Create Order

Creates a new order with the provided details.

**URL**: `/orders`

**Method**: `POST`

**Request Body**

| Field            | Type     | Description              |
|------------------|----------|--------------------------|
| user             | string   | User's ID                |
| restaurantId     | string   | Restaurant's ID          |
| items            | array    | Order items              |
| totalPrice       | number   | Total price              |
| deliveryAddress  | string   | Delivery address         |
| status           | string   | Order status             |

**Example Request Body**

```json
{
  "user": "60c862c1a96c22117050e9b8",
  "restaurantId": "60c862c1a96c22117050e9b9",
  "items": [
    {
      "name": "Pizza",
      "quantity": 2,
      "price": 10
    },
    {
      "name": "Burger",
      "quantity": 1,
      "price": 5
    }
  ],
  "totalPrice": 25,
  "deliveryAddress": "123 Main St, City, Country",
  "status": "Pending"
}
```

**Response**

- If the order is created successfully, the API will return a JSON object with a status code of 200 and a "msg" field indicating the new order was created successfully.

```json
{
  "msg": "New order created successfully",
  "order": {
    "_id": "60c862c1a96c22117050e9ba",
    "user": "60c862c1a96c22117050e9b8",
    "restaurant": "60c862c1a96c22117050e9b9",
    "items": [
      {
        "_id": "60c862c1a96c22117050e9bb",
        "name": "Pizza",
        "quantity": 2,
        "price": 10
      },
      {
        "_id": "60c862c1a96c22117050e9bc",
        "name": "Burger",
        "quantity": 1,
        "price": 5
      }
    ],
    "totalPrice": 25,
    "deliveryAddress": "123 Main St, City, Country",
    "status": "Pending"
  }
}
```

### Get Order by ID

Retrieves an order by its ID.

**URL**: `/orders/:id`

**Method**: `GET`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| id        | Order's ID              |

**Response**

- If the order is found, the API will return a JSON object with a status code of 200 and a "orders" field containing the order details.

```json
{
  "orders": {
    "_id": "60c862c1a96c22117050e9ba",
    "user": "60c862c1a96c22117050e9b8",
    "restaurant": "60c862c1a96c22117050e9b9",
    "items": [
      {
        "_id": "60c862c1a96c22117050e9bb",
        "name": "Pizza",
        "quantity": 2,
        "price": 10
      },
      {
        "_id": "60c862c1a96c22117050e9bc",
        "name": "Burger",
        "quantity": 1,
        "price": 5
      }
    ],
    "totalPrice": 25,
    "deliveryAddress": "123 Main St, City, Country",
    "status": "Pending"
  }
}
```

- If no order is found with the given ID, the API will return a JSON object with a status code of 400 and a "msg" field indicating that no order was found.

```json
{
  "msg": "No order found"
}
```

### Update Order Status

Updates the status of an order.

**URL**: `/orders/:id`

**Method**: `PUT`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| id        | Order's ID              |

**Request Body**

| Field    | Type   | Description             |
|----------|--------|-------------------------|
| status   | string | Order status            |

**Example Request Body**

```json
{
  "status": "Completed"
}
```

**Response**

- If the order status is updated successfully, the API will return a JSON object with a status code of 204 and a "msg" field indicating the order status was updated successfully.

```json
{
  "msg": "Order status updated successfully"
}
```

### Get All Restaurants

Retrieves a list of all restaurants.

**URL**: `/restaurants`

**Method**: `GET`

**Response**

- If the restaurants are found, the API will return a JSON object with a status code of 200 and a "msg" field containing the restaurant data.

```json
{
  "msg": [
    {
      "_id": "60c862c1a96c22117050e9b9",
      "name": "Restaurant 1",
      "description": "This is restaurant 1",
      "address": "123 Main St, City, Country",
      "menu": [
        {
          "_id": "60c862c1a96c22117050e9bd",
          "name": "Pizza",
          "description": "Delicious pizza",
          "price": 10,
          "image": "pizza.jpg"
        },
        {
          "_id": "60c862c1a96c22117050e9be",
          "name": "Burger",
          "description": "Tasty burger",
          "price": 5,
          "image": "burger.jpg"
        }
      ]
    },
    {
      "_id": "60c862c1a96c22117050e9bf",
      "name": "Restaurant 2",
      "description": "This is restaurant 2",
      "address": "456 Main St, City, Country",
      "menu": [
        {
          "_id": "60c862c1a96c22117050e9c0",
          "name": "Pasta",
          "description": "Delicious pasta",
          "price": 12,
          "image": "pasta.jpg"
        },
        {
          "_id": "60c862c1a96c22117050e9c1",
          "name": "Salad",
          "description": "Fresh salad",
          "price": 8,
          "image": "salad.jpg"
        }
      ]
    }
  ]
}
```

### Get Restaurant by ID

Retrieves a restaurant by its ID.

**URL**: `/restaurants/:id`

**Method**: `GET`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| id

        | Restaurant's ID          |

**Response**

- If the restaurant is found, the API will return a JSON object with a status code of 200 and a "msg" field containing the restaurant details.

```json
{
  "msg": {
    "_id": "60c862c1a96c22117050e9b9",
    "name": "Restaurant 1",
    "description": "This is restaurant 1",
    "address": "123 Main St, City, Country",
    "menu": [
      {
        "_id": "60c862c1a96c22117050e9bd",
        "name": "Pizza",
        "description": "Delicious pizza",
        "price": 10,
        "image": "pizza.jpg"
      },
      {
        "_id": "60c862c1a96c22117050e9be",
        "name": "Burger",
        "description": "Tasty burger",
        "price": 5,
        "image": "burger.jpg"
      }
    ]
  }
}
```

- If no restaurant is found with the given ID, the API will return a JSON object with a status code of 400 and a "msg" field indicating that no restaurant was found.

```json
{
  "msg": "No data found"
}
```

### Get Restaurant Menu

Retrieves the menu of a restaurant by its ID.

**URL**: `/restaurants/:id/menu`

**Method**: `GET`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| id        | Restaurant's ID          |

**Response**

- If the restaurant is found, the API will return a JSON object with a status code of 200 and a "msg" field containing the restaurant's menu.

```json
{
  "msg": [
    {
      "_id": "60c862c1a96c22117050e9bd",
      "name": "Pizza",
      "description": "Delicious pizza",
      "price": 10,
      "image": "pizza.jpg"
    },
    {
      "_id": "60c862c1a96c22117050e9be",
      "name": "Burger",
      "description": "Tasty burger",
      "price": 5,
      "image": "burger.jpg"
    }
  ]
}
```

### Delete Menu Item

Deletes a menu item from a restaurant's menu.

**URL**: `/api/restaurants/:rid/menu/:mid`

**Method**: `DELETE`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| rid       | Restaurant's ID         |
| mid       | Menu Item's ID          |

**Response**

- If the menu item is deleted successfully, the API will return a JSON object with a status code of 200 and a "msg" field indicating the menu item was deleted successfully.

```json
{
  "msg": "Menu item deleted successfully"
}
```

### Add Menu Item

Adds a new menu item to a restaurant's menu.

**URL**: `/restaurant/:id/menu`

**Method**: `POST`

**URL Parameters**

| Parameter | Description             |
|-----------|-------------------------|
| id        | Restaurant's ID          |

**Request Body**

| Field        | Type   | Description             |
|--------------|--------|-------------------------|
| name         | string | Menu item name          |
| description  | string | Menu item description   |
| price        | number | Menu item price         |
| image        | string | Menu item image URL     |

**Example Request Body**

```json
{
  "name": "Pasta",
  "description": "Delicious pasta",
  "price": 12,
  "image": "pasta.jpg"
}
```

**Response**

- If the menu item is added successfully, the API will return a JSON object with a status code of 201 and a "msg" field indicating the new menu item was added successfully.

```json
{
  "msg": "New menu added successfully",
  "menu": {
    "_id": "60c862c1a96c22117050e9bd",
    "name": "Pasta",
    "description": "Delicious pasta",
    "price": 12,
    "image": "pasta.jpg"
  }
}
```


