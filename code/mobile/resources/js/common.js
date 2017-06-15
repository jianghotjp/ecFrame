var tmpWidth = 750,
  windowWidth = document.documentElement.clientWidth;
var scale = tmpWidth / windowWidth;
/**
 * 页面数据命名空间
 * @type {{id: null, page: number, pageSize: number}}
 */
var page = {
  // _DEBUG_:0,
  debug:1,
  id: null,
  page: 0,
  pageSize: 10
};
page.url = urlParas(window.location.href.split('#')[0]);
page._DEBUG_ = 'string'==typeof page.url.get('_debug') && (page.url.get('_debug') == 'true');
// 分销用
page.parentDistibutor = 'string' ==typeof page.url.get('parentDistibutor')&& page.url.get('parentDistibutor')? fromUri(page.url.get('parentDistibutor')):0;
page.way = 'string' ==typeof page.url.get('way')&& page.url.get('way')? page.url.get('way'):0;

if(page._DEBUG_){
  openDebug();
  var _console = $.extend({},console);
  console.info = function(e){
    debug.log(e);
    _console.info(e);
  };
  console.warn = function(e){
    debug.warn(e);
    _console.warn(e);
  };
  console.error = function(e){
    debug.error(e);
    _console.error(e);
  };
}
/**
 * 异步json获取
 * @desc 封装mui.ajax,预留app验证接口
 * @param {String} url 接口地址
 * @param {Object} param 发送数据
 * @param {Function} [success] 成功回调
 * @param {Function} [error] 错误回调
 * @param el 需要追加数据的元素
 */
function getJson(url,param,success,error,el){
  loading.change(1);
  $.extend(param,{parentDistibutor:page.parentDistibutor,parentDistributorSource:page.way});
  if(arguments.length == 5 && 'string' == typeof el){
    makeSeize(el);
  }
  if(arguments.length == 5 && 'string' == typeof error){
    el = error;
    makeSeize(el);
  }

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
  mui.ajax({
    type: 'POST',
    url: vars.root + url,
    data: param,
    dataType: 'json',
    success: function (res) {
      //数据状态
      if(typeof success == 'function'){
        success(res);
      }else{
        console.group('----后台数据----');
        console.info('send:' + JSON.stringify(param) + '\nto:' + url + '\nreturn:\n');
        console.groupCollapsed('json字符串');
        console.log(JSON.stringify(res, null, 2));
        console.groupEnd();
        console.info(res);
        console.groupEnd();
      }
      if(page.debug){
        console.group('----后台数据----');
        console.info('send:' + JSON.stringify(param) + '\nto:' + url + '\nreturn:\n');
        console.groupCollapsed('json字符串');
        console.log(JSON.stringify(res, null, 2));
        console.groupEnd();
        console.info(res);
        console.groupEnd();
      }
      loading.change(-1);
    },
    error:function(msg){
      if(typeof error == 'function'){
        error(msg);
      }else{
        console.error('send:' + JSON.stringify(param) + '\nto:' + url + '\nstatus:'+ msg.status + '\nreturn:\n' + JSON.stringify(msg));
      }
      loading.change(-1);
    }
  });
}
/**
 * 根据组件名称返回数据
 * @param widgetName 组件中文名
 * @param type 组件数据类型
 * @param {Function} [success] 成功回调函数（返回data）
 * @param {Function} [error] 出错回调
 * @param el 需要追加数据的元素
 */
