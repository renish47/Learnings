# Event + Typescript

### Form Event

- For FormEvents we need to specify more accuratly for typescript to understand by using generics `FormEvent<HTMLFormElement>`. _(This implies that this form event is coming from the html-form-element)_
  <br>

  > Look for the most nested error in the Ts error, which will make most sense for us to know what is happening.

- Exposing Component APIs with `useImperativeHandle`

  - This is used when we need to expose a function from child to parent
  - here we are getting a ref from parent using forward ref and adding that api / method to that ref object using `useImperativeHandle` hook from react

    ```ts
    //Input.tsx

    import { forwardRef, useRef, useImperativeHandle } from 'react';

    export type InputRefType = {
        focus : ()=>void;
        scrollIntoView : ()=>void;
    }

    type PropsType = {}

    const MyInput = forwardRef<InputRefType, PropsType>(function MyInput(props : PropsType, ref) {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
        focus() {
            inputRef.current?.focus();
        },
        scrollIntoView() {
            inputRef.current?.scrollIntoView();
        },
        };
    },
    []);


    // App.tsx
    import { useRef } from 'react';
    import MyInput, {type InputRefType} from './MyInput.js';

    export default function Form() {
    const ref = useRef<InputRefType>(null);

    function handleClick() {
        ref.current.focus();
    }

    return (
        <form>
        <MyInput placeholder="Enter your name" ref={ref} />
        <button type="button" onClick={handleClick}>
            Edit
        </button>
        </form>
    );
    }

    ```
