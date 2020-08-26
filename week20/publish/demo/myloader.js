const parser = require('./parser.js');
module.exports = function (source, map) {
    let tree = parser.parseHTML(source);
    console.log(tree.children);
    let template = null;
    let script = null;
    for (let node of tree.children) {
        if (node.tagName === 'template') {
            template = node;
        }
        if (node.tagName === 'script') {
            script = node.children[0].content;
        }
    }
    let visit = (node) => {
        if (node.type === 'text') {
            return JSON.stringify(node.content);
        }
        let attrs = {};
        for (const attr of node.attributes) {
            attrs[attr.name] = attr.value;
        }
        let children = node.children.map(node => visit(node));
        return ` createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`;
    }
    visit(template, 0);
    let r = `
    import { createElement, Text, Wrapper } from './createElement';
    export class Cls {
        setAttribute(name, v) {
            this[name] = v;
        }
        render() {
            return ${visit(template)}
        }
        mountTo(parent) {
            this.render().mountTo(parent);
        }
    }
    `;
    return r;
}