依赖[qrcode.js](https://github.com/davidshimjs/qrcodejs/)（实现二维码数据计算的核心类）和[ jquery.qrcode.js](https://github.com/jeromeetienne/jquery-qrcode)（把qrcode用jquery方式封装起来的，用它来实现图形渲染，支持canvas和table两种方式），使用方式：

```
$('#output').qrcode('http://www.jerei.com')
```



