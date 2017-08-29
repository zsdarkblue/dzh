/*
    @name: publicopinion
    @作用: 舆情导出Js
	@时间: 2013年6月4日
	@作者: 冯静华
*/
var sourceArr = [
"1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19",//重要,重要
"11#12",//微博
"1#3#9" //平媒
];
var lcode ="";
var source,skip,amount,nowTime,time,rowtype,url;
var orag_hidden = [];
		
$(function(){
	
	reload();
	lcode = window.location.href.split("?lcode=")[1];
	source = sourceArr[0];
	skip = "0";
	amount = "20";
	thisMonth = (thisMonth < 10) ? "0"+thisMonth : thisMonth;
	thisDate = (thisDate < 10) ? "0"+thisDate : thisDate;
	nowTime = thisYear+"-"+thisMonth+"-"+thisDate;
	time = ""+nowTime.split("-")[0]+nowTime.split("-")[1]+nowTime.split("-")[2]+"235959,30";
	rowtype = "1,2,3,6";
	url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");

	//获取列表数据
	new gWebSocket(httproot,wsport,url,function(data){
		var data_opinions = data["opinions"];
		$("#section_ul").empty();
		for(var x in data_opinions){
			$("#section_ul").append('<li><div class="fn-left title"><div class="checkboxbd"><div class="unchecked"></div ></div><div titleOrg='+data_opinions[x][0]+','+data_opinions[x][1]+' class="fn-left width90 ellip">'+data_opinions[x][2]+'</div></div><div class="fn-right date_time ellip">'+timeHandle.date(data_opinions[x][3])+'&nbsp;'+(timeHandle.time(data_opinions[x][3]))+'</div></li>');
		}
	}).getSocket();
	
	top.document.addEventListener("keypress",function(e){
		var keycode = e.keyCode;  
		if(keycode=="27"){
			dialogRemove();
		}		
	});
	
	//checkbox点击效果
	$("section article").on("click",".unchecked",function(){
		//判断是否存在子节点
		var _size = $(this).children().size();
		var _title = '';
		if(_size==0){
			$(this).append('<div class="fs1 fn-left checked" aria-hidden="true" data-icon="&#xe01a;"></div>');			
			if($(this).parent().next().hasClass("sec_title")){
				//标题的勾选选中的话，则全部选中状态
				$("section article").find(".unchecked").append('<div class="fs1 fn-left checked" aria-hidden="true" data-icon="&#xe01a;"></div>');	
			}
		}else{
			//移除节点
			$(this).empty();
			if($(this).parent().next().hasClass("sec_title")){
				//标题的勾选选中的话，则全部选中状态
				$("section article").find(".unchecked").empty();	
			}
		}
	});

	//生成报告
	$(".pinkbtn").click(function(){
		$(".checked").each(function(){
			$("#section_ul").parent().append('<input type="hidden" value="'+$(this).parent().parent().next().attr("titleorg")+'" name="cid[]" />');
		});
		$("#export_title").val($("#export_textarea").text());
		if($(".checked").length>=1){
			$("#myform").submit();
		}else{
			return false;
		}
	});

	//绑定事件
	$("#section_ul").bind("scroll", function(){ 
		//当滚动条滚动时
		scrollWebSo($(this));		
	}); 
	//取消
	$(".balckbtn").click(function(){
		dialogRemove();
	});
	//关闭
	$(".close_btn").click(function(){
		dialogRemove();
	});
	
});

window.onresize=function(){
	reload();
}


function reload(){
	var htmlH = $("html").height();
	var htmlW = $("html").width();
	var section_ul_h = htmlH - 59;
	$("#section_ul").height(section_ul_h);
	$("section aside").height(htmlH-18);
}

//滚动条加载事件
function scrollWebSo(obj){ 
	lazyheight = parseFloat(obj.height()) + parseFloat(obj.scrollTop()); 
	nScrollHight = obj[0].scrollHeight;
	if ( nScrollHight - 100 <= lazyheight) { 
		skip = ""+(parseInt(skip) + parseInt(amount));
		url = "/proxy/myalpha.gw.com.cn/proxy.php?url="+escape("http://10.15.92.232:8099/gweb-yuqing/getInTaiwanData?lcode="+lcode+"&skip="+skip+"&amount="+amount+"&time="+time+"&source="+source+"&rowtype="+rowtype+"");
		//获取列表数据
		new gWebSocket(httproot,wsport,url,function(data){
			var data_opinions = data["opinions"];
			for(var x in data_opinions){
				$("#section_ul").append('<li><div class="fn-left title"><div class="checkboxbd"><div class="unchecked"></div ></div><div titleId='+data_opinions[x][0]+' class="fn-left width90 ellip">'+data_opinions[x][2]+'</div></div><div class="fn-right date_time ellip">'+timeHandle.date(data_opinions[x][3])+'&nbsp;'+(timeHandle.time(data_opinions[x][3]))+'</div></li>');
			}
		}).getSocket();
	} 
} 