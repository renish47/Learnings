### Basic Setup

- When using typescript with Node.js first we need to install typescript and add an config file. _(Always install typescript locally to the file as well to make sure which version of the typescipt you've used)_

```bash
npm install --save-dev typescript
tsc --init
```

- update the below mentioned config settings,

```js
//tsconfig.json
{
    "target" : "es2018", // whichever is latest
    "moduleResolution" : "node",
    "outDir" : "./dist",
    "rootDir" : "./src"
}
```

- Run `tsc -w` to listen for changes in ts files
  <br>
- Add `"start" : "node dist/app.js"` to package.json file
  <br>

> Use `Nest.js` which is a Node + Typescript framework and doesn't need any setting up work as it comes with all the features of ts baked in out of the box itself
