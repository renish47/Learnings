# Typescript compiler

```ts
// creates a typescript config file
tsc init
//Watches all files in the root dir
tsc -w
```

#### Including and Excluding files

```js
//ts.config.json
{
    "exclude":[
    "node_modules",
    //excludes all file with this extension
    "*.dev.ts",
    //excludes all file with this extension IN ALL FOLDERS
    "**/*.dev.ts"
    ],
    "include" :[]
}
```

#### Other configs

- `sourceMap` - Turning on this will make the TS file to be available in the browser along with JS file in the Source tab of the DevTool, which could be using in Debugging our TS code
  <br>
- `noEmitOnError` - This makes sure that not to compile the TS file to JS file if there is an Type Error
  ```js
      //ts.config.json
      {
          "noEmitOnError" : true,
      }
  ```
  <br>
