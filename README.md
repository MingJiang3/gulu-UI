# gulu-UI - 一个Vue UI组件

[![Build Status](https://travis-ci.org/MingJiang3/gulu-UI.svg?branch=master)](https://travis-ci.org/MingJiang3/gulu-UI)

## 介绍

在学习 Vue 的过程中，第一次尝试写一个 UI 框架，持续更新 ......

## 开始使用

1、添加 CSS 样式
使用框架前，请在 CSS 中用 border-box
```
*,*::before,*::after{box-sizing:border-box}
```
还需要设置默认颜色变量（后续会改为 SCSS 变量）
```
    html {
         --button-height: 32px;
         --font-size: 14px;
         --button-bg: white;
         --button-active-bg: #eee;
         --border-radius: 4px;
         --color: #333;
         --border-color: #999;
         --border-color-hover: #666;
    }
```
只支持 IE15 及以上浏览器

2、安装 gulu
```
npm i --sava gulu-lmj
```
3、引入 gulu
```
import {Button,ButtonGroup,Icon} from 'gulu-lmj'
import 'gulu-lmj/dist/index.css'

export default {
  name: 'app',
  components: {
    HelloWorld,
    'g-button':Button,
    'g-icon':Icon
  }
}
```




## 文档
## 提问
## 变更记录
## 联系方式
## 贡献代码

一个vue UI组件<br>
作者：MingJiang3
