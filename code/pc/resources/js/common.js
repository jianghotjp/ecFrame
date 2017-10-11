/**
 * 页面数据命名空间
 * @type {{id: null, page: number, pageSize: number}}
 */
var page = {
  id: null,
  page: 0,
  pageSize: 10
};
page.url = urlParas(window.location.href.split('#')[0]);

/**
 * 异步json获取
 * @desc 封装mui.ajax,预留app验证接口
 * @param {String} url 接口地址
 * @param {Object} param 发送数据
 *
 * @param {Function} [success] 成功回调
 * @param {Function} [error] 错误回调
 */
function getJson(url, param, success, error) {
  // loading.change(1);
  //JSONP.get({
  //    url: 'http://' + location.host + vars.root + url,
  //    key: '_jsonp',
  //    value: 'jsonp' + Math.floor(Math.random() * 10000),
  //    data: {
  //        goodsId: 5,
  //        type: 'all',
  //        page: 1,
  //        pageSize: 10
  //    },
  //    success: function (data) {
  //        console.info(JSON.stringify(data, null, 4));
  //    },
  //    error: function(errors) {
  //        console.error(errors);
  //    }
  //});
  $.ajax({
    type: 'POST',
    url: vars.root + url,
    data: param,
    dataType: 'json',
    success: function (data) {
      if (typeof success == 'function') {
        success(data);
      } else {
        console.info('send:' + JSON.stringify(param) + '\nto:' + url + '\nreturn:\n' + JSON.stringify(data, null, 4))
      }
      // loading.change(-1);
    },
    error: function (msg) {
      if (typeof error == 'function') {
        error(msg);
      } else {
        console.error('send:' + JSON.stringify(param) + '\nto:' + url + '\nstatus:' + msg.status + '\nreturn:\n' + JSON.stringify(msg))
      }
      //   loading.change(-1);
    }
  });
}

/**
 * 渲染模板，追加数据
 * @desc 传入callback时返回dom+html，不做数据追加处理
 * @param {String} selector mui选择器，只处理第一个元素
 * @param {String} tmpId 模板id
 * @param {JSON} data 后台返回的json数据
 * @param {Function} [callback] 回调函数
 * @example renderTmp('#brandList','brandItem',data);
 */
function renderTmp(selector, tmpId, data, callback) {
  var Tpl = template(tmpId, data), el;
  if ('object' == typeof selector) {
    el = selector;
  } else {
    el = $(selector)[0];
  }
  if (typeof callback == 'function') {
    callback(el, Tpl);
    return;
  }

  // el.innerHTML+= Tpl;
  $(el).append(Tpl);
  if (el.className.indexOf('show') < 0) {
    el.className += ' show';
  }
}

/**
 * 错误图片/替换图片样式模板
 * @desc 自定义皮肤
 * @param {String} mall 自定义皮肤名称
 * @param {String} bg 背景颜色
 * @param {String} fg 字体颜色
 * @param {Number} size 字号
 * @param {String} fontweight 字体加粗程度
 * @param {String} align 对齐
 */
Holder.addTheme('mall', {
  bg: '#f0f0f0',
  fg: '#f0f0f0',
  size: 12,
  font: 'consoles',
  fontweight: 'normal',
  align: 'center'
});

/**
 * 错误图片替换
 * @param size 图片宽高
 */
function errorImg(size) {
  var img = event.srcElement;
  img.setAttribute('data-oldSrc', img.getAttribute('src'));
  img.setAttribute('data-src', 'holder.js/' + size + '?theme=mall');
  img.onerror = null;
  Holder.run();
}

function imgFormat(url, format, isZip, notForTpl) {
  // format = format ? format : '.640x640.png';
  format = format ? format : '';
  if (format && format.indexOf('.') != 0) {
    format = '.' + format;
  }
  if ('boolean' == typeof isZip && !isZip) {
    url = vars.root + '/upload/' + url;
  } else {
    url = vars.root + '/upload/' + url + format;
  }

  //todo:更好的外部方案不在这拼字符串
  //拼接错误图片替换
  if (!!notForTpl && notForTpl) {
    return url;
  }
  var halfSize;
  if (format) {
    var size = format.split('.')[1];
    var arr = size.split('x');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(arr[i]);
    }
    halfSize = arr.join('x');
  }
  return url + '" ' + 'onerror="errorImg(\'' + halfSize + '\')';
}

/**
 * 处理页面跳转
 * @desc 浏览器location.href
 * @param href
 * @param {Boolean} [cantBack] true 禁止页面返回，替换url
 * @example toNewPage('http://www.baidu.com')
 */
function toNewPage(href, cantBack) {
  if (!href || href.indexOf('#') == 0 || href.indexOf('javascript') == 0) {
    return;
  }
  if (href.indexOf('http') != 0) {
    //for APP
    // href = 'http://192.168.191.1:8080' + href;
  }
  cantBack = cantBack ? cantBack : false;
  if (cantBack) {
    location.replace(href)
  } else {
    location.href = href;
  }
}

