## Day3 编程语言通识与JavaScript语言设计

* 目的：从更深层次的部分去理解JavaScript语言的语法
    * 为学习计算机语言打下基础

## 语言按语法分类

* 非形式语言

    * 中文，英文

* 形式语言（乔姆斯基谱系）

    * 0型 无限制文法
    * 1型 上下文相关文法
    * 2型 上下文无关文法
    * 3型 正则文法

```
现代语言分类：
词法+文法
```

## 产生式（BNF）

巴科斯诺尔范式-上下文无关文法

* 用尖括号括起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    * 基础结构称终结符
    * 复合结构称非终结符  
···symbol···
* 引号和中间的字符

### 制定一个只有a b两个字符的语言
```


"a"  "b"

<Program>:= "a"+ | "b"+
Program为最基础的语法，这里规定此语言可为若干个"a"或者若干个"b"

<Program>:= ("a"+ | "b"+)+
如此定义则会将语法进行递归定义，允许连加

```
### 制定一个数字语言

四则运算：
* 1 + 2 * 3

终结符：

* Number
* +-*/

非终结符：
* MultiplicativeExpression
* AddtiveExpression

```
<Number> ::= "0" | "1" | "2" ...... | "9"

<DecimalNumber> ::= "0" | (("1" | "2" ...... | "9") <Number>*)

<PrimaryExpressioin> ::= <DecimalNumber> |  
    "("  <logicalExpression>  ")"

<MutiplicativeExpression> ::= <DecimalNumber> |  
    <MutiplicativeExpression> "*" <DecimalNumber> |  
    <MutiplicativeExpression> "/"

<AdditiveExpression> ::= <MutiplicativeExpression> |  
    <AdditiveExpression> "+" <MutiplicativeExpression> |
    <AdditiveExpression> "-" <MutiplicativeExpression>

<logicalExpression> ::= <AdditiveExpression> |  
    <logicalExpression> "||" <AdditiveExpression>|  
    <LogicalExpression> "&&" <AdditiveExpression>
```

## 通过产生式理解乔姆斯基谱系

* 0型 无限制文法
    * ?::=?

* 1型 上下文相关文法

    ```
    ?<A>?::=?<B>?

    例如
    {
        get a{return 1},
        get :1
    }

    ```

* 2型 上下文无关文法(大部分编程语言为这类)

    ```
    <A>::=?
    ```

* 3型 正则文法
    * 正则文法效率较低，通常为线性使用

    ```
    <A>::=<A>?
    <A>::=?<A> （正则文法为左递归，不允许出现右递归，此种文法在正则文法中不允许）->×
    ```

```
小拓展：
使用正则来写一个四则运算语言，例如

<DecimalNumber> = /0|[1-9][0-9]*/

```

## 其他产生式

```
EBNF ABNF Customized
```

* ECMA使用 加粗字体的字符 作为终结符

## 现代语言的特例

* C++属于非形式语言，其中的*可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型

* VB中，<可能是小于号，也可能

* Python中，行首的tab符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent

* JavaScript中，/可以为除号

## 练习：尽可能寻找你知道的计算机语言，尝试把他们分类

* 重点在语言中是否有语法使他滑落到1或者0型语言的特性

## 图灵完备性

* 图灵完备性
    * 命令式--图灵机:凡是一切可计算的都是图灵
        * goto （多数语言都不允许使用）
        * if和while
    * 声明式--lambda
        * 递归--如果一个东西可以递归就可以关心一下他是否具有图灵完备性

如果想要做一个编程语言，它就必须具备图灵完备性
* HTML与CSS不具备图灵完备性

## 动态语言与静态语言

* 动态：
    * 在用户的设备/在线服务器上
    * 在产品实际运行时编译
    * Runtime

* 静态：
    * 在程序员的设备商
    * 在产品开发时进行编译
    * Compliletime

## 类型系统

* 动态类型系统与静态类型系统

```
{
    a:T1
    b:T2
}
```

* 强类型与弱类型
    * 有隐式转换的都是弱类型，C++也是弱类型；无隐式转换的语言为强类型语言
    * String + Number (弱类型会隐式类型转换)
    * String == Boolean (弱类型会先将Boolean转为String再比较)
    * 弱类型会让开发阶段足够爽，但是会将问题滞后到运行阶段曝露

* 复合类型
    * 结构体
    * 函数签名

* 子类型
    * 逆变/协变
    ```
    凡是能用Array<Parent>的地方，都能用Array<Child>

    凡是能用Function<Child>的地方，都能用Function<Parent>
    ```

* TypeScript可以认为是在JavaScript上套上了一层类型检验

* SQL语言是什么类型语言？

## 一般命令式编程语言

* Atom (原子)  
    * Identifier
    * Literal
   
* Expression (表达式)
    * Atom
    * Operator
    * Punctuator

* Statement
    * Expression
    * Keyword
    * Punctuator

* Structure
    * Function
    * Class
    * Namespace
    * ......

* Program
    * Program
    * Module
    * Package
    * Library

