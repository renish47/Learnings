# Generics

#### Built in Generics

```ts
const names: Array<string> = ["HI", "BYE"];
names[0].split("");

const promise: Promise<number> = new promise((resolve, reject) => {
  setTimeout(() => resolve(10), 2000);
});
```

<br>

#### Inferring & Restricting Types using Generics

- Here by providing generics, we are making typescript to infer the types of the arguments and assign it to T and U.

  ```ts
  function merge<T, U>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);
  }

  const mergedObj = merge({ name: "MAX" }, { age: 20 });
  ```

<br>

- Here we are restricting T to be an Object type, but U can of any type

  ```ts
  function merge<T extends object, U>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2);
  }
  ```

<br>

- Here we only care about if the generic type has LENGTH property init. Hence we can pass any type `(not only Array or String but also any Custom type with length property) `as the argument.

  ```ts
  interface HasLength {
  length: number;
  }

  function countAndDescribe<T extends HasLength>(element : T) : [T, string]
  {
    let descriptionText = "Got no element"
    if(element.length===1)
        descriptionText = "Got one element'
    else if( element.length >1)
        descriptionText = `Got ${element.length} elements`

    return [element, descriptionText]
  }

  countAndDescribe("hi there")
  countAndDescribe(["hi there", "bye"])
  ```

#### keyof constraint

```ts
function extractAndReturn<T extends object, U extends keyof T>(obj: T, key: U) {
  return `value of ${key} is ${obj[key]}`;
}

extractAndReturn({ name: "max", age: 20 }, name);
```

<br>

#### Generic Class

```ts
class Storage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // here this logic doesn't work for objects
    // for this we can constraint the class to  string, number
    // class Storage<T extends string, number>{}
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const stringStorage = new Storage<string>();
const numberStorage = new Storage<number>();
```

<br>

#### Generic utility types

- `Partial<>` - this will makes everything inside the type as optional whenever we use this utility type with any custom created type _(only temporarily)_

  ```ts
  interface Goal {
    name: string;
    description: string;
  }

  function createGoal(name: string, desc: string): Goal {
    // here if i didn't use Partial<> utility type, ts will throw
    // error as we can' t Goal typed variable cant accept empty {}
    let createdGoal: Partial<Goal> = {};

    //some validation
    createdGoal.name = name;
    //some validation
    createdGoal.description = desc;

    return createdGoal as Goal;
  }
  ```

  <br>

- `Readonly<>`
  ```ts
  const name: Readonly<string[]> = ["max", "Anna"];
  name.push("manu"); // ts will throw error for this
  ```
