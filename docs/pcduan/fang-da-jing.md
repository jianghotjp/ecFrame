基于AmazeUI的插件[Amaze UI Magnifier](http://plugins.amazeui.org/magnifier.html#project=amazeui-magnifier&author=photino)

```
<figure class="am-magnifier">
    <img id="small-image" width="480" height="270" src="images/bing-rect.jpg" alt="Bing rect image">
    <div></div>
    <div class="am-margin-left-sm">
        <img width="1920" height="1080" src="images/bing-rect.jpg" alt="Bing rect image">
    </div>
</figure>
<script>
    $(function() {
        $('#small-image').magnify({
          shape: 'rect',
          width: 120
        });
    });
</script>
```



