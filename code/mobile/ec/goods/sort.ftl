<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>分类</title>
    <#include "${vars.resourceFolder}/temp/htmlHead.ftl">

</head>
<body class="sort has_bottom">
<#include "${vars.resourceFolder}/temp/pageFooter.ftl">
<div class="mui-content">
    <#include "${vars.resourceFolder}/temp/normalSearch.ftl">
    <div class="sort_list mui-fullscreen ">
        <ul class="sort_left"  id="sortListLeft">
            <#--<li class="active">大家电</li>-->

        </ul>
        <div class="sort_right">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll"  id="sortListRight">

                </div>
            </div>
        </div>
    </div>
</div>

<#--分类item模板-->
<script id="sortLeftItem" type="text/html">
    <%for(i = 0; i < xData.length; i++){%>
        <li data-id="<%=xData[i].id%>"><%=xData[i].text%></li>
    <%}%>
</script>
<#--分类右侧模板-->
<script id="sortRightItem" type="text/html">
    <div class="child_sort">
        <#--<a href="#" class="advertising">-->
            <#--<img src="http://temp.im/505x172" alt="">-->
        <#--</a>-->
        <%if(xData){%>
            <%for(var i=0;i < xData.length;i++){%>
            <div class="sort_tit"><%=xData[i].text%></div>

            <div class="fix">
                <%if(xData[i].children && xData[i].children.length){%>
                <%for(var j=0;j < xData[i].children.length;j++){%>
                <a class="sort_item" href="<%=vars.clientRoot%>/ec/goods/goods_list.html?cat=<%=xData[i].children[j].id%>">
                    <div class="_img">
                        <img data-lazyload="<%=#imgFormat(xData[i].children[j].iconUrl,'120x120.png')%>" >
                    </div>
                    <p class="sort_name"><%=xData[i].children[j].text%></p>
                </a>
                <%}%>
                <%}else{%>
                <p class="_info">该分类下暂无品类</p>
                <%}%>
            </div>
            <%}%>
        <%}else{%>
            <p class="_info">该分类下暂无品类</p>
        <%}%>

    </div>



</script>
<#include "${vars.resourceFolder}/temp/scripts.ftl">
<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/ec/goods/sort.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<#include "${vars.resourceFolder}/temp/appCommon.ftl">
</body>
</html>