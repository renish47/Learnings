# Typescript

- It is just an javascript Wrapper / Superset which gives new features + advantages to javascript (These features are made only using the javascript features which already exists. It doesn't provide anything out of JS). <br/> <br/>
- Since it isn't an separate language, it can't be executed in JS environment (browsers can't understand typescript). Hence it will complie the written typescript code to complex javascript code.<br/> <br/>

- Typescript only helps in Development (before the code gets compiled). Hence it is an development tool helps to minimize errors in development along with other features.
  <br>

  > **_Note :_**
  >
  > - Javascript is `Dynamically / Loosely typed language` (Which means that the variable can be reassigned with any type of data). Hence it is Resolved at the runtime.
  >   <br>
  > - Typescript Helps the javascript to be `Statically typed Language`

<br>

#### Types

- `number`
- `string`
- `boolean`
  <br>

  <br>

- `tuples` - It is a type for special array with fixed length and specified type of data in each position
  ```ts
  let example: [string, number] = ["hello", 27];
  ```
  <br>
- `enum` - It allow a developer to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. TypeScript provides both numeric and string-based enums.

  ```ts
  // ts will automatically assign incrementing value for
  // each entries in the enum
  enum Role = {ADMIN, CLIENT}

  const person = {
    name : "Raja",
    role : Role.ADMIN
  }

  if(person.role === Role.ADMIN){
    giveMasterAccess()
  }


  // we can also provide our own values to it
  // which can be either string or number
  enum Grade = {A = 90, B = 80 , U = "fail"}
  ```

  <br>

- `any` - This tells TS that the variable can have any type which defeats the purpose of TS. Use it as a last resort but avoid it as much as possible.
  <br>

- `union` - This or that

  ```ts
  let input: string | number;
  input = "hi";
  input = 27;
  ```

    <br>

  > **Type Aliases** - with `type` we can define a type and reuse it anywhere

    <br>

- `litrals`

  ```ts
  type Role = "admin" | "client";
  ```

  <br>

- `function` as type

  ```ts
  function addAndHandle(
    num1: number,
    num2: number,
    //function as type
    handler: (value: number) => void
  ) {
    const result = num1 + num2;
    handler(result);
  }

  function printResult(value: number) {
    console.log(value);
  }

  addAndHandle(10, 20, printResult);
  ```

  <br>

- `unknown` - It is same as `any` but it doesn't turn off type checking. (i.e., TS throws error if we try to assign an string variable to unknown variable)
  <br>

- `never` - This type is used mostly in function which will never returns a value

  ```ts
  //Here this below function will never return anything
  function generateError(): never {
    throw { errorMessage, errorCode };
  }
  //Mostly these functions are used inside tryCatch block as
  //it will crash the code if it isn't inside an error boundary

  // Another example will be a function with infinite loop which
  // will never stops, hence never return a value
  ```
