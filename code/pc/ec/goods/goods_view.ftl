<!doctype html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <title>商品详情</title>
    <#include "${vars.resourceFolder}/temp/htmlHead.ftl">
    <link rel="stylesheet" href="${vars.theme.root}/resources/css/amazeui.magnifier.min.css?v=${ver}">
    <link rel="stylesheet" href="${vars.theme.root}/resources/css/zoomify.min.css">
</head>

<body class="sticky_footer">
<header class="header">
    <!-- 顶部登录条 start -->
<#include "${vars.resourceFolder}/temp/pageTop.ftl">
    <!-- 顶部登录条 end -->
    <!-- 搜索栏 start -->
<#include "${vars.resourceFolder}/temp/pageHeader.ftl">
    <!-- 搜索栏 end -->
    <!-- 导航栏 start -->
<#include "${vars.resourceFolder}/temp/topNav.ftl">
    <!-- 导航栏 end -->
</header>
<#--页面内容-->
<div class="body goods_view">
    <div class="wrap">
        <!-- 面包屑导航 start -->
        <div class="bread_nav crumb">
            <ol class="am-breadcrumb" id="bread">

            </ol>
        </div>

        <div class="fix goods_view_top">
            <div class="gallery l">
                <figure class="img_larger am-magnifier">
                    <img id="imgSmall" width="300px" height="300px" src="" alt="" data-am-magnify>
                    <div></div>
                    <div class="am-margin-left-sm">
                        <img id="imgLarger" width="900px" height="900px" src="" alt="">
                    </div>
                </figure>
                <div class="thumbListWrap">
                    <div data-am-widget="slider" class="am-slider am-slider-default am-slider-manual" data-am-slider='{&quot;animation&quot;:&quot;slide&quot;,&quot;animationLoop&quot;:false,&quot;itemWidth&quot;:60,&quot;itemMargin&quot;:13}'>
                        <ul class="am-slides dataContent" id="thumbList">
                        </ul>
                    </div>
                </div>

                <div class="share fix">
                    <span class="l">分享到&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <div class="bdsharebuttonbox l">
                        <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
                        <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
                        <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
                    </div>
                    <a href="javascript:;" class="l join_collection"><span class="am-icon-heart"></span> 收藏</a>
                </div>
            </div>

            <div class="goods_view_info l dataContent" id="goodsViewInfo">
            <#-- 商品基本信息容器 -->
            </div>

            <div class="r goods_shop_info" >
                <div class="shop_info" id="shopInfo">

                </div>

                <div class="rec_goods">
                    <div class="_tit ">热卖推荐</div>
                    <div class="rec_slider am-slider am-slider-default" id="recSlider">
                        <ul class="am-slides" id="hotListContainer">

                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!--降价通知弹窗-->
        <div class="price_down_box hide priceDownBox">
            <div class="show_box">
                <div class="show_hd fix">
                    <h3 class="show_title l showTitle">降价通知</h3>
                    <i id="closeBtn" class="r close_btn"></i>
                </div>
                <div class="show_bd">
                    <span class="show_text showText">若商品降价，我们会通过邮件、短信等方式来通知您～</span>
                    <div class="price_form">
                        <dl class="fix pro_price proPrice">
                            <dt class="l">当商品低于：</dt>
                            <dd class="l"><input type="text" class="notePrice">时通知您</dd>
                        </dl>
                        <dl class="fix phone_number">
                            <dt class="l">手机号码：</dt>
                            <dd class="l"><input type="text" class="noteTel"></dd>
                        </dl>
                        <dl class="fix email">
                            <dt class="l">邮箱地址：</dt>
                            <dd class="l"><input type="text" class="noteEmail"></dd>
                        </dl>
                        <dl class="fix email">
                            <dt class="l">说明：</dt>
                            <dd class="l"><input type="text" class="noteRemark"></dd>
                        </dl>
                        <dl class="fix">
                            <dt class="l"></dt>
                            <dd class="l">
                                <button class="show_ok">确定</button>
                            </dd>
                        </dl>

                    </div>
                </div>
            </div>
        </div>
        <!--降价通知弹窗 end-->
    </div>
    <div class="goods_view_bg">
        <div class="wrap fix">
            <!-- 猜你喜欢 start -->
            <div class="goods_shop_info r">
                <div class="rec_goods">
                    <div class="_tit">看了最终买</div>
                    <div class="rec_slider">
                        <ul class="dataContent" id="guessLikeListContainer">
                            <!-- 猜你喜欢列表循环 -->
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 商品参数  -->
            <div class="goods_parameter l">
                <div class="am-tabs goods_parameter_tabs" data-am-tabs="{noSwipe:1}">
                    <ul class="am-tabs-nav goods_parameter_nav fix" id="tab_control">
                        <li class="nav_item l">
                            <a href="#goods_parameter_tab_00">商品详情</a>
                        </li>
                        <li class="nav_item l">
                            <a href="#goods_parameter_tab_01">规格参数</a>
                        </li>
                        <li class="nav_item l commentBtn">
                            <a href="javascript:;">商品评价（<span class="commentCount"></span>）</a>
                        </li>
                    </ul>
                    <div class="am-tabs-bd am-tabs-bd-ofv goods_parameter_con oh" id="goodsTabConDroped">

                        <div class="am-tab-panel" id="goods_parameter_tab_00">
                            <div class="tab_panel_con goods_info_con dataContent" id="goodsInfoCon"></div>
                        </div>
                        <div class="am-tab-panel" id="goods_parameter_tab_01">
                            <div class="tab_panel_con goods_info_con dataContent" id="goodsPramaCon"></div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="server_img" id="serverImg">

            </div>

            <div class="comment_info" id="commentInfo">

            </div>

            <!-- 商品评价 -->
            <div class=" comment_tab" id="commentTab" >
                <ul class="goods_parameter_nav fix" id="">
                    <li class="nav_item l">
                        <a href="javascript:;" id="comment">商品评价（<span class="commentCount"></span>）</a>
                    </li>
                </ul>
                <div class="goods_parameter_con oh" id="">
                    <div class="goods_evaluation" id="comment_tab">
                        <ul class="dataContent" id="evaluationListContainer"></ul>
                        <div class="evalPagination" id="evalPagination">
                        <#--评价列表分页-->
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div>

