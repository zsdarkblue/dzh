/*
    @name: publicopinion
    @作用: 舆情监测Js
	@时间: 2013年6月3日
	@作者: 冯静华
*/


var share_string_app = '<div class="share"><div class="orangebg orange_sharebtn mail_markbtn"><span class="fs1 mail_mark" aria-hidden="true" data-icon="&#xe00f;">email</span></div><div class="orangebg orange_sharebtn msg_markbtn"><span class="fs1 msg_mark" aria-hidden="true" data-icon="&#xe010;">message</span></div><div class="orangebg orange_sharebtn wb_markbtn"><span class="wb_mark">DZH微博</span></div></div>';
	
var shareBtn_string_app = '<div class="shareBtn"><a href="javascript:;"><span class="fs1 share_mark" aria-hidden="true" data-icon="&#xe00a;"></span></a></div>';

var sourceArr = [
"1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19",//重要,重要
"11#12",//微博
"1#3#9" //平媒
];

var lcode,skip,amout,time,source,rowtype,nowTime,organ_id,organ_title;
var url = "";
var data_highlights;

var jsoJson = {"lcode":"00070000000000i3,00070000000000Gq","skip":"0","amount":"20","time":"20130607000000,30","source":sourceArr[0],"rowtype":"1,2,3,8,5,6"};

//右侧取数ulr
var lcodeUrl = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.107.177:9089/webquery/common?__qid=gweb-yuqing_solr_cd_keyword&user=null&organ_code=00000000000100000003000107SZ&type=1&rawtype=true&tojson=true");


