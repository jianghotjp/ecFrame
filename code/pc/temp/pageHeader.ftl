<div class=" top_search top_search_common fix">
    <div class="wrap fix">
        <div class="logo l">
            <a href="/"><img src="${vars.theme.root}/resources/images/logo.png" alt=""></a>
        </div>
        <div class="search l">
            <div class="search_box fix">
                <input class="search_ipt l" type="text">
                <button class="search_btn search_mall mainbg_c l">搜索</button>
            </div>
            <div class="candidate_list">
                <ul class="fix " id="hot">
                <#--热搜-->
                    <li class="l">热门搜索：</li>
                </ul>
            </div>
        </div>
        <a class="goods_cart_btn r pr" href="${vars.clientRoot}/mbr/goods_cart.html">
            <span class=" goods_cart_icon l"></span>
            <span class="main_c">我的购物车 <i>&gt;</i></span>
            <span class="am-badge am-round" id="goodsCartNum"></span>
        </a>
    </div>

</div>


<script id="hotTpl" type="text/html">
    <%for(var i = 0;i < xData.length; i++){%>
    <li class="l"><a href="<%=vars.clientRoot%><%=xData[i].linkUrl%>" class="hot_item"><%=xData[i].name%></a></li>
    <%}%>
</script>


