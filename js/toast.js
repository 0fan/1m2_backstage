
window.toasts = [];
window.toastTimer = 1500;
window.toastScan = function(){
	if(toasts.length > 0){
		var t = toasts.shift();
		t.appendTo(".toast_container").slideDown(150).delay(window.toastTimer).slideUp(150,function(){t.remove();});
	}
	setTimeout("toastScan()",100);
};

function Toast(){
	this.cfg = {
		content : "修改成功!",
		type : "0",
		timer : 1500,
	}
}

Toast.prototype = {
	init : function(cfg){
		var CFG = $.extend(this.cfg,cfg);
		window.toastTimer = CFG.timer;
		window.toastScan();
		var toast_container = $("<div class='toast_container'></div>");
		toast_container.css({
			position : "absolute",
			width : "100%",
			top : "0"
		});
		toast_container.appendTo("body");
	},
	push : function(cfg){
		var CFG = $.extend(this.cfg,cfg);
		window.toasts.push($("<div class='toastBox'>" + CFG.content + "</div>"));
		if(CFG.type == 1){
			window.toasts[window.toasts.length-1].css({
				background : "#f44336"
			});
		}

	}
}


