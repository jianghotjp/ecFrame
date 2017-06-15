使用rem做单位，设计图宽度750px，定义html的font-size为 13.33333333vw，即1rem=100px。body的font-size为0.32rem，即16px。

对mui的hack在mui.util.less中。

使用雪碧图，切图注意rem的小数像素问题。

渲染模板时，被追加数据的元素需要加dataContent的class，主要作用设置透明度为0，追加完数据后会自动加show的class，透明度置为1，使用方式：

```
<ul class="sort_left dataContent"  id="sortListLeft"></ul>
```



