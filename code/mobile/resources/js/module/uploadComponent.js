var $j = jQuery.noConflict();
var uploadComponent = {
	imgs:{
		url:[],
		data:[]
	},
	_this:null,
	_addBtn:"._addBtn",
	_fileBtn:"#file",
	_okBtn:"#clipBtn",
	_cancelBtn:"#cancelBtn",
	_el:".upload-img-bg",
	_listName:".upload-img-list",
	_options:{
		canvas: null,
		width: 150,
		height: 150,
		loadStart: function() {
			try{
				mui.toast("读取中");
			}catch (e) {}
			
		},
		loadComplete: function() {
            $('#clipBtn').addClass('readDone');
			try{
				mui.toast("读取完成");
			}catch (e) {}
		},
		clipFinish: function(dataURL) {
			//console.log(dataURL);
			var _img = '<li class="upload-img">'+
							'<div class="upload-img-block">'+
								'<span>'+
									'<img src="' + uploadComponent.resizeImage(dataURL) + '"/>'+
								'</span>'+
							'</div>'+
							'<div class="del-btn">删 除</div>'+
						'</li>';
			$j(uploadComponent._this).before(_img);
			uploadComponent.calcMax(uploadComponent._this);
			uploadComponent._this = null;
			uploadComponent.elHide();
            $('#clipBtn').removeClass('readDone');
			try{
                // 身份证上传
                if($(uploadComponent._okBtn).hasClass('imgBtn')){
                    if($j('.photo-clip-moveLayer').find('img').length){
                        var btn_l = $j('.mui-content').find('.del-btn').length;
                        $j('.mui-content').find('.del-btn').addClass('del-btn-img');
                        if(btn_l == 1){
                            $j('.upload_content .upload_btn:eq('+page.side+')').hide();
                        }else{
                            $j('.upload_content .upload_btn').hide();
                        }
                    }
				}
                mui.toast("选择完成");
                $j('.photo-clip-rotateLayer').html('');
			}catch (e) {}
		}
	},
	resizeImage: function(imgData) {
        // var width = this._options.width,
			// height = this._options.height,
			// canvas = this._options.canvas,
			// img = $j("<img src='" + imgData + "'>")[0];
        // canvas.width = width;
        // canvas.height = height;
        // canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        // return canvas.toDataURL("image/jpeg");
		return imgData
   	},
	calcMax:function(child){
		var _block = $j(uploadComponent._this).closest(".upload-img-list");
		if(child){
			_block = $j(child).closest(uploadComponent._listName);
		}
		var	now = _block.find(".upload-img").length,
			max = _block.attr("data-max");
		if(now < max){
			_block.find(uploadComponent._addBtn).show();
		}else{
			_block.find(uploadComponent._addBtn).hide();
		}
	},
	elShow:function (){
		if(!this._this){
			return;
		}
		$j(this._el).fadeIn();
	},
	elHide:function (){
		$j(this._el).fadeOut();
	},
	delImg:function(delBtn){
		var _btn = $j(delBtn).closest(uploadComponent._listName).find(uploadComponent._addBtn),
			_img = $j(delBtn).closest(".upload-img");
		_img.remove();
		uploadComponent.calcMax(_btn);
	},
	saveImgs:function(){
		uploadComponent.imgs = {
			url:[],
			data:[]
		}
		$j(uploadComponent._listName).find(".upload-img").each(function(){
			var _img = $j(this).find("img").attr("src");
			if(_img.indexOf("data:image") == 0){
				uploadComponent.imgs.data.push(_img);
			}else{
				uploadComponent.imgs.url.push(_img);
			}
		});
	},
	init:function (){
		if(!this._options.canvas){
			this._options.canvas = $j("<canvas></canvas>")[0];
		}
		$j("#clipArea").photoClip($j.extend({
			file: this._fileBtn,
			ok: this._okBtn
		},this._options));
		$j(this._cancelBtn).click(function(){
			uploadComponent.elHide();
		});
		$j(this._addBtn).each(function(){
			uploadComponent.calcMax(this);
			
		});
		$j(this._listName).on("tap",".del-btn",function(){
			if($j(this).hasClass('del-btn-img')){
				//身份证上传删除
                var btn_l = $('.mui-content').find('.del-btn').length;
                var ind = $j(this).closest('.upload-img').index();
                if(btn_l == 2){
                    $('.upload_content .upload_btn:eq('+ind+')').show();
                }else{
                    $('.upload_content .upload_btn').show();
                }
			}
			uploadComponent.delImg(this);
		});
	}
}

$j(function(){
	$j(".mui-content").on('tap','.view',function(){
        uploadComponent._this = this;
        if(uploadComponent._options.noclip){
            $('#file').trigger('click');
        }else{
            uploadComponent.elShow();
		}


	})
})