getJson\(url,param,success,error\)  异步json获取

```
/**
* 异步json获取
* @param {String} url 接口地址
* @param {Object} param 发送数据
* @param {Function} [success] 成功回调
* @param {Function} [error] 错误回调
*/
getJson('/ec/goods/doFindGoods.do', {
goodsId: 129
}, function (res) {
if(!res.success){
mui.toast(res.errorMessage);
setTimeout(function(){
mui.back();
},1000);
}
})
```



