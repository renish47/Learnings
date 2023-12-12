<br>

#React + TS Essentials

### 1. Extending Components

<br>

- Instead of adding `children : ReactNode` to propTypes manually, There is a predefined type `PropsWithChildren` which is a Generic type which requires the prop's type as an argument

  ```ts
  // Here adding this `type` decorator will help buildTool not to add this
  // import to js file as it is only useful in a typescript file

  import { type ReactNode, type PropsWithChildren } from "react";
  //or
  // import type { ReactNode, PropsWithChildren } from "react";
  interface propType {
    title: string;
    desc: string;
    children: ReactNode;
  }

  //or

  type propType = PropsWithChildren<{
    title: string;
    desc: string;
  }>;
  ```

<br>

- We can add html element attributes to custom component by adding a generic tyoe `ComponentPropsWithoutRef` to our component props types.

  ```ts
  import { type ComponentPropsWithoutRef } from "react";
  type InputProps = {
    label: string;
  } & ComponentPropsWithoutRef<"input">;

  export const Input = ({ input, id, ...props }: InputProps) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input {...props} />
      </div>
    );
  };
  ```

  <br>

---

### 2. Building Dynamic Component

  <br>

- Giving Unique literal type to each types and merging it using union _(Discriminated Union)_

  ```ts
  import { type ComponentPropsWithoutRef } from "react";

  type ButtonProps = {
    element: "button";
  } & ComponentPropsWithoutRef<"button">;

  type AnchorProps = {
    element: "anchor";
  } & ComponentPropsWithoutRef<"a">;

  export function button(props: ButtonProps | AnchorProps) {
    //Discriminated Union
    if (element === "button") return <a {...props}>{props.children}</a>;
    return <button {...props}>{props.children}</button>;
  }
  ```

  <br>

- Using `is` keyword _(Type Predicate)_

  ```ts
  import { type ComponentPropsWithoutRef } from "react";

  type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    href?: never;
  };

  type AnchorProps = ComponentPropsWithoutRef<"a"> & {
    href?: string;
  };

  // Here we are specifiying to typescript that if the return value is true then
  // the parameter we get is of this specific type (i.e., props is of AnchorProps type)

  // But the downside of using this method is that the typescript allows all
  // the attributes of both button and anchor to be entered since it is unioned
  function isAnchorProps(
    props: ButtonProps | AnchorProps
  ): Props is AnchorProps {
    return "href" in props;
  }

  export function button(props: ButtonProps | AnchorProps) {
    //Discriminated Union
    if (usAnchorProps(props)) return <a {...props}>{props.children}</a>;
    return <button {...props}>{props.children}</button>;
  }
  ```

  <br>

---

### 3. Polymorphic Components

<br>

- These components are created so that the selected built in components can share same working logic and same styling.

- In other words it is the fancy way of saying, it is a wrapper component but we won't now which element it is gonna wrap in advanced. _(Hence it can wrap all kinds of component)_

```ts
//////// Container.tsx

import { ElementType, ReactNode, ComponentPropsWithoutProps } from "react";

// Here `as` is the convention we use to mention the ElementType
type ContainerProps<T extends ElementType> = {
  as: T;
  children: ReactNode;
} & ComponentPropsWithoutProps<T>;

// Here we are explicitly saying to typescript that
// C = type of first parameter of the function which is "as"
export function Container<C extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<C>) {
  // Here we are providing with a default element type to make ts gets satisfied
  // that this will always be of ElementType
  const Component = as || "div";
  return <Component {...props}> {children}</Component>;
}

/////// App.tsx

import { Container } from "./Container";

export default App = () => {
  return (
    <Container as={"Button"} onClick={clickHandler}>
      click me
    </Container>
  );
};
```

---

### 4. Advanced props types

<br>

- If we want to accept jsx or HTML code as props, use `ReactNode` as the propType.

  ```ts
  // Example: A Card component that has multiple "slots" for content
  // Main slot => children prop
  // Actions slot => actions prop

  import { ReactNode } from "react";

  type CardProps = {
    title: string;
    children: ReactNode;
    // "actions" is like an extra "slot" of this component
    // It's the same type as the children prop, since we expect JSX code as a prop value
    actions: ReactNode;
  };

  export function Card({ title, children, actions }: CardProps) {
    return (
      <section>
        <h2>{title}</h2>
        {children}
        {actions}
      </section>
    );
  }

  // Example Usage:
  export function Demo() {
    return (
      <Card
        title="My Card"
        actions={
          <button onClick={() => console.log("Button clicked!")}>
            Click Me!
          </button>
        }
      >
        <p>Some content</p>
      </Card>
    );
  }
  ```

<br>

- If we want to accept Element as prop, use `ElementType` as the propType.

  ```ts
  // Example: A Button component that has an icon and text
  // The icon is passed via a prop, which is a function that returns JSX code
  import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

  type IconButtonProps = {
    icon: ElementType;
    onClick: () => void;
    children: ReactNode;
  } & ComponentPropsWithoutRef<"button">;

  export function IconButton({
    // icon is aliased to Icon because it should be used like a custom component name
    icon: Icon,
    children,
    ...otherProps
  }: IconButtonProps) {
    return (
      <button {...otherProps}>
        <span>
          <Icon />
        </span>
        <span>{children}</span>
      </button>
    );
  }

  // Example Usage:

  function HeartIcon() {
    return <span>❤️</span>;
  }

  export function Demo() {
    return (
      <IconButton
        icon={HeartIcon}
        onClick={() => console.log("Button clicked!")}
      >
        Like
      </IconButton>
    );
  }
  ```

  <br>

- `Generic type components`

  ```ts
  // Example: A Generic List Component
  // This reusable component can be used to render a list of items of any type. The type of the items is passed via a generic type parameter.

  import { type ReactNode } from "react";

  type ListProps<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
  };

  export function List<T>({ items, renderItem }: ListProps<T>) {
    return <ul>{items.map(renderItem)}</ul>;
  }

  // Example Usage:

  export function Demo() {
    const users = [
      { id: "u1", name: "Max" },
      { id: "u2", name: "Manuel" },
    ];

    const hobbies = ["Sports", "Reading", "Cooking"];

    return (
      <main>
        <section>
          <h2>Users</h2>
          <List
            items={users}
            renderItem={(user) => <li key={user.id}>{user.name}</li>}
          />
        </section>
        <section>
          <h2>Hobbies</h2>
          <List
            items={hobbies}
            renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
          />
        </section>
      </main>
    );
  }
  ```

---

### 5. Components with ref

<br>

```ts
  import { forwardRef, type ComponentPropsWithoutRef } from "react";
  type InputProps = {
    label: string;
  } & ComponentPropsWithoutRef<"input">;

//ForwardRef is a generic requires two arguments
// 1. type of the element ref is attached
// 2 . type of the props
  export const Input = forwardRef<HTMLInputElement, InputProps>
  ({ input, id, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input {...props} ref={ref} />
      </div>
    );
  };
```

  <br>

---
