import {create,Text,Wrapper} from './createElement';
import { Animation,Timeline } from './animation';
import { ease } from './cubicBezier';
import { enableGesture } from './gesture';
export class Carousel{
    constructor(){
        this.children = [];
    }
    
    setAttribute(name,value){
        this[name] = value;
    }

    appendChild(child){
       this.children.push(child);
    }
    
    mountTo(parent){
        this.render().mountTo(parent);
    }

    render(){
        let timeLine = new Timeline();
        timeLine.start();

        let position = 0;

        let nextPicStopHandler = null;

        let children = this.data.map((url,currentPosition)=>{
            let nextPosition = (currentPosition + 1) % this.data.length;
            let lastPosition = (currentPosition -1 + this.data.length) % this.data.length;
            let offset =0;
            let onStart = ()=>{
                timeLine.pause();
                clearTimeout(nextPicStopHandler);
                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            };
            let onPan = ({detail})=>{
                let event = detail;
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];
                let lastElement = children[lastPosition];

                let dx = event.clientX - event.startX;

                let  currentTransformValue = - 500 * currentPosition + offset  + dx;
                let  lastTransformValue= - 500 - 500 * lastPosition + offset + dx;
                let  nextTransformValue= 500 - 500 * nextPosition + offset + dx;

                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;
                lastElement.style.transform = `translateX(${lastTransformValue}px)`;

            }
            let onPanEnd = ({detail})=>{
                let event = detail;
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];
                let lastElement = children[lastPosition];
                let direction = 0;
                let dx = event.clientX - event.startX;
                if(dx + offset > 250){
                    direction = 1;
                }else if(dx + offset < - 250){
                    direction = -1;
                }

                timeLine.reset();
                timeLine.start();

                let currentTransformValue = {
                    start:- 500 * currentPosition + offset  + dx,
                    end:- 500 * currentPosition  + direction * 500
                };
                let lastTransformValue  = {
                    start:- 500 - 500 * lastPosition + offset + dx,
                    end: - 500 - 500 * lastPosition + direction * 500
                };
                let nextTransformValue = {
                    start:500 - 500 * nextPosition + offset + dx,
                    end: 500 - 500 * nextPosition + direction * 500
                };

                let currentAnimation = new Animation(currentElement.style,'transform',currentTransformValue.start,currentTransformValue.end,500,0,ease,v=>`translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style,'transform',nextTransformValue.start,nextTransformValue.end,500,0,ease,v=>`translateX(${v}px)`);
                let lastAnimation = new Animation(lastElement.style,'transform',lastTransformValue.start,lastTransformValue.end,500,0,ease,v=>`translateX(${v}px)`);
                
                timeLine.add(currentAnimation);
                timeLine.add(nextAnimation);
                timeLine.add(lastAnimation);
                
                position = (position - direction + this.data.length) % this.data.length;

                nextPicStopHandler = setTimeout(nextPic,3000);
            }
            let element = <img src={url} onStart={onStart} onPanstart={onPan} onPanmove={onPan} onPanend= {onPanEnd}  enableGesture={true}/>

            element.style.transform = `translateX(0px)`

            element.addEventListener('dragstart',event=>event.preventDefault())
            return element
         })

        let root = <div class="carousel"> {children}</div>
       
        let nextPic = ()=>{
            let nextPosition = (position + 1) % this.data.length

            let current = children[position]
            let next = children[nextPosition]

            let currentAnimation = new Animation(current.style,'transform',-100 * position,-100 -100 * position,500,0,ease,v=>`translateX(${5 * v}px)`)
            let nextAnimation = new Animation(next.style,'transform',100 -100 * nextPosition,-100  * nextPosition,500,0,ease,v=>`translateX(${5 * v}px)`)

            timeLine.add(currentAnimation)
            timeLine.add(nextAnimation)
            position = nextPosition

            nextPicStopHandler = setTimeout(nextPic,3000)
        }
        nextPicStopHandler = setTimeout(nextPic,3000)

        return root
     }
}