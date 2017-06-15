//登陆检测
getJson("/comm/login/doCheck.do", {
  curUrl: location.href
}, function (data) {
  page.logined = data.data.login;
  pageInitSpec();
});
//存储介质
if (!!window.localStorage) {
  page.history = local.get('history').length ? local.get('history') : [];
}

// 1 : goods_search,2 : bbs_search
page.searchType = 1;
function pageInitSpec() {

  $('.search_ipt').focus().trigger('focus');

  $('#header').on('tap', '#searchBtn', function () {
    //点击搜索,插入搜索记录（后台会判断，只有登录后的搜索历史才会写入数据库）
    var kw = $.trim($('.search_ipt').val());
    if (!kw.length) {
      return mui.alert('搜索关键字不能为空');
    }
    toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g, '%25'));

    // if(page.logined){
    //     getJson("/ec/goods/doSaveHotSearch.do",{
    //         hotKeyWord: kw
    //     },function(){
    //         toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g,'%25'));
    //     },function(){
    //         toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g,'%25'));
    //     });
    // }else{
    //     var date = '';
    //     date = new Date().getFullYear()+'-'+ (new Date().getMonth()+1) + '-' +new Date().getDate();
    //     date += ' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
    //         // console.log(date);
    //      var search = {
    //          "searchType":page.searchType
    //          ,"searchContent": kw
    //          ,"searchTime": dateFormat(date,'yyyy-MM-dd hh:mm:ss')
    //      };
    //      for(var i=0;i<page.history.length;i++){
    //          if(page.history[i].searchContent == search.searchContent){
    //              page.history.splice(i,1);
    //          }
    //      }
    //     page.history.unshift(search);
    //     local.set('history',page.history);
    //     toNewPage(vars.clientRoot + '/ec/goods/goods_list.html?kw=' + kw.replace(/%/g,'%25'));
    // }

  });

  $('#history').on('tap', 'a', function () {
    $('.search_ipt').val($(this).text());
    $('#searchBtn').trigger('tap');
  });


  $('.search_ipt').on('input',function(){
    $('.shop_search_bar span').text($(this).val());

  });
  $('body').on('tap','.mui-icon.mui-icon-clear',function () {
      $('.shop_search_bar span').text('');
  });

  $('.shop_search_bar').on('tap',function(){
    var kw =  $('.shop_search_bar span').text();
    toNewPage(vars.clientRoot+'/ec/shop/shop_list.html?kw='+kw)
  });



//点击搜索和点击搜索历史、点击热搜，都跳转到商品列表页面:/ec/goods/goods_list.html?kw=(搜索框中输入的内容)

//查询热搜数据
  getWidgetData("移动、PC热门搜索", 2, function (data) {
    data = {
      vars: vars,
      xData: data.data.widgetData ? data.data.widgetData : []
    };
    renderTmp('#hot', 'hotTpl', data);
  });

//查询历史记录
//   if (page.logined) {
//     getJson("/ec/goods/doFindHotSearchList.do", {}, function (data) {
//       // console.log(JSON.stringify(data));
//       data = {
//         vars: vars,
//         page: page,
//         xData: data.data
//       };
//       renderTmp('#history', 'historyTpl', data)
//     });
//     // console.log(page.history);
//     if (page.history.length) {
//       getJson("/ec/goods/doSaveHotSearchList.do", {
//         hotSearchList: JSON.stringify(page.history)
//       });
//     }
//
//   } else {
//     var data = {
//       vars: vars,
//       page: page,
//       xData: page.history
//     };
//     renderTmp('#history', 'historyTpl', data)
//   }

//清空查询历史记录（能不能在没有登录的时候把清空历史记录的按钮隐藏一下）
  /**
   * 如果登录，清空搜索历史
   */

  // $('#history').on('tap', '.clear', function () {
  //   if (page.logined) {
  //     getJson("/bbs/doClearSearchRecord.do", {
  //       //类型(1-首页搜索；2-加华圈)
  //       searchType: page.searchType
  //     }, function (data) {
  //       // console.log(data);
  //       if (data.success == true) {
  //         $('.search_list').find('ul').remove();
  //         $('#history').find('.clear').hide();
  //         mui.toast('删除成功');
  //       }
  //     });
  //   } else {
  //
  //     $('.search_list').find('ul').remove();
  //     $('#history').find('.clear').hide();
  //     local.set('history');
  //     mui.toast('删除成功');
  //   }
  // });

}