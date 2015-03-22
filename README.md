# React-Integration

[![SemVer]](http://semver.org)
[![License]](https://github.com/tjunghans/react-integration/blob/master/LICENCE)

Runs an integration server for previewing a react component in the
browser. For an example have a look at the integration directory of [react-list](https://github.com/tjunghans/react-list/tree/master/integration).


## Install

Install as node dev dependency:

```
npm install react-integration --save-dev
```


## Usage

Given the following directory structure as an example:

- css
- integration
- lib
- node_modules
- test
- package.json
- README.md
- etc

The 'lib' directory will contain the (react) component. It does not necessarily have to be a react component, but that is what is was initially created for.

### Integration directory

The 'integration' directory is the one you create to use 'react-integration'. It contains the following files:

- browser.js
- package.json
- server.js


#### browser.js

```js
'use strict';

var React = require('react');
var component = require('../');

// .widget is a node you can use to attach `component` to
var widget = document.querySelector('.widget');

React.render(React.createElement(component), widget);
```


#### package.json

```js
{
  "name": "integration",
  "version": "0.0.0",
  "browser": "./browser",
  "main": "./server",
  "private": true
}
```


#### server.js

```js
'use strict';
require('react-integration')(__dirname + '/..');
```


### CSS directory

Contains stylus files (.styl) used to style the component. At this moment only stylus is supported.

In the package.json:

```js
"stylus": "./css/main.styl",
```


## API

require('react-integration') returns a function which takes a path (String) as an argument. The function returns the instance of `express`.


## License

MIT

[SemVer]: http://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[License]: http://img.shields.io/npm/l/mochify.svg
