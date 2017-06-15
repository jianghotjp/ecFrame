<nav class="footer mui-bar mui-bar-tab" id="footer">
    <a class="mui-tab-item" href="${vars.clientRoot}/ec/goods/index.html" data-id="index">
        <span class="mui-icon icon_01 bg_sprites"></span>
        <span class="mui-tab-label">首页</span>
    </a>
    <a class="mui-tab-item" href="${vars.clientRoot}/ec/goods/sort.html" data-id="sort">
        <span class="mui-icon icon_02 bg_sprites"></span>
        <span class="mui-tab-label">分类</span>
    </a>
    <#--<a class="mui-tab-item" href="${vars.clientRoot}/bbs/bbs_list.html" data-id="bbs">-->
        <#--<span class="mui-icon icon_03 bg_sprites"></span>-->
        <#--<span class="mui-tab-label">微社区</span>-->
    <#--</a>-->
    <a class="mui-tab-item" href="${vars.clientRoot}/mbr/goods_cart.html" data-id="cart">
        <span class="mui-icon icon_04 bg_sprites"></span>
        <span class="mui-tab-label">购物车</span>
        <span class="mui-badge"></span>
    </a>
    <a class="mui-tab-item" href="${vars.clientRoot}/user/user_center.html" data-id="user">
        <span class="mui-icon icon_05 bg_sprites"></span>
        <span class="mui-tab-label">我的</span>
    </a>
</nav>
<script>
    //包含底部栏的页面配置
    var includeFooterPage = [
        {id: "index", page: ["index",""]},
        {id: "sort", page: ["sort","sub_sort"]},
        {id: "bbs", page: ["bbs_list"]},
        {id: "cart", page: ["cart", "goods_cart"]},
        {id: "user", page: ["user_center"]}
    ];

</script>
