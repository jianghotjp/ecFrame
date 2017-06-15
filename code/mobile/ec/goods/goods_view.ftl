<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>商品详情</title>
    <link rel="stylesheet" type="text/css" href="${vars.theme.root}/resources/css/mui.previewimage.css"/>
<#include "${vars.resourceFolder}/temp/htmlHead.ftl">
<!-- Live800默认功能代码: 开始-->
<#--<script language="javascript" src="http://chat56op.live800.com/live800/chatClient/monitor.js?jid=3620967126&companyID=768509&configID=104235&codeType=custom"></script>-->
<!-- Live800默认功能代码: 结束-->

</head>
<body class="goods_detail has_top has_bottom">
    <input id="moClient" value="${MO_CLIENT}" type="hidden"/>
    <#--header-->
    <header id="header" class="mui-bar goods_header fix">
        <div class="head_tit l pr">
            <a href="javascript:;" class="active">商品</a>
            <a href="javascript:;">详情</a>
            <a href="javascript:;">评价</a>
        </div>
        <a href="#" class="btn bg_sprites search_menu r"></a>
        <div class="header_menu">
            <a href="${vars.clientRoot}/mbr/user_msg_type_list.html" class="header_menu_item">
                <i class="bg_ico bg_ico14"></i>消息
            </a>
            <a href="${vars.clientRoot}/ec/goods/index.html" class="header_menu_item">
                <i class="bg_ico bg_ico15"></i>首页
            </a>
            <a href="javascript:;" class="header_menu_item hide">
                <i class="bg_ico bg_ico16"></i>分享
            </a>
        </div>
    </header>
    <#--footer-->
    <#include "${vars.resourceFolder}/temp/goodsFooter.ftl">
    <div class="mui-content">

        <div class="goods_content">
            <div id="" class=" mui-scroll-wrapper">
                <div class="mui-scroll">
                    <div id="goodsSlider" class="dataContent seize">
                    <#--商品轮播-->
                    </div>
                    <div id="goodsInfo" class="goods_cont dataContent goods_mation">
                    <#--商品名称、分享、价格、仓库位置、购买数量-->
                    </div>
                    <div id="fullCut">
                    <#--满减满赠-->
                        <#--<a href="" class="add_on">
                            <span class="add_on_icon">满减</span>
                            <span class="main_c">此商品满199减90 去凑单&gt;</span>
                        </a>-->
                    </div>
                    <div class="coupon_bar">
                        <div class="bg_ico bg_ico10 l">领取优惠券</div>
                        <button class="r">领取</button>
                    </div>
                    <div class="serve_bar after_dot">正品保证 ·全国联保 ·全国联保 ·全国联保</div>

                    <ul class="mui-table-view goods_cont goods_props" id="goodsProps">
                        <li class="mui-table-view-cell">
                            <a href="javascript:;" class=" mui-navigate-right after_dot">
                                <p class="_title" id="">产品参数</p>
                            </a>
                        </li>
                    </ul>
                    <div class=" goods_cont send_to sku_selector_btn after_dot" id="sendTo chooseSize">
                        <div class="fix">
                            <p class="l _title">配送至：</p>
                            <p class="_text l"><span id="userAddr" class="addr"></span>  <#--<span id="goodsStock" class="main_c"></span>--></p>
                        <#--<p id="freeShipping" class="_text"></p>-->

                            <p class="l" > <span id="skuChooseTit">选择产品参数</span><span id="skuChoosed" ></span></p>

                        </div>
                    </div>


                    <div id="comment" class="comment_wrap dataContent">
                    <#--商品评价-->
                    </div>

                    <#--店铺相关-->
                    <div id="shopInfo"></div>

                    <!-- 商品选项卡 -->
                    <div class="dataContent" id="goodsTab"></div>
                </div>
            </div>

        </div>

        <div class="goods_content">
            <div id="" class=" mui-scroll-wrapper bgf">
                <div class="mui-scroll">
                    <!-- 商品详情 -->
                    <div class="dataContent" id="goodsTab2"></div>
                </div>
            </div>
        </div>

        <div class="goods_content goods_comment">
            <div class="" id="commentTit">

            </div>
            <div id="pullrefresh" class=" mui-scroll-wrapper bgf">
                <div class="mui-scroll">
                    <div class="comment">
                        <div class="comment_list" id="container">

                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>
    <!-- 规格弹窗 -->
    <div class="sku_selector good_selector ">
        <p class="_title">
            规格
            <span class="mui-icon mui-icon-arrowdown"></span>
        </p>
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll selector_cont">
                <div class="">
                    <div class="goods_info fix">
                            <span class="_img">
                                <img id="goodsImg" src="${vars.theme.root}/resources/images/placeholder.png" alt=""></span>
                        <div class="l">
                            <p class="goods_price">
                                    <span id="goodsPrice" class="main_c">
                                        ¥
                                        <span></span>
                                    </span>
                                <i class="goods_stock" id="goods-info-sq"></i>
                            </p>
                            <p class="goods_choose">请选择规格</p>
                        </div>
                    </div>
                    <div id="skuList">
                        <#--<div class="selector_item">
                            <p class="selector_tit">规格：</p>
                            <p class="selector_box">
                                <span class="selector_attr active">200ml</span>
                            </p>
                        </div>-->
                    </div>
                    <div class="fix">
                        <div class="mui-numbox" data-numbox-min="1" data-numbox-max="100">
                            <button class="mui-btn mui-btn-numbox-minus" type="button" disabled="">－</button>
                            <input id="buyQty" class="mui-input-numbox" type="number">
                            <button class="mui-btn mui-btn-numbox-plus" type="button">＋</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a href="javascript:;" class="mui-btn sku_selector_close" id="addCart_sku">加入购物车</a>
        <a href="javascript:;" class="mui-btn sku_selector_close mainbg_c" id="buyNow_sku">立即购买</a>
        <a href="javascript:;" class="mui-btn sku_selector_close hide" id="note_sku">到货通知</a>
    </div>

    <!-- 优惠券弹窗 -->
    <div class="sku_selector coupon_selector" >
        <p class="_title">
            优惠券
            <span class="mui-icon mui-icon-arrowdown"></span>
        </p>
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll selector_cont" id="coupon">
                <p class="tc">登陆后查看优惠券</p>
            </div>
        </div>

        <a href="javascript:;" class="mui-btn sku_selector_close mainbg_c" >确定</a>
    </div>

    <!-- 产品参数弹窗 -->
    <div class="sku_selector props_selector" >
        <p class="_title">
            产品参数
            <span class="mui-icon mui-icon-arrowdown"></span>
        </p>
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll selector_cont" id="goodsPropsSel">

            </div>
        </div>

        <a href="javascript:;" class="mui-btn sku_selector_close mainbg_c" >确定</a>
    </div>
    <div class="price_down_box">
        <div class="show_box">
            <div class="show_hd fix">
                <h3 class="show_title l">降价通知</h3>
                <span class="r mui-icon mui-icon-closeempty close_btn"></span>
            </div>
            <div class="show_bd">
                <span class="show_text">若商品在90日内降价，我们会通过邮件、短信和手机客户端来通知您～</span>
                <dl class="fix pro_price">
                    <dt class="l">当商品低于：</dt>
                    <dd class="l"><input type="number" class="notePrice">时通知您</dd>
                </dl>
                <dl class="fix phone_number">
                    <dt class="l">手机号码：</dt>
                    <dd class="l"><input type="number" maxlength="11" class="noteTel"></dd>
                </dl>
                <dl class="fix email">
                    <dt class="l">邮箱地址：</dt>
                    <dd class="l"><input type="text" class="noteEmail"></dd>
                </dl>
                <dl class="fix email">
                    <dt class="l">说明：</dt>
                    <dd class="l"><input type="text" class="noteRemark"></dd>
                </dl>
                <button class="show_ok">确定</button>

            </div>
        </div>
    </div>


    <div class="mui-popup-backdrop sku_backdrop"></div>
    <#--顶部轮播模板-->
    <script id="topSlider" type="text/html">
        <div id="slider" class="mui-slider " >
            <div class="mui-slider-group">
                <%for(i = 0; i < xData.length; i++){%>
                    <div class="mui-slider-item">
                        <a href="#">
                            <img src="<%=#imgFormat(xData[i], '750x750.png',false)%>">
                        </a>
                    </div>
                <%}%>
            </div>
            <div class="mui-slider-indicator">
                <%for(i = 0; i < xData.length; i++){%>
                    <%if(i==0){%>
                        <div class="mui-indicator mui-active"></div>
                    <%}else{%>
                        <div class="mui-indicator"></div>
                    <%}%>
                <%}%>
            </div>
        </div>
    </script>
    <#--满减满赠-->
    <script id="fullCutTpl" type="text/html">
        <a href="<%=vars.clientRoot%>/ec/goods/put_together_goods_list.html?promoId=<%=goodsId%>&promoType=<%=xData.promoOrderType%>" class="add_on">
            <span class="add_on_icon"><%if(xData.promoType == 20000182){%>满减<%}else if(xData.promoType == 20000183){%>满赠<%}else if(xData.promoType == 20000184){%>包邮<%}else if(xData.promoType == 20000185){%>包税<%}%></span>
            <span class="main_c"><%=xData.name%> 去凑单&gt;</span>
        </a>
    </script>

    <#--促销-->
    <script id="cxTpl" type="text/html">
        <a href="<%=vars.clientRoot%><%if(xData.seckill){%>/ec/promo/sec_kill_goods_list.html<%} else{%>/ec/promo/time_limit_goods_list.html?id=<%=xData.id%><%}%>" class="add_on">
            <span class="add_on_icon"><%if(xData.seckill){%>秒杀<%} else{%>促销<%}%></span>
            <span class="main_c"><%=xData.name%>&gt;</span>
        </a>
    </script>
    <#--商品信息模板-->
    <script id="goodsMation" type="text/html">
        <div class="fix">
            <p class="goods_name l mui-ellipsis-2"><%=xData.name%></p>
            <#--隐藏商品分享按钮-->
            <#--<a href="" class="share r"><span class="bg_sprites share_icon"></span></a>-->
        </div>
        <div class="fix">
            <p class="goods_price l">&yen;
                <span>
                    <#--<%if(xData.minPrice == xData.maxPrice){%>-->
                        <%=moneyFormat(xData.minPrice)%>
                    <#--<%}else{%>-->
                        <#--<%=moneyFormat(xData.minPrice)%> - <%=moneyFormat(xData.maxPrice)%>-->
                    <#--<%}%>-->
                </span>
            </p>
            <div class="tag tag_icon ">新品上市</div>
            <%if(xData.isPickUpInStore){%>
                <div class="tag">支持自提</div>
            <%}%>

            <#--<p class="r _text"><%=xData.stSaleCnt%>人已购买</p>-->
            <#--<p class="tag r"><%=xData.shopName%></p>-->
        </div>
        <div class="fix">
            <%if(xData.originMinPrice != xData.minPrice){%>
                <p class="goods_price_old l">价格&yen;<span><%=moneyFormat(xData.originMinPrice)%></span></p>
            <%}%>
            <%if(typeof(dvlData) != 'object'){%>
                <p class="r dev_way">
                    <%for(var i=0;i<dvlData.fees.length;i++){%>
                    <%=dvlData.fees[i].deliveryTypeName%>
                    <%}%>
                </p>
            <%}%>

            <a href="javascript:;" class="saleNote db r">降价通知</a>
        </div>
    </script>
    <#--商品详情评价-->
    <script id="commentTpl" class="dataContent" type="text/html">
        <div class="goods_cont comment">
            <div class="fix">
                <p class="l _title title_comment">
                    商品评价
                    <%if(xData.allCount){%>
                        ( <%=xData.allCount%> )
                    <%}%>
                </p>

            </div>
            <div class="fix">
                <%for(i=0;i<xData.tabStatisticList.length;i++){%>
                    <%if(i%2 == 0){%>
                        <div class="comment_tag" data-id="<%=xData.tabStatisticList[i].codeId%>"><%=xData.tabStatisticList[i].codeName%></div>
                    <%}else{%>
                        <div class="comment_tag comment_tag_bad" data-id="<%=xData.tabStatisticList[i].codeId%>"><%=xData.tabStatisticList[i].codeName%></div>

                <%}%>
                <%}%>
                <#--<div class="comment_tag comment_tag_bad">质量不错</div>-->
            </div>
            <%for(var j = 0; j < xData.commentPagedList.rows.length && j < 1; j++){%>
                <div class="comment_info">
                    <p class="user_tit fix">
                        <span class="_img l"><img src="<%=#imgFormat(xData.commentPagedList.rows[j].mbrImgUrl,'46x46.png')%>" alt=""></span>
                        <span class="user_name "><%=xData.commentPagedList.rows[j].mbrNickName%></span>
                    </p>
                    <p class="_text mui-ellipsis-2"><%=xData.commentPagedList.rows[j].content%></p>
                    <p>
                        <span class="goods_size">规格：<%=xData.commentPagedList.rows[j].skuPropTextList%></span>
                    </p>
                </div>
            <%}%>
            <%if(xData.allCount){%>
                <#--<a href="<%=vars.clientRoot%>/ec/goods/goods_comment.html?id=<%=page.url.paras.id%>" class="all_comment">查看全部评价</a>-->
                <a href="javascript:;" class="all_comment">查看全部评价</a>
            <%}else{%>
                <p class="no_comment">暂无评价</p>
            <%}%>
        </div>
    </script>

    <#--商品详情-->
    <script id="goodsTabTpl" type="text/html">
        <#--<div class=" goods_tab">-->
            <#--<div class="mui-segmented-control mui-segmented-control-inverted">-->
                <#--<a class="mui-control-item mui-active" href="#item1">商品详情</a>-->
                <#--<a class="mui-control-item" href="#item2">商品参数</a>-->
            <#--</div>-->
            <#--&lt;#&ndash;<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-6"></div>&ndash;&gt;-->
            <#--<div class="">-->
                <#--<div id="item1" class=" mui-control-content mui-active">-->
                    <#--<%if(xData.goods.detail){%>-->
                        <#--<%=#xData.goods.detail%>-->
                    <#--<%}else{%>-->
                        <#--<p style="padding: .2rem;">暂无商品详情</p>-->
                    <#--<%}%>-->
                <#--</div>-->
                <#--<div id="item2" class=" mui-control-content">-->
                    <#--<ul class="mui-table-view">-->
                        <#--<%if(xData.props.length){%>-->
                            <#--<%for(i=0;i<xData.props.length;i++){%>-->
                            <#--<li class="mui-table-view-cell">-->
                                <#--<p class="mui-pull-left _title"><%=xData.props[i].name%></p>-->
                                <#--<p class="mui-pull-left _info">-->
                                    <#--<%for(j=0;j<xData.props[i].values.length;j++){%>-->
                                    <#--<span><%=xData.props[i].values[j].value%></span>-->
                                    <#--<%}%>-->
                                <#--</p>-->
                            <#--</li>-->
                            <#--<%}%>-->
                        <#--<%} else{%>-->
                            <#--<p style="padding: .2rem;">暂无商品参数</p>-->
                        <#--<%}%>-->

                    <#--</ul>-->

                <#--</div>-->
            <#--</div>-->
        <#--</div>-->
        <%if(xData.goods.detail){%>
            <%=#xData.goods.detail%>
        <%}else{%>
            <p style="padding: .2rem;">暂无商品详情</p>
        <%}%>
    </script>

    <#--优惠券弹出层-->
    <script id="couponTpl" type="text/html">
        <%for(i=0;i<xData.length;i++){%>
        <div class="acquire_item">
            <div class="acquire_info fix" data-id="<%=xData[i].batchNo%>">
                <div class="acquire_price l">&yen;<span><%=moneyFormat(xData[i].amount)%></span></div>
                <div class="l">
                    <p class="acquire_price_s">满<%=xData[i].orderMinAmount%>使用   <%if(xData[i].freeShipping){%>包邮<%}%></p>
                    <p class="acquire_date">有效期至：<%=dateFormat(xData[i].validTo,'yyyy-MM-dd')%></p>
                </div>
                <div class="line l"></div>
                <div class="r get_coupon">立即领取</div>

            </div>
        </div>
        <%}%>

    </script>

    <#--产品参数弹出层-->
    <script id="goodsPropsSelTpl" type="text/html">
        <ul class="mui-table-view">
        <%if(xData.props.length){%>
            <%for(i=0;i<xData.props.length;i++){%>
            <li class="mui-table-view-cell">
                <p class="mui-pull-left _title"><%=xData.props[i].name%></p>
                <p class="mui-pull-left _info">
                    <%for(j=0;j<xData.props[i].values.length;j++){%>
                    <span><%=xData.props[i].values[j].value%></span>
                    <%}%>
                </p>
            </li>
            <%}%>
        <%} else{%>
            <p style="padding: .2rem;">暂无商品参数</p>
        <%}%>
        </ul>

    </script>

    <#--店铺信息-->
    <script id="shopInfoTpl" type="text/html">
        <div class="shop_bar goods_cont" >

            <div class="fix">
                <div class="_img l">
                    <img src="<%=#imgFormat(xData.shop.logoUrl,'93x93.png')%>" alt="">
                </div>
                <div class="l">
                    <div class="shop_name"><%=xData.shop.name%></div>
                    <div class="shop_star stars">
                        <%for(var j=0;j<5;j++){%>
                            <%if(j<xData.shop.starLevel){%>
                            <span class="star bg_sprites"></span>
                            <%}else{%>
                                <span class="star_none bg_sprites"></span>
                            <%}%>
                        <%}%>
                        <#--<span class="star_half bg_sprites"></span>-->
                    </div>
                </div>
            </div>
            <div class="fix">
                <div class="shop_info">
                    <span class="num"><%=xData.shop.allGoodsCount%></span>
                    <span>全部宝贝</span>
                </div>
                <div class="shop_info">
                    <span class="num"><%=xData.shop.newGoodsCount%></span>
                    <span>上新</span>
                </div>
                <div class="shop_info">
                    <span class="num"><%=xData.shop.hotGoodsCount%></span>
                    <span>热销</span>
                </div>
            </div>
        </div>
        <div class="shop_btns fix">
            <a href="<%=vars.clientRoot%>/ec/shop/shop_cat.html?id=<%=shopId%>" class="shop_btn check_class"><i class="bg_sprites icon_1"></i>查看分类</a>
            <a href="<%=vars.clientRoot%>/ec/shop/shop.html?id=<%=shopId%>" class="shop_btn goto_shop"><i  class="bg_sprites icon_2"></i>进店逛逛</a>
        </div>

    </script>

    <#--评论头部-->
    <script id="commentTitleTpl" type="text/html">
        <div class="fix comment_tit">
            <div class="comment_tag" data-id="">全部</div>
            <%for(i=0;i<xData.tabStatisticList.length;i++){%>
            <div class="comment_tag" data-id="<%=xData.tabStatisticList[i].codeId%>"><%=xData.tabStatisticList[i].codeName%></div>
            <%}%>
        <#--<div class="comment_tag comment_tag_bad">质量不错</div>-->
        </div>

    </script>

    <#--评论模板-->
    <script id="commentListTpl" type="text/html">

        <div class="comment_info">
            <p class="user_tit fix">
                <span class="_img l"><img src="<%=#imgFormat(xData.mbrImgUrl,'46x46.png')%>" alt=""></span>
                <span class="user_name"><%=xData.mbrNickName%></span>
                <%for(var k = 1; k <= 5; k++){%>
                <%if(k <= xData.rank){%>
                <span class="bg_sprites star"></span>
                <%}else if(k > xData.rank){%>
                <span class="bg_sprites star_none"></span>
                <%}%>
                <%}%>
            </p>
            <p class="_text"><%=xData.content%></p>
            <div class="goods_comment_img fix">
                <%for(var j=0;j<xData.picUrls.length;j++){%>
                <div class="_img l">
                    <img data-lazyload="<%=#imgFormat(xData.picUrls[j],'200x200.png')%>">
                </div>
                <%}%>

            </div>
            <p>
                <span class="time"><%=dateFormat(xData.date,'yyyy-MM-dd')%></span>
                <span class="goods_size">规格：<%=xData.skuPropTextList%></span>
            </p>
        </div>
    </script>


    <#include "${vars.resourceFolder}/temp/scripts.ftl">
    <#include "${vars.resourceFolder}/temp/map.ftl"/>
    <!--页面单独js-->
    <script src="${vars.theme.root}/resources/js/module/mui/mui.previewimage.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
    <script src="${vars.theme.root}/resources/js/module/mui/mui.zoom.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
    <script src="${vars.theme.root}/resources/js/ec/goods/goods_view.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
    <#include "${vars.resourceFolder}/temp/appCommon.ftl">
</body>
</html>