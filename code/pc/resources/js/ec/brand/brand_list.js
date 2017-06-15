$(function(){
  //页面加载数据个数
  page.pageSize = 35;
  getPageData();

  function getPageData(){
    getJson('/ec/brand/doSearchBrandList.do',{
      page: page.page,
      pageSize: page.pageSize
    },function(data) {
      page.pageCount = data.data.pageCount;
      var rows = data.data.rows;
      data = {
        vars: vars,
        xData: rows
      };
      renderTmp('#brandList', "brandItem", data);
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
  }



});







