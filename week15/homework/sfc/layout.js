function getStyle(element) {
    // 此方法是把元素的computedStyle上的样式值与位置得到，放入style里
    if (!element.style) {
      element.style = {};
    }
    // 循环元素的computedStyle
    for (let prop in element.computedStyle) {
      element.style[prop] = element.computedStyle[prop].value;
  
      if (element.style[prop].toString().match(/px$/)) {
        element.style[prop] = parseInt(element.style[prop]);
      }
      if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
        element.style[prop] = parseInt(element.style[prop]);
      }
    }
    return element.style;
  }
  function layout(element) {
    if (!element.computedStyle) {
      return;
    }
    var elementStyle = getStyle(element);
    // 这里好像是通过display:flex判断是不是我们#container，如果不是我们特定的容器就return。。。。。这也太。。。。
    if (elementStyle.display !== "flex") {
      return;
    }
    // 过滤出我们要的element元素，把text干掉
    var items = element.children.filter((e) => e.type === "element");
    // 这里是通过order属性还排序。
    items.sort((a, b) => (a.computedStyle.order.value || 0) - (b.computedStyle.order.value || 0));
    var style = elementStyle;
    // 设置元素的width和height默认值null
    ["width", "height"].forEach((size) => {
      if (["auto", ""].some((i) => i === style[size])) {
        style[size] = null;
      }
    });
    // 设置元素的flex相关属性的默认值
    if (!style.flexDirection || style.flexDirection === "auto") {
      style.flexDirection = "row";
    }
    if (!style.alignItems || style.alignItems === "auto") {
      style.alignItems = "flex-start";
    }
    if (!style.justifyContent || style.justifyContent === "auto") {
      style.justifyContent = "flex-start";
    }
    if (!style.flexWrap || style.flexWrap === "auto") {
      style.flexWrap = "nowrap";
    }
    if (!style.alignContent || style.alignContent === "auto") {
      style.alignContent = "stretch";
    }
    // 声明布局轴相关的变量
    var mainSize,
      mainStart,
      mainEnd,
      mainSign,
      mainBase,
      crossSize,
      crossStart,
      crossEnd,
      crossSign,
      crossBase;
    // 从左向右，从上向下
    if (style.flexDirection === "row") {
      mainSize = "width";
      mainStart = "left";
      mainEnd = "right";
      mainSign = +1;
      mainBase = 0;
      crossSize = "height";
      crossStart = "top";
      crossEnd = "bottom";
    }
    // 从右向左，从上向下
    if (style.flexDirection === "row-reverse") {
      mainSize = "width";
      mainStart = "right";
      mainEnd = "left";
      mainSign = -1;
      mainBase = style.width;
      crossSize = "height";
      crossStart = "top";
      crossEnd = "bottom";
    }
    // 从上向下，从左向右
    if (style.flexDirection === "column") {
      mainSize = "height";
      mainStart = "top";
      mainEnd = "bottom";
      mainSign = +1;
      mainBase = 0;
      crossSize = "width";
      crossStart = "left";
      crossEnd = "right";
    }
    // 从下向上，从左向右
    if (style.flexDirection === "column-reverse") {
      mainSize = "height";
      mainStart = "bottom";
      mainEnd = "top";
      mainSign = -1;
      mainBase = style.height;
      crossSize = "width";
      crossStart = "left";
      crossEnd = "right";
    }
    // 换行，多主轴的排列方向，即交叉轴反向
    if (style.flexWrap === "wrap-reverse") {
      var tmp = crossStart;
      crossStart = crossEnd;
      crossEnd = tmp;
      crossSign = -1;
    } else {
      crossBase = 0;
      crossSign = +1;
    }
    // 此变量表示容器主轴方向宽度是否自动
    var isAutoMainSize = false;
    // 如果主轴方向无宽度
    if (!style[mainSize]) {
      // 重置为0
      elementStyle[mainSize] = 0;
      // 循环子元素
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        elementStyle[mainSize]
        if (item[mainSize]) {
          elementStyle[mainSize] += item[mainSize];
        }
      }
      // for (var i = 0; i < items.length; i++) {
      //   var item = items[i];
      //   if (itemStyle[mainSize] !== null && itemStyle[mainSize] !== void 0) {
      //     // TODO: 这里有问题，这个itemStyle变量当前无内容,代码走到这里会报错
      //     elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      //   }
      // }
      isAutoMainSize = true;
    }
    // 第一行
    var flexLine = [];
    // 行集合
    var flexLines = [flexLine];
    // 没入行之前，主轴方向空间为容器空间
    var mainSpace = elementStyle[mainSize];
    // 没入选之前，交叉空间为0
    var crossSpace = 0;
    // 循环子元素
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      // 得到子元素的style
      var itemStyle = getStyle(item);
      // 如果子元素的主轴方向无宽度，就重置为0
      if (itemStyle[mainSize] === null) {
        itemStyle[mainSize] = 0;
      }
      if (itemStyle.flex) {
        // 子元素有flex属性，不操作，直接入行
        flexLine.push(item);
      } else if (style.flexWrap === "nowrap" && isAutoMainSize) { // TODO: 这里为什么要同时判断isAutoMainSize
        // 容器元素有flexWrap属性为不换行，并且容器主轴方向宽度有值
        // 因为走到这里的子元素不是flex的，所以容器的主轴宽度减去这个子元素的主轴宽度
        mainSpace -= itemStyle[mainSize];
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
          // 交叉轴方向的行的高度是由子元素里交叉轴方向的最大宽度决定的
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        // 做完以上操作，把子元素入行
        flexLine.push(item);
      } else {
        if (itemStyle[mainSize] > style[mainSize]) {
          // 如果子元素主轴方向大于容器主轴方向的宽度，就让子元素等于窗口主轴方向宽度
          itemStyle[mainSize] = style[mainSize];
        }
        if (mainSpace < itemStyle[mainSize]) {
          // 容器主轴方向宽度如果放不下子元素，就另起一行。
          // TODO: 这里flexLine不是一个数组吗，怎么当成对象在用，并且在下一行就重置了，那在这里设置mainSpace有什么意义呢
          // flexLine.mainSpace = mainSpace;
          // flexLine.crossSpace = crossSpace;
          flexLine = [item];
          flexLines.push(flexLine);
          mainSpace = style[mainSize];
          crossSpace = 0;
        } else {
          // 如果能放，就直接把子元素入行
          flexLine.push(item);
        }
        if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
          // 交叉轴方向的行的高度是由子元素里交叉轴方向的最大宽度决定的
          crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        // 因为走到这里的子元素不是flex的，所以容器的主轴宽度减去这个子元素的主轴宽度
        mainSpace -= itemStyle[mainSize];
      }
    }
    // TODO: 这里为什么把数组当对象用，同时也没在代码里看到有用到
    flexLine.mainSpace = mainSpace;
    // TODO: 这里为什么要同时判断isAutoMainSize，这里为什么双是 || 
    if (style.flexWrap === "nowrap" || isAutoMainSize) {
      flexLine.crossSpace =
        style[crossSize] !== undefined ? style[crossSize] : crossSpace;
    } else {
      flexLine.crossSpace = crossSpace;
    }
    // 主轴方向宽度小于0
    if (mainSpace < 0) {
      // 得到缩小比例
      var scale = style[mainSize] / (style[mainSize] - mainSpace);
      // 获取当前容器主轴宽度
      var currentMain = mainBase;
      // 循环子元素
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);
        if (itemStyle.flex) {
          // 如果子元素有flex属性就把子元素主轴方向置为0
          itemStyle[mainSize] = 0;
        }
        // TODO: 这里不是太理解
        itemStyle[mainSize] = itemStyle[mainSize] * scale;
        itemStyle[mainStart] = currentMain;
        itemStyle[mainEnd] =
          itemStyle[mainStart] + mainSign * itemStyle[mainSize];
        currentMain = itemStyle[mainEnd];
      }
    } else {
      flexLines.forEach((items) => {
        var mainSpace = items.mainSpace;
        var flexTotal = 0;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle(item);
          if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
            // TODO: 这里flex可能会是auto、none、或三个值。
            flexTotal += itemStyle.flex;
            continue;
          }
        }
        if (flexTotal > 0) {
          // 根据flex来计算子元素主轴方向宽度
          var currentMain = mainBase;
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemStyle = getStyle(item);
            if (itemStyle.flex) {
              itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
            }
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] =
              itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
          }
        } else {
          if (style.justifyContent === "flex-start") {
            var currentMain = mainBase;
            var step = 0;
          }
          if (style.justifyContent === "flex-end") {
            var currentMain = mainSpace * mainSign + mainBase;
            var step = 0;
          }
          if (style.justifyContent === "center") {
            var currentMain = (mainSpace / 2) * mainSign + mainBase;
            var step = 0;
          }
          if (style.justifyContent === "space-between") {
            var currentMain = mainBase;
            var step = (mainSpace / (items.length - 1)) * mainSign;
          }
          if (style.justifyContent === "space-around") {
            var step = (mainSpace / items.length) * mainSign;
            var currentMain = step / 2 + mainBase;
          }
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] =
              itemStyle[mainStart] + mainSign * itemStyle[mainSizes];
            currentMain = itemStyle[mainEnd] + step;
          }
        }
      });
    }
  
    var crossSpace;
    if (!style[crossSize]) {
      crossSpace = 0;
      elementStyle[crossSize] = 0;
      for (var i = 0; i < flexLines.length; i++) {
        elementStyle[crossSize] =
          elementStyle[crossSize] + flexLines[i].crossSpace;
      }
    } else {
      crossSpace = style[crossSize];
      for (var i = 0; i < flexLines.length; i++) {
        crossSpace -= flexLines[i].crossSpace;
      }
    }
    if (style.flexWrap === "wrap-reverse") {
      crossBase = style[crossSize];
    } else {
      crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;
    var step;
    if (style.alignContent === "flex-start") {
      crossBase += 0;
      step = 0;
    }
    if (style.alignContent === "flex-end") {
      crossBase += crossSign * crossSpace;
      step = 0;
    }
    if (style.alignContent === "center") {
      crossBase += (crossSign * crossSpace) / 2;
      step = 0;
    }
    if (style.alignContent === "space-between") {
      crossBase += 0;
      step = crossSpace / (flexLines.length - 1);
    }
    if (style.alignContent === "space-around") {
      step = crossSpace / flexLines.length;
      crossBase += (crossSign * step) / 2;
    }
    if (style.alignContent === "stretch") {
      step = 0;
      crossBase += 0;
    }
  
    flexLines.forEach((items) => {
      var lineCrossSize =
        style.alignContent === "stretch"
          ? items.crossSpace + crossSpace / flexLines.length
          : items.crossSpace;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);
        var align = itemStyle.alignSelf || style.alignItems;
        if (itemStyle[crossSize] === null) {
          itemStyle[crossSize] = align === "stretch" ? lineCrossSize : 0;
        }
        if (align === "flex-start") {
          itemStyle[crossStart] = crossBase;
          itemStyle[crossEnd] =
            itemStyle[crossStart] + crossSign * itemStyle[crossSize];
        }
        if (align === "flex-end") {
          itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
          itemStyle[crossStart] =
            itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
        }
        if (align === "center") {
          itemStyle[crossStart] =
            crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2;
          itemStyle[crossEnd] =
            itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
          // itemStyle[crossEnd]= itemStyle[crossStart] + crossSign * itemStyle[crossSize]
        }
        if (align === "stretch") {
          itemStyle[crossStart] = crossBase;
          itemStyle[crossEnd] =
            crossBase +
            crossSign *
              (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0
                ? itemStyle[crossSize]
                : lineCrossSize);
          itemStyle[crossSize] =
            crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
        }
      }
      crossBase += crossSign * (lineCrossSize + step);
    });
  }
  module.exports = layout;