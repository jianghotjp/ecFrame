/**
 * url里的prop 转成obj
 * @param prop
 * @returns {{}}
 */
function propStringToObj(str) {
  if (!str) {
    return {};
  }
  var arr, obj = {}, i;
  arr = str.split(',');
  for (i = 0; i < arr.length; i++) {
    var single = arr[i].split(':');
    obj[single[0]] = single[1];
  }
  return obj;
}
/**
 * obj转成url里的prop
 * @param obj
 * @returns {string}
 */
function objToPropString(obj) {
  var str, i, arr = [];
  for (i in obj) {
    arr.push(i + ':' + obj[i]);
  }
  str = arr.join();
  return str;
}
// 筛选初始化条数
page.pageSize = 12;
page.propLen = 3;
// 关键字
page.kw = typeof page.url.get('kw') == 'string' ? page.url.get('kw') : '';
// 分类id
page.cat = typeof page.url.get('cat') == 'string' ? page.url.get('cat') : '';
// 已选筛选项
page.prop = typeof page.url.get('prop') == 'string' ? page.url.get('prop') : '';
// 已选品牌
page.brand = typeof page.url.get('brand') == 'string' ? page.url.get('brand') : '';
//排序
page.sort = typeof page.url.get('sort') == 'string' ? page.url.get('sort') : '';
// 价格区间
page.priceRange = typeof page.url.get('priceRange') == 'string' ? page.url.get('priceRange') : '';
//页码
page.page = typeof page.url.get('page') == 'string' ? page.url.get('page') * 1 : 0;
/**
 * 商品筛选
 * @type {{brands: {name: string, id: string, index: number, data: Array, key: string, value: string}, init: page.filterFunc.init, getData: page.filterFunc.getData, renderBrand: page.filterFunc.renderBrand, renderCheckdBrand: page.filterFunc.renderCheckdBrand, getPropsData: page.filterFunc.getPropsData, renderProps: page.filterFunc.renderProps, findChkedProps: page.filterFunc.findChkedProps, renderChkedProps: page.filterFunc.renderChkedProps}}
 */
