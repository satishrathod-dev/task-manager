# Backend API Documentation

## `/api/signup` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in **JSON** format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Request

```json
{
  "fullname": {
    "firstname": "test_firstName",
    "lastname": "test_lastName"
  },
  "email": "test@example.com",
  "password": "test1234"
}
```

### Example Response

```json
{
  "user": {
    "fullname": {
      "firstname": "test_firstName",
      "lastname": "test_lastName"
    },
    "email": "test@example.com"
  },
  "token": "your_jwt_token_here"
}
```

---

## `/api/login` Endpoint

### Description

Authenticates a user and provides a JWT token.

### HTTP Method

`POST`

### Request Body

The request body should be in **JSON** format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

### Example Request

```json
{
  "email": "test@example.com",
  "password": "test1234"
}
```

### Example Response

```json
{
  "user": {
    "fullname": {
      "firstname": "test_firstName",
      "lastname": "test_lastName"
    },
    "email": "test@example.com"
  },
  "token": "your_jwt_token_here"
}
```

---

## `/tasks` Endpoints

### Authorization Header

All task-related endpoints require the following header:

```
Authorization: Bearer <jwt-token>
```

### `POST /api/tasks`

#### Description

Creates a new task for the authenticated user.

#### Request Body

```json
{
  "title": "Test Task",
  "description": "This is a test task",
  "dueDate": "2024-12-31",
  "priority": "High",
  "isCompleted": false
}
```

#### Example Response

```json
{
  "message": "Task created successfully",
  "task": {
    "title": "Test Task",
    "description": "This is a test task",
    "dueDate": "2024-12-31",
    "priority": "High",
    "isCompleted": false,
    "userId": "your_user_id_here"
  }
}
```

---

### `GET /api/tasks`

#### Description

Fetches all tasks for the authenticated user.

#### Example Response

```json
{
  "tasks": [
    {
      "title": "Test Task",
      "description": "This is a test task",
      "dueDate": "2024-12-31",
      "priority": "High",
      "isCompleted": false,
      "userId": "your_user_id_here"
    }
  ]
}
```

---

### `PUT /api/tasks/:id`

#### Description

Updates an existing task for the authenticated user.

#### Request Body

```json
{
  "title": "Updated Task",
  "description": "This task has been updated",
  "dueDate": "2024-12-31",
  "priority": "Medium",
  "isCompleted": true
}
```

#### Example Response

```json
{
  "message": "Task updated successfully",
  "task": {
    "title": "Updated Task",
    "description": "This task has been updated",
    "dueDate": "2024-12-31",
    "priority": "Medium",
    "isCompleted": true,
    "userId": "your_user_id_here"
  }
}
```

---

### `DELETE /tasks/:id`

#### Description

Deletes a task for the authenticated user.

#### Example Response

```json
{
  "message": "Task deleted successfully"
}
```

---

## Authentication Middleware

All task-related endpoints require authentication. The token must be sent in the `Authorization` header as follows:

```
Authorization: Bearer your_jwt_token_here
```

---

## Error Responses

If any request is invalid or unauthorized, an error message will be returned:

```json
{
  "message": "Error description here"
}
```

---

## Author

Developed by **Satish Rathod**
