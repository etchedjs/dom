# @etchedjs/dom

[![](https://raw.githubusercontent.com/Lcfvs/library-peer/main/badge.svg)](https://github.com/Lcfvs/library-peer#readme)

A utility to write some DOM elements, based on [`@etchedjs/etched`](../etched).


## Install

`npm i @etchedjs/dom`


### Implementations

* [`@etchedjs/html`](../html)


## Exports

### Models

#### `dom`

A base model etched by the following models


#### `node`

A base model etched by the following node-related models


#### `children`

A model that wrap the element children, it etches `dom`

The children must be named and can be filled by

* Elements
* Strings (resolved as `TextNode`)
* Arrays of elements and/or strings (useful to permit any number of contents)


#### `attribute`

A model that represent an element attribute, it etches `dom.node`


#### `dataset`

A model that wrap the element dataset, it etches `dom.node`


#### `element`

A model that represent an element, it etches `dom.node`


### Methods

#### declare

```js
declare(element, { children = null, dataset = null, ...attributes } = {})
```

Returns an etched model of the provided element, etched with the provided properties.

It can be used, to create some spec/custom elements.


#### fill

```js
fill(element, { children = null, dataset = null, ...attributes } = {})
```

Returns the provided element, etched with the provided properties.

Basically, it fills an element with the provided data.


#### fragment

```js
fragment(document, ...nodes)
```

Returns a `DocumentFragment` containing the provided nodes as DOM nodes

Need a **server-side** `document`? Just import it from `@etchedjs/dom/document.js`


#### serialize

```js
serialize(fragment)
```

Returns a string containing fragment source


## Licence

MIT
