<!doctype html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <title>商品列表</title>
    <#include "${vars.resourceFolder}/temp/htmlHead.ftl">
</head>

<body class="sticky_footer">
<header class="header">
    <#include "${vars.resourceFolder}/temp/pageTop.ftl">
    <#include "${vars.resourceFolder}/temp/pageHeader.ftl">
    <#include "${vars.resourceFolder}/temp/topNav.ftl">
</header>
<div class="body goods_lists">
    <div class="wrap">
        <!-- /面包屑 -->
        <div class="bread_nav crumb">
            <ol class="am-breadcrumb" id="bread">

            </ol>
        </div>
        <!--/面包屑-->
        <!--筛选-->
        <div class="groups">
            <dl class="choosen_group" id="checkedItem">
                <dt>已选条件</dt>
                <dd>
                    <#--当前品牌-->
                    <div id="chkedBrand"></div>
                        <#--当前其他属性-->
                    <div id="chkedProp"></div>
                    <#--<a href="#">-->
                        <#--品牌：<span>魅族</span><i></i>-->
                    <#--</a>&nbsp;&gt;&nbsp;-->
                </dd>
            </dl>
            <#--品牌-->
            <div id="topFilterItem"></div>
            <#--其他属性-->
            <div id="filterSlideItem"></div>
            <#--<dl class="brand_group">-->
                <#--<dt>品牌</dt>-->
                <#--<dd class="side">-->
                    <#--<a class="check" href="#">-->
                        <#--<i class="am-icon-plus"></i> 多选-->
                    <#--</a>-->
                    <#--<a class="more" href="#">更多<i></i></a>-->
                <#--</dd>-->
                <#--<dd class="inner">-->
                    <#--<a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a>-->
                <#--</dd>-->
            <#--</dl>-->
            <#--<dl class="price_group">-->
                <#--<dt>价格</dt>-->
                <#--<dd class="side"></dd>-->
                <#--<dd class="inner"></dd>-->
            <#--</dl>-->
            <#--<dl>-->
                <#--<dt>品牌</dt>-->
                <#--<dd class="side"></dd>-->
                <#--<dd class="inner">-->
                    <#--<a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a><a href="#">魅族</a>-->
                <#--</dd>-->
            <#--</dl>-->
        </div>
        <div class="attrExtra">
            <div class="attrExtra-border"></div>
            <a class="attrExtra-more"><i></i>更多选项</a>
        </div>
        <!--/筛选-->
        <!--排序-->
        <div class="sort fix" id="filterItem">
            <div class="l">
                <p class="_tit l">排序：</p>
                <a href="javascript:;" class="sort_btn on l sort_down">综合排序<i class="btn_icon r icon_01"></i></a>
                <a href="javascript:;" class="sort_btn l num_sort">
                    销量
                    <span class="sort_arr">
                        <i class="am-icon-sort-asc"></i>
                        <i class="am-icon-sort-desc"></i>
                    </span>
                </a>
                <a href="javascript:;" class="sort_btn l price_sort">
                    价格
                    <span class="sort_arr">
                        <i class="am-icon-sort-asc"></i>
                        <i class="am-icon-sort-desc"></i>
                    </span>
                </a>
                <a href="javascript:;" class="sort_btn l new_sort">
                    新品
                    <span class="sort_arr">
                        <i class="am-icon-sort-asc"></i>
                        <i class="am-icon-sort-desc"></i>
                    </span>
                </a>
                <a href="javascript:;" class="sort_btn l Popularity">人气<i class="btn_icon r icon_01"></i></a>
                <a href="javascript:;" class="btn_activity l activity">
                    <p class="btn_icon pr l"></p>只看活动</a>
            </div>
            <div class="r">
                <p class="_text l">共搜索到<span class="num_search">0</span>个商品&nbsp;&nbsp;<span>|

                </span></p>
                <div class="l" id="flipPage">
                    <div class="pagination_body page_t02">
                        <span class="cur_page">1</span>/<span class="total_page">6</span>
                        <span class="page_unit">页</span>
                        <a href="javascript:;" class="page_btn prevPage">上一页</a>
                        <a href="javascript:;" class="page_btn nextPage">下一页</a>
                    </div>
                </div>
            </div>
        </div>
        <!--/排序-->
    </div>
    <!--商品列表-->
    <div class="wrap">
        <ul class="goods_list fix dataContent" id="container">
            <#--<li class="goods_item">-->
                <#--<a href="#">-->
                    <#--<div class="img">-->
                        <#--<img src="about:blank" alt="">-->
                    <#--</div>-->
                <#--</a>-->
                <#--<div class="goods_info">-->
                    <#--<a href="#">-->
                        <#--<h3>商品标题商品标题商品标题商品标题商品标题</h3>-->
                    <#--</a>-->
                    <#--<p>-->
                        <#--商品摘要商品摘要商品摘要商品摘要商品摘要</p>-->
                    <#--<h4 class="price">&yen; 250</h4>-->
                    <#--<div class="opt">-->
                        <#--<a class="shop" href="#">魅族官方旗舰店店店店店店店店店店</a>-->
                        <#--<span class="buy_num">100000人已购买</span>-->
                    <#--</div>-->
                <#--</div>-->

            <#--</li>-->

        </ul>
    </div>
    <!--/商品列表-->


    <!-- /分页 -->
    <div class="paging"></div>
    <!-- /分页 -->

    <div class="mb_like">
        <div class="fix">
            <div class="mb_like_title l">根据浏览猜你喜欢</div>
            <div class="r change_guess"><i></i>换一批</div>
        </div>

        <div class="ul_wrap">
            <ul class="fix" id="guessU">

            </ul>
        </div>
    </div>

