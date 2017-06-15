ios端有返回上一级页面不刷新的问题，此方法可强制执行js，但由后端模板引擎渲染的页面无法刷新

```
window.addEventListener('pagehide', function(e) {
    var $body = $(document.body);
    $body.children().remove();
    // 要等到回调函数完成，用户按返回才执行script标签的代码
    setTimeout(function() {
        $body.append("<script type='text/javascript'>window.location.reload();<\/script>");
    });
});
```





