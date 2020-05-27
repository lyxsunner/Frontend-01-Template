const getStyle = (element) => {
    if (!element.style) {
        element.style = {}
    }
    for (let prop in element.computedStyle) {
        element.style[prop] = element.computedStyle[prop].value

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop])
        } else if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style
}

const layout = (element) => {

    if (!element.computedStyle) {
        return
    }

    let elementStyle = getStyle(element)

    if (elementStyle.display !== 'flex') {
        return
    }

    const items = element.children.filter((e) => e.type === 'element')

    items.sort((a, b) => (a.style.order || 0) - (b.style.order || 0))

    const style = elementStyle

    ;
    [('width', 'height')].forEach((size) => {
        if (style[size] === 'auto' || style[size] === '') {
            style[size] = null
        }
    })

    if (!style['flex-direction'] || style['flex-direction'] === 'auto')
        style['flex-direction'] = 'row'
    if (!style['align-items'] || style['align-items'] === 'auto')
        style['align-items'] = 'stretch'
    if (!style['justify-content'] || style['justify-content'] === 'auto')
        style['justify-content'] = 'flex-start'
    if (!style['flex-wrap'] || style['flex-wrap'] === 'auto')
        style['flex-wrap'] = 'nowrap'
    if (!style['align-content'] || style['align-content'] === 'auto')
        style['align-content'] = 'stretch'

    let mainSize,
        mainStart,
        mainEnd,
        mainSign,
        mainBase,
        crossSize,
        crossStart,
        crossEnd,
        crossSign,
        crossBase
    if (style['flex-direction'] === 'row') {
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1
        mainBase = 0

        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    } else if (style['flex-direction'] === 'row-reverse') {
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style.width

        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    } else if (style['flex-direction'] === 'column') {
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0

        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    } else if (style['flex-direction'] === 'column-reverse') {
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style.width

        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }
    if (style['flex-wrap'] === 'wrap-reverse') {
        let tmp = crossStart
        crossStart = crossEnd
        crossEnd = tmp
        crossSign = -1
    } else {
        crossBase = 0
        crossSign = +1
    }

    let isAutoMainSize = false

    // 如果元素没有宽度，则让子元素撑开
    if (!style[mainSize]) {
        elementStyle[mainSize] = 0
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let itemStyle = getStyle(item)
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== void 0) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
            }
        }
        isAutoMainSize = true
    }

    const flexLine = []
    const flexLines = [flexLine]

    let mainSpace = elementStyle[mainSize]
    let crossSpace = 0

    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let itemStyle = getStyle(item)

        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0
        }

        // 把所有的 flex 元素放进一行，然后根据 flex 的值去计算每个子元素的宽度
        if (itemStyle.flex) {
            flexLine.push(item)
        } else if (style['flex-wrap'] === 'nowrap' && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize]
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSpace])
            }
            flexLine.push(item)
        } else {
            // 一个子元素的宽度大于容器的宽度，则把子元素的宽度设置为容器的宽度
            if (itemStyle[mainSize] > style[mainSize]) {
                itemStyle[mainSize] = style[mainSize]
            }
            // 当容器剩余宽度小于子元素的宽度时，另起一行
            if (mainSpace < itemStyle[mainSize]) {
                flexLine.mainSpace = mainSpace
                flexLine.crossSpace = crossSpace
                flexLine = [item]
                flexLines.push(flexLine)
                mainSpace = style[mainSpace]
                crossSpace = 0
            } else {
                flexLine.push(item)
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize])
            }
            mainSpace -= itemStyle[mainSize]
        }
    }
    flexLine.mainSpace = mainSpace

    if (style['flex-wrap'] === 'nowrap' || isAutoMainSize) {
        flexLine.crossSpace =
            style[crossSize] !== void 0 ? style[crossSize] : crossSpace
    } else {
        flexLine.crossSpace = crossSpace
    }

    if (mainSpace < 0) {
        let scale = style[mainSize] / (style[mainSize] - mainSpace)
        let currentMain = mainBase
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let itemStyle = getStyle(item)

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale

            itemStyle[mainStart] = currentMain
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
            currentMain = itemStyle[mainEnd]
        }
    } else {
        flexLines.forEach(function (items) {
            let mainSpace = items.mainSpace
            let flexTotal = 0

            for (let i = 0; i < items.length; i++) {
                let item = items[i]
                let itemStyle = getStyle(item)

                if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
                    flexTotal += itemStyle.flex
                }
            }

            if (flexTotal > 0) {
                let currentMain = mainBase
                for (let i = 0; i < items.length; i++) {
                    let item = items[i]
                    let itemStyle = getStyle(item)

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] =
                        itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd]
                }
            } else {
                if (style['justify-content'] === 'flex-start') {
                    let currentMain = mainBase
                    let step = 0
                }
                if (style['justify-content'] === 'flex-end') {
                    let currentMain = mainSpace * mainSign + mainBase
                    let step = 0
                }
                if (style['justify-content'] === 'center') {
                    let currentMain = (mainSpace / 2) * mainSign + mainBase
                    let step = 0
                }
                if (style['justify-content'] === 'space-between') {
                    let step = (mainSpace / (items.length - 1)) * mainSign
                    let currentMain = mainBase
                }
                if (style['justify-content'] === 'space-around') {
                    let step = (mainSpace / items.length) * mainSign
                    let currentMain = step / 2 + mainBase
                }
                for (let i = 0; i < items.length; i++) {
                    let item = items[i]
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] =
                        itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd] + step
                }
            }
        })
    }

    crossSpace = void 0

    // 没有设置 交叉轴的 height 时，默认值为每一行的高度加起来
    if (!style[crossSize]) {
        crossSpace = 0
        elementStyle[crossSize] = 0
        for (let i = 0; i < flexLines.length; i++) {
            elementStyle[crossSize] =
                elementStyle[crossSize] + flexLines[i].crossSpace
        }
    } else {
        crossSpace = style[crossSize]
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -= flexLines[i].crossSpace
        }
    }

    // flex-wrap 为 wrap-reverse 时，反转 base
    if (style['flex-wrap'] === 'warp-reverse') {
        crossBase = style[crossSize]
    } else {
        crossBase = 0
    }
    let linSize = style[crossSize] / flexLines.length
    let step

    if (style['align-content'] === 'flex-start') {
        crossBase += 0
        step = 0
    } else if (style['align-content'] === 'flex-end') {
        crossBase += crossSign * crossSpace
        step = 0
    } else if (style['align-content'] === 'center') {
        crossBase += (crossSign * crossSpace) / 2
        step = 0
    } else if (style['align-content'] === 'space-between') {
        crossBase += 0
        step = crossSpace / (flexLines.length - 1)
    } else if (style['align-content'] === 'space-around') {
        step = crossSpace / flexLines.length
        crossBase += (crossSign * step) / 2
    } else if (style['align-content'] === 'stretch') {
        crossBase += 0
        step = 0
    }

    flexLines.forEach(function (items) {
        let lineCrossSize =
            style['align-content'] === 'stretch' ?
            items.crossSpace + crossSpace / flexLines.length :
            items.crossSpace
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let itemStyle = getStyle(item)

            let align = itemStyle['align-self'] || style['align-items']

            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = align === 'stretch' ? lineCrossSize : 0
            }
            if (align === 'flex-start') {
                itemStyle[crossStart] = crossBase
                itemStyle[crossEnd] =
                    itemStyle[crossStart] + crossSign * itemStyle[crossSize]
            } else if (align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
                itemStyle[crossStart] =
                    itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
            } else if (align === 'center') {
                itemStyle[crossStart] =
                    crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2
                itemStyle[crossEnd] =
                    itemStyle[crossEnd] + crossSign * itemStyle[crossSize]
            } else if (align === 'stretch') {
                itemStyle[crossStart] = crossBase
                itemStyle[crossEnd] =
                    crossBase +
                    crossSign *
                    (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0 ?
                        itemStyle[crossSize] :
                        lineCrossSize)
                itemStyle[crossSize] =
                    crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }
        }
        crossBase += crossSign * (lineCrossSize + step)
    })

}

module.exports = {
    layout
};