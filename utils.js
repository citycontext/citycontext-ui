var fromHTML = function fromHTML(html) {
  var container = document.createElement('div');
  container.innerHTML = html;
  var nodeList = container.childNodes;
  return Array.prototype.slice.call(nodeList);
};

var findInNodes = function findInNodes(nodes, selector) {
  return nodes.reduce(function(acc, node) {
    return acc || node.querySelector(selector);
  }, null);
};

module.exports = {
  fromHTML: fromHTML,
  findInNodes: findInNodes
};
