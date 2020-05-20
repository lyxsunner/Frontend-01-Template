const css = require('css');

let rules = null;
// 加载内联CSS 样式
const addCSSRules = (text) => {
  const ast = css.parse(text);
  rules = [...ast.stylesheet.rules];
};

const computeCSS = (element) => {
  // 仅计算head 标签内style 之后的标签
  if (!rules) return;

  let ancestors = [];
  let parent = element;
  while (parent) {
    ancestors.push(parent);
    parent = parent.parent;
  }

  if (!element.computedStyle) {
    element.computedStyle = {};

    // 处理element style 属性
    let styleAttr = element.attributes.find((attr) => attr.name === 'style');
    if (styleAttr) {
      const style = styleAttr.value.split(';');
      style.forEach((declaration) => {
        let [property, value] = declaration
          .split(':')
          .map((item) => item.trim());

        if (!element.computedStyle[property]) {
          element.computedStyle[property] = {};
        }
        element.computedStyle[property].value = value.trim();
        element.computedStyle[property].specificity = [1, 0, 0, 0];
      });
    }
  }

  for (const rule of rules) {
    let matched = false;
    // 从右向左匹配

    // rule.selectors 选择器数组，复合选择器时数组长度>1
    for (const selector of rule.selectors) {
      // TODO selector 复杂选择器
      let selectorParts = selector.split(' ').reverse();
      if (!match(element, selectorParts[0])) continue;

      for (let i = 0, j = 1; i < ancestors.length; i++) {
        if (match(ancestors[i], selectorParts[j])) {
          if (++j >= selectorParts.length) {
            // console.count('matched times');
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        // 计算当前选择器的权重
        const sp = specificity(rule.selectors[0]);

        const computedStyle = element.computedStyle;
        for (const declaration of rule.declarations) {
          if (!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {};
          }

          const property = computedStyle[declaration.property];
          if (!property.specificity) {
            property.value = declaration.value;
            property.specificity = sp;
          } else {
            if (compare(property.specificity, sp) < 0) {
              property.value = declaration.value;
              property.specificity = sp;
            }
          }
        }

        console.log(element.computedStyle);
        break;
      }
    }
  }
};

const match = (element, selector) => {
  if (!selector) return false;

  if (selector.charAt(0) === '#') {
    if (!element.attributes) return false;
    let attr = element.attributes.find((attr) => attr.name === 'id');
    return attr && attr.value === selector.slice(1);
  } else if (selector.charAt(0) === '.') {
    if (!element.attributes) return false;
    let attr = element.attributes.find((attr) => attr.name === 'class');
    // TODO class 多个时，空格隔开需判断
    return attr && attr.value.split(' ').includes(selector.slice(1));
  } else {
    return element.tagName === selector;
  }
}

const specificity = (selector) => {
  let p = [0, 0, 0, 0];
  for (const s of selector.split(' ')) {
    if (s.charAt(0) === '#') {
      p[1]++;
    } else if (s.charAt(0) === '.') {
      p[2]++;
    } else {
      p[3]++;
    }
  }
  return p;
}

const compare = (sp1, sp2) => {
  for (const index of sp1.keys()) {
    if (sp1[index] !== sp2[index]) {
      return sp1[index] - sp2[index];
    }
  }
  return 0;
}

module.exports = {
  addCSSRules,
  computeCSS,
}