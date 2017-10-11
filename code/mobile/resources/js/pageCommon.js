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