<#--面包屑-->
<script id="breadTpl" type="text/html">
    <li class="breadHome">
        <a href="<%=vars.clientRoot%>/ec/goods/index.html">首页</a>
    </li>
    <%for(i=0;i <xData.length;i++){%>
    <li>
        <a href="<%=vars.clientRoot%>/ec/goods/goods_list.html?cat=<%=xData[i].id%>"><%=xData[i].text%></a>
    </li>
    <%}%>
    <li>
        <span class="main_c"><%=goodsName%></span>
    </li>
</script>
<#--商品缩略图列表模板-->
<script id="thumbListItemTpl" type="text/html">
    <li data-src="<%=#imgFormat(tmpUrl,'60x60.png',false,true)%>">
        <img src="<%=#imgFormat(tmpUrl,'60x60.png')%>" alt="">
    </li>
</script>
<#-- 商品基本信息模板 -->
<script id="goodsViewInfoTpl" type="text/html">
    <h3 class="goods_name"><%=goodsInfo.name%></h3>
    <div class="goods_price_bar fix" id="goodsPriceShow">

        <%if(goodsInfo.hasPromo){%>

            <div class="goods_price">
                <i class="_tit">促销价</i>
                <span>&yen;<i><%=#goodsInfo.minPrice%></i></span>
            </div>
            <div class="goods_price goods_price_old">
                <i class="_tit">原&nbsp;&nbsp;&nbsp;价</i>
                <span>&yen;<i><%=#goodsInfo.originMinPrice%></i></span>
                <b class="price_down">（降价通知）</b>
            </div>
        <%}else{%>
        <div class="goods_price">
            <i class="_tit">原&nbsp;&nbsp;&nbsp;价</i>
            <span>&yen;<i><%=#goodsInfo.minPrice%></i></span>
            <b class="price_down">（降价通知）</b>
        </div>
        <%}%>

        <div id="fullCut" class="fix">
        <#-- 活动链接 -->
            <%for(i=0;i<promo.length;i++){%>
                <p class="promo"><%=promo[i].name%></p>
            <%}%>
        </div>
    </div>
    <div class="line_box fix _line">

        <p class="_tit l">配送至</p>
        <p class="delivery_area l"></p>
        <%if(goodsInfo.isPickUpInStore){%>
            <span class="tag l pickUp">支持自提</span>
        <%}%>
        <p id="freeShipping" class="l fix"></p>
    </div>

    <div id="propsValuesList">
        <%for(var i=0;i<props.length;i++){%>
        <div class="_line fix propsValuesLine">
            <p class="_tit l" data-id="<%=props[i].id%>"><%=props[i].name%></p>
            <div class="_con l">

            </div>
        </div>
        <%}%>
    </div>
    <div class="_line pickNum fix">
        <p class="_tit l">数量</p>
        <div class="_con l">
            <div class="num_box fix" data-qty="<%=goodsInfo.stockQty%>">
                <a href="javascript:;" class="num_box_btn btn_minus am-icon-minus l"></a>
                <input class="num_box_ipt l" type="text" value="1" id="buyQty">
                <a href="javascript:;" class="num_box_btn btn_plus am-icon-plus l"></a>
            </div>
        </div>
        <div class="stock_num l">
            库存剩余&nbsp;<span class="skuNum"><%=goodsInfo.stockQty%></span>&nbsp;件
        </div>
    </div>
    <div class="_line service hide fix">
        <p class="_tit l">服务承诺</p>
        <div class="_con l">
            全国联保，送货入户，次日达
        </div>
    </div>

    <div class="btn_box fix">
        <%if(hasStock){%>
        <a id="buyNow_sku" class="_btn btn_buy l" href="javascript:;">立即购买</a>
        <a id="addCart_sku" class="_btn add_cart l" href="javascript:;">加入购物车</a>
        <a id="addGoods_sku" class="_btn add_goods l hide" href="javascript:;">到货通知</a>
        <%}else{%>
        <a id="buyNow_sku" class="_btn btn_buy l hide" href="javascript:;">立即购买</a>
        <a id="addCart_sku" class="_btn no_goods add_cart l nosku" href="javascript:;">加入购物车</a>
        <a id="addGoods_sku" class="_btn add_goods l" href="javascript:;">到货通知</a>
        <%}%>
    </div>