</div>
<#--筛选选中的brand模板-->
<script id="chkedBrandTpl" type="text/html">
    <a href="javascript:;" title="<%=xData%>">
        品牌：<span><%=xData%></span><i></i>
    </a>
</script>
<script id="chkedPriceTpl" type="text/html">
    <a href="javascript:;" title="<%=xData%>">
        价格：<span><%=xData%></span><i></i>
    </a>
</script>
<#--筛选选中的prop模板-->
<script id="chkedPropTpl" type="text/html">
<#--&nbsp;&gt;&nbsp;-->
<a href="#" data-id="<%=id%>" title="<%=xData%>">
    <%=name%>：<span><%=xData%></span><i></i>
</a>
</script>
<#--商品item模板-->
<script id="goodsItem" type="text/html">
    <li class="goods_item">
        <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData.id%>">
            <div class="img">
                <img data-lazyload="<%=#imgFormat(xData.iconUrl,'240x180.png')%>" alt="">
            </div>
        </a>
        <div class="goods_info">
            <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData.id%>">
                <h3><%=xData.name%></h3>
            </a>
            <p><%=xData.remark%></p>
            <%if(xData.hasPromo==true){%>
                <#--有促销价-->
                <#--<h4 class="price">&yen; <%=moneyFormat(xData.minPrice)%><del>&yen; <%=moneyFormat(xData.originMinPrice)%></del></h4>-->
                <h4 class="price">
                    &yen; <%=moneyFormat(xData.minPrice)%>
                    <span>&yen; <%=moneyFormat(xData.originMinPrice)%></span>
                </h4>

            <%}else {%>
                <#--没有促销价-->
                <h4 class="price">&yen; <%=moneyFormat(xData.minPrice)%></h4>

            <%}%>

            <div class="opt">
                <a class="shop" href="<%=vars.clientRoot%>/ec/shop/shop.html?id=<%=xData.shopId%>"><%=xData.shopName%></a>
                <span class="buy_num"><%=xData.stSaleCnt%>人已购买</span>
            </div>
        </div>
        <%if(xData.hasPromo==true){%>
        <span class="has_promo"></span>
        <%}%>
    </li>
</script>
<#--筛选条件模板 品牌-->
<script id="filterItemTpl" type="text/html">
    <dl class="brand_group">
        <dt><%=xData.name%></dt>

        <dd >
            <div class="inner">
                <%for(var i=0;i<xData.data.length;i++){%>
                <a href="javascript:;" data-id="<%=xData.data[i].id%>"><%=xData.data[i].text%></a>
                <%}%>
            </div>
            <div class="side">
                <div class="edit">
                    <%if(xData.data.length>5){%>
                    <a class="check" href="javascript:;">
                        <i class="am-icon-plus"></i> 多选
                    </a>
                    <a class="more" href="javascript:;">更多<i></i></a>
                    <%}%>
                </div>

                <div class="btns">
                    <button class="am-btn am-btn-xs am-radius am-btn-primary am-disabled current">确定</button>
                    <button class="am-btn am-btn-xs am-radius am-btn-default cancal">取消</button>
                </div>
            </div>
        </dd>
    </dl>
