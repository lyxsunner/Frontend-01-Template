var parser = require('./parser')

module.exports = function(source, map) {
  // console.log('!!!!!!!!!!!!!!!', source)
  let tree = parser.parseHTML(source)
  // console.log(tree.children[2].children[0].content)

  let template = null;
  let script = null;

  for(let node of tree.children){
    if(node.tagName == 'template'){
      template = node
    }
    if(node.tagName == 'script'){
      script = node.children[0].content
    }
  }

  let createCode = ''

  let visit = (node) => {
    if(node.type === 'text'){
      return JSON.stringify(node.content)
    }
    let attrs = {}
    for(let i of node.attributes){
      attrs[i.name] = i.value
    }
    let children = node.children.map(i => visit(node));
    return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
  }

  

  let r = `
    class Carousel {
      render() {
        return ${visit(template, 0)}
      }
    }
  `
  console.log(r)
  return ``
}