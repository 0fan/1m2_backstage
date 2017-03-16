;(function($){

var oNav     = $('#nav'),
		nav_list = oNav.find('.nav_drop > li'),
		nav_text = [],
		nav_href = [];

for(var i = 0, len = nav_list.length; i < len; i++) {
	nav_text[i] = nav_list.eq(i).text();
	nav_href[i] = nav_list.eq(i).find('a').attr('href');
}

var navIpt          = $('<div class="nav_search"><input type="text" placeholder="搜索..."></div>');
var navSearchResult = $('<div class="nav_search_result"><div class="nav_search_control"><input type="text"></div><div class="nav_search_wrap"></div></div>');
var oIpt            = navSearchResult.find('input');

oNav.prepend(navSearchResult);
oNav.prepend(navIpt);

navIpt.on('click', function(e) {
	navSearchResult.find('.nav_search_wrap').html('')
	navSearchResult.addClass('active');
	oIpt.val('').focus();
});

oIpt.on('input',function(e){
	var that = this;
	setTimeout(function(){
		var txt = $.trim($(that).val());
		if(!txt.length){
			navSearchResult.find('.nav_search_wrap').html('')
			return;
		}
		
		navSearchResult.find('.nav_search_wrap').html('').append( searchNav(txt) );
	},100);
});

function searchNav(txt){
	var result = [];
	for(var i = 0, len = nav_list.length; i < len; i++){
		if( nav_text[i].toLowerCase().indexOf(txt) != -1 || nav_text[i].toUpperCase().indexOf(txt) != -1 ){
			result.push('<a class="nav_search_item" href="' + nav_href[i] + '">' + nav_text[i] + '</a>');
		}
	}
	return result.join('');
}

$(document).on('click',function(e){
	e.stopPropagation();
	if ( $(e.target).closest(oNav).length === 0 ) {
		navSearchResult.removeClass('active');
	}
});

})(jQuery);