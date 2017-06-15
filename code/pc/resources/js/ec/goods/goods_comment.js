/**
 * Created by Ysl on 2017/1/11.
 */
page.id = page.url.get('id');
page.type = 'all';

$(function(){

    //猜你喜欢列表模版渲染
    getJson('/ec/goods/doFindSameCatGoodsList.do', {
        goodsId: page.id,
        limit:12
    }, function (data) {
        if(!data.data.length){
            return;
        }
        data = {
            vars: vars,
            xData: data.data
        };
        renderTmp('#guessLikeListContainer', 'guessLikeListItem', data, function (el, html) {
            el.innerHTML += html;
            el.className += 'show';
            // mui('#guessSlider').slider();
            lazyLoad.refresh(true);
        });
    });

    //商品评价列表模版渲染
    //TODO: 评价分页处理
    getJson("/ec/goods/doSearchComments.do", {
        // goodsId: page.id,
        // type:page.type,
        // page: ++page.page,
        // pageSize: page.pageSize
        goodsId: page.id,
        type:page.type,
        page: page.page,
        pageSize: page.pageSize
    }, function (data) {
        // if(page.page == 1){
        //     $('.head_tit span').text(data.data.allCount);
        //     var titData = {
        //         vars: vars,
        //         xData: data.data
        //     };
        //     renderTmp('#commentTitle', 'commentTitleTpl', titData);
        // }
        // var pageCount = data.data.commentPagedList.pageCount,
        rows = data.data.commentPagedList.rows;
        // mui('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。
        for (var i = 0; i < rows.length; i++) {
            var itemData = {
                vars: vars,
                xData: data.data.commentPagedList.rows[i],
                rData:data.data
            };
            renderTmp('#evaluationListContainer', 'evaluationListItem', itemData);
        }
        $('#commentCount').text(data.data.allCount);
        renderTmp('#evaluationRate', 'evaluationRateTpl', itemData);

    });

    //TODO: 评价类型筛选
    $('.evaluation_nav .nav_item').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    });
});
