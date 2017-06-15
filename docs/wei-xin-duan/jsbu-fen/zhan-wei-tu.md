可以手动设置在元素上加dataContent和seize的class，然后设置高度，或者用js设置在getJson/getWidgetData时多传一个参数，同时被追加的元素加data-height属性，使用如下：

```
<ul class="sort_left dataContent seize"  id="sortListLeft"></ul>
<style>
    .sort_left{height:4rem};
</style>
```

或者：

```
<ul class="sort_left dataContent" data-height="4rem" id="sortListLeft"></ul>
<script>
getWidgetData(data.name, data.datatype, function (res) {
    var widgetData = {
        vars: vars,
        xData: res.data.widgetData || null
    };
    renderTmp(el, data.tplid, widgetData);
    lazyLoad.refresh(true);
},'#sortListLeft');
</script>
```



