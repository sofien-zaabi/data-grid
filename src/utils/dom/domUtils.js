


export const hasClass = (elem, className) => {
  return elem.classList.contains(className)
}

export const focusInput = (input) => {
  input.focus()

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915
    const val = input.value
    input.value = ''
    input.value = val
  }
}

const addOrRemoveClass = (target, classList, add) => {
  if (!target || !classList) {
    return
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean)
  }
  classList.forEach((className) => {
    if (target.forEach) {
      target.forEach((elem) => {
        add ? elem.classList.add(className) : elem.classList.remove(className)
      })
    } else {
      add ? target.classList.add(className) : target.classList.remove(className)
    }
  })
}

export const addClass = (target, classList) => {
  addOrRemoveClass(target, classList, true)
}

export const removeClass = (target, classList) => {
  addOrRemoveClass(target, classList, false)
}

export const getChildByClass = (elem, className) => {
  for (let i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i]
    }
  }
}

export const show = (elem) => {
  elem.style.opacity = ''
  elem.style.display = 'block'
}

export const hide = (elem) => {
  elem.style.opacity = ''
  elem.style.display = 'none'
}

export const isVisible = (elem) => elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)

/*
*
*
*/
export const createElement = (type, attributes, children) => {
  const el = document.createElement(type)
  setAttrs(el, attributes);
  
  if(children) {
    if(Array.isArray(children)) {
      children.forEach(child => appenChild(child,el))
    }else {
      appenChild(children,el);
    }
  }
  
  return el
}

export const getGridBody = id => {
  return document.getElementById(id) ? document.getElementById(id).tBodies[0] : null;
}

const appenChild = (child, elem) => {
  if(elem) {
    if (typeof child === 'string' || typeof child === 'number') {
      elem.appendChild(document.createTextNode(child))
    } else if (child instanceof Node) {
      elem.appendChild(child)
    }
  }
}

export const setAttrs = (elem, attrs) => {
  if(elem) {
    for (let key in attrs) {
      elem.setAttribute(key, attrs[key])
    }
  }
}
