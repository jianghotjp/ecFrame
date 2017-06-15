function pageInit() {
  mui.init();
  page.id = 0;
//初始化图片lazyload
  var lazyLoad = mui(window).imageLazyload({
    placeholder: vars.theme.root + '/resources/images/placeholder.png',
    destroy: false
  });
  mui('.mui-scroll-wrapper').scroll();

  //查询所有品类
  getJson("/ec/goods/doSearchCatMenu.do", {}, function showSortList(data) {
    var sortData = {
      vars: vars,
      xData: data.data ? data.data : []
    };
    renderTmp("#sortListLeft", "sortLeftItem", sortData);
    for (var i = 0; i < data.data.length; i++) {
      var childData = {
        vars: vars,
        xData: data.data[i].children
      };
      renderTmp('#sortListRight', "sortRightItem", childData);
    }
    lazyLoad.refresh(true);

    $('.sort_left').find('li:eq(0)').trigger('tap');

  });

  $('.sort_left').on('tap', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    $('.child_sort').eq(index).show().siblings().hide();
    lazyLoad.refresh(true);
  });

  $('.search_ipt').on('tap', function () {
    toNewPage(vars.clientRoot + '/ec/goods/goods_search.html');
  });

}