/**
 * 判断登录
 * @param toLogin    如果未登录，是否进入登录页面
 * @param callback   登录后的回调函数
 */
function checkLogin(toLogin, callback) {
  var argLen = arguments.length;
  //判断第一个参数类型
  if (arguments.length == 1 && 'function' == typeof toLogin) {
    callback = toLogin;
    toLogin = 0;
  }
  //判断是否有callback
  if ('function' != typeof callback) {
    callback = $.noop;
  }
  var curUrl = location.href;
  //未登录过
  if ('boolean' != typeof page.logined || page.logined == false) {
    getJson('/comm/login/doCheckPC.do', {
      curUrl: curUrl
    }, function (data) {
      page.logined = data.data.login;

      if (!data.data.url) {
        //因登录状态未在前台保存，从后台返回数据判断当前登录状态
        callback(data);
        return
      }
      if (toLogin || !argLen) {
        //不传参数或者需要跳登录页
        toNewPage(data.data.url);
      } else {
        //pafe.logined==fasle 时会走这个
        // callback()
      }

    });
  } else if (page.logined) {
    // 登录过
    callback();
  }
}
//带没登录回调的判断登录
//callback1登录的回调
//callback0没登录的回调
function checknoLogin(callback1,callback0) {
  //判断是否有callback
  if ('function' != typeof callback1) {
    callback1 = $.noop;
  }
  if ('function' != typeof callback0) {
    callback0 = $.noop;
  }
  var curUrl = location.href;
  //未登录过
  if ('boolean' != typeof page.logined || page.logined == false) {
    getJson('/comm/login/doCheckPC.do', {
      curUrl: curUrl
    }, function (data) {
      page.logined = data.data.login;
      if (data.data.url) {
        //因登录状态未在前台保存，从后台返回数据判断当前登录状态
        callback1();
        return
      }else{
        callback0();
        return
      }

    });
  } else if (page.logined) {
    callback1();
  }else{
    callback0();
  }
}

/**
 * 价格转换浮点型
 * @param {String} s 格式化价格文本
 * @return {Number}
 */
function rmoney(s) {
  return parseFloat(s.replace(/[^\d\.-]/g, ''));
}
/**
 * 根据组件名称返回数据
 * @param widgetName 组件中文名
 * @param {Function} [success] 成功回调函数（返回data）
 * @param {Function} [error] 出错回调
 */
function getWidgetData(widgetName, success, error) {
  getJson('/comm/widget/doSearchWidgetData.do', {widgetName: widgetName}, success, error);
}

/**
 * 内容超出自动扩展（textarea）
 * @param {String} selector jsDOM
 */
function autoGrow(selector) {
  if (selector.scrollHeight > selector.clientHeight) {
    selector.style.height = selector.scrollHeight + 'px';
  }
}

/**
 * 购物车商品数量显示方法
 * @type function
 * @desc 填充购物车商品数量
 */
var fillCartNum = function () {
  // 购物车数量
  checkLogin(function () {
    if (page.logined) {
      getJson('/mbr/doSelCartSize.do', {}, function (data) {
        if (data.data.cartSize) {
          $('.top_search .goods_cart_btn .am-badge ').text(data.data.cartSize).show();
        }
      });
    }
  });
};

/**
 * 页面顶部进度条展示方法
 * @type {{_num: null, change: Function, check: Function, done: Function, ing: Function}}
 * @desc {Object} _num 判断进度条显示状态  change 改变进度条状态  check 检查进度条状态  done 进度条隐藏  ing 进度条显示
 */
var loading = {
  _num: null,
  change: function (num) {
    if ('number' == typeof num) {
      if (0 < num) {
        this.ing()
      }
      if (this._num == null) {
        this._num = 0;
      }
      this._num = this._num + num;
      this.check();
    } else {
      if ($.isNumeric(num)) {
        this.change(parseInt(num));
      }
    }
  },
  check: function () {
    if (this._num == null) {
      return;
    }
    this._num = 0 < this._num ? this._num : 0;
    if (0 == this._num) {
      this.done();
    }
  },
  done: function () {
    //mui('body').progressbar().hide();
    //$('body').off('touchstart.loading')
  },
  ing: function () {
    //mui('body').progressbar().show();
    //$('body').on('touchstart.loading',function(){
    //    mui.toast('数据载入中，客官等下嘛~');
    //})
  }

};

/**
 * 格式化时间
 * @param date
 * @param format
 * @returns {string}
 */
