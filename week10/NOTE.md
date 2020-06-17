# API

### Range 操作 dom

 * var range = new Range()
 * range.setStart(element,9) // 可以裁剪标签元素
 * range.setEnd(element,4)
 * var range = document.getSelection().getRangeAt(0)

 * var fragment = range.extractContents()
 * range.insertNode(document.createTextNode("aaaa"))

### CSSOM

#### document.styleSheets

* CSS Rules
    * document.styleSheets[0].cssRules
    * documnet.styleSheets[0].insertRule("p { color:pink; }",0)
    * document.styleSheets[0].removeRule(0)
* Rule
  * CSSStyleRule
    * selectorText String
    * style K-V 结构
  * CSSCharsetRule
  * CSSImportRule
  * CSSMediaRule
  * CSSFontFaceRule
  * CSSPageRule
  * CSSNamespaceRule
  * CSSKeyframesRule
  * CSSkeyframeRule
  * CSSSupportsRule
  * ...
* getComputedStyle
  * window.getComputedStyle(elt, pseudoElt)
    * elt想要获取的元素
    * pseudoElt 可选，伪元素

### window
* let childWindow = window.open("about:blank","_blank", "width=100,height=100,left=100,top=100")
* childWindow.moveBy(-50,-50)
* childWindow.resizeBy(50,50)

* window.scrollX, window.scrollY
* window.scroll(0,50) //滚动到指定位置 0 是 x 坐标，50是 y 坐标
* window.scrollBy(0, 50) // 滚动的幅度，向下滚动 50
* 元素也可以滚动，不过 api 和 window 不太一样，scrollBy, scrollTo, scrollTop, scrollLeft, scrollHeight
* document.documentElement.getBoundingClientRect()