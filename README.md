

## LESS compiler
This is used in conjunction with the YUI shifter tool.

##### Install Dependencies
* nodejs
* npm

##### Build Dependency

> make

### How to install from npm

npm install -g less-compile-plugin

### How to install from source

> npm install -g .

### How to use:

> less-compile [folder1] [folder2] ...

If no folders are specified, then the compiler will search in the `css` and `assests` folders for less files.

##### Setup with YUI Shifter

For each YUI module, add the less-compile command to the build.json under the exec option.

```javascript
"exec": [
  "less-compile"
]
```