</script>

<#--店铺信息模板-->
<script id="shopInfoTpl" type="text/html">
    <div class="_tit shop_name"><%=xData.shop.name%></div>
    <div class="shop_class">
        店铺星级
        <div class="stars">
            <%for(var j=0;j<5;j++){%>
                <%if(j<xData.shop.starLevel){%>
                    <i class="star"></i>
                <%}else{%>
                    <i class="no_star"></i>
                <%}%>
            <%}%>
            <#--<i class="half_star"></i>-->
        </div>
    </div>
    <div class="_btns">
        <a href="<%=vars.clientRoot%>/ec/shop/shop.html?id=<%=xData.shop.id%>" class="_btn">进店逛逛</a>
        <%if(xData.shopInFav){%>
            <a href="javascript:;"  class="_btn fav">取消收藏</a>
        <%}else{%>
            <a href="javascript:;"  class="_btn fav">收藏店铺</a>
        <%}%>
    </div>
</script>

<#--热卖推荐模板-->
<script id="hotListItem" type="text/html">
    <%for(i=0;i<xData.length;i++){%>
        <li>
            <div class="goods_item">
                <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData[i].id%>">
                    <div class="img">
                        <img data-lazyload="<%=#imgFormat(xData[i].iconUrl,'150x150.png')%>" alt="">
                    </div>
                    <p class="goods_name"><%=xData[i].name%></p>
                    <p class="goods_price">&yen;  <%=xData[i].minPrice%></p>
                </a>
            </div>
        </li>
    <%}%>

</script>

<#--看了最终买模板-->
<script id="hotListBuyItem" type="text/html">

    <li>
        <div class="goods_item">
            <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData.id%>">
                <div class="img">
                    <img data-lazyload="<%=#imgFormat(xData.iconUrl,'150x150.png')%>" alt="">
                </div>
                <p class="goods_name"><%=xData.name%></p>
                <p class="goods_price">&yen;  <%=xData.minPrice%></p>
            </a>
        </div>
    </li>

</script>


<#--商品信息模板-->
<script id="goodsInfoConTpl" type="text/html">
    <div class="goods_info_inner">
        <div class="goods_props">
            <a href="javascript:;" class="more_prama">更多参数<span class="am-icon-chevron-circle-right"></span></a>
            <div class="_tit">商品名称：<span><%=xData.goods.name%></span></div>
            <div class="_tit">产品参数：</div>
            <div class="fix">
                <%for(var i=0;i<xData.props.length;i++){%>
                <div class="props_item l">
                    <%=xData.props[i].name%>:
                    <%for(var j=0;j<xData.props[i].values.length;j++){%>
                        <%=xData.props[i].values[j].value%>
                    <%}%>
                </div>
                <%}%>
            </div>
        </div>
        <div class="typeIn">
            <%=#xData.goods.detail%>
        </div>
    </div>
</script>
<#--商品参数模板-->
<script id="goodsPramaConTpl" type="text/html">
    <div class="goods_info_inner">
        <div class="goods_props">
            <div class="_tit">产品参数：</div>
            <div class="fix">
                <%for(var i=0;i<xData.props.length;i++){%>
                <div class="props_item l">
                    <%=xData.props[i].name%>:
                    <%for(var j=0;j<xData.props[i].values.length;j++){%>
                    <%=xData.props[i].values[j].value%>
                    <%}%>
                </div>
                <%}%>
            </div>
        </div>
    </div>
