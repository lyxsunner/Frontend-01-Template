#### 组件化 | 手势

1 . 手势类型

* tap 
* press
* pan
* flick

tap 手指一点
pan 较慢的拖拽
flink 很快的划过
press 长时间按住

- 事件监听
- 手势判断
- 事件派发

# css 动画中间要停止再开始则不能使用 css 动画本身来做，要用 js

- css 动画中间产生 matrix 函数，是由 rotate，scale，translate，skew 产生的矩阵，如果添加了 skew，则无法反解

### General

*   Mobile gesture
    *   start -> end -> tap
    *   start -> 0.5 -> pressstart
    *   start -> move 10px -> panstart
    *   pressstart -> move 10px -> panstart
    *   pressstart -> end -> pressend
    *   panstart -> move -> pan
    *   pan -> move -> pan
    *   pan -> end with speed -> flick
    *   pan -> end -> panend