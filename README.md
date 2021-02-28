# fs-concat

> Concatenate multiple files.

## Usage

```js

const concat = require('fs-concat');

const fileList = [
  // ...
];
const dest = 'xxx/xxx/path';
concat(fileList, dest).then(()=> {
  console.log('done');
});

```
