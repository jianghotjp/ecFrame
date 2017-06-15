<!doctype html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <title>首页</title>
<#include "${vars.resourceFolder}/temp/htmlHead.ftl">
</head>

<body class="sticky_footer index_body">
<header class="header">
    <#include "${vars.resourceFolder}/temp/pageTop.ftl">
    <#include "${vars.resourceFolder}/temp/pageHeader.ftl">
    <#include "${vars.resourceFolder}/temp/topNav.ftl">
</header>
<#--页面内容-->
<div class="body index">

</div>
<script type="text/html" id="userInfoTpl">
    <div class="loadding_cat">
        <img src="<%=vars.theme.root%>/resources/images/loading_cat.gif" alt="">
    </div>
    <div class="img l"><img data-lazyload="<%=#imgFormat(xData.imgUrl,'50x50.png')%>" alt=""></div>
    <div class="l welcome">
        <div><%=xData.nickName%></div>
        <div>欢迎来到<span class="special">捷瑞商城</span>电商平台</div>
    </div>
    <div class="l signed"><a href="<%=vars.clientRoot%>/mbr/user_sign.html">每日签到</a></div>
</script>
<script type="text/html" id="topSilderTpl">
    <div class="top fix">
        <div class="wrap">
            <div class="user r">
                <div class="user_info fix" id="userInfo">
                    <div class="loadding_cat">
                        <img src="<%=vars.theme.root%>/resources/images/loading_cat.gif" alt="">
                    </div>
                    <div class="login_space">

                    </div>
                    <div id="unlogin">

                    </div>
                </div>
                <div class="notice">
                    <p>通知公告</p>
                    <div class="gundong">
                        <ul id="notice">

                        </ul>
                    </div>
                </div>
            </div>
            <div class="slide r">
                <div class="am-slider am-slider-default" id="index-slide">
                    <ul class="am-slides">
                        <%for(i=0;i<data.length;i++){%>
                            <li><a href="<%=vars.clientRoot%><%=data[i].linkUrl%>"><img data-lazyload="<%=#imgFormat(data[i].imgUrl,'750x328.png')%>" alt="slide"></a></li>
                        <%}%>
                    </ul>
                </div>
            </div>
            <div class="groom r">
                <ul class="fix" id="topSilderad">

                </ul>
            </div>
        </div>
    </div>
</script>
<script type="text/html" id="noticeTpl">
    <%for(i=xData.length-1;i>=0;i--){%>
        <li><a href="<%=vars.clientRoot%>/ec/article/article_view.html?id=<%=xData[i].articleId%>"><%=xData[i].articleTitle%></a></li>
    <%}%>
</script>
<script type="text/html" id="topSilderadTpl">
    <%for(i=0;i<data.length;i++){%>
        <li class="l"><a href="<%=vars.clientRoot%><%=data[i].linkUrl%>"><img data-lazyload="<%=#imgFormat(data[i].imgUrl,'245x136.png')%>" alt=""></a></li>
    <%}%>
</script>
<script type="text/html" id="indexActTpl">
    <%if(data){%>
    <div class="time_kill wrap fix">
        <div class="time_kill_info l" id="timeCount">
            <div class="time_text"></div>
            <div class="time_cont"><%=data.remark%></div>
            <div class="time_end">距离抢购<span class="act_status">结束</span>还有</div>
            <div class="time">
                <div class="hour hours">0</div>
                <div class="time_icon"></div>
                <div class="mins minutes">0</div>
                <div class="time_icon"></div>
                <div class="secs seconds">0</div>
            </div>
        </div>
        <div class="time_kill_slide l">
            <div class="am-slider am-slider-default am-slider-carousel" id="time-slide">
                <ul class="am-slides">
                    <%for(i=0;i<data.goodsList.length;i++){%>
                        <li class="time_kill_item">
                            <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=data.goodsList[i].goodsId%>">
                                <div class="img"><img data-lazyload="<%=#imgFormat(data.goodsList[i].iconUrl,'150x150.png')%>" alt=""></div>
                                <div class="kill_price"><span class="kill_new_price">&yen;<%=moneyFormat(data.goodsList[i].minPrice,2)%></span>&yen;<span class="kill_old_price"><%=moneyFormat(data.goodsList[i].originMinPrice,2)%></span></div>
                                <div class="kill_goods_name"><%=data.goodsList[i].name%></div>
                            </a>
                        </li>
                    <%}%>
                </ul>
            </div>
        </div>
    </div>
    <%}%>

