> 了解一个功能的原理最简单暴力的方法就是自己亲自去实现。

# spa-demo

一个简单的原生SPA单页面项目

# introduce

单页面项目，在实现多页面显示效果的时候路由(router)则成了核心功能之一。

> 除了 `fetch.js` 用于异步加载其他页面 `html` 的内容之外，剩余 `script` 均为原生js
> 
> **注意：这是一个静态 `web` 项目，由于使用了 `fetch` 工具，因此需要放到 `web` 容器部署支持**

部分所需知识点：

+ 前端页面路由 `router` 实现基本逻辑就是通过 `#` 后面的内容来路由切换加载显示的内容

+ 获取 `url` 中的 `#` 之后的内容:

  ```javascript
  function getHash(){
    return window.location.hash;
  }
  // e.g. 'http://example.com/#/home/Nero' -> '#/home/Nero'
  ```

+ 对 `url` 中的 `#` 之后内容增加监听器

  ```javascript
  window.addEventListener('hashchange',function(e){
    // e -> HashChangeEvent
    // ...
  });
  ```

该案例核心逻辑

```flow
st=>start: url锚点访问
e=>end: 切换结束

listenEvent=>operation: 监听url锚点改变
switchBefore=>condition: 是否已经有加载该页面?

switching=>operation: 异步加载页面
switchFinally=>operation: 切换显示页面

st->listenEvent->switchBefore
switchBefore(yes)->switching
switchBefore(no)->switchFinally
switching->switchFinally
switchFinally->e
```