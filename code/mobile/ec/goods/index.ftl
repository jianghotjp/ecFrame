<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=u2T74cg1hKPz4odCLLAWiVE05QgO8gZ2"></script>
    <#include "${vars.resourceFolder}/temp/htmlHead.ftl">
    <link href="${vars.theme.root}/resources/css/mui.picker.css" rel="stylesheet"/>
    <link href="${vars.theme.root}/resources/css/mui.poppicker.css" rel="stylesheet"/>

</head>
<body class="index has_bottom">
<input id="moClient" value="mobile" type="hidden"/>
<!-- 搜索条 -->
<header id="header" class="mui-bar-transparent top_nav fix">
    <a id="locationAddress" href="javascript:;" class="btn btn_scan bg_sprites l ">

    </a>
    <div class="search_box pr bg_sprites l">
        <input class="search_ipt l" type="text" value="" placeholder="搜索商品名称 关键词" readonly/>
    </div>
    <a href="${vars.clientRoot}/mbr/user_msg_type_list.html" class="btn btn_message bg_sprites r"></a>
</header>

<#include "${vars.resourceFolder}/temp/pageFooter.ftl">
<#include "${vars.resourceFolder}/temp/slideBar.ftl">

<div class="mui-content"></div>

<#-- 轮播 -->
<script id="sliderTpl" type="text/html">
    <div id="slider" class="mui-slider">
        <div class="mui-slider-group mui-slider-loop">
            <%for(i = 0; i < xData.length; i++){%>
                <%if(i == 0){%>
                <div class="mui-slider-item mui-slider-item-duplicate">
                    <a href="<%=vars.clientRoot%><%=xData[xData.length - 1].linkUrl%>">
                        <img data-lazyload="<%=#imgFormat(xData[xData.length - 1].imgUrl, '750x465.png',false)%>">
                    </a>
                </div>
                <%}%>
                <div class="mui-slider-item">
                    <a href="<%=vars.clientRoot%><%=xData[i].linkUrl%>">
                        <img data-lazyload="<%=#imgFormat(xData[i].imgUrl, '750x465.png',false)%>">
                    </a>
                </div>
                <%if(i == xData.length-1){%>
                <div class="mui-slider-item mui-slider-item-duplicate">
                    <a href="<%=vars.clientRoot%><%=xData[0].linkUrl%>">
                        <img data-lazyload="<%=#imgFormat(xData[0].imgUrl, '750x465.png',false)%>">
                    </a>
                </div>
                <%}%>
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
<#-- 轮播广告 -->
<script id="adSlider" type="text/html">
    <div class="ad_slider mui-slider ">
        <div class="mui-slider-group mui-slider-loop">
            <%for(i = 0; i < xData.length; i++){%>
            <%if(i == 0){%>
            <div class="mui-slider-item mui-slider-item-duplicate">
                <a href="<%=vars.clientRoot%>/<%=xData[xData.length - 1].linkUrl%>">
                    <img data-lazyload="<%=#imgFormat(xData[xData.length - 1].imgUrl, '750x465.png',false)%>">
                </a>
            </div>
            <%}%>
            <div class="mui-slider-item">
                <a href="<%=vars.clientRoot%>/<%=xData[i].linkUrl%>">
                    <img data-lazyload="<%=#imgFormat(xData[i].imgUrl, '750x465.png',false)%>">
                </a>
            </div>
            <%if(i == xData.length-1){%>
            <div class="mui-slider-item mui-slider-item-duplicate">
                <a href="<%=vars.clientRoot%>/<%=xData[0].linkUrl%>">
                    <img data-lazyload="<%=#imgFormat(xData[0].imgUrl, '750x465.png',false)%>">
                </a>
            </div>
            <%}%>
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
<#-- 单图广告位 -->
<script id="adTpl" type="text/html">
    <a href="<%=vars.clientRoot%>/<%=xData.linkUrl%>" class="advertising">
        <img class="advertising" data-lazyload="<%=#imgFormat(xData.imgUrl, '750x198.png',false)%>">
    </a>
</script>
<#-- 1大+4小广告位-->
<script id="adsClassTpl" type="text/html">
    <a href="<%=vars.clientRoot%><%=xData.linkUrl%>" class="advertising">
        <img data-lazyload="<%=#imgFormat(xData.imgUrl, '750x325.png',false)%>">
    </a>
    <div class="classify fix">
        <%for(i = 0; i < xData.adList.length; i++){%>
        <div class="classify_item">
            <a href="<%=vars.clientRoot%><%=xData.adList[i].linkUrl%>">
                <img data-lazyload="<%=#imgFormat(xData.adList[i].imgUrl, '187x270.png')%>">
            </a>
        </div>
        <%}%>
    </div>
</script>
<#-- 导航 -->
<script id="navTpl" type="text/html">
    <#--
    bg_ico1
    bg_ico2
    bg_ico3
    bg_ico4
    bg_ico5
    -->
    <div class="index_menu fix">
        <%for(i = 0; i < xData.length; i++){%>
        <a href="<%=vars.clientRoot%><%=xData[i].linkUrl%>" class="menu_btn l">
            <p class="jdb-icon pr <%=xData[i].iconClass%>"></p>
            <p class="btn_text"><%=xData[i].title%></p>
        </a>
        <%}%>
    </div>

    <div class="new_slider_wrap">

        <div class="new_slider fix">
            <div class="bg_ico bg_ico6 l"></div>
            <div class="l header_news">
                <ul id="newsSlider">
                </ul>
            </div>
        </div>
    </div>

</script>
<#-- 头条 -->
<script id="newsTpl" type="text/html">

    <li class="fix">
        <a class="db" href="<%=vars.clientRoot%>/ec/article/article_view.html?id=<%=xData.articleId%>">
            <#--<span class="badge l"><%=xData.articleTitle%></span>-->
            <span class="badge l">公告</span>
            <span class="tit mui-ellipsis l"><%=#xData.articleTitle%></span>
        </a>
    </li>

</script>

<#-- 不规则图片广告位 -->
<script id="specAdsTpl" type="text/html">
    <div class="top_rec fix">
        <div class="l rec_left">
            <a href="<%=vars.clientRoot%>/<%=xData.leftLinkUrl%>">
                <img data-lazyload="<%=#imgFormat(xData.leftImgUrl, '324x445.png',false)%>">
            </a>
        </div>
        <div class="r rec_right">
            <div class="rec_right_top fix">
                <a href="<%=vars.clientRoot%>/<%=xData.rightTLinkUrl%>">
                    <img data-lazyload="<%=#imgFormat(xData.rightTImgUrl, '423x200.png',false)%>">
                </a>
            </div>
            <div class="fix">
                <div class="rec_right_btm l">
                    <a href="<%=vars.clientRoot%>/<%=xData.rightBLLinkUrl%>">
                        <img data-lazyload="<%=#imgFormat(xData.rightBLImgUrl, '210x240.png',false)%>">
                    </a>
                </div>
                <div class="rec_right_btm r">
                    <a href="<%=vars.clientRoot%>/<%=xData.rightBRLinkUrl%>">
                        <img data-lazyload="<%=#imgFormat(xData.rightBRImgUrl, '210x240.png',false)%>">
                    </a>
                </div>
            </div>
        </div>
    </div>
</script>

<#-- 热门品牌模板 -->
<script id="brandTpl" type="text/html">
    <div class="floor floor_brand">
        <div class="floor_tit">
            <img data-lazyload="<%=#imgFormat(xData.imgUrl,'750x90.png')%>">
        </div>
        <div class="brand_list fix">
            <%for(i = 0; i < xData.brandList.length; i++){%>
            <div class="brand_item">
                <a href="<%=vars.clientRoot%>/ec/brand/brand_index.html?id=<%=xData.brandList[i].id%>">
                    <img data-lazyload="<%=#imgFormat(xData.brandList[i].logoUrl,'187x97.png')%>"/>
                </a>
            </div>
            <%}%>
        </div>
    </div>
</script>
<#-- 商品楼层 -->
<script id="floorTpl" type="text/html">
    <div class="floor">
        <div class="floor_tit">
            <img data-lazyload="<%=#imgFormat(xData.imgUrl,'750x90.png')%>">
        </div>
        <%for(i = 0; i < xData.goodsList.length; i++){%>
        <a class="floor_item" href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData.goodsList[i].goodsId%>">
            <div class="fix">
                <div class="_img">
                    <img data-lazyload="<%=#imgFormat(xData.goodsList[i].iconUrl,'210x210.png')%>">
                    <#--角标-->
                    <%if(xData.goodsList[i].cornerText){%>
                        <%if(xData.goodsList[i].cornerBgColor == '#fff'){%>
                            <div class="badge" style="background-color: <%=xData.goodsList[i].cornerBgColor%> ;color:#333;"><%=xData.goodsList[i].cornerText%></div>
                        <%}else{%>
                            <div class="badge" style="background-color: <%=xData.goodsList[i].cornerBgColor%>"><%=xData.goodsList[i].cornerText%></div>
                        <%}%>
                    <%}%>
                </div>
                <div class="r goods_info pr">
                    <p class="goods_name goods_name_2"><%=xData.goodsList[i].name%></p>
                    <p class="goods_remark el"><%=xData.goodsList[i].goodsAdText%></p>
                    <p class="shop_name"><%=xData.goodsList[i].shopName%></p>
                    <div class="price_bar">
                        <%if(xData.goodsList[i].hasPromo){%>
                            <#--有促销价-->
                            <p class="goods_price">&yen;<span><%=moneyFormat(xData.goodsList[i].minPrice)%></span></p>
                            <p class="goods_price_old">&yen;<span><%=moneyFormat(xData.goodsList[i].originMinPrice)%></span></p>
                        <%}else {%>
                            <#--没有促销价-->
                            <p class="goods_price">&yen;<span><%=moneyFormat(xData.goodsList[i].originMinPrice)%></span></p>
                        <%}%>
                    </div>
                </div>
            </div>
        </a>
        <%}%>
    </div>

</script>
<#-- 猜你喜欢 -->
<script id="specFloorTpl" type="text/html">
    <div class="floor floor_recommend">
        <div class="floor_tit">
            <img data-lazyload="<%=#imgFormat(xData.imgUrl,'750x90.png')%>">
        </div>
        <div class="fix">
            <%for(i = 0; i < xData.goodsList.length; i++){%>
            <a class="floor_item" href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData.goodsList[i].goodsId%>">
                <div class="_img">
                    <img data-lazyload="<%=#imgFormat(xData.goodsList[i].iconUrl,'335x335.png')%>">
                </div>
                <div class="r goods_info">
                    <p class="goods_name goods_name_2"><%=xData.goodsList[i].name%></p>
                    <div class="price_bar">
                        <%if(xData.goodsList[i].hasPromo){%>
                         <#--有促销价-->
                            <p class="goods_price">&yen;<span><%=moneyFormat(xData.goodsList[i].minPrice)%></span></p>
                            <p class="goods_price_old">&yen;<span><%=moneyFormat(xData.goodsList[i].originMinPrice)%></span></p>
                        <%}else {%>
                            <#--没有促销价-->
                            <p class="goods_price">&yen;<span><%=moneyFormat(xData.goodsList[i].minPrice)%></span></p>
                        <%}%>
                    <#--TODO: 运费信息 -->
                    <#--<p class="dev_free">免运费</p>-->
                    </div>
                </div>
            </a>
            <%}%>
        </div>
    </div>
</script>


<!-- 活动商品 -->
<script id="actListTpl" type="text/html">

    <div class="time_limit">
        <div class="time_limit_top fix">
            <p class="tit l">惊喜抢购</p>
            <p class="countdown l">
                <#--<span class="days">00</span>天-->
                <span class="hours">00</span>时
                <span class="minutes">00</span>分
                <span class="seconds">00</span>秒
            </p>
            <a href="<%=vars.clientRoot%><%=xData.linkUrl%>" class="time_link r el">玩心跳意犹未尽<i></i></a>
        </div>
        <div class="time_limit_btm">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="fix">
                        <%for(i=0;i < xData.goodsList.length;i++){%>
                            <li class="l">
                                <a href="<%=vars.clientRoot%><%=xData.goodsList[i].linkUrl%>">
                                    <div class="_img">
                                        <img data-lazyload="<%=#imgFormat(xData.goodsList[i].iconUrl,'155x155.png')%>">
                                        <span class="badge">热卖</span>
                                    </div>
                                    <div class="goods_price">&yen;<span><%=xData.goodsList[i].originMinPrice%></span></div>
                                    <div class="goods_price_old">&yen;<span><%=xData.goodsList[i].originMaxPrice%></span></div>
                                </a>
                            </li>
                        <%}%>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</script>


<#include "${vars.resourceFolder}/temp/scripts.ftl">
<!--页面单独js-->
<script>
    var indexList = [
        {
            "INSTANCE_NAME": "移动-首页顶部轮播",
            "WIDGET_NAME": "轮播广告组件",
            "WIDGET_DATA_TYPE": 2,
            "tplName": 'sliderTpl'
        },
        {
            "INSTANCE_NAME": "移动-首页模块导航",
            "WIDGET_NAME": "模块导航",
            "WIDGET_DATA_TYPE": 2,
            "tplName": 'navTpl'
        },
        {
            "INSTANCE_NAME": "移动-首页不规则多图广告位",
            "WIDGET_NAME": "不规则多图广告位",
            "WIDGET_DATA_TYPE": 1,
            "tplName": "specAdsTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页促销活动",
            "WIDGET_NAME": "单促销活动广告位",
            "WIDGET_DATA_TYPE": 3,
            "tplName": "actListTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页单图广告位",
            "WIDGET_NAME": "单图广告位",
            "WIDGET_DATA_TYPE": 1,
            "tplName": "adTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页大牌推荐",
            "WIDGET_NAME": "模块品牌",
            "WIDGET_DATA_TYPE": 1,
            "tplName": "brandTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页带顶部主图多图广告位",
            "WIDGET_NAME": "带顶部主图多图广告位",
            "WIDGET_DATA_TYPE": 1,
            "tplName": "adsClassTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页电脑专区",
            "WIDGET_NAME": "多商品无广告",
            "WIDGET_DATA_TYPE": 5,
            "tplName": "floorTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页手机专区",
            "WIDGET_NAME": "多商品无广告",
            "WIDGET_DATA_TYPE": 5,
            "tplName": "floorTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页家电专区",
            "WIDGET_NAME": "多商品无广告",
            "WIDGET_DATA_TYPE": 5,
            "tplName": "floorTpl"
        },
        {
            "INSTANCE_NAME": "移动-首页为您推荐",
            "WIDGET_NAME": "多商品无广告",
            "WIDGET_DATA_TYPE": 5,
            "tplName": "specFloorTpl"
        }
    ];
</script>
<script src="${vars.theme.root}/resources/js/module/mui/mui.picker.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/module/mui/mui.poppicker.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/module/jquery.downCount.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/ec/goods/index.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<#include "${vars.resourceFolder}/temp/appCommon.ftl">
</body>
</html>