page.filterFunc = {
  brands: {
    name: '品牌',
    id: 'brands',
    index: 1,
    data: [],
    key: 'name',
    value: 'id'
  },
  priceRange: {
    name: '价格',
    id: 'priceRange',
    index: 1,
    data: [],
    key: 'name',
    value: 'id'
  },

  // 初始化
  init: function () {
    page.filterFunc.getData();

    if (page.cat) {
      page.filterFunc.getPropsData();
    }

    $('#topFilterItem,#filterSlideItem').on('click', '.more', function () {
      // 展开更多
      $(this).closest('dl').toggleClass('showMore');
    }).on('click', '.check', function () {
      // 多选
      $(this).closest('dl').addClass('selectMore');
    }).on('click', '.cancal', function () {
      // 取消
      $(this).closest('dd').find('.inner a').removeClass('checked');
      $(this).closest('dl').removeClass('selectMore');
    });
    //品牌点击事件
    $('#topFilterItem').on('click', '.inner a', function () {
      // 点击品牌属性
      var el = $(this).closest('dl');
      if (el.hasClass('selectMore')) {
        // 开启多选
        $(this).toggleClass('checked');
        if ($(this).parent().find('.checked').length > 0) {
          el.find('.current').removeClass('am-disabled');
        } else {
          el.find('.current').addClass('am-disabled');
        }
      } else {
        // 未开启多选 修改page值，跳转url
        // 新值
        var val = $(this).data('id');
        if (page.prop == val) {
          return;
        }
        toNewPage(page.url.set({'brand': val}));
      }
    }).on('click', '.current', function () {
      // 多选确认按钮
      var curs = $(this).closest('dd').find('.inner .checked'), arr = [];
      curs.each(function () {
        arr.push($(this).data('id'));
      });
      toNewPage(page.url.set({'brand': arr.join(',')}));
    });
    // 属性点击事件
    $('#filterSlideItem').on('click', '.inner a', function () {
      // 点击属性
      var el = $(this).closest('dl');
      if (el.hasClass('selectMore')) {
        // 开启多选
        $(this).toggleClass('checked');
        if ($(this).parent().find('.checked').length > 0) {
          el.find('.current').removeClass('am-disabled');
        } else {
          el.find('.current').addClass('am-disabled');
        }
      } else {
        // 未开启多选 修改page值，跳转url
        // 原值
        var pram, prop, propObj = {};
        pram = page.url.get('prop');
        prop = typeof pram == 'string' ? pram : '';
        propObj = propStringToObj(prop);
        // 新值
        var key = $(this).closest('dl').data('type'),
          val = $(this).data('id');
        propObj[key] = val;
        var newStr = objToPropString(propObj);
        if (page.prop == newStr) {
          return;
        }
        toNewPage(page.url.set({'prop': newStr}));
      }
    }).on('click', '.current', function () {
      // 多选确认按钮
      var now = propStringToObj(page.prop),
        el = $(this).closest('dl'),
        key = el.data('type'),
        values = [],
        valStr;
      el.find('.inner .checked').each(function () {
        values.push($(this).data('id'));
      });
      valStr = values.join(';');
      if (!!now[key] && now[key] == valStr) {
        return;
      }
      now[key] = valStr;
      toNewPage(page.url.set({'prop': objToPropString(now)}));
    });
    // 品牌条件删除
    $('#chkedBrand').on('click', 'a', function () {
      toNewPage(page.url.remove('brand'));
    });
    // prop条件删除
    $('#chkedProp').on('click', 'a', function () {
      var now = propStringToObj(page.prop),
        key = $(this).data('id'), str;
      delete now[key];
      str = objToPropString(now);
      toNewPage(page.url.set({'prop': str}));
    });
  },
  /**
   * 获取品牌数据（已选择/未选择）
   */
  getData: function () {
    getJson("/ec/brand/doSearchAllBrandList.do", {}, function (res) {
      // 获取价格筛选
      page.filterFunc.getPriceData();
      if (!page.brand) {
        // 未选品牌
        for (var i = 0; i < res.data.length; i++) {
          page.filterFunc.brands.data[i] = {
            'text': res.data[i].name,
            'id': res.data[i].id
          };
        }
        page.filterFunc.renderBrand();
      } else {
        var arr, nameArr = [], i, j;
        // 已选品牌
        arr = page.brand.split(',');
        for (i = 0; i < res.data.length; i++) {
          for (j = 0; j < arr.length; j++) {
            if (res.data[i].id == arr[j]) {
              nameArr.push(res.data[i].name);
            }
          }
        }
        // console.log(nameArr);
        page.filterFunc.renderCheckdBrand(nameArr);
      }

    });
  },
  /**
   * 未选择筛选品牌时渲染品牌列表
   */
  renderBrand: function () {
    var data = {
      vars: vars,
      xData: page.filterFunc.brands,
      page: page
    };
    renderTmp('#topFilterItem', 'filterItemTpl', data);
  },
  /**
   * 已选择品牌时 渲染顶部已选择按钮
   * @param {[]} nameArr 已选的 选项名 数组
   */
  renderCheckdBrand: function (nameArr) {
    var data = {
      xData: nameArr.join('、')
    };
    renderTmp('#chkedBrand', 'chkedBrandTpl', data);
  },
  /**
   * 获取价格数据（已选择/未选择）
   */
  getPriceData: function () {
    getJson("/common/doSearchBaseCode.do", {
      typeNo: 'CD040021'
    }, function (res) {
      if (res.data.length) {

        if (!page.priceRange) {
          // 未选品牌
          for (var i = 0; i < res.data.length; i++) {
            page.filterFunc.priceRange.data[i] = {
              'text': res.data[i].name,
              'id': res.data[i].id
            };
          }
          page.filterFunc.renderPriceRange();
        } else {
          var arr, nameArr = [], i, j;
          // 已选品牌
          arr = page.priceRange.split(',');
          for (i = 0; i < res.data.length; i++) {
            for (j = 0; j < arr.length; j++) {
              if (res.data[i].id == arr[j]) {
                nameArr.push(res.data[i].name);
              }
            }
          }
          page.filterFunc.renderCheckdBrand(nameArr);
        }
      }
    });
  },
  /**
   * 未选择筛选品牌时渲染品牌列表
   */
  renderPriceRange: function () {
    var data = {
      vars: vars,
      xData: page.filterFunc.priceRange,
      page: page
    };
    renderTmp('#topFilterItem', 'priceFilterItemTpl', data);
  },
  /**
   * 已选择品牌时 渲染顶部已选择按钮
   * @param {[]} nameArr 已选的 选项名 数组
   */
  renderCheckPriceRange: function (nameArr) {
    var data = {
      xData: nameArr.join('、')
    };
    renderTmp('#chkedProp', 'chkedPriceTpl', data);
  },
  /**
   * 获取根据cat自定义的属性列表
   */
  getPropsData: function () {
    getJson("/ec/goods/doSearchProps.do", {
      catIds: page.cat
    }, function (res) {
      //console.log(data);
      page.filterFunc.renderProps(res)
    });
  },
  /**
   * 渲染属性
   * @param {{}} res 收到的后台数据
   */
  renderProps: function (res) {
    var arr, prop = res;
    if (page.prop) {
      arr = page.prop.split(',');
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(':');
      }
      prop = page.filterFunc.findChkedProps(prop, arr);
    }

    var data = {
      len: page.propLen,
      xData: prop.data
    };
    renderTmp('#filterSlideItem', 'filterSlideTpl', data);

  },
  /**
   * 分拣已选属性和未选属性
   * @param {{}} res 后台返回的全部数据
   * @param {[]} arr 前台根据url获取的已选列表
   * @returns {{}} 未进行筛选的属性
   */
  findChkedProps: function (res, arr) {
    var i, j, data = $.extend([], res.data);
    // 拣出已选属性
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < data.length; j++) {
        if (data[j].id == arr[i][0]) {
          // 删除已选
          res.data.splice(j, 1);
          // 渲染已选
          page.filterFunc.renderChkedProps(data[j], arr[i][1]);
          // chkedArr.push(data.data[j]);
        }
      }
    }

    // 返回未选属性
    return res;
  },
  /**
   * 渲染选中的prop筛选项
   * @param {[]} data 选中的筛选项
   * @param {String} idStr url中该type已选的id
   */
  renderChkedProps: function (data, idStr) {
    // 渲染已选
    var strArr, ids, i, j;
    strArr = [];
    ids = idStr.split(';');
    for (i = 0; i < ids.length; i++) {
      for (j = 0; j < data.values.length; j++) {
        if (data.values[j].id == ids[i]) {
          strArr.push(data.values[j].value);
        }
      }
    }
    var render = {
      id: data.id,
      name: data.name,
      xData: strArr.join('、')
    };
    renderTmp('#chkedProp', 'chkedPropTpl', render);
  }
};

