(function(){
	function Drag( cfg ){

		if( !(this instanceof Drag)){
			return new Drag(cfg);
		}

		if( !$(cfg.obj).length ){
			return false;
		}

		this.handler = {};

		this.cfg = {
			isDrag : false,
			obj : null,
			handler : null,
			boundary : null,
			direction : 'both',
			position : 'relative',
			incX : 0,
			incY : 0,
			dragW : 0,
			dragh : 0,
			dragMrgT:0,
			dragMrgR:0,
			dragMrgB:0,
			dragMrgL:0,
			winW : 0,
			winH : 0
		}

		var CFG = $.extend(this.cfg,cfg);

		CFG.winW = $(window).width();
		CFG.winH = $(window).height();
		CFG.dragW = $(CFG.obj).width();
		CFG.dragH = $(CFG.obj).height();
		CFG.dragMrgT = parseInt( $(CFG.obj).css("marginTop") );
		CFG.dragMrgR = parseInt( $(CFG.obj).css("marginRight") );
		CFG.dragMrgB = parseInt( $(CFG.obj).css("marginBottom") );
		CFG.dragMrgL = parseInt( $(CFG.obj).css("marginLeft") );
		($(CFG.obj).css("position")) === 'static' && $(CFG.obj).css("position","relative");
		CFG.position = $(CFG.obj).css("position");

		$(CFG.obj).on("mousedown",(CFG.handler && CFG.handler),function(e){
			CFG.isDrag = true;
			CFG.incX = e.pageX - $(CFG.obj).offset().left;
			CFG.incY = e.pageY - $(CFG.obj).offset().top;
		});

		$(document).on("mouseup",function(e){
			CFG.isDrag = false;
		});

		$(document).on("mousemove",function(e){
			if( CFG.isDrag ){

				if( CFG.direction == 'horizontal' ){
					$(CFG.obj).css({
						left : getPos(CFG.position,e).x
					});
				}else if( CFG.direction == 'vertical' ){
					$(CFG.obj).css({
						top : getPos(CFG.position,e).y
					});
				}else{
					$(CFG.obj).css({
						left : getPos(CFG.position,e).x,
						top : getPos(CFG.position,e).y
					});
				}
			}
		});

		$(window).on("resize",function(e){
			CFG.winW = $(window).width();
			CFG.winH = $(window).height();
		});

		function getPos(pos,e){
			
			var x = y = 0;
			if( pos === "fixed" ){
				x = e.clientX - CFG.incX - CFG.dragMrgR - CFG.dragMrgL;
				y = e.clientY - CFG.incY - CFG.dragMrgT - CFG.dragMrgB;
			}else if( pos === "absolute" || pos === "relative"){
				x = e.pageX - CFG.incX - CFG.dragMrgR - CFG.dragMrgL;
				y = e.pageY - CFG.incY - CFG.dragMrgT - CFG.dragMrgB;
			}

			if( CFG.boundary === 'window' ){
				if( x < - CFG.dragMrgR - CFG.dragMrgL){
					x = - CFG.dragMrgR - CFG.dragMrgL;
				}else if( x >= (CFG.winW - CFG.dragW - CFG.dragMrgR - CFG.dragMrgL) ){
					x = CFG.winW - CFG.dragW - CFG.dragMrgR - CFG.dragMrgL;
				}

				if( y < - CFG.dragMrgT - CFG.dragMrgB){
					y = - CFG.dragMrgT - CFG.dragMrgB;
				}else if( y >= (CFG.winH - CFG.dragH - CFG.dragMrgT - CFG.dragMrgB)){
					y = CFG.winH - CFG.dragH - CFG.dragMrgT - CFG.dragMrgB;
				}
			}
			
			return {
				x : x,
				y : y
			}
		}

		function getEleScreenX(obj){
			return{
				x : $(obj).offset().left,
				y : $(obj).height() + ( $(obj).offset().top() - $(document).scrollTop() )
			}
		}

	}

	Drag.prototype = {
		on : function(type,handler){
			if( typeof this.handlers[type] == 'undefined' ){
				this.hanlders[type] = [];
			}
			this.handlers[type].push(handler);
		},
		fire : function(type,data){
			if( this.handlers[type] instanceof Array ){
				var handlers = this.handlers[type];
				for( var i=0,len=handlers.length;i<len;i++ ){
					handlers[i](data);
				}
			}
		}
	}

	window.Drag = Drag;
})();