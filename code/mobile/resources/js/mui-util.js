// mui 风格扩展

/**
 * toast
 * @param {string} message 弹出字符串
 * @param {string} type success/info/warn/error 四种类型
 */
var toast = function (message, type) {
  if (mui.os.plus) {
    //默认显示在底部；
    mui.plusReady(function() {
      plus.nativeUI.toast(message, {
        verticalAlign: 'bottom'
      });
    });
  } else {
    var obj = document.createElement('div');
    obj.classList.add('mui-toast-container');
    obj.innerHTML = '<div class="' + 'mui-toast-message ' + type +'">' + message + '</div>';
    obj.addEventListener('webkitTransitionEnd', function() {
      if (!obj.classList.contains('mui-active')) {
        obj.parentNode.removeChild(obj);
      }
    });
    document.body.appendChild(obj);
    obj.offsetHeight;
    obj.classList.add('mui-active');
    setTimeout(function() {
      obj.classList.remove('mui-active');
    }, 2000);
  }
};