</script>

<#--筛选条件模板 价格-->
<script id="priceFilterItemTpl" type="text/html">
    <dl class="brand_group">
        <dt><%=xData.name%></dt>

        <dd >
            <div class="inner">
                <%for(var i=0;i<xData.data.length;i++){%>
                <a href="javascript:;" data-id="<%=xData.data[i].id%>"><%=xData.data[i].text%></a>
                <%}%>
            </div>
            <div class="side">
                <div class="edit">
                    <%if(xData.data.length>5){%>
                    <a class="check" href="javascript:;">
                        <i class="am-icon-plus"></i> 多选
                    </a>
                    <a class="more" href="javascript:;">更多<i></i></a>
                    <%}%>
                </div>

                <div class="btns">
                    <button class="am-btn am-btn-xs am-radius am-btn-primary am-disabled current">确定</button>
                    <button class="am-btn am-btn-xs am-radius am-btn-default cancal">取消</button>
                </div>
            </div>
        </dd>
    </dl>
</script>



<#--筛选侧滑模板-->
<script id="filterSlideTpl" type="text/html">
    <%for(var j = 0; j < len; j++){%>
    <%if(!xData[j]){continue}%>
    <dl data-type="<%=xData[j].id%>">
        <dt><%=xData[j].name%></dt>

        <dd>
            <div class="inner">
                <%for(var i=0;i<xData[j].values.length;i++){%>
                <a href="javascript:;" data-id="<%=xData[j].values[i].id%>"><%=xData[j].values[i].value%></a>
                <%}%>
            </div>
            <div class="side">
                <div class="edit">
                    <%if(xData[j].values.length>1){%>
                    <a class="check" href="javascript:;">
                        <i class="am-icon-plus"></i> 多选
                    </a>
                    <a class="more" href="javascript:;">更多<i></i></a>
                    <%}%>
                </div>

                <div class="btns">
                    <button class="am-btn am-btn-xs am-radius am-btn-primary am-disabled current">确定</button>
                    <button class="am-btn am-btn-xs am-radius am-btn-default cancal">取消</button>
                </div>
            </div>
        </dd>
    </dl>
    <%}%>
</script>



<script id="guessUTpl" type="text/html">
    <%for(i=0;i<xData.length;i++){%>
    <li class="l">
        <a href="<%=vars.clientRoot%>/ec/goods/goods_view.html?id=<%=xData[i].id%>">
            <div class="img"><img data-lazyload="<%=#imgFormat(xData[i].iconUrl,'220x220.png')%>" alt=""></div>
            <div class="mb_name el"><%=xData[i].name%></div>
            <%if(xData[i].hasPromo){%>
                <div class="mb_price"><span class="mb_price_icon">&yen;</span><%=moneyFormat(xData[i].minPrice,2)%></div>
            <%}else{%>
                <div class="mb_price"><span class="mb_price_icon">&yen;</span><%=moneyFormat(xData[i].originMinPrice,2)%></div>
            <%}%>
        </a>
    </li>
    <%}%>
</script>

<#--面包屑-->
<script type="text/html" id="breadTpl">
    <li><a href="/">首页</a></li>
    <%if(xData===undefined){%>
        <li><a href="<%=vars.clientRoot%>/ec/goods/goods_list.html?kw=<%=kw%>"><%=kw%></a></li>
    <%}else{%>
        <%for(i=0;i<xData.length;i++){%>
            <%if(xData.length==i){%>
                <li class="am-active"><a href="<%=vars.clientRoot%>/ec/goods/goods_list.html?cat=<%=xData[i].id%>"><%=xData[i].text%></a></li>
            <%}else{%>
                <li><a href="<%=vars.clientRoot%>/ec/goods/goods_list.html?cat=<%=xData[i].id%>"><%=xData[i].text%></a></li>
            <%}%>
        <%}%>
    <%}%>
</script>



<!-- footer start -->
<#include "${vars.resourceFolder}/temp/pageFooter.ftl">

<#include "${vars.resourceFolder}/temp/scripts.ftl">
<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/ec/goods/goods_list.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
</body>
</html>