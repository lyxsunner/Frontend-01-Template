import { createElement, Text, Wrapper } from "./util";

class Carousel {
  constructor(config) {
    this.children = [];
    this.attribute = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    const children = this.data.map((url) => (
      <img src={url} draggable="false" />
    ));
    const root = <div class="carousel">{children}</div>;

    let position = 0;
    let nextPic = () => {
      const nextPosition = (position + 1) % this.data.length;
      const current = children[position];
      const next = children[nextPosition];

      current.style.transition = "ease 0s";
      next.style.transition = "ease 0s";

      current.style.transform = `translateX(${-100 * position}%)`;
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

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

    root.addEventListener("mousedown", (event) => {
      let startX = event.clientX;
      const nextPosition = (position + 1) % this.data.length;
      const lastPosition = (position - 1 + this.data.length) % this.data.length;

      const current = children[position];
      const next = children[nextPosition];
      const last = children[lastPosition];

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

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
const data = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
];
let component = <Carousel data={data} />;

component.mountTo(document.body);