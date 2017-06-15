$(function () {

  //顶部hover

  $('.nav_box').hover(function () {
    $(this).toggleClass('on');
  }, function () {
    $(this).toggleClass('on');
  });

  //楼层

  for (var i = 0; i < floorArr.length; i++) {
    $('.index').append('<div class="flagDiv" id=' + floorArr[i].id + ' data-tpl=' + floorArr[i].tpl + ' data-widgetName=' + floorArr[i].widgetName + ' data-widgetDataType=' + floorArr[i].widgetDataType + ' data-floor=' + floorArr[i].floor + '></div>')
  }

  $('.flagDiv').each(function (i, el) {
    getJson('/comm/widget/doSearchWidgetData.do', {
      widgetName: $(el).attr('data-widgetName'),
      widgetDataType: $(el).attr('data-widgetDataType')
    }, function (res) {

      if ($(el).attr('data-floor') * 1) {
        var xdata = {
          vars: vars,
          data: res.data.widgetData,
          floor: $(el).attr('data-floor'),
          tit1: res.data.widgetData.title.substring(0, 2),
          tit2: res.data.widgetData.title.substring(2)
        };
      } else {
        var xdata = {
          vars: vars,
          data: res.data.widgetData
        };
      }
      renderTmp('#' + $(el).attr('id'), $(el).attr('data-tpl'), xdata);
      $(el).addClass('on');
      //首页顶部轮播
      if ($(el).attr('data-tpl') == 'topSilderTpl') {
        $('#index-slide').flexslider({
          slideshow: false,
          directionNav: false
        });
        getJson('/comm/widget/doSearchWidgetData.do', {
          widgetName: 'PC-首页顶部轮播下方多图广告位',
          widgetDataType: 2
        }, function (data) {
          var xdata = {
            vars: vars,
            data: data.data.widgetData
          };
          renderTmp('#topSilderad', 'topSilderadTpl', xdata);
          lazyLoad.refresh(true);
        });
        // 显示左侧分类
        $('#nav').show();


        //判断登录状态
        checknoLogin(function () {
          getJson('/mbr/doLoadUserInfo.do', {}, function (res) {
            if (res.success) {
              $('#userInfo').html('');
              var data = {
                vars: vars,
                xData: res.data.userInfo
              };
              renderTmp('#userInfo', 'userInfoTpl', data);
              lazyLoad.refresh(true);
              getJson('/mbr/doCheckTodaySign.do', {}, function (res) {
                if (res.success) {
                  if (res.data.todaySign) {
                    $('#userInfo').find('.signed a').text('已签到');
                    $('#userInfo').find('.signed a').attr('href', 'javascript:void(0)')
                  }
                }
                $('.login_space').hide();
                $('.loadding_cat').hide();
              })
            }
        }, function () {
            $('.login_space').hide();
            $('#unlogin').append(
              '<div class="img l"><img src="'+vars.theme.root+'/resources/images/unsignd.jpg" alt=""></div>\
              <div class="l welcome">\
              <div>Hi! 您好</div>\
              <div>欢迎来到<span class="special">捷瑞商城</span>电商平台</div>\
              </div>\
              <div class="l logined"><a href="'+vars.clientRoot+'/user/login.html">登录/注册</a></div>\
              <div class="r signed"><a href="'+vars.clientRoot+'/mbr/user_sign.html">每日签到</a></div>\
              ');
            $('.loadding_cat').hide();

          })
        });
        getJson('/ec/article/doLoadNoticeList.do', {
          typeNo: 'PTDT,PTXW,HYDT'
        }, function (res) {
          if (res.success) {
            var data = {
              vars: vars,
              xData: res.data
            };
            renderTmp('#notice', 'noticeTpl', data);
            function gundong() {
              var index = 0;
              var h = 0 - $(".index .top .user .notice ul li").height();

              function toutiaoScroll() {
                if (index > $(".index .top .user .notice ul li").length - 1) {
                  index = 0
                }
                $(".index .top .user .notice ul").css({
                  "transform": "translate3d(0px, " + index * h + "px, 0px)",
                  'transition': 'transform .5s'
                });
                index++;
              }

              setInterval(toutiaoScroll, 2000);
            }

            gundong();
          }
        })
      }
      //限时秒杀轮播
      if ($(el).attr('data-tpl') == 'indexActTpl') {
        if (res.data.widgetData === null) {
          $('#indexAct').remove();
        } else {
          var startTime = res.data.widgetData.promo.startTime;
          var endTime = res.data.widgetData.promo.endTime;
          getJson('/comm/date/doCurTime.do', {}, function (res) {
            var now_date = res.data.replace(/\-/g, "/");
            setCountDown('#timeCount', startTime, endTime, now_date)
          });
          $('#time-slide').flexslider({
            slideshow: false,
            controlNav: false,
            itemWidth: 247.5
          });
        }
      }
      //品牌logo轮播
      if ($(el).attr('data-tpl') == 'indexbrandTpl') {
        getJson('/ec/brand/doSearchAllBrandList.do', {}, function (res) {
          if (res.success) {
            var data = {
              xData: res.data,
              vars: vars
            };
            renderTmp('#adSlide', 'adSlideTpl', data);
            $('#brand-slide').flexslider({
              itemWidth: 133,
              itemMargin: 0,
              controlNav: false,
              slideshow: false
            });
            lazyLoad.refresh(true);
          }
        });
      }
      lazyLoad.refresh(true);
    });
  });

  function setCountDown(el, startTime, endTime, now_date) {
    startTime = startTime.replace(/\-/g, "/");
    var _now = new Date().getTime();
    var date;
    if (new Date(startTime).getTime() < _now) {
      date = endTime.replace(/\-/g, "/");
      $(el).find('.act_status').text('结束').removeClass('beforeAct');
    } else {
      date = startTime;
      $(el).find('.act_status').text('开始').addClass('beforeAct');
    }
    $(el).downCount({
      date: date,
      offset: +8,   //时区
      now_date: now_date
    }, function () {
      if ($(el).find('.act_status').hasClass('beforeAct')) {
        alert('秒杀活动正式开始~');
        window.location.reload();
      } else {
        $(el).text('本场活动已结束')
      }
    });
    $(el).addClass('hasCountDown').show();
  }
});