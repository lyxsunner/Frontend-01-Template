# 每周总结可以写在这里

## 四则运算

- TokenNumber
  - 1 2 3 4 5 6 7 8 9 0 的组合
- Operator
  - \+
  - \-
  - \*
  - \/
- Whitespace
  - \<sp\>
- LineTerminator
  - \<LF\>
  - \<CR\>

```js
// BNF
<Expression> ::=
  <AdditiveExrpression><EOF>
<AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>
<MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
```

## 字符串分析算法

- 字典树
  - 大量字符串的完整模式匹配
- KMP
  - 长字符串中找子串 O(m + n)
- WildCard 通配符算法
  - 长字符串中找子串升级版
- 正则
  - 字符串通用模式匹配
- 状态机
  - 通用的字符串分析
- LL LR
  - 字符串多层级结构分析


## 作业
使用LL算法构建AST
Trie字典树
KMP
WildCard