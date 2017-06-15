<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>商品列表</title>
<#include "${vars.resourceFolder}/temp/htmlHead.ftl">
</head>
<body class="has_top goods_lists">
<!-- 主界面不动、菜单移动 -->
<div class="search">
    <header id="header_search" class="mui-bar xc_top_nav fix" >
        <a href="#" class="btn bg_sprites l"></a>
        <div class="search_box pr bg_sprites l on mui-input-row">
            <form action="#" id="form" >
                <input class="search_ipt l mui-input-clear" type="text" value="" placeholder="搜索商品名称 关键词" />
            </form>
        </div>
        <a href="javascript:;" id="searchBtn" class="tit_item r">搜索</a>
    </header>

    <div class="shop_search_bar el hide">
        <i class="bg_ico bg_ico25"></i>搜索"<span></span>"商家
    </div>

    <#--热门关键词-->
    <div id="hot" class="hot_search search_list dataContent"></div>

</div>


<!-- 商品列表 -->
<div class="goodsList hidden">
    <!-- 侧滑导航根容器 -->
    <div class="mui-off-canvas-wrap mui-draggable mui-slide-in" id="offCanvasWrapper">
        <!-- 菜单容器 -->
        <aside class="mui-off-canvas-right" id="offCanvasSide">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <!-- 菜单具体展示内容 -->
                    <div class="goods_slide_menu">
                        <div class="menu_item">
                            <div class="menu_item_top fix">
                                <p class="_title l">价格区间</p>
                            </div>
                            <div class="menu_box">
                                <input type="number" class="min_price" placeholder="最低价"> -
                                <input type="number" class="max_price" placeholder="最高价">
                            </div>
                        </div>
                        <div class="menu_item_other" id="filterSlide">
                        <#--<div class="menu_item ">
                            <div class="menu_item_top fix">
                                <p class="_title l">分类</p>
                                <p class="item_all r mui-ellipsis"><span class="choose_item">全部</span> <span class="mui-icon mui-icon-arrowdown"></span></p>
                            </div>
                            <div class="menu_box mui-row">
                                <a class="menu_box_item mui-col-xs-4 " href="javascript:;">
                                    <p class="mui-ellipsis"><span class="mui-icon mui-icon-checkmarkempty"></span><span class="_item">雷柏</span></p>
                                </a>
                            </div>
                        </div>-->
                        </div>
                        <div class="menu_item_cus" id="filterSlideCus"></div>
                    </div>
                </div>
            </div>
            <div class="btn_group fix">
                <button class="reset">重置</button>
                <button class="done">确定</button>
            </div>
        </aside>
        <!-- 主页面容器 -->
        <div class="mui-inner-wrap">
            <!-- 主页面标题 -->
            <header id="header" class="normal_search mui-bar fix">

                <div class="search_box pr bg_sprites l">
                    <input class="search_ipt l" type="text" value="" placeholder="搜索商品名称 关键词"/>
                </div>
                <a href="javascript:;" class="tit_item bg_sprites r search_menu"></a>
                <div class="header_menu">
                    <a href="javascript:;" class="header_menu_item">
                        <i class="bg_ico bg_ico14"></i>消息
                    </a>
                    <a href="javascript:;" class="header_menu_item">
                        <i class="bg_ico bg_ico15"></i>首页
                    </a>
                    <a href="javascript:;" class="header_menu_item hide">
                        <i class="bg_ico bg_ico16"></i>分享
                    </a>
                </div>
            </header>


            <div class="tit_box fix">
                <div class="item_box l">
                    <a href="javascript:;" class="tit_item l price_sort" data-type="pr:a">
                        价格
                        <span class="sort_arr">
                            <div class="mui-icon mui-icon-arrowup"></div>
                            <div class="mui-icon mui-icon-arrowdown"></div>
                        </span>
                    </a>
                    <a href="javascript:;" class="tit_item l" data-type="sl:d">销量</a>
                <#--<a href="javascript:;" class="tit_item l" data-type="nw:d">新品</a>-->
                </div>
                <div class="item_box r">
                    <a href="javascript:;" class="tit_item bg_sprites l choose">筛选</a>
                </div>
                <a href="javascript:;" class="tit_item bg_sprites r change"></a>
            </div>
        <#--<div class="filter_bar">-->
        <#--<div class="mui-segmented-control fix" id="filterItem">-->
        <#--&lt;#&ndash;<a class="mui-control-item bg_sprites mui-active" href="#item1">分类</a>&ndash;&gt;-->
        <#--</div>-->
        <#--<div class="filter_bar_btm animated" id="filterContent">-->
        <#--&lt;#&ndash; <div id="item1" class="mui-control-content mui-active">-->
        <#--<ul class="filter_list fix">-->
        <#--<li class="cell mui-ellipsis">-->
        <#--第1个选项卡子项-1-->
        <#--<span class="mui-icon mui-icon-checkmarkempty"></span>-->
        <#--</li>-->
        <#--</ul>-->
        <#--</div>&ndash;&gt;-->
        <#--<div class="btn_group">-->
        <#--<button class="reset">重置</button>-->
        <#--<button class="done mainbg_c">完成</button>-->
        <#--</div>-->
        <#--</div>-->
        <#--</div>-->

            <div id="pullrefresh" class="mui-content mui-scroll-wrapper">
                <div class="mui-scroll">
                    <div class="list_empty hide">
                        <div class="empty_img"><img src="${vars.theme.root}/resources/images/goods_empty.png" alt="">
                        </div>
                        <p>抱歉，没有相关的商品哦～</p>
                    </div>
                    <div class="goods_list fix dataContent" id="container">
                    <#--<div class="goods_item l">-->
                        <#--<a href="#">-->
                            <#--<div class="goods_img">-->
                                <#--<img data-lazyload="http://temp.im/370x370" alt="">-->
                            <#--</div>-->
                            <#--<div class="goods_info">-->
                                <#--<h3 class="goods_name mui-ellipsis-2">菲诗小铺KAKAO限量版APEACH补水面膜</h3>-->
                                <#--<!-- 控制下边这两个goods_addr显示隐藏，分别是“国内仓”“韩国仓”只能显示一个 &ndash;&gt;-->
                                <#--<p class="goods_addr icon_01 bg_sprites"></p>-->
                                <#--<!-- <p class="goods_addr icon_02 bg_sprites"></p> &ndash;&gt;-->
                                <#--<p class="goods_price el"><span>￥</span>119</p>-->
                                <#--<p class="goods_sold el">2629人已购买</p>-->
                            <#--</div>-->
                        <#--</a>-->
                    <#--</div>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-off-canvas-backdrop"></div>
        <div class="mask-backdrop"></div>
    </div>
