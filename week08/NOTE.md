
## 选择器语法

#### 简单选择器

- *
- div svg|a    namespace xml相关的知识
- .cls
- #id
- [attr=value]
- :hover    伪类选择器
- ::before    伪元素选择器

#### 复合选择器

- <简单选择器><简单选择器><简单选择器>
- *或者div必须写在最前面
#### 复杂选择器
- <复合选择器><sp><复合选择器>     子孙关系
- <复合选择器>">"<复合选择器>    子选择器，严格的父子关系
- <复合选择器>"~"<复合选择器>    
- <复合选择器>"+"<复合选择器>
- <复合选择器>"||"<复合选择器>    table 里面选中一列
#### 选择器列表
> 多个选择器用逗号隔开
## 选择器优先级
#### 简单选择器计数
> [a, b, c, d]
>
> 按权重高低排
>
> 行内样式 <div style="xxx"></div> ==> a
>
> ID 选择器 ==> b
>
> 类，属性选择器和伪类选择器 ==> c
>
> 标签选择器，伪元素 ==> d
#id div.a #id [0, 2, 1, 1];
S = 0 * N³ + 2 * N² + 1 * N + 1
取 N = 1000000
S = 2000001000001
## 伪类
#### 链接/行为
- :any-link
- :link :visited
- :hover
- :active
- :focus
- :target
#### 树结构
- :empty
- :nth-child()
- :nth-last-child()
- :first-child :last-child :only-child
#### 逻辑型
- :not
- :where :has
## 伪元素
- ::before
- ::after
- ::firstLine
  - font
  - color
  - ackground
  - word-spacing
  - letter-spacing
  - text-decoration
  - text-transform
  - line-height
- ::firstLetter
  - font
  - color
  - background
  - word-spacing
  - letter-spacing
  - text-decoration
  - text-transform
  - line-height
  - vertical-align
  - 盒模型系列：margin，padding，border
## 排版
#### 盒(Box)
源代码	标签 Tag
语义	元素 Element
表现	盒 Box
>HTML代码中可以书写开始<u>标签</u>，结束<u>标签</u>，和自封闭<u>标签</u>
>
>一对起止<u>标签</u>，表示一个<u>元素</u>
>
>DOM树中存储的是<u>元素</u>和其他类型的<u>节点</u>(Node)
>
>CSS选择器选中的是<u>元素</u>
>
>CSS选择器选中的元素，在排版时可能产生多个<u>盒</u>
>
>排版和渲染的基本单位是<u>盒</u>
#### 盒模型
margin ==> border ==> padding ==> content
> width 一般表示content-box，需要添加 box-sizing:border 来修正
box-sizing:
- content-box
- border-box
## 正常流（normal-flow)
#### 正常流排版
- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布
#### 正常流的行模型
Inline-block 建议 vertical-align 只用 top，middle，bottom
> $0.getClientRects()
#### float和clear
#### margin折叠
> Block formatting contexts
#### overflow:visible 与 BFC
## Flex
- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布
```
写出下列选择器的优先级

div#a.b .c[id=x] [0, 1, 3, 1];

#a:not(#b) [0, 2, 0, 0];

*.a [0, 0, 1, 0];

div.a [0, 0, 1, 1];

思考题

Q:为什么first-letter可以设置float之类的，而first-line不行?

A:float脱离文档流出去，和first-line矛盾了

Q:first-line为什么可以改字体?

A:first是逐个作用于文字，没有作用于盒
```