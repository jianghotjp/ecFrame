使用[Masonry](https://masonry.desandro.com/layout.html)，瀑布流的懒加载使用[imagesLoaded](https://imagesloaded.desandro.com/)

```
var msny=$('#postingsList').masonry({    //初始化
    itemSelector: '.postings_item'
});
// 新增图片后更新
msny.imagesLoaded().progress( function(instance, image) {
    if(!image.isLoaded ){
        $(image.img).attr('src',vars.theme.root+"/resources/images/placeholder.png").css('height','200px')
    }
    msny.masonry('layout').masonry('reloadItems');
});
```







