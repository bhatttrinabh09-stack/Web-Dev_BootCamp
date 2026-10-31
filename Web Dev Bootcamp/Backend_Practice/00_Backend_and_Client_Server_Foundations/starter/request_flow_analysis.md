# Architectural Flow Analysis: E-Commerce Checkout

## 1. Client Request
- **HTTP Method:** [e.g. POST]
- **Endpoint Path:** [/api/orders]
- **Headers:**
  - `Content-Type`: application/json
  - `Cookie` or `Authorization`: [Explain how the client identifies themselves]
- **Request Body (JSON):**
  ```json
  {
    "itemId": "prod-101",
    "quantity": 2
    // NOTE: Should 'price' be included here? Explain why or why not!
  }
  ```

## 2. Server-Side Execution Pipeline
List the 4 crucial validation, authentication, and business logic steps the server must execute before modifying the database:
1. ...
2. ...
3. ...
4. ...

## 3. Database Operations
Describe the SQL queries or transactions that must occur:
- How does the server verify inventory stock?
- How is the order recorded?
- How is inventory deducted safely without going negative?

## 4. Server Response
- **HTTP Status Code:** [201 / 400 / 409]
- **Response Headers:** `Content-Type: application/json`
- **Response Body (JSON):**
  ```json
  { ... }
  ```
