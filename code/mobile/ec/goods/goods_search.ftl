<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>商品搜索</title>
<#include "${vars.resourceFolder}/temp/htmlHead.ftl">

</head>
<body class="has_top search">
<header id="header" class="mui-bar xc_top_nav fix" >
    <a href="#" class="btn bg_sprites l"></a>
    <div class="search_box pr bg_sprites l on mui-input-row">
        <input class="search_ipt l mui-input-clear" type="text" value="" placeholder="搜索商品名称 关键词" />
    </div>
    <a href="javascript:;" id="searchBtn" class="tit_item r">搜索</a>
</header>

<div class="mui-content">
    <div class="shop_search_bar el">
        <i class="bg_ico bg_ico25"></i>搜索"<span></span>"商家
    </div>

    <div id="hot" class="hot_search search_list dataContent">

<#--热门关键词-->
    </div>
    <div id="history" class="dataContent hide">

    </div>

</div>
<script id="hotTpl" type="text/html">
    <div class="_title fix">
        <p class="l">热搜</p>
    </div>

    <ul class="fix">
        <%for(var i = 0;i < xData.length; i++){%>
        <li class="hot_item el">
            <a href="<%=vars.clientRoot%><%=xData[i].linkUrl%>"><%=xData[i].name%></a>
        </li>
        <%}%>
    </ul>

</script>
<script id="historyTpl" type="text/html">
    <div class="search_list">
        <div class="_title fix">
            <p class="l">历史记录</p>
            <%if(xData.length){%>
                <p class="r clear">清空</p>
            <%}%>
        </div>
        <ul class="mui-table-view">
            <%for(var i = 0;i < xData.length; i++){%>
                <li class="mui-table-view-cell"><a href="javascript:;"><%=xData[i].searchContent%></a></li>
            <%}%>
        </ul>
    </div>
</script>

<#include "${vars.resourceFolder}/temp/scripts.ftl">
<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/ec/goods/goods_search.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script>
    $(function(){
        //input搜索框输入效果
        $('body').on('focus', '.search_ipt', function() {
            $('.search_box').addClass('on');
        }).on('blur', '.search_ipt', function() {
            $('.search_box').removeClass('on');
        });
    })
</script>
<#include "${vars.resourceFolder}/temp/appCommon.ftl">
</body>
</html>