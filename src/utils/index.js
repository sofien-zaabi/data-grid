// export `concat` function which joins strings by space

export function classList(elt) {
  var list = elt.classList;

  return {
      toggle: function(c) { list.toggle(c); return this; },
      add:    function(c) { list.add   (c); return this; },
      remove: function(c) { list.remove(c); return this; }
  };

} 

export function hasClass(elem, className) {
  return elem.classList.contains(className);
}

export function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }

  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }

  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
}

export function addClass(target, classList) {
  this.addOrRemoveClass(target, classList, true);
};

export function removeClass(target, classList) {
  this.addOrRemoveClass(target, classList, false);
};

export function show(elem) {
  elem.style.opacity = '';
  elem.style.display = elem.id === swalClasses.content ? 'block' : 'flex';
}
export function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
}

// jquery implementation
export function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

export function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
}

export function elementByClass(className) {
  var container = getContainer();
  return container ? container.querySelector('.' + className) : null;
}

export function getPopup() {
  return elementByClass(swalClasses.popup);
}

export function getIcons() {
  var popup = getPopup();
  return toArray(popup.querySelectorAll('.' + swalClasses.icon));
} 

export function getTitle() {
  return elementByClass(swalClasses.title);
}

export function getContent() {
  return elementByClass(swalClasses.content);
}


export function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

export function prefix(items) {
	var result = {};

	for (var i in items) {
	  result[items[i]] = swalPrefix + items[i];
	}

	return result;
}

