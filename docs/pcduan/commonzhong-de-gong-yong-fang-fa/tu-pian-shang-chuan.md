使用百度提供的[ WebUploader 0.1.5](http://fex.baidu.com/webuploader/)版本

    定义了webupload\(btn,list,num\)方法，btn 上传按钮 ， list      追加图片的列表,每个item中.info存放图片url ， num       允许上传图片的个数,使用方式：

```
<div class="upLoad_list"></div>
<div class="upload_btn">
    <span class="icon">+</span>
</div>

<script>
webupload('upload_btn','upLoad_list',3);
</script>
```



其中，upLoad\_list和upload\_btn为必要结构，图片上传后的URL存放在每个file-item的span.imgUrl中



