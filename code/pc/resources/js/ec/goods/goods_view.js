$(function () {
  page.goodsId = page.url.get('id') ? parseInt(page.url.get('id')) : 0;
  page.tabCode = ''; // 评论筛选标签

  //分享参数
  page.share = {};
  //收藏状态
  page.isFav = 0;
  /*sku相关*/
  page.sku = {
    /**
     * sku对应属性集合
     */
    props: [],
    /**
     * sku集合
     */
    skus: [],
    /**
     * 商品信息集合
     */
    goods: [],
    main_img: '',
    skuId: null,
    stockQuantity: 0,
    /**
     * 初始化页面，模版渲染
     */
    init: function () {
      //评价列表模版渲染
      page.sku.getCmtsList('all', 1);
      //商品基本信息、商品简介、商品参数、商品评价模版渲染
      getJson('/ec/goods/doFindGoods.do', {
        goodsId: page.goodsId
      }, function (data) {
        if (!data.success) {
          toast(data.errorMessage, 'error');
          setTimeout(function () {
            window.history.go(-1);
          }, 1000);
          return false;
        }
        // console.log(data);
        var i = 0, j = 0;//索引值，供数组遍历使用
        var zData = {
          catName: data.data.goods.catName,
          skus: data.data.skus,
          props: data.data.props,
          stockQty: data.data.goods.stockQty,
          hasStock: data.data.goods.stockQty > 0,
          pics: data.data.goods.pics,
          goods: data.data.goods,
          goodsId: data.data.goods.id,
          promo: data.data.promos,
          platformPromo: data.data.platformPromo,
          fullFreeShippingOrTaxPromoList: data.data.fullFreeShippingOrTaxPromoList
        };
        page.goods = data.data.goods;
        page.sku.skus = page.sku.setValueIds(zData.skus);
        page.sku.props = zData.props;
        page.sku.stockQuantity = zData.stockQty;
        page.sku.skuQuantity = 0;
        page.sku.hasStock = zData.hasStock;

        page.shopId = data.data.goods.shopId;

        // 页面加载时判断是否收藏
        page.isFav = data.data.isFav;
        if (page.isFav) $('.join_collection').addClass('cur');
        page.picUrls = zData.pics;

        // 面包屑渲染
        getJson("/ec/goods/doFindFullPathOfCat.do", {goodsId: page.goodsId}, function (data) {
          data = {
            vars: vars,
            xData: data.data,
            goodsName: zData.goods.name
          };
          renderTmp('#bread', 'breadTpl', data);

          //商品缩略图列表初始化
          page.sku.picListInit(page.picUrls);
        });

        // 店铺信息
        getJson("/shop/doLoadShopInfo.do", {
          id: page.shopId
        }, function (data) {
          page.shopInFav = data.data.shopInFav;
          data = {
            vars: vars,
            xData: data.data
          };
          renderTmp('#shopInfo', 'shopInfoTpl', data);
        });

        //商品详情基本信息模版渲染

        var infoData = {
          vars: vars,
          goodsInfo: zData.goods,
          skus: zData.skus,
          props: zData.props,
          hasStock: zData.hasStock,
          promo: zData.promo
        };
        renderTmp('#goodsViewInfo', 'goodsViewInfoTpl', infoData);
        for (i = 0; i < zData.props.length; i++) {
          for (j = 0; j < zData.props[i].values.length; j++) {
            if (page.sku.valueExist(zData.props[i].values[j].id, page.sku.skus))
              $('#propsValuesList').find('.propsValuesLine').eq(i).find('._con').append('<a class="sku_item l" href="javascript:;" id="skuId-' + zData.props[i].values[j].id + '">' + zData.props[i].values[j].value + '</a>');
          }
        }
        if ($('.propsValuesLine').length == 1 && $('.sku_item').length == 1) {
          $('.sku_item').addClass('cur');
          var skus = [];
          skus.push($('.sku_item').attr('id').split('-')[1]);
          // $('.sku_item').attr('id').split('-')[1]
          // page.sku.skuId=page.sku.skus[0].id;
          page.sku.switchSkuPc(skus);
        }

        page.sku.skuChoose();//绑定sku条件选择事件
        //商品信息模版渲染
        var goodsInfoData = {
          vars: vars,
          xData: data.data
        };
        renderTmp('#goodsInfoCon', 'goodsInfoConTpl', goodsInfoData);
        renderTmp('#goodsPramaCon', 'goodsPramaConTpl', goodsInfoData);

        lazyLoad.refresh(true);
        $('.goods_parameter_tabs').tabs();

        // 配送地址
        var userAddr = data.data.defaultAddress;
        if (userAddr) {
          var provinceName = userAddr.provinceName ? userAddr.provinceName : '',
            cityName = userAddr.cityName ? userAddr.cityName : '',
            districtName = userAddr.cityName ? userAddr.districtName : '',
            address = userAddr.address ? userAddr.address : '';
          $('.delivery_area').html(provinceName + ' ' + cityName + ' ' + districtName);
        } else {
          //如果没有默认收货地址就定位当前城市
          var moClient = $('#moClient').val();
          jsLocation(moClient, function (city) {
            $('.delivery_area').html(city);
          });
        }

        /*满减满赠*/
        // if (zData.promo.length) {
        //   var fullCutOrGiftsPromo = {
        //     vars: vars,
        //     promo: zData.promo
        //   };
        //   renderTmp('#fullCut', 'fullCutTpl', fullCutOrGiftsPromo);
        // } else {
        //
        // }
        // 促销
        if (zData.platformPromo) {
          var platformPromo = {
            vars: vars,
            promo: zData.platformPromo,
            goodsId: zData.goodsId
          };
          renderTmp('#fullCut', 'cxTpl', platformPromo);
        }

        // 包邮
        var freeShipping = data.data.dlvTmpl.freeShipping;
        if (freeShipping) {
          var freeShippingArrr = [];
          // for (i = 0; i < data.data.dlvTmpl.deliverympl.length; i++) {
          //   freeShippingArrr.push(data.data.dlvTmpl.deliverympl[i].deliveryTypeName);
          // }
          // $('#freeShipping').html(freeShippingArrr.join('，') + '包邮');
          if (data.data.dlvTmpl.freeShipping) {
            $('#freeShipping').html('包邮');
          }
        }

        //分享
        var pic = location.origin + imgFormat(page.picUrls[0], '100x100', false, true);
        window._bd_share_config = {
          "common": {
            "bdSnsKey": {},
            "bdText": zData.goods.name,
            "bdDesc": '',
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": pic,
            "bdStyle": "0",
            "bdSize": "16"
          },
          "share": {}
        };
        with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];

        //商品基本信息、商品简介、商品参数、商品评价模版渲染 end

        // 热卖推荐渲染
        getJson('/ec/goods/doFindSameCatGoodsList.do', {
          goodsId: page.goodsId,
          limit: 6
        }, function (data) {
          if (!data.success) {

            return false;
          } else if (data.data.length <= 0) {

            return false;
          }

          var itemData = {
            vars: vars,
            xData: data.data
          };
          renderTmp('#hotListContainer', 'hotListItem', itemData);

          // 顶部右侧热卖轮播
          $('#recSlider').flexslider({
            direction: 'vertical',
            controlNav: false,
            keyboard: false
          });
          lazyLoad.refresh(true);
          $('#recSlider').show();
        });

        // 看了最终买
        getJson('/ec/goods/doFindFinalBuyGoodsList.do', {
          goodsId: page.goodsId,
          limit: 6
        }, function (data) {
          if (!data.success) {
            return false;
          } else if (!data.data.length) {
            $('.rec_slider').hide();
            return false;
          }
          for (var i = 0; i < data.data.length; i++) {
            var itemData = {
              vars: vars,
              xData: data.data[i]
            };
            renderTmp('#guessLikeListContainer', 'hotListBuyItem', itemData);
          }
          lazyLoad.refresh(true);
          var setInt = setInterval(function(){
            var h1 = $('.goods_view_bg .goods_shop_info').outerHeight(),
              h2 = $('.goods_view_bg .goods_parameter ').outerHeight();
            if (h1 > h2) {
              $('.goods_view_bg .goods_parameter ').height(h1);
            } else {
              $('.goods_view_bg .goods_shop_info').height(h2);
            }
          },100);
          setTimeout(function(){
            clearInterval(setInt);
          },60000)

        });

        getJson('/comm/widget/doSearchShopWidgetData.do', {
          widgetName: 'PC-商品详情页-商品评价上方单图广告位',
          widgetDataType: 1,
          shopId: page.shopId
        }, function (data) {
          if (data.data) {
            var xdata = {
              vars: vars,
              xData: data.data.widgetData
            };
            renderTmp('#serverImg', 'serverImgTpl', xdata);
            lazyLoad.refresh(true);
          }

        });
      });

    },
    skuChoose: function () {
      $("#propsValuesList").on("click", ".sku_item", function () {//商品属性点击选择
        if (!$(this).hasClass('disabled')) {
          var valueIds = [];
          var tmpSkuId = 0;
          $(this).hasClass('cur') ? $(this).removeClass('cur') : $(this).addClass('cur').siblings().removeClass('cur');
          $('#propsValuesList .propsValuesLine').each(function () {
            if ($(this).find('.cur').length > 0) {
              tmpSkuId = parseInt($(this).find('.cur').attr('id').split('-')[1]);
              valueIds.push(tmpSkuId);
            }
          });
          //将不可选条件置为灰色且不能点击
          page.sku.skuBan(page.sku.skus, valueIds);
          page.sku.switchSkuPc(valueIds);
        }
      });
    },
    /**
     * 商品评价
     * @param {string} type //all：全部评价，high：好评，medium：中评，low：差评，img：有图
     * @param {number} currentPage 评论列表的初始页码
     */
    getCmtsList: function (type, currentPage) {
      currentPage = "number" === typeof(currentPage) && currentPage >= 1 ? parseInt(currentPage) : 1;
      //商品评价列表模版渲染
      getJson("/ec/goods/doSearchComments.do", {
        goodsId: page.goodsId,
        type: '',
        tabCode: page.tabCode,
        page: currentPage,
        pageSize: page.pageSize
      }, function (data) {
        if (!data.success) {
          toast(data.errorMessage, 'error');
          return false;
        }
        var infoData = {
          vars: vars,
          xData: data.data
        };
        //只渲染一次
        if (!$('#commentInfo').hasClass('rendered')) {
          renderTmp('#commentInfo', 'commentInfoTpl', infoData);
          $('#commentInfo').addClass('rendered');
        }

        //商品评价数量渲染
        $('.commentCount').text(data.data.allCount ? data.data.allCount : 0);

        //商品评价列表渲染
        $('#evaluationListContainer').html("");
        for (var i = 0; i < data.data.commentPagedList.rows.length; i++) {
          var goodsCommentData = {
            vars: vars,
            xData: data.data.commentPagedList.rows[i]
          };
          renderTmp('#evaluationListContainer', 'evaluationListItem', goodsCommentData);
        }

        lazyLoad.refresh(true);
        //加载图片预览

        $('.viewImgimg').zoomify();

        $('#evalPagination').html("");
        $('#evalPagination').createPage({
          current: currentPage,
          pageCount: data.data.commentPagedList.pageCount,
          pageSize: page.pageSize,
          callback: function (newNum) {
            if (newNum > 0 && newNum <= data.data.commentPagedList.pageCount) {
              page.sku.getCmtsList(type, newNum);
            } else {
              toast("请求页码非法,无法跳转页面", 'error');
            }
          }
        });
      });
    },
    /**
     * 根据sku图片列表地址重置商品缩略图列表
     * @param {object}
     * [proPicUrls= ['/upload/upload/20170104/554fecde-fb74-4749-b036-06a463f290c3.jpg.60x60.png'] ]
     * - 图片地址数组，传空将获取商品默认图片列表page.picUrls。选填。
     */
    picListInit: function (proPicUrls) {
      //商品缩略图列表数据结构
      var picUrls = "object" == typeof(proPicUrls) && proPicUrls.length > 0 ? proPicUrls : page.picUrls;
      var slideCon = '<div data-am-widget="slider" class="am-slider am-slider-default am-slider-manual" data-am-slider="{&quot;animation&quot;:&quot;slide&quot;,&quot;animationLoop&quot;:false,&quot;itemWidth&quot;:60,&quot;itemMargin&quot;:13}">'
        + '<ul class="am-slides dataContent" id="thumbList"></ul>'
        + '</div>';

      $('.thumbListWrap').html("").append(slideCon);
      for (var i = 0; i < picUrls.length; i++) {
        var itemData = {
          vars: vars,
          tmpUrl: picUrls[i]
        };
        renderTmp('#thumbList', 'thumbListItemTpl', itemData);
      }
      $('.am-slider-manual').flexslider({
        // options
        animation: "slide",
        animationLoop: false,
        itemWidth: 60,
        itemMargin: 13
      });
      page.sku.magnifyInit();
    },
    skuBan: function () {
      // 搜集选定属性valueId
      var valueIdValues = [];     // 按顺序填充，无空值
      var selectedValueIds = [];  // 按索引填充
      $(".propsValuesLine").each(function (idx) {
        var valueId = $(this).find(".cur").length > 0 ? $(this).find(".cur").attr("id").split('-')[1] : $(this).find(".cur").attr("id");
        valueIdValues.push(valueId);
        selectedValueIds[idx] = valueId;
      });

      // 禁用不可能的组合
      // 按version/prop构建正则表达式，逐个测试sku，如果没有符合条件的sku则禁用prop
      $(".propsValuesLine").each(function (idx, el) {
        $(this).find(".sku_item").each(function () {
          var skuEl = $(this);
          var i = 0;//索引变量，共遍历使用
          if (skuEl.hasClass("cur")) {
            // 当前选定的元素不应该无对应的sku，在构建属性选择列表之前应该过滤掉无对应项目的prop
          } else {
            var propValueId = skuEl.attr("id").split("-")[1];

            // 构建当前prop的正则表达式
            var valueSegs = [];
            for (i = 0; i < selectedValueIds.length; ++i) {
              if (idx == i)
                valueSegs.push(propValueId);
              else if (selectedValueIds[i])
                valueSegs.push(selectedValueIds[i]);
            }
            var reSegs = ["^"];
            for (i = 0, segs = valueSegs.sort(); i < segs.length; ++i) {
              reSegs.push("(\\d+,)*", segs[i], ",");
            }
            reSegs.length = reSegs.length - 1;
            reSegs.push("(,\\d+)*", "$");

            // 检查当前组合是否可能存在
            var regex = new RegExp(reSegs.join("")),
              skuFound = false;
            for (var s = 0, ss = page.sku.skus; s < ss.length; ++s) {
              var sku = ss[s];
              if (regex.test(sku.valueIds)) {
                skuFound = true;
                break;
              }
            }
            skuEl[skuFound ? "removeClass" : "addClass"]("disabled");
          }
        });
      });
    },
    /**
     * @param {object} valueIds 已选中sku条件数组
     */
    //显示sku库存
    switchSkuPc: function (valueIds) {
      // var skuChooseQty=0;
      //遍历所有sku，判断选中条件组合是否存在sku
      for (var i = 0; i < page.sku.skus.length; i++) {
        var skuMatched = false;
        var pIdsLen = page.sku.skus[i].propValueIds.length;
        var vIdsLen = valueIds.length;
        //若当前sku条件个数与选择条件个数相等，判断是否是需要的sku
        if (vIdsLen == pIdsLen) {
          var singleMatch = true;
          for (var j = 0; j < page.sku.skus[i].propValueIds.length; j++) {
            if (singleMatch) {
              singleMatch = false;
              // $.each(valueIds,function(k){
              for (var k = 0; k < valueIds.length; k++) {
                if (page.sku.skus[i].propValueIds[j] == valueIds[k]) {
                  singleMatch = true;
                  if (j == page.sku.skus[i].propValueIds.length - 1) skuMatched = true;
                  break;
                }
              }
            } else {
              skuMatched = false;
            }
          }
          //只有当选出正确sku时，赋值skuId，否则page.sku.skuId置为0
          page.sku.skuId = skuMatched ? page.sku.skus[i].id : 0;
          if (skuMatched) {
            page.sku.skuQuantity = page.sku.skus[i].stockQuantity;
            page.sku.picListInit("string" === typeof(page.sku.skus[i].picUrlList) && page.sku.skus[i].picUrlList.split(','));
            $('#goodsViewInfo .skuNum').text(page.sku.skuQuantity);
            // if (page.sku.skus[i].hasPromo) {
            //    显示促销价
            // $('.goods_view_info .goods_price_con .new_price span').text(page.sku.skus[i].promoPrice);
            // $('.goods_view_info .goods_price_con .old_price').removeClass('hide').find('span').text(page.sku.skus[i].price);
            // page.sku.tempPrice = page.sku.skus[i].promoPrice;
            // } else {
            //    显示原价
            $('#goodsPriceShow .goods_price span i').text(page.sku.skus[i].price);
            $('#goodsPriceShow .goods_price_old span i').text(page.sku.skus[i].originPrice);
            // $('.goods_view_info .goods_price_con .old_price').addClass('hide');
            page.sku.tempPrice = page.sku.skus[i].price;
            // }
            page.sku.priceRangeShow(false);
            break;
          } else {
            page.sku.picListInit(page.picUrls);
            $('#goodsViewInfo .skuNum').text(0);
            page.sku.skuQuantity = 0;
            page.sku.priceRangeShow(true);
          }
        } else {
          //if(可能存在sku)or 不可能存在sku
          if (page.sku.canSkuExist(page.sku.skus, valueIds)) {
            //sku选择不完整，且sku可能存在，显示总库存
            $('#goodsViewInfo .skuNum').text(page.sku.stockQuantity);
          } else {
            $('#goodsViewInfo .skuNum').text(0);
            page.sku.skuQuantity = 0;
          }
          page.sku.skuId = 0;
          page.sku.picListInit(page.picUrls);
          page.sku.priceRangeShow(true);
        }
      }
      buyType($('#goodsViewInfo .skuNum').text());
    },
    /**
     * 判断是否有满足当前条件的sku
     * @param skus 所有sku组合
     * @param valueIds 当前所选条件
     */
    canSkuExist: function (skus, valueIds) {
      var skuMatchMaxNum = 0;
      for (var sIdx = 0; sIdx < skus.length; sIdx++) {
        var skuMatchNum = 0;
        for (var vIdx = 0; vIdx < valueIds.length; vIdx++) {
          //    循环valueIds，每个条件与skus所有条件对比，匹配则对应按钮设为可选
          for (var pIdx = 0; pIdx < skus[sIdx].propValueIds.length; pIdx++) {
            if (skus[sIdx].propValueIds[pIdx] === valueIds[vIdx])
            //单个条件匹配成功
              skuMatchNum++;
          }
        }
        if (skuMatchNum > skuMatchMaxNum) skuMatchMaxNum = skuMatchNum;
      }
      return skuMatchMaxNum === valueIds.length;
    },
    /**
     * 判断当前sku属性值是否应该显示，若在sku数组中找到则认为可以显示，返回true，否则返回false
     * @param {number}  [value=940] sku属性值对应id
     * @param {object} skus 所有sku的可能情况组成的数组
     */
    valueExist: function (valueId, skus) {
      for (var i = 0; i < skus.length; i++) {
        for (var j = 0; j < skus[i].propValueIds.length; j++) {
          if (valueId === skus[i].propValueIds[j]) return true;
        }
      }
      return false;
    },
    /**
     * 商品价格显示（“具体价格”与“价格区间”切换）
     * @param {boolean} [e=true] 选择价格显示类型，为true时显示价格区间，否则显示某sku商品价格
     */
    priceRangeShow: function (e) {
      if (e) {
        $('.goods_view_info .price_range').removeClass('hide');
        $('.goods_view_info .goods_price_con').addClass('hide');
      } else {
        $('.goods_view_info .price_range').addClass('hide');
        $('.goods_view_info .goods_price_con').removeClass('hide');
      }
    },
    /**
     * 放大镜初始化
     */
    magnifyInit: function () {
      $('.gallery .am-slides li').eq(0).trigger('click');
      //放大镜(静态页有bug，因为图片比例与页面上所写不一致，需统一图片尺寸)
      $('#imgSmall').magnify({shape: 'rect', width: 100});
    },
    /**
     *  返回skuId对应商品库存,匹配不到则返回0库存
     * @param {number} skuId 所中sku的id值
     */
    skuQty: function (skuId) {
      for (var i = 0; i < page.sku.skus.length; i++) {
        if (page.sku.skus[i].id == skuId)
          return page.sku.skus[i].stockQuantity;
      }
      return 0;
    },
    setValueIds: function (skus) {
      $.each(skus, function (i, o) {
        var propValueIds = o.propValueIds;

        var valueIds = [];
        valueIds = propValueIds.sort().join(",");
        this.valueIds = valueIds;
      });
      return skus;
    }
  };
  page.sku.init();

  //添加&取消收藏触控
  $('body').on('click', '.join_collection', addFav);

  //商品图片展示，点击缩略图显示大图
  $('body').on('mouseenter', '.gallery .am-slides li', function (event) {
    event.preventDefault();
    var imgSrc = $(this).data('src');
    $(this).addClass('cur').siblings().removeClass('cur');
    $('#imgLarger,#imgSmall').attr({'src': imgSrc});
  });
  $('body').on('click', '.gallery .am-slides li', function (event) {
    event.preventDefault();
    if ($(this).hasClass('cur')) {
      return
    }
    var imgSrc = $(this).data('src');
    $(this).addClass('cur').siblings().removeClass('cur');
    $('#imgLarger,#imgSmall').attr({'src': imgSrc});
  });

  //加入收藏，先判断是否已经登录，如果没有登录，需要跳转到登录页面
  function addFav(event) {
    event.preventDefault();
    //先判断是否已登录，在登录状态下判断是否已收藏商品
    checkLogin(true, function () {
      getJson('/ec/goods/doFindGoods.do', {
        goodsId: page.goodsId
      }, function (data) {
        if (!data.success) {
          toast(data.errorMessage, 'error');
          return false;
        }
        page.isFav = data.data.isFav;
        if (page.isFav) {
          //  取消收藏
          getJson("/mbr/doRemoveGoodsFromFav.do", {
            ids: page.url.get('id')
          }, function (data) {
            if (data.success == true) {
              toast('已取消收藏');
              $('.join_collection').removeClass('cur');
            }
          });
        } else {
          //添加收藏
          getJson("/mbr/doAddGoodsToFav.do", {
            id: page.url.get('id')
          }, function (data) {
            if (data.success == true) {
              toast('商品收藏成功~');
              $('.join_collection').addClass('cur');
            }
          });
        }
      });
    });
  }

  function checkSort(e) {   //检查是否选中sku属性
    var msg = [];
    $("#propsValuesList .propsValuesLine").each(function (i) {
      if ($(this).find(".sku_item").hasClass("cur")) {

      } else {
        msg.push($(this).find('._tit').text());
      }
    });

    if (msg.length < 1) {
      if (e == 0) {
        addToCart();
      } else {
        buyNow();
      }
    } else {
      var tips = "";
      for (key in msg) tips += "“" + msg[key] + "”";
      toast("请选择" + tips + "！", "warning");
      return false;
    }
  }

  function addToCart() {//添加到购物车
    if (!page.sku.hasStock) {
      return false;
    }
    checkLogin(true, function () {
      // 登陆后加到购物车
      var qty = parseInt($("#buyQty").val()),  //购买数量
        skuQuantity = page.sku.skuId === 0 ? 0 : page.sku.skuQty(parseInt(page.sku.skuId)),  //商品库存
        goodsId = page.goodsId;  //商品id
      if (skuQuantity == 0 || qty > skuQuantity || page.sku.props == "") {

        toast("商品库存不足！", "warning");
      } else {
        if (page.logined) {
          getJson('/mbr/doAddToCart.do', {
            goodsId: goodsId,
            skuIdsList: page.sku.skuId,
            qty: qty
          }, function (data) {
            if (!data.success) {

              toast("请选择商品类型及型号！", "warning");
            } else {
              toast("添加到购物车成功！");
              fillCartNum();//再次填充购物车已选商品数量
            }
            $('.sku_selector_close').removeClass('btn_add_cart');
          });
        } else {
          // 未登录加到本地存储中
          if (!!window.localStorage) {
            var goodsItem = {
              qty: parseInt($("#buyQty").val()),  //购买数量
              id: page.goodsId,
              skuId: page.sku.skuId
            };

            if (local.get('localGoodsCart').length) {
              //之前存储过本地购物车
              var arr = local.get('localGoodsCart');
              //去重处理，相同商品数量相加
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == goodsItem.id && arr[i].skuId == goodsItem.skuId) {
                  goodsItem.qty += arr[i].qty * 1;
                  arr.splice(i, 1);
                  arr.push(goodsItem);
                }
              }
              local.set('localGoodsCart', arr)
            } else {
              //第一次存本地购物车
              local.set('localGoodsCart', [goodsItem])
            }
            toast("添加到购物车成功！");

          } else {
            // 不支持本地存储的浏览器，去登陆
            checkLogin(true);
          }
        }
      }
    });
  }

  function buyNow() {//立即购买
    if (!page.sku.hasStock) {
      toast("商品数量不足！", "warning");
      return false;
    }
    var qty = parseInt($("#buyQty").val()),  //购买数量
      stockQuantity = page.sku.skuId === 0 ? 0 : page.sku.skuQty(parseInt(page.sku.skuId));
    if (stockQuantity == 0 || qty > stockQuantity || page.sku.props == "") {
      toast("商品数量不足！", "warning");
    } else {
      toNewPage(vars.clientRoot + "/mbr/goods_order.html?skus=" + page.sku.skuId + ":" + qty);
    }
  }

  //添加购物车&立即购买触控
  $('#goodsViewInfo').on('click', '#addCart_sku', function () {
    checkSort(0);
  }).on('click', '#buyNow_sku', function () {
    checkSort(1);
  });

  function buyType(skuNumber) {
    if (skuNumber <= 0) {
      $('#buyNow_sku').addClass('hide');
      $('#addCart_sku').addClass('nosku');
      $('#addGoods_sku').removeClass('hide');
      page.sku.hasStock = false;
    } else {
      $('#buyNow_sku').removeClass('hide');
      $('#addCart_sku').removeClass('nosku');
      $('#addGoods_sku').addClass('hide');
      page.sku.hasStock = true;
    }
  }

