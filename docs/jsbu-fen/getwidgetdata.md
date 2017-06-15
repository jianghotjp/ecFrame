getWidgetData\(widgetName,type,success,error\) 根据组件名称返回数据

**\[注\] ** getWidgetData的 接口地址为/comm/widget/doSearchWidgetData.do，部分组件的接口地址不是这个地址，可自行封装。

```
/**
* @param widgetName 组件中文名
* @param type 组件数据类型
* @param {Function} [success] 成功回调函数（返回data）
* @param {Function} [error] 出错回调
*/
getWidgetData('PC-首页顶部轮播下方多图广告位',2, function (res) {
var data = {
vars: vars,
xData: res.data.widgetData
};
renderTmp('#topSilderad', 'topSilderadTpl', data);
lazyLoad.refresh(true);
});
```



