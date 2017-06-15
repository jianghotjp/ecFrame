[DownCount](https://github.com/sonnyt/downCount)  因需要传入服务器时间，在原来插件基础上做了修改：

```
<p class="countdown">
    <span class="hours">00</span>时
    <span class="minutes">00</span>分
    <span class="seconds">00</span>秒
</p>
<!--span上的class为必须-->
<script>
    $('.countdown').downCount({
        date: date,   //结束时间
        offset: +8,   //时区
        now_date: now_date    //开始时间、服务器时间
    }, function () {
        // 倒计时执行完回调函数
    });
</script>
```





