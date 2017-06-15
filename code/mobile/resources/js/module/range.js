/**
 * Created by hotlp on 2017/3/29.
 * 滑动验证
 * cb 成功回调
 */
function range(callback){
  var oBtn = document.getElementById('btn');
  var oW,oLeft;
  var oSlider=document.getElementById('range');
  var oTrack=document.getElementById('track');
  var oIcon=document.getElementById('icon');
  var oSpinner=document.getElementById('spinner');
  page.flag=1;

  if('function' != typeof callback){
    callback = $.noop;
  }

  oBtn.addEventListener('touchstart',function(e){
    if(page.flag==1){
      var touches = e.touches[0];
      oW = touches.clientX - oBtn.offsetLeft;
      oBtn.className="button";
      oTrack.className="track";
    }

  },false);

  oBtn.addEventListener("touchmove", function(e) {
    if(page.flag==1){
      var touches = e.touches[0];
      oLeft = touches.clientX - oW;
      if(oLeft < 0) {
        oLeft = 0;
      }else if(oLeft > oSlider.offsetWidth - oBtn.offsetWidth) {
        oLeft = (oSlider.offsetWidth - oBtn.offsetWidth);
      }
      oBtn.style.left = oLeft + "px";
      oTrack.style.width=oLeft+ 'px';
    }

},false);

  oBtn.addEventListener("touchend",function() {
    oBtn.className="button-on";
    oTrack.className="track-on";
    if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
      oBtn.style.left = (oSlider.offsetWidth - oBtn.offsetWidth);
      oTrack.style.width= (oSlider.offsetWidth - oBtn.offsetWidth);
      // oIcon.style.display='none';
      // oSpinner.style.display='block';
      page.flag=0;
    }else{
      oBtn.style.left = 0;
      oTrack.style.width= 0;
    }

  },false);
}
