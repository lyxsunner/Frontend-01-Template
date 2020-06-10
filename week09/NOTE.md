# 第9周
2
### Animation
3
- animation-name 时间曲线
4
- animation-duration 动画的时长
5
- animation-timing-function 动画的时间曲线
6
- animation-delay 动画开始前的延迟
7
- animation-iteration-count 动画播放次数
8
- animation-direction 动画方向
9
### Transition
10
- transition-property 要变换的属性
11
- transition-duration 变换的时长
12
- transition-timing-function 时间曲线
13
- transition-delay 延迟
14
### Other
15
- Gpu利用率越高 性能越好
16
### 常用实体
17
&quot;
18
&gt;
19
&lt;
20
&amp;
21
### 合法元素
22
- Element <tagName></tagName>
23
- Text 文本
24
- Comment  <!--注释-->
25
- DocumentType <!Doctype html>
26
- ProcessingInstruction <?a1?> 处理信息(没有用)
27
- CDATA <![CDATA[]]>
28
### NODE
29
- Element 元素型节点
30
- Document 文档根节点
31
- Character 字符数据 包括文本节点 注释 处理信息
32
- DocumentFragment 文档片段 不会产生真实dom 减少dom操作 可以作为性能优化的手段
33
- DocumentType 文档类型
34
### 导航类操作
35
- parentNode
36
- childNodes
37
- firstChild
38
- lastChild
39
- nextSibling
40
- previousSibling
41
### 修改操作
42
- appendChild
43
- insertBefore
44
- removeChild
45
- replaceChild
46
### 高级操作
47
- compareDocumentPosition 用于比较两个节点关系的函数
48
- contains 检查一个节点是否包含另外一个节点
49
- isEqualNode 检查两个节点是否完全相同
50
- isSameNode 检查两个节点是否是同一个节点 实际可以在JS中用===去判断
51
- cloneNode 复制一个节点 如果参数为true 会连同子元素做深拷贝
52
# Browser API
53
- DOM
54
  - DOM Tree
55
  - Events
56
  - Range
57
  - Traversal (废弃)
