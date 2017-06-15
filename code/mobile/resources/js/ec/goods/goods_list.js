function pageInit() {
  //初始化图片lazyload
  var lazyLoad = mui(window).imageLazyload({
    placeholder: vars.theme.root + '/resources/images/placeholder.png',
    destroy: false
  });
  mui.init({
    pullRefresh: {
      container: '#pullrefresh',
      up: {
        contentrefresh: '正在加载...',
        callback: pullupRefresh
      }
    }
  });
  // 切换层级的方法

  function listShow(){
    $('.goodsList').removeClass('hidden');
    $('.search').addClass('hidden');
  }
  function searchShow(){
    $('.goodsList').addClass('hidden');
    $('.search').removeClass('hidden');
  }


  // 原搜索页逻辑
  $('#header_search .search_ipt').on('input', function () {
    if($(this).val()){
      $('.shop_search_bar span').text($(this).val());
      $('.shop_search_bar').show();
    }else{
      $('.shop_search_bar span').text($(this).val());
      $('.shop_search_bar').hide();
    }
  });

  $('#header .search_ipt').on('tap', function () {
    searchShow();
    $('#header_search .search_ipt').focus().trigger('focus');
  });

  $('#header_search').on('click', '#searchBtn', function () {
    var kw = $.trim($('.search_ipt').val());
    if (!kw.length) {
      return mui.alert('搜索关键字不能为空');
    }
    page.cache.kw = kw;
    $('#header .search_ipt').val(kw);
    listShow();
    $('#container').html('');
    page.page = 0;
    local.set('hisContent');
    reloadPull();
  });

  // 手机回车键

  $('#form').on('submit',function () {
        var kw = $.trim($('.search_ipt').val());
        if (!kw.length) {
          mui.alert('搜索关键字不能为空');
          return false
        }
        page.cache.kw = kw;
        $('#header .search_ipt').val(kw);
        listShow();
        page.filterFun.update();
        return false
  });


  $('body').on('tap', '.mui-icon.mui-icon-clear', function () {
    $('.shop_search_bar span').text('');
  });

  $('.shop_search_bar').on('tap', function () {
    var kw = $('.shop_search_bar span').text();
    toNewPage(vars.clientRoot + '/ec/shop/shop_list.html?kw=' + kw)
  });

  getWidgetData("移动、PC热门搜索", 2, function (data) {
    data = {
      vars: vars,
      xData: data.data.widgetData ? data.data.widgetData : []
    };
    renderTmp('#hot', 'hotTpl', data);
  });

  // 原商品列表逻辑
  if ('string' == typeof page.url.get('back') && page.url.get('back')) {
    //从其他页面返回
    listShow();

    var hisContent = local.get('hisContent');
    page.cache = hisContent.page.cache;
    page.filter = hisContent.page.filter;
    page.page = page.cache.page;
    // console.log(page);
    // 填充列表数据
    for (var i = 0; i < hisContent.data.length; i++) {
      itemData = {
        vars: vars,
        xData: hisContent.data[i]
      };
      renderTmp('#container', 'goodsItem', itemData);

      // lazyLoad.addElements();
    }
    lazyLoad.refresh(true);
    //填充筛选项数据
    for (var type in page.filter.spec) {
      // console.log(type)
      var data = {
        vars: vars,
        xData: page.filter.spec[type],
        page: page
      };
      // renderTmp('#filterItem', 'filterItemTpl', data);
      // renderTmp('#filterContent', 'filterContentTpl', data);
      renderTmp('#filterSlide', 'filterSlideTpl', data);
    }
    //显示之前选中的筛选项
    $('#filterItem a').each(function (i, e) {
      var titArr = [];
      $('.filter_bar_btm .mui-control-content:eq(' + i + ')').find('.active').each(function () {
        titArr.push($(this).text());
      });
      if (titArr.length) {
        $(e).text(titArr.join(',')).addClass('main_c');
        $('.menu_item_other .menu_item:eq(' + i + ')').find('.choose_item').text(titArr.join(',')).addClass('main_c');
      }
    });
    //自定筛选项
    $('.menu_item_cus .menu_item').each(function (i, e) {
      var titArr = [];
      $(e).find('.active').each(function () {
        titArr.push($(this).text());
      });
      if (titArr.length) {
        $(e).find('.choose_item').text(titArr.join(',')).addClass('main_c');
      }
    });
    mui('.filterContentScroll').scroll();
    //滚动到之前位置
    var st = page.url.get('st') ? parseInt(page.url.get('st')) : 0;
    mui('#pullrefresh ').scroll().scrollTo(0, 0 - st, 0);
    $('#pullrefresh').trigger('tap');
    loading.done();

  } else {
    // 第一次进入页面
    local.set('hisContent');
    //按需初始化页面数据
    page.cache = {
      priceMin: 'string' == typeof page.url.get('priceMin') ? decodeURI(page.url.get('priceMin')) : '',
      priceMax: 'string' == typeof page.url.get('priceMax') ? decodeURI(page.url.get('priceMax')) : '',
      sort: 'string' == typeof page.url.get("sort") ? decodeURI(page.url.get('sort')) : '',
      kw: 'string' == typeof page.url.get('kw') ? decodeURI(page.url.get('kw')) : '',
      // 固定筛选条件 cat 品类，area  发货地，brands 品牌
      cat: 'string' == typeof page.url.get('cat') ? decodeURI(page.url.get('cat')) : '',
      area: '',
      brands: '',

      // 自定筛选项
      prop: ''

    };
    if (page.cache.kw || page.cache.cat) {
      $('.search').hide();
      $('.goodsList ').show();
    }

    page.filter = {
      _count: 2,   //计数器
      //固定的三个筛选条件
      spec: {
        cat: {
          name: '分类',
          id: 'cat',
          index: 0,
          data: []
        },
        brands: {
          name: '品牌',
          id: 'brands',
          index: 1,
          data: [],
          key: 'name',
          value: 'id'
        },
        area: {
          name: '发货地',
          id: 'area',
          index: 2,
          data: [],
          key: 'text',
          value: 'value'
        }
      },
      //用户自定筛选条件
      custom: []

    };

  }

  page.filterFun = {
    //计数器为0时渲染模板
    checkStatus: function () {
      if (--page.filter._count == 0) {
        page.filterFun.render();
      }
    },
    //渲染模板
    render: function () {
      this._renderSpec();
    },
    //渲染固定模板
    _renderSpec: function () {
      mui('.mui-scroll-wrapper').scroll();
      for (var type in page.filter.spec) {
        //this.spec[type]
        var data = {
          vars: vars,
          xData: page.filter.spec[type],
          page: page
        };
        // console.log(data);
        // renderTmp('#filterItem', 'filterItemTpl', data);
        // renderTmp('#filterContent', 'filterContentTpl', data);
        renderTmp('#filterSlide', 'filterSlideTpl', data);
      }
      if (page.cache.cat) {
        $('#filterSlide .menu_box_item[data-id=' + page.cache.cat + ']').trigger('tap');
      }
      // mui('.mui-scroll-wrapper').scroll();
      // mui('.filterContentScroll').scroll();
    },
    //渲染自定模板
    _renderCustom: function () {

    },
    //初始化，取数据，组织数据
    init: function () {
      //分类（只显示一级分类）
      /**
       *id:主键
       * pid：父节点主键
       * text：名称
       * remark：备注
       * iconUrl：图片
       * children：子节点
       */
      getJson("/ec/goods/doSearchCatList.do", {}, function (data) {
        if (data.success = true) {
          // console.log(data);
          for (var i = 0; i < data.data.length; i++) {
            page.filter.spec.cat.data[i] = {
              'text': data.data[i].text,
              'id': data.data[i].id,
              'ischecked': false
            };
          }
          page.filterFun.checkStatus();
        }
      });
      //品牌（显示所有品牌）
      /**
       * id;主键
       * name;名称
       * nameEn;英文名称
       */
      getJson("/ec/brand/doSearchAllBrandList.do", {}, function (data) {
        //console.log(data);
        for (var i = 0; i < data.data.length; i++) {
          page.filter.spec.brands.data[i] = {
            'text': data.data[i].name,
            'id': data.data[i].id,
            'ischecked': false
          };
        }
        page.filterFun.checkStatus();

      });
      //发货地（选取仓库设置的一级地区）
      /**
       * value:值
       * text:地区名称
       */
      // getJson("/comm/area/doSearchWarehouseAreaList.do",{},function(data){
      //     //console.log(data);
      //     for(var i=0;i<data.data.length;i++){
      //         page.filter.spec.area.data[i] = {
      //             'text' : data.data[i].text,
      //             'id' : data.data[i].value,
      //             'ischecked': false
      //         };
      //     }
      //     page.filterFun.checkStatus();
      // });

    },
    //更新数据
    update: function () {
      var i;
      page.cache.catArr = [];
      page.cache.areaArr = [];
      page.cache.brandsArr = [];
      page.cache.propArr = [];
      page.cache._priceMin = page.cache.priceMin;
      page.cache._priceMax = page.cache.priceMax;
      for (i = 0; i < page.filter.spec.cat.data.length; i++) {
        if (page.filter.spec.cat.data[i].ischecked == true) {
          page.cache.catArr.push(page.filter.spec.cat.data[i].id);
        }
      };


      for (i = 0; i < page.filter.spec.area.data.length; i++) {
        if (page.filter.spec.area.data[i].ischecked == true) {
          page.cache.areaArr.push(page.filter.spec.area.data[i].id);
        }
      };


      for (i = 0; i < page.filter.spec.brands.data.length; i++) {
        if (page.filter.spec.brands.data[i].ischecked == true) {
          page.cache.brandsArr.push(page.filter.spec.brands.data[i].id)
        }
      };


      for (i = 0; i < page.filter.custom.length; i++) {
        for (var j = 0; j < page.filter.custom[i].values.length; j++) {
          if (page.filter.custom[i].values[j].ischecked == true) {
            var propVlaues = [];
            propVlaues.push(page.filter.custom[i].id, page.filter.custom[i].values[j].id)
            page.cache.propArr.push(propVlaues.join(':'));
          }
        }
      };

      if (page.url.get('cat') != '') {
        page.cache.catArr.push(page.url.get('cat'));
      }
      page.cache._cat = page.cache.cat;
      page.cache._area = page.cache.area;
      page.cache._brands = page.cache.brands;
      page.cache._prop = page.cache.prop;
      page.cache.cat = page.cache.catArr.join(',');
      page.cache.area = page.cache.areaArr.join(',');
      page.cache.brands = page.cache.brandsArr.join(',');
      page.cache.prop = page.cache.propArr.join(',');
      page.cache.priceMin = $('.min_price').val();
      page.cache.priceMax = $('.max_price').val();
      // console.log(typeof page.prop);
      if (page.cache.priceMin == page.cache._priceMin && page.cache.priceMax == page.cache._priceMax && page.cache._cat == page.cache.cat && page.cache._area == page.cache.area && page.cache._brands == page.cache.brands && page.cache._prop == page.cache.prop) {

      } else {
        $('#container').html('');
        page.page = 0;
        local.set('hisContent');
        reloadPull();
      }

      // console.log(page.catArr,page.cat);
      // console.log(page.areaArr,page.area);
      // console.log(page.brandsArr,page.brands);

    }
  };

  if (page.url.get('back')) {

  } else {
    page.filterFun.init();
    mui('#pullrefresh').pullRefresh().pullupLoading();

  }


  /**
   * 上拉加载
   */
  function pullupRefresh() {
    getJson("/ec/goods/doSearchGoodsByProps.do", {
      kw: page.cache.kw,
      priceMin: page.cache.priceMin,//最小价格
      priceMax: page.cache.priceMax,//最大价格
      sort: page.cache.sort,//销量排序：sl:a(升序),sl:d(降 序);   价格排序:pr:a(升 序),pr:d(降序);  新品排序：nw:a(升序),nw:d(降 序)
      cat: page.cache.cat,
      area: page.cache.area,
      brand: page.cache.brands,
      prop: page.cache.prop,
      page: ++page.page,
      pageSize: page.pageSize
    }, function (data) {
      //console.log(data);
      var goodsList = data.data;
      var pageCount = goodsList.pageCount,
        rows = goodsList.rows;
      page.cache.page = page.page;
      mui('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。
      for (var i = 0; i < rows.length; i++) {
        var itemData = {
          vars: vars,
          xData: rows[i]
        };
        renderTmp('#container', 'goodsItem', itemData);
      }
      if ($('#container .goods_item').length == 0) {
        $('.mui-pull-bottom-pocket .mui-pull').hide();
        $('.list_empty').show();
      } else {
        $('.list_empty').hide();
      }
      lazyLoad.refresh(true);

      var oldHiscontent = local.get('hisContent') ? local.get('hisContent') : {};
      if (!!oldHiscontent.page) {
        //不是第一次存储

        oldHiscontent.page = {
          cache: page.cache,
          filter: page.filter
        };
        for (var i = 0; i < rows.length; i++) {
          oldHiscontent.data.push(rows[i]);
        }
        local.set('hisContent', oldHiscontent);
      } else {
        //第一次存储
        var hisContent = {
          page: {
            cache: page.cache,
            filter: page.filter
          },
          data: []
        };
        // console.log(hisContent.page);
        for (var i = 0; i < rows.length; i++) {
          hisContent.data.push(rows[i]);
        }
        local.set('hisContent', hisContent);
      }

      // lazyLoad.addElements();

    });
  }

  /*--------页面事件--------*/
  if (page.cache.kw) {
    $('.search_ipt').val(page.cache.kw).trigger('blur');
    listShow();
  }
  if (page.cache.cat) {
    listShow();
  }
  if (page.cache.sort) {
    // console.log(page.sort );
    //nw:d
    $('.item_box.l .tit_item').each(function () {
      if ($(this).attr('data-type').indexOf(page.cache.sort) >= 0) {
        $(this).addClass('cur').siblings().removeClass('cur');
      }
    })
  }

  //商品排序
  $('.item_box.l').on('tap', '.tit_item', function () {
    $(this).addClass('cur').siblings().removeClass('cur').removeClass('arrUp').removeClass('arrDown');
    // $('.price_sort');
    if ($(this).hasClass('price_sort')) {
      if ($(this).hasClass('arrUp')) {
        page.cache.sort = 'pr:d';
        $(this).removeClass('arrUp').addClass('arrDown');

      } else {
        page.cache.sort = 'pr:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    } else {
      page.cache.sort = $(this).attr('data-type');
    }
    $('#container').html('');
    page.page = 0;
    page.cache.page = 0;
    reloadPull();
  });
  //切换商品排列
  $('.change').on('tap', function () {
    var old_height = 0, new_height = 0;
    var Style = $('#pullrefresh>.mui-scroll').attr('style');
    var scrollTop = Math.abs(parseInt(Style.split(';')[0].split(',')[1]));
    old_height = $('#pullrefresh').find('.goods_item:eq(0)').height();

    $('.goods_list').toggleClass('goods_list_oth');
    $(this).toggleClass('act');

    new_height = $('#pullrefresh').find('.goods_item:eq(0)').height();
    var ind = scrollTop / old_height;
    if (!$(this).hasClass('act')) {
      ind = ind / 2
    }
    ind = parseInt(ind);

    // console.log(ind)
    mui('#pullrefresh').pullRefresh().scrollTo(0, 0 - ind * new_height);

    // $('#pullrefresh').scroll();
    $('#pullrefresh').trigger('tap');
    // $('#pullrefresh .mui-scroll').trigger('swipedown');

  });




  // 右侧侧滑
  //侧滑容器父节点
  var offCanvasWrapper = mui('#offCanvasWrapper');
  //主界面容器
  var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
  //菜单容器
  var offCanvasSide = $("#offCanvasSide");
  //阻止手势侧滑
  offCanvasInner.addEventListener('drag', function (event) {
    event.stopPropagation();
  });
  //主界面和侧滑菜单界面均支持区域滚动；
  mui('#offCanvasSide .mui-scroll-wrapper').scroll();
  $('.item_box').on('tap', '.choose', function () {
    offCanvasWrapper.offCanvas('show');
  });
  $('.mui-off-canvas-backdrop').on('tap',function(){
    // mui('.mui-off-canvas-wrap').offCanvas().toggle();
    offCanvasWrapper.offCanvas('close');
  })
  // 展开全部
  $('.mui-off-canvas-right').on('tap', '.item_all', function () {
    $(this).toggleClass('cur');
    if ($(this).hasClass('cur')) {
      $(this).find('.mui-icon').removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
      $(this).closest('.menu_item').find('.menu_box').addClass('cur');
    } else {
      $(this).find('.mui-icon').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
      $(this).closest('.menu_item').find('.menu_box').removeClass('cur');
    }
  });

  $('.mui-off-canvas-right').on('tap', '.done', function () {
    offCanvasWrapper.offCanvas('close');
    page.filterFun.update();
  });
  $('.mui-off-canvas-right').on('tap', '.reset', function () {
    for (var type in page.filter.spec) {
      // console.log(page.filter.spec[type].data);
      for (var i = 0; i < page.filter.spec[type].data.length; i++) {
        page.filter.spec[type].data[i].ischecked = false;
      }
    }
    for (var j = 0; j < page.filter.custom.length; j++) {
      for (var k = 0; k < page.filter.custom[j].values.length; k++) {
        page.filter.custom[j].values[k].ischecked = false;
      }
    }
    $('.menu_item_cus').find('.menu_item').remove();

    $('.goods_slide_menu').find('.active').removeClass('active');
    $('.goods_slide_menu').find('.choose_item ').text('全部').removeClass('main_c');
    $('.mui-control-item').each(function (i, e) {
      $('.mui-control-item:eq(' + i + ')').text($('.menu_item_other .menu_item:eq(' + i + ')').find('._title').text()).removeClass("main_c");
      $('.mui-control-content li').removeClass('active')
    });
    $('.min_price').val('');
    $('.max_price').val('');
    page.cache.priceMin = '';
    page.cache.priceMax = '';
    page.filterFun.update();
    // console.log( page.filter.custom);

  });


  //下拉筛选
  $('.mui-control-item').removeClass('mui-active');
  maskHide();
  $('.mui-inner-wrap').on('tap', '.mask-backdrop', function () {
    maskHide();
  });
  function maskShow() {
    $('.mask-backdrop').css({display: 'block'}).addClass('fadeIn').removeClass('fadeOut');
  }

  function maskHide() {
    // $('.mask-backdrop').addClass('hide').removeClass('show');
    $('.mask-backdrop').removeClass('fadeIn').addClass('fadeOut').css({display: 'none'});

    $('.mui-control-item').removeClass('mui-active');
    $('.filter_bar_btm').removeClass('fadeIn').addClass('fadeOut');
    $('.filter_bar_btm').css({display: 'none'});
    // $('.filter_bar_btm').on('webkitTransitionEnd',function(){
    //    webkitTransitionEnd   无效
    // });
    $('.filter_bar_btm').off('webkitTransitionEnd');
  }

  $('.mui-segmented-control').on('tap', '.mui-control-item', function () {
    maskShow();
    $('.filter_bar_btm').css({display: 'block'}).addClass('fadeIn').removeClass('fadeOut');
    //changeTit();
  });

  $('.filter_bar').on('tap', '.reset', function () {

    var i = $('.mui-control-item.mui-active').index();
    var _key = $('.mui-control-item.mui-active').attr('data-type');
    $('.menu_item_other .menu_item:eq(' + i + ')').find('.active').removeClass('active');
    $('.menu_item_other .menu_item:eq(' + i + ')').find('.choose_item ').text('全部').removeClass('main_c');
    $('.mui-control-item.mui-active').text($('.menu_item_other .menu_item:eq(' + i + ')').find('._title').text());

    $('.mui-control-content.mui-active').find('li').each(function (ind, el) {
      if ($(el).hasClass('active')) {
        var ind = $(el).index();
        for (var i = 0; i < page.filter.spec[_key].data.length; i++) {
          page.filter.spec[_key].data[i].ischecked = false;
        }
      }
      $(this).removeClass('active');

    })

    $('.mui-control-item.mui-active').removeClass('main_c');
    page.filterFun.update();

  });

  $('.filter_bar').on('tap', '.done', function () {
    page.filterFun.update();
    setTimeout(function () {
      maskHide();
    }, 0)

  });
  $('.filter_bar').on('tap', '.cell', function () {
    var _i = $(this).index();
    var _fi = $('.mui-control-item.mui-active').index();
    var _key = $('.mui-control-item.mui-active').attr('data-type');
    $('.menu_item_other .menu_item:eq(' + _fi + ')').find('.menu_box_item:eq(' + _i + ')').trigger('tap');

  });

  $('.menu_item_other').on('tap', '.menu_box_item', function () {

    var _i = $(this).index();
    var _fi = $(this).closest('.menu_item').index();
    var _key = $(this).closest('.menu_item').find('._title').attr('data-type');
    var _name = $(this).closest('.menu_item').find('._title').text();
    $(this).toggleClass('active');
    toggoleChecked(_i, _key);
    $('.mui-control-content:eq(' + _fi + ')').find('.cell:eq(' + _i + ')').toggleClass('active');
    var el = $(this);
    if (el.parent().find('.active').length != 0) {
      var _text = [];
      el.parent().find('.active ._item').each(function (i, e) {
        _text[i] = $(this).text();
      });
      el.closest('.menu_item').find('.choose_item').text(_text.join(',')).addClass('main_c');
      $('.mui-control-item:eq(' + _fi + ')').text(_text).addClass('main_c ')
    } else {
      el.closest('.menu_item').find('.choose_item').text('全部').removeClass('main_c');

      $('.mui-control-item:eq(' + _fi + ')').text(_name).removeClass('main_c');
    }
    // console.log(page.filter.spec[_key].data[_i]['ischecked']);

  });

  function toggoleChecked(i, key, _opt) {
    if (_opt && _opt == true || _opt == false) {
      page.filter.spec[key].data[i]['ischecked'] = _opt;
    } else {
      if (page.filter.spec[key].data[i]['ischecked'] == true) {
        page.filter.spec[key].data[i]['ischecked'] = false;
      } else {
        page.filter.spec[key].data[i]['ischecked'] = true;
      }
    }

  }

  // 自定属性
  //通用搜索属性,搜索属性是根据品类来的，如果不传递品类，现在是查询了所有虚拟品类对应的属性；如果在筛选条件中选择了品类，要重新查询属性

  $('.menu_item_other').on('tap', '.menu_item:eq(0) .menu_box_item', function () {

    // 清空原来的数据
    page.filter.custom = [];

    var catIds = [];
    for (var i = 0; i < page.filter.spec.cat.data.length; i++) {
      if (page.filter.spec.cat.data[i].ischecked == true) {
        catIds.push(page.filter.spec.cat.data[i].id);
      }
    }

    if (catIds.length) {
      getJson("/ec/goods/doSearchProps.do", {
        catIds: catIds.join(',')
      }, function (data) {
        // console.log(data);

        for (var i = 0; i < data.data.length; i++) {
          var valuesList = [];
          for (var j = 0; j < data.data[i].values.length; j++) {
            var a = {
              id: data.data[i].values[j].id,
              text: data.data[i].values[j].value,
              ischecked: false
            };
            valuesList.push(a);

          }
          var props = {
            text: data.data[i].name,
            id: data.data[i].id,
            values: valuesList
          };

          page.filter.custom.push(props);
        }
        if (page.filter.custom == []) {
          $('.goods_slide_menu').find('.menu_item_cus').html('');
        } else {
          var data = {
            vars: vars,
            xData: page.filter.custom
          };
          // console.log(data.xData);
          $('.goods_slide_menu').find('.menu_item_cus').html('');
          renderTmp('#filterSlideCus', 'filterSlideCusTpl', data);
        }

      });
    } else {
      $('.goods_slide_menu').find('.menu_item_cus').html('');
    }
  });

  $('.menu_item_cus').on('tap', '.menu_box_item', function () {
    var _i = $(this).index()
    var _fi = $(this).closest('.menu_item').index();
    var _name = $(this).closest('.menu_item').find('._title').text();
    var el = $(this);
    $(this).toggleClass('active');
    toggoleCheckedCus(_i, _fi);
    if (el.parent().find('.active').length != 0) {
      var _text = [];
      el.parent().find('.active ._item').each(function (i, e) {
        _text[i] = $(this).text();
      });
      el.closest('.menu_item').find('.choose_item').text(_text.join(',')).addClass('main_c');
    } else {
      el.closest('.menu_item').find('.choose_item').text('全部').removeClass('main_c');
    }

  });

  function toggoleCheckedCus(i, fi, _opt) {
    if (_opt && _opt == true || _opt == false) {
      page.filter.custom[fi].values[i]['ischecked'] = _opt;
    } else {
      if (page.filter.custom[fi].values[i]['ischecked'] == true) {
        page.filter.custom[fi].values[i]['ischecked'] = false;
      } else {
        page.filter.custom[fi].values[i]['ischecked'] = true;
      }
    }
  }

  // mui('#offCanvasContentScroll').scroll();
  //实现ios平台的侧滑关闭页面；
  if (mui.os.plus && mui.os.ios) {
    offCanvasWrapper[0].addEventListener('shown', function (e) { //菜单显示完成事件
      plus.webview.currentWebview().setStyle({
        'popGesture': 'none'
      });
    });
    offCanvasWrapper[0].addEventListener('hidden', function (e) { //菜单关闭完成事件
      plus.webview.currentWebview().setStyle({
        'popGesture': 'close'
      });
    });
  }

  //
  $('.mui-content').on('tap', '.goods_item a', function (event) {
    event.stopPropagation();
    var Style = $('#pullrefresh>.mui-scroll').attr('style');
    var scrollTop = Math.abs(parseInt(Style.split(';')[0].split(',')[1]));
    page.hisState = $(this).attr('href').split('=')[1];
    var url = page.url.set({
      back: 'true',
      st: scrollTop
    });
    history.replaceState(page.hisState, '', url);
    //记录滚动位置

  });

  // console.log(history,page.url.url);

}