function dateFormat(date, format) {
  if (date.indexOf('-') != -1) {
    date = date.replace('-', '/').replace('-', '/');
  }
  date = new Date(date);
  var map = {
    'M': date.getMonth() + 1, //月份
    'd': date.getDate(), //日
    'h': date.getHours(), //小时
    'm': date.getMinutes(), //分
    's': date.getSeconds(), //秒
    'q': Math.floor((date.getMonth() + 3) / 3), //季度
    'S': date.getMilliseconds() //毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
}
/**
 * 格式化金额
 * @param num
 * @param [format]
 * @returns {string}
 */
function moneyFormat(num, format) {
  format = format ? format : 0;
  if (format == 0) {
    return num;
  }
  format = format > 0 && format <= 20 ? format : 2;
  num = parseFloat((num + '').replace(/[^\d\.-]/g, '')).toFixed(format) + '';
  var l = num.split('.')[0].split('').reverse(),
    r = num.split('.')[1];
  var t = '';
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return t.split('').reverse().join('') + '.' + r;
}

function toUri(str) {
  str = str.toString() == str ? str.toString() : '';
  if (Base64.extendString) {
    Base64.extendString();
    return str.toBase64URI();
  }
}

function fromUri(str) {
  if (Base64.extendString) {
    Base64.extendString();
    return str.fromBase64();
  }
}
//初始化图片lazyload
var lazyLoad = {
  refresh: function () {
    $('img').lazyload({
      effect: 'fadeIn',
      data_attribute: 'lazyload',
      threshold: 200,
      failurelimit: 10
    });
  }
};
/**
 * 表单处理
 * @param {String} selector
 * @returns {Object} data
 */
function formFormat(selector) {
  var isOk = true;
  var data, form = $(selector);
  form.find('input,textarea').each(function () {
    //return: true/false
    if (!validForm(this)) {
      isOk = false;
    }
    var name = $(this).attr('name');
    data[name] = $.trim($(this).val());
  });

  return isOk ? data : false;

}

function validForm(el) {
  var type = $(el).data('type'),
    val = $.trim($(el).val()),
    required = $(el).attr('required');
  if ('undefined' == valid[type]) {
    return true;
  }
  if ('string' == typeof valid[type]) {
    var regexp = valid[type];
    return regexp.test(val);
  } else {
    return valid[type](val);
  }
}
// 验证条件
var valid = {
  //tele:function(val){
  //    if(true){
  //        return true;
  //    }else{
  //        return false;
  //    }
  //},
  tel: '/^1[34578]\d{9}$/',
  idCard: '/^(^\d{18}$|^\d{17}(\d|X))$/',
  email: '/^[a-zA-Z0-9.!#$%&"*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/',
  userName: ''
};

/**
 * 弹出提示信息
 * @param data  要弹出的内容
 * @param type  toast样式 success，error，warning
 * @param type  回调，关闭时执行
 */
page.toastNum = 1;
function toast(data, type, callback) {
  if ($('.toastBox').length == 0) page.toastNum = 1;
  var top = 15;
  if (!type) {
    type = 'success'
  }
  if ('function' != typeof callback) {
    callback = $.noop;
  }
  // id="toastBox toastBoxAuto"
  top = top + page.toastNum * 5;
  var $this = 'toastBox' + page.toastNum;
  var amalert = '<div class="toastBox am-alert alert_msg_fixed am-alert-' + type + ' ' + $this + '"  data-am-alert><button type="button" class="am-close">&times;</button><p>' + data + '</p></div>';
  $('body').append(amalert);
  if (page.toastNum >= 10) {
    page.toastNum = 1;
  } else {
    page.toastNum++;
  }

  $('.' + $this).css('top', top + '%');
  var t = setTimeout(function () {
    $('.' + $this).remove();
    callback()
  }, 5000);

  $('.toastBox').mouseenter(function () {
    clearTimeout(t)
  }).mouseleave(function () {
    $(this).remove();
    callback()
  });

}

/**
 *上传图片
 * @param btn       上传按钮
 * @param list      追加图片的列表,每个item中.info存放图片url
 * @param num       允许上传图片的个数
 */
// page.IMGURL = []; // page.IMGURL  为上传图片的URL， 删除时去除最后一个

function webupload(btn, list, num) {
  var playerVersion = swfobject.getFlashPlayerVersion();
  var ieVer = IEVersion();
  if (ieVer > 0 && ieVer < 10 && playerVersion.major < 12) {
    alert('当前浏览器不支持图片上传，请更换高级浏览器');
    return false
  }

  // 初始化Web Uploader
  var uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: true,
    //解决图片在ie9下不能上传
    swf: '/resources/js/module/Uploader.swf',
    // 文件接收服务端。
    server: vars.root + '/comm/upload/kfUploadPic.do',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    //选择器
    pick: '.' + btn,
    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
    allowMagnify: false,
    //允许上传的图片数量
    fileNumLimit: num ? num : 1,
    // 只允许选择图片文件。
    accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/gif,image/jpg,image/jpeg,image/png'
    }
  });
  // 当有文件添加进来的时候
  uploader.on('fileQueued', function (file) {
    var $li = $(
        '<div id="' + file.id + '" class="file-item thumbnail">' +
        '<div class="imgbox"><img></div>' +
        '<div class="ion remove text-danger">删除</div>' +
        '<div class="info">' + file.name + '</div>' +
        '</div>'
      ),
      $img = $li.find('img');

    // $list为容器jQuery实例
    $('.' + list).append($li);

    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb(file, function (error, src) {
      if (error) {
        $img.replaceWith('<span>不能预览</span>');
        return;
      }
      $img.attr('src', src);
    }, 1, 1);
  });
  // 文件上传过程中创建进度条实时显示。
  uploader.on('uploadProgress', function (file, percentage) {
    var $li = $('#' + file.id),
      $percent = $li.find('.progress span');

    // 避免重复创建
    if (!$percent.length) {
      $percent = $('<p class="progress"><span></span></p>')
        .appendTo($li)
        .find('span');
    }

    $percent.css('width', percentage * 100 + '%');
  });

  // 文件上传成功，给item添加成功class, 用样式标记上传成功。
  uploader.on('uploadSuccess', function (file, response) {

    $('#' + file.id).addClass('upload-state-done');
    if (response.status = 1) {
      $('#' + file.id).append('<span class="imgUrl">' + response.data.url + '</span>');
      // page.IMGURL.push( response.data.url)
    }
  });

  // 文件上传失败，显示上传出错。
  uploader.on('uploadError', function (file) {
    var $li = $('#' + file.id),
      $error = $li.find('div.error');

    // 避免重复创建
    if (!$error.length) {
      $error = $('<div class="error"></div>').appendTo($li);
    }
    $error.text('上传失败');
  });

  // 完成上传完了，成功或者失败，先删除进度条。
  uploader.on('uploadComplete', function (file) {
    $('#' + file.id).find('.progress').remove();
    // 最大上传数量隐藏按钮
    if ($('.' + list).find('.file-item').length == num) {
      $('.' + btn).hide();
    }
  });

  //绑定删除按钮
  $('body').on('click', '.' + list + ' .remove', function () {
    var DOM = $(this).parent();
    //zc 多图上传 反复初始化bug 删不掉图片
    // lp 去掉后，删掉几个再上传，如果一共上传的个数大于限制个数后，无法继续上传
    try{
      uploader.removeFile(DOM.attr('id'),true);
    }
    catch(e){
      console.log(e)
    }

    DOM.remove();
    DOM = null;
    if (!$('.' + btn).closest('.body').hasClass('user_info')) {
      $('.' + btn).show();
    }
  });

}

