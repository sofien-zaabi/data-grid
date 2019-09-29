const tagBlacklist_ = {
  'APPLET': true, 'BASE': true, 'BASEFRONT': true, 'COMMAND': true, 'EMBED': true, 'FRAME': true, 'FRAMESET': true, 'IFRAME': true, 'KEYGEN': true, 'LINK': true, 'META': true,
  'NOFRAMES': true, 'NOSCRIPT': true, 'OBJECT': true, 'PARAM': true, 'SCRIPT': true, 'TITLE': true};

const attributeWhitelist_ = { 'align': true, 'color': true, 'controls': true, 'height': true, 'href': true, 'src': true, 'value': true, 'name': true, 'checked': true, 'style': true, 'target': true, 'title': true, 'type': true, 'width': true, 'onclick': true, 'onchange': true, 'onfocus': true };

const cssWhitelist_ = { 'color': true, 'background-color': true, 'font-size': true, 'text-align': true, 'text-decoration': true, 'font-weight': true };

const schemaWhiteList_ = [ 'http:', 'https:', 'data:', 'm-files:', 'file:', 'ftp:' ]; //which "protocols" are allowed in "href", "src" etc

const uriAttributes_ = { 'href': true, 'action': true };

export const sanitizeHTML = input => {
  let isHTML = false;
  if(typeof input !== 'string') return null;
  input = input.trim();
  if (input == "") return null; //to save performance

  //firefox "bogus node" workaround
  if (input == "<br>") return null;
  var doc = new DOMParser().parseFromString(input, "text/html");
  function makeSanitizedCopy(node) {
    //let newNode;
    if (node.nodeType == Node.TEXT_NODE) {
      //newNode = node.cloneNode(true);
      return node;
    } else if (node.nodeType == Node.ELEMENT_NODE) {
      isHTML = true;
      
      if(tagBlacklist_[node.tagName]) {
        node.parentNode.removeChild(node);
        return null;
      } else {
        for (let i = 0; i < node.attributes.length; i++) {
          let attr = node.attributes[i];
          if(!attributeWhitelist_[attr.name]) {
            node.removeAttribute(attr.name);
          } else {
            if (attr.name == "style") {
              for (s = 0; s < node.style.length; s++) {
                let styleName = node.style[s];
                if (!cssWhitelist_[styleName])
                  node.style.removeProperty(styleName);
              }
            }
            else {
              if (uriAttributes_[attr.name]) { //if this is a "uri" attribute, that can have "javascript:" or something
                if (attr.value.indexOf(":") > -1 && !startsWithAny(attr.value, schemaWhiteList_))
                  node.removeAttribute(attr.name)
              }
            }
          }
        }
        for (let i = 0; i < node.childNodes.length; i++) {
          makeSanitizedCopy(node.childNodes[i]);
        }
        return node;
      }
    } else {
      return null;
    }
  };
  let docFrag = document.createDocumentFragment();
  [].forEach.call(doc.body.childNodes, node => {
    let sanitizedNode = makeSanitizedCopy(node);
    if (sanitizedNode) docFrag.appendChild(sanitizedNode);
  });
  return isHTML ? docFrag : null;
}

const  startsWithAny = (str, substrings) => {
  for (let i = 0; i < substrings.length; i++) {
    if (str.indexOf(substrings[i]) == 0) {
      return true;
    }
  }
  return false;
}

/* const  cleanHTML = node => {
  for(let n = 0; n < node.childNodes.length; n ++) {
    let child = node.childNodes[n];
    if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
      node.removeChild(child);
      n --;
    } else if(child.nodeType === 1) {
      cleanHTML(child);
    }
  }
} */