</script>

<#--满减满赠-->
<script id="fullCutTpl" type="text/html">
    <a href="<%=vars.clientRoot%>/ec/goods/put_together_goods_list.html?promoId=<%=promo.id%>&promoType=<%=promo.promoOrderType%>" class="promo_link">
        <%=promo.name%> 去凑单&gt;
    </a>
</script>

<#--促销-->
<script id="cxTpl" type="text/html">
    <a href="<%=vars.clientRoot%><%if(promo.seckill){%>/ec/promo/sec_kill_goods_list.html<%} else{%>/ec/promo/time_limit_goods_list.html?id=<%=promo.id%><%}%>"
       class="promo_link fix">
        <span class="promo_label"><%if(promo.seckill){%>秒杀<%} else{%>促销<%}%></span>
        <span class="main_c txt"><%=promo.name%>&gt;</span>
    </a>
</script>

<script id="commentInfoTpl" type="text/html">

    <div class="_tit">累计评价（<span class="commentCount"></span>）</div>
    <div class="fix star_class">
        <span class="l">好评度：</span>
        <div class="stars l">
        <%for(var i = 0; i < 100; i += 20){%>
            <%if(i< xData.goodRate){%>
                <i class="star"></i>
            <%}else{%>
                <i class="no_star"></i>
            <%}%>
        <%}%>
        </div>
    </div>
    <div class="fix">
        <%for(var i = 0; i < xData.tabStatisticList.length; i++){%>
            <%if(i%3 == 0){%>
                <span class="comment_tag comment_tag_bad" data-id="<%=xData.tabStatisticList[i].codeId%>"><%=xData.tabStatisticList[i].codeName%></span>
            <%}else{%>
                <span class="comment_tag" data-id="<%=xData.tabStatisticList[i].codeId%>"><%=xData.tabStatisticList[i].codeName%></span>
            <%}%>
        <%}%>
    </div>

</script>
<#--商品评价tab选项卡-商品评价模板-->

<#--商品评价tab选项卡-评论列表项模板-->
<script id="evaluationListItem" type="text/html">
    <li class="evaluation_item fix">
        <div class="item_info l">
            <div class="evaluation_con">
                <p><%=xData.content%></p>
            </div>
            <%if(xData.picUrls.length){%>
            <div class="evaluation_img fix" id="viewImg">
                <%for(var i=0;i<xData.picUrls.length;i++){%>
                <div class="img_item l">
                    <#--<img data-lazyload="<%=#imgFormat(xData.picUrls[i],'300x300.png')%>" alt="" class="viewImgimg">-->
                        <img src="/upload/<%=xData.picUrls[i]%>" alt="" class="viewImgimg">
                    <#--<img class="viewImgimg"  style="background-image: url(<%=xData.picUrls[i]%>);" src="">-->
                </div>
                <%}%>
            </div>
            <%}%>
            <p class="evaluation_date "><%=dateFormat(xData.date,'yyyy-MM-dd hh:ss')%></p>
        </div>
        <div class="evaluation_goods l">
            <p>商品属性：<%=xData.skuPropTextList%></p>
        </div>
        <div class="evaluation_person fix">
            <div class="user_head l">
                <img data-lazyload="<%=#imgFormat(xData.mbrImgUrl,'46x46.png')%>" alt="">
            </div>
            <div class="user_name l"><%=xData.mbrNickName%></div>
        </div>
    </li>
</script>

<script id="serverImgTpl" type="text/html">
    <a href="<%=vars.clientRoot%>/<%=xData.linkUrl%>">
        <img data-lazyload="<%=#imgFormat(xData.imgUrl,'1200x350.png')%>" alt="">
    </a>
</script>

<!-- footer start -->
<#include "${vars.resourceFolder}/temp/pageFooter.ftl">

<#include "${vars.resourceFolder}/temp/scripts.ftl">

<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/module/zoomify.min.js" ></script>
<script src="${vars.theme.root}/resources/js/location.js" ></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=l1nCuDjLYBOSV6ZRxEXfMQFN"></script>
<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/convertor.js"></script>

<script src="${vars.theme.root}/resources/js/module/amazeui.magnifier.min.js?v=${ver}" type="text/javascript"
        charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/ec/goods/goods_view.js?v=${ver}" type="text/javascript"
        charset="utf-8"></script>

</body>
</html>


