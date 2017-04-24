# next-tick-2

Environment agnostic nextTick polyfill

[![Build Status](https://api.travis-ci.org/mreinstein/next-tick-2.png?branch=master)](https://travis-ci.org/mreinstein/next-tick-2)

A commonjs module that provides nextTick functionality in the node and the browser.

- When run in Node.js `process.nextTick` is used
- In modern browsers microtask resolution is guaranteed by `MutationObserver`
- In other engines `setImmediate` or `setTimeout(fn, 0)` is used as fallback.
- If none of the above is supported module resolves to `null`

