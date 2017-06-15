renderTmp\(selector,tmpId,data,callback\)

渲染模板，追加数据,传入callback时返回原生dom+html，不做数据追加处理,需手动追加。使用方式：

```
/**
* @param {String} selector 原生选择器，只处理第一个元素
* @param {String} tmpId 模板id，不需要加 #
* @param {JSON} data 后台返回的json数据
* @param {Function} [callback] 回调函数
*/
renderTmp('#topSilderad', 'topSilderadTpl', data);
```

或者：

```
renderTmp('#topSilderad', 'topSilderadTpl', data，function(el,html){
el.innerHTML += Tpl;
if(el.className.indexOf('show') < 0){
el.className += ' show';
}
});
```



