const css = require("css");
const _ = require("lodash");
const EOF = Symbol("EOF"); // End Of File
const layout = require("./layout");
let currentToken = null;
let currentAttribute = null;
let stack = [{ type: "document", children: [] }];
let currentTextNode = null;
let rules = [];

// 解析cssrule
function addCSSRules(text) {
  var ast = css.parse(text);
  console.log(JSON.stringify(ast.stylesheet.rules));
  rules.push(...ast.stylesheet.rules);
}
// 检查选择器是否命中element
function match(element, selector) {
  if (!selector || !element.attributes) return false;
  // class&ID selector：由 [0-9a-zA-Z_-]组成，不能用[0-9|-(0-9)]开头
  // selector只考虑 标签 类 id 选择器的组合模式，不考虑 > + ~ 等
  let selectorList = selector.split(/(?=[.#])/);
  let classList = [];
  let idList = [];
  let tagNameList = [];
  // 判断是否合法
  let isNotSyntax = selectorList.some((i) => {
    let v = i.replace(/^[\.#]/, "");
    // 属性值需要由数字字符-_组成并且第一位不能是数字，同是前两位不能是（-加数字）
    if (!(/^[0-9a-zA-Z_-]+$/g.test(v) && !/^(\d|-\d)/.test(v))) return true;
  });
  if (isNotSyntax) return false;
  // 分类
  selectorList.forEach((i) => {
    if (/^\./.test(i)) {
      classList.push(i.replace(/^\./, ""));
    } else if (/^\#/.test(i)) {
      idList.push(i.replace(/^\#/, ""));
    } else {
      tagNameList.push(i);
    }
  });
  // tagName与Id不是唯一，返回false
  if (tagNameList.length > 1 || idList.length > 1) return false;
  let hasTagName = +!!tagNameList.length;
  let hasClassName = +!!classList.length;
  let hasId = +!!idList.length;
  // 获取element的className
  let elementClassName = element.attributes.filter(
    (attr) => attr.name === "class"
  )[0];
  // 获取element的id
  let elementId = element.attributes.filter((attr) => attr.name === "id")[0];
  let matchFun = {
    m111,
    m100,
    m010,
    m001,
    m011,
    m101,
    m110,
  };
  return matchFun[`m${hasTagName}${hasClassName}${hasId}`]();

  // 同时有tagName、className和id
  function m111() {
    return (
      element.tagName === tagNameList[0] &&
      elementClassName &&
      _.intersection(elementClassName.value.split(" "), classList).length ==
        classList.length &&
      elementId &&
      elementId.value.split(" ").sort().join("") == idList.sort().join("")
    );
  }
  // 只有tagName
  function m100() {
    return element.tagName === tagNameList[0];
  }
  // 只有className
  function m010() {
    return (
      elementClassName &&
      _.intersection(elementClassName.value.split(" "), classList).length ==
        classList.length
    );
  }
  // 只有id
  function m001() {
    return (
      elementId &&
      elementId.value.split(" ").sort().join("") == idList.sort().join("")
    );
  }
  // 只有className和id
  function m011() {
    return (
      elementClassName &&
      _.intersection(elementClassName.value.split(" "), classList).length ==
        classList.length &&
      elementId &&
      elementId.value.split(" ").sort().join("") == idList.sort().join("")
    );
  }
  // 只有tagName和id
  function m101() {
    return (
      element.tagName === tagNameList[0] &&
      elementId &&
      elementId.value.split(" ").sort().join("") == idList.sort().join("")
    );
  }
  // 只有tagName和class
  function m110() {
    return (
      element.tagName === tagNameList[0] &&
      elementClassName &&
      _.intersection(elementClassName.value.split(" "), classList).length ==
        classList.length
    );
  }
}
// 计算得到规则的4元组，用于后续计算对比权重
function specificity(selector) {
  var p = [0, 0, 0, 0];
  var selectorParts = selector.split(" ");
  for (var part of selectorParts) {
    let partList = part.split(/(?=[.#])/);
    // 通过切割出类 id tagName的数量，操作复合选择器
    p[1] += partList.filter((i) => i.charAt() === "#").length;
    p[2] += partList.filter((i) => i.charAt() === ".").length;
    p[3] += partList.filter(
      (i) => i.charAt() !== "#" && i.charAt() !== "."
    ).length;
  }
  return p;
}
// 比对两条规则的权重
function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0];
  }
  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1];
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2];
  }
  if (sp1[3] - sp2[3]) {
    return sp1[3] - sp2[3];
  }
  return -1;
}
// 匹配并计算element的样式
function computeCSS(element) {
  // 把栈中的元素翻一下
  var elements = stack.slice().reverse();
  if (!element.computedStyle) {
    element.computedStyle = {};
  }
  for (let rule of rules) {
    var selectorParts = rule.selectors[0].split(" ").reverse();
    if (!match(element, selectorParts[0])) {
      // 如果最里层的元素没有命中，则跳出当前循环
      continue;
    }
    let matched = false;
    var j = 1;
    for (var i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
    }
    if (j >= selectorParts.length) {
      matched = true;
    }
    if (matched) {
      // 匹配成功
      var sp = specificity(rule.selectors[0]);
      var computedStyle = element.computedStyle;
      for (var declaration of rule.declarations) {
        if (!computedStyle[declaration.property]) {
          computedStyle[declaration.property] = {};
        }
        if (!computedStyle[declaration.property].specificity) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        } else if (
          compare(computedStyle[declaration.property].specificity, sp) <= 0
        ) {
          computedStyle[declaration.property].value = declaration.value;
          computedStyle[declaration.property].specificity = sp;
        }
      }
    }
  }
}
// 每交完整获取了一个token，就压入栈中
function emit(token) {
  let top = stack[stack.length - 1];
  if (token.type == "startTag") {
    // 标签开始
    let element = {
      type: "element",
      children: [],
      attributes: [],
    };
    element.tagName = token.tagName;
    for (let o in token) {
      if (o != "type" && o != "tagName") {
        element.attributes.push({
          name: o,
          value: token[o],
        });
      }
    }
    // 遇到开始标签就去匹配能命中的css
    computeCSS(element);

    top.children.push(element);
    element.parent = JSON.parse(JSON.stringify(top));
    if (!token.isSelfClosing) {
      // 如果不是自闭合标签就入栈
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type == "endTag") {
    // 标签结束
    if (top.tagName != token.tagName) {
      throw new Error(`tag start end doesn't match!`);
    } else {
      if (top.tagName === "style") {
        // 这里我们只分析style标签里的样式
        addCSSRules(top.children[0].content);
      }
      // 计算元素位置，因为要拿到元素的子元素才能计算布局，所以在endTag处调用
      layout(top);
      // 如果是结束标签就出栈
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type == "text") {
    // 文本节点
    if (currentTextNode == null) {
      // 文本节点放到标签里
      currentTextNode = {
        type: "text",
        content: "",
      };
      top.children.push(currentTextNode);
    }
    // 拼接文本
    currentTextNode.content += token.content;
  }
}
// html内容开始
function data(c) {
  if (c == "<") {
    return tagOpen;
  } else if (c == EOF) {
    emit({
      type: "EOF",
    });
    return;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}
// 标签开始
function tagOpen(c) {
  if (c == "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    return tagName(c);
  } else {
    emit({
      type: "text",
      content: c,
    });
    return;
  }
}
// 结束标签的标签名
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: "",
    };
    return tagName(c);
  } else if (c == ">") {
  } else if (c == EOF) {
  } else {
  }
}
// script 开始
function scriptData(c) {
  console.log('script data !!!!!!!!!!!!!1')
  if (c == "<") {
    return scriptDataLessThanSign;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// <
function scriptDataLessThanSign(c) {
  if (c == "/") {
    return scriptDataEndTagOpen;
  } else {
    emit({
      type: "text",
      content: "<",
    });
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </
function scriptDataEndTagOpen(c) {
  if (c == "s") {
    return scriptDataEndTagNameS;
  } else {
    emit({
      type: 'text',
      content: '<'
    })
    emit({
      type: "text",
      content: "/",
    });
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </s
function scriptDataEndTagNameS(c) {
  if (c == "c") {
    return scriptDataEndTagNameC;
  } else {
    emit({
      type: 'text',
      content: '</s'
    })
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </sc
function scriptDataEndTagNameC(c) {
  if (c == "r") {
    return scriptDataEndTagNameR;
  } else {
    emit({
      type: 'text',
      content: '</sc'
    })
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </scr
function scriptDataEndTagNameR(c) {
  if (c == "i") {
    return scriptDataEndTagNameI;
  } else {
    emit({
      type: 'text',
      content: '</scr'
    })
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </scri
function scriptDataEndTagNameI(c) {
  if (c == "p") {
    return scriptDataEndTagNameP;
  } else {
    emit({
      type: 'text',
      content: '</scri'
    })
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </scrip
function scriptDataEndTagNameP(c) {
  if (c == "t") {
    return scriptDataEndTag;
  } else {
    emit({
      type: 'text',
      content: '</scrip'
    })
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// </script
function scriptDataEndTag(c) {
  if (c == " ") {
    return scriptDataEndTag;
  } else if (c == ">") {
    emit({
      type: 'endTag',
      tagName: 'script'
    });
    return data;
  } else {
    emit({
      type: 'text',
      content: '</script'
    })
    emit({
      type: "text",
      content: c,
    });
    return scriptData;
  }
}
// 标签名
function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c;
    return tagName;
  } else if (c == ">") {
    emit(currentToken);
    return data;
  } else {
    currentToken.tagName += c;
    return tagName;
  }
}
// 标签属性名之前
function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == ">" || c == "/" || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {
    // 抛错
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}
// 标签属性名之后
function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "=") {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}
// 属性名
function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == "\u0000") {
  } else if (c == '"' || c == "'" || c == "<") {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}
// 属性值之前
function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return beforeAttributeValue;
  } else if (c == '"') {
    return doubleQuotedAttributeValue;
  } else if (c == "'") {
    return singleQuotedAttributeValue;
  } else if (c == ">") {
    // return data
  } else {
    return UnquotedAttributeValue(c);
  }
}
// 双引号属性值
function doubleQuotedAttributeValue(c) {
  if (c == '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}
// 单引号属性值
function singleQuotedAttributeValue(c) {
  if (c == "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}
// 属性值引号之后
function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}
// 无引号属性值
function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == "\u0000") {
  } else if (c == '"' || c == "'" || c == "<" || c == "=" || c == "`") {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}
// 自闭合标签
function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c == "EOF") {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {
  // 使用状态分析处理dom
  let state = data;
  for (let c of html) {
    state = state(c);
    if(stack[stack.length - 1].tagName === 'script' && state == data){
      state = scriptData
    }
  }
  state = state(EOF);
  return stack[0];
};