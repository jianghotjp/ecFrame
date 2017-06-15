<div class="slide_bar">
    <a href="javascript:;" class="slide_item">
        <i class="slide_icon slide_icon1"></i>
        客服
    </a>
    <a href="${vars.clientRoot}/mbr/user_track.html" class="slide_item">
        <i class="slide_icon slide_icon2"></i>
        足迹
    </a>
    <a href="${vars.clientRoot}/mbr/goods_cart.html" class="slide_item">
        <i class="slide_icon slide_icon3"></i>
        购物车
    </a>
    <a href="javascript:;" class="slide_item">
        <i class="slide_icon slide_icon4"></i>
        微商城
    </a>
    <a href="javascript:;" class="slide_item goto_top">
        <i class="slide_icon"></i>
        TOP
    </a>
</div>
<footer class="footer">
    <div class="wrap footer_top fix">

        <ul class="service fix">
            <li >
                <p class=" footer_icon footer_icon1"></p>
                <p class="l">
                    <strong>预约配送·菜鸟联盟</strong>
                    <span>大家电提前预约,准时到家</span>
                </p>
            </li>
            <li >
                <p class=" footer_icon footer_icon2"></p>
                <p class="l">
                    <strong>送货入户</strong>
                    <span>大家电搬货上楼,直送家中</span>
                </p>
            </li>
            <li >
                <p class=" footer_icon footer_icon3"></p>
                <p class="l">
                    <strong>预约安装</strong>
                    <span>无需电话申请,坐等上门安装</span>
                </p>
            </li>
            <li >
                <p class=" footer_icon footer_icon4"></p>
                <p class="l">
                    <strong>只换不修</strong>
                    <span>质量问题,365天包换</span>
                </p>
            </li>
        </ul>

        <div class="links fix">
            <div class="l footer_logo">
                <img src="${vars.theme.root}/resources/images/footer_logo.jpg" >
            </div>
            <div class="r article_links fix" id="pagefoot">

            </div>
        </div>
        </div>
    <div class="copyright">
        Copyright©2007-2017  山东捷瑞数字科技股份有限公司
    </div>
</footer>
<script type="text/html" id="pagefootTpl">
    <%for(var i=0;i<xData.length;i++){%>
    <%if(i==4){ break;}%>
        <dl>
            <dt><%=xData[i].articleTypeName%></dt>
            <%for(var j=0;j<xData[i].children.length;j++){%>
                <dd><a href="<%=vars.clientRoot%>/ec/article/article_view.html?id=<%=xData[i].children[j].articleId%>"><%=xData[i].children[j].articleTitle%></a></dd>
            <%}%>
        </dl>
    <%}%>
    <dl>
        <dt>手机电器城</dt>
        <img class="qr_code" src="<%=vars.theme.root%>/resources/images/qc_erweima.png" alt="">
    </dl>
</script>