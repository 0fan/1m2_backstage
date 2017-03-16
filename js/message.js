(function(){
	
	function msg(cfg){
		this.cfg = {

			content : "顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。",
			link : "#",
			timer : 5000
		}

		var CFG = $.extend(this.cfg,cfg);

		$(".mod-message").remove();

		var msgHtml = $("<div class=mod-message><a href='" + CFG.link + "' class=mod-message-content>" + CFG.content + "</a><lable class=mod-message-close><span class=mod-message-btn>×</span></lable></div>");
		msgHtml.appendTo("body");
		
		setTimeout(function(){
			msgHtml.addClass("active");
		},1);
		

		$(".mod-message .mod-message-close").on("click",function(){
			$(".mod-message").addClass("destory");
		});

		setTimeout(function(){
			$(".mod-message").addClass("destory");
		},CFG.timer);
	}

	window.msg = msg;

})();