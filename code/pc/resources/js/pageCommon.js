/**
 * 通用初始化代码
 */
$(function () {
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    // if('ontouchstart' in window){
      // 移动端
      var modal = '<div class="am-modal am-modal-confirm" tabindex="-1" id="changeConfirm">\
                  <div class="am-modal-dialog">\
                      <div class="am-modal-bd">您现在访问的是PC端页面，是否跳转到移动端？</div>\
                      <div class="am-modal-footer">\
                          <span class="am-modal-btn" data-am-modal-cancel>取消</span>\
                      <span class="am-modal-btn" data-am-modal-confirm>确定</span>\
                      </div>\
              </div>\
          </div>';
      $('body').append(modal);
      $('#changeConfirm').modal({
        relatedTarget: this,
        onConfirm: function(options) {
          // 前往微信
          toNewPage(location.origin+'/m'+page.url.url.split('location.origin')[1])
        },
        // closeOnConfirm: false,
        onCancel: function() {
          // 不前往微信
  
        }
      });
  
    }
  // 返回顶部
    $('body').on('click', '.goto_top', function() { $('html,body').stop(1).animate({ scrollTop: '0' }, 300); return false });
  
    $('body').on('click.window', 'a', function () {
      if($(this).attr('target')!='_blank'){
        return toNewPage($(this).attr('href'));      
      }
    });
  
    // 头部通用
    if ($('.page_top').length) {
      getJson('/comm/login/doCheckPC.do', {
        curUrl: location.href
      }, function (data) {
        data = {
          vars: vars,
          xData: data.data
        };
        renderTmp('#topLeft', 'topLeftTpl', data)
      });
      // 商城服务
      getJson('/ec/article/doListArticleListByTypeNo.do', {
        typeNo: 'KHFW'
      }, function (data) {
        data = {
          vars: vars,
          xData: data.data
        };
        renderTmp('#topService', 'topServiceTpl', data)
      });
    }
  
    // 搜索
    if ($('.top_search_common').length) {
      $('body').on('click', '.search_btn', function () {
        var kw = $.trim($('.search_ipt').val());
        if (!kw.length) {
          return toast('搜索关键字不能为空', 'error');
        }
        toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + encodeURI(kw))
      });
      getJson('/comm/widget/doSearchWidgetData.do', {
        widgetName: '移动、PC热门搜索',
        widgetDataType: 2
      }, function (res) {
        var data = {
          vars: vars,
          xData: res.data.widgetData
        };
        renderTmp('#hot', 'hotTpl', data)
      });
      checkLogin(function(){
        getJson('/mbr/doSelCartSize.do', {}, function (res) {
          if (res.data.cartSize) {
            $('#goodsCartNum').text(res.data.cartSize)
          } else {
            $('#goodsCartNum').hide();
          }
        });
      });
  
    }
    if ($('.top_search_shop').length) {
      getJson('/comm/widget/doSearchWidgetData.do', {
        widgetName: '移动、PC热门搜索',
        widgetDataType: 2
      }, function (res) {
        var data = {
          vars: vars,
          xData: res.data.widgetData
        };
        renderTmp('#hot', 'hotTpl', data)
      });
    }
  
    if ($('.top_nav').length) {
      getJson('/etc/doLoadSiteMenu.do', {
        limit: 8,
        depth: 1
      }, function (data) {
        data = {
          vars: vars,
          xData: data.data
        };
        renderTmp('#siteMap', 'siteMapTpl', data)
      });
  
      //顶部品类
      getJson('/ec/goods/doSearchCatMenu.do', {}, function (res) {
        var data = {
          vars: vars,
          xData: res.data
        };
        renderTmp('#nav', 'navTpl', data)
      });
    }
  
  //页面底部
    if ($('#pagefoot').length) {
      getJson('/ec/article/doLoadBottomMenu.do', {}, function (res) {
        if (res.success) {
          var data = {
            vars: vars,
            xData: res.data
          };
          renderTmp('#pagefoot', 'pagefootTpl', data);
        }
      })
    }
  
  //userNav左侧栏 获取用户基本信息
  
    if ($('#shUserContent').length) {
      checkLogin(false, function () {
        if (page.logined) {
  
          getJson('/mbr/doLoadUserInfo.do', {}, function (res) {
            page.isWxHead = false;
            if (res.data.userInfo.imgUrl && res.data.userInfo.imgUrl.indexOf('http') >= 0) {
              page.isWxHead = true;
            }
            var uData = {
              vars: vars,
              xData: res.data.userInfo,
              isWxHead: page.isWxHead
            };
            renderTmp('#shUserContent', 'shUserContentTpl', uData);
            lazyLoad.refresh(true);
          });
        }
      })
    }
  
  //用户中心，判断地址将当前选中的tab为选中状态
  
    if ($('.sh_nav').length) {
      var href1 = window.location.pathname;
      $(".nav_list li A[href='" + href1 + "']").addClass("nav_list_active");
    }
  
  });