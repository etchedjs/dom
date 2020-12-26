import { etch, etches, model } from '@etchedjs/etched'

let serializer

export const dom = model()

export const node = model(dom)

export const children = model(dom)

export const attribute = model(node)

export const dataset = model(dom)

export const element = model(node)

const scopes = {
  children,
  dataset
}

function append (child = null) {
  if (child !== null) {
    if (Array.isArray(child)) {
      child.forEach(append, this)
    } else if (etches(element, child)) {
      appendElement(this, child)
    } else {
      appendText(this, `${child}`)
    }
  }
}

function appendElement (parent, { tag, children, dataset, ...attributes }) {
  const element = parent.ownerDocument.createElement(tag)

  Object.entries(attributes).forEach(setAttribute, element)

  if (element.dataset && dataset) {
    Object.entries(dataset).forEach(setData, element)
  }

  if (children) {
    Object.values(children).forEach(append, element)
  }

  parent.appendChild(element)
}

function appendText (parent, value) {
  const text = parent.ownerDocument.createTextNode(value)

  parent.appendChild(text)
}

function setAttribute ([name, value = null]) {
  if (value !== null) {
    this.setAttribute(name, value)
  }
}

function setData ([name, value = null]) {
  if (value !== null) {
    this.dataset[name] = value
  }
}

export function declare (element, {
  children = null,
  dataset = null,
  ...attributes
} = {}) {
  const rest = {}

  if (children) {
    rest.children = model(element.children || scopes.children, children)
  }

  if (dataset) {
    rest.dataset = model(element.dataset || scopes.dataset, dataset)
  }


  return etch(model(etch(element, attributes)), rest)
}

export function fill (element, {
  children = null,
  dataset = null,
  ...attributes
} = {}) {
  if (children) {
    attributes.children = etch(element.children, children)
  }

  if (dataset) {
    attributes.dataset = etch(element.dataset, dataset)
  }

  return etch(element, attributes)
}

export function fragment (document, ...nodes) {
  const fragment = document.createDocumentFragment()

  nodes.forEach(append, fragment)

  return fragment
}

export function serialize (fragment) {
  if (!serializer) {
    const { ownerDocument } = fragment
    const { defaultView } = ownerDocument
    const { XMLSerializer } = defaultView

    serializer = new XMLSerializer()
  }

  return serializer.serializeToString(fragment)
}
