/**
 * Created by Administrator on 2017/1/11.
 */
$(function(){
    page.promoId = page.url.get('id') ? page.url.get('id') : "";
    //品牌推荐背景颜色添加
    $('.floor_3 .brand_item:even').addClass('bg_c');

    //17-01-11 hahage

    getJson("/ec/promo/doSearchTimeLimitGoodsList.do", {
        promoId: page.promoId,
        page: ++page.page,
        pageSize: page.pageSize
    }, function (data) {
        var pageCount = data.data.pageCount,
            rows = data.data.rows;
        /*$('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。*/
        for (var i = 0; i < rows.length; i++) {
            var itemData = {
                vars: vars,
                xData: rows[i]
            };
            renderTmp('#container', 'goodsItem', itemData);
        }
        lazyLoad.refresh(true);
    });



    getJson("/comm/date/doCurTime.do",{},function(data){
        var now_date = data.data.replace(/\-/g, "/");
        // new_date = new Date(date);
        // console.log(new_date)

        getJson("/ec/promo/doSearchTimeLimitPromo.do",{
            promoId: page.promoId
        },function(data){

            var date = data.data.endTime.replace(/\-/g, "/");
            // console.log(date)
            $('.tit_info').downCount({
                date: date,
                offset: +8,   //时区
                now_date:now_date
            }, function () {
                alert('倒计时结束!');
            });
        });
    });
});