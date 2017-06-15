<div class="page_top">
    <div class="wrap fix">
        <div class="l" id="topLeft"></div>
        <div class="r page_top_right">
            <ul>
                <li class="top_item l ">
                    <a href="${vars.clientRoot}/settled/shops_settled_role.html">
                        <i class="shop_icon"></i>
                        商家入驻
                    </a>
                </li>
                <li class="top_item l spec">
                    <a href="${vars.clientRoot}/mbr/user_order.html">
                        我的订单 <i class="arr_down"></i>
                    </a>
                    <ul class="top_item_box">
                        <li>
                            <a href="${vars.clientRoot}/mbr/user_order.html?id=1">待付款</a>
                        </li>
                        <li>
                            <a href="${vars.clientRoot}/mbr/user_order.html?id=2">待发货</a>
                        </li>
                        <li>
                            <a href="${vars.clientRoot}/mbr/user_order.html?id=3">待收货</a>
                        </li>
                        <li>
                            <a href="${vars.clientRoot}/mbr/user_order.html?id=4">待评价</a>
                        </li>
                    </ul>
                </li>
                <li class="top_item l">
                    <a href="${vars.clientRoot}/mbr/user_info.html">
                        会员中心
                    </a>
                </li>
                <li class="top_item l">
                    <a href="${vars.clientRoot}/mbr/user_collect.html">
                        我的收藏
                    </a>
                </li>
                <li class="top_item l spec">
                    <a href="">
                        商城服务 <i class="arr_down"></i>
                    </a>
                    <ul class="top_item_box" id="topService">

                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
<script type="text/html" id="topLeftTpl">
    <ul>
        <li class="top_item l welcome"><a href="/">欢迎来到捷瑞商城！</a></li>
        <%if(xData.login){%>
        <li class="top_item l login_in">
            您好，
            <a href="<%=vars.clientRoot%>/mbr/user_info.html">
                <span class=""><%=xData.member.nickName%></span>
            </a>
        </li>
        <li class="top_item l login_out">
            <a href="<%=vars.clientRoot%>/user/login.html">|&nbsp;&nbsp;退出</a>
        </li>
        <%}else{%>
        <li class="top_item l login_in">
            您好，
            <a href="<%=vars.clientRoot%>/user/login.html">
                <span class="">请登录</span>
            </a>
        </li>
        <li class="top_item l register">
            <a href="<%=vars.clientRoot%>/user/register.html">免费注册</a>
        </li>
        <%}%>

    </ul>
</script>
<script type="text/html" id="topServiceTpl">
    <%for(i=0;i<xData.length;i++){%>
        <li>
            <a href="<%=vars.clientRoot%>/ec/article/article_view.html?id=<%=xData[i].articleId%>"><%=xData[i].articleTitle%></a>
        </li>
    <%}%>
</script>