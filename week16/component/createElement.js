import {
    enableGesture
} from './gesture';
export function create(Cls, attributes, ...children) {
    let o;
    if (typeof Cls === "string") {
        o = new Wrapper(Cls)
    } else {
        o = new Cls()
    }
    for (const name in attributes) {
        o.setAttribute(name, attributes[name])
    }
    let visit = (children) => {
        for (const child of children) {
            if (typeof child === 'string') {
                child = new Text(child)
            } else if (typeof child === 'object' && child instanceof Array) {
                visit(child)
                continue
            }
            o.appendChild(child)
        }
    }

    visit(children)

    return o
}

export class Wrapper {
    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
    }
    set class(v) {
        console.log('Parent::class', v)
    }
    set id(v) {
        console.log('Parent::id', v)
    }
    get style() {
        return this.root.style
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
        if (name.match(/^on([\s\S]+)$/)) {

            let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLocaleLowerCase())
            this.addEventListener(eventName, value)
        }
        if (name === "enableGesture") {
            enableGesture(this.root)
        }
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
        for (const child of this.children) {
            child.mountTo(this.root)
        }
    }
    addEventListener() {
        this.root.addEventListener(...arguments)
    }
}
export class Text {
    constructor(text) {
        this.children = []
        this.root = document.createTextNode(text)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}