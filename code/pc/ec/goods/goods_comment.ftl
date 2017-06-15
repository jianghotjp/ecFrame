<!doctype html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <title>商品评价页面</title>
<#include "${vars.resourceFolder}/temp/htmlHead.ftl">
</head>

<body class="goods_view">
<!-- 顶部登录条 start -->
<#include "${vars.resourceFolder}/temp/pageTop.ftl">
<!-- 顶部登录条 end -->
<!-- 搜索栏 start -->
<#include "${vars.resourceFolder}/temp/pageHeader.ftl">
<!-- 搜索栏 end -->
<!-- 导航栏 start -->
<#include "${vars.resourceFolder}/temp/topNav.ftl">
<!-- 导航栏 end -->
<#--页面内容-->
<div class="goods_view_bg">
    <div class="wrap fix">
        <!-- 猜你喜欢 start -->
        <div class="recommend l">
            <h3 class="recommend_tit">猜你喜欢</h3>
            <div class="recommend_list">
                <ul class="dataContent" id="guessLikeListContainer">
                    <!-- 猜你喜欢列表循环 start -->
                    <#--<li class="recommend_item">-->
                        <#--<a href="#">-->
                            <#--<div class="item_img">-->
                                <#--<img src="http://temp.im/220x165" alt="">-->
                            <#--</div>-->
                            <#--<div class="goods_info">-->
                                <#--<p class="goods_name">Dr.Jart 绿色药丸面膜</p>-->
                                <#--<p class="goods_price el">-->
                                    <#--<span class="new_price main_c">￥119</span>-->
                                    <#--<span class="old_price">￥130</span>-->
                                <#--</p>-->
                                <#--<p class="purchase_records el">127人已购买</p>-->
                            <#--</div>-->
                        <#--</a>-->
                    <#--</li>-->

                    <!-- 猜你喜欢列表循环 end -->
                </ul>
            </div>
        </div>
        <!-- 猜你喜欢 end -->
        <!-- 商品参数 start -->
        <div class="goods_parameter r">
            <div class="goods_parameter_nav fix">
                <a href="javascript:;" class="nav_item cur l">商品评价（<span id="commentCount"></span>）</a>
            </div>
            <div class="goods_parameter_con oh">
                <div class="goods_evaluation">
                    <div class="evaluation_total fix dataContent" id="evaluationRate">
                        <!-- 商品好评率 -->
                    </div>
                    <div class="evaluation_nav fix">
                        <a href="javascript:;" class="nav_item cur l">
                            <span class="nav_radio l"><i></i></span>
                            <span class="nav_text l">全部评价</span>
                        </a>
                        <a href="javascript:;" class="nav_item l">
                            <span class="nav_radio l"><i></i></span>
                            <span class="nav_text l">截图</span>
                        </a>
                    </div>
                    <div class="evaluation_list">
                        <ul class="dataContent" id="evaluationListContainer">
                            <!-- 评论列表循环 start -->
                            <#--<li class="evaluation_item fix">-->
                                <#--<div class="l">-->
                                    <#--<div class="user_head">-->
                                        <#--<img src="http://temp.im/100x100" alt="">-->
                                    <#--</div>-->
                                    <#--<h3 class="evaluation_person">我**风</h3>-->
                                <#--</div>-->
                                <#--<div class="item_info l">-->
                                    <#--<p class="evaluation_level fix">-->
                                        <#--<span class="am-icon-star main_c l"></span>-->
                                        <#--<span class="am-icon-star main_c l"></span>-->
                                        <#--<span class="am-icon-star main_c l"></span>-->
                                        <#--<span class="am-icon-star main_c l"></span>-->
                                        <#--<span class="am-icon-star main_c l"></span>-->
                                    <#--</p>-->
                                    <#--<div class="evaluation_con">-->
                                        <#--<p>这款用了将近一年了，很好用的面膜，补水效果很明显。我都是洗完澡蒸个脸，然后敷，哈哈。希望皮肤能越来越好～</p>-->
                                    <#--</div>-->
                                    <#--<div class="evaluation_img fix">-->
                                        <#--<div class="img_item l">-->
                                            <#--<img src="http://temp.im/300x300" alt="">-->
                                        <#--</div>-->
                                    <#--</div>-->
                                <#--</div>-->
                                <#--<p class="evaluation_date r">来自手机客户端<br />2016-12-03</p>-->
                            <#--</li>-->

                            <!-- 评论列表循环 end -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品参数 end -->
    </div>
</div>
<#--页面内容-->

<#--猜你喜欢列表项模板-->
<script id="guessLikeListItem" type="text/html">
    <li class="recommend_item">
        <a href="#">
            <div class="item_img">
                <img src="http://temp.im/220x165" alt="">
            </div>
            <div class="goods_info">
                <p class="goods_name">Dr.Jart 绿色药丸面膜</p>
                <p class="goods_price el">
                    <span class="new_price main_c">￥119</span>
                    <span class="old_price">￥130</span>
                </p>
                <p class="purchase_records el">127人已购买</p>
            </div>
        </a>
    </li>
</script>

<#--商品好评率-->
<script id="evaluationRateTpl" type="text/html">
    <p class="evaluation_level l">
        <%if(!rData.goodRate)rData.goodRate = 100%>
        <%for(var i = 0; i < 100; i += 20){%>
        <%if(i < rData.goodRate && i + 20 > rData.goodRate){%>
        <span class="am-icon-star l"></span>
        <%}else if(i <= rData.goodRate){%>
        <span class="am-icon-star main_c l"></span>
        <%}else if(i > rData.goodRate){%>
        <span class="am-icon-star l"></span>
        <%}%>
        <%}%>
    </p>
    <p class="evaluation_text main_c l"><span class="main_c"><%=rData.goodRate%></span>%好评</p>
</script>

<#--评论列表项模板-->
<script id="evaluationListItem" type="text/html">
    <li class="evaluation_item fix">
        <div class="l">
            <div class="user_head">
                <img src="<%=#imgFormat(xData.mbrImgUrl,'46x46.png')%>" alt="">
            </div>
            <h3 class="evaluation_person"><%=xData.mbrNickName%></h3>
        </div>
        <div class="item_info l">
            <p class="evaluation_level fix">
                <%for(var k = 1; k <= 5; k++){%>
                <%if(k <= xData.rank){%>
                <span class="am-icon-star main_c l"></span>
                <%}else if(k > xData.rank){%>
                <span class="am-icon-star l"></span>
                <%}%>
                <%}%>
            </p>
            <div class="evaluation_con">
                <p><%=xData.content%></p>
            </div>
            <div class="evaluation_img fix">
                <div class="img_item l">
                    <img src="http://temp.im/300x300" alt="">
                </div>
            </div>
        </div>
        <p class="evaluation_date r">来自手机客户端<br /><%=dateFormat(xData.date,'yyyy-MM-dd')%></p>
    </li>
</script>

<!-- footer start -->
<#include "${vars.resourceFolder}/temp/pageFooter.ftl">

<#include "${vars.resourceFolder}/temp/scripts.ftl">
<!--页面单独js-->
<script src="${vars.theme.root}/resources/js/ec/goods/goods_comment.js?v=${ver}" type="text/javascript"
        charset="utf-8"></script>
</body>
</html>