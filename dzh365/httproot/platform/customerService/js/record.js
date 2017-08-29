define(['jquery','socket'],function($){
	var isFristPage=0,allPage=1;
	var up_down = $("#up_down");
	var searchText = $("#search_text");
	var sendSelectCoditions = {
		user:window.external.getDZHProperty("userid").toLowerCase(),
		page:1, //当前页数,这页数都是时间倒序排的 1也是最后一页
		pagesize:20, //pageSize 一页的记录数
		order:-1,
		keywords:""
	};
	var historical_content = $("#historical_content");

	/***************兼聊天插入功能 *****************************/
	 window.addEventListener('message', function (e) {
		if (e.source !== this && e.source === parent && e.data != "query") {
			insertData(e.data);
		} else if(e.source !== this && e.source === parent && e.data == "query") {
			sendSelectCoditions.page = 1;
			getData(sendSelectCoditions);
			console.log(e.data);
		}
	});
	function insertData(insertData){
		var queryUrl = "/stock/sys/sys_user/message/insertUserMessage.mod";
		insetSelectCoditions ={msgdata:insertData};
		$.send(queryUrl,insetSelectCoditions).then(function(theData){
			console.log("###################################");
			console.dir(theData);
//			sendSelectCoditions.page =1;
//			sendSelectCoditions.pagesize = 20;
//			getData(sendSelectCoditions);
		});
	}
	/***************兼聊天插入功能 ************end*****************/

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
			var searchValue =searchText.attr("value");
			if(searchValue != "" && theData.length ==0){
				var nowTime = new Date();
				var FullYear = nowTime.getFullYear();
				var FullMonth = nowTime.getMonth()+1>9?nowTime.getMonth()+1:"0"+(nowTime.getMonth()+1);
				var FullDate = nowTime.getDate()>9?nowTime.getDate():"0"+nowTime.getDate();
				var FullHours = nowTime.getHours()>9?nowTime.getHours():"0"+nowTime.getHours();
				var FullMinutes = nowTime.getMinutes()>9?nowTime.getMinutes():"0"+nowTime.getMinutes();
				var FullSeconds = nowTime.getSeconds()>9?nowTime.getSeconds():"0"+nowTime.getSeconds();
				var msg_time =  FullYear.toString() + FullMonth+FullDate+FullHours+FullMinutes+FullSeconds;
				var tipsData = {
					count: "1",
					msg_content: "没有相关内容",msg_html: "没有相关内容",
					msg_time: msg_time,
					msg_type: "2",
					service_user: "大智慧搜索",
					user: "dzh"
				}
				theData.push(tipsData);
			}
			if(theData.length>0){
				refreshData(theData);
				allPage = Math.ceil(theData[0].count / sendSelectCoditions.pagesize);
				setIsFristLast(theData[0].count);
			}
		});
	}

	function refreshData(queryData){
		historical_content.empty();
		var searchValue = searchText.attr("value");
		var appendHtml = "";
		if(searchValue == ""){
			for(var i=queryData.length-1;i>=0;i--){
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
			'<div class="talked_content">'+eachdata.msg_html+'</div>';
			}
		}else{
			//搜索框不为空
			for(var i=queryData.length-1;i>=0;i--){
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
			'<div class="talked_content">'+eachdata.msg_html.replace(searchValue,'<span class="searchContent">'+searchValue+'</span>')+'</div>';
			}
		}

		historical_content.append(appendHtml);
		//设置滚动条到最底下
		historical_content[0].scrollTop = historical_content[0].scrollHeight - historical_content[0].offsetHeight;
	}

	function setIsFristLast(count){
		console.log("##############Frist_Last########");
		if(sendSelectCoditions.pagesize * sendSelectCoditions.page >= count){
			up_down.attr("data-isFrist",1);
		}else{
			up_down.attr("data-isFrist",0);
		}
		if(sendSelectCoditions.page == 1){
			up_down.attr("data-isLast",1);
		}else{
			up_down.attr("data-isLast",0);
		}
		setUpDownImg();
	}

	function setUpDownImg(){
		if(up_down.attr("data-isFrist") == 0){
			$("#beginUpImg").attr("src","./imgs/beginUp.png");
			$("#upImg").attr("src","./imgs/up.png");
		}else{
			$("#beginUpImg").attr("src","./imgs/noBeginUp.png");
			$("#upImg").attr("src","./imgs/noup.png");
		}
		if(up_down.attr("data-isLast") == 0){
			$("#downImg").attr("src","./imgs/down.png");
			$("#endDownImg").attr("src","./imgs/endDown.png");
		}else{
			$("#downImg").attr("src","./imgs/noDown.png");
			$("#endDownImg").attr("src","./imgs/noEndDown.png");
		}
	}

	function isHideXButton(){
		if(searchText.attr("value") == ""){
			$("#search_xbutton").css("display","none");
		}else{
			$("#search_xbutton").css("display","");
		}
	}

	function searchClick(){
		sendSelectCoditions.page = 1;
		sendSelectCoditions.keywords = searchText.attr("value");
		getData(sendSelectCoditions);
	}

	function eventInit(){
		$("#beginUpImg").click(function(){
			if(up_down.attr("data-isFrist") ==0){
				sendSelectCoditions.page = allPage;
				getData(sendSelectCoditions);
			}
		});

		$("#upImg").click(function(){
			if(up_down.attr("data-isFrist") ==0){
				sendSelectCoditions.page++;
				getData(sendSelectCoditions);
			}
		});

		$("#downImg").click(function(){
			if(up_down.attr("data-isLast") == 0){
				sendSelectCoditions.page--;
				getData(sendSelectCoditions);
			}
		});

		$("#endDownImg").click(function(){
			if(up_down.attr("data-isLast") == 0){
				sendSelectCoditions.page = 1;
				getData(sendSelectCoditions);
			}
		});

		$("#send").click(function(){
			//给聊天页面发信息
			parent.postMessage('close','http://kf.gw.com.cn/webchat/chatMDZH.aspx');
		});

		searchText.keyup(function(evt){
			isHideXButton();
			if(evt.keyCode == 13){
				searchClick();
			}else if(searchText.attr("value") == ""){
				sendSelectCoditions.page = 1;
				sendSelectCoditions.keywords = "";
				getData(sendSelectCoditions);
			}
		});

		$("#serch_sure").click(function(){
			searchClick();
		});

		$("#search_xbutton").click(function(){
			sendSelectCoditions.page = 1;
			sendSelectCoditions.keywords = "";
			getData(sendSelectCoditions);
			searchText.attr("value","");
			$("#search_xbutton").css("display","none");
		});
	}

	return {
		init: function(){
			sendSelectCoditions.page = 1;
//			getData(sendSelectCoditions);
			eventInit();
		},
		test: function(){
			console.log("########record.test()###############");
		}
	}
});
