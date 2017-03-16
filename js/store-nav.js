(function(){

	$(window).on("load",function(){

		var navStatus = store.get('navStatus');
		var navs = $("#nav .nav_content");
		for(var i=0,len=navStatus.length;i<len;i++){
			if(navStatus[i]){
				navs.eq(i).addClass(("nav_open"));
			}else{
				navs.eq(i).removeClass(("nav_open"));
			}
		}

	});

	$(window).on("unload",function(){
		var nav_arr = [];
		var navs = $("#nav .nav_content");
		for(var i=0,len=navs.length;i<len;i++){
			if(navs.eq(i).hasClass("nav_open")){
				nav_arr[i] = true;
			}else{
				nav_arr[i] = false;
			}
		}
		store.set('navStatus', nav_arr);

	});

})();