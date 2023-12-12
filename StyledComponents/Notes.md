# Styled Components

![Alt text](image.png)

![Alt text](image-1.png)
<br>

### Installation

```bash
npm install styled-components
```

<br>

### Basic:

![Alt text](image-2.png)

- Import `styled` from styled components;
- This object has built in method for all elements, and using `Tagged template literal` from ES6, we are passing the arguments for the method.
- Inside `` type the css styles we need to apply
- This function returns jsx with all the styles applied
  <br>

### Working with Styled components:

- Adding pesudo classes
  ![Alt text](image-5.png)
  <br>
- Extending Styled components
  ![Alt text](image-4.png)
  <br>
- Adding attributes to the styled components
  ![Alt text](image-3.png)
  - we can also pass anonymous function which returns an object with all the congif as argument in `attrs`
    ![Alt text](image-6.png)
    <br>
- Adding Animation (Import `keyframes` from styled components and pass the created keyframe variable to the animation)
  ![Alt text](image-7.png)
  <br>
- We can also add `theme provider` to provide theme prop globally and `globalStyles`
  ![Alt text](image-8.png)
