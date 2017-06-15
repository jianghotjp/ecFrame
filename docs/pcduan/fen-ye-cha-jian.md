参数列表：

 pageCount - 页面总数。必填。

current - 当前页码。必填。

type - 提供两种分页方式，默认是带数字的分页type1，翻页式为type2。必填。

showLen - 分页显示页码总个数。选填。

side=2 - 分页两侧显示页码个数。选填。

center=5 - 分页中间显示页码个数。选填。

callback=function\(current,obj,args\){} - 点击页码或上一页/下一页按钮时提供回调函数。选填。注意：传递回调函数后，将阻止页面数字按钮和翻页按钮的页面跳转事件。

hideForOnlyOnePage - 当页面长度为1时是否需要加载分页插件，true为不加载。选填。

使用方式：

```
$('#btmPaging').createPage({
    current: page.page,
    type: 1,
    pageCount: pageCount,
    side: 5,
    center: 3,
    showLen: 11,
    callback: function (curidx, obj) {
        page.page = curidx;
        $('#container').empty();
        $('#btmPaging0').empty();
        getData();
        $('.footer').hide();
        $(window).scrollTop(0);
        $('.footer').show()
    }
});
```