$(function () {
  // 初始化筛选
  page.filterFunc.init();
  //判断排序状态是否存在
  if (page.sort) {
    var sort = page.sort;//取到跳转到新页面后的sort
    page.sort = sort;
    //判断sort类型==销量
    if (sort.split(':')[0] == 'sl') {
      if (sort.split(':')[1] == 'a') {
        $('.num_sort').addClass('arrUp')
      } else {
        $('.num_sort').addClass('arrDown')
      }
    }
    //判断sort类型==价格
    if (sort.split(':')[0] == 'pr') {
      if (sort.split(':')[1] == 'a') {
        $('.price_sort ').addClass('arrUp')
      } else {
        $('.price_sort ').addClass('arrDown')
      }
    }
    //判断sort类型 == 新品
    if (sort.split(':')[0] == 'nw') {
      if (sort.split(':')[1] == 'a') {
        $('.new_sort').addClass('arrUp')
      } else {
        $('.new_sort').addClass('arrDown')
      }
    }
    //判断sort类型 == 综合排序
    if (sort.split(':')[0] == 'rk') {
      $('.sort_down').addClass('on')
    }
    //判断sort类型 == 人气
    if (sort.split(':')[0] == 'ht') {
      $('.Popularity').addClass('on')
    }
    //只看活动
    // if( page.url.get('sort') == '1'){
    //     $('.activity').addClass('icon-check')
    // }

  }
  // 获取商品列表数据
  getPageData();

  //获取商品列表
  function getPageData() {
    $('#container').empty();
    getJson("/ec/goods/doSearchGoodsByProps.do", {
      kw: decodeURI(page.kw),
      catType: null,
      priceMin: null,//最小价格
      priceMax: null,//最大价格
      sort: page.sort,//销量排序：sl:a(升序),sl:d(降 序);   价格排序:pr:a(升 序),pr:d(降序);  新品排序：nw:a(升序),nw:d(降 序)
      cat: page.cat,
      area: page.area,
      brand: page.brand,
      prop: page.prop,
      priceRange: page.priceRange,
      page: page.page,
      pageSize: page.pageSize
    }, function (data) {
      //console.log(data);
      page.pageCount = data.data.pageCount;
      var rows = data.data.rows;
      //page.cache.page = page.page;
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
        renderTmp('#container', 'goodsItem', itemData);
      }
      lazyLoad.refresh(true);
      //设置排序栏页码
      $('.total_page').text(page.pageCount);
      $('.cur_page').text(page.page ? page.page : 1);
      $('.num_search').text(data.data.rowCount);
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
          // $('#container').empty();
          getPageData();
          $('.cur_page').text(page.page ? page.page : 1);
        }
      });

      //排序后面的上一页/下一页
      $('.sort').one('click', '.nextPage', function () {
        $('.am-pagination').find('.nextPage').trigger('click');
        $('.cur_page').text(page.page ? page.page : 1);
      }).one('click', '.prevPage', function () {
        if (page.page < 2) {
          return
        }
        $('.am-pagination').find('.prevPage').trigger('click');
        $('.cur_page').text(page.page ? page.page : 1);
      });
      if (page.page < 2) {
        $('.sort').find('.prevPage').addClass('disabled');
        $('.sort').find('.nextPage').addClass('disabled');
      } else {
        $('.sort').find('.prevPage').removeClass('disabled')
      }
      if (page.page == page.pageCount) {
        $('.sort').find('.nextPage').addClass('disabled')
      } else {
        $('.sort').find('.nextPage').removeClass('disabled')
      }

    });
  }

  //商品筛选
  $('.sort .l').on('click', '.sort_btn', function () {
    if($(this).hasClass('on') && ($(this).hasClass('sort_down') || $(this).hasClass('Popularity')) ){
      return
    }
    $(this).addClass('on').siblings().removeClass('on').removeClass('arrUp').removeClass('arrDown');
    // $('.price_sort');
    //商品价格排序
    if ($(this).hasClass('price_sort')) {
      if ($(this).hasClass('arrUp')) {
        page.sort = 'pr:d';
        $(this).removeClass('arrUp').addClass('arrDown');
      } else {
        page.sort = 'pr:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    } else if ($(this).hasClass('num_sort')) {
      //商品销量排序==销量排序：sl:a(升序),sl:d(降 序);
      if ($(this).hasClass('arrUp')) {
        page.sort = 'sl:d';
        $(this).removeClass('arrUp').addClass('arrDown');
      } else {
        page.sort = 'sl:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    } else if ($(this).hasClass('new_sort')) {
      //商品新品排序==新品排序：nw:a(升序),nw:d(降 序)
      if ($(this).hasClass('arrUp')) {
        page.sort = 'nw:d';
        $(this).removeClass('arrUp').addClass('arrDown');

      } else {
        page.sort = 'nw:a';
        $(this).addClass('arrUp').removeClass('arrDown');
      }
    } else if ($(this).hasClass('sort_down')) {
      //商品的综合排序
      page.sort = 'rk';
    } else if ($(this).hasClass('Popularity')) {
      //商品的人气排序
      page.sort = 'ht';
    } else {
      page.sort = $(this).attr('data-type');
    }
    // toNewPage(page.url.set({'sort':page.sort}));

    page.page = 0;
    getPageData();
  });
  //活动促销筛
  $('.sort ').on('click', '.btn_activity', function () {

    if ($(this).hasClass('activity')) {
      if ($(this).find('.btn_icon').hasClass('icon-check')) {
        page.hasPromo = 0;
        $(this).find('.btn_icon').removeClass('icon-check')
      } else {
        page.hasPromo = 1;
        $(this).find('.btn_icon').addClass('icon-check')
      }
    }
    //toNewPage(page.url.set({'sort':page.hasPromo}));
    page.page = 0;
    getPageData();
  });

  // 猜你喜欢
  checkLogin(function () {
    getJson('/mbr/doSearchMbrLikeGoodsList.do', {}, function (res) {
      if (res.data.length) {
        // console.log(res.data)
        page.guessU = res.data;
        guessUFunc(page.guessU)
      }

    });
    page.clickNum = 1;
    $('body').on('click', '.change_guess', function () {
      guessUFunc(page.guessU);
      $(this).find('i').css('transform', 'rotate(' + (360 * page.clickNum++) + 'deg)');
    });
  })

  function guessUFunc(data) {
    var goodsData;

    if (data.length <= 5) {
      goodsData = {
        vars: vars,
        xData: data
      };
    } else {
      var arr = [], idxArr = [];

      while (idxArr.length < 5) {
        var idx = Math.round(Math.random() * (data.length - 1));
        for (var i = 0; i < idxArr.length; i++) {
          if (idxArr[i] == idx) {
            idxArr.splice(i, 1)
          }
        }
        idxArr.push(idx);
      }
      for (var i = 0; i < idxArr.length; i++) {
        arr.push(data[idxArr[i]]);
      }
      goodsData = {
        vars: vars,
        xData: arr
      };
    }
    $('.mb_like').show();
    $('#guessU').fadeOut('fast',function(){
      $('#guessU').html('');
      renderTmp('#guessU', 'guessUTpl', goodsData,function(el,Tpl){
        $(el).append(Tpl);
        if (el.className.indexOf('show') < 0) {
          el.className += ' show';
        }
        $('#guessU').fadeIn('fast');
      });
      lazyLoad.refresh();
    });
  }

//  面包屑

  function bread() {
    if (page.kw == '') {
      getJson('/ec/goods/doFindFullPathOfCat.do', {
        catId: page.cat
      }, function (res) {
        if (res.success) {
          var data = {
            vars: vars,
            xData: res.data
          };
          renderTmp('#bread', 'breadTpl', data);
        }
      })
    } else {
      data = {
        vars: vars,
        kw: decodeURI(page.kw)
      };
      renderTmp('#bread', 'breadTpl', data);
      $('.search_ipt').val(decodeURI(page.kw))

    }
  }

  bread();

});