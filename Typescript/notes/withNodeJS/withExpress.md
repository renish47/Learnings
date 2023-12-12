### Tips for working with Express + TS

- In Express instead of adding separate types for each parameters like `req`, `res`, `next` we can directly add `RequestHandler` type from express to the requestHandler in the controllers

- If we receive a param in the request, for better typescript support we can add the type of the params through generics
  ```ts
  import { RequestHandler } from "express";
  // controllers/todo.js
  export const updateTodo: RequestHandler<{ id: string }> = (
    req,
    res,
    next
  ) => {
    const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;
  };
  ```
