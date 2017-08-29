/**
 * 策略评选加减关注
 */
// 自定义公共方法类
define("stock/MicroStrategy/resources/linkPage/microSelectionUtil", [ "dijit/registry", "dojo/_base/config",
         "dojo/date/locale","dojox/store/GridSOStore", 
         "dojox/slickgrid/slickgrid", "dojo/io-query" , "dojox/slickgrid/formatters",
         "dojox/store/MultiResultStore","dojo/store/Memory","dojo/number"
         ], function(
		registry, config, locale,GridSOStore,slickgrid,ioQuery,formatters,MultiResultStore,
		Memory,number) {
	
	var _util = {};
	
	/**opt: 1:加关注，0:减关注*/
	_util.addOrDelAttention = function(userId,microCode,opt){
			0 && console.log(userId);
			0 && console.log(microCode);
			0 && console.log(opt);
			
			if(1==opt){
				0 && console.log("加关注");
			}else if(0==opt){
				0 && console.log("减关注");
			}
			
			var optRes = _util.sendOptRequest(userId,microCode,opt);
			0 && console.log("结果:"+optRes);
	}
	
	/**发送加减关注请求*/
	_util.sendOptRequest = function(userId,microCode,opt){
		
		var myGrid = new slickgrid({
			store : new GridSOStore(), 
			queryLimit:{
			}
		},"");
		
		//送个随机数，则大智慧客户端不会取缓存数据
		var parameter = {
				userId : userId,
				microId : microCode,
				optTyp : opt,
				randNum : Math.random()
		}
		
		myGrid.renderQuery({
			service:'rpc',
			so:'javadataproxy.jar',
			'function':'gw/UIMain',
			paraencode:'base64',
			parameter:"Z2V0," + btoa(config.dzhURL+"/MicroStrategyBG/micro/changeAttentionWithRandNum?"+ioQuery.objectToQuery(parameter)),
			response_times:1,
			response_mode:0
		}).then(function(msg){
			0 && console.log(msg);
		});
	}
	/**fn:回调函数*/
	_util.addVotes = function(userId,microCode,nodeId,thisWeekDivId,fn){
		var myGrid = new slickgrid({
			store : new GridSOStore(), 
			queryLimit:{
			}
		},"");
		
		//送个随机数，则大智慧客户端不会取缓存数据
		var parameter = {
				userId : userId,
				microId : microCode,
				randNum : Math.random()
		}
		0 && console.log(config.dzhURL+"/MicroStrategyBG/microChoose/microVotes?"+ioQuery.objectToQuery(parameter))
		myGrid.renderQuery({
			service:'rpc',
			so:'javadataproxy.jar',
			'function':'gw/UIMain',
			paraencode:'base64',
			parameter:"Z2V0," + btoa(config.dzhURL+"/MicroStrategyBG/microChoose/microVotes?"+ioQuery.objectToQuery(parameter)),
			response_times:1,
			response_mode:0
		}).then(function(msg){
			//回调函数，处理页面显示问题
			fn(msg.getItem(0),nodeId,thisWeekDivId);
		});
	}
	
	_util.setUserInfo = function(userObj) {
		dojo.byId("TextBox_0").innerHTML = userObj.name;
		dojo.byId("TextBox_1").innerHTML = userObj.typ;
		dojo.byId("TextBox_2").innerHTML = userObj.org;
		dojo.byId("TextBox_3").innerHTML = userObj.qualifiedId;
	}

	_util.getInstance = function(arrObj) {

		var resArr = [];
		if (arrObj.length && arrObj.length > 0) {

			for ( var i = 0; i < arrObj.length; i++) {
				var obj = arrObj[i];
				resArr.push(this.getObj(obj));
			}
		}
		return resArr;
	}

	_util.getObj = function(obj) {
		var _tmpMicroObj = {};

		_tmpMicroObj.attFlag = obj.attFlag;
		_tmpMicroObj.buildMan = obj.buildMan;
		_tmpMicroObj.code = obj.code;
		_tmpMicroObj.id = obj.id;
		_tmpMicroObj.increaseRate = obj.increaseRate;
		_tmpMicroObj.latsWeekVotes = obj.latsWeekVotes;
		_tmpMicroObj.name = obj.name;
		_tmpMicroObj.thisWeekVotes = obj.thisWeekVotes;
		_tmpMicroObj.totalIncomeRate = obj.totalIncomeRate;
		_tmpMicroObj.voteFlag = obj.voteFlag;
		if (obj.stkList && obj.stkList.length && obj.stkList.length > 0) {
			var tmpArr = [];
			0 && console.log(obj.stkList);
			for ( var j = 0; j < obj.stkList.length; j++) {
				var tmp = obj.stkList[j];
				var tmpStk = {};
				tmpStk.microId = tmp.microId;
				tmpStk.stkId = tmp.stkId;
				tmpStk.weigth = tmp.weigth;
				tmpArr.push(tmpStk);
			}
		}
		return _tmpMicroObj;
	}
	
	
	_util.startup = function(){ 
	
		function numberFormatter(rowIndex, colIndex, value, cellObj, rowObj, gridObj){
			return number.format(value, {pattern: '###'});
		}
		
		function addColor(rowIndex, colIndex, value, cellObj, rowObj, gridObj) {
			value = number.format(value, {pattern: ',###.00'})
			if(value<0){
				return  "<div class='font-green'><b>"+value+"</b></div>";				
			}else if(value>0){
				return  "<div class='font-red'><b>+"+value+"</b></div>";
			}else{
				return "<div class='font-gray'><b>"+value+"</b></div>";
			}
		}
		
		function formatButtom(rowIndex, colIndex, value, cellObj, rowObj, gridObj){
			//已关注
			if(rowObj.attFlag==1){
				return '<button class="button focus focus001" id="'+rowObj.code+'_att" microCode="'+rowObj.code+'" style="height:20px; padding-left:15px;">已关注</button>';
				//未关注
			}else{
				return '<button class="button focus" id="'+rowObj.code+'_att" microCode="'+rowObj.code+'" style="height:20px; padding-left:15px;">未关注</button>';
			}
		}
		//投票按钮
		function formatButtom002(rowIndex, colIndex, value, cellObj, rowObj, gridObj){
			
			0 && console.log(rowObj.voteFlag+","+rowObj.userVotes)
			if(rowObj.voteFlag==1){
				return '<button class="button hand focus002" id="'+rowObj.code+'_vote"  microCode="'+rowObj.code+'" thisVotesDiv="'+rowObj.code+'_thisWeek" style="height:20px;width:50px; padding-left:20px; color:red;">'+rowObj.userVotes+'</button>';
			}else{
				return '<button class="button hand" id="'+rowObj.code+'_vote"  microCode="'+rowObj.code+'" thisVotesDiv="'+rowObj.code+'_thisWeek" style="height:20px;width:50px; padding-left:20px; color:red;">+1</button>';
			}
		}
		//为本周投票数添加ID
		function formarThisWeekVotes(rowIndex, colIndex, value, cellObj, rowObj, gridObj){
			return "<div id='"+rowObj.code+"_thisWeek'>" + number.format(value, {pattern: '###'}) + "</div>";
		}
		//为本周投票数添加ID
		function formarLastWeekVotes(rowIndex, colIndex, value, cellObj, rowObj, gridObj){
			return number.format(value, {pattern: '###'});
		}
		
		var columns = [

			{id: "number", name: "序号",formatter:formatters.index,width:28,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "code", name: "策略代码",field: "code",width:70,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "name", name: "策略名称", field: "name",width:150,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "gains", name: "昨日涨幅（%）", field: "increaseRate",formatter:addColor, width:85,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "CumulativeGain", name: "累计收益（%）",field: "totalIncomeRate",formatter:addColor,width:85,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "LastVote", name: "上周投票", field: "latsWeekVotes",formatter:formarLastWeekVotes,width:70,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "NowVote", name: "本周投票",field: "thisWeekVotes",formatter:formarThisWeekVotes,width:70,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "start2", name: "关注状态",field: "attFlag",formatter:formatButtom,width:80,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "start2", name: "投票状态",field: "voteFlag",formatter:formatButtom002,width:80,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false},
			{id: "start2", name: "创建人", field: "buildMan",width:80,headerCssClass:"font-center title_1",cssClass:'font-center',resizable:false}
		];					
		var options = {
				rowHeight:30
		};
		var parameter = {
				userId : config.dzhUserId,
				randNum : Math.random()
		}
		var myGrid = new slickgrid({ 
							store : new MultiResultStore(), 
							queryLimit:{
							}
						},"");
		0 && console.log(config.dzhURL+"/MicroStrategyBG/microChoose/getTop20?"+ioQuery.objectToQuery(parameter))
		myGrid.renderQuery({
			service:'rpc',
			so:'javadataproxy.jar',
			'function':'gw/UIMain',
			paraencode:'base64',
			parameter:"Z2V0," + btoa(config.dzhURL+"/MicroStrategyBG/microChoose/getTop20?"+ioQuery.objectToQuery(parameter)),
			response_times:1,
			response_mode:0
		}).then(function(msg){
			var tableHeight = msg[1].items.length*30+28+"px";
			dojo.query("#tableMicro").style('height',tableHeight);
			if(msg[0] && msg[0].items[0]){
				_util.setUserInfo(msg[0].items[0]);//设置分析师信息
			}
			var microStore ;
			if(msg[1] && msg[1].items){
				microStore = new Memory({data:msg[1].items});
			}else{
				microStore = new Memory({});
			}
			var microGrid = new slickgrid({store:microStore,columns:columns,options:options},"Grid_MicroStrategy");
			microGrid.startup();
			dojo.query(".focus").connect("click", function(e){
				var mCode = this.getAttribute("microCode");//获取策略代码
				var opt="";//加减关注标志(1加，0减)
				if(dojo.byId(this.id).innerHTML == "未关注"){
					opt="1";
					dojo.byId(this.id).innerHTML = "已关注";
					dojo.addClass(dojo.byId(this.id), "focus001"); 
				}else{
					opt="0";
					dojo.byId(this.id).innerHTML = "未关注";
					dojo.removeClass(dojo.byId(this.id), "focus001"); 
				}
				_util.addOrDelAttention(config.dzhUserId,mCode,opt);
			}); 
			
			dojo.query(".hand").connect("onclick", function(e){
				//投票后的回调函数
				function fn (optRes,nodeId,thisWeekDivId){
					0 && console.log(optRes.length)
					//分析师投票
					if(optRes && optRes.length && optRes.length>=2){
						//修改本周投票数
						dojo.byId(thisWeekDivId).innerHTML = optRes[0];
						//修改投票按钮
						dojo.byId(nodeId).innerHTML = "+"+optRes[1];
						dojo.addClass(dojo.byId(nodeId), "focus002");
					}else{
						alert("每天最多只能投5票且不能对同一策略重复投票!");
						return;
					}
				}
				0 && console.log("投票");
					var nodeId = this.id;
					var mCode = this.getAttribute("microCode");//获取策略ID
					var thisWeekDivId = this.getAttribute("thisVotesDiv");
					0 && console.log(thisWeekDivId);
					_util.addVotes(config.dzhUserId,mCode,nodeId,thisWeekDivId,fn);
			}); 
			
		}); 
		
	}
	
	return _util;
});