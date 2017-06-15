$(function () {

  page.id = 'string' == typeof page.url.get("id") ? page.url.get('id') : '';
  //从商品详情页进入店铺商品列表
  page.menu = 'string' == typeof page.url.get("menu") ? page.url.get('menu') : '';
  // page.id = 129;
  page.isNew = '';
  page.isHot = '';
  page.isRecommend = '';
  page.sort = '';

  // 店铺信息
  getJson('/shop/doLoadShopInfo.do', {
    id: page.id
  }, function (res) {
    page.collect = res.data.shopInFav;
    res = {
      vars: vars,
      xData: res.data
    };
    renderTmp('#shopInfo', 'shopInfoTpl', res);

    // 店铺导航
    getJson('/shop/doLoadShopNav.do', {
      id: page.id
    }, function (res) {
      res = {
        vars: vars,
        xData: res.data.shopNavList,
        pageUrl: page.url.url
      };
      renderTmp('#shopHeader', 'shopMenuTpl', res);
      lazyLoad.refresh(true);
    });

  });

  // 导航下方促销
  getJson('/comm/widget/doSearchShopWidgetData.do', {
    widgetName: 'PC-店铺首页导航下方多商品广告位',
    widgetDataType: 2,
    shopId: page.id
  }, function (res) {
    if (res.data) {
      res = {
        vars: vars,
        xData: res.data.widgetData
      };
      renderTmp('#actGoodsItem', 'actGoodsItemTpl', res);
      lazyLoad.refresh(true);
    }

  });

  // 单图广告
  getJson('/comm/widget/doSearchShopWidgetData.do', {
    widgetName: 'PC-店铺首页优惠券上方单图广告位',
    widgetDataType: 1,
    shopId: page.id
  }, function (res) {
    if (res.data) {
      res = {
        vars: vars,
        xData: res.data.widgetData
      };
      renderTmp('#ad', 'adTpl', res);
      lazyLoad.refresh(true);
    }
  });

  // 优惠券
  getCoupon();

  function getCoupon(){
    $('#coupon').empty();
    getJson('/shop/doSearchShopCashCouponList.do', {
      id: page.id
    }, function (res) {
      if (res.data) {
        res = {
          vars: vars,
          xData: res.data.shopCoupons
        };
        renderTmp('#coupon', 'couponTpl', res);
      }
    });
  }

  // 品类广告位加店铺楼层
  var widArr = [{
    widgetName: 'PC-店铺首页多品类广告位',
    widgetDataType: 2,
    tpl: 'catActivityTpl',
    id: 'catActivity'
  }, {
    widgetName: 'PC-店铺首页游戏主机',
    widgetDataType: 5,
    tpl: 'floorTpl',
    id: 'floor1'
  }, {
    widgetName: 'PC-店铺首页办公主机',
    widgetDataType: 5,
    tpl: 'floorTpl',
    id: 'floor2'
  }, {
    widgetName: 'PC-店铺首页显示器',
    widgetDataType: 5,
    tpl: 'floorTpl',
    id: 'floor3'
  }, {
    widgetName: 'PC-店铺首页电脑配件',
    widgetDataType: 5,
    tpl: 'floorTpl',
    id: 'floor4'
  }];

  for (var i = 0; i < widArr.length; i++) {
    $('#floor').append('<div class="flagDiv hide" id=' + widArr[i].id + ' data-tpl=' + widArr[i].tpl + ' data-widgetName=' + widArr[i].widgetName + ' data-widgetDataType=' + widArr[i].widgetDataType + '></div>')
  }

  $('.flagDiv').each(function (i, e) {
    var $this = $(this);
    getJson('/comm/widget/doSearchShopWidgetData.do', {
      widgetName: $(e).attr('data-widgetName'),
      widgetDataType: $(e).attr('data-widgetDataType'),
      shopId: page.id
    }, function (res) {
      if (res.data) {
        var data = {
          vars: vars,
          xData: res.data.widgetData
        };
        renderTmp('#' + $(e).attr('id'), $(e).attr('data-tpl'), data);
        $this.show().addClass('on');
      }

    });

  });

  $('body').on('click', '.search_btn', function () {
    var kw = $.trim($('.search_ipt').val());
    if (!kw.length) {
      return toast('搜索关键字不能为空', 'error');
    }
    if ($(this).hasClass('search_mall')) {
      // 搜商城
      toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + encodeURI(kw))

    } else if ($(this).hasClass('search_shop')) {
      // 搜本店
      toNewPage(vars.clientRoot + '/ec/shop/shop_goods_list.html?id=' + page.id + '&kw=' + encodeURI(kw));
    }
  });

//领取购物券
  var couponflag = 1;
  $('.body').on('click', '.coupon_item', function () {
    var batch = $(this).attr('data-id');
    checkLogin(true, function () {
      if (couponflag) {
        couponflag = 0;
        getJson('/mbr/doAcquire.do', {
          batch: batch
        }, function (res) {
          if (res.success) {
            toast('领取成功,快去使用吧~');
            getCoupon();
          } else {
            toast(res.errorMessage)
          }
          couponflag = 1;
        })
      }
    })

  })

});