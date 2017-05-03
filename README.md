# 模拟滚动条

### 介绍

一个简单的模拟滚动条插件，支持pc和移动端，兼容性还有待加强。

主要是考虑到很多场景需要自定义滚动区域，所以才有这个插件。

### 原理

pc和移动端分别监听 mousewheel / touchmove 来设置滚动，

滚动效果通过 css3 的 transform: translate 实现，具体可以看源码。

### 使用

采用 es6 模块化书写，可以如下调用：

```
import Scrollbar from './scrollbar';

let myScrollbar = new Scrollbar({
    element: '.wrapper', // 滚动的容器
    scrollY: 0, // Y轴默认滚动的距离
    speed: 20, // 滚动的速度, 数字越大滚动的越快，建议用默认
    showBar: true // 是否显示滚动条

});

// 滚动到固定位置
myScrollbar.scrollTo(200);
```

### 不足

1、存在兼容性问题，在 js 中设置 transform 没有添加前缀；

2、欢迎提建议和意见。