</script>
<script type="text/html" id="berserkTpl">
    <div class="every_groom wrap">
        <div class="floor_tit">
            <span class="floor_mian_tit">3C</span>
            <span class="floor_mian_tit">•</span>
            <span class="floor_mian_tit"><%=data.title%></span>
            <span class="floor_sur_tit"><%=data.remark%></span>
        </div>
        <div class="groom_goods">
            <ul class="fix">
                <%for(i=0;i<data.goodsList.length;i++){%>
                    <li class="l">
                        <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=data.goodsList[i].goodsId%>">
                            <div class="img"><img data-lazyload="<%=#imgFormat(data.goodsList[i].iconUrl,'150x150.png')%>" alt="groom_img"></div>
                            <div class="name"><%=data.goodsList[i].name%></div>
                            <div class="price">&yen;<%=moneyFormat(data.goodsList[i].minPrice,2)%></div>
                            <%if(data.goodsList[i].cornerText){%>
                                <#--<div class="icon" style="text-shadow:0 0 3px <%=data.goodsList[i].cornerBgColor%> ;background-color: <%=data.goodsList[i].cornerBgColor%>;"><%=data.goodsList[i].cornerText%></div>-->
                                <div class="icon" style="background-color: <%=data.goodsList[i].cornerBgColor%>;"><%=data.goodsList[i].cornerText%></div>
                            <%}%>
                        </a>
                    </li>
                <%}%>
            </ul>
        </div>
    </div>
</script>
<script type="text/html" id="berserkadTpl">
    <div class="index_add wrap">
        <div class="img"><a href="<%=vars.clientRoot%><%=data.linkUrl%>"><img data-lazyload="<%=#imgFormat(data.imgUrl,'1200x120.png')%>" alt=""></a></div>
    </div>
</script>
<script type="text/html" id="indexbrandTpl">
    <div class="index_brand wrap fix">
        <div class="floor_tit">
            <span class="floor_mian_tit">3C</span>
            <span class="floor_mian_tit">•</span>
            <span class="floor_mian_tit">潮流品牌</span>
        </div>
        <div class="brand_lg l">
            <a href="<%=vars.clientRoot%><%=data.linkUrl1%>"><img data-lazyload="<%=#imgFormat(data.imgUrl1,'295x355.png')%>" alt="band_img"></a>
        </div>
        <div class="brand_sm l">
            <div class="sm_img1"><a href="<%=vars.clientRoot%><%=data.linkUrl2%>"><img data-lazyload="<%=#imgFormat(data.imgUrl2,'268x170.png')%>" alt=""></a></div>
            <div class="sm_img2"><a href="<%=vars.clientRoot%><%=data.linkUrl3%>"><img data-lazyload="<%=#imgFormat(data.imgUrl3,'268x170.png')%>" alt=""></a></div>
        </div>
        <div class="brand_lg l">
            <a href="<%=vars.clientRoot%><%=data.linkUrl4%>"><img data-lazyload="<%=#imgFormat(data.imgUrl4,'295x355.png')%> alt="band_img"></a>
        </div>
        <div class="brand_lg l brand_last">
            <a href="<%=vars.clientRoot%><%=data.linkUrl5%>"><img data-lazyload="<%=#imgFormat(data.imgUrl5,'295x355.png')%> alt="band_img"></a>
        </div>
        <div class="brand_slide">
            <div class="am-slider am-slider-default am-slider-carousel" id="brand-slide">
                <ul class="am-slides" id="adSlide">

                </ul>
            </div>
        </div>
    </div>
</script>
<script type="text/html" id="adSlideTpl">
    <%for(i=0;i<xData.length;i++){%>
        <li>
            <a href="<%=vars.clientRoot%>">
                <img data-lazyload="<%=#imgFormat(xData[i].logoUrl,'136x84.png')%> alt="brand_logo">
            </a>
        </li>
    <%}%>
</script>
<script type="text/html" id="indexbrandadTpl">
    <div class="index_add wrap">
        <div class="img"><a href="<%=vars.clientRoot%><%=data.linkUrl%>"><img data-lazyload="<%=#imgFormat(data.imgUrl,'1200x120.png')%>" alt=""></a></div>
    </div>
