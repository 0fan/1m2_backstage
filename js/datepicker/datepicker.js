(function(){

	function Datepicker(){

		if(!(this instanceof Datepicker)){
			return new Datepicker();
		}
		
		this.cfg = {
			obj : null,
			minYear : 2000,
			maxYear : 2022,
			lFormat : "yyyy年MM月dd日",
			sFormat : "yyyy年MM月"
		};

		this.handlers = {};
	}

	Datepicker.prototype = {

		render : function(cfg){

			var CFG = $.extend(this.cfg , cfg);

			/*生成模版*/
			var datepicker_box    = $("<div class='datepicker_box'></div>");
			var datepicker_header = $("<div class='datepicker_header'></div>");
			var datepicker_body   = $("<div class='datepicker_body'></div>");
			var datepicker_footer = $("<div class='datepicker_footer'></div>");
			datepicker_header.appendTo(datepicker_box);
			datepicker_body.appendTo(datepicker_box);
			datepicker_footer.appendTo(datepicker_box);

			/*header*/
			var control_pre   = $("<div class='control_pre'></div>");
			var control_next  = $("<div class='control_next'></div>");
			var control_year  = $("<select class='control_year'></select>");
			var control_month = $("<select class='control_month'><option value='0'>1</option><option value='1'>2</option><option value='2'>3</option><option value='3'>4</option><option value='4'>5</option><option value='5'>6</option><option value='6'>7</option><option value='7'>8</option><option value='8'>9</option><option value='9'>10</option><option value='10'>11</option><option value='11'>12</option></select>");
			/*生成年份*/
			for(var i = this.cfg.minYear , len = this.cfg.maxYear; i <= len; i++ ){$("<option value='" + i + "'>" + i + "</option>").appendTo(control_year);}
			control_pre.appendTo(datepicker_header);
			control_next.appendTo(datepicker_header);
			control_year.appendTo(datepicker_header);
			control_month.appendTo(datepicker_header);

			/*body*/
			var date_container = $("<table class='date_container'></table>");
			var date_tit       = $("<thead class='date_tit'><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></thead>");
			var date_content   = $("<tbody class='date_content'></tbody>");
			date_tit.appendTo(date_container);
			date_content.appendTo(date_container);
			date_container.appendTo(datepicker_body);

			/*footer*/
			var datepicker_action = $("<div class='datepicker_action'></div>");
			var clear_btn         = $("<a class='clear_btn' href='javascript:void(0);' onclick='return false;'>清空</a>");
			var today_btn         = $("<a class='today_btn' href='javascript:void(0);' onclick='return false;'>今天</a>");
			var ok_btn            = $("<a class='ok_btn' href='javascript:void(0);' onclick='return false;'>确定</a>");
			clear_btn.appendTo(datepicker_action);
			today_btn.appendTo(datepicker_action);
			ok_btn.appendTo(datepicker_action);
			datepicker_action.appendTo(datepicker_footer);

			var today = new Date();
			that=this;

			control_year.change(function(){
				control_pre.show();
				control_next.show();
				today.setFullYear(control_year.val());
				render();

				var d = new Date(today);
				d.setMonth(d.getMonth() - 1);

				if( d.getFullYear() < that.cfg.minYear){
					control_pre.hide();
				}

				d.setMonth(d.getMonth() + 2);

				if( d.getFullYear() > that.cfg.maxYear){
					control_next.hide();
				}

			});

			control_month.change(function(){

				control_pre.show();
				control_next.show();
				today.setMonth(control_month.val());
				render();

				var d = new Date(today);
				d.setMonth(d.getMonth() - 1);

				if( d.getFullYear() < that.cfg.minYear){
					control_pre.hide();
				}

				d.setMonth(d.getMonth() + 2);

				if( d.getFullYear() > that.cfg.maxYear){
					control_next.hide();
				}

			});

			
			control_next.click(function(){

				control_pre.show();
				today.setMonth(today.getMonth() + 1);
				render();

				var d = new Date(today);
				d.setMonth(d.getMonth() + 1);

				if( d.getFullYear() > that.cfg.maxYear){
					control_next.hide();
				}

			});

			control_pre.click(function(){

				control_next.show();
				today.setMonth(today.getMonth() - 1);	
				render();

				var d = new Date(today);
				d.setMonth(d.getMonth() - 1);

				if( d.getFullYear() < that.cfg.minYear){
					control_pre.hide();
				}

			});

			today_btn.click(function(){
				today = new Date();
				render();
			});

			clear_btn.click(function(){
				CFG.obj.val("");
				datepicker_box.hide();
			});

			ok_btn.click(function(){
				CFG.obj.val( parseISO8601(today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1):(today.getMonth() + 1)) + "-" + "01" ).format(CFG.sFormat) );
				datepicker_box.hide();
			});

			/*位置生成*/
			/*debugger;*/
			datepicker_box.css({
				top : CFG.obj.offset().top + CFG.obj.outerHeight() + 9 + "px",
				left : CFG.obj.offset().left + "px"
			});

			CFG.obj.focus(function(){
				datepicker_box.show();
				datepicker_box.appendTo("body");
				render();
			});

			that = this;
			function render(){

				var firstDate = today.getFirstDate();
				var dates     = today.getDates();
				control_month.val(today.getMonth());
				control_year.val(today.getFullYear());
				date_content.html("");

				for( var i = 0 , j = 1; i < 42; i++ ){

					if( i%7 == 0){
						var tr = $("<tr></tr>");
						tr.appendTo(date_content);
					}
					
					if( i >= firstDate && i <= firstDate - 1 + dates ){

						td = $("<td class='date_txt'>" + (j++) + "</td>");
						if( (today.getFullYear() == new Date().getFullYear()) && (today.getMonth() == new Date().getMonth()) && (today.getDate()+1 == j) ){
							td.addClass("loc");
						}
						td.appendTo(tr);

						td.click(function(){
							CFG.obj.val( (parseISO8601(today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1):(today.getMonth() + 1)) + "-" + (($(this).text())<10?"0"+($(this).text()):($(this).text())))).format(CFG.lFormat) );
							datepicker_box.hide();
						});

					}else{
						$("<td></td>").appendTo(tr);
					}

				}

				$(document).on("mouseup",function(e){
					var target  = $(e.target);
					e.stopPropagation();
					if(target.closest(datepicker_box).length == 0){
						datepicker_box.hide();
					}
				});

				CFG.obj.on("mouseup",function(e){
					e.stopPropagation();
				});

			}

			return this;
		},
		on : function(type , handler){
			if(typeof this.handlers[type] == "undefined"){
				this.handlers[type]=[];
			}
			this.handlers[type].push(handler);
		},
		fire : function(type , data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0,len=handlers.length;i<len;i++){
					handlers[i](data);

				}
			}
		}

	}


	Date.prototype.getDates = function(){
		var date = new Date(this);
		date.setMonth(date.getMonth() + 1);
		date.setDate(1);
		date = new Date(date - 86400000);
		return date.getDate();
	}

	Date.prototype.getFirstDate = function(){
		var date = new Date(this);
		date.setDate(1);
		return date.getWeek();
	}

	Date.prototype.getWeek = function(){
		var date = new Date(this);
		var day = date.getDay();
		return --day == -1 ? 6 : day;
	}

	Date.prototype.format = function (fmt) {
	  var o = {
	    "M+": this.getMonth() + 1, //月份 
	    "d+": this.getDate(), //日 
	    "h+": this.getHours(), //小时 
	    "m+": this.getMinutes(), //分 
	    "s+": this.getSeconds(), //秒 
	    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	    "S": this.getMilliseconds() //毫秒 
	  };
	  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	  for (var k in o)
	  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	  return fmt;
	}

	function parseISO8601(dateStringInRange) {  
	   var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,  
	       date = new Date(NaN), month,  
	       parts = isoExp.exec(dateStringInRange);  
	  
	   if(parts) {  
	     month = +parts[2];  
	     date.setFullYear(parts[1], month - 1, parts[3]);  
	     if(month != date.getMonth() + 1) {  
	       date.setTime(NaN);  
	     }  
	   }  
	   return date;  
	}  

	window.Datepicker = Datepicker;

})();