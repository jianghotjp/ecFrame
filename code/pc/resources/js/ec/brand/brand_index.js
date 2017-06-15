$(function(){
// function pageInit() {
    //按需初始化页面数据
    page.priceMin = 'string' == typeof page.url.get('priceMin') ? decodeURI(page.url.get('priceMin')) : '';
    page.priceMax = 'string' == typeof page.url.get('priceMax') ? decodeURI(page.url.get('priceMax')) : '';
    page.sort = 'string' == typeof page.url.get("sort") ? decodeURI(page.url.get('sort')) : '';
    page.kw = 'string' == typeof page.url.get('kw') ? decodeURI(page.url.get('kw')) : '';
    // page.brand = 'string' == typeof page.url.get('brand') ? decodeURI(page.url.get('brand')) : '';
    // page.area = 'string' == typeof page.url.get('area') ? decodeURI(page.url.get('area')) : '';
    //初始化图片lazyload
    // var lazyLoad = mui(window).imageLazyload({
    //     placeholder: vars.theme.root + '/resources/images/placeholder.png',
    //     destroy: false
    // });
    //$('.tit_box_inside').css({opacity:1});
    // $('.item_box.l').on('tap', '.tit_item', function(){
    //     var i = $(this).index();
    //
    //     if($(this).hasClass('cur')){
    //         //感觉不需要。暂时注释
    //         //mui('#pullrefresh').pullRefresh().pullupLoading();
    //         if($(this).hasClass('up')){
    //             $('.tit_box_inside .item_box.l .tit_item').eq(i).removeClass('up').addClass('down');
    //             $('.tit_box_out .item_box.l .tit_item').eq(i).removeClass('up').addClass('down');
    //             page.sort = $(this).data("sort")+':d';
    //         }else{
    //             $('.tit_box_inside .item_box.l .tit_item').eq(i).addClass('up').removeClass('down');
    //             $('.tit_box_out .item_box.l .tit_item').eq(i).addClass('up').removeClass('down');
    //             page.sort = $(this).data("sort")+':a';
    //         }
    //
    //         page.page = 0;
    //         $('#pullrefresh').find("#container").html('');
    //         reloadPull();
    //     }else{
    //
    //         $('.tit_box_inside .item_box.l .tit_item').eq(i).addClass('up').removeClass('down');
    //         $('.tit_box_out .item_box.l .tit_item').eq(i).addClass('up').removeClass('down');
    //         page.sort = $(this).data("sort")+':a';
    //
    //         page.page = 0;
    //         $('#pullrefresh').find("#container").html('');
    //         reloadPull();
    //     }
    //
    //
    //     $('.tit_box_inside .item_box.l .tit_item').eq(i).addClass('cur').siblings().removeClass('cur');
    //     $('.tit_box_out .item_box.l .tit_item').eq(i).addClass('cur').siblings().removeClass('cur');
    //
    // });
    // $('.tit_box_out .item_box.l .tit_item').eq(0).trigger('tap');

    // $('.change').on('tap',function(){
    //     $('.goods_list').toggleClass('goods_list_oth');
    //     $('.change').toggleClass('act')
    // });


    //查询品牌基本信息
    getJson("/ec/brand/doSearchBrandInfo.do",{
        brandId: page.url.paras.id
    },function(data){
        data = {
            vars: vars,
            xData: data.data.brand ? data.data.brand : []
        };
        //console.log(data.xData)
        renderTmp("#brand_info","brandInfo",data);




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
        //         // scrollFix('#pullrefresh','.tit_box_out',st,pos,2000,'pf');
        //     })
        // }else{
        //     tt_h = $('.tit_box_top').outerHeight(true);
        //     $('.tit_box_inside').css({opacity:1});
        //     $('body>.tit_box').css({top:tt_h});
        //     var st = tt_h - pos;
        //     // scrollFix('#pullrefresh','.tit_box_out',st,pos,2000,'pf');
        // }
        //mui('#pullrefresh').pullRefresh().pullupLoading();

        // $('#brand_info').on('tap','a',function(){
        //     $(this).toggleClass('open');
        //     tt_h = $('.tit_box_top').outerHeight(true);
        //     var st = tt_h - pos;
        //     scrollFix('#pullrefresh','.tit_box_out',st,pos,2000,'pf');
        // });


    });
    //选项卡点击效果     不要触发两次点击事件，一个点击，改变另一个样式

    /**
     * 上拉加载
     */
    // function pullupRefresh() {
    //     mui('body').progressbar().show();
    getPageData();
    function getPageData(){
        getJson('/ec/goods/doSearchGoodsByProps.do',{
             brand: page.url.paras.id,
            // kw:'',
            // priceMin:'',//最小价格
            // priceMax:'',//最大价格
            // sort: page.sort,//销量排序：sl:a(升序),sl:d(降序);   价格排序:pr:a(升序),pr:d(降序);  新品排序：nw:a(升序),nw:d(降序)
            // page: ++page.page,
            // pageSize: page.pageSize,
            // pageBrand:page.brand,
            // pageArea:page.area,
            kw: null,
            priceMin: null,//最小价格
            priceMax: null,//最大价格
            sort: page.sort,//销量排序：sl:a(升序),sl:d(降 序);   价格排序:pr:a(升 序),pr:d(降序);  新品排序：nw:a(升序),nw:d(降 序)
            // cat: page.cats,
            // area: page.area,
            // brand: page.brands,
            prop: page.prop,
            page: ++page.page,
            pageSize: page.pageSize
        },function(data) {
            page.pageCount = data.data.pageCount;
            var rows = data.data.rows;
            // mui('#pullrefresh').pullRefresh().endPullupToRefresh(page.page >= pageCount); //参数为true代表没有更多数据了。
            var table = '#container';
            $(table).empty();
            $('#allList').text(data.data.rowCount);
            for (var i = 0; i < rows.length; i++) {
                var itemData = {
                    vars: vars,
                    xData: rows[i]
                };
                //console.log(itemData)
                renderTmp(table,"goodItem",itemData);
            }
            if(rows.length == 0){
                $('.mui-pull-bottom-pocket .mui-pull').hide();
                $('.list_empty').show();
            }else{
                $('.list_empty').hide();
            }
            lazyLoad.refresh(true);

          //分页的功能
          $('#btmPaging').createPage({
            current:page.page,
            type:1,
            pageCount:page.pageCount,
            side:5,
            center:3,
            showLen:11,
            callback:function(curidx,obj){
              page.page = curidx;
              $('#brandList').empty();
              $('#btmPaging0').empty();
              getPageData();
              $('.footer').hide();

              $(window).scrollTop(0);
              $('.footer').show()

            }});
        });


      $('#flipPage').createPage({
        current:page.page,
        type:2,
        pageCount:page.pageCount,
        callback: function(curidx,obj){
          page.page = curidx;
          $('#flipPage').empty();
          getPageData();
          $('.footer').hide();
          // $('html, body').animate({scrollTop:0}, 'fast');
          $(window).scrollTop(0);
          $('.footer').show()

        }
      });
    }

    //           页面事件
    if(page.sort){
        // console.log(page.sort );
        //nw:d
        $('.sort .l .sort_btn').each(function(){
            if($(this).attr('data-type').indexOf(page.sort) >= 0){
                $(this).addClass('on').siblings().removeClass('on');
            }
        })
    }
    //商品排序
    $('.sort .l').on('click', '.sort_btn', function() {

        $(this).addClass('on').siblings().removeClass('on').removeClass('arrUp').removeClass('arrDown');
        // $('.price_sort');
        if($(this).hasClass('price_sort')){
            if($(this).hasClass('arrUp')){
                page.sort = 'pr:d';
                $(this).removeClass('arrUp').addClass('arrDown');

            }else{
                page.sort = 'pr:a';
                $(this).addClass('arrUp').removeClass('arrDown');
            }
        }else if($(this).hasClass('num_sort')){
            //商品销量排序==销量排序：sl:a(升序),sl:d(降 序);
            if($(this).hasClass('arrUp')){
                page.sort = 'sl:d';
                $(this).removeClass('arrUp').addClass('arrDown');

            }else{
                page.sort = 'sl:a';
                $(this).addClass('arrUp').removeClass('arrDown');
            }
        }else if($(this).hasClass('new_sort')){
            //商品新品排序==新品排序：nw:a(升序),nw:d(降 序)
            if($(this).hasClass('arrUp')){
                page.sort = 'nw:d';
                $(this).removeClass('arrUp').addClass('arrDown');

            }else{
                page.sort = 'nw:a';
                $(this).addClass('arrUp').removeClass('arrDown');
            }
        }else{
            page.sort = $(this).attr('data-type');
        }
        $('#container').html('');
        page.page = 0;
        // reloadPull();
        getPageData();
    });
    //商品搜索
    //登陆检测
    getJson("/comm/login/doCheck.do", {
        curUrl:location.href
    },function(data){
        page.logined = data.data.login;
        pageInitSpec();
    });

// 1 : goods_search,2 : bbs_search
    page.searchType = 1;
    function pageInitSpec() {

        $('.search_ipt').focus().trigger('focus');

        $('.top_search').on('click', '.search_btn ', function () {
            //点击搜索,插入搜索记录（后台会判断，只有登录后的搜索历史才会写入数据库）
            var kw = $.trim($('.search_ipt').val());
            if (!kw.length) {
                return mui.alert('搜索关键字不能为空');
            }
            if (page.logined) {
                getJson("/ec/goods/doSaveHotSearch.do", {
                    hotKeyWord: kw
                }, function () {
                    toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g, '%25'));
                }, function () {
                    toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g, '%25'));
                });
            } else {
                var date = '';
                date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
                date += ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                // console.log(date);
                var search = {
                    "searchType": page.searchType
                    , "searchContent": kw
                    , "searchTime": dateFormat(date, 'yyyy-MM-dd hh:mm:ss')
                };
                for (var i = 0; i < page.history.length; i++) {
                    if (page.history[i].searchContent == search.searchContent) {
                        page.history.splice(i, 1);
                    }
                }
                page.history.unshift(search);
                local.set('history', page.history);
                toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g, '%25'));
            }

        });
    }
        // $('.item_box.l').on('tap', '.tit_item', function() {
    //
    //     var i = $(this).index();
    //     $('.tit_box_inside .item_box.l .tit_item').eq(i).addClass('cur').siblings('').removeClass('cur').removeClass('arrUp').removeClass('arrDown');
    //     $('.tit_box_out .item_box.l .tit_item').eq(i).addClass('cur').siblings('').removeClass('cur').removeClass('arrUp').removeClass('arrDown');
    //     if($(this).hasClass('price_sort')){
    //         if($('.price_sort').hasClass('arrUp')){
    //             page.sort = 'pr:d';
    //             $('.price_sort').removeClass('arrUp').addClass('arrDown');
    //
    //         }else{
    //             page.sort = 'pr:a';
    //             $('.price_sort').addClass('arrUp').removeClass('arrDown');
    //         }
    //     }else{
    //         page.sort = $(this).attr('data-type');
    //     }
    //
    //
    //     // page.sort = $(this).attr('data-type');
    //     $('#container').html('');
    //     page.page = 0;
    //     reloadPull();
    // });
    // }


// }
})
