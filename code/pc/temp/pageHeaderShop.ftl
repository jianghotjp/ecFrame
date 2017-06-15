<div class="top_search top_search_shop ">
    <div class="wrap fix">
        <div class="logo l">
            <a href="/"><img src="${vars.theme.root}/resources/images/logo.png" alt=""></a>
        </div>
        <div class="search l">
            <div class="search_box fix">
                <input class="search_ipt l" type="text">
                <button type="button" id="seachGoods" class="search_btn search_mall mainbg_c l">搜商城</button>
                <button type="button" class="search_btn search_shop l">搜本店</button>
            </div>
            <div class="candidate_list">
                <ul class="fix " id="hot">
                <#--热搜-->
                    <li class="l">热门搜索：</li>

                </ul>
            </div>
        </div>
    </div>

</div>


<script id="hotTpl" type="text/html">
    <%for(var i = 0;i < xData.length; i++){%>
    <li class="l"><a href="<%=vars.clientRoot%><%=xData[i].linkUrl%>" class="hot_item"><%=xData[i].name%></a></li>
    <%}%>
</script>


