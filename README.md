# slashdot-api-client 
[![build status](https://badgen.net/travis/vladimyr/slashdot-api-client/master)](https://travis-ci.com/vladimyr/slashdot-api-client) [![install size](https://badgen.net/packagephobia/install/slashdot-api-client)](https://packagephobia.now.sh/result?p=slashdot-api-client) [![npm package version](https://badgen.net/npm/v/slashdot-api-client)](https://npm.im/slashdot-api-client) [![github license](https://badgen.net/github/license/vladimyr/slashdot-api-client)](https://github.com/vladimyr/slashdot-api-client/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

> Slashdot API client for node

## Installation

    $ npm i slashdot-api-client

## Usage

```js
const slashdot = require('slashdot-api-client');

// Fetch latest stories
slashdot.fetchStories()
  .then(stories => {
    stories.map((it, i) => console.log('[%d] %s', i + 1, it.title));
  });

//=> [1] LSD Changes Something About the Way People Perceive Time, Even At Microdoses
//=> [2] Facebook Is Shutting Down Moments
//=> [3] The Apple Mac Turns 35 Years Old
//=> ...
//=> [50] US Patent Operations May Shut Down In Second Week of February
```
