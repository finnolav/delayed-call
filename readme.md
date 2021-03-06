# delayed-call

[![Version](https://badge.fury.io/js/delayed-call.svg)](http://badge.fury.io/js/delayed-call)&nbsp;
[![Build Status](https://travis-ci.org/finnolav/delayed-call.svg?branch=master)](https://travis-ci.org/finnolav/delayed-call)&nbsp;
[![Coverage Status](https://coveralls.io/repos/github/finnolav/delayed-call/badge.svg?branch=master)](https://coveralls.io/github/finnolav/delayed-call?branch=master)&nbsp;
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)&nbsp;
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


> For making delayed function calls

Pass any number of arguments to the delayed function. Delayed calls can be cleared between creation and execution. Clear single delayed call or all at once.

## Install

```
$ npm install --save delayed-call
```

## API
### create(ms, fn, [...args])
> Create a delayed call

#### Parameters
`ms` : `number`  
Delay in milliseconds.

`fn` : `function`  
The function to be called after the delay.

`...args` : `*`  
Optional. Any number of arguments supplied to the delayed function.

#### Returns
`id` : `number`  
The id of the delayed call.

#### Usage
```js
const delayedCall = require('delayed-call');
```

```js
delayedCall.create(500, () => {
    console.log('I am delayed');
});

// Prints "I am delayed" after 500 ms.
```

```js
delayedCall.create(1000, (arg1, arg2) => {
  console.log(arg1 + ' ' + arg2);
}, 'Hello', 'world!');

// Prints "Hello world!" after 1000 ms.
```
&nbsp;
### clearById(id)
> Clear a single created delayed call

#### Parameters
`id` : `number`  
The id of the delayed call to be cleared.

#### Usage
```js
const delayId = delayedCall.create(500, () => {
    console.log('Hello!');
});

delayedCall.clearById(delayId);

// Prints nothing.
// The delayed call is cleared before execution.
```
&nbsp;
### clearAll()
> Clear all created delayed calls

#### Usage
```js
delayedCall.create(500, () => {
    console.log('Hello');
});
delayedCall.create(1000, () => {
    console.log('world!');
});

delayedCall.clearAll();

// Prints nothing.
// The delayed calls are cleared before execution.
```
&nbsp;
## License
MIT © Finn-Olav Myrvold