</div>

<#--热搜-->
<script id="hotTpl" type="text/html">
    <div class="_title fix">
        <p class="l">热搜</p>
    </div>

    <ul class="fix">
        <%for(var i = 0;i < xData.length; i++){%>
        <li class="hot_item el l">
            <a href="<%=vars.clientRoot%><%=xData[i].linkUrl%>"><%=xData[i].name%></a>
        </li>
        <%}%>
    </ul>

</script>


<#--商品item模板-->
<script id="goodsItem" type="text/html">
    <div class="goods_item l">
        <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData.id%>">
            <div class="goods_img">
                <img data-lazyload="<%=#imgFormat(xData.iconUrl,'370x370.png')%>">
            </div>
            <div class="goods_info">
                <h3 class="goods_name mui-ellipsis-2"><%=xData.name%></h3>
                <p class="goods_addr"><%=xData.shopName%></p>
                <div class="fix">
                    <div class="goods_price el">
                        <%if(xData.hasPromo){%>
                    <#--有促销价-->
                        <div class="new_price">￥<span><%=moneyFormat(xData.minPrice)%></span></div>
                        <div class="old_price">￥<span><%=moneyFormat(xData.originMinPrice)%></span></div>
                        <%}else {%>
                    <#--没有促销价-->
                        <div class="new_price">￥<span><%=moneyFormat(xData.minPrice)%></span></div>
                        <%}%>
                    </div>
                    <p class="goods_sold el"><%=xData.stSaleCnt%>人已购买</p>
                </div>
            </div>
        </a>
    </div>
</script>

<#--筛选条件模板-->
<script id="filterItemTpl" type="text/html">
    <a class="mui-control-item bg_sprites" href="#item<%=xData.index%>" data-type="<%=xData.id%>"><%=xData.name%></a>
</script>

<#--筛选内容模板-->
<script id="filterContentTpl" type="text/html">
    <div id="item<%=xData.index%>" class="mui-control-content">
        <div class="mui-scroll-wrapper filterContentScroll">
            <div class="mui-scroll">
                <ul class="filter_list fix">
                    <%for(var i=0;i<xData.data.length ;i++){%>
                    <li class="cell mui-ellipsis <%if(xData.data[i].ischecked){%>active<%}%>"
                        data-id="<%=xData.data[i].id%>">
                        <%=xData.data[i].text%>
                        <span class="mui-icon mui-icon-checkmarkempty"></span>
                    </li>
                    <%}%>
                </ul>
            </div>
        </div>

    </div>
</script>

<#--筛选侧滑模板-->
<script id="filterSlideTpl" type="text/html">
    <div class="menu_item">
        <div class="menu_item_top fix">
            <p class="_title l" data-type="<%=xData.id%>"><%=xData.name%></p>
            <p class="item_all r mui-ellipsis"><span class="choose_item">全部</span> <span
                    class="mui-icon mui-icon-arrowdown"></span></p>
        </div>
        <div class="menu_box mui-row">
            <%for(var i=0;i
            <xData.data.length
            ;i++){%>
            <a class="menu_box_item mui-col-xs-4 <%if(xData.data[i].ischecked){%>active<%}%>" href="javascript:;"
               data-id="<%=xData.data[i].id%>">
                <p class="mui-ellipsis"><span class="mui-icon mui-icon-checkmarkempty"></span><span class="_item"><%=xData.data[i].text%></span>
                </p>
            </a>
            <%}%>
        </div>
    </div>

</script>

<#--自定筛选侧滑模板-->
<script id="filterSlideCusTpl" type="text/html">
    <%for(var j=0;j
    <xData.length;j++){%>
    <div class="menu_item ">
        <div class="menu_item_top fix">
            <p class="_title l" data-type="<%=xData.id%>"><%=xData[j].text%></p>
            <p class="item_all r mui-ellipsis"><span class="choose_item">全部</span> <span
                    class="mui-icon mui-icon-arrowdown"></span></p>
        </div>
        <div class="menu_box mui-row">
            <%for(var i=0;i
            <xData
            [j].values.length;i++){%>
            <a class="menu_box_item mui-col-xs-4 <%if(xData[j].values[i].ischecked){%>active<%}%>" href="javascript:;"
               data-id="<%=xData[j].values[i].id%>">
                <p class="mui-ellipsis"><span class="mui-icon mui-icon-checkmarkempty"></span><span class="_item"><%=xData[j].values[i].text%></span>
                </p>
            </a>
            <%}%>
        </div>
    </div>

    <%}%>

</script>



<#include "${vars.resourceFolder}/temp/scripts.ftl">
<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/ec/goods/goods_list.js?v=${ver}" type="text/javascript"
        charset="utf-8"></script>
<#include "${vars.resourceFolder}/temp/appCommon.ftl">
</body>
</html>