* JavaScript函数式编程之副作用
```
常静:
副作用是什么
@常静  也就是非pure function，函数执行的过程中有不确定的产出。pure function 是输入和输出是一一对应的。https://juejin.im/post/5b22071af265da59a23f14ba

编译原理
青成(青成-北京)
慕司:
编译原理要买本龙书补一下嘛
@慕司  不用买 微信读书免费先看看： https://weread.qq.com/web/reader/9c632ee05ce2c79c6f5eaadkc81322c012c81e728d9d180


青成(青成-北京)
老师，我在这个网站 https://www.w3.org/TR/html4/sgml/entities.html 里面只找到252个实体啊，没有找到255个
<!ENTITY % HTMLsymbol PUBLIC
       "-//W3C//ENTITIES Symbols//EN//HTML">
     %HTMLsymbol; -->
有3个这个重复的
```

## Day4 JavaScript | 词法，类型

## JavaScript字符集-Unicode

* Unicode包含ASCII的128个字符

``` Html
<script>
    for(let i=0;i<128;i++){
        document.write("<span>"+String.fromCharCode(i)+"</span>")
        // console.log(String.fromCharCode(i));
    }
    var 厉害=1;
    console.log(厉害)
    "厉害".codePointAt(0).toString(16);//厉 5389->16进制
    "厉害".codePointAt(1).toString(16);//害 5bb3->16进制

    var \u5389\u5bb3=1;//与 var 厉害=1;等效

</script>
```

* 禁止使用超出ASCII编码范围的字符最为代码中的变量名/方法名

## JavaScript字符解析规则机制

超出BMP(Basic Multilingual)字符范围内的字符很多地方不会支持，禁止使用

```
InputElement                词法
    WhiteSpace              空格
    Linterminator           换行符
    Comment                 注释
    Token                   记号/标记/有效的词、符号
        Punctuator          标记，标点，符号

        IndentifierName     变量名/属性名/关键字
            Keywords            关键字
            Indentifier         属性名/变量名,必须以字母开头
            Future reserved Keywords: 仅剩enum，其他全晋升为keywords  
        Literal             直接量
            Number
```

* WhiteSpace

``` xml
<TAB> "\t" （横向）制表符,unicode字符为U+0009,属于ASCII编码范围,会与前面的字符凑齐x个空格，其长度默认Size x为4
<VT> "\v" （纵向）制表符,unicode字符为U+0011,属于ASCII编码范围,常规编辑器等并未针对其做优化
<FF> "\f" Form Feed 翻页
<SP> "" 普通空格,unicode字符为U+0020,空格会产生分词效果，压缩换行的时候会以词为单位换行
<NBSP> "" non break space 不间断空格,unicode字符为U+00A0,不间断空格不产生分词效果，压缩换行的时候会将空格前后的词链接在一起作为分词
<ZWNBSP> "" 零宽不间断空格(Zero width no break space)，属于BOM（Byte Order Mask）
<USP>
```

* LineTerminator 换行符
``` xml
<LF> U+00A LINE FEED(LF)  换行 \n

<CR> U+00D CARRIAGE RETURN(CR) 回车 \r

U+2028 LINE SEPAR

U+

```

* Comment 注释

单行注释：//开头，换行符结束  

多行注释 /**/

* Token
    * Punctuator   符号（）=<>

    * IndentifierName     变量名/属性名，关键字首先以变量名定义
       ```

       ```


    * Literal 直接量，如数字、null true false
        Number


## JavaScript 类型

    Number String Null Undefined Boolean Object Symbol

### Number
    
    * IEEE 754 Duble Float
        * Sign(1)
        * Exponent (11)
        * Fraction (52)
``` js
var a = 0.1;
var b = 0.2;

//建立两个共享buffer的数组
const intarr = new Uint8Array(8)

const memory = new Float64Array(intarr.buffer);
memory[0] = a;

console.log(intarr);
intarr[0] = 0b00000000;
intarr[1] = 0b00001000;

// for(let i = 0; i<8; i++){
//     // let s = (intarr[i].toString(2).padStart(8,0))
//     let s = (intarr[i].toString(2))
//     console.log(new Array(9-s.length+1).join("0"),s);
// }


```

parseInt("09");

### 课堂作业：写一个正则 匹配JavaScrpit所有Number直接量

## String--Encoding

* UTF

UTF8 存储'ab'只需要两个字节  
UTF16存储'ab'需要四个字节

JavaScript实际以UTF16把字符存贮在内存中

### 课堂作业2：写一个UTF-8 Encoding的函数
function UTF8_Encoding(){
    return UTF8_String;
}

``` js
//Template解析顺序
`I said: "${        //第一部分
    s1              //第二部分
}","${              //第三部分
    s2              //第四部分
}"`                 //第五部分


```

```
七七老师(奇想)
席平川:
问号在前面是反向查找？
@席平川  在左括号的后边加上:?，用来关闭圆括号的捕获能力，只是用它来做分组。
如下：$1的内容只能是steak或者burger，而永远不可能是bronto。
while(<>){
    if(/(?:bronto)(steak|burger)/){
        print "Fred wants a $1\n" ;
    }
}
```