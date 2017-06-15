**\`vars\` 定义路径**

```js
var vars = {
    root: "${vars.root}",       // 根目录
    clientRoot: "${vars.clientRoot}", //根目录或根目录\m，包含root
    uploadRoot: "${vars.uploadRoot}", //图片上传路径
    resourceFolder:"${vars.resourceFolder}",   // 资源路径  \resources 
    theme: {
        id: "${vars.theme.id}",     //模板id  emall-> default
        root: "${vars.theme.root}" //资源路径  \resources 
    }
};
```



使用方式：

```HTML
<a href="<%=vars.clientRoot%>/ex/goods/index.html"></a>
<link href="${vars.theme.root}/resources/css/mui.picker.css" rel="stylesheet"/>
```





