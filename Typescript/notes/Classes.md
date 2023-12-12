# Classes

<br>

#### Access Modifers

- `public` - access granted throughout the module
- `private` - access granted only within the class
- `protected` - access granted within the class and whichever classes that inherits that class
  <br>
- `readonly` - This modifier is only used along with other access modifiers  
  <br>

#### Getters and Setters

They are used to get and set values of the `private` properties. Though the syntax looks like a function, they are accessed like a property (Without Paranthesis) and values are set using assignment operator.

```ts
class Department {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {}

  // Getters must return something
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  // Setters must receive something as arguments
  set addLastReport(value: string) {
    if (!value) throw new Error("Enter valid Value");
    this.report.push(value);
    this.lastReport = value;
  }
}

const depertment = new Department("id5", ["2023 report"]);
//accessing getter
console.log(department.mostRecentReport);
//accessing setter
department.addLastReport = "2024 Report";
```

<br>

#### Static Methods & Properties

`Static` keyword helps to create properties and methods of a class which can be accessed without creating an instance of the class

> i.e., `Math` utility class inbuilt in the javascript which can be used without creating an instance of it.

```ts
class Department {
  private employees: string[];

  static workForceStrength = 0;

  static createEmployee(name: string) {
    this.employee.push(name);
    // you cant access static property using this keyword since
    // this refers the instance created but here we aren't creating an instance
    //but inside a static method we can use this keyword
    Department.workForceStrength += 1; //or
    this.workForceStrength += 1;
  }
}

Department.createEmployee("Ramesh");
console.log(Department.workForceStrength);
```

<br>
 
#### Inheritance

```ts

```

<br>
 
#### Abstract keyword

```ts

```

<br>
 
#### Singleton and private constructor

```ts

```

<br>
