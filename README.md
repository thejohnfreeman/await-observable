# await-observable

Asynchronous functions for observables.

[![npm](https://img.shields.io/npm/v/@thejohnfreeman/await-observable.svg)](https://www.npmjs.com/package/@thejohnfreeman/await-observable)
[![code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![build status](https://travis-ci.org/thejohnfreeman/await-observable.svg?branch=master)](https://travis-ci.org/thejohnfreeman/await-observable)

A [longer version][] of the justification for this library is available on my
blog. In brief, we're missing the observable equivalent of asynchronous
functions. Chaining operators like `map`, `filter`, and `catchError` with
observables that yield a single value is as painful as chaining callbacks on
promises. Asynchronous functions let us write asynchronous code in
a synchronous style, which is easier to read, write, and comprehend. Short of
native syntax like `async`/`await`, we can offer a decorator for generator
functions.

[longer version]: https://medium.com/@thejohnfreeman/escaping-pipeline-hell-38d962f66d31


## Usage

```typescript
import { async } from '@thejohnfreeman/await-observable'

const logIn = async(function*({ username, password }) {
  try {
    const token = yield ajax.getJSON(
      'https://example.com/login', { username, password })
    return { value: token }
  } catch (cause) {
    return { error: 'Wrong username or password.' }
  }
})

const observable = logIn({ username, password }) // Request not yet sent.
const subscription = observable.subscribe( // Request sent now.
  ({ value }) => console.log('token', value),
  ({ error }) => console.error('error', error),
)
subscription.unsubscribe() // Request canceled.
```

## FAQ

### Why did you name your export `async`?

To mimic asynchronous function syntax as closely as possible. If you don't
like that style, you can easily rename it:

```typescript
import { async as myFavoriteName } from '@thejohnfreeman/await-observable'
```