//降价通知
  $('body').on('click', '.price_down', function () {
    checkLogin(true, function () {
      if (!page.sku.skuId) {
        toast('请先选择商品参数~');
        return false;
      }
      page.notesType = 0;
      $('.priceDownBox .showTitle').text('降价通知');
      $('.priceDownBox .showText').text('若商品降价，我们会通过邮件、短信等方式来通知您～');
      $('.priceDownBox .proPrice').removeClass('hide');
      $('.price_down_box').removeClass('hide');
    });
  });

  //到货通知
  $('body').on('click', '#addGoods_sku', function () {
    if (!page.sku.skuId) {
      toast('请先选择商品参数~');
      return false;
    }
    if (!page.sku.hasStock && $('.priceDownBox').hasClass('hide')) {
      page.notesType = 1;
      checkLogin(true, function () {
        getJson("/mbr/doLoadUserInfo.do", {}, function (data) {
          var tel = data.data.userInfo.mobile,
            email = data.data.userInfo.email;
          if (!tel || !email) {
            toast('请去个人中心进行手机和邮箱绑定', 'danger');
            return
          }
          if (data.success) {
            getJson('/ec/goods/doAddPriceReduceOrGoodsArriveNotice.do', {
              noticeType: page.notesType,       //降价通知0；到货通知1
              skuId: page.sku.skuId,
              goodsId: page.goodsId,
              currentPrice: 0,
              expectPrice: 0,
              mobilePhone: tel,
              email: email,
              remark: ''
            }, function (data) {
              if (data.success) {
                toast('到货后将通过手机或邮箱通知您');
                $('body').on('tap.again', '#noteMe,#note_sku', function () {
                  toast('请耐心等候');
                });
              } else {
                toast(data.errorMessage);
              }
            })
          }
        });
      });
    }
  }).on('click', '#closeBtn', function () {
    if (!$('.priceDownBox').hasClass('hide'))
      $('.priceDownBox').addClass('hide');
  }).on('click', '.show_ok', function () {
    var tel = $.trim($('.noteTel').val());
    var price = $.trim($('.notePrice').val());
    var priceReg = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;
    var email = $.trim($('.noteEmail').val());
    var telRegExp = /^1[34578]\d{9}$/;
    var emailRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var remark = $('.noteRemark').val();

    if (page.notesType === 0) {
      if (price === '') {
        toast('请输入期望价格', 'danger');
        return
      } else if (!priceReg.test(price)) {
        toast('请输入合法价格。(价格必须大于0，最多两位小数)', 'danger');
        return
      } else if (price > page.sku.tempPrice) {
        toast('期望价格必须小于当前价格', 'danger');
        return
      }
    }
    if (tel == '') {
      toast('请输入手机号', 'danger');
      return
    }
    if (!telRegExp.test(tel)) {
      toast('手机号码格式错误', 'danger');
      return
    }
    if (email && !emailRegExp.test(email)) {
      toast('邮箱地址格式错误', 'danger');
      return
    }
    getJson('/ec/goods/doAddPriceReduceOrGoodsArriveNotice.do', {
      noticeType: page.notesType,       //降价通知0；到货通知1
      skuId: page.sku.skuId,
      goodsId: page.goodsId,
      currentPrice: page.sku.tempPrice,
      expectPrice: price,
      mobilePhone: tel,
      email: email,
      remark: remark
    }, function (data) {
      if (data.success) {
        toast('请等待通知,将通过手机或邮箱告知');
        $('.priceDownBox').addClass('hide');
      } else {
        toast(data.errorMessage, 'error');
      }
    })

  });

  $('body').on('click', '.more_prama', function () {
    $('.goods_parameter_tabs').tabs('open', 1)
  });
  // 评论跳转
  $('.commentBtn').on('click', function () {
    var top = $('.comment_info').offset().top;
    $('html,body').stop(1).animate({scrollTop: top}, 300);
    return false
  });
  // 评论标签点击筛选事件
  $('.body').on('click', '.comment_tag', function () {
    page.tabCode = $(this).attr('data-id');
    page.sku.getCmtsList('all', 1);
  });

  // 店铺收藏
  $('.body').on('click', '.fav', function () {
    var $this = $(this);
    checkLogin(true, function () {
      if (page.shopInFav) {
        // 取消收藏
        getJson('/mbr/doRemoveShopFromFav.do', {
          ids: page.shopId
        }, function (res) {
          if (res.success) {
            toast('已取消店铺收藏');
            $this.text('收藏店铺');
            page.shopInFav = false;
          } else {
            toast(res.errorMessage);
          }
        })
      } else {
        // 收藏
        getJson('/mbr/doAddShopToFav.do', {
          shopId: page.shopId
        }, function (res) {
          if (res.success) {
            toast('收藏店铺成功~');
            $this.text('取消收藏');
            page.shopInFav = true;
          } else {
            toast(res.errorMessage);
          }
        })
      }
    });
  });


});
