mui.plusReady(function () {
  //首页返回键处理
  //处理逻辑：1秒内，连续两次按返回键，则退出应用；
  var first = null;
  plus.key.addEventListener('backbutton', function () {
    //首次按键，提示‘再按一次退出应用’
    if (!first) {
      first = new Date().getTime();
      toast('再按一次退出应用', 'info');
      setTimeout(function () {
        first = null;
      }, 2000);
    } else {
      if (new Date().getTime() - first < 2000) {
        plus.runtime.quit();
      }
    }
  }, false);
});

function pageInit() {
  mui.init();
  //初始化图片lazyload
  var lazyLoad = mui('body').imageLazyload({
    placeholder: vars.theme.root + '/resources/images/placeholder.png',
    autoDestroy: false
  });

  getJson('/comm/widget/doSearchWidgetNameList.do', {}, function (res) {
    // todo: 从后台获取首页模块
  }, function () {
    toast('获取首页数据失败，即将重新加载页面', 'error');
    // setTimeout(function () {
    //   location.reload();
    // }, 3000)

  });
  // 组件名，模板名存入section的data属性中
  (function (indexList) {
    var len = indexList.length,
      elm = $('.mui-content');
    elm.empty();
    for (var i = 0; i < len; i++) {
      var name, dataType, tplId;
      name = indexList[i].INSTANCE_NAME;
      dataType = indexList[i].WIDGET_DATA_TYPE;
      tplId = indexList[i].tplName || '';
      elm.append(
        // $('<section class="dataContent"></section>').attr({'data-name': name, 'data-tplid': tplId, 'data-datatype': dataType})
        $('<section class="dataContent" data-height="5rem"></section>').data({'name': name, 'tplid': tplId, 'datatype': dataType})
      );
    }
    initFloor(elm, len)
  })(indexList, initFloor);
  /**
   * 初始化各楼层
   * @param elm
   * @param {number} len
   */
  function initFloor(elm, len) {
    var sections = elm.children();
    for (var i = 0; i < len; i++) {
      var el = sections[i],
        data = $(el).data();
      if (!data.datatype || !data.name || !data.tplid) {
        continue;
      }
      (function (el, data, vars) {
        getWidgetData(data.name, data.datatype, function (res) {
          var widgetData = {
            vars: vars,
            xData: res.data.widgetData || null
          };
          renderTmp(el, data.tplid, widgetData);
          lazyLoad.refresh(true);

          if (data.tplid == 'actListTpl') {
            if (widgetData.xData) {
              mui('.time_limit_btm .mui-scroll-wrapper').scroll({
                scrollX: true,
                scrollY: false
              });
              // 特卖滚动
              var w = $('.time_limit_btm').find('ul li').outerWidth(true);
              var l = $('.time_limit_btm').find('ul li').length;
              $('.time_limit_btm').find('ul').width(w * l);
              $('.time_limit_btm').find('.mui-scroll').width(w * l);

              // 特卖倒计时
              var startTime = widgetData.xData.promo.startTime.replace(/\-/g, "/");
              var endTime = widgetData.xData.promo.endTime.replace(/\-/g, "/");

              //获取服务器时间

              var _now = new Date();
              _now = _now.getTime();
              var date;  //开始时间
              if (new Date(startTime).getTime() < _now) {
                date = endTime;
                // $('.act_status').text('距离结束还有').removeClass('beforeAct');
              } else {
                date = startTime;
                // $('.act_status').text('距离开始还有').addClass('beforeAct')
              }
              setCount(date, _now);
            } else {
              $(el).hide();
            }

          }
          if (data.tplid == 'navTpl') {
            for (var j = 0; j < widgetData.xData.length; j++) {
              if (widgetData.xData[j].iconClass && widgetData.xData[j].bgColor && widgetData.xData[j].fontColor && widgetData.xData[j].iconNo) {
                $('.index_menu .' + widgetData.xData[j].iconClass).css({
                  'background-color': widgetData.xData[j].bgColor,
                  'color': widgetData.xData[j].fontColor
                }).html('&#xe' + widgetData.xData[j].iconNo)
              }
            }
            // 加载头条
            getJson('/ec/article/doLoadTouTiaoList.do', {
              typeNo: 'PTDT,PTXW,HYDT',
              page: 1,
              pageSize: 10
            }, function (res) {
              for (var i = 0; i < res.data.rows.length; i++) {
                var data = {
                  vars: vars,
                  xData: res.data.rows[i]
                };
                renderTmp('#newsSlider', 'newsTpl', data);
              }
              // 新闻滚动
              (function () {
                var index = 0,
                  height = $('.header_news').height();

                function toutiaoScroll() {
                  if (index > $(".header_news li").length - 1) {
                    index = 0
                  }
                  $(".header_news ul").css({
                    "transform": "translate3d(0px, " + index * -height + "px, 0px)"
                  });
                  index++;
                }

                setInterval(toutiaoScroll, 3000);
              })();

            })
          }
          if (data.tplid == 'sliderTpl') {
            var gallery = mui('#slider');
            gallery.slider({
              interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
            });
          }

        },'section.dataContent');
      })(el, data, vars);

    }
  }

  // 搜索条点击事件
  $('.search_ipt').on('tap', function () {
    toNewPage(vars.clientRoot + '/ec/goods/goods_list.html');
  });

  // 倒计时
  function setCount(date, now_date) {
    $('.countdown').downCount({
      date: date,
      offset: +8,   //时区
      now_date: now_date
    }, function () {
      // if($('.act_status').hasClass('beforeAct')){
      //   date = data.data.startTime.replace(/\-/g, "/");
      //   var _now = new Date();
      //   _now = _now.getTime();
      //   setCount(date,_now);
      // }else{
      //
      // }
    });
  }

  // 头部地区
  var moClient = $('#moClient').val();
  jsLocation(moClient, function (city) {
    $('#locationAddress').html(city);
  });

  getJson('/common/doLoadAllArea.do', {}, function (res) {
    console.log(res);

    var cityPicker = new mui.PopPicker({
      layer: 2
    });
    cityPicker.setData(res.data);
    var cityResult = document.getElementById('locationAddress');
    cityResult.addEventListener('click', function (event) {
      setTimeout(function () {
        cityPicker.show(function (items) {
          cityResult.innerText = ((items[1] || {}).text || '');

        });
      }, 600)
    }, false);

  })

}