//购物车编辑数量加减
function calcNum(btn, num) {
  var inp = $(btn).parent(".num_box").find('.num_box_ipt');
  if (parseInt(inp.val()) == 0) {
    return false;
  } else {
    if ((parseInt(inp.val()) || 0) + num <= 1) {
      inp.val(1);
    } else {
      inp.val((parseInt(inp.val()) || 0) + num);
    }
  }
}
$('body').on('click', '.btn_minus', function () {
  calcNum(this, -1);
});
$('body').on('click', '.btn_plus', function () {
  calcNum(this, 1);
});
$('body').on('blur','.num_box_ipt',function () {
  var inp=$(this),max=parseInt($(this).closest('.num_box').data('qty'));
  if(isNaN(inp.val()) || parseInt(inp.val())<0) {
    inp.val(1);
  }else if(parseInt(inp.val())>max){
    inp.val(1);
    toast('您购买的数量超过商品库存','danger');
  }
});
//cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ';path=/'
}

//取回cookie
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}


//本地存储
if(window.localStorage){
  var local = {
    _dur: 0,
    /**
     * 存储数据
     * @param key 关键字
     * @param [val] 值，为空则删除
     * @param [dur] 缓存周期，单位：小时，默认不限制
     */
    set: function(key,val,dur){
      if(!val){
        localStorage.removeItem(key);
      }
      dur = 'number' == typeof dur ? dur * 60 * 60 * 1000 : this._dur * 60 * 60 * 1000;
      val = $.extend({data:val},{_t: Date.parse(new Date()),_d: dur});
      localStorage[key] = JSON.stringify(val);
    },
    get: function(key){
      var value =  localStorage[key] ? JSON.parse(localStorage[key]) : {};
      if(!value.data) {
        return value;
      }
      var endTime = value._t + value._d;
      if(0 == value._d || Date.parse(new Date()) <= endTime){
        return value.data;
      }else{
        return {};
      }
    }
  };
}

/**
 * 判断ie版本 
 * ie浏览器直接返回版本 如6,7
 * edge 返回 -2
 * 其他浏览器返回 -1
 */
function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return -2; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}