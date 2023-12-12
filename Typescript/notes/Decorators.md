# Decorators

- Enable this feature in the config file _(Which is an Experimental feature)_
- A decorator allows a user to add new functionality to an existing object without modifying its structure. Decorators are usually called before the definition of a class or its methods you want to decorate.
- We can see decorators used in Third party libraries and frameworks like Angular, Nest.js

```ts
function Logger(constructor: Function) {
  // These gets logged whenEver the constructor of the decorator gets defined by the js.
  console.log("logging...");

  //this return the constructor of the class decorator attached
  console.log(constructor);
}

@Logger
class Person {
  name = "Max";

  constructor() {
    //This only gets logged when an obj is instantiated with this class
    console.log("Creating Person Object");
  }
}
```

<br>

```ts
//Factory Decorators
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger("Logging-PERSON...")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating Person Object");
  }
}
```

<br>

- Like JSX in React, Angular use this decorators design pattern to write its class based components

```js
// Angular
import { Component } from "@angular/core";
@Component({
  selector: "example-component",
  template: "<div>Woo a component!</div>",
})
export class ExampleComponent {
  constructor() {
    console.log("Hey I am a component!");
  }
}
```

<br>

- We can add decorators to `Class`, `Accessors` like _(getter, setter)_, `methods` and `Parameters` / `Arguments`
  <br>

> Note that All these Decorators runs when the class gets defined by the javascript at the time of compiling _(i.e., They don't gets executed at the runtime like a method)_

<br>

- Up to my understanding, Decorators are generally used to add more logic or behind the scene works to a class without destructing / changing the source code of the originally created class.

```ts
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 19);
const p2 = new Product("Book 2", 29);
```

<br>

- We can also change the `method` or `Accessors` by returning new method from the factory decorator. Js don;t care about the return from decorators we added to the parameters

```ts
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  // T extends a constructor (new keyword is used to specify it is a constructor)
  // which takes n no. of args and returns an object with name property
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // Here we are adding more logic to the original constructor
    // Even though it is in decorator, This block will gets executed
    // when the class is instantiated since we added this to constructor
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON')
@Logger("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);
```

<br>

- Example 1 : Autobind for object methods

```ts
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector("button")!;
//button.addEventListener("click", p.showMessage.bind(p)); => Instead of this
button.addEventListener("click", p.showMessage);
```

<br>

- Example 2 : Validation with Decorators

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Understanding TypeScript</title>
    <script src="dist/app.js" defer></script>
  </head>
  <body>
    <div id="app"></div>
    <button>Click me</button>
    <form>
      <input type="text" placeholder="Course title" id="title" />
      <input type="text" placeholder="Course price" id="price" />
      <button type="submit">Save</button>
    </form>
  </body>
</html>
```

```ts
//Javascript
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log(createdCourse);
});
```
