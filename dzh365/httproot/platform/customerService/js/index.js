define(['jquery','socket'],function($){
	var historical_content = $("#historical_content");

	function getData(sendSelectCoditions){
		//http://10.15.97.42:8080/stock/sys/sys_user/message/showUserMessageHis.mod?user=dzh&page=1&pagesize=&order=&keywords=
		var theSendSelectCoditions = {};
		theSendSelectCoditions.user = sendSelectCoditions.user || "dzh";
		theSendSelectCoditions.page = sendSelectCoditions
		theSendSelectCoditions.order = sendSelectCoditions.order || -1;
		theSendSelectCoditions.keywords = sendSelectCoditions.keywords || "";
		theSendSelectCoditions.pagesize = sendSelectCoditions.pagesize || 50;
		var queryUrl = "/stock/sys/sys_user/message/showUserMessageHis.mod";

		$.send(queryUrl,sendSelectCoditions).then(function(theData){
			console.log("###################################");
			console.dir(theData);
			if(theData.length>0){
				appendData(theData);
			}
		});
	}

	function appendData(queryData){
		var appendHtml = "";
		for(var i=queryData.length-1;i>0;i--){
			var msgTypeClass,talkName;
			var eachdata = queryData[i];
			if(eachdata.msg_type == "1"){
				msgTypeClass = "customer_mark";
				talkName = eachdata.user;
			}else{
				msgTypeClass = "service_mark";
				talkName = eachdata.service_user;
			}
			var eachTime = eachdata.msg_time;
			appendHtml += '<div class="'+msgTypeClass+'">'+
			'<span class="talk_name">' + talkName + '<span>'+
			'<span class="talk_year">' + eachTime.slice(0,4)+'/' + eachTime.slice(4,6)+'/'+eachTime.slice(6,8)+' '+eachTime.slice(8,10)+':'+eachTime.slice(10,12)+':'+eachTime.slice(12,14)+'</span>'+
			'</div>'+
			'<div class="talked_content">'+eachdata.msg_content+'</div>';
		}

		historical_content.append(appendHtml);
		//设置滚动条到最底下
		historical_content[0].scrollTop = historical_content[0].scrollHeight - historical_content[0].offsetHeight;
	}

	function eventInit(){
		var close = $("#close");
		close.click(function(){
			window.external && external.closeDialog && external.closeDialog();
			location.replace('about:blank');
		});
	}

	function init(){
	//http://10.15.97.42:8080/stock/sys/sys_user/message/showUserMessageHis.mod?user=dzh&page=1&pagesize=&order=&keywords=
	//user:用户名 page:页，pagesize 每页显示多少 order 按时间排序 1顺序 -1倒序 keywords 关键字查询
		var sendSelectCoditions = {
			user:"dzh",
			page:1,
			pagesize:50,
			order:-1,
			keywords:""
		};
		getData(sendSelectCoditions);
		eventInit();
	}

	var theIndex = {};
	theIndex.init = init;
	return theIndex;
});


