/**
 * 工具类
 */
//自定义公共方法类
define("stock/MicroStrategy/resources/linkPage/createMicroUtil", ["dijit/registry","dojo/_base/config","dojo/date/locale","dojo/dom","dojo/request/xhr","dojox/store/GridSOStore", 
        "dojox/slickgrid/slickgrid", "dojo/io-query","dojo/date","dojo/dom-attr"], 
		function(registry,config,locale,dom,xhr,GridSOStore,slickgrid,ioQuery,date,domAttr) {
	var _util ={};
	
	_util.getDateStr = function(){
		var d = new Date();
		return d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
	}
	
	//获取用户信息
	_util.getUserInfo = function(){
		var myGrid = new slickgrid({
			store : new GridSOStore(), 
			queryLimit:{
			}
		},"");
		
		//送个随机数，则大智慧客户端不会取缓存数据
		var parameter = {
				userId : config.dzhUserId,
				randNum : Math.random()
		}
		myGrid.renderQuery({
			service:'rpc',
			so:'javadataproxy.jar',
			'function':'gw/UIMain',
			paraencode:'base64',
			parameter:"Z2V0," + btoa(config.dzhURL+"/MicroStrategyBG/createMicro/getUserTypAndOrg?"+ioQuery.objectToQuery(parameter)),
			response_times:1,
			response_mode:0
		}).then(function(msg){
			//用户类型
			var userTypArr = [];
			if(msg.getLength()>0){
				var uId = msg.getItem(0)[0];
				var uName = msg.getItem(0)[1];
				var typ = msg.getItem(0)[2];
				var org = msg.getItem(0)[3];
				
				if(uName!="null" && uName.replace(/^\s\s*/,'')!=''){
					dijit.byId("budManName").set("value",uName);
					dijit.byId("budManName").set("readOnly",true);
				}
				//如果用户有类型，则直接显示，不让选择。否则可以选择
				if(typ!="null" && typ.replace(/^\s\s*/,'')!=''){
					if(typ=="普通用户"){
						userTypArr.push({label:typ,value:"2"});
					}else if(typ=="分析师"){
						userTypArr.push({label:typ,value:"1"});
					}else if(typ=="投资顾问"){
						userTypArr.push({label:typ,value:"3"});
					}
					registry.byId("userTypSelect").addOption(userTypArr);
					dijit.byId("userTypSelect").set("readOnly",true);
				}else{
					userTypArr = [{label:'请选择用户类型',value:""},
				                  {label:'普通用户',value:2},
				                  {label:'分析师',value:1},
				                  {label:'投资顾问',value:3}
				                  ];
					registry.byId("userTypSelect").addOption(userTypArr)
				}
				if(org!="null" && org.replace(/^\s\s*/,'')!=''){
					dijit.byId("userOrg").set("value",org);
					dijit.byId("userOrg").set("title",org);
					dijit.byId("userOrg").set("readOnly",true);
				}
			}else{
				//用户类型
				var userTypArr = [{label:'请选择用户类型',value:""},
				                  {label:'普通用户',value:2},
				                  {label:'分析师',value:1},
				                  {label:'投资顾问',value:3}
				                  ]
				registry.byId("userTypSelect").addOption(userTypArr)
			}
		});
	}
	
	/**设置默认值*/
	_util.setValues = function(){
		
		this.getUserInfo();
		
		//策略类型
		var microTypArr = [{label:'请选择策略分类',value:""},
		                {label:'指数跟踪T51',value:'T51'},
		                {label:'事件驱动T52',value:'T52'},
		                {label:'技术指数T53',value:'T53'},
		                {label:'稳健收益T53',value:'T54'},
		                {label:'事件驱动T55',value:'T55'}
		                ];
		//策略风格
		var microStyleArr = [{label:'稳健',value:'1'},
		                     {label:'激进',value:'2'},
		                     {label:'进取',value:'3'},
		                     {label:'保守',value:'4'}
		                    ];
		
		dojo.byId("textfield").value="此功能暂未开放";
		dojo.byId("textfield002").value="此功能暂未开放";
		registry.byId("microTypSelect").addOption(microTypArr);//设置策略类型下拉列表
		registry.byId("microStyleSelect").addOption(microStyleArr);//设置策略风格下拉列表
		dojo.byId("buldTimeDiv").value= this.getDateStr();//设置策略创建时间文本框
		
		//成分股创建时间
		var rxsjArr = dojo.query(".rxsj");
		for(var i=0;i<rxsjArr.length;i++){
			dijit.registry.byNode(rxsjArr[i]).set("value",this.getDateStr());
		}
		//日期只能选择。不能输入
		domAttr.set(dijit.byId("DateTextBox_end").focusNode,"disabled",true)

	}
	
	/**验证数据完整性*/
	_util.checkValues = function(){
		if(!config.dzhUserId || config.dzhUserId == ""){
			return "获取用户ID失败,请重新打开此页面";
		}
		if(!dijit.byId("budManName").get("value") || dijit.byId("budManName").get("value") == ""){
			return "创建人姓名不能为空";
		}
		if(!(dijit.byId("userTypSelect").get("value") >=1 && dijit.byId("userTypSelect").get("value")<=3)){
			return "请选择用户类型";
		}
		if(!dijit.byId("userOrg").get("value") || dijit.byId("userOrg").get("value") == "" ){
			return "所属机构不能为空";
		}
		if(!dijit.byId("microTypSelect").get("value") || dijit.byId("microTypSelect").get("value") == ""){
			return "请选择策略分类";
		}
		if(!dijit.byId("strategyName").get("value") || dijit.byId("strategyName").get("value").length < 3 || dijit.byId("strategyName").get("value").length>10){
			return "策略名称只能为3-10个字符";
		}
		if(!dijit.byId("description").get("value") || dijit.byId("description").get("value") ==""){
			return "策略说明不能为空!";
		}
		
		
		//总权重
		var totalWeight = 0;
		var stockOneFlag = false;//是否含有1只成分股
		//验证成分股的数据完整性
		for(var i=1;i<=5;i++){
			var stockArr = dojo.query(".stk"+i);
			if(stockArr&&stockArr.length && stockArr.length>0){
				stockOneFlag = true;
				var tmpObj = {};
				for(var j=0;j<stockArr.length;j++){
					var stockDojo = dijit.registry.byNode(stockArr[j]);
					tmpObj[stockDojo.get("name")] = stockDojo.get("value");
				}
				if(!tmpObj.stockCode || tmpObj.stockCode.length<=0){
					return "成分股的股票代码不能为空";
				}
				if(!tmpObj.stockName || tmpObj.stockName.length<=0){
					return "成分股的股票名称不能为空";
				}
				//成分股买入价不能为空，且手工输入的买入价必须大于0
				if(!tmpObj.buyingPrice || !tmpObj.buyingPrice.length || tmpObj.buyingPrice.length<=0 ){
					return "成分股买入价不能为空"
				}else if(tmpObj.buyingPrice!='当日收盘价' 
								&& tmpObj.buyingPrice!='次日开盘价' 
								&& tmpObj.buyingPrice!='次日收盘价' 
								){
					if(!(tmpObj.buyingPrice>0))
					return "手工输入的成分股买入价必须大于0";
				}
				if(!tmpObj.weight || !(tmpObj.weight.length>0)){
					return "成分股权重不能小于0";
				}
				totalWeight += tmpObj.weight*1;//乘以1可以转化成数字类型
				if(tmpObj.zytj && tmpObj.zytj.length && tmpObj.zytj.length>0 && !(tmpObj.zytj>0)){
					return "成分股止盈条件必须大于0";
				}
				if(tmpObj.zstj && tmpObj.zstj.length && tmpObj.zstj.length>0 && !(tmpObj.zstj>0)){
					return "成分股止损条件必须大于0";
				}
				if(!tmpObj.chosenReasons || tmpObj.chosenReasons.length<=0){
					return "成分股入选理由不能为空"
				}
			}
		}
		
		if(!stockOneFlag){
			return "微策略必须含有至少一支成分股";
		}
		if(totalWeight>100 || totalWeight<=0){
			return "成分股权重总和须在0~100%之间";
		}
		
		console.log("totalWeight:"+totalWeight);
		return "";
	}
	
	//提交按钮的动作
	_util.addButEvt = function(){
		//添加图片的点击动作
		this.addDeleteStkRowEvt();
		//添加提交按钮的点击动作
		this.submitButEvt();
		//取消按钮的点击动作
		this.cancelButEvt();
		//输入股票代码时自动填入股票名称
		this.getStkName();
		//上传文件的点击事件
		this.microStrategyInputOnClick();
		//注册关闭弹框的时间
		this.closeDialog();
		
		//设置不能手动选择的input背景色
		dojo.query(".txtGray").style('background',"rgb(230, 230, 230)");
		
		dojo.connect(dijit.registry.byId("DateTextBox_end"),"onChange",function(){
			var a = dijit.registry.byId("DateTextBox_start").value;
			var b = dijit.registry.byId("DateTextBox_end").value;
			
			if(date.compare(a,b)==1){
				alert("结束日期必须大于起始日期");
				var n = (new Date(a)).getTime() + 1 * 24 * 60 * 60 * 1000;
				var  result= new Date(n);
				dojo.byId("DateTextBox_end").value = locale.format(result, {selector:"date", datePattern:'yyyy/M/d'})
			}
			
		});
		
		dojo.connect(dijit.registry.byId("userTypSelect"),"onChange",function(){
			if(dijit.registry.byId("userTypSelect").value==2){
				dojo.byId("userOrg").value = "普通投资者";
				dojo.byId("userOrg").readOnly = true;
			}else{
				dojo.byId("userOrg").value = "";
				dojo.byId("userOrg").readOnly = false;
			}
		});
		
		dojo.connect(dojo.byId("yongjiuyouxiao"),"onclick",function(e){
			if(dojo.byId("yongjiuyouxiao").attributes[8].value =="true"){
				dojo.byId("DateTextBox_end").value = "";
				dijit.byId("DateTextBox_end").set("readOnly",true);
			}else{
				var a = dijit.registry.byId("DateTextBox_start").value;
				var n = (new Date(a)).getTime() + 86400000;
				var  result= new Date(n);
				dojo.byId("DateTextBox_end").value = locale.format(result, {selector:"date", datePattern:'yyyy/M/d'})
				dijit.byId("DateTextBox_end").set("readOnly",false);
			}
		});
	
		
		
	}
	
	_util.closeDialog = function(){
		var h = dijit.registry.byId("dialog_2").hide;
		dojo.connect(dijit.registry.byId("dialog_2"),"hide",function(){
			_util.closeBrowser();
		})
	}
	
	_util.microStrategyInputOnClick = function(){
//		dojo.connect(dijit.registry.getEnclosingWidget(dojo.byId("uploadPhotoFileTextfield")),"onClick",function(){
//			dojo.byId("uploadPhotoFile").click();
//		});
//		dom.byId("uploadPhotoFile").onchange = function(){
//			dojo.byId("textfield").value=dom.byId("uploadPhotoFile").value;
//			dojo.byId("textfield").title=dom.byId("uploadPhotoFile").value;
//		};
//		
//		dojo.connect(dijit.registry.getEnclosingWidget(dojo.byId("uploadAttFileTextfield")),"onClick",function(){
//			dojo.byId("uploadattFile").click();
//		});
//		dom.byId("uploadattFile").onchange = function(){
//			dojo.byId("textfield002").value=dom.byId("uploadattFile").value;
//			dojo.byId("textfield002").title = dom.byId("uploadattFile").value;
//		};
		
		
	}
	
	/**自动获取股票名称*/
	_util.getStkName = function(){
		var nodeArr = dojo.query(".stkCodeKeyBoard");
		for(var i=0;i<nodeArr.length;i++){
			var node = dijit.registry.getEnclosingWidget(nodeArr[i]);
			dojo.connect(node,"onChange",function(){
				var code = this.get("value");
				var sNameId = this.get("id")+"Name";
				
				if(this.get('item') && this.get('item').name){
					dijit.registry.byId(sNameId).set("value",this.get('item').name);
				//如果取不到对应名称，则清空股票名称
				}else{
					dijit.registry.byId(sNameId).set("value",'');
				}
			})
		}
	}
	
	_util.submitButEvt = function(){
		dojo.connect(dojo.byId("subBut"),"click",function(){
			var checkRes = _util.checkValues();
			if(checkRes.length && checkRes.length > 0){
				alert(checkRes);
				return ;
			};
			
			var myGrid = new slickgrid({
				store : new GridSOStore(), 
				queryLimit:{
				}
			},"");
			
			//送个随机数，则大智慧客户端不会取缓存数据
			var parameter = {
					subInfo : encodeURI(_util.getJsonDatas()),
					randNum : Math.random()
			}
			myGrid.renderQuery({
				service:'rpc',
				so:'javadataproxy.jar',
				'function':'gw/UIMain',
				paraencode:'base64',
				parameter:"Z2V0," + btoa(config.dzhURL+"/MicroStrategyBG/createMicro/create?"+ioQuery.objectToQuery(parameter)),
				response_times:1,
				response_mode:0
			}).then(function(msg){
				//永远只显示成功
				dijit.registry.byId("dialog_2").show();
			});
		});
	}
	
	/**将参数转化成JSON数据传给后台*/
	_util.getJsonDatas = function(){
		var microArr = dojo.query(".microStrategyInput");
		var a = {};
		//用户ID
		a.authorId = config.dzhUserId;
		for ( var i = 0; i < microArr.length; i++) {
			var node = dijit.registry.byNode(microArr[i]);
			var nodeName = node.get("name");
			//策略开始和结束时间
			if(nodeName== "affectStartDate" || nodeName=="affectEndDate"){
				a[nodeName] = locale.format(node.get('value'), {selector:"date", datePattern:'yyyy-MM-dd HH:mm:ss'});
			//策略创建时间
			}else if(nodeName=="createDate"){
				var d = new Date(node.get('value'));
				a[nodeName] = locale.format(new Date(), {selector:"date", datePattern:'yyyy-MM-dd HH:mm:ss'})
			}else{
				a[node.get("name")] = node.get("value");
			}
		}
		
		a.stockList = [];
		for(var i=1;i<=5;i++){
			var stockArr = dojo.query(".stk"+i);
			if(stockArr&&stockArr.length && stockArr.length>0){
				var tmpObj = {};
				for(var j=0;j<stockArr.length;j++){
					var node = dijit.registry.byNode(stockArr[j]);
					var nodeName = node.get("name");
					if(nodeName=="selectedTime"){//入选时间为日期，转换格式
						var d = new Date(node.get('value'));
						tmpObj[nodeName] = locale.format(new Date(), {selector:"date", datePattern:'yyyy-MM-dd HH:mm:ss'})
					}else{
						tmpObj[nodeName] = node.get("value");
					}
				}
				//股票代码为空的，不要
				if(tmpObj.stockCode && tmpObj.stockCode.length>0){
					a.stockList.push(tmpObj);
				}
			}
		}
		console.log(a);
		 return JSON.stringify(a);
	}
	
	_util.addDeleteStkRowEvt = function(){
		dojo.query(".deleteBut").connect("onclick", function(e){
			var divId = "";
			if(dojo.byId("rmBut5Div")){
				divId = "rmBut5Div";
			}else if(dojo.byId("rmBut4Div")){
				divId = "rmBut4Div";
			}else if(dojo.byId("rmBut3Div")){
				divId = "rmBut3Div";
			}else if(dojo.byId("rmBut2Div")){
				divId = "rmBut2Div";
			}else{
				return
			}
			
			//删除一个股票行
			dijit.registry.byNode(dojo.byId(divId)).destroy();;
		});
	}
	
	_util.cancelButEvt = function(){
		dojo.connect(dojo.byId("cancleBut"),"onclick",function(e){
			_util.closeBrowser();
		})
	}
	//关闭浏览器
	_util.closeBrowser = function(){
		if(window.external &&  window.external.closeDialog){//关闭大智慧客户端浏览器
		     window.external.closeDialog();
		}else{
		  window.opener = null;
		  window.open('', '_self');
		  window.close();
		}
	}
	
	
	return _util;
});