# Tips and Tricks

- Use `!` at the end to mark that the variable wont be `null` so that typescript don't need to worry about it.

```ts
// Here we are saying to the TS that there will be a button
// by marking with ! at the end
const button = document.querySelector("#loginButton")!;

button.addEventListener("click", () => console.log("clicked!"));
```
