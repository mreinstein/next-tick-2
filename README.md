# next-tick-2

Environment agnostic nextTick polyfill

[![Build Status](https://api.travis-ci.org/medikoo/next-tick.png?branch=master)](https://travis-ci.org/medikoo/next-tick)

A commonjs module that need nextTick functionality. Works in the node and the browser.

- When run in Node.js `process.nextTick` is used
- In modern browsers microtask resolution is guaranteed by `MutationObserver`
- In other engines `setImmediate` or `setTimeout(fn, 0)` is used as fallback.
- If none of the above is supported module resolves to `null`

## Installation
### NPM

In your project path:

	$ npm install next-tick

#### Browser

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

## Tests

	$ npm test
