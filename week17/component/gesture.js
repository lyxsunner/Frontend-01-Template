// export function enableGesture(element)
function enableGesture(element) {
    let contexts = Object.create(null)
    let MOUSE_SYMBOL = Symbol('mouse');
    if (!window.Touch) {
        element.addEventListener('mousedown', (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL])
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL])
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL])
                document.removeEventListener('mousemove', mousemove)
                document.removeEventListener('mouseup', mouseend)
            }
            document.addEventListener('mousemove', mousemove)
            document.addEventListener('mouseup', mouseend)
        })
    }

    // touch 事件模型
    element.addEventListener('touchstart', event => {
        for (const touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener('touchmove', event => {
        for (const touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener('touchend', event => {
        for (const touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    element.addEventListener('touchcancel', event => {
        for (const touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    // tap
    // pan - panstart panmove panend
    // flick
    // press pressstart pressend

    // touch 行为抽象
    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent('start', {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        }))
        // 与公共方法有区别 勿用
        element.dispatchEvent(Object.assign(new CustomEvent('start'), {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        }))
        context.startX = point.clientX, context.startY = point.clientY
        context.moves = []
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.timeoutHandleer = setTimeout(() => {
            if (context.isPan) {
                return;
            }
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500)
    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientX - context.startY

        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (!context.isPress)
                element.dispatchEvent(new CustomEvent('pressstart', {}))
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            element.dispatchEvent(new CustomEvent('panstart', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }))
        }

        if (context.isPan) {
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            })
            context.moves = context.moves.filter(record => Date.now() - record.t < 300)
            dspEvent('pan', point, context, element)
            // console.log('move', dx, dy);
        }
    }
    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX,
                dy = point.clientX - context.startY;
            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            let isFlick = speed > 2.5
            if (speed > 2.5) {
                dspEvent('flick', point, context, element)
            }
            dspEvent('panend', point, context, element)
        }
        if (context.isTap)
            element.dispatchEvent(new CustomEvent('tap', {}))
        if (context.isPress)
            element.dispatchEvent(new CustomEvent('pressend', {}))
        clearTimeout(context.timeoutHandleer)
    }
    let cancel = () => {
        element.dispatchEvent(new CustomEvent('canceled', {}))
        if (context.timeoutHandleer)
            clearTimeout(context.timeoutHandleer)
    }

    function dspEvent(name, point, context, element) {
        let e = new CustomEvent(name)
        Object.assign(e, {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY
        })
        element.dispatchEvent(e)
    }
}