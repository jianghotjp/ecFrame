//分页插件
/**
 *
 * @example
 * $('.paginationContainer').createPage({current:1,pageCount:20,callback:function(){console.log("callback successed!")}});
 *
 *@param {number} [pageCount=1] - 页面总数。必填。
 *@param {number} [current=1] - 当前页码。必填。
 *@param {number} [type=1] - 提供两种分页方式，默认是带数字的分页type1，翻页式为type2。必填。
 *@param {number} [showLen=10] - 分页显示页码总个数。选填。
 *@param {number} [side=2] - 分页两侧显示页码个数。选填。
 *@param {number} [center=5] - 分页中间显示页码个数。选填。
 *@param {function} [callback=function(current,obj,args){}] - 点击页码或上一页/下一页按钮时提供回调函数。选填。注意：传递回调函数后，将阻止页面数字按钮和翻页按钮的页面跳转事件。
 *@param {boolean} [hideForOnlyOnePage=true] - 当页面长度为1时是否需要加载分页插件，true为不加载。选填。
 *
 * */
(function($){
	var ms = {
		init:function(obj,args){
			obj.html("");
			obj.append('<div class="pagination_body"></div>').find('.pagination_body');
			ms.fillHtml(obj,args);
			var objInner=obj.find('.pagination_body');
			ms.bindEvent(objInner,args);
			return obj;
		},
		//填充html
		/**
		 * 默认两种分页结构，选择类型并向页面渲染
		 *
		 * */
		fillHtml:function(objWrapper,args){
			return (function(){
				objWrapper.empty().append('<div class="pagination_body"></div>');
				var obj=objWrapper.find('.pagination_body');
				if(args.type==1){
					//type:1，默认的列表底部分页
					ms.fillType01(obj,args);
				}else if(args.type==2){
					//	type:2，只带总页数和上一页/下一页按钮
					obj.addClass('page_t02');
					obj.append('<span class="cur_page">'+args.current+'</span>/<span class="total_page">'+args.pageCount+'</span><span class="page_unit">页</span>');
					if(args.current>1 && args.current<=args.pageCount){
						obj.append('<a href="javascript:;" class="page_btn prevPage">上一页</a>');
					}else{
						obj.remove('.prevPage');
						obj.append('<span class="page_btn disabled">上一页</span>');
					}
					if(args.current<args.pageCount && args.current>0){
						obj.append('<a href="javascript:;" class="page_btn nextPage">下一页</a>');
					}else{
						obj.remove('.nextPage');
						obj.append('<span class="page_btn disabled">下一页</span>');
					}
				}
			})();
		},
		fillType01:function(obj,args){
			obj.addClass('page_t01');
			obj.append('<ul class="am-pagination am-pagination-centered"></ul>');
			var objCon=obj.find('ul');
			if(args.current > 1){
				objCon.append('<li><a href="javascript:;" class="prevPage"><i class="am-icon-long-arrow-left"></i></a></li>');
			}else{
				objCon.remove('.prevPage');
				objCon.append('<li class="am-disabled"><a href="javascript:;" class="disabled disabledLink"><i class="am-icon-long-arrow-left"></i></a></li>');
			}
			//中间页码
			if(args.pageCount>args.showLen){
				//	页码数字多余允许显示页码数
				if(args.current>0 && args.current<=(args.pageCount+1)/2 && args.current<args.side+args.center-1){
					//	当前页码在首部
					for(var hIdx=1;hIdx<=args.showLen-args.side-1;hIdx++){
						if(hIdx==args.current){
							objCon.append('<li class="am-active"><a href="javascript:;" class="current disabledLink">'+ hIdx +'</a></li>');
						}else{
							objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ hIdx +'</a></li>');
						}
					}
					objCon.append('<span class="elli">...</span>');
					for(var rIdx=args.pageCount-args.side+1;rIdx<=args.pageCount;rIdx++){
						objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ rIdx +'</a></li>');
					}
				}else if( args.current<=args.pageCount && args.current>(args.pageCount+1)/2 && args.current>args.pageCount-args.side-args.center+2){
					//	当前页码在尾部
					for(var hIdx=1;hIdx<=args.side;hIdx++){
						objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ hIdx +'</a></li>');
					}
					objCon.append('<span class="elli">...</span>');
					for(var rIdx=args.pageCount-args.showLen+args.side+2;rIdx<=args.pageCount;rIdx++){
						if(rIdx==args.current){
							objCon.append('<li class="am-active"><a href="javascript:;" class="current disabledLink">'+ rIdx +'</a></li>');
						}else{
							objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ rIdx +'</a></li>');
						}
					}
				}else if(args.current>0 && args.current<args.pageCount){
					//当前页码在中间，两端有省略号
					for(var hIdx=1;hIdx<=args.side;hIdx++){
						objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ hIdx +'</a></li>');
					}
					objCon.append('<span class="elli">...</span>');
					for(var cIdx=args.current-Math.ceil((args.center+1)/2)+1;cIdx<args.current-Math.ceil((args.center+1)/2)+1+ args.center;cIdx++){
						if(cIdx==args.current){
							objCon.append('<li class="am-active"><a href="javascript:;" class="current disabledLink">'+ cIdx +'</a></li>');
						}else{
							objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ cIdx +'</a></li>');
						}
					}
					objCon.append('<span class="elli">...</span>');
					for(var rIdx=args.pageCount-args.side+1;rIdx<=args.pageCount;rIdx++){
						objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ rIdx +'</a></li>');
					}

				}else{
					console.warn("Page is out of range！Please check your page number.");
				}
			}else{
				//页码数字较少，可以全部显示，不需要省略号
				for(var pIdx=1;pIdx<=args.pageCount;pIdx++){
					if(pIdx != args.current){
						objCon.append('<li><a href="javascript:;" class="tcdNumber">'+ pIdx +'</a></li>');
					}else{
						objCon.append('<li class="am-active"><a href="javascript:;" class="current disabledLink">'+ pIdx +'</a></li>');
					}
				}
			}
			if(args.current < args.pageCount){
				objCon.append('<li><a href="javascript:;" class="nextPage"><i class="am-icon-long-arrow-right"></i></a></li>');
			}else{
				objCon.remove('.nextPage');
				objCon.append('<li class="am-disabled"><a href="javascript:;" class="disabled disabledLink"><i class="am-icon-long-arrow-right"></i></a></li>');
			}
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
                    if(args.callback){
                        callback=args.callback;
                        callback(current,obj,args);
                    }else{
                        ms.jumpToNewPage(current);
                    }
				});
				obj.on("click","a.prevPage",function(){
                    var current;
                    if(args.type == 1){
                        current = parseInt($(this).parent().siblings('.am-active').find('.current').text());

                    }else{
                        current = $('.cur_page').text()*1
                    }
					// var current = parseInt($(this).parent().siblings('.am-active').find('.current').text());
                    if(args.callback){
                        callback=args.callback;
                        callback(current-1,obj,args);
                    }else{
                        ms.jumpToNewPage(args.current-1);
                    }

				});
				obj.on("click","a.nextPage",function(){
                    var current;
					if(args.type == 1){
                        current = parseInt($(this).parent().siblings('.am-active').find('.current').text());

                    }else{
                        current = $('.cur_page').text()*1
					}
                    if(args.callback){
                        callback=args.callback;
                        callback(current+1,obj,args);
                    }else{
                        ms.jumpToNewPage(args.current+1);
                    }
				});
			})();
		},
		jumpToNewPage:function(pgNum){
			if(!pgNum || parseInt(pgNum)<1){
				//页码异常(为空，非数字且转为数字后<1)，跳转页面1
				toNewPage(page.url.set({page:1}));
			}else{
				toNewPage(page.url.set({page:pgNum}));
			}
		},
		hidePagination:function(obj){
			obj.html("").addClass('pagination_hide');
			return obj;
		}
	};
	$.fn.createPage = function(options){
		this.pageArgs = $.extend({
			pageCount : 1,
			current : 1,
			type:1,
			showLen:10,
			side:2,
			center:5,
			hideForOnlyOnePage:true
		},options);
		var args=this.pageArgs;
        args.callback="function"===typeof(args.callback) ? args.callback : false;
		args.hideForOnlyOnePage="boolean"===typeof(args.hideForOnlyOnePage) ? args.hideForOnlyOnePage : true;
		for(akey in args){
            if(!(args[akey]===args.callback || akey==="hideForOnlyOnePage")){
                args[akey]=parseInt(args[akey])>0 ? parseInt(args[akey]) : 1;
            }
        }
		args.showLen=args.showLen<args.pageCount? args.showLen : args.pageCount;
		args.current=args.current<args.pageCount ? args.current : args.pageCount;
		args.side=args.side*2<args.showLen-2? args.side : parseInt(args.showLen/2);
		args.center=args.showLen-args.side*2>args.center? args.center : args.showLen-args.side*2;
		return !args.hideForOnlyOnePage || (args.hideForOnlyOnePage && args.pageCount>1) ? ms.init(this,args) : ms.hidePagination(this);
	};
})(jQuery);
