使用mui提供的懒加载,每次新增图片都要调用refresh方法更新，初始化懒加载的代码在common中，若要替换图片，可到common中修改

```js
// common
var lazyLoad = mui('body').imageLazyload({
    placeholder: '/resources/images/placeholder.png',
    autoDestroy: false
  });
```

使用方式：

```
<img data-lazyload="image.jpg">
<script>
  lazyLoad.refresh(true);
</script>
```





