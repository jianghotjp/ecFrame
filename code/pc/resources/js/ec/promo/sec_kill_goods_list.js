/**
 * Created by Administrator on 2017/1/11.
 */
$(function(){
    //品牌推荐背景颜色添加
    $('.floor_3 .brand_item:even').addClass('bg_c');

    //17-01-11 hahage
        getJson("/ec/promo/doSearchSecKillGoodsList.do", {
            page: ++page.page,
            pageSize: page.pageSize
        }, function (data) {
            var pageCount = data.data.pageCount,
                rows = data.data.rows;
            //$('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。
            for (var i = 0; i < rows.length; i++) {
                var itemData = {
                    vars: vars,
                    xData: rows[i]
                };
                renderTmp('#container', 'goodsItem', itemData);
                //$('.goods_id_'+itemData.xData.id).downCount({
                //    date: itemData.xData.promo.endTime,
                //    offset: +10
                //}, function () {
                //    alert('倒计时结束!');
                //});
            }
            lazyLoad.refresh(true);
        });

});