function pageInit(){
// page.debug=0;
  page.goodsId = page.url.get('id') ? page.url.get('id') :0;
  page.type ="all";
  // 评价标签
  page.tabCode='';
  //分享参数
  page.share = {};
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
  mui('#pullrefresh').pullRefresh().pullupLoading();


    //sku_selector滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //收藏状态
    page.isFav = 0;
    //立即购买 var sHref = vars.root + "/mbr/goods_order.html?skus=" + skuId + ":" + qty;
    //计入收藏 vars.root + "/mbr/doAddGoodsToFav.do",
    //加入购物车 vars.root + "/mbr/doAddToCart.do",
    /*sku相关*/
    page.sku = {
        /**
         * sku对应属性集合
         */
        props : [],
        /**
         * sku集合
         */
        skus : [],
        /**
         * 商品信息集合
         */
        goods : [],
        main_img : '',
        skuId : null,
        stockQuantity : 0,
        init: function(){
            //查询商品基本信息
            getJson('/ec/goods/doFindGoods.do', {
                goodsId: page.url.get('id')
            }, function (data) {
              if(!data.success){
                mui.toast(data.errorMessage);
                setTimeout(function(){
                  mui.back();
                },1000);
              }
                //保存分享需要的信息
                page.share = {
                    title: data.data.goods.name,
                    pic: window.location.origin + vars.uploadRoot+data.data.goods.picList.split(',')[0],
                    href:''
                };
                //分享
                //判断是否为微信
                if(window.navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1){
                    //判断是否登录
                    var curUrl = window.location.href;
                    getJson('/comm/login/doCheck.do', {
                        curUrl: curUrl
                    }, function (data) {
                        if(data.data.login){
                            // console.log(data);
                            page.share.href = page.url.url+'&parentDistibutor='+toUri(data.data.member.id);
                            wxShareToFriend(function(){//分享成功后的回调函数
                                //如果用户是登录状态，要增加分享记录
                                getJson("/mbr/doAddGoodsShare.do", {//点击分享后需要调用此方法（登录状态进行分享），计算加华豆用
                                });
                            },page.share.title,page.share.href,page.share.pic,"");

                            //分享到朋友圈
                            wxShareToCircle(function() {//分享成功后的回调函数
                                //如果用户是登录状态，要增加分享记录
                                getJson("/mbr/doAddGoodsShare.do", {//点击分享后需要调用此方法（登录状态进行分享），计算加华豆用
                                });
                            },page.share.title,page.share.href,page.share.pic);
                        }
                    });
                }

                //店铺id
                page.shopId = data.data.goods.shopId;

                //客服
                getJson("/common/consult.do", {
                    shopId: page.shopId,
                    custType:1
                },function(data){
                    if(!!data.data.consults&&data.data.consults.length>0){
                        $('.kefu').attr('href',data.data.consults[0].linkUrl);
                        $('body').append('<script language="javascript" type="text/javascript" src='+data.data.consults[0].funUrl+'></script>')
                    }
                });

                // 是否收藏
                page.isFav = data.data.isFav;
                if(page.isFav){
                    $('.foot_collect').addClass('has_fav');
                    $('.foot_collect .mui-tab-label').text('已收藏').addClass('main_c');
                }

                page.sku.main_img = data.data.goods.picList && data.data.goods.picList.length ? data.data.goods.picList.split(',')[0] : '';

                //商品组图
                var picArr = data.data.goods.picList && data.data.goods.picList.length ? data.data.goods.picList.split(',') : [];
                var pics = {
                    vars: vars,
                    xData: picArr
                };
                renderTmp('#goodsSlider', 'topSlider', pics);
                mui('#slider').slider({interval:2000});
                //商品名称、价格、仓位、购买人数、【分享按钮】
                var goods = data.data.goods ? data.data.goods : {};
                var baseInfo = {
                    vars: vars,
                    xData: goods,
                    dvlData:data.data.dlvTmpl.deliverympl ? data.data.dlvTmpl.deliverympl:{}
                };
                page.currentPrice=baseInfo.xData.minPrice;
                renderTmp('#goodsInfo', 'goodsMation', baseInfo);
                $('#sendTo').show();
                $('#chooseSize').show();
                /*满减满赠*/
                if(data.data.fullCutOrGiftsPromo){
                    var goodsId = data.data.fullCutOrGiftsPromo.id;
                    var fullCutOrGiftsPromo = {
                        vars: vars,
                        xData: data.data.fullCutOrGiftsPromo,
                        goodsId: goodsId
                    };
                    renderTmp('#fullCut', 'fullCutTpl', fullCutOrGiftsPromo);
                }else{
                    $('#fullCut').addClass('on');
                }
                // 促销
                if(data.data.platformPromo){
                    var platformPromo = {
                        vars: vars,
                        xData: data.data.platformPromo,
                    };
                    renderTmp('#fullCut', 'cxTpl', platformPromo);
                }else{
                    $('#fullCut').addClass('on');
                }

                var propData = {
                    vars: vars,
                    xData:data.data
                }
                renderTmp('#goodsTab', 'goodsTabTpl', propData);
                renderTmp('#goodsTab2', 'goodsTabTpl', propData);
                renderTmp('#goodsPropsSel', 'goodsPropsSelTpl', propData);

                mui('.goods_tab.mui-slider').slider({});
                $('.goods_tab').on('touchstart','.mui-slider-item',function(){
                    mui('.goods_tab').off('slide');
                    // mui('.goods_tab .mui-slider-item').off('drag');
                    // mui('.goods_tab .mui-slider-item').off('dragend');
                });
                $('#goodsTab img').each(function(){
                  $(this).attr({'data-preview-src':'','data-preview-group':11})
                });
                $('#goodsTab2 img').each(function(){
                  $(this).attr({'data-preview-src':'','data-preview-group':12})
                });
                mui.previewImage();




                /*商品sku加载*/
                page.sku.fill(data.data);
                page.sku.freeShipping(data);
                /*商品优惠券加载*/
                page.sku.addCoupon();

              //店铺信息
              getJson('/shop/doLoadShopInfo.do', {
                id: page.shopId
              }, function (data) {
                data = {
                  vars: vars,
                  page: page,
                  xData: data.data,
                  shopId:page.shopId
                };
                renderTmp('#shopInfo', 'shopInfoTpl', data);
              });


            });
        },
        /*包邮包税数据填充*/
        freeShipping: function(data){
            /*地址*/
            var userAddr = data.data.defaultAddress;
            if(userAddr){
                var provinceName = userAddr.provinceName ? userAddr.provinceName : '',
                    cityName = userAddr.cityName ? userAddr.cityName : '',
                    address = userAddr.address ? userAddr.address+',' : '';
                $('#userAddr').html(address);
            }else {
                //如果没有默认收货地址就定位当前城市
                var moClient = $('#moClient').val();
                jsLocation(moClient, function (city) {
                    $('#userAddr').html(city);
                });
            }
            var goodsStock = data.data.goods.stockQty;
            if(goodsStock > 0){
                $('#goodsStock').html('有货');
            }else {
                $('#goodsStock').html('暂时缺货');
            }
            var freeShipping = data.data.fullFreeShippingOrTaxPromoList;
            if(freeShipping){
                var freeShippingHtm = '';
                for(var i=0;i<freeShipping.length;i++){
                    // if(freeShipping[i].promoType == 20000184){
                    //     freeShippingHtm += '满 ￥' + moneyFormat(freeShipping[i].minAmount) +' 元包邮  ';
                    // }else if(freeShipping[i].promoType == 20000185){
                    //     freeShippingHtm += '满 ￥' + moneyFormat(freeShipping[i].minAmount) +' 元包税  ';
                    // }else{
                    //     console.log('数据有误');
                    // }
                    freeShippingHtm += freeShipping[i].name
                }
                $('#freeShipping').html(freeShippingHtm);
            }
            /*商品税率  --  无*/
            // var taxRate = data.data.taxRate ? data.data.taxRate : '' ;
            /*if(taxRate == -1){
                taxRate = '免税';
            }else if(taxRate.indexOf('~') != -1 ){
                taxRate_min = moneyFormat(taxRate.split('~')[0]*100,2)+'%';
                taxRate_max = moneyFormat(taxRate.split('~')[1]*100,2)+'%';
                taxRate = '参考税率：' + taxRate_min+'~'+taxRate_max;
            }else{
                taxRate = '参考税率：' +moneyFormat(taxRate*100,2) +'%';
            }

            $('#taxRate').html( taxRate);*/

        },
        fill:function(data){
            page.sku.props = data.props;
            page.sku.skus = data.skus;
            page.sku.goods = data.goods;
            var html_sort = "";
            var minPrice = page.sku.goods.minPrice;
            var maxPrice = page.sku.goods.maxPrice;
            var stockQty = page.sku.goods.stockQty;
            $("#goods-info-sq").text("（库存" + stockQty + "件）");
            if (minPrice) {
                $("#goodsPrice span").html(moneyFormat(minPrice));
                if (maxPrice && minPrice != maxPrice) {
                    $("#goodsPrice").append("- ¥ " + '<span>' + moneyFormat(maxPrice) + '</span>');
                }
            }
            //替换站位图
            $("#goodsImg").attr("src", vars.root + "/upload/" + page.sku.main_img+ '.185x185.png');

            for (var key in page.sku.props) {
                html_sort = html_sort + "<div class='selector_item'><p class='selector_tit' id='" + page.sku.props[key].id + "'>" + page.sku.props[key].name + "：</p><p class='selector_box'>";
                var psv = page.sku.props[key].values;
                for (var i in psv) {
                    if (page.sku.isExist(psv[i].id, page.sku.skus)) {
                        html_sort = html_sort + "<span id='skuId-" + psv[i].id + "' class='selector_attr' data-id='"+ psv[i].id +"'>" + psv[i].value + "</span>";
                    }
                }
                html_sort = html_sort + "</p></div>";
            }
            $("#skuList").append(html_sort);
            var goodsSku = page.sku.skus;
            if(goodsSku && goodsSku.length == 1){
                var skuIdList = goodsSku[0].propValueIds,
                    sortCheckView = "";
                for(var i=0; i<skuIdList.length; i++){
                    $('#skuId-' + skuIdList[i]).addClass('active');
                    sortCheckView += "“" + $('#skuId-' + skuIdList[i]).html() + "” ";
                }
                // $('#goodsImg').attr('src',goodsSku[0].picUrlList);
                if(goodsSku[0].iconUrl){
                    $('#goodsImg').attr('src',vars.root + "/upload/" + goodsSku[0].iconUrl+ '.185x185.png');
                }else{
                    $('#goodsImg').attr('src',vars.root + "/upload/" + page.sku.main_img+ '.185x185.png');
                }
                if(goodsSku[0].hasPromo){
                    $('#goodsPrice').html('￥' + goodsSku[0].promoPrice);
                }else{
                    $('#goodsPrice').html('￥' + goodsSku[0].price);
                }

                $('#goods-info-sq').html('(库存' + goodsSku[0].stockQuantity + '件）');
                page.sku.stockQuantity = goodsSku[0].stockQuantity;
                page.sku.skuId = goodsSku[0].id;
                if (sortCheckView != "") {
                  $('#skuChooseTit').text('已选：');
                  $("#skuChoosed").html(sortCheckView);
                }
              page.sku.note()
            }else{
              $('#noteMe').addClass('hide');
              $('#addCart').removeClass('hide');
              $('#buyNow').removeClass('hide');
              $('#note_sku').addClass('hide');
              $('#addCart_sku').removeClass('hide');
              $('#buyNow_sku').removeClass('hide');
            }
            page.sku.skuChoose();
        },
        isExist: function(id,skus){
            var result = false;
            $.each(skus, function (i, o) {
                var propValueIds = o.propValueIds;
                if ($.inArray(id, propValueIds) > -1) {
                    result = true;
                    return true;
                }
                var valueIds = [];
                valueIds = propValueIds.sort().join(",");
                this.valueIds = valueIds;
            });
            return result;
        },
        skuChoose: function(){
            mui("#skuList").on("tap", ".selector_attr", function () {//商品属性点击选择
                valueIds = [];
                var sortCheckView = "";
                $(this).addClass('active').siblings().removeClass('active');
                $("#skuList .selector_attr").each(function () {
                    if ($(this).hasClass("active")) {
                        var valueId = $(this).attr("id").split("-")[1];
                        valueIds.push(valueId);
                        sortCheckView += "“" + $(this).text() + "” ";
                    }
                });
              if(valueIds.length){
                page.sku.switchSku(valueIds.toString());
                if (sortCheckView != "") {
                  $('#skuChooseTit').text('已选');
                  $("#skuChoosed").html(sortCheckView);
                }
                page.sku.note()
              }else{
                $('#skuChooseTit').text('选择商品规格');
                $("#skuChoosed").html('');
              }
            });
        },
        /*匹配相应商品sku属性并替换*/
        switchSku: function (valueIds) {
            // 搜集选定属性valueId
            var valueIdValues = [],     // 按顺序填充，无空值
                selectedValueIds = [];  // 按索引填充
            $(".selector_item").each(function(idx) {
                var valueId = $(this).find(".active").attr("data-id");
                valueIdValues.push(valueId);
                selectedValueIds[idx] = valueId;
            });

            // 禁用不可能的组合
            // 按version/prop构建正则表达式，逐个测试sku，如果没有符合条件的sku则禁用prop
            $(".selector_item").each(function(idx, el) {
                $(this).find(".selector_attr").each(function() {
                    var skuEl = $(this);
                    if (skuEl.hasClass("active")) {
                        // 当前选定的元素不应该无对应的sku，在构建属性选择列表之前应该过滤掉无对应项目的prop
                    } else {
                        var propValueId = skuEl.attr("data-id");

                        // 构建当前prop的正则表达式
                        var valueSegs = [];
                        for (var i = 0; i < selectedValueIds.length; ++i) {
                            if (idx == i)
                                valueSegs.push(propValueId);
                            else if (selectedValueIds[i])
                                valueSegs.push(selectedValueIds[i]);
                        }
                        var reSegs = ["^"];
                        for (var i = 0, segs = valueSegs.sort(); i < segs.length; ++i) {
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
                        skuEl[skuFound ? "removeClass" : "addClass"]("mui-disabled");
                    }
                });
            });

            $.each(page.sku.skus, function () {//循环对比sku属性列表
                if (this.propValueIds.sort().toString() == valueIds.split(",").sort()) {
                    if(this.picUrlList){
                        $("#goodsImg").attr("src", vars.root + "/upload/" + this.iconUrl+ '.185x185.png');
                    }else{
                        $("#goodsImg").attr("src", vars.root + "/upload/" + page.sku.main_img + '.185x185.png');
                    }
                    if(this.hasPromo){
                        $("#goodsPrice").text("￥" + moneyFormat(this.promoPrice));
                        $('#goodsInfo .goods_price span').text(moneyFormat(this.promoPrice));
                    }else{
                        $("#goodsPrice").text("￥" + moneyFormat(this.price));
                        $('#goodsInfo .goods_price span').text(moneyFormat(this.price));
                    }
                    $("#goods-info-sq").text("（库存" + this.stockQuantity + "件）");
                    page.sku.stockQuantity = this.stockQuantity;
                    page.sku.skuId = this.id;
                    return false;
                } else {
                    $("#goodsImg").attr("src", vars.root + "/upload/" + page.sku.main_img+ '.185x185.png');
                    $("#goodsPrice").text("￥" + moneyFormat(0));
                    $("#goods-info-sq").text("库存" + 0 + "件");
                    page.sku.stockQuantity = 0;
                    page.sku.skuId = "";
                    return true;
                }
            });

            page.sku.resetMaxNum(page.sku.stockQuantity);
        },
        resetMaxNum: function (MaxNum) {
            var numbox = mui(".mui-numbox").numbox();
            if (numbox) {
                numbox.setOption("max", MaxNum);
                if (MaxNum <= 0) {
                    numbox.setOption("min", MaxNum);
                    $(".mui-numbox .mui-input-numbox").val(MaxNum)
                } else if (MaxNum <= $(".mui-numbox .mui-input-numbox").val()) {
                    $(".mui-numbox .mui-input-numbox").val(MaxNum);
                    numbox.setOption("min", 1);
                } else {
                    numbox.setOption("min", 1);
                    $(".mui-numbox button").removeAttr("disabled");
                    if ($(".mui-numbox .mui-input-numbox").val() == 0) {
                        $(".mui-numbox .mui-input-numbox").val(1);
                    }
                }
            }
        },
        addCoupon:function(){
          checkLogin(function(){
            getJson('/mbr/doFindShopCoupons.do', {
              id:page.shopId
            }, function (data) {
              if(data.data.length){
                data = {
                  vars: vars,
                  page: page,
                  xData: data.data
                };
                $('#coupon').html('');
                renderTmp('#coupon', 'couponTpl', data);
              }else{
                $('.coupon_bar').hide();
              }

            });
          });

        },
        //到货通知
        note:function(){
            if(page.sku.stockQuantity === 0){

              $('#noteMe').removeClass('hide');
              $('#addCart').addClass('hide');
              $('#buyNow').addClass('hide');

              $('#note_sku').removeClass('hide');
              $('#addCart_sku').addClass('hide');
              $('#buyNow_sku').addClass('hide');
            }else{
              $('#noteMe').addClass('hide');
              $('#addCart').removeClass('hide');
              $('#buyNow').removeClass('hide');

              $('#note_sku').addClass('hide');
              $('#addCart_sku').removeClass('hide');
              $('#buyNow_sku').removeClass('hide');
            }
          }

    };
    page.sku.init();

    //查询评价，好评率+1条评价信息
    getJson('/ec/goods/doSearchComments.do', {
        goodsId: page.url.get('id'),
        type: 'all',//all：全部评价，high：好评，medium：中评，low：差评，img：有图
        page: 1,
        pageSize: 3
    }, function (data) {
        data = {
            vars: vars,
            page: page,
            xData: data.data
        };
        renderTmp('#comment', 'commentTpl', data);
        renderTmp('#commentTit', 'commentTitleTpl', data);


    });

    //加入购物车
    mui('.goods_detail').on('tap','#addCart',function(){
        checkSort(0);
    });
    mui('.goods_detail').on('tap','#addCart_sku',function(){
        checkSort(0);
    });
    //立即购买
    mui('.goods_detail').on('tap','#buyNow',function(){
        checkSort(1);
    });
    mui('.goods_detail').on('tap','#buyNow_sku',function(){
        checkSort(1);
    });

    function checkSort(e){   //检查是否选中sku属性
        checkLogin(true,function(){
            var msg = [];
            $("#skuList").find(".selector_item").each(function () {
                if ($(this).find(".selector_attr").hasClass("active")) {
                } else {
                    msg.push($(this).text());
                }
            });

            if (msg.length < 1) {
                if(e == 0){
                    addToCart();
                }else {
                    buyNow();
                }
            } else {
                mui.alert("请选择规格",function(){
                    $('.sku_backdrop').addClass('mui-active');  //显示遮罩
                    $('.good_selector').addClass('cur');  //sku_selector出场动画
                    $('.goods_detail').addClass('oh');  //sku_selector弹出后禁止页面滚动
                });

                return false;
            }
        });

    }
    function addToCart() {//添加到购物车
        var qty = parseInt($("#buyQty").val()),  //购买数量
            stockQuantity = page.sku.stockQuantity,  //商品库存
            goodsId = parseInt(page.url.get('id'));  //商品id
        if (stockQuantity == 0 || qty > stockQuantity || page.sku.props == "") {
            mui.alert("商品数量不足");
        } else {
            getJson('/mbr/doAddToCart.do', {
                skuIdsList: page.sku.skuId,
                qty: qty
             }, function (data) {
                 // console.log('加入购物车返回的数据-' + data);
                if (data.success == false) {
                // if (!data.data.success  || !data.success) {
                    mui.toast(data.errorMessage);
                    // console.log(data.data.errorMessage);
                } else {
                    // var btnArray = ['否', '是'];
                    // mui.confirm('添加成功，是否跳转到购物车？', '', btnArray, function(e) {
                    //     if (e.index == 1) {
                    //         toNewPage(vars.clientRoot+ '/mbr/goods_cart.html');
                    //     }
                    // })
                    mui.toast('添加成功~')
                }
                $('.sku_selector_close').removeClass('btn_add_cart');
             });
        }

    }
    function buyNow() {//立即购买
        var qty = parseInt($("#buyQty").val()),  //购买数量
            stockQuantity = page.sku.stockQuantity,
            goodsId = parseInt(page.url.get('id'));  //商品库存
        if (stockQuantity == 0 || qty > stockQuantity || page.sku.props == "") {
            mui.alert("商品数量不足");
        } else {
            toNewPage(vars.clientRoot+ "/mbr/goods_order.html?skus=" + page.sku.skuId + ":" + qty);
            $('.sku_selector_close').removeClass('btn_buy_now');
        }

    }

    //查询猜你喜欢,按销量查询12个，一组4个，可轮播
    // getJson('/ec/goods/doFindSameCatGoodsList.do', {
    //     goodsId: page.url.get('id'),
    //     limit:12
    // }, function (data) {
    //     if(!data.data.length){
    //         return;
    //     }
    //     data = {
    //         vars: vars,
    //         xData: data.data
    //     };
    //     renderTmp('#guess', 'guessTpl', data, function (el, html) {
    //         el.innerHTML += html;
    //         el.className += ' show';
    //         mui('#guessSlider').slider();
    //         lazyLoad.refresh(true);
    //     });
    // });

    //单图广告
    //getWidgetData("移动-商品详情广告图", function (data) {
    //    data = {
    //        vars: vars,
    //        xData: data.data.widgetData
    //    };
    //    renderTmp('#ads','adsTpl',data,function(el,html){
    //        el.innerHTML += html;
    //        el.className += ' show';
    //        lazyLoad.refresh(true);
    //    })
    //});

    /*规格弹窗弹出*/
    mui('.goods_detail').on('tap','.sku_selector_btn',function(){
        $('.sku_backdrop').addClass('mui-active');  //显示遮罩
        $('.good_selector').addClass('cur');  //sku_selector出场动画
        //$('.goods_detail').addClass('oh');  //sku_selector弹出后禁止页面滚动
    });

    mui('.goods_detail').on('touchmove','.sku_backdrop',function () {
        return false;
    });
    mui('.sku_selector ').on('touchmove','.sku_selector ._title',function () {
        return false;
    });
    mui('.sku_selector ').on('touchmove','.sku_selector a',function () {
        return false;
    });
    // $('.sku_selector').on('touchmove',function () {
    //     return false;
    // });


    /*规格弹窗关闭*/
    mui('.goods_detail').on('tap','.sku_selector_close,.sku_selector ._title .mui-icon,.sku_backdrop',function(){
        $('.sku_backdrop').removeClass('mui-active');//显示遮罩
        $('.sku_selector').removeClass('cur');
        //$('.goods_detail').removeClass('oh');
    });

    // 优惠券
    mui('.goods_detail').on('tap','.coupon_bar',function(){
        $('.sku_backdrop').addClass('mui-active');  //显示遮罩
        $('.coupon_selector').addClass('cur');  //sku_selector出场动画
    });

    // 产品参数
    mui('.goods_detail').on('tap','.goods_props',function(){
        $('.sku_backdrop').addClass('mui-active');  //显示遮罩
        $('.props_selector').addClass('cur');  //sku_selector出场动画
    });

    // 购物车数量
    // checkLogin(function(){
    //     if(page.logined){
    //         getJson("/mbr/doSelCartSize.do",{},function(data){
    //             // console.log(data);
    //             if(data.data.cartSize){
    //                 $('.footer_row .mui-badge').text(data.data.cartSize)
    //                 $('.footer_row .mui-badge').show();
    //             }
    //         });
    //     }
    // });

    //浏览次数
    // getJson("/ec/goods/doChangeViewTimes.do",{goodsId:page.goodsId},function(data){
    //     // console.log(data)
    // });

    //加入收藏，先判断是否已经登录，如果没有登录，需要跳转到登录页面
    //addfav 加入收藏
    $('nav').on('tap','.foot_collect',addFav);
    function addFav(){
        checkLogin(true,function(){
            if(page.isFav){
                //  取消收藏
                getJson("/mbr/doRemoveGoodsFromFav.do",{
                    ids: page.url.get('id')
                },function(data){
                    if(data.success == true){
                        $('.foot_collect').removeClass('has_fav');
                        $('.foot_collect .mui-tab-label').text('收藏').removeClass('main_c');
                        mui.toast('已取消收藏');
                        page.isFav = false;
                    }
                });
            }else{
                //添加收藏
                getJson("/mbr/doAddGoodsToFav.do",{
                    id: page.url.get('id')
                },function(data){
                    if(data.success == true){
                        $('.foot_collect').addClass('has_fav');
                        $('.foot_collect .mui-tab-label').text('已收藏').addClass('main_c');
                        mui.toast('商品收藏成功~');
                        page.isFav = true;
                    }
                });
            }

        })
    }

    // 底部店铺调转
    $('body').on('tap','.foot_shop',function(){
        toNewPage(vars.clientRoot+'/ec/shop/shop.html?id='+page.shopId);
    });


  // tab切换
  $('.head_tit').on('tap','a',function(){

        $(this).addClass('active').siblings().removeClass('active');
        // mui('#scrollWrapper').scroll().scrollTo(0,0,100);
        var i = $(this).index();
        $('.goods_content').hide().eq(i).show();
        if($(this).index() == 2){
          var h = $('#commentTit').outerHeight()+$('#header').outerHeight();
          $('.goods_comment .mui-scroll-wrapper').css('top',h);
        }


    }).find('a:eq(0)').trigger('tap');

    // 详情页评价标签点击事件
  $('.mui-content').on('tap','.comment_tag',function(){
    page.tabCode = $(this).attr('data-id');
    page.page=0;
    $('#container').html('');
    reloadPull();
    $('.head_tit').find('a:eq(2)').trigger('tap')
  });

// 查看全部评价
  $('.mui-content').on('tap','.all_comment',function(){
    $('.head_tit').find('a:eq(2)').trigger('tap')
  });

  /**
   * 评价页面上拉加载
   */
  function pullupRefresh() {
    getJson("/ec/goods/doSearchComments.do", {
      goodsId: page.goodsId,
      type:page.type,
      page: ++page.page,
      pageSize: page.pageSize,
      tabCode:page.tabCode
    }, function (data) {

      var pageCount = data.data.commentPagedList.pageCount,
        rows = data.data.commentPagedList.rows;
      mui('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。
      for (var i = 0; i < rows.length; i++) {
        var itemData = {
          vars: vars,
          xData: data.data.commentPagedList.rows[i]
        };
        renderTmp('#container', 'commentListTpl', itemData);
      }
      lazyLoad.refresh(true);
    });
  }

  // 店铺商品列表跳转

  $('.mui-content').on('tap','.shop_info',function(){
    var i = $(this).index()+1;
    toNewPage(vars.clientRoot+'/ec/shop/shop.html?id='+page.shopId+'&menu='+i);
  });

  //降价通知
  mui('.goods_detail').on('tap','.close_btn,.sku_backdrop',function(){
    $('.sku_backdrop').removeClass('mui-active');//显示遮罩
    $('.price_down_box').hide();
    $('.sku_selector').show();
  });

  $('.mui-content').on('tap','.saleNote',function(){
    page.notesType = 0;
    $('.sku_selector').hide();
    checkLogin(true,function(){
      if(!page.sku.skuId){
        mui.toast('请先选择商品参数~');
        $('.sku_backdrop').addClass('mui-active');  //显示遮罩
        $('.good_selector').addClass('cur');  //sku_selector出场动画
        return
      }
      $('.price_down_box').show();
      $('.sku_backdrop').addClass('mui-active');  //显示遮罩
    });
  });

  //领取购物券

  $('body').on('tap','.get_coupon',function () {
      var couponId=$(this).closest('.acquire_info').data('id');
      if(couponId!=''){
          getJson('/mbr/doAcquire.do',{
              batch:couponId
          },function (res) {
              if(res.success){
                  mui.toast('优惠券领取成功,快去使用吧~');
              }else{
                  mui.toast(res.errorMessage)
              }
          })
      }
  });

  //降价通知
  $('body').on('tap','.show_ok',function(){
    var tel = $.trim($('.noteTel').val());
    var price = $.trim($('.notePrice').val()) ;
    var email = $.trim($('.noteEmail').val());
    var telRegExp = /^1[34578]\d{9}$/;
    var emailRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var currentPrice = page.currentPrice;
    var remark = $('.noteRemark').val();
    if( !price ){
      mui.toast('请输入期望价格');
      return
    }
    if(tel == ''){
      mui.toast('请输入手机号');
      return
    }

    if(price >= currentPrice){
      mui.toast('期望价格必须小于当前价格');
      return
    }
    if(!telRegExp.test(tel)){
      mui.toast('手机号码格式错误');
      return
    }
    if(!email){
      mui.toast('请输入邮箱地址');
      return
    }
    if(!emailRegExp.test(email)){
      mui.toast('邮箱地址格式错误');
      return
    }
    getJson('/ec/goods/doAddPriceReduceOrGoodsArriveNotice.do', {
      noticeType:page.notesType,      //降价通知0；到货通知1
      skuId: page.sku.skuId,
      goodsId:page.goodsId,
      currentPrice:currentPrice,
      expectPrice: price,
      mobilePhone:tel,
      email:email,
      remark:remark
    },function(data){
      if(data.success){
        mui.toast('请等待通知');
        $('.price_down_box').hide();
        $('.sku_backdrop').removeClass('mui-active');  //显示遮罩
        $('.sku_selector').show();
      }
    })
  });

  //到货通知
  $('body').one('tap','#noteMe,#note_sku',function(){
    page.notesType = 1;
    checkLogin(true,function(){
      getJson("/mbr/doLoadUserInfo.do",{},function(data){
        var tel = data.data.userInfo.mobile,
          email = data.data.userInfo.email;
        if(!tel || !email){
          mui.alert('请去个人中心进行手机和邮箱绑定');
          return
        }
        if(data.success){
          getJson('/ec/goods/doAddPriceReduceOrGoodsArriveNotice.do', {
            noticeType:page.notesType,       //降价通知0；到货通知1
            skuId: page.sku.skuId,
            goodsId:page.goodsId,
            currentPrice:0,
            expectPrice: 0,
            mobilePhone:tel,
            email:email,
            remark:''
          },function(data){
            if(data.success){
              mui.toast('到货后将通过手机和邮箱通知您');
              $('body').on('tap.again','#noteMe,#note_sku',function(){
                mui.toast('请耐心等候');
              });
            }else{
              mui.toast(data.errorMessage);
            }
          })
        }
      });
    });


  });

}