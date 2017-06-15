    <div class="l sh_nav">
        <div class="sh_user">
            <div class="sh_user_content fix" id="shUserContent">

            </div>
            <div class="pr">
                <ul class="nav_list">
                    <li class="pr">
                        <a href="/mbr/user_order.html">我的订单</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_collect.html">我的收藏</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_track.html">我的足迹</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/goods_cart.html">我的购物车</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_refund.html">退货/换货</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="nav_list nav_my_money pr">
                    <li class="pr">
                        <a href="/mbr/user_msg_list.html">我的消息</a>
                    </li><li class="pr">
                        <a href="/mbr/user_points.html">我的积分</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_sign.html">我的签到</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_coupon.html">我的优惠券</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="nav_list pr">
                    <li class="pr">
                        <a href="/mbr/user_info.html">设置个人资料</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_safe.html">账户安全设置</a>
                    </li>
                    <li class="pr">
                        <a href="/mbr/user_address.html">管理收货地址</a>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="nav_list nav_help pr">
                    <li class="pr">
                        <a href="/ec/article/article_view.html?id=103">服务与帮助</a>
                    </li>
                    <li class="pr">
                        <a href="/ec/article/article_view.html?id=67">关于商城</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
<script id="shUserContentTpl" type="text/html">
    <div class="l sh_user_img">
        <%if(xData.imgUrl){%>
            <%if(isWx){%>
                <img data-lazyload="<%=xData.imgUrl%>"/>
            <%} else{%>
                <img data-lazyload="<%=#imgFormat(xData.imgUrl, '67x67.png')%>">
            <%}%>
        <%}else{%>
            <img data-lazyload="<%=vars.theme.root%>/resources/images/unsignd.jpg"/>
        <%}%>

    </div>
    <div class="l sh_user_text">
        <p class="el"><%=xData.displayName%></p>
        <p class="fix">
            <span class="l">积分：<%=xData.availPoints%></span>
            <#--<span class="user_icon l"></span>-->
            <#--<span class="user_lvl"><%=levelId%></span>-->
        </p>
    </div>
</script>