58
- CSSOM
59
- BOM
60
- Web Animation
61
- Crypto
62
### css属性及对应文档地址
63
[animation-delay](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-delay)    
64
[animation-direction](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-direction)    
65
[animation-duration](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-duration)    
66
[animation-fill-mode](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-fill-mode)    
67
[animation-iteration-count](https://www.w3.org/TR/css3-animations/#propdef-animation-iteration-count)    
68
[animation-name](https://www.w3.org/TR/css3-animations/#propdef-animation-name)    
69
[animation-play-state](https://www.w3.org/TR/2018/WD-css-animations-1-20181011/#propdef-animation-play-state)    
70
[animation-timing-function](https://www.w3.org/TR/css3-animations/#propdef-animation-timing-function)    
71
[background-attachment](https://www.w3.org/TR/css-backgrounds-3/#propdef-background-attachment)    
72
[background-blend-mode](https://www.w3.org/TR/2015/CR-compositing-1-20150113/#propdef-background-blend-mode)    
73
[background-clip](https://www.w3.org/TR/css3-background/#propdef-background-clip)    
74
[background-color](https://www.w3.org/TR/css3-background/#propdef-background-color)    
75
[background-image](https://www.w3.org/TR/css3-background/#propdef-background-image)    
76
[background-origin](https://www.w3.org/TR/css3-background/#propdef-background-origin)    
77
[background-position](https://www.w3.org/TR/css3-background/#propdef-background-position)    
78
[background-repeat](https://www.w3.org/TR/css3-background/#propdef-background-repeat)    
79
[background-size](https://www.w3.org/TR/css3-background/#propdef-background-size)    
80
[border-bottom-color](https://www.w3.org/TR/css3-background/#propdef-border-bottom-color)    
81
[border-bottom-left-radius](https://www.w3.org/TR/css3-background/#propdef-border-bottom-left-radius)    
82
[border-bottom-right-radius](https://www.w3.org/TR/css3-background/#propdef-border-bottom-right-radius)    
83
[border-bottom-style](https://www.w3.org/TR/css3-background/#propdef-border-bottom-style)    
84
[border-bottom-width](https://www.w3.org/TR/css3-background/#propdef-border-bottom-width)    
85
[border-collapse](https://www.w3.org/TR/2019/WD-css-tables-3-20190727/#propdef-border-collapse)    
86
[border-image-outset](https://www.w3.org/TR/css3-background/#propdef-border-image-outset)    
87
[border-image-repeat](https://www.w3.org/TR/css3-background/#propdef-border-image-repeat)    
88
[border-image-slice](https://www.w3.org/TR/css3-background/#propdef-border-image-slice)    
89
[border-image-source](https://www.w3.org/TR/css3-background/#propdef-border-image-source)    
90
[border-image-width](https://www.w3.org/TR/css3-background/#propdef-border-image-width)    
91
[border-left-color](https://www.w3.org/TR/css3-background/#propdef-border-left-color)    
92
[border-left-style](https://www.w3.org/TR/css3-background/#propdef-border-left-style)    
93
[border-left-width](https://www.w3.org/TR/css3-background/#propdef-border-left-width)    
94
[border-right-color](https://www.w3.org/TR/css3-background/#propdef-border-right-color)    
95
[border-right-style](https://www.w3.org/TR/css3-background/#propdef-border-right-style)    
96
[border-right-width](https://www.w3.org/TR/css3-background/#propdef-border-right-width)    
97
[border-top-color](https://www.w3.org/TR/css3-background/#propdef-border-top-color)    
98
[border-top-left-radius](https://www.w3.org/TR/css3-background/#propdef-border-top-left-radius)    
99
[border-top-right-radius](https://www.w3.org/TR/css3-background/#propdef-border-top-right-radius)    
100
[border-top-style](https://www.w3.org/TR/css3-background/#propdef-border-top-style)    
101
[border-top-width](https://www.w3.org/TR/css3-background/#propdef-border-top-width)    
102
[bottom](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-bottom)    
103
[box-shadow](https://www.w3.org/TR/css3-background/#propdef-box-shadow)    
104
[box-sizing](https://www.w3.org/TR/css-sizing-3/#propdef-box-sizing)    
105
[break-after](https://www.w3.org/TR/css3-break/#propdef-break-after)    
106
[break-before](https://www.w3.org/TR/css3-break/#propdef-break-before)    
107
[break-inside](https://www.w3.org/TR/css3-break/#propdef-break-inside)    
108
[caption-side](https://www.w3.org/TR/CSS21/tables.html#propdef-caption-side)    
109
[clear](https://www.w3.org/TR/CSS21/visuren.html#propdef-clear)    
110
[clip](https://www.w3.org/TR/css-masking-1/#propdef-clip)    
111
[color](https://www.w3.org/TR/css3-color/#color0)    
112
[content](https://www.w3.org/TR/CSS2/generate.html#propdef-content)    
113
[cursor](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-cursor)    
114
[direction](https://www.w3.org/TR/css-writing-modes-3/#propdef-direction)    
115
[display](https://www.w3.org/TR/2020/CR-css-display-3-20200519/#propdef-display)    
116
[empty-cells](https://www.w3.org/TR/2019/WD-css-tables-3-20190727/#propdef-empty-cells)    
117
[float](https://www.w3.org/TR/CSS21/visuren.html#propdef-float)    
118
[font-family](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-family)    
119
[font-kerning](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-kerning)    
120
[font-optical-sizing](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-optical-sizing)    
121
[font-size](https://www.w3.org/TR/css-fonts-3/#propdef-font-size)    
122
[font-stretch](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-stretch)    
123
[font-style](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-style)    
124
[font-variant](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant)    
125
[font-variant-ligatures](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-ligatures)    
126
[font-variant-caps](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-caps)    
127
[font-variant-numeric](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-numeric)    
128
[font-variant-east-asian](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-variant-east-asian)    
129
[font-weight](https://www.w3.org/TR/2019/WD-css-fonts-4-20191113/#propdef-font-weight)    
130
[height](https://www.w3.org/TR/CSS21/visudet.html#propdef-height)    
131
[image-orientation](https://www.w3.org/TR/2019/CR-css-images-3-20191010/#propdef-image-orientation)    
132
[image-rendering](https://www.w3.org/TR/2019/CR-css-images-3-20191010/#propdef-image-rendering)    
133
[isolation](https://www.w3.org/TR/compositing-1/#propdef-isolation)    
134
[justify-items](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-justify-items)    
135
[justify-self](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-justify-self)    
136
[left](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-left)    
137
[letter-spacing](https://www.w3.org/TR/css-text-3/#propdef-letter-spacing)    
138
[line-height](https://www.w3.org/TR/CSS21/visudet.html#propdef-line-height)    
139
[list-style-image](https://www.w3.org/TR/css-lists-3/#propdef-list-style-image)    
140
[list-style-position](https://www.w3.org/TR/2019/WD-css-lists-3-20190817/#propdef-list-style-position)    
141
[list-style-type](https://www.w3.org/TR/css-lists-3/#propdef-list-style-type)    
142
[margin-bottom](https://www.w3.org/TR/css-box-4/#propdef-margin-bottom)    
143
[margin-left](https://www.w3.org/TR/css-box-4/#propdef-margin-left)    
144
[margin-right](https://www.w3.org/TR/css-box-4/#propdef-margin-right)    
145
[margin-top](https://www.w3.org/TR/css-box-4/#propdef-margin-top)    
146
[max-height](https://www.w3.org/TR/CSS21/visudet.html#propdef-max-height)    
147
[max-width](https://www.w3.org/TR/CSS21/visudet.html#propdef-max-width)    
148
[min-height](https://www.w3.org/TR/CSS21/visudet.html#propdef-min-height)    
149
[min-width](https://www.w3.org/TR/CSS21/visudet.html#propdef-min-width)    
150
[mix-blend-mode](https://www.w3.org/TR/compositing-1/#propdef-mix-blend-mode)    
151
[object-fit](https://www.w3.org/TR/css3-images/#propdef-object-fit)    
152
[object-position](https://www.w3.org/TR/2019/CR-css-images-3-20191010/#propdef-object-position)    
153
[offset-distance](https://www.w3.org/TR/2018/WD-motion-1-20181218/#propdef-offset-distance)    
154
[offset-path](https://www.w3.org/TR/2018/WD-motion-1-20181218/#propdef-offset-path)    
155
[offset-rotate](https://www.w3.org/TR/2018/WD-motion-1-20181218/#propdef-offset-rotate)    
156
[opacity](https://www.w3.org/TR/css-color-4/#propdef-opacity)    
157
[orphans](https://www.w3.org/TR/css3-break/#propdef-orphans)    
158
[outline-color](https://www.w3.org/TR/css3-ui/#propdef-outline-color)    
159
[outline-offset](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-outline-offset)    
160
[outline-style](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-outline-style)    
161
[outline-width](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-outline-width)    
162
[overflow-anchor](https://www.w3.org/TR/2020/WD-css-scroll-anchoring-1-20200211/#propdef-overflow-anchor)    
163
[overflow-wrap](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-overflow-wrap)    
164
[overflow-x](https://www.w3.org/TR/css-overflow-3/#propdef-overflow-x)    
165
[overflow-y](https://www.w3.org/TR/css-overflow-3/#propdef-overflow-y)    
166
[padding-bottom](https://www.w3.org/TR/css-box-4/#propdef-padding-bottom)    
167
[padding-left](https://www.w3.org/TR/css-box-4/#propdef-padding-left)    
168
[padding-right](https://www.w3.org/TR/css-box-4/#propdef-padding-right)    
169
[padding-top](https://www.w3.org/TR/css-box-4/#propdef-padding-top)    
170
[pointer-events](https://www.w3.org/TR/svg2/interact.html#PointerEventsProperty)    
171
[position](https://www.w3.org/TR/css3-positioning/#propdef-position)    
172
[resize](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-resize)    
173
[right](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-right)    
174
[scroll-behavior](https://www.w3.org/TR/2016/WD-cssom-view-1-20160317/#propdef-scroll-behavior)    
175
[speak](https://www.w3.org/TR/2020/CR-css-speech-1-20200310/#speak)    
176
[table-layout](https://www.w3.org/TR/2019/WD-css-tables-3-20190727/#propdef-table-layout)    
177
[tab-size](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-tab-size)    
178
[text-align](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-text-align)    
179
[text-align-last](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-text-align-last)    
180
[text-decoration](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration)    
181
[text-decoration-line](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-line)    
182
[text-decoration-style](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-style)    
183
[text-decoration-color](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-color)    
184
[text-decoration-skip-ink](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-decoration-skip-ink)    
185
[text-underline-position](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-underline-position)    
186
[text-indent](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-text-indent)    
187
[text-rendering](https://www.w3.org/TR/svg2/painting.html#TextRenderingProperty)    
188
[text-shadow](https://www.w3.org/TR/2020/WD-css-text-decor-4-20200506/#propdef-text-shadow)    
189
text-size-adjust    
190
[text-overflow](https://drafts.csswg.org/css-overflow-4/#propdef-text-overflow)    
191
[text-transform](https://www.w3.org/TR/css-text-3/#propdef-text-transform)    
192
[top](https://www.w3.org/TR/2020/WD-css-position-3-20200519/#propdef-top)    
193
touch-action    
194
[transition-delay](https://www.w3.org/TR/2018/WD-css-transitions-1-20181011/#propdef-transition-delay)    
195
[transition-duration](https://www.w3.org/TR/css3-transitions/#propdef-transition-duration)    
196
[transition-property](https://www.w3.org/TR/css3-transitions/#propdef-transition-property)    
197
[transition-timing-function](https://www.w3.org/TR/2018/WD-css-transitions-1-20181011/#propdef-transition-timing-function)    
198
[unicode-bidi](https://www.w3.org/TR/css-writing-modes-3/#propdef-unicode-bidi)    
199
[vertical-align](https://www.w3.org/TR/css-inline-3/#propdef-vertical-align)    
200
[visibility](https://www.w3.org/TR/CSS21/visufx.html#propdef-visibility)    
201
[white-space](https://www.w3.org/TR/css-text-3/#propdef-white-space)    
202
[widows](https://www.w3.org/TR/css-break-4/#propdef-widows)    
203
[width](https://www.w3.org/TR/CSS21/visudet.html#propdef-width)    
204
[will-change](https://www.w3.org/TR/css-will-change-1/#propdef-will-change)    
205
[word-break](https://www.w3.org/TR/css-text-3/#propdef-word-break)    
206
[word-spacing](https://www.w3.org/TR/css-text-3/#propdef-word-spacing)    
207
[z-index](https://www.w3.org/TR/CSS21/visuren.html#propdef-z-index)    
208
[zoom](https://www.w3.org/TR/2016/WD-css-device-adapt-1-20160329/#descdef-viewport-zoom)    
209
[backface-visibility](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-backface-visibility)    
210
[column-count](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-count)    
211
[column-gap](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-column-gap)    
212
[column-rule-color](https://www.w3.org/TR/css3-multicol/#propdef-column-rule-color)    
213
[column-rule-style](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-rule-style)    
214
[column-rule-width](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-rule-width)    
215
[column-span](https://www.w3.org/TR/2019/WD-css-multicol-1-20191015/#propdef-column-span)    
216
[column-width](https://www.w3.org/TR/css3-multicol/#propdef-column-width)    
217
backdrop-filter    
218
[align-content](https://www.w3.org/TR/css3-align/#propdef-align-content)    
219
[align-items](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-align-items)    
220
[align-self](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-align-self)    
221
[flex-basis](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-basis)    
222
[flex-grow](https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#propdef-flex-grow)    
223
[flex-shrink](https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#propdef-flex-shrink)    
224
[flex-direction](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-direction)    
225
[flex-wrap](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-wrap)    
226
[justify-content](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-justify-content)    
227
[grid-auto-columns](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-auto-columns)    
228
[grid-auto-flow](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-auto-flow)    
229
[grid-auto-rows](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-auto-rows)    
230
[grid-column-end](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-column-end)    
231
[grid-column-start](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-column-start)    
232
[grid-template-areas](https://www.w3.org/TR/css-grid-1/#propdef-grid-template-areas)    
233
[grid-template-columns](https://www.w3.org/TR/css-grid-1/#propdef-grid-template-columns)    
234
[grid-template-rows](https://www.w3.org/TR/css-grid-1/#propdef-grid-template-rows)    
235
[grid-row-end](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-row-end)    
236
[grid-row-start](https://www.w3.org/TR/2017/CR-css-grid-1-20171214/#propdef-grid-row-start)    
237
[row-gap](https://www.w3.org/TR/2020/WD-css-align-3-20200421/#propdef-row-gap)    
238
[hyphens](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-hyphens)    
239
[order](https://www.w3.org/TR/css-flexbox-1/#propdef-order)    
240
[perspective](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-perspective)    
241
[perspective-origin](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-perspective-origin)    
242
[shape-outside](https://www.w3.org/TR/css-shapes-1/#propdef-shape-outside)    
243
[shape-image-threshold](https://www.w3.org/TR/2014/CR-css-shapes-1-20140320/#propdef-shape-image-threshold)    
244
[shape-margin](https://www.w3.org/TR/2014/CR-css-shapes-1-20140320/#propdef-shape-margin)    
245
[transform](https://www.w3.org/TR/css-transforms-1/#propdef-transform)    
246
[transform-origin](https://www.w3.org/TR/css-transforms-1/#propdef-transform-origin)    
247
[transform-style](https://www.w3.org/TR/2020/WD-css-transforms-2-20200303/#propdef-transform-style)    
248
[user-select](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-user-select)    
249
buffered-rendering    
250
[clip-path](https://www.w3.org/TR/css-masking-1/#propdef-clip-path)    
251
[clip-rule](https://www.w3.org/TR/css-masking-1/#propdef-clip-rule)    
252
[mask](https://www.w3.org/TR/css-masking-1/#propdef-mask)    
253
[filter](https://www.w3.org/TR/filter-effects-1/#propdef-filter)    
254
[flood-color](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-flood-color)    
255
[flood-opacity](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-flood-opacity)    
256
[lighting-color](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-lighting-color)    
257
[stop-color](https://www.w3.org/TR/svg2/pservers.html#StopColorProperty)    
258
[stop-opacity](https://www.w3.org/TR/svg2/pservers.html#StopOpacityProperty)    
259
[color-interpolation](https://www.w3.org/TR/svg2/painting.html#ColorInterpolationProperty)    
260
[color-interpolation-filters](https://www.w3.org/TR/2018/WD-filter-effects-1-20181218/#propdef-color-interpolation-filters)    
261
[color-rendering](https://www.w3.org/TR/svg2/painting.html#ColorRenderingProperty)    
262
[fill](https://www.w3.org/TR/fill-stroke-3/#propdef-fill)    
263
[fill-opacity](https://www.w3.org/TR/svg2/painting.html#FillOpacityProperty)    
264
[fill-rule](https://www.w3.org/TR/svg2/painting.html#FillRuleProperty)    
265
[marker-end](https://www.w3.org/TR/svg2/painting.html#MarkerEndProperty)    
266
[marker-mid](https://www.w3.org/TR/svg2/painting.html#MarkerMidProperty)    
267
[marker-start](https://www.w3.org/TR/svg2/painting.html#MarkerStartProperty)    
268
[mask-type](https://www.w3.org/TR/2014/CR-css-masking-1-20140826/#propdef-mask-type)    
269
[shape-rendering](https://www.w3.org/TR/svg2/painting.html#ShapeRenderingProperty)    
270
[stroke](https://www.w3.org/TR/fill-stroke-3/#propdef-stroke)    
271
[stroke-dasharray](https://www.w3.org/TR/svg2/painting.html#StrokeDasharrayProperty)    
272
[stroke-dashoffset](https://www.w3.org/TR/svg2/painting.html#StrokeDashoffsetProperty)    
273
[stroke-linecap](https://www.w3.org/TR/svg2/painting.html#StrokeLinecapProperty)    
274
[stroke-linejoin](https://www.w3.org/TR/svg2/painting.html#StrokeLinejoinProperty)    
275
[stroke-miterlimit](https://www.w3.org/TR/svg2/painting.html#StrokeMiterlimitProperty)    
276
[stroke-opacity](https://www.w3.org/TR/svg2/painting.html#StrokeOpacityProperty)    
277
[stroke-width](https://www.w3.org/TR/fill-stroke-3/#propdef-stroke-width)    
278
[alignment-baseline](https://www.w3.org/TR/css-inline-3/#propdef-alignment-baseline)    
279
[baseline-shift](https://www.w3.org/TR/SVG11/text.html#BaselineShiftProperty)    
280
[dominant-baseline](https://www.w3.org/TR/css-inline-3/#propdef-dominant-baseline)    
281
[text-anchor](https://www.w3.org/TR/svg2/text.html#TextAnchorProperty)    
282
[writing-mode](https://www.w3.org/TR/css-writing-modes-4/#propdef-writing-mode)    
283
[vector-effect](https://www.w3.org/TR/svg2/coords.html#VectorEffectProperty)    
284
[paint-order](https://www.w3.org/TR/svg2/painting.html#PaintOrderProperty)    
285
d    
286
cx    
287
cy    
288
x    
289
y    
290
[r](https://www.w3.org/TR/svg2/geometry.html#RProperty)    
291
rx    
292
ry    
293
[caret-color](https://www.w3.org/TR/2020/WD-css-ui-4-20200124/#propdef-caret-color)    
294
[line-break](https://www.w3.org/TR/2020/WD-css-text-3-20200429/#propdef-line-break)