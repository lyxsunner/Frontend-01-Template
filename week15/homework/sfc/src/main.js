// import { Carousel } from "./create-element";
import { Carousel } from './carousel.view'
let component = (
  <Carousel
    data={[
      "./images/6.jpg",
      "./images/8.jpg",
      "./images/15.jpg",
      "./images/16.jpg",
    ]}
  />
);

component.mountTo(document.body);