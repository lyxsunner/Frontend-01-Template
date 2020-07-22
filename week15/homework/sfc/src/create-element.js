export function create(Cls, attributes, ...children) {
    let o = typeof Cls === "string" ? new Wrapper(Cls) : new Cls();
    // 处理 attributes
    for (let name in attributes) {
      o.setAttribute(name, attributes[name]);
    }
    // 处理 child
    let visit = (children) => {
      for (let child of children) {
        if (typeof child === "object" && child instanceof Array) {
          visit(child);
          continue;
        }
        if (typeof child === "string") {
          child = new Text(child);
        }
        o.appendChild(child);
      }
    };
    visit(children);
    return o;
  }
  
  export class Text {
    constructor(text) {
      this.root = document.createTextNode(text);
    }
    mountTo(parent) {
      parent.appendChild(this.root);
    }
  }
  
  export class Wrapper {
    constructor(type) {
      this.children = [];
      this.root = document.createElement(type);
    }
  
    setAttribute(name, value) {
      this.root.setAttribute(name, value);
    }
  
    get style() {
      return this.root.style;
    }
  
    mountTo(parent) {
      parent.appendChild(this.root);
      for (let child of this.children) {
        child.mountTo(this.root);
      }
    }
  
    addEventListener() {
      this.root.addEventListener(...arguments);
    }
  
    appendChild(child) {
      this.children.push(child);
    }
  }
  
  export class Carousel {
    constructor(config) {
      this.children = [];
    }
  
    setAttribute(name, value) {
      this[name] = value;
    }
  
    mountTo(parent) {
      this.render().mountTo(parent);
    }
  
    appendChild(child) {
      this.children.push(child);
    }
  
    render() {
      let childs = this.data.map((url) => {
        let element = <img src={url} />;
        element.addEventListener("dragstart", (e) => e.preventDefault());
        return element;
      });
      let root = <div class="carousel">{childs}</div>;
  
      let position = 0;
  
      let nextPic = () => {
        let nextPosition = (position + 1) % this.data.length;
  
        let current = childs[position];
        let next = childs[nextPosition];
  
        current.style.transition = `ease 0s`;
        next.style.transition = `ease 0s`;
  
        current.style.transform = `translateX(${-100 * position}%)`;
        next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
  
        setTimeout(() => {
          current.style.transition = `ease 0.7s`;
          next.style.transition = `ease 0.7s`;
  
          current.style.transform = `translateX(${-100 - 100 * position}%)`;
          next.style.transform = `translateX(${-100 * nextPosition}%)`;
  
          position = nextPosition;
        }, 16);
  
        console.log(position);
  
        setTimeout(nextPic, 2000);
      };
      // setTimeout(nextPic, 2000);
      root.addEventListener("mousedown", (event) => {
        let { clientX: sx, clientY: sy } = event;
  
        let nextPosition = (position + 1) % this.data.length;
        let lastPosition = (position - 1 + this.data.length) % this.data.length;
  
        let current = childs[position];
        let next = childs[nextPosition];
        let last = childs[lastPosition];
  
        current.style.transition = "ease 0s";
        next.style.transition = "ease 0s";
        last.style.transition = "ease 0s";
  
        current.style.transform = `translateX(${-500 * position}px)`;
        next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
        last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
  
        let move = (event) => {
          current.style.transform = `translateX(${
            event.clientX - sx - 500 * position
          }px)`;
          next.style.transform = `translateX(${
            event.clientX - sx + 500 - 500 * nextPosition
          }px)`;
          last.style.transform = `translateX(${
            event.clientX - sx - 500 - 500 * lastPosition
          }px)`;
        };
        let up = (event) => {
          let offset = 0;
  
          if (event.clientX - sx > 250) {
            offset = 1;
          } else if (event.clientX - sx < -250) {
            offset = -1;
          }
  
          current.style.transition = "ease 0.7s";
          next.style.transition = "ease 0.7s";
          last.style.transition = "ease 0.7s";
  
          current.style.transform = `translateX(${
            offset * 500 - 500 * position
          }px)`;
          next.style.transform = `translateX(${
            offset * 500 + 500 - 500 * nextPosition
          }px)`;
          last.style.transform = `translateX(${
            offset * 500 - 500 - 500 * lastPosition
          }px)`;
  
          position = (position - offset + this.data.length) % this.data.length;
  
          document.removeEventListener("mousemove", move);
          document.removeEventListener("mouseup", up);
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
      });
      return root;
    }
  }