</script>
<script type="text/html" id="indexphoneTpl">
    <div class="goods_floor wrap">
        <div class="floor_tit fix">
            <span class="floor_mian_tit"><%=floor%>F</span>
            <span class="floor_mian_tit">•</span>
            <span class="floor_mian_tit"><span style="color:<%=data.bgColor%>"><%=tit1%></span><%=tit2%></span>
            <a class="r mores" href="#">更多商品</a>
            <%for(i=0;i<data.topLinkList.length;i++){%>
                <a class="r" href="<%=vars.clientRoot%><%=data.topLinkList[i].linkUrl%>"><%=data.topLinkList[i].name%></a>
            <%}%>
        </div>
        <div class="floor_inner fix" style="border-top: 1px solid <%=data.bgColor%>">
            <div class="floor_l l">
                <div class="img">
                    <a href="<%=vars.clientRoot%><%=data.linkUrl%>"><img data-lazyload="<%=#imgFormat(data.imgUrl,'232x356.png')%>" alt=""></a>
                </div>
                <div class="brand_name" style="background: <%=data.bgColor%>">
                    <ul class="fix">
                        <%for(i=0;i<data.mainPicLinkList.length;i++){%>
                            <li class="l"><a href="<%=vars.clientRoot%><%=data.mainPicLinkList[i].linkUrl%>"><%=data.mainPicLinkList[i].name%></a></li>
                        <%}%>
                    </ul>
                </div>
            </div>
            <div class="floor_r l">
                <ul class="fix">
                    <%for(i=0;i<data.goodsList.length;i++){%>
                        <li class="l">
                            <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=data.goodsList[i].goodsId%>">
                                <div class="brand_goods_img"><img data-lazyload="<%=#imgFormat(data.goodsList[i].iconUrl,'180x180.png')%>" alt=""></div>
                                <div class="brand_goods_price">
                                    <%if(data.goodsList[i].minPrice == data.goodsList[i].originMinPrice){%>
                                        <span class="new_price">&yen;<%=moneyFormat(data.goodsList[i].minPrice,2)%></span>
                                    <%}else{%>
                                        <span class="new_price">&yen;<%=moneyFormat(data.goodsList[i].minPrice,2)%></span>
                                        <span class="old_price">&yen;<%=moneyFormat(data.goodsList[i].originMinPrice,2)%></span>
                                    <%}%>

                                </div>
                                <div class="brand_goods_cont"><%=data.goodsList[i].name%></div>
                            </a>
                        </li>
                    <%}%>
                </ul>
            </div>
        </div>
    </div>
</script>



<#--/页面内容-->
<!-- footer start -->
<#include "${vars.resourceFolder}/temp/pageFooter.ftl">
<#include "${vars.resourceFolder}/temp/scripts.ftl">
<#--时间插件-->
<script>
    var floorArr=[
        {
            widgetName: 'PC-首页顶部轮播',
            widgetDataType: 2,
            tpl: 'topSilderTpl',
            id:'topSilder'
        },
//        {
//            widgetName: 'PC-首页顶部轮播下方多图广告位',
//            widgetDataType: 2,
//            tpl: 'topSilderadTpl',
//            id:'topSilderad'
//        },
        {
            widgetName: 'PC-首页促销活动',
            widgetDataType: 6,
            tpl: 'indexActTpl',
            id:'indexAct'
        },
        {
            widgetName: 'PC-首页每日疯抢',
            widgetDataType: 5,
            tpl: 'berserkTpl',
            id:'berserk'
        },
        {
            widgetName: 'PC-首页每日疯抢下单图广告位',
            widgetDataType: 1,
            tpl: 'berserkadTpl',
            id:'berserkad'
        },
        {
            widgetName: 'PC-首页潮流品牌',
            widgetDataType: 1,
            tpl: 'indexbrandTpl',
            id:'indexbrand'
        },
        {
            widgetName: 'PC-首页潮流品牌下单图广告位',
            widgetDataType: 1,
            tpl: 'indexbrandadTpl',
            id:'indexbrandad'
        },
        {
            widgetName: 'PC-首页手机通讯',
            widgetDataType: 5,
            tpl: 'indexphoneTpl',
            id:'indexphone',
            floor:1
        },
        {
            widgetName: 'PC-首页电脑办公',
            widgetDataType: 5,
            tpl: 'indexphoneTpl',
            id:'indexoffice',
            floor:2
        },
        {
            widgetName: 'PC-首页智能数码',
            widgetDataType: 5,
            tpl: 'indexphoneTpl',
            id:'indexdigit',
            floor:3
        }
    ];
</script>
<script src="${vars.theme.root}/resources/js/module/jquery.downCount.js?v=${ver}">type="text/javascript" charset="utf-8"></script>
<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/ec/goods/index.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
</body>
</html>