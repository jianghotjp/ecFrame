imgFormat\(url,format,\[isZip\],\[notForTpl\]\)   图片格式化集成错误图片替换，返回一个拼接好的URL

，输出时不转义输出，artTemplate需要加\#，使用方式：



```html
/**
*@param {String} url 图片路径， 
* @param {String}format 后台拦截器裁剪尺寸 
*@param {Boolean} isZip 是否使用压缩（否的话原图输出），
*@param {Boolean} notForTpl只返回路径，不拼接img标签需要的onerror
*/
<img src="<%=#imgFormat(xData[i], '750x750.png',false)%>">
```





