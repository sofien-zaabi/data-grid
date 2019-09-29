export const isHTML = str => {
  var doc = new DOMParser().parseFromString(str, "text/html");
  return [].some.call(doc.body.childNodes, node => node.nodeType === 1);
}