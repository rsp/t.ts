t.ts
====
A standard of adding TypeScript type definitions for JavaScript modules.

An alternative to d.ts file.

How
---
In a `t.ts` file you just:

- import untyped symbols and re-export as typed variables

Example:

```ts
import { caught as _caught } from './caught.js';

export const caught: <T>(promise: Promise<T>) => Promise<T> = _caught;
```

Then in other code you just import the `.t.ts` file instead of a `.js` file.

Why
---
There is no one standard to reference d.ts files that would work for all runtimes:

- [Deno issue #2934: Reconsider the API for declaration files](https://github.com/denoland/deno/issues/2934)

The `t.ts` idea is just using plain TypeScript that is already there with nothing new.

In that sense it is more like JSON than like YAML, i.e. it is doscovered rather than invented.

Tests
-----
Let's say that we have an untyped JavaScript module called `caught.js`:

```js
export const caught = (f => p => (p.catch(f), p))(() => {});
```

When we import it directly and we use a wrong type of argument:
```ts
import { caught } from './caught.js';

caught('wrong argument');
```
Then we don't get a compile time error but we get a runtime error:
```
error: Uncaught TypeError: p.catch is not a function
► file:///Users/rsp/deno/git/t.ts/caught.js:1:42

1 export const caught = (f => p => (p.catch(f), p))(() => {});
                                           ^

    at file:///Users/rsp/deno/git/t.ts/caught.js:1:42
    at file:///Users/rsp/deno/git/t.ts/test-untyped.ts:3:1
```
When we import the `t.ts` file and use a wrong type of argument:
```ts
import { caught } from './caught.t.ts';

caught('wrong argument');
```
We get a compile time error before running the program:
```
error TS2345: Argument of type '"wrong argument"' is not assignable to parameter of type 'Promise<unknown>'.

► file:///Users/rsp/deno/git/t.ts/test-typed.ts:3:8

3 caught('wrong argument');
         ~~~~~~~~~~~~~~~~
```
which is the same effect that you would expect from adding `d.ts` type definitions,
but with using only plain TypeScript files that can be imported directly.

References
----------

Examples are based on the `caught` module for Node an Deno:

- https://github.com/rsp/node-caught
- https://github.com/rsp/deno-caught

Issues
------
For any bug reports or feature requests please
[post an issue on GitHub][issues-url].

Author
------
[**Rafał Pocztarski**](https://pocztarski.com/)
<br/>
[![Follow on GitHub][github-follow-img]][github-follow-url]
[![Follow on Twitter][twitter-follow-img]][twitter-follow-url]
<br/>
[![Follow on Stack Exchange][stackexchange-img]][stackoverflow-url]

License
-------
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.

[github-url]: https://github.com/rsp/t.ts
[readme-url]: https://github.com/rsp/t.ts#readme
[issues-url]: https://github.com/rsp/t.ts/issues
[license-url]: https://github.com/rsp/t.ts/blob/master/LICENSE.md
[travis-url]: https://travis-ci.org/rsp/t.ts
[travis-img]: https://travis-ci.org/rsp/t.ts.svg?branch=master
[snyk-url]: https://snyk.io/test/github/rsp/t.ts
[snyk-img]: https://snyk.io/test/github/rsp/t.ts/badge.svg
[david-url]: https://david-dm.org/rsp/t.ts
[david-img]: https://david-dm.org/rsp/t.ts/status.svg
[install-img]: https://nodei.co/npm/caught.png?compact=true
[downloads-img]: https://img.shields.io/npm/dt/caught.svg
[license-img]: https://img.shields.io/npm/l/caught.svg
[stats-url]: http://npm-stat.com/charts.html?package=caught
[github-follow-url]: https://github.com/rsp
[github-follow-img]: https://img.shields.io/github/followers/rsp.svg?style=social&logo=github&label=Follow
[twitter-follow-url]: https://twitter.com/intent/follow?screen_name=pocztarski
[twitter-follow-img]: https://img.shields.io/twitter/follow/pocztarski.svg?style=social&logo=twitter&label=Follow
[stackoverflow-url]: https://stackoverflow.com/users/613198/rsp
[stackexchange-url]: https://stackexchange.com/users/303952/rsp
[stackexchange-img]: https://stackexchange.com/users/flair/303952.png
