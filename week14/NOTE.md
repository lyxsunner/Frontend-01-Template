# 组件化
## JSX 实现

```js

export function createElement(Cls, attributes, ...children) {

  let o;
  if (typeof Cls === "string") {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {},
    });
  }
  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }
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
```

```js
export class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}
```

```js
export class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    this.children.push(child);
  }
  addEventListener() {
    this.root.addEventListener(...arguments);
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
}
```
## 轮播图组件开发

### 图片定时切换

```js
let nextPic = () => {
  const nextPosition = (position + 1) % this.data.length;
  const current = this.root.childNodes[position];
  const next = this.root.childNodes[nextPosition];
  current.style.transition = "ease 0s";
  next.style.transition = "ease 0s";
  current.style.transform = `translateX(${-100 * position}%)`;
  next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;
  // 第一种方式，等同于setTimeout
  // requestAnimationFrame(() => {
  //   requestAnimationFrame(() => {
  //     current.style.transition = "ease 0.5s";
  //     next.style.transition = "ease 0.5s";
  //     current.style.transform = `translateX(${-100 - 100 * position}%)`;
  //     next.style.transform = `translateX(${-100 * nextPosition}%)`;
  //     position = nextPosition;
  //   })
  // });
  // 第二种方式
  setTimeout(() => {
    current.style.transition = "";
    next.style.transition = "";
    current.style.transform = `translateX(${-100 - 100 * position}%)`;
    next.style.transform = `translateX(${-100 * nextPosition}%)`;
    position = nextPosition;
  }, 16);
  setTimeout(nextPic, 3000);
};
setTimeout(nextPic, 3000);
```
### 鼠标拖放
```js
this.root.addEventListener("mousedown", (event) => {
  let startX = event.clientX,
    startY = event.clientY;
  const nextPosition = (position + 1) % this.data.length;
  const lastPosition = (position - 1 + this.data.length) % this.data.length;
  const current = this.root.childNodes[position];
  const next = this.root.childNodes[nextPosition];
  const last = this.root.childNodes[lastPosition];
  current.style.transition = "ease 0s";
  next.style.transition = "ease 0s";
  last.style.transition = "ease 0s";
  current.style.transform = `translateX(${-500 * position}px)`;
  next.style.transform = `translateX(${-500 - 500 * nextPosition}px)`;
  last.style.transform = `translateX(${500 - 500 * lastPosition}px)`;
  let move = (event) => {
    current.style.transform = `translateX(${
      event.clientX - startX - 500 * position
    }px)`;
    next.style.transform = `translateX(${
      event.clientX - startX + 500 - 500 * nextPosition
    }px)`;
    last.style.transform = `translateX(${
      event.clientX - startX - 500 - 500 * lastPosition
    }px)`;
    console.log(event.clientX - startX, event.clientX - startY);
  };
  let up = (event) => {
    let offset = 0;
    if (event.clientX - startX > 250) {
      offset = 1; // 往右拖动
    } else if (event.clientX - startX < -250) {
      offset = -1; // 往左拖动
    }
    current.style.transition = "";
    next.style.transition = "";
    last.style.transition = "";
    current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
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
```

## 额外内容
html parser
vueJS 的 SFC
jsx
都可以用来实现我们的组件化

## 安装jsx环境
```shell script
npm init -y
yarn add -D webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/plugin-transform-react-jsx
```

##
使用 jsx 创建的组件树，实例化时是先实例化子组件，然后再实例化父组件，因为 jsx 语法会变编译为函数调用，而子组件都是作为额外的参数传递给父组件的，
比如下面这样的一个jsx表达式：
```jsx
let component = <MyComponent title="hello" data={1234}>
    <div class="abc">test</div>
    <span>test2</span>
</MyComponent>
```

会被编译为下面的函数调用：
```js
var component = createElement(MyComponent, {
    title: 'hello',
    data: 1234
}, createElement("div", {class: "abc"}, "text"),
createElement("span", null, "text2"))
```
而调用一个函数的时候，会先对该函数的参数进行求值，所以就导致 `createElement("div")` 和 `createElement("span")` 会先于 `createElement(MyComponent)`
调用，因此也就导致子组件先进行实例化。


```css
*:not(path):not(g) {
  color:                    hsla(210, 100%, 100%, 0.9) !important;
  background:               hsla(210, 100%,  50%, 0.5) !important;
  outline:    solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;
  box-shadow: none !important;
}
```

- requestAnimationFrame
  - 注意点：使用h5的js动画，需要调用requestAnimationFrame方法两次
  - requestAnimationFrame只运行一次传入的函数，需要再次更新就需要再次调用requestAnimationFrame，类似递归调用同一方法来不断更新画面以达到动起来的效果
