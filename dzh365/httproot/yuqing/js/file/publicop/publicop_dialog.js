var temp = window.location.href;
if(temp != null){
	dialog_detailed_id = temp.split("?")[1].split("&")[0].split("=")[1];
	dialog_detailed_category = temp.split("?")[1].split("&")[1].split("=")[1];
	str_highlights = decodeURI(temp.split("?")[1].split("&")[2].split("=")[1]);
}

var dialogUrl = '/proxy/myalpha.gw.com.cn/proxy.php?url='+escape('http://myalpha.gw.com.cn/profterm/getPublicSentimentDetail?id='+dialog_detailed_id+'&category='+dialog_detailed_category+'&hasSummary=true');


var zlibUrl="";

var downloadurl = "";

$(function(){
	var gWebSo = new gWebSocket(httproot,wsport,dialogUrl,function(data){
		for(var x in data){
			switch(data[x][0]){
				case 'C1': // ÐÂÎÅID
					$(".dialog_title span").first().attr("news-id",data[x][1]);
				break;
				case 'C3': // ÐÂÎÅ±êÌâ
					$(".dialog_title span").first().append(FormatRedresult(str_highlights,data[x][1]));
					$(".dialog_title span").first().attr("title",data[x][1]);
				break;
				case 'C4': // ÐÂÎÅÄÚÈÝ
					zlibUrl = '/proxy/myalpha.gw.com.cn/proxy.php?url='+escape('http://myalpha.gw.com.cn/profterm/getPublicSentimentZLIB?url='+data[x][1]);
					new gWebSocket(httproot,wsport,zlibUrl,function(data){
						var content ;
						if(data['content'].indexOf('<body>') != -1 && data['content'].charCodeAt(6) == 0){
							content = '<body>'+data['content'].substr(7);
							}else{
							content = data['content'];
						}
						for(var x in data){
							$("section ul").empty();
							var hilghtsStr = FormatRedresult(str_highlights,content);
							$("section ul").append(hilghtsStr);
						}
					}).getSocket();
				break;
				case 'C5': // ×÷Õß
				break;
				case 'C6': // ÐÂÎÅÊ±¼ä
					$(".dialog_date span").eq(0).text(timeHandle.date(data[x][1]));
					$(".dialog_date span").eq(1).text(timeHandle.time(data[x][1]));
				break;
				case 'C8': // ÐÂÎÅÀ´Ô´				
					$(".dialog_date span").eq(2).text(data[x][1]);
				break;
				case 'C12': // ÏÂÔØ
					var suffix = data[x][1].split(".");
	 					var cla = "";
	 					if(suffix.length > 1){
 							switch(suffix[suffix.length-1].toUpperCase()){
	 							case 'TXT':
	 								downloadurl = suffix;
	 							break;
	 							case 'PDF':
	 								downloadurl = suffix;
	 							break;
	 							case 'DOC':
	 							case 'DOCX':
	 								downloadurl = suffix;
	 							break;
	 							case 'XLS':
	 							case 'XLSX':
	 								downloadurl = suffix;
	 							break;
	 							case 'JPG':
	 							break;
 							}
	 						
		 					$(".edit_dialog div").first().attr("downloadurl",data[i][1]);
	 					}
	 					break;
				break;
				case 'C15': // ÕªÒª
				break;
			}
		}
	}).getSocket();
	
	
	$("header").on("click",".close_dialog",function(){
		dialogRemove();
	});
	document.addEventListener("keydown",function(e){
		var keycode = e.keyCode;  
		if(keycode=="27"){
			dialogRemove();
		}		
	});
	
	$("header").on("click","ul li",function(i){		
		var _size = $("section").css("font-size");
		if($(this).children().size()==0){
			if($(this).text()=="B"){
				$(this).addClass("cur").next().removeClass("cur");
				w2b();
			}else {
				$(this).addClass("cur").prev().removeClass("cur");
				b2w();
			}
		}else{
			if($(this).attr("num")=="19"){
				$(this).addClass("cur").next().removeClass("cur");
				if(_size.substring(0,2)<=18){
					$("section").css("font-size",parseInt(_size.substring(0,2))+2);
				}
			}else{
				$(this).addClass("cur").prev().removeClass("cur");
				if(_size.substring(0,2)>=12){
					$("section").css("font-size",_size.substring(0,2)-2);
				}
			}
		}
	});
	
	
	var dialog_content = new mouse("dialog_content");
	dialog_content.Hover(); 

	//下载功能
	$(".edit_dialog div").first().click(function(){
		if($.browser.webkit && window.external && window.external != '' && typeof(window.external.download) == 'function'){
			window.external.download("dzh://FILEMGR?FILE="+$(this).attr("downloadurl").split(".")[0]+"&LINK="+$(this).attr("downloadurl")+"&SAVEAS="+$(this).attr("downloadurl").split(".")[0]+"&SHOWUI=true");
		}	
	});
});


function b2w(){
	$("html").css("background-color","#fff");
	$("header").css("background-color","#fff");
	$("section").css("background-color","#fff");
	$("footer").css("background-color","#fff");		
	$("header ul li").css("background-color","#fff");
	$("header ul li.cur").css("background-color","#dbdbdb");
	$("header").css("color","#000");	
	$(".dialog_date").css("color","#000");
	$("section").css("color","#101010");
	$("footer").css({"color":"#666","border-top-color":"#ccc"});
	$("footer div").css("color","#ccc");
	$(".dialog_time").css("border-bottom-color","#ccc");
	$("footer div").hover(function(){$(this).css("color","#333")},function(){$(this).css("color","#ccc")})
	$("header ul li").each(function(){
		$(this).attr("style","");
	});
}

function w2b(){
	$("html").css("background-color","#252525");
	$("header").css("background-color","#252525");
	$("section").css("background-color","#252525");
	$("footer").css("background-color","#252525");	
	$("header ul li").css("background-color","#252525");
	$("header ul li.cur").css("background-color","#999999");
	$("header").css("color","#f7f7f7");
	$(".dialog_date").css("color","#999");
	$("section").css("color","#ccc");
	$("footer").css({"color":"#999","border-top-color":"#424242"});	
	$("footer div").css("color","#999");	
	$(".dialog_time").css("border-bottom-color","#424242");
	$("footer div").hover(function(){$(this).css("color","#999")},function(){$(this).css("color","#fff")});
	$("header ul li").each(function(){
		$(this).attr("style","");
	});
}


