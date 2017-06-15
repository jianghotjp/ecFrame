$(function () {
  page.id = page.url.get('id');
  $('body').on('click','.left .tit',function () {
    if($(this).next('.ul').find('.li').length){
      $(this).next('.ul').slideToggle();
    }else{
      toast('该分类下暂无文章','error');
    }

  });
  getJson('/ec/article/doLoadArticleNodes.do',{},function (res) {
    if(res.success){
      var data={
        vars:vars,
        xData:res.data
      };
      renderTmp('#left','leftTpl',data);
      $('[data-id='+page.id+']').addClass('on');
      $('[data-id='+page.id+']').closest('.ul').removeClass('hide');
    }else{
      toast(res.errorMessage)
    }
  });
  getJson('/ec/article/doLoadArticle.do',{
    id:page.id
  },function (res) {
    if(res.success){
      $('.bread_nav .am-active').text(res.data.articleTitle);
      var data={
        vars:vars,
        xData:res.data
      };
      renderTmp('#inner','innerTpl',data)
    }
  })

});