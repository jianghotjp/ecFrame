[html2canvas](https://github.com/gitmiu/html2canvas)  html转成图片 因直接截图不清晰，所以在源码基础上做了调整，传参时宽高要乘2，html里的图片不要用百分比设置宽高，否则会缩小变形。

```
var ct = $('.mui-content');
var width = ct.width();
var height = ct.height();
html2canvas(ct, {
    timeout: 300,
    width: width * 2,
    height: height * 2,
    onrendered: function (canvas) {
    // 回调
    }
});
```





