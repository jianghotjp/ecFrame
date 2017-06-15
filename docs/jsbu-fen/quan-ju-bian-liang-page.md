定义了一个全局变量page作为页面数据命名空间，在其中存放页面中需要用到的变量，减少全局变量的污染。

\`page.url\`  对URL的操作

```
location.href = "http://192.168.50.114:8083/m/ec/goods/index.html?id=1"
// 返回完整url
page.url.url // http://192.168.50.114:8083/m/ec/goods/index.html?id=1
// 返回url参数
page.url.paras //  {id: "1"}
// 返回不包含参数的url
page.url.pathname //  http://192.168.50.114:8083/m/ec/goods/index.html
// 取URL参数
page.url.get('id')  // 1
// 设置URL参数
page.url.set({'kw':'abc'})  // http://192.168.50.114:8083/m/ec/goods/index.html?id=1&kw=abc
// 重构url
page.url.build()
// 移除url参数
page.url.remove('id') // http://192.168.50.114:8083/m/ec/goods/index.html?kw=abc
```

page.page  页码 默认0，应在success里做自增操作

page.pageSize  每页显示个数，默认10

