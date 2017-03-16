(function(){

	var sels = $("select");
	/*生成*/
	for(var i=0,len=sels.length;i<len;i++){

		var opts = "";

		sels.eq(i).find("option").each(function(){
			opts += "<li class='ui-droplist-item'><a href='javascript:void(0);' onclick='return false;' val='" + $(this).attr("value") +"'>" + $(this).text() + "</a></li>";
		});	

		var select = $("\
			<div class='ui-droplist'>\
				<div class='ui-droplist-content'>\
					<div class='ui-droplist-txt'>请选择</div>\
					<input class='ui-droplist-orign' type='hidden' />\
					<div class='ui-droplist-ico'></div>\
				</div>\
				<div class='ui-droplist-drop'>\
					<ul class='ui-droplist-wrap'>\
					" + opts + "\
					</ul>\
				</div>\
			</div>\
		");

		sels.eq(i).after(select);
	}

	/*事件绑定*/
	$(".ui-droplist").on("click",".ui-droplist-item",function(){
		$(this).parents(".ui-droplist").prev("select").find("option").eq($(this).index()).attr("selected",true).siblings().removeAttr("selected");
		$(this).parents(".ui-droplist").find(".ui-droplist-txt").text($(this).text());
		$(this).parents(".ui-droplist").find(".ui-droplist-orign").val($(this).text());
		$(this).parents(".ui-droplist").removeClass("active");
	});

	$(".ui-droplist").on("click",".ui-droplist-content",function(){
		var drop = $(this).parents(".ui-droplist");
		$(".ui-droplist").css({zIndex:888});
		drop.css({zIndex:999});
		if( drop.hasClass("active") ){
			drop.removeClass("active");
		}else{
			drop.addClass("active");
		}
	});

	$(".ui-droplist-content").on("mousedown",function(){
		$(this).parents(".ui-droplist").addClass("mousedown");
	});

	$(".ui-droplist-content").on("mouseup",function(){
		$(this).parents(".ui-droplist").removeClass("mousedown");
	});

	$(document).on("mouseup",function(e){
	     e.stopPropagation();
	     if($(e.target).closest($(".ui-droplist")).length==0){
	         $(".ui-droplist").removeClass("active");
	     }
	});

})();