$(function(){

	reload();
	
	lcode="";
	
	organ_id = "";
	
	organ_title = "";
	
	thisMonth = (thisMonth < 10) ? "0"+thisMonth : thisMonth;
	thisDate = (thisDate < 10) ? "0"+thisDate : thisDate;
	nowTime = thisYear+"-"+thisMonth+"-"+thisDate;
	console.log();
	new gWebSocket(httproot,wsport,lcodeUrl,function(data){
		var _result = data.results;
		var keywordIdArr = "";
		var keywordNameArr="";
		$("#customer_name").empty();
		for(var x in _result){
			keywordIdArr = _result[x][0].split(",");
			keywordNameArr = _result[x][1].split(",");
			organ_id = _result[x][3];
			organ_title = _result[x][2];
		}
		
		//机构id命名
		organName(organ_id,organ_title);
		
		
		for(var i=0;i<keywordIdArr.length;i++){
			$("#customer_name").append("<p><a data-lcode="+keywordIdArr[i]+" href='javascript:;' >"+keywordNameArr[i]+"</a></p>");
			lcode += (keywordIdArr[i] + ",");
		}
		
		lcode = lcode.substring(0,lcode.length-1);
		source = sourceArr[0];
		skip = "0";
		amount = "20";
		time = ""+nowTime.split("-")[0]+nowTime.split("-")[1]+nowTime.split("-")[2]+"235959,30";
		rowtype = "1,2,3,5,6,8,15";
		
		url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");
		
		gWebSo(httproot,wsport,url,1);
		
	}).getSocket();
		
	//获取locde
	$("#customer_name p a").each(function(){
		lcode+=($(this).attr("data-lcode")+",");
	});
	
	//右边按钮点击效果
	$(".open_mark").click(function(){
		$("#right_tip").animate({right:"0px"},function(){			
			$(".open_mark").css("display","none");
			$(".close_mark").css("display","block");
		});
	});
	
	$(".close_mark").click(function(){
		$("#right_tip").animate({right:"-150px"},function(){
			$(".close_mark").css("display","none");		
			$(".open_mark").css("display","block");			
		});
	});
		
	//标题内容点击
	$(".ibody_bd").on("click",".poitem a",function(){
		dialog_detailed_id = $(this).attr("dialog_detailed_id");
		dialog_detailed_category = $(this).attr("dialog_detailed_category");
		$(this).dialog({
			dialogborder:'solid 1px #666',
			width : "760",
			height: "518",
			content:"iframe:publicopinion_dialog.html?id="+dialog_detailed_id+"&category="+dialog_detailed_category+"&highlights="+str_highlights+""
		});	
	});
		
	//分享点击
	$(".ibody_bd").on("mouseenter",".shareBtn a",function(){
		var that = $(this).parent().parent();
		$(this).parent().remove();
		that.append(share_string_app)
	});
	$(".ibody_bd").on("mouseleave",".share",function(){
		var that = $(this).parent();
		$(this).remove();
		that.append(shareBtn_string_app)
	});

	//定制点击
	$("#customized_btn").click(function(){
		$(this).dialog({
			dialogborder:'solid 1px #666',
			width : "950",
			height: "600",
			content:"iframe:customized.html"
		});
	});

	$("#export_icon").click(function(){
		$(this).dialog({
			dialogborder:'solid 1px #666',
			width : "900",
			height: "518",
			content:"iframe:publicopinion_export.html?lcode="+lcode+""
		});
	});
	
	//刷新点击
	$("#refresh_btn").click(function(){
		window.location.href="http://localhost:30719/yuqing/default/publicopinion/PublicOpinion.html";
	});
	
	//搜索下拉智能
	/*$("#selectTxt").autocomplete(url,{
		minChars: 1,
		delay:100,
		cacheLength:500,
		width:295,
		max: 100,
		scrollHeight:150,
		ajaxfun:'',
		dataType:'jsonp',
		matchCase:true,
		callformatdelay:true, // 延缓浮层显示时间，让ajax数据完毕      
		matchContains: false,
		formatRequesturl:function(q){ 
			var q = q.replace(/(\s| )/gi,'');
			return "pinyin:*"+encodeURIComponent(q.toUpperCase())+"*+code:*"+encodeURIComponent(q)+"*+title:*"+encodeURIComponent(q)+"*&start=0&rows=100&fl=id,title,code&sort=code%20asc";
		},
		matchContains: false,
		formatItem: function(row, i, max) {
			if(row.code){
				return "<div style='cursor:pointer;text-indent:5px;' class='ac_div' ><span class='fn-left width2'>"+row.code+"</span><span class='fn-left width8'>"+row.title+"</span></div>";     
			}else{
				return "<div style='cursor:pointer;text-indent:5px;' class='ac_div' ><span class='fn-left width2'>非上市</span><span class='fn-left width8'>"+row.title+"</span></div>";
			}
			
		}
	}).result(function(event, row, formatted) {
		//将数据返回到文本框后处理方法添加与此
	});*/
	
	$("#data_btn").click(function(){
		$(this).datapicker({
			callback:function(date){
				dateAjax(date);
			}
		});
	});
	
	
	$("#calendartext").val(nowTime);
	
	//tab标签点击
	$("#i_tab").on("click",".itab",function(){
		skip = "0";
		source = sourceArr[$(this)[0].dataset.source];
		$(this).siblings().addClass("itab_unslt");
		$(this).removeClass("itab_unslt");
		url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");
		gWebSo(httproot,wsport,url,1);
	});
	
	
	//showload();
	//绑定事件
	$("#main_content").bind("scroll", function(){ 
		//当滚动条滚动时
		scrollWebSo($(this));		
	}); 
	
	//右边点击
	$("#customer_name").on("click","a",function(){
		skip = "0";
		lcode = $(this).attr("data-lcode");
		url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");
		
		gWebSo(httproot,wsport,url,1);
	});
	
	//tab标签点击
	$("#i_tab").on("click",".itab",function(){
		source = sourceArr[$(this)[0].dataset.source];
		$(this).siblings().addClass("itab_unslt");
		$(this).removeClass("itab_unslt");
	});

});

window.onresize=function(){
	reload();
}

function dateAjax(date){
	var _date = date.split("-");
	skip = "0";
	time = ""+_date[0]+_date[1]+_date[2]+"235959,30";
	url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");
	gWebSo(httproot,wsport,url,1);
}

