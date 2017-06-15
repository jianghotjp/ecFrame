<div class="top_nav">
    <div class="wrap fix">
        <div class="classify pr l">
            <a class="classify_btn fix" href="javascript:;">
                <span class="l">商品分类</span>
                <i class="r classify_icon"></i>
            </a>
            <div class="nav l" id="nav">

            </div>
        </div>
        <ul class="l site_map" id="siteMap">

        </ul>
    </div>
</div>


<#--站点地图-->

<script id="siteMapTpl" type="text/html">
    <%for(i=0;i<xData.length;i++){%>
        <li class="nav_item l">
            <a href="<%=vars.clientRoot%>/<%=xData[i].action%>"><%=xData[i].text%></a>
        </li>
    <%}%>
</script>

<script id="navTpl" type="text/html">
    <%for(i=0;i<xData.length;i++){%>
    <div class="nav_box">
        <div class="icon">
            <p class="tit"><%=xData[i].text%></p>
            <ul class="fix">
                <%if(xData[i].children && xData[i].children.length){%>
                    <%for(var j =0;j<xData[i].children.length;j++){%>
                        <li class="l">
                            <a href="<%=vars.clientRoot%>/ec/goods/goods_list.html?cat=<%=xData[i].children[j].id%>"><%=xData[i].children[j].text%></a>
                        </li>
                    <%}%>
                <%}%>
            </ul>
        </div>
        <div class="inner fix">
            <div class="l nav_inner">
                <%if(xData[i].children && xData[i].children.length){%>
                    <%for(var j =0;j<xData[i].children.length;j++){%>
                    <div class="nav_inner_item">
                        <div class="fix">
                            <div class="title l"><%=xData[i].children[j].text%></div>
                            <ul class="l fix">
                                <%if(xData[i].children[j].children && xData[i].children[j].children.length){%>
                                    <%for(var l=0; l<xData[i].children[j].children.length;l++){%>
                                    <li class="l <%if(l==0){%> bdnone<%}%>">
                                        <a href="<%=vars.clientRoot%>/ec/goods/goods_list.html?cat=<%=xData[i].children[j].children[l].id%>"><%=xData[i].children[j].children[l].text%></a>
                                    </li>
                                    <%}%>
                                <%}%>
                            </ul>
                        </div>
                    </div>
                    <%}%>
                <%}%>

            </div>
            <div class="l nav_ad">
                <div class="nav_ad_top">
                    <div class="ad_tit">苏泊尔平底不粘锅</div>
                    <div class="ad_art">优质基材 品质厨具</div>
                    <div class="ad_img"><img src="http://temp.im/150x150" alt=""></div>
                </div>
                <div class="nav_ad_bottom">
                    <div class="ad_tit">苏泊尔平底不粘锅</div>
                    <div class="ad_art">优质基材 品质厨具</div>
                    <div class="ad_img"><img src="http://temp.im/150x150" alt=""></div>
                </div>
            </div>
        </div>
    </div>

    <%}%>
</script>


