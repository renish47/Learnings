# Advanced Types

Using `&` with two types we can join thos two types and create an intersection type, just like inheritance in interface.

```ts
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type elevatedEmployee = Admin & Employee;

const e1: elevatedEmployee = {
  name: "max",
  startDate: new Date(),
  privileges: ["Create server"],
};
```

```ts
//Intersection can be used with any Types
type Combinable = string | number;
type Numeric = number | boolean;

type universal = Combinable & Numeric;
```

<br>

#### Type Guard

- General TypeGuard,

```ts
    addFn(a : string|number, b : string|number){
        if(typeof a === "string" || typeof b === "string")
         return parseInt(a) + parseInt(b);
        return a+b;
    }
```

- `in` keyword helps us to check if the object or even a class has specific property or method we are looking for,

```ts
function printEmpDetails() {
  console.log(`Name : ${emp.name}`);

  // this doesn't work since this is our custom type
  // which won't be available in JS for compiling
  if (typeof emp === "Employee") {
  }
  // even TS dont allow this
  if (emp.privileges) {
  }

  //correct way
  if ("privileges" in emp) {
    console.log(`Privileges : ${emp.privileges}`);
  }
  if ("startDate" in emp) {
    console.log(`Start Date : ${emp.startDate}`);
  }
}
```

<br>

- `instanceof` keyword returns a boolean value based of whether the object is the instance of a class. this checks based on its constructor method.
  <br>

  - This isn't typescript specific as it is a JS feature
  - This can't be used with interface
    <br>

- `Discriminated Unions` is giving literal type to each interface which can be used for Type guarding.

  ```ts
  //We are discriminating each union with a type literal specified to it
  // so that all type will have a unique property to identify it
  interface Bird {
    type: "bird";
    flyingSpeed: number;
  }
  interface Horse {
    type: "horse";
    runningSpeed: number;
  }
  type Animal = Bird | Horse;

  function animalMovement(animal: Animal) {
    switch (animal.type) {
      case "bird":
        console.log(`flying speed : ${animal.flyingSpeed}`);
        break;
      case "horse":
        console.log(`running speed : ${animal.runningSpeed}`);
        break;
    }
  }
  ```

  > This will eliminate typos we can make when we use `in` keyword for this job

<br>

#### Type Casting

- Telling typescript that what type this variable contains and we are sure about it. This can be done using `<type>` in the front or `as "type"` at the end

  ```ts
  const userInputElement = document.getElementById(
    "user-input"
  )! as HTMLInputElement;
  userInputElement.value = "Hi There";

  // or

  const userInputElement = <HTMLInputElement>(
    document.getElementById("user-input")!
  );
  userInputElement.value = "Hi There";

  // or
  const userInputElement = document.getElementById("user-input");
  if (userInputElement) {
    (userInputElement as HTMLInputElement).value = "Hi There";
  }
  ```

<br>

#### Nullish Coalescing

- This will ensure that to return other value only when the first value is `null` or `undefined`

  ```ts
  // here "DEFAULT" will be stored if the userInput is even
  // an empty string "" or 0
  const storedData = userInput || "DEFAULT";

  // Here "DEFAULT" will be stored only when the
  // userInput is null or undefined
  const storedData = userInput ?? "DEFAULT";
  ```

  <br>

#### Function overloads

```ts
type combinable = number | string;

//Here we are indicating typescript what will be the type
// of return value we get for each cases of argument types
// so that it can provide with proper intellisence for the return value
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: number, b: number): number;
function add(a: combinable, b: combinable) {
  if (typeof a === "string" || typeof b === "string")
    return a.toString() + b.toString();
  return a + b;
}
```
