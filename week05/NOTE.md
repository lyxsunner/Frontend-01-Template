## Week05(2020.5.7)

## JS 执行粒度

- JS Context => Realm
- 宏任务
- 微任务
- 函数调用
- 语句/声明
- 表达式
- 直接量/变量/this


## Realm

在 JavaScript 中，函数表达式合对象直接量均会创建对象

使用 `.` 做隐式转换也会创建对象

这些对象也是有原型的，


## 函数调用


## 执行上下文栈（Execution Context Stack）

- Execution Context

- Running Execution Context


### Execution Context

- code evaluation
- Function
- Script or Module
- Generator
- Realm
- LexicalEnvironment
- VariableEnvironment


### LexicalEnvironment

- this
- new.target
- super
- 变量


### VariableEnvironment

是历史遗留，仅仅用于处理 `var` 声明

```js
{
  let y = 2;
  eval('var x = 1;');
}
with ({ a: 1 }) {
  eval('var x;');
}
console.log(x);
```


### Environment Record

- Declarative Environment Records

	- Function Environment Records
	- module Environment Records

- Global Environment Records

- Object Environment Records (with)


## Function - Closure


## Week05(2020.5.9)

## 浏览器工作原理


### URL 到显示

1. URL — HTTP —> 
2. HTML — parse —> 
3. DOM — css computing —> 
4. DOM with CSS — layout —> 
5. DOM with position — render —> 
6. Bitmap


## ISO-OSI 七层网络模型

* 应用
* 表示
* 会话
* 传输
* 网络
* 数据链路
* 物理

* 应用	      HTTP
* 传输	      TCP/UDP
* 网络       IP
* 数据链路     4G/5G/WIFI


## TCP 和 IP 的一些基础知识

* 流
* 端口
* `require('net')`

* 包
* IP 地址
* libnet/libpcap


## HTTP

* Request
* Response
