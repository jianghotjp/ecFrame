$(function () {

  page.id = 'string' == typeof page.url.get("id") ? page.url.get('id') : '';
  //从商品详情页进入店铺商品列表
  page.kw = 'string' == typeof page.url.get("kw") ? decodeURI(page.url.get('kw')) : '';
  page.shopCat = 'string' == typeof page.url.get("cat") ? decodeURI(page.url.get('cat')) : '';
  page.brand = 'string' == typeof page.url.get("brand") ? decodeURI(page.url.get('brand')) : '';
  // page.id = 129;
  page.isNew = '';
  page.isHot = '';
  page.isRecommend = '';
  page.sort = '';
  page.pageSize = 12;
  page.page = 1;
  var clickFlag = 1;
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
        xData: res.data.shopNavList
      };
      renderTmp('#shopHeader', 'shopMenuTpl', res);
      lazyLoad.refresh(true);
    });

  });

  // 左侧分类
  getJson('/shop/doSearchShopCatList.do', {
    id: page.id
  }, function (res) {
    res = {
      vars: vars,
      xData: res.data.catProps
    };
    renderTmp('#shopSort', 'shopSortTpl', res);
  });

  // 左侧热卖
  getJson('/shop/doSearchShopRecGoodList.do', {
    id: page.id,
    limit: 4
  }, function (res) {
    // console.log(res)
    res = {
      vars: vars,
      xData: res.data.recGoods
    };
    renderTmp('#shopHot', 'shopHotTpl', res);
    lazyLoad.refresh();
  });



  getPageData();

  // 商品列表
  function getPageData() {
    $('#container').html('');
    getJson('/shop/doSearchShopGoodsList.do', {
      id: page.id,
      kw: page.kw,
      priceMin: page.priceMin,
      priceMax: page.priceMax,
      isNew: page.isNew,
      isHot: page.isHot,
      isRecommend: page.isRecommend,
      sort: page.sort, // 排序，销量排序：sl:a(升序),sl:d(降 序); 价格排序:pr:a(升 序),pr:d(降序);推荐排序:re:a(升 序),re:d(降序)
      shopCat: page.shopCat,
      brand: page.brand,
      page: page.page,
      pageSize: page.pageSize
    }, function (res) {
      clickFlag = 1;
      page.nowPage = res.data.pageId;
      page.pageCount = res.data.pageCount;
      var rows = res.data.rows;
      if(!rows.length){
        $('#container').append('<li class="empty_div">没有相关的商品哦~</li>');
        $('.empty_div').show();
        return
      }

      for (var i = 0; i < rows.length; i++) {
        var itemData = {
          vars: vars,
          xData: rows[i]
        };
        renderTmp('#container', 'goodsItemTpl', itemData);
      }
      lazyLoad.refresh(true);
      // 商品个数
      $('.num_search').text(res.data.rowCount);

      //设置排序栏页码
      $('.total_page').text(page.pageCount);
      $('.cur_page').text(page.nowPage);
      //分页

      $('.paging').createPage({
        current: page.page,
        type: 1,
        pageCount: page.pageCount,
        side: 5,
        center: 3,
        showLen: 11,
        callback: function (curidx, obj) {
          page.page = curidx;
          $('#container').empty();
          getPageData();
        }
      });

      if (page.nowPage < 2) {
        $('.sort').find('.prevPage').addClass('disabled')
      } else {
        $('.sort').find('.prevPage').removeClass('disabled')
      }
      if (page.nowPage == page.pageCount) {
        $('.sort').find('.nextPage').addClass('disabled')
      } else {
        $('.sort').find('.nextPage').removeClass('disabled')
      }

    })
  }

//排序后面的上一页/下一页
  $('.sort').on('click', '.nextPage', function () {
    if(clickFlag){
      if (page.nowPage == page.pageCount) {
        clickFlag = 1;
        return
      }
      clickFlag = 0;
      $('.am-pagination').find('.nextPage').trigger('click');
      $('.cur_page').text(page.nowPage);
    }

  }).on('click', '.prevPage', function () {
    if(clickFlag) {
      clickFlag = 0;
      if (page.nowPage < 2) {
        clickFlag = 1;
        return
      }
      $('.am-pagination').find('.prevPage').trigger('click');
      $('.cur_page').text(page.nowPage);
    }
  });

  if(page.kw){
    $('.search_ipt').val(page.kw)
  }

  $('body').on('click', '.search_btn', function () {
    var kw = $.trim($('.search_ipt').val());
    if (!kw.length) {
      return toast('搜索关键字不能为空','error');
    }
    if ($(this).hasClass('search_mall')) {
      // 搜商城
      toNewPage(vars.clientRoot+'/ec/goods/goods_list.html?kw='+encodeURI(kw))

    } else if ($(this).hasClass('search_shop')) {
      // 搜本店
      page.kw = kw;
      page.page = 1;

      getPageData();
      // toNewPage(vars.clietRoot+'/ec/shop/shop_goods_list.html?kw='+kw)
    }

  });

  // 左侧分类展开收缩
  $('.body').on('click', '.shop_sort button', function () {
    $(this).siblings('.c_ul').slideToggle().end().closest('li').find('.switch').toggleClass('on')
  });

  // 左侧价格关键字
  $('.body').on('click', '.shop_saerch_btn', function () {
    page.kw = $.trim($('.shop_search_ipt').val());
    page.priceMin = $.trim($('input[name=minprice]').val()) * 1;
    page.priceMax = $.trim($('input[name=maxprice]').val()) * 1;
    if('number' == typeof page.priceMin &&  'number' == typeof page.priceMax ){
      page.page = 1;
      getPageData();
    }else{
      toast('请输入正确的价格','error');
    }
  });

  // 左侧分类
  $('.body').on('click', '.shop_sort a', function () {
    page.shopCat = $(this).attr('data-id');
    page.kw='';
    page.priceMin='';
    page.priceMax='';
    page.isNew='';
    page.isHot='';
    page.isRecommend='';
    page.sort='';
    page.page = 1;
    getPageData();
  });

  // 排序
//商品筛选
  $('.sort .l').on('click', '.sort_btn', function() {
    $(this).addClass('on').siblings().removeClass('on').removeClass('arrUp').removeClass('arrDown');
    // $('.price_sort');
    //商品价格排序
    if($(this).hasClass('price_sort')){
      if($(this).hasClass('arrUp')){
        page.sort = 'pr:d';
        $(this).removeClass('arrUp').addClass('arrDown');
      }else{
        page.sort = 'pr:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    }else if($(this).hasClass('num_sort')){
      //商品销量排序==销量排序：sl:a(升序),sl:d(降 序);
      if($(this).hasClass('arrUp' )){
        page.sort = 'sl:d';
        $(this).removeClass('arrUp').addClass('arrDown');
      }else{
        page.sort = 'sl:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    }else if($(this).hasClass('new_sort')){
      //商品新品排序==新品排序：nw:a(升序),nw:d(降 序)
      if($(this).hasClass('arrUp')){
        page.sort = 'nw:d';
        $(this).removeClass('arrUp').addClass('arrDown');

      }else{
        page.sort = 'nw:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    }else if($(this).hasClass('sort_down')){
      //商品的综合排序
      page.sort='rk';
    }else if($(this).hasClass('Popularity')){
      //商品的人气排序
      page.sort='ht';
    }else{
      page.sort = $(this).attr('data-type');
    }
    page.page = 1;
    getPageData();
  });





});