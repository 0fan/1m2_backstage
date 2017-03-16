(function(){

	var data_rmb = $("[data-rmb]");
	
	add_comma(data_rmb);

	function add_comma(s){
		for(var i=0,len=s.length;i<len;i++){
			var _s     = s.eq(i).text();
			var round  = _s.substr(0,_s.indexOf(".")) || _s; /*整数*/
			var deci   = _s.indexOf(".") == -1 ? "" : _s.substr(_s.indexOf(".")); /*小数*/
			var _new   = "";
			for(var j=round.length-1,jLen=round.length-1;j>-1;j--){
				_new += round[jLen-j];
				if((j != 0) && ((j % 3) == 0)){
					(_new+=",")
				}
			}

			s.eq(i).html(_new+"<span class='deci'>" + deci + "</span>");
		}
	}

	function remove_comma(s){
		
	}

	$("[data-rmb]").on("mouseover",function(){
		var x   = $(this).offset().left,
		    y   = $(this).offset().top,
		    w   = $(this).outerWidth(),
		    h   = $(this).outerHeight(),
		    tip = $("<div class='ui-tip'>" + hanzi(Number($(this).text().replace(/,/g,""))) + "</div>");
		tip.css({
			position : "absolute",
			lineHeight : "1.5",
			fontSize:"14px",
			color:"#fff",
			background:"#000",
			padding :"5px 10px",
			borderRadius : "4px"
		});

		tip.appendTo("body");

		var _w = tip.outerWidth();
		var _h = tip.outerHeight();
		tip.css({
			left : x + (w-_w)/2 + "px",
			top : y - _h - 10 +  "px"
		});
		var arrow = $("<div></div>");
		arrow.css({
			position : "absolute",
			width:0,
			height:0,
			borderStyle:"solid",
			borderColor:"transparent",
			borderTopColor:"#000",
			borderWidth:"8px",
			bottom:"-16px",
			left:"50%",
			marginLeft:"-8px"
		});
		arrow.appendTo(tip);
		
	});

	$("[data-rmb]").on("mouseout",function(){
		$(".ui-tip").remove();
	});

	/*数字转换成汉字*/
	function hanzi(num){

		if(typeof num == "number"){
			num        = String(num);
			var round  = num.substr(0,num.indexOf(".")) || num; /*整数*/
			var deci   = num.indexOf(".") == -1 ? "" : num.substr(num.indexOf(".")); /*小数*/
			(Number(deci) == 0) && (deci = "");
			var result = "";	
			/*操作整数*/	
			var round_s = "";
			var char = ["零","一","二","三","四","五","六","七","八","九","十"];
			var char_cap = ["零","壹","貳","叁","肆","伍","陆","柒","扒","玖","拾"];
			var hz = ["","<span style='color:red;'>十</span>","<span style='color:red;'>佰</span>","<span style='color:red;'>仟</span>","<span style='color:red;'>万</span>","十","百","千","<span style='color:red;'>亿</span>","十","百","千","万"];
			for(var i = 0,len = round.length ; i < len; i++){
				if(round.substr(i,1) == "0"){
					if(round.substr(i-1,1) != "0"){
						round_s += char[0];
					}
				}else{
					round_s += char[round.substr(i,1)] + hz[len-i-1];
				}
			}
			(round_s.substr(round_s.length-1,1) == "零") && (round_s = round_s.substr(0,round_s.length-1));
			/*操作小数*/
			if(deci){
				var deci_s = round_s ? "<span style='color:red;'>点</span>" : "<span style='color:red;'>零点</span>";
				for (var i = 1,len = deci.length; i < len; i++){
					deci_s += char[deci.substr(i,1)];
				}
				result = round_s + deci_s;
			}else{
				result = round_s;	
			}
			(result == "") && (result = "<span style='color:red;'>零</span>");
			return result;
		}else{
			return "";
		}
	}
})();

