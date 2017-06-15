使用[jquery.slideunlock.js](https://github.com/gitmiu/jquery.slideunlock.js)，在源码基础上做了调整，增加重置方法，

```
<div id="range">
    <div id="slider_bg"></div>
    <span id="label">>></span> <span id="labelTip">拖动滑块验证</span>
</div>
<script>
var slider = new SliderUnlock('#range', {
    successLabelTip: '欢迎登录EMALL商城'
  }, function() {
    // 滑动验证成功
    if (!$('#mobile').hasClass('lenPassed')) {
      toast('请填写手机号', 'warning');
      slider.restart();//  重置
    } else if (!$('#mobile').hasClass('passed')) {
      toast('手机号格式错误', 'warning');
      slider.restart();
    } else {
      $('.step1 .am-btn').removeClass('am-disabled');
    }
  });
  slider.init();
  </script>
```





