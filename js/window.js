/*提示，信息，导入，输入*/
(function(){
	function Window(){
		if(!(this instanceof Window)){
			return new Window();
		}
		this.cfg = {
			title : "提示", /*默认标题*/
			content : "默认消息", /*默认内容*/
			submit : "确定", /*默认submit内容*/
			cancel : "取消", /*默认cancel内容*/
			close : true, /*默认显示头部关闭按钮*/
			common_mask : false,
			mask:true,
			timer : 5000,
			promptType : "normal" /*normal password textarea*/
		};
		this.handlers = {};
		this.para = {};/*表格弹窗返回的数据*/
	}
	Window.prototype = {
		alert : function(cfg){
			var CFG               = $.extend(this.cfg,cfg);
			/*初始化*/
			var boundingBox       = $("<div class='boundingBox'></div>");
			var boundingBox_h     = $("<div class='boundingBox_h'></div>");
			var boundingBox_close = $("<a href='javascript:void(0);' onclick='return false;' class='boundingBox_close'></a>");
			var boundingBox_b     = $("<div class='boundingBox_b'></div>");
			var boundingBox_f     = $("<div class='boundingBox_f'></div>");
			var submit            = $("<button class='submit'></button>");
			var cancel            = $("<button class='cancel'></button>");
			var boundingBox_mask  = $("<div class='boundingBox_mask'></div>");
			/*赋值*/
			boundingBox_h.append("<span class='boundingBox_title'>" + CFG.title + "</span>");
			boundingBox_close.appendTo(boundingBox_h);
			boundingBox_b.append(CFG.content);
			(CFG.submit != "") && (submit.text(CFG.submit)).appendTo(boundingBox_f) ;
			(CFG.cancel != "") && (cancel.text(CFG.cancel)).appendTo(boundingBox_f);
			/*事件*/
			that = this;
			boundingBox_close.on("click",function(){
				boundingBox.remove();
				boundingBox_mask.remove();
				that.fire("close");
				that.fire("h_close");
				return false;
			});
			submit.on("click",function(){
				boundingBox.remove();
				boundingBox_mask.remove();
				that.fire("close");
				that.fire("submit");
				return true;
			});
			cancel.on("click",function(){
				boundingBox.remove();
				boundingBox_mask.remove();
				that.fire("close");
				that.fire("cancel");
				return false;
			});
			boundingBox_mask.on("click",function(){
				that.fire("mask");
			});
			/*拼接*/
			boundingBox_h.appendTo(boundingBox);
			boundingBox_b.appendTo(boundingBox);
			boundingBox_f.appendTo(boundingBox);
			CFG.mask && boundingBox_mask.appendTo("body");
			boundingBox.appendTo("body");
		},
		common : function(cfg){
			var CFG              = $.extend(this.cfg,cfg);
			var boundingBox      = $("<div class='boundingBox notice'></div>");
			var boundingBox_b    = $("<div class='boundingBox_b'></div>");
			var boundingBox_mask = $("<div class='boundingBox_mask'></div>");
			boundingBox_b.append(CFG.content);
			boundingBox_b.appendTo(boundingBox);
			CFG.common_mask && boundingBox_mask.appendTo("body");
			boundingBox.appendTo("body");
			setTimeout(function(){
				boundingBox.slideUp(200,function(){
					boundingBox.remove();	
				});
				boundingBox_mask.remove();
			}, CFG.timer);
		},
		prompt : function(cfg){
			var CFG =$.extend(this.cfg,cfg);
			/*初始化*/
			var boundingBox       = $("<div class='boundingBox'></div>");
			var boundingBox_h     = $("<div class='boundingBox_h'></div>");
			var boundingBox_close = $("<a href='javascript:void(0);' onclick='return false;' class='boundingBox_close'></a>");
			var boundingBox_b     = $("<div class='boundingBox_b'></div>");
			var input = "";
			var boundingBox_f     = $("<div class='boundingBox_f'></div>");
			var submit            = $("<button class='submit'></button>");
			var cancel            = $("<button class='cancel'></button>");
			var boundingBox_mask  = $("<div class='boundingBox_mask'></div>");
			/*赋值*/

			switch(CFG.promptType){
				case "password":
					input = $("<input type='password' class='ui-input ui-full-input'>");
					break;
				case "textarea" : 
					input = $("<textarea class='ui-textarea'></textarea>");
					break;
				default : 
					input = $("<input type='text' class='ui-input ui-full-input'>");
			}

			boundingBox_h.append("<span class='boundingBox_title'>" + CFG.title + "</span>");
			boundingBox_close.appendTo(boundingBox_h);
			boundingBox_b.append("<div style='margin-bottom:16px;'>" + CFG.content + "</div>");
			input.appendTo(boundingBox_b);
			(CFG.submit != "") && (submit.text(CFG.submit)).appendTo(boundingBox_f) ;
			(CFG.cancel != "") && (cancel.text(CFG.cancel)).appendTo(boundingBox_f);
			/*事件*/
			that = this;
			boundingBox_close.on("click",function(){
				boundingBox.remove();
				boundingBox_mask.remove();
				that.fire("close");
				that.fire("h_close");
				return false;
			});
			submit.on("click",function(){
				boundingBox.remove();
				boundingBox_mask.remove();
				that.para = {
					text : input.val()
				};
				that.fire("close");
				that.fire("submit");
			});
			cancel.on("click",function(){
				boundingBox.remove();
				boundingBox_mask.remove();
				that.fire("close");
				that.fire("cancel");
				return false;
			});
			boundingBox_mask.on("click",function(){
				that.fire("mask");
			});
			/*拼接*/
			boundingBox_h.appendTo(boundingBox);
			boundingBox_b.appendTo(boundingBox);
			boundingBox_f.appendTo(boundingBox);
			CFG.mask && boundingBox_mask.appendTo("body");
			boundingBox.appendTo("body");
			
		},
		on : function(type,handler){
			if( typeof this.handlers[type] == "undefined"  ){
               this.handlers[type] = [];
         	}
			this.handlers[type].push(handler);
		},
		fire : function(type,data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0,len=handlers.length;i<len;i++){
					handlers[i](data);
				}
			}
		}
	}
	/*loading*/
	function loading(timer,callback){
		(arguments.length == 1) && (typeof arguments[0] == "function") && (callback = arguments[0]);
		timer = (typeof timer == "number") ? timer : 8000;
		if($(".ui-loading").length == 0){ /*同一时间只允许存在一个loading*/
			var loading_mask = $("<div class='loading_mask'></div>"),
			    loading      = $("<div class='ui-loading'></div>"),
			    loading_b    = "";
			if($("html").hasClass("csstransforms")){
				loading_b = $("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAGFBMVEUNXaItrjb///+Os9R/qc6c2aCP1JSdzbtBYG3aAAAANElEQVQ4y2NQggNFQUwwKj0qTTdpBGCCKwwclR6Vpkya2RgGytJggAEbcIKbMyo9Kk28NABkCoLJoHt/7gAAAABJRU5ErkJggg==' />");
			}else{
				loading_b = $("<img src='./img/loading.gif'>");
			}

			loading_b.appendTo(loading);
			loading_mask.appendTo("body");
			loading.appendTo("body");
			setTimeout(function(){
				$(".ui-loading").remove();
				$(".loading_mask").remove();
				(typeof callback == "function") && callback();
			},timer);
		}
	}
	function unloading(){
		$(".ui-loading").remove();
		$(".loading_mask").remove();
	}
	window.Window = Window;
	window.loading =loading;
	window.unloading = unloading;
})();