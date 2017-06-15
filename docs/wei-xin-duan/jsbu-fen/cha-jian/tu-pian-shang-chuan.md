微信端的图片上传是把图片转成base64格式再上传,依赖jQuery版本为1.11.0，支持裁剪，需要的文件在\include\c\_multi\_img\_upload.ftl中，使用方式：

```
$(function () {
    uploadComponent._options.width = 350; //裁剪区域宽高
    uploadComponent._options.height = 350;
    uploadComponent._options.noclip = true; // 是否裁剪
    uploadComponent._options.rate = .66;  // 压缩比率
    uploadComponent.init();
});
```