function reload(){
	var htmlH = $("html").height();
	var htmlW = $("html").width();
	$("#main_content").height( htmlH - 44 );
	$("#customer_name").height( htmlH - 44 );
	$(".left_box").height( htmlH - 44 );
	
	if(htmlW<=1600){
		$("#main_content").width( htmlW - 342 );
	}
	
	
	
	//计算隐藏显示按钮的top高度
	var r_height = $("#customer_name").height();
	$(".open_mark").css("top",(r_height-100)/2);
	$(".close_mark").css("top",(r_height-100)/2);
	//定位图标
	$("#export_icon").css("left",(parseFloat($("#main_content").offset().left)+$("#ibody_bd").width()-30));
	
	
	//鼠标上移显示滚动条
	var main_content = new mouse("main_content");
	main_content.Hover(); 
	$("#main_content").hover(function(){
		$("#ibody_bd").css("margin-right","12px");
	},function(){
		$("#ibody_bd").css("margin-right","20px");
	});
	var customer_name = new mouse("customer_name");
	customer_name.Hover();
	
}

/*循环生成舆情新闻的方法*/
function createPublicOp(data,str_highlights,type,scroll){
	if(scroll!=1){
		//非滚动加载是不清空
		$("#ibody_bd").empty();
	}else{
		
	}
	switch(type){
		case 1://重要，全部
			for(var x in data){
				data[x][3] = data[x][3] ? data[x][3] : "&nbsp;";
				data[x][2] = data[x][2] ? data[x][2] : "&nbsp;";
				data[x][4] = data[x][4] ? data[x][4] : "&nbsp;";
				data[x][5] = data[x][5] ? data[x][5] : "&nbsp;";
				$(".ibody_bd").append('<div class="poitem itembg"><div class="poitembd"><div class="poitemtitle"><div class="fn-left nowwraps left_width ellip"><a href="javascript:;" dialog_detailed_id="'+data[x][0]+'" dialog_detailed_category="'+data[x][1]+'" title='+data[x][2]+' >'+FormatRedresult(str_highlights,data[x][2])+'</a></div><div class="fn-left nowwraps right_title"><span class="ellip" title='+data[x][3]+'>'+data[x][3]+'</span><span class="ellip" title='+data[x][5]+'>'+data[x][5]+'</span><span class="ellip">'+timeHandle.date(data[x][4])+'&nbsp;&nbsp;'+timeHandle.time(data[x][4])+'</span></div><div class="clear"></div></div><div class="poitembody"><a dialog_detailed_id="'+data[x][0]+'" dialog_detailed_category="'+data[x][1]+'" href="javascript:;">'+FormatRedresult(str_highlights,$.trim(data[x][6]))+'</a></div> </div></div>');
				//转发，评论等功能
				/*<div class="shareBtn"><span class="fs1" aria-hidden="true" data-icon="&#xe023;"><font>1000</font></span><span class="fs1" aria-hidden="true" data-icon="&#xe022;"><font>1000</font></span><span class="fs1" aria-hidden="true" data-icon="&#xe024;"><font>1000</font></span></div>*/
			}
		break;		
	}
}

//数据产生并加载
function gWebSo(httproot,wsport,url,type,scroll){
	new gWebSocket(httproot,wsport,url,function(data){
		var data_opinions = data["opinions"];		
		data_highlights = data["highlights"];
		str_highlights = "";
		for(var i=0;i<data_highlights.length;i++){
			str_highlights += data_highlights[i];
		}
		createPublicOp(data_opinions,str_highlights,type,scroll);		
	}).getSocket();
}


var lazyheight = 0; 
 

//滚动条加载事件
function scrollWebSo(obj){ 
	lazyheight = parseFloat(obj.height()) + parseFloat(obj.scrollTop()); 
	nScrollHight = obj[0].scrollHeight;
	if ( nScrollHight - 100 <= lazyheight) { 
		skip = ""+(parseInt(skip) + parseInt(amount));
		url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");
		gWebSo(httproot,wsport,url,1,1);
	} 
} 

//机构名称
function organName(id,name){
	$(".ititle2").attr("organId",id);
	$(".ititle2").text(name);
}