function getWidgetData(widgetName,type,success,error,el){
  getJson('/comm/widget/doSearchWidgetData.do',{widgetName:widgetName,widgetDataType:type},success,error,el);
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
function renderTmp(selector,tmpId,data,callback){
  var Tpl = template(tmpId,data),el;
  if('object' == typeof selector){
    el = selector;
  }else{
    el = mui(selector)[0];
  }
  if(typeof callback == 'function'){
    callback(el,Tpl);
    return;
  }
  el.innerHTML += Tpl;
  if(el.className.indexOf('show') < 0){
    el.className += ' show';
  }
}
/**
 * 设置占位图,高度需提前设置data-height属性，宽度为100%
 * @param el renderTmp的元素
 */
function makeSeize(el){
  if('string' == typeof el){
    var height = $(el).attr('data-height') ? $(el).attr('data-height') : '4rem';
    $(el).addClass('seize').css('height',height);
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
 * @param {String} align 对齐（查阅资料说是并不是很好用，也不建议用，不配置默认居中就好）
 */
Holder.addTheme('mall', {
  bg: '#f0f0f0',
  fg: '#f0f0f0',
  size: 12,
  font: 'Consolas',
  fontweight: 'normal',
  align: 'center'
});

/**
 * 错误图片替换
 * @param size 图片宽高
 */
function errorImg(size){
  var img = event.srcElement;
  img.setAttribute('data-oldSrc',img.getAttribute('src'));
  img.setAttribute('data-src','holder.js/'+size+'?theme=mall');
  img.onerror=null;
  Holder.run();
}

//瀑布流的错误图片替换
function _errorImg(size){
  var arr = size.split('x');
  for(var i = 0; i < arr.length; i++){
    arr[i] = Math.floor(arr[i] / scale);
  }
  var halfSize = arr.join('x');
  errorImg(halfSize);
}


function imgFormat(url,format,isZip,notForTpl) {
  format = format ? format : '.640x640.png';
  if(format.indexOf('.') != 0){
    format = '.' + format;
  }
  if('boolean' == typeof isZip && !isZip){
    url = vars.root + '/upload/' + url;
  }else{
    url = vars.root + '/upload/' + url+ format;
  }
  //直接返回url
  if(!!notForTpl && notForTpl){
    return url;
  }

  //todo:更好的外部方案不在这拼字符串
  //拼接错误图片替换

  var size = format.split('.')[1];
  var arr = size.split('x');
  for(var i = 0; i < arr.length; i++){
    arr[i] = Math.floor(arr[i] / scale);
  }
  var halfSize = arr.join('x');
  var str = url + '" ' + 'onerror="errorImg(\''+ halfSize +'\')';
  //if(isLazy){
  //    //str = vars.theme.root + '/images/placeholder.png' data-lazyload='' + str;
  //    str = '' data-lazyload='' + str;
  //}
  return str;
}


/**
 * 通用初始化代码
 */
//返回强制刷新

  window.addEventListener('pagehide', function(e) {
    var $body = $(document.body);
    $body.children().remove();
    // 要等到回调函数完成，用户按返回才执行script标签的代码
    setTimeout(function() {
      $body.append("<script type='text/javascript'>window.location.reload();<\/script>");
    });
  });


$(function(){

  $('body,.mui-scroll,.mui-bar-tab').on('tap.window','a',function(event){
    event.preventDefault();
    return toNewPage($(this).attr('href'));
  });
  $('body').on('toggle','.mui-switch',function(e){
    $(this).find('input[type=hidden]').val(e.detail.isActive ? 1 : 0);
  });

  if($('.slide_bar').length){
    var slideMask = mui.createMask(function(){
      $('.slide_bar').removeClass('slide_open')
    });
    $('.slide_bar').on('click','.open_btn',function(){
      if( !$('.slide_bar').hasClass('slide_open')){
        slideMask.show();
        $('.slide_bar').addClass('slide_open');
      }else{
        slideMask.close();
      }
    });
  }


});
function setCookie(c_name,value,expiredays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ '=' +escape(value)+
    ((expiredays==null) ? '' : ';expires='+exdate.toGMTString())+';path=/';
}

//取回cookie
function getCookie(c_name){
  if (document.cookie.length>0)
  {
    c_start=document.cookie.indexOf(c_name + '=');
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(';',c_start);
      if (c_end==-1) c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return '';
}

/**
 * 处理页面跳转
 * @desc muiApp新建webview（需配置host），微信或浏览器location.href
 * @param href
 * @param {Boolean} [cantBack] true 禁止页面返回，替换url
 * @example toNewPage('http://www.baidu.com')
 */
function toNewPage(href,cantBack) {
  if (!href || href.indexOf('#') == 0  || href.indexOf('javascript') == 0 || href.indexOf('tel') == 0 ) {
    return;
  }
  if(href.indexOf('http') != 0){
    //for APP
    // href = 'http://192.168.191.1:8080' + href;
  }
  // href = urlParas(href);
  // href = href.set('parentDistibutor',toUri(page.parentDistibutor));

  var bottom = 0;
  cantBack = cantBack ? cantBack : false;
  if(cantBack){
    location.replace(href);
  }else{

    mui.openWindow({
      id: window.location.href,
      url: href,
      styles: {
        top: 0, //新页面顶部位置
        bottom: bottom //新页面底部位置
      },
      show: {
        autoShow: true, //页面loaded事件发生后自动显示，默认为true
        aniShow: 'pop-in' //页面显示动画，默认为”slide-in-right“；
      },
      waiting: {
        autoShow: true, //自动显示等待框，默认为true
        title: '正在加载...' //等待对话框上显示的提示内容
      }
    });
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
 * 内容超出自动扩展（textarea）
 * @param {String} selector jsDOM
 */
function autoGrow(selector) {
  if (selector.scrollHeight > selector.clientHeight) {
    selector.style.height = selector.scrollHeight + 'px';
  }
}


/**
 * 清空重置上拉加载
 * @param {String} selector
 */
function reloadPull(selector){
  var el = '#pullrefresh';
  if(selector){
    el = selector;
  }
  mui(el).pullRefresh().refresh(true);
  mui(el).pullRefresh().scrollTo(0,0);
  mui(el).pullRefresh().pullupLoading();
}
/**
 * 页面顶部进度条展示方法
 * @type {{_num: null, change: Function, check: Function, done: Function, ing: Function}}
 * @desc {Object} _num 判断进度条显示状态  change 改变进度条状态  check 检查进度条状态  done 进度条隐藏  ing 进度条显示
 */
var loading = {
  _num: null,
  change:function(num){
    if('number' == typeof num){
      if(0 < num){
        this.ing();
      }
      if(this._num == null){
        this._num = 0;
      }
      this._num = this._num + num;
      this.check();
    }else{
      if($.isNumeric(num)){
        this.change(parseInt(num));
      }
    }
  },
  check: function(){
    if(this._num == null){
      return;
    }
    this._num = 0 < this._num ? this._num : 0;
    if(0 == this._num){
      this.done();
    }
  },
  done: function(){
    mui('body').progressbar().hide();
    $('body').off('touchstart.loading');
  },
  ing: function(){
    mui('body').progressbar().show();
    $('body').on('touchstart.loading',function(){
      mui.toast('数据载入中，请稍等');
    });
  }

};

mui.ready(function(){
  if('object' == typeof includeFooterPage){
    // 购物车数量
    checkLogin(function(){
      if(page.logined){
        getJson('/mbr/doSelCartSize.do',{},function(data){
          // console.log(data);
          if(data.data.cartSize){
            $('.footer .mui-badge').text(data.data.cartSize).show();
          }
        });
      }
    });


    (function setCurSelect(mui) {
      var urlStr = location.href;
      urlStr = urlStr.split('?')[0];
      var urlArr = urlStr.split('/');
      urlStr = urlArr[urlArr.length - 1].split('.')[0];
      var curPage = '';
      $.each(includeFooterPage, function (i, o) {
        var id = o.id;
        var page = o.page;
        if ($.inArray(urlStr, page) > -1) {
          curPage = id;
          return false;
        }
      });
      $('#footer a[data-id=' + curPage + ']').addClass('mui-active').attr('href','javascript:;');

    })(mui);
    $('#footer').on('touchstart','a',function(){
      toNewPage(this.href);
    });
  }

  if($('.search_ipt').length > 0){
    //input搜索框输入效果
    $('body').on('focus', '.search_ipt', function() {
      $('.search_box').addClass('on');
    }).on('blur', '.search_ipt', function() {
      $('.search_box').addClass('on');
      if($.trim($(this).val()).length < 1){
        $('.search_box').removeClass('on');
      }
    });
  }
  if($('#header .change').length >0){
    $('.search_ipt').on('tap',function(){
      var kw = 'string' == typeof page.url.get('kw') ? decodeURI(page.url.get('kw')) : '';
      toNewPage(vars.clientRoot + '/ec/goods/goods_search.html?kw='+kw);
    });
  }

  if($('#header .search_menu').length){
    $('#header').on('touchstart','.search_menu',function(){
      $('#header .header_menu').toggleClass('active');
      $(this).toggleClass('active');
    });

  }


});
//
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
 * 格式化时间
 * @param date
 * @param format
 * @returns {XML|string|void}
 */
function dateFormat(date, format) {
  if(date.indexOf('-') != -1){
    date = date.replace('-','/').replace('-','/');
  }
  //兼容ios
  // var arr = date.split(/[- : \/]/);
  // console.log(arr);
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
  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
    var v = map[t];
    if(v !== undefined){
      if(all.length > 1){
        v = '0' + v;
        v = v.substr(v.length-2);
      }
      return v;
    }
    else if(t === 'y'){
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
 * @returns {*}
 */
function moneyFormat(num, format) {
  format = format ? format : 0;
  if(format == 0){
    return num;
  }
  format = format > 0 && format <= 20 ? format : 2;
  num = parseFloat((num + '').replace(/[^\d\.-]/g, '')).toFixed(format) + '';
  var l = num.split('.')[0].split('').reverse(), r = num.split('.')[1];
  var t = '';
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return t.split('').reverse().join('') + '.' + r;
}
function toUri(str){
  str = str.toString() == str ? str.toString() : '';
  if (Base64.extendString) {
    Base64.extendString();
    return str.toBase64URI();
  }
}
function fromUri(str){
  if (Base64.extendString) {
    Base64.extendString();
    return str.fromBase64();
  }
}
/**
 * 判断登录
 * @param toLogin    如果未登录，是否进入登录页面
 * @param callback   登录后的回调函数
 */
function checkLogin(toLogin,callback){
  var argLen = arguments.length;
  //判断第一个参数类型
  if(arguments.length == 1 && 'function' == typeof toLogin){
    callback = toLogin;
    toLogin = 0;
  }
  //判断是否有callback
  if('function' != typeof callback){
    callback = $.noop;
  }
  var curUrl = location.href;
  //未登录过
  if('boolean' != typeof page.logined || page.logined == false) {
    getJson('/comm/login/doCheck.do', {
      curUrl: curUrl
    }, function (data) {
        page.logined = data.data.login;
        if(!data.data.url){
            //因登录状态未在前台保存，从后台返回数据判断当前登录状态
            callback();
            return;
        }
        if (toLogin || !argLen ) {
            //不传参数或者需要跳登录页
            toNewPage(data.data.url);
        }else {
            //page.logined==fasle 时会走这个
            callback();
        }

    });
  }else if(page.logined){
    // 登录过
    callback();
  }
}

//初始化图片lazyload
var lazyLoad = mui(window).imageLazyload({
  placeholder: vars.theme.root + '/resources/images/placeholder.png',
  destroy: false
});
/**
 * 表单处理
 * @param {String} selector
 * @returns {Object} data
 */
function formFormat(selector){
  var isOk = true;
  var data = {},form = $(selector);
  form.find('input,textarea').each(function(){
    //return: true/false
    if(!validForm(this)){
      isOk = false;
    }
    var name = $(this).attr('name');
    data[name] = $.trim($(this).val());
  });

  return isOk ? data : false;

}
function validForm(el){
  var type = $(el).attr('name'),
    val = $.trim($(el).val()),
    required = $(el).attr('required');
  if('undefined' == valid[type]){
    return true;
  }
  if('string' == typeof valid[type]){
    var regexp = new RegExp(valid[type]);
    return regexp.test(val);
  }else{
    return valid[type](val);
  }
}
// 验证条件
var valid = {
  tel: '^1[34578]\d{9}$',
  idCard:'^(^\d{18}$|^\d{17}(\d|X))$',
  email: '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$',
  userName:''
};

function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function() {
          callback(WebViewJavascriptBridge)
        },
        false
    );
  }
}