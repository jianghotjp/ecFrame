//function pageInit(){
$(function(){
    //按需初始化页面数据
    page.priceMin = 'string' == typeof page.url.get('priceMin') ? decodeURI(page.url.get('priceMin')) : '';
    page.priceMax = 'string' == typeof page.url.get('priceMax') ? decodeURI(page.url.get('priceMax')) : '';
    page.sort = 'string' == typeof page.url.get("sort") ? decodeURI(page.url.get('sort')) : '';
    page.kw = 'string' == typeof page.url.get('kw') ? decodeURI(page.url.get('kw')) : '';

    // page.brand = 'string' == typeof page.url.get('brand') ? decodeURI(page.url.get('brand')) : '';
    // page.area = 'string' == typeof page.url.get('area') ? decodeURI(page.url.get('area')) : '';
    // mui.init({
    //     pullRefresh: {
    //         container: '#pullrefresh',
    //         up: {
    //             contentrefresh: '正在加载...',
    //             callback: pullupRefresh
    //         }
    //     }
    // });
    //初始化图片lazyload
    // var lazyLoad = mui(window).imageLazyload({
    //     placeholder: vars.theme.root + '/resources/images/placeholder.png',
    //     destroy: false
    // });
   // function pullupRefresh() {
        getJson("/ec/goods/doSearchGoodsByProps.do", {
            // kw: page.kw,
            // priceMin: page.priceMin,//最小价格
            // priceMax: page.priceMax,//最大价格
            // sort: page.sort,//销量排序：sl:a(升序),sl:d(降序);   价格排序:pr:a(升序),pr:d(降序);  新品排序：nw:a(升序),nw:d(降序)
            // page: ++page.page,
            // pageSize: page.pageSize,
            // brand:page.brand,
            // area:page.area,
            kw: null,
            priceMin: null,//最小价格
            priceMax: null,//最大价格
            sort: page.sort,//销量排序：sl:a(升序),sl:d(降 序);   价格排序:pr:a(升 序),pr:d(降序);  新品排序：nw:a(升序),nw:d(降 序)
            cat: page.cat,
            area: page.area,
            brand: page.brands,
            prop: page.prop,
            page: ++page.page,
            pageSize: page.pageSize

        }, function (data) {
            page.pageCount = data.data.pageCount;
            var rows = data.data.rows;
           // mui('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。
            for (var i = 0; i < rows.length; i++) {
                var itemData = {
                    vars: vars,
                    xData: rows[i]
                };
                renderTmp('#container', 'goodsItem', itemData);
            }
            if(rows.length == 0){
                $('.mui-pull-bottom-pocket .mui-pull').hide();
                $('.list_empty').show();
            }
            // lazyLoad.refresh(true);
        });
   // }
    //广告图
    getJson("/comm/widget/doSearchWidgetData.do",{
        widgetName:"移动-热卖广告图"
    },function(data){
        data = {
            vars: vars,
            xData: data.data.widgetData
        };
        renderTmp('#ads','adItem',data);

        // var tt_h;
        // // var pos = $('#header').outerHeight(true);
        // var pos = 0;
        // if($('.tit_box_top').hasClass('advertising')){
        //     var img = $('.tit_box_top img');
        //     img.on('load',function(){
        //         tt_h = $('.tit_box_top').outerHeight(true);
        //         $('.tit_box_inside').css({opacity:1});
        //         $('body>.tit_box').css({top:tt_h});
        //         var st = tt_h - pos;
        //         scrollFix('#pullrefresh','.tit_box_out',st,pos,2000,'pf');
        //     })
        // }else{
        //     tt_h = $('.tit_box_top').outerHeight(true);
        //     $('.tit_box_inside').css({opacity:1});
        //     $('body>.tit_box').css({top:tt_h});
        //     var st = tt_h - pos;
        //     scrollFix('#pullrefresh','.tit_box_out',st,pos,2000,'pf');
        // }
//        mui('#pullrefresh').pullRefresh().pullupLoading();

    });
    //选项卡点击效果     不要触发两次点击事件，一个点击，改变另一个样式
    //商品排序
    $('.item_box.l').on('tap', '.tit_item', function() {

        var i = $(this).index();
        $('.tit_box_inside .item_box.l .tit_item').eq(i).addClass('cur').siblings('').removeClass('cur').removeClass('arrUp').removeClass('arrDown');
        $('.tit_box_out .item_box.l .tit_item').eq(i).addClass('cur').siblings('').removeClass('cur').removeClass('arrUp').removeClass('arrDown');
        if($(this).hasClass('price_sort')){
            if($('.price_sort').hasClass('arrUp')){
                page.sort = 'pr:d';
                $('.price_sort').removeClass('arrUp').addClass('arrDown');

            }else{
                page.sort = 'pr:a';
                $('.price_sort').addClass('arrUp').removeClass('arrDown');
            }
        }else{
            page.sort = $(this).attr('data-type');
        }
        $('#container').html('');
        page.page = 0;
        //reloadPull();
    });


    // 切换列表样式
    // $('.change').on('tap',function(){
    //     $('.goods_list').toggleClass('goods_list_oth');
    //     $('.change').toggleClass('act')
    // });

// 右侧侧滑   暂时不加
    //侧滑容器父节点
    //var offCanvasWrapper = mui('#offCanvasWrapper');
    //主界面容器
    //var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
    //菜单容器
    //var offCanvasSide = $("#offCanvasSide");
    //阻止手势侧滑
    // offCanvasInner.addEventListener('drag', function(event) {
    //     event.stopPropagation();
    // });
    //主界面和侧滑菜单界面均支持区域滚动；
    // mui('#offCanvasSide .mui-scroll-wrapper').scroll();
    // $('.item_box').on('tap','.choose', function() {
    //     offCanvasWrapper.offCanvas('show');
    // });
    // 展开全部
    // $('.mui-off-canvas-right').on('tap','.item_all',function(){
    //     $(this).toggleClass('cur');
    //     if($(this).hasClass('cur')){
    //         $(this).find('.mui-icon').removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup');
    //         $(this).closest('.menu_item').find('.menu_box').addClass('cur');
    //     }else{
    //         $(this).find('.mui-icon').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
    //         $(this).closest('.menu_item').find('.menu_box').removeClass('cur');
    //     }
    // });
    // $('.mui-off-canvas-right').on('tap','.done',function() {
    //     offCanvasWrapper.offCanvas('close');
    //     page.filter.update();
    // });
    // $('.mui-off-canvas-right').on('tap','.reset',function() {
    //     for(var type in page.filter.spec){
    //         // console.log(page.filter.spec[type].data);
    //         for(var i=0;i< page.filter.spec[type].data.length;i++){
    //             page.filter.spec[type].data[i].ischecked = false;
    //         }
    //     }
    //     for(var j=0;j<page.filter.custom.length;j++){
    //         for(var k=0;k<page.filter.custom[j].values.length;k++){
    //             page.filter.custom[j].values[k].ischecked = false;
    //         }
    //     }
    //     $('.menu_item_cus').find('.menu_item').remove();
    //
    //     $('.goods_slide_menu').find('.active').removeClass('active');
    //     $('.goods_slide_menu').find('.choose_item ').text('全部').removeClass('main_c');
    //     $('.mui-control-item').each(function(i,e){
    //         $('.mui-control-item:eq('+i+')').text( $('.menu_item_other .menu_item:eq('+i+')').find('._title').text()).removeClass("main_c");
    //         $('.mui-control-content li').removeClass('active')
    //     });
    //     // console.log( page.filter.custom);
    //
    // });



//}
})

