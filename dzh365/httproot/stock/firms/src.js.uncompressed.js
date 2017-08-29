require({cache:{
'stock/firms/view/search':function(){
define([
    'dojo/_base/lang', 'dojo/aspect', 'dojo/query', 'dojo/on','stock/firms/view/digests/MD5',
    'stock/firms/view/_base', 'dojo/text!./search.html', 'dojox/slickgrid/slickgrid', 'dojox/slickgrid/controls/pager',"dojo/aspect","dojo/fx"
], function (lang, aspect, query, on, md5, _base, template, SlickGrid, Pager, coreFx) {
    return dojo.declare("stock.firms.view.search", [_base], {
        templateString:template,
		tabNum:1,
		tabFrID:1,
        postCreate:function () {
            this.bindEvent();
            this.createFilter();
            this.inherited(arguments);
        },
        createFilter:function () {
			var me=this;
            this.getSearchInitData().then(function (data) {
                data = JSON.parse(JSON.stringify(data).replace(/"typeCode":/g, '"id":').replace(/"typeName":/g, '"name":'));
                dijit.byId('hy').get('store').setData(data[0].items); //行业
				
                dijit.byId('dq').get('store').setData(data[1].items); //地区
                dijit.byId('gmzb_Year').get('store').setData(data[2].items); //年度
                dijit.byId('zclx').get('store').setData(data[3].items); //注册类型
                dijit.byId('kgqk').get('store').setData(data[4].items); //控股情况
                dijit.byId('qygm').get('store').setData(data[5].items); //企业规模
                dijit.byId('jglx').get('store').setData(data[6].items); //机构类型
                dijit.byId('zzc').get('store').setData(data[8].items); //总资产
                dijit.byId('jlr').get('store').setData(data[7].items); //利润总额
                dijit.byId('zyywsr').get('store').setData(data[8].items); //营销收入
                dijit.byId('zyywlr').get('store').setData(data[7].items); //主营收入
				dijit.byId("hy").set("displayedValue", data[0].items[0].name);
				dijit.byId("dq").set("displayedValue", data[1].items[0].name);
				dijit.byId("gmzb_Year").set("displayedValue", "");//data[2].items[0].name
				dijit.byId("zclx").set("displayedValue", data[3].items[0].name);
				dijit.byId("kgqk").set("displayedValue", data[4].items[0].name);
				dijit.byId("qygm").set("displayedValue", data[5].items[0].name);
				dijit.byId("jglx").set("displayedValue", data[6].items[0].name);
				dijit.byId("zzc").set("displayedValue", data[7].items[0].name);
				dijit.byId("jlr").set("displayedValue", data[7].items[0].name);
				dijit.byId("zyywsr").set("displayedValue", data[8].items[0].name);
				dijit.byId("zyywlr").set("displayedValue", data[8].items[0].name);
				
				dijit.byId("search").onClick();

				aspect.after(dijit.byId('table_bo_list_tablist'), 'removeChild', function () {
					var tabNum=dijit.byId("table_bo_list_tablist").containerNode.children.length;
					for(a=0;a<tabNum;a++){
			
					dijit.byId("table_bo_list_tablist").containerNode.children[a].children[1].innerHTML = "搜索结果" + (a+1);
					
						}
					me.tabNum--;
				});

            });
        },



        createPanel:function () {
            var options = this.getOptions();
			var	id = 'tab' + md5(JSON.stringify(options)),
				tabs = dijit.byId('table_bo_list'),
				panel = dijit.byId(id);
				var ifirst = false;
				if(this.tabNum == 1){
					ifirst = false;
					tabFrID=id;
				}else{
					ifirst = true;
				}
            if (!panel) {
                panel = new dijit.layout.ContentPane({
                    id:id,
                    closable:ifirst,
                    title:'搜索结果'+this.tabNum,
                    selected:true,
                    content:[
                        '<div class="vbox" style="height:100%; position:relative;">',
                        '    <div class="grid_title_box"></div>',
                        '    <div class="grid_container"></div>',
						'	 <div id="scr" style="width:100%;height: 15px;margin-top: -15px;overflow-x: scroll;position: relative;z-index: 999;overflow-y: hidden;"><div id="scrch" style="height:1px"></div></div>',
                        '    <div class="pags_btn_box"></div>',

                        '</div>'
                    ].join('')
                });
				//dojo.byId(id).style.height=cheight+"px";
				this.tabNum++;
                tabs.addChild(panel);
                this.createGrid(panel, options);
            }
            tabs.selectChild(panel);
			
        },
		
		
		dbCompany:function (evt,rwce){
			deleteRow=function(r){
				var i=r.parentNode.parentNode.rowIndex;
				document.getElementById('dbTab').deleteRow(i);
				document.getElementById('dbNumber').innerHTML=document.getElementById('dbTab').rows.length;
				if(document.getElementById('dbTab').rows.length==0){
					dojo.byId('dbcp_tab').style.display="none";
				}
			};
			deleteSc=function(r){
				var i=r.parentNode.parentNode.rowIndex;
				document.getElementById('favTab').deleteRow(i);
			};

			var targetID = evt.target.dataset.db;
			var targetName = evt.target.dataset.name;
			var node = '<tr><td id=A'+targetID+'>'+targetName+'</td><td><div class="delcp" onclick="deleteRow(this)">删除</div></td></tr>';
			var tdRow = "#dbTab #A"+targetID;
			if(rwce.cell==1 && targetID){
				dojo.byId('favcp_tab').style.display="none";
				dojo.byId('dbcp_tab').style.display="block";
			};
			if(rwce.cell==1 && targetID && dojo.query(tdRow).length==0){
				if(document.getElementById('dbTab').rows.length < 5){
					document.getElementById('dbTab').insertRow(0).innerHTML=node;
				}else{
					dijit.byId("dbOver").show();
					dijit.byId("dbOver").set("style",{"top":"200px","background":"#fff"});
					
				}
			};
			if(rwce.cell==2){//弹出收藏框
				dojo.byId('favcp_tab').style.display="block";
				dojo.byId('dbcp_tab').style.display="none";
			};
			document.getElementById('dbNumber').innerHTML=document.getElementById('dbTab').rows.length;
		},
        createGrid:function (panel, options) {
			var _search = this;
			function qymc(col,row,val,rowval,rowdata){
				var a = "<div onclick='window.location.href="+'"../../stock/qyF9/tyqc.html?code='+rowdata.companyNo+'"'+"' class='inputTit undline'>" + val + "</div>";
				return a;
			}
			function qsc(col,row,val,rowval,rowdata){
				var img ='<div style="width:100%;height:100%"><img data-db='+rowdata.companyNo+' src="../firms/resources/img/sc.png" style="width:15px;height:15px;cursor: pointer;" /></div>';
				return img;
			}
			
			function qdb(col,row,val,rowval,rowdata){
				var img ='<div style="width:100%;height:100%"><img data-db="'+rowdata.companyNo+'" data-name="▶ '+rowdata.companyName+'" src="../firms/resources/img/db.png" style="width:12px;height:12px;cursor: pointer;" /></div>';
				return img;
			}
            var grid = new SlickGrid({
                style:'width:100%;height:100%',
                store:this.getFirms(),

                columns:[
				
                    {
						id:"companyNo", 
						name:"序号", 
						formatter:function (rowIndex, colIndex, value, cellObj, rowObj, gridObj) {
                        return (grid.pager.pageNum - 1) * grid.pager.pageSize + rowIndex + 1;
							}, 
						width:35,
						headerCssClass:"font-center", 
						cssClass:"font-center"},
					{
						id:"qdb",
						name:"对比",
						formatter:qdb,
						width:35, 
						headerCssClass:"font-center ",
						cssClass:"font-center"},
					{
						id:"qsc",
						name:"收藏",
						formatter:qsc,
						width:35, 
						headerCssClass:"font-center ",
						cssClass:"font-center"},
                    {
						id:"companyName", 
						name:"企业名称", 
						field:"companyName",
						formatter:qymc,
						width:215, 
						headerCssClass:"font-center ",
						cssClass:"font-left"},
                    {
						id:"foundDate",
						name:"成立日期", 
						field:"foundDate", 
						width:90,
						headerCssClass:"font-center", 
						cssClass:"font-center"},
					{
						id:"mainProduce", 
						name:"主营产品", 
						field:"mainProduce", 
						width:200,
						headerCssClass:"font-center",
						cssClass:"font-left"},
                    {
						id:"companyScale", 
						name:"企业规模", 
						field:"companyScale",
						width:70, 
						headerCssClass:"font-center", 
						cssClass:"font-center"},
                    {
						id:"registerType", 
						name:"注册类型", 
						field:"registerType",
						width:120, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
                    {
						id:"holdingStatus", 
						name:"控股情况", 
						field:"holdingStatus",
						width:90,
						headerCssClass:"font-center",
						cssClass:"font-center"},
                    {
						id:"industryType", 
						name:"机构类型",
						field:"industryType",
						width:150,
						headerCssClass:"font-center", 
						cssClass:"font-center"},
					{
						id:"operatingStatus", 
						name:"营业状态", 
						field:"operatingStatus", 
						width:70, 
						headerCssClass:"font-center", 
						cssClass:"font-center"},
                    {
						id:"province", 
						name:"所在省市", 
						field:"province", 
						width:80, 
						headerCssClass:"font-center", 
						cssClass:"font-center"},
                    {
						id:"address", 
						name:"地址", 
						field:"address", 
						width:300, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"postcode", 
						name:"邮政编码", 
						field:"postcode", 
						width:70, 
						headerCssClass:"font-center", 
						cssClass:"font-center"},
					{
						id:"legalPerson", 
						name:"法人代表", 
						field:"legalPerson", 
						width:70, 
						headerCssClass:"font-center", 
						cssClass:"font-center"},
					{
						id:"telephone", 
						name:"电话", 
						field:"telephone", 
						width:120, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"fax", 
						name:"传真",
						field:"fax", 
						width:120, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"hostPage", 
						name:"主页", 
						field:"hostPage", 
						width:180, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"email", 
						name:"电子邮件", 
						field:"email", 
						width:150, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"firstIndustry", 
						name:"所属行业一级", 
						field:"firstIndustry", 
						width:200, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"secondIndustry", 
						name:"所属行业二级", 
						field:"secondIndustry", 
						width:200, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"thirdIndustry", 
						name:"所属行业三级", 
						field:"thirdIndustry", 
						width:200, 
						headerCssClass:"font-center", 
						cssClass:"font-left"},
					{
						id:"fourthIndustry", 
						name:"所属行业四级", 
						field:"fourthIndustry", 
						width:200, 
						headerCssClass:"font-center", 
						cssClass:"font-left"}
                ],
                options:{
                    enableColumnReorder:false,
					frozenColumn:3,
                    rowHeight:20
                },

                refresh:function (result) {
                    var tips = query(panel.domNode).query('.grid_title_box');
					document.getElementById("imgLoadingDiv").style.display = 'none';
					document.getElementById("imgLoadingDiv").style.zIndex="";
                    if (result && result.length > 1) {
                        if (!this.pager) {
                            var data = this.store.data;
                            this.store.data = null;
                            this.pager = new Pager({grid:grid, pageSize:500, totalPages:Number(result[1].items[0].TotalPage) });
                            query(panel.domNode).query('.pags_btn_box').append(this.pager.domNode);
                            this.pager.startup();
                            this.store.data = data;
                            tips.html('共 <b>' + Number(result[1].items[0].TotalCount) + '</b> 家企业');
                        }
                        this.data = result[0].items
                    } else {
                        tips.html('<span>共</span> <b>0</b> <span>家企业</span><div style="position: absolute;top:70px ;left:10px;  width:50%;height:10%;">未找到相关数据！</div>');

                    }
                    this.invalidateAllRows();
                    this.updateRowCount();
                    this.render();
                    this.options.hasCanvasVirtualLine && this.createVirtualLine();
					this.setRoller(this.id)
                },
			setRoller:function (id){
				//var idNum = id.substring(id.lastIndexOf("_")+1)-1;
				var idNum = dojo.query('.slick-viewport.slick-viewport-top.slick-viewport-right').length-1;
				var roll='scr'+id;
				var rollch='scrch'+id;
				document.getElementById('scr').id=roll;
				document.getElementById('scrch').id=rollch;
				var x = document.getElementById(roll).offsetWidth;
				
				var a = dojo.query('.slick-viewport.slick-viewport-top.slick-viewport-right')[idNum].offsetWidth;
				
				var b = dojo.query('.grid-canvas.grid-canvas-top.grid-canvas-right')[idNum].offsetWidth;
				var qyrolchildW =parseInt(x * b / a );
				document.getElementById(rollch).style.width  = qyrolchildW + "px";
				
				document.getElementById(roll).onscroll = function(){
					document.getElementById(id).children[2].children[3].scrollLeft = (a+15) * document.getElementById(roll).scrollLeft / x;
				}
			},
                renderQuery:function () {
                    //query(this.domNode).parent().addClass('grid_loading');
					document.getElementById("imgLoadingDiv").style.display = 'block';
					document.getElementById("imgLoadingDiv").style.zIndex=1;
                    options.page = this.pager ? this.pager.pageNum : 1;
                    var result = this.store.query(options);
                    if (result.then) {
                        result.then(lang.hitch(this, this.refresh));
                    } else {
                        this.refresh(result);
                    }
                    return result;
                }
            }).placeAt(query(panel.domNode).query('.grid_container')[0]);
			grid.on("click",lang.hitch(_search,_search.dbCompany));
        },


        getSelected:function (id) {
            var select = dijit.byId(id),
                value = select.item ? select.item.id : '';
            return value === 'all' ? '' : value;
        },

        getDate:function (id) {
            var input = dijit.byId(id);
            return input.value && !isNaN(+input.value) ? dojo.date.locale.format(input.value, {timePattern:'yyyyMMdd', selector:'time'}) : '';
        },
        getNum:function (id) {
            var value = dijit.byId(id).value;
            return isNaN(value) ? '' : value;
        },
        getOptions:function () {
            return {
                companyName:encodeURI(dojo.byId('comName').value.trim()), //企业名字模糊匹配(莱阳)
                industryNo:this.getSelected('hy'), //一级行业(C3)
                areaId:this.getSelected('dq'), //地区(370682)
                registerType:this.getSelected('zclx'), //注册类型(173)
                holdingStatus:this.getSelected('kgqk'), //控股情况(3)
                beginFoundDate:this.getDate('clsj_begin'), //成立开始时间(199001)
                endFoundDate:this.getDate('clsj_end'), //成立结束时间(299901)
                companyScale:this.getSelected('qygm'), //公司规模(3)
                industryType:this.getSelected('jglx'), //机构类型(3)
                beginStaffNum:this.getNum('ygrs_begin'), //最小员工数(100)
                endStaffNum:this.getNum('ygrs_end'), //最大员工数(200)
                annual:this.getSelected('gmzb_Year') ||"9999", //年度(2011) 
                totalAssets:this.getSelected('zzc') , //总资产(0-99999999)
                mainBussinessIncome:this.getSelected('zyywsr') , //销售收入(0-99999999)
                profits:this.getSelected('jlr'), //利润总额(0-99999999)
                mainBussinessProfits:this.getSelected('zyywlr'), //主营收入(0-99999999)
                LTTAAGR_begin:this.getNum('dijit_form_ComboBox_0'), //最小近三年总资产平均增长率(0)
                LTTAAGR_end:this.getNum('dijit_form_ComboBox_1') , //最大近三年总资产平均增长率(99999999)
                LTMIAGR_begin:this.getNum('dijit_form_ComboBox_2') , //最小近三年主营收入平均增长率(0)
                LTMIAGR_end:this.getNum('dijit_form_ComboBox_3') , //最大近三年主营收入平均增长率(99999999)
                LTPAGR_begin:this.getNum('dijit_form_ComboBox_4') , //最小近三年净利润平均增长率(0)
                LTPAGR_end:this.getNum('dijit_form_ComboBox_5') , //最大近三年净利润平均增长率(99999999)
                LTSHGR_begin:this.getNum('dijit_form_ComboBox_6') , //近三年资本保值增值率(0)
                LTSHGR_end:this.getNum('dijit_form_ComboBox_7'), //近三年资本保值增值率(99999999)
                p1_begin:this.getNum('dijit_form_ComboBox_8') , //最小长期资本报酬率(0)
                p1_end:this.getNum('dijit_form_ComboBox_9'), //最大长期资本报酬率(99999999)
                p2_begin:this.getNum('dijit_form_ComboBox_10'), //最小净资产收益率(0)
                p2_end:this.getNum('dijit_form_ComboBox_11') , //最大净资产收益率(99999999)
                p3_begin:this.getNum('dijit_form_ComboBox_12') , //最小总资产利润率(0)
                p3_end:this.getNum('dijit_form_ComboBox_13') , //最大总资产利润率(99999999)
                p4_begin:this.getNum('dijit_form_ComboBox_14') , //最小毛利率(0)
                p4_end:this.getNum('dijit_form_ComboBox_15') , //最大毛利率(99999999)
                p5_begin:this.getNum('dijit_form_ComboBox_16'), //最小销售净利率(0)
                p5_end:this.getNum('dijit_form_ComboBox_17') , //最大销售净利率(99999999)
                p6_begin:this.getNum('dijit_form_ComboBox_18'), //最小成本费用利润率(0)
                p6_end:this.getNum('dijit_form_ComboBox_19') , //最大成本费用利润率(99999999)
                o1_begin:this.getNum('dijit_form_ComboBox_20') , //最小总资产周转率(0)
                o1_end:this.getNum('dijit_form_ComboBox_21'), //最大总资产周转率(99999999)
                o2_begin:this.getNum('dijit_form_ComboBox_22'), //最小固定资产周转率(0)
                o2_end:this.getNum('dijit_form_ComboBox_23'), //最大固定资产周转率(99999999)
                o3_begin:this.getNum('dijit_form_ComboBox_24'), //最小流动资产周转率(0)
                o3_end:this.getNum('dijit_form_ComboBox_25'), //最大流动资产周转率(99999999)
                o4_begin:this.getNum('dijit_form_ComboBox_26'), //最小应收账款周转率(0)
                o4_end:this.getNum('dijit_form_ComboBox_27') , //最大应收账款周转率(99999999)
                o5_begin:this.getNum('dijit_form_ComboBox_28'), //最小存货周转率(0)
                o5_end:this.getNum('dijit_form_ComboBox_29') , //最大存货周转率(99999999)
                o6_begin:this.getNum('dijit_form_ComboBox_30') , //最小营业周期(0)
                o6_end:this.getNum('dijit_form_ComboBox_31'), //最大营业周期(99999999)
                r1_begin:this.getNum('dijit_form_ComboBox_32') , //最小流动比率(0)
                r1_end:this.getNum('dijit_form_ComboBox_33'), //最大流动比率(99999999)
                r2_begin:this.getNum('dijit_form_ComboBox_34'), //最小速动比率(0)
                r2_end:this.getNum('dijit_form_ComboBox_35') , //最大速动比率(99999999)
                r3_begin:this.getNum('dijit_form_ComboBox_36') , //最小利息保障倍数(0)
                r3_end:this.getNum('dijit_form_ComboBox_37') , //最大利息保障倍数(99999999)
                r4_begin:this.getNum('dijit_form_ComboBox_38') , //最小资产负债比率(0)
                r4_end:this.getNum('dijit_form_ComboBox_39') , //最大资产负债比率(99999999)
				r5_begin:this.getNum('dijit_form_ComboBox_40') , //最小产权比率(0)
                r5_end:this.getNum('dijit_form_ComboBox_41') , //最大产权比率(99999999)
                r6_begin:this.getNum('dijit_form_ComboBox_42'), //最小长期负债比率(0)
                r6_end:this.getNum('dijit_form_ComboBox_43') , //最大长期负债比率(99999999)
                g1_begin:this.getNum('dijit_form_ComboBox_44') , //最小主营业务收入增长率(0)
                g1_end:this.getNum('dijit_form_ComboBox_45') , //最大主营业务收入增长率(99999999)
                g2_begin:this.getNum('dijit_form_ComboBox_46') , //最小总资产增长率(0)
                g2_end:this.getNum('dijit_form_ComboBox_47') , //最大总资产增长率(99999999)
                g3_begin:this.getNum('dijit_form_ComboBox_48') , //最小利润总额增长率(0)
                g3_end:this.getNum('dijit_form_ComboBox_49') , //最大利润总额增长率(99999999)
                g4_begin:this.getNum('dijit_form_ComboBox_50') , //最小资本保值增值率(0)
                g4_end:this.getNum('dijit_form_ComboBox_51'), //最大资本保值增值率(99999999)
                TotalPage:'', //总页数(1)
                pageType:'', //类型(最前，最后，下一页，上一页)
                page:'1'//当前页(1)
            };
        },
        resetFilter:function () {
            //基本信息
            dijit.byId("comName").set("value", "");
            dojo.byId("clsj_begin").value = "";
            dojo.byId("clsj_end").value = "";
            dijit.byId("ygrs_begin").set("value", "");
            dijit.byId("ygrs_end").set("value", "");
			dijit.byId("hy").set("displayedValue", "全部");
			dijit.byId("dq").set("displayedValue", "全部");
			dijit.byId("zclx").set("displayedValue", "全部");
			dijit.byId("kgqk").set("displayedValue", "全部");
			dijit.byId("qygm").set("displayedValue", "全部");
			dijit.byId("jglx").set("displayedValue", "全部");
            //财务信息
            dijit.byId("gmzb_Year").set("value", "");
			dijit.byId("zzc").set("displayedValue", "全部");
			dijit.byId("jlr").set("displayedValue", "全部");
			dijit.byId("zyywsr").set("displayedValue", "全部");
			dijit.byId("zyywlr").set("displayedValue", "全部");
			for(i=0;i<=51;i++){
				var n="dijit_form_ComboBox_"+i;
				dijit.byId(n).set("value", "");
			}
        },
		cwData:function(){
			var cwop=0;
			var  a1 = dijit.byId("zzc").getValue();
			var  a2 = dijit.byId("jlr").getValue();
			var  a3 = dijit.byId("zyywsr").getValue();
			var  a4 = dijit.byId("zyywlr").getValue();
			if(a1!="" & a1!="all") cwop++;
			if(a2!="" & a2!="all") cwop++;
			if(a3!="" & a3!="all") cwop++;
			if(a4!="" & a4!="all") cwop++;
			for(i=0;i<=51;i++){
				var n="dijit_form_ComboBox_"+i;
				var b = dijit.byId(n).getValue();
				if(b!="") cwop++;
			}
			return cwop;
			
		},
        bindEvent:function () {
			//var disp=0;
			var scjData="scj0";
			var scjName="收藏夹1"
			document.getElementById("scj0").children[1].style.color="#ff0000";
            dijit.byId('search').on('click', lang.hitch(this, function () {
				var  Year = dijit.byId("gmzb_Year").getValue();
				var cw = this.cwData();
				if(cw!=0 && Year==""){
					dijit.byId("eroDialog").show();
					dijit.byId("eroDialog").set("style",{"top":"200px","background":"#fff"});
					
				} else {
					this.createPanel();
				}
				
            }));
            dijit.byId('reset').on('click', lang.hitch(this, function () {
                this.resetFilter();
            }));
			document.getElementById("favTab").onclick = function (tar) {
				var tarIndex=tar.target.parentNode.id;
				document.getElementById(scjData).children[1].style.color="#000000";
				document.getElementById(tarIndex).children[1].style.color="#ff0000";
				scjData = tarIndex;
				scjName=document.getElementById(tarIndex).children[1].innerHTML;
				
			};
			document.getElementById("dbcp").onclick = function (a) {
				
				if(dojo.byId('dbcp_tab').style.display=="none" ||dojo.byId('dbcp_tab').style.display==""){//显示对比页面
					dojo.byId('dbcp_tab').style.display="block";
					dojo.byId('favcp_tab').style.display="none";
				}else{//隐藏对比页面
					dojo.byId('dbcp_tab').style.display="none";
				}
            };
			document.getElementById("delAll").onclick = function (a) {//对比页面删除全部按钮
				for(i=0;document.getElementById('dbTab').rows.length>0;i++){
					document.getElementById('dbTab').deleteRow(0);
				}
				document.getElementById('dbNumber').innerHTML=document.getElementById('dbTab').rows.length;
				dojo.byId('dbcp_tab').style.display="none";
            };
			document.getElementById("done").onclick = function (a) {//点击确定收藏
				dojo.byId('favcp_tab').style.display="none";
				dijit.byId("favSuc").show();//显示收藏成功
				var diaText='已添加至收藏夹"'+scjName+'"！';
				dijit.byId("favSuc").set("content",diaText);
				dijit.byId("favSuc").set("style",{"top":"200px","background":"#fff"});
            };
			document.getElementById("cancel").onclick = function (a) {//点击取消收藏
				dojo.byId('favcp_tab').style.display="none";
            };
			var hid = 0;
			document.getElementById("hidTopImg").onclick =function(){
				if(hid == 0){
				//页面上半部分隐藏
					dojo.byId('searchTop').style.display="none";
					dojo.byId('hidTop').style.top='-8px';
					dojo.byId('button_top').style.top='33px';
					dojo.byId('dbcp_tab').style.top='58px';
					dojo.byId('button_left').style.top='33px';
					dojo.byId('favcp_tab').style.top='58px';
					dojo.byId('hidTopImg').src="../firms/resources/img/down.png";
					document.getElementById('hidTopImg').className='ToggleSplitterIconClosed';
					//隐藏上部后表格高度
					var tabH = document.body.clientHeight - 50 ;
					dijit.byId('table_bo_list').resize({h:tabH});
					document.getElementById('table_bo_list').style.height=(tabH + 500)+'px';
					hid =1;

				}else{
				//页面上半部分显示
					dojo.byId('searchTop').style.display="block";
					dojo.byId('hidTop').style.top='260px';
					dojo.byId('button_top').style.top='303px'; 
					dojo.byId('dbcp_tab').style.top='328px';
					dojo.byId('button_left').style.top='303px'; 
					dojo.byId('favcp_tab').style.top='328px';
					dojo.byId('hidTopImg').src="../firms/resources/img/up.png"
					document.getElementById('hidTopImg').className='ToggleSplitterIconOpen'
					var tabH = document.body.clientHeight - 320 ;
					dijit.byId('table_bo_list').resize({h:tabH});
					document.getElementById('table_bo_list').style.height=(tabH + 500)+'px';
					hid =0;
				}
			};
			
            dojo.connect(dijit.byId("btnExpand"), "onClick", function (a) {
                //debugger;
                if (this.label == "展开︾") {
                    this.setLabel("收起︽");
                    //做展开的动作
                    dojo.byId("hidd_part").style.display = "";
                } else {
                    this.setLabel("展开︾");
                    //做收起的动作
                    dojo.byId("hidd_part").style.display = "none";
                }
                dijit.byId("table_bo_list").resize();
            });

            dojo.connect(dijit.byId("btnExpand2"), "onClick", function (b) {
                //debugger;
                if (this.label == "展开︾") {
                    this.setLabel("收起︽");
                    //做展开的动作
                    dojo.byId("show_01").style.display = "";
					dojo.byId("show_011").style.display = "";
                } else {
                    this.setLabel("展开︾");
                    //做收起的动作
                    dojo.byId("show_01").style.display = "none";
					dojo.byId("show_011").style.display = "none";
                }
                dijit.byId("table_bo_list").resize();
            });

            dojo.connect(dijit.byId("btnExpand3"), "onClick", function (c) {
                //debugger;
                if (this.label == "展开︾") {
                    this.setLabel("收起︽");
                    //做展开的动作
                    dojo.byId("show_02").style.display = "";
                    dojo.byId("show_021").style.display = "";
                } else {
                    this.setLabel("展开︾");
                    //做收起的动作
                    dojo.byId("show_02").style.display = "none";
					dojo.byId("show_021").style.display = "none";
                }
                dijit.byId("table_bo_list").resize();
            });

            dojo.connect(dijit.byId("btnExpand4"), "onClick", function (d) {
                //debugger;
                if (this.label == "展开︾") {
                    this.setLabel("收起︽");
                    //做展开的动作
                    dojo.byId("show_03").style.display = "";
					dojo.byId("show_031").style.display = "";
                } else {
                    this.setLabel("展开︾");
                    //做收起的动作
                    dojo.byId("show_03").style.display = "none";
					dojo.byId("show_031").style.display = "none";
                }
                dijit.byId("table_bo_list").resize();
            });

            dojo.connect(dijit.byId("btnExpand5"), "onClick", function (e) {
                //debugger;
                if (this.label == "展开︾") {
                    this.setLabel("收起︽");
                    //做展开的动作
                    dojo.byId("show_04").style.display = "";
                } else {
                    this.setLabel("展开︾");
                    //做收起的动作
                    dojo.byId("show_04").style.display = "none";
                }
                dijit.byId("table_bo_list").resize();
            });
        }
    });
});
},
'stock/firms/view/digests/MD5':function(){
define(["./_base"], function(dxd) {

/*	A port of Paul Johnstone's MD5 implementation
 *	http://pajhome.org.uk/crypt/md5/index.html
 *
 *	Copyright (C) Paul Johnston 1999 - 2002.
 *	Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * 	Distributed under the BSD License
 *
 *	Dojo port by Tom Trenka
 */

	var chrsz=8;

	//	MD5 rounds functions
	function R(n,c){ return (n<<c)|(n>>>(32-c)); }
	function C(q,a,b,x,s,t){ return dxd.addWords(R(dxd.addWords(dxd.addWords(a, q), dxd.addWords(x, t)), s), b); }
	function FF(a,b,c,d,x,s,t){ return C((b&c)|((~b)&d),a,b,x,s,t); }
	function GG(a,b,c,d,x,s,t){ return C((b&d)|(c&(~d)),a,b,x,s,t); }
	function HH(a,b,c,d,x,s,t){ return C(b^c^d,a,b,x,s,t); }
	function II(a,b,c,d,x,s,t){ return C(c^(b|(~d)),a,b,x,s,t); }

	//	the core MD5 rounds method
	function core(x,len){
		x[len>>5]|=0x80<<((len)%32);
		x[(((len+64)>>>9)<<4)+14]=len;
		var a= 1732584193;
		var b=-271733879;
		var c=-1732584194;
		var d= 271733878;
		for(var i=0; i<x.length; i+=16){
			var olda=a;
			var oldb=b;
			var oldc=c;
			var oldd=d;

			a=FF(a,b,c,d,x[i+ 0],7 ,-680876936);
			d=FF(d,a,b,c,x[i+ 1],12,-389564586);
			c=FF(c,d,a,b,x[i+ 2],17, 606105819);
			b=FF(b,c,d,a,x[i+ 3],22,-1044525330);
			a=FF(a,b,c,d,x[i+ 4],7 ,-176418897);
			d=FF(d,a,b,c,x[i+ 5],12, 1200080426);
			c=FF(c,d,a,b,x[i+ 6],17,-1473231341);
			b=FF(b,c,d,a,x[i+ 7],22,-45705983);
			a=FF(a,b,c,d,x[i+ 8],7 , 1770035416);
			d=FF(d,a,b,c,x[i+ 9],12,-1958414417);
			c=FF(c,d,a,b,x[i+10],17,-42063);
			b=FF(b,c,d,a,x[i+11],22,-1990404162);
			a=FF(a,b,c,d,x[i+12],7 , 1804603682);
			d=FF(d,a,b,c,x[i+13],12,-40341101);
			c=FF(c,d,a,b,x[i+14],17,-1502002290);
			b=FF(b,c,d,a,x[i+15],22, 1236535329);

			a=GG(a,b,c,d,x[i+ 1],5 ,-165796510);
			d=GG(d,a,b,c,x[i+ 6],9 ,-1069501632);
			c=GG(c,d,a,b,x[i+11],14, 643717713);
			b=GG(b,c,d,a,x[i+ 0],20,-373897302);
			a=GG(a,b,c,d,x[i+ 5],5 ,-701558691);
			d=GG(d,a,b,c,x[i+10],9 , 38016083);
			c=GG(c,d,a,b,x[i+15],14,-660478335);
			b=GG(b,c,d,a,x[i+ 4],20,-405537848);
			a=GG(a,b,c,d,x[i+ 9],5 , 568446438);
			d=GG(d,a,b,c,x[i+14],9 ,-1019803690);
			c=GG(c,d,a,b,x[i+ 3],14,-187363961);
			b=GG(b,c,d,a,x[i+ 8],20, 1163531501);
			a=GG(a,b,c,d,x[i+13],5 ,-1444681467);
			d=GG(d,a,b,c,x[i+ 2],9 ,-51403784);
			c=GG(c,d,a,b,x[i+ 7],14, 1735328473);
			b=GG(b,c,d,a,x[i+12],20,-1926607734);

			a=HH(a,b,c,d,x[i+ 5],4 ,-378558);
			d=HH(d,a,b,c,x[i+ 8],11,-2022574463);
			c=HH(c,d,a,b,x[i+11],16, 1839030562);
			b=HH(b,c,d,a,x[i+14],23,-35309556);
			a=HH(a,b,c,d,x[i+ 1],4 ,-1530992060);
			d=HH(d,a,b,c,x[i+ 4],11, 1272893353);
			c=HH(c,d,a,b,x[i+ 7],16,-155497632);
			b=HH(b,c,d,a,x[i+10],23,-1094730640);
			a=HH(a,b,c,d,x[i+13],4 , 681279174);
			d=HH(d,a,b,c,x[i+ 0],11,-358537222);
			c=HH(c,d,a,b,x[i+ 3],16,-722521979);
			b=HH(b,c,d,a,x[i+ 6],23, 76029189);
			a=HH(a,b,c,d,x[i+ 9],4 ,-640364487);
			d=HH(d,a,b,c,x[i+12],11,-421815835);
			c=HH(c,d,a,b,x[i+15],16, 530742520);
			b=HH(b,c,d,a,x[i+ 2],23,-995338651);

			a=II(a,b,c,d,x[i+ 0],6 ,-198630844);
			d=II(d,a,b,c,x[i+ 7],10, 1126891415);
			c=II(c,d,a,b,x[i+14],15,-1416354905);
			b=II(b,c,d,a,x[i+ 5],21,-57434055);
			a=II(a,b,c,d,x[i+12],6 , 1700485571);
			d=II(d,a,b,c,x[i+ 3],10,-1894986606);
			c=II(c,d,a,b,x[i+10],15,-1051523);
			b=II(b,c,d,a,x[i+ 1],21,-2054922799);
			a=II(a,b,c,d,x[i+ 8],6 , 1873313359);
			d=II(d,a,b,c,x[i+15],10,-30611744);
			c=II(c,d,a,b,x[i+ 6],15,-1560198380);
			b=II(b,c,d,a,x[i+13],21, 1309151649);
			a=II(a,b,c,d,x[i+ 4],6 ,-145523070);
			d=II(d,a,b,c,x[i+11],10,-1120210379);
			c=II(c,d,a,b,x[i+ 2],15, 718787259);
			b=II(b,c,d,a,x[i+ 9],21,-343485551);

			a=dxd.addWords(a, olda);
			b=dxd.addWords(b, oldb);
			c=dxd.addWords(c, oldc);
			d=dxd.addWords(d, oldd);
		}
		return [a,b,c,d];
	}

	function hmac(data, key){
		var wa=dxd.stringToWord(key);
		if(wa.length>16){
			wa=core(wa, key.length*chrsz);
		}
		var l=[], r=[];
		for(var i=0; i<16; i++){
			l[i]=wa[i]^0x36363636;
			r[i]=wa[i]^0x5c5c5c5c;
		}
		var h=core(l.concat(dxd.stringToWord(data)), 512+data.length*chrsz);
		return core(r.concat(h), 640);
	}

	//	public function
	dxd.MD5=function(/* string */data, /* dojox.encoding.digests.outputTypes? */outputType){
		// summary:
		//		computes the digest of data, and returns the result according to type outputType
		var out=outputType || dxd.outputTypes.Base64;
		var wa=core(dxd.stringToWord(data), data.length*chrsz);
		switch(out){
			case dxd.outputTypes.Raw:{
				return wa;	//	word[]
			}
			case dxd.outputTypes.Hex:{
				return dxd.wordToHex(wa);	//	string
			}
			case dxd.outputTypes.String:{
				return dxd.wordToString(wa);	//	string
			}
			default:{
				return dxd.wordToBase64(wa);	//	string
			}
		}
	};

	//	make this private, for later use with a generic HMAC calculator.
	dxd.MD5._hmac=function(/* string */data, /* string */key, /* dojox.encoding.digests.outputTypes? */outputType){
		// summary:
		//		computes the digest of data, and returns the result according to type outputType
		var out=outputType || dxd.outputTypes.Base64;
		var wa=hmac(data, key);
		switch(out){
			case dxd.outputTypes.Raw:{
				return wa;	//	word[]
			}
			case dxd.outputTypes.Hex:{
				return dxd.wordToHex(wa);	//	string
			}
			case dxd.outputTypes.String:{
				return dxd.wordToString(wa);	//	string
			}
			default:{
				return dxd.wordToBase64(wa);	//	string
			}
		}
	};

	return dxd.MD5;
});

},
'stock/firms/view/digests/_base':function(){
define(["dojo/_base/lang"], function(lang){
	var d = lang.getObject("dojox.encoding.digests", true);

	//TODO: see if it makes sense to meld this into one with the
	//	crypto base enums
	d.outputTypes={
		// summary:
		//		Enumeration for input and output encodings.
		Base64:0, Hex:1, String:2, Raw:3
	};

	//	word-based addition
	d.addWords=function(/* word */a, /* word */b){
		// summary:
		//		add a pair of words together with rollover
		var l=(a&0xFFFF)+(b&0xFFFF);
		var m=(a>>16)+(b>>16)+(l>>16);
		return (m<<16)|(l&0xFFFF);	//	word
	};

	//	word-based conversion method, for efficiency sake;
	//	most digests operate on words, and this should be faster
	//	than the encoding version (which works on bytes).
	var chrsz=8;	//	16 for Unicode
	var mask=(1<<chrsz)-1;

	d.stringToWord=function(/* string */s){
		// summary:
		//		convert a string to a word array
		var wa=[];
		for(var i=0, l=s.length*chrsz; i<l; i+=chrsz){
			wa[i>>5]|=(s.charCodeAt(i/chrsz)&mask)<<(i%32);
		}
		return wa;	//	word[]
	};

	d.wordToString=function(/* word[] */wa){
		// summary:
		//		convert an array of words to a string
		var s=[];
		for(var i=0, l=wa.length*32; i<l; i+=chrsz){
			s.push(String.fromCharCode((wa[i>>5]>>>(i%32))&mask));
		}
		return s.join("");	//	string
	};

	d.wordToHex=function(/* word[] */wa){
		// summary:
		//		convert an array of words to a hex tab
		var h="0123456789abcdef", s=[];
		for(var i=0, l=wa.length*4; i<l; i++){
			s.push(h.charAt((wa[i>>2]>>((i%4)*8+4))&0xF)+h.charAt((wa[i>>2]>>((i%4)*8))&0xF));
		}
		return s.join("");	//	string
	};

	d.wordToBase64=function(/* word[] */wa){
		// summary:
		//		convert an array of words to base64 encoding, should be more efficient
		//		than using dojox.encoding.base64
		var p="=", tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s=[];
		for(var i=0, l=wa.length*4; i<l; i+=3){
			var t=(((wa[i>>2]>>8*(i%4))&0xFF)<<16)|(((wa[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((wa[i+2>>2]>>8*((i+2)%4))&0xFF);
			for(var j=0; j<4; j++){
				if(i*8+j*6>wa.length*32){
					s.push(p);
				} else {
					s.push(tab.charAt((t>>6*(3-j))&0x3F));
				}
			}
		}
		return s.join("");	//	string
	};

	return d;
});

},
'stock/firms/view/_base':function(){
define([
    'dojo/_base/lang', 'dojo/aspect', 'dojo/query', 'dojo/on', 'dojo/mouse', 'dojo/dom-style', 'dojo/request',
    'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dijit/_WidgetsInTemplateMixin', 'dijit/layout/_ContentPaneResizeMixin',
    'stock/firms/view/_data', 'dojo/NodeList-traverse', 'dojo/NodeList-manipulate', 'dojo/NodeList-fx'
], function (lang, aspect, query, on, mouse, domStyle, request, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ContentPaneResizeMixin, _dataMixin) {
    return dojo.declare("stock.firms.view._base", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ContentPaneResizeMixin, _dataMixin], {
        postCreate:function () {
            this.inherited(arguments);
        }
    });
});

},
'stock/firms/view/_data':function(){
define([
    'dojo/io-query', 'dojox/store/MultiResultStore', 'dojox/store/GridWSStore', 'dojox/websocket/WebsocketFileReader'
], function (ioQuery, MultiResultStore, GridWSStore, FileReader) {
    var debug = (location.search.match(/debug=([^&]*)/) || [, ''])[1],
        http_debug = (debug ? 'http://' + debug : ''),//debug=10.15.94.171:9189
        socket_debug = (debug ? '/debug/' + debug : '');
    return dojo.declare('stock.firms.view._data', null, {
        userId:window.external && external.getDZHProperty ? external.getDZHProperty('userid') : 'dzh112_098',
        getSearchInitData:function () {
            return new MultiResultStore().query({
                service:'rpc',
                so:'javadataproxy.jar',
                'function':'gw/UIMain',
                paraencode:'base64',
                parameter:"Z2V0," + btoa(http_debug + '/personib/PersonIB/html5_SearchCompanyInfo/SearchCompanyInfo/initData.mod'),
                response_times:1,
                response_mode:0
            });
        },
        getFirms:function () {
            return new MultiResultStore({
				serviceUrl:socket_debug + '/personib/PersonIB/html5_SearchCompanyInfo/SearchCompanyInfo/searchCompanyBySolr.mod'
            });
        }
    });
});
},
'dojox/store/MultiResultStore':function(){
define("dojox/store/MultiResultStore", ["dojo/_base/declare", "dojox/store/WebSocket"], function(declare, WS){
	/**
	 * 该模块定义一个通用的多结果集的store，现在近支持二维结果集，不再支持之前的但结果集形式。
	 */
	
	return declare("dojox.store.MultiResultStore", WS, {
		
		/**
		 * idProperty 和 dataProperty分别对应对结果集的id字段和data字段
		 * 
		 * 多结果集的store分为几种情况:
		 * 1、只用tablelist
		 * 2、有title和tablelist
		 * 3、title和tablelist换成ranking和data
		 * 4、其他类似于title和tablelist的格式
		 * 
		 * 避免使用title、tablelist等硬编码
		 */

		idProperty : "title", 

		dataProperty : "tablelist",

		convert : function( object ){
			var rs = object.result, // 结果对象的result
				head = rs.head, // 结果集中的head 格式为 ['title', tablelist]或者[tablelist]
				datas = rs.datas, // 实际的多结果集数据对象（一个二维数组）；其中每一项是一个结果集，其中包含该结果集的表头和各行记录的值
				results = [], // 作为返回值
				idPostion = head.indexOf(this.idProperty), // 做为id的字段在二维数组各项中的位置
				dataPostion = head.indexOf(this.dataProperty);// 实际结果集数据在二维数组各项中的位置
			
			if( 1 == head.length ){ 
				// 只有tablelist的格式。并且没指定恰当的dataProperty
				-1 == dataPostion ? dataPostion = 0 : null;
			}else if( -1 == idPostion || -1 == dataPostion ){ 
				// 有title和tablelist的格式，并且没指定恰当的idProperty和dataProperty
				idPostion = 0;
			 	dataPostion = 1;
			}

			for(var i = 0, ii = datas.length; i < ii; i++){ //循环多结果集
				var result = { 
						items : [] 
					},
					data_item = datas[i][dataPostion].datas,
					head_item = datas[i][dataPostion].head;

				result[this.idProperty] = -1 != idPostion ? datas[i][idPostion] : i;

				for(var j = 0, jj = data_item.length; j < jj; j++){
					var item = {};
					for(var l = 0, ll = head_item.length; l < ll; l++){
						item[ head_item[l] ] = data_item[j][l];
					}
					result.items.push(item);
				}

				results.push(result);
			}

			return results;
		}


	});

});

},
'dojox/store/GridWSStore':function(){
define("dojox/store/GridWSStore", ["dojo/_base/declare", "dojo/_base/lang", "dojo/json", "dojo/Deferred", 
		"dojo/store/util/QueryResults", 'dojo/store/Observable',"dojo/io-query",
		"dojox/store/WebSocket", "dojo/Evented", "dojo/_base/array"],
function(declare, lang, JSON, Deferred, QueryResults, Observable, ioQuery, WS, Evented, arrayUtil){
	//不对结果过滤，所有query都返回整个结果集，所以只加一个
	function GridQueryEngine(query, options){
		var queryObject = (options && options.query) || {};
		var queryFunc = function(object){
			for(var key in queryObject){
				var required = queryObject[key];
				if(required && required.test){
					// an object can provide a test method, which makes it work with regex
					if(!required.test(object[key], object)){
						return false;
					}
				}else if(required != object[key]){
					return false;
				}
			}
			return true;
		};		
		return function execute(array){
			if(options && options.query){
				array = arrayUtil.filter(array, queryFunc);
			}
			if(options && (typeof(options.sort) === "function") ){
				var array = lang.clone(array); 
				array.sort(options.sort);
			}
			return array;
		}
	}

	/**
	 * 本类支持设置store属性，如果设置取到的数据会合并到this.store的相同id数据上
	 * 如果不设置store属性，取到的数据会合并到本store的相同id数据上。
	 * put新数据是替换，本类是先mixin.
	 */

	/**
	 * 增加排序且推送情况的支持，构思参考邮件
	 */
	return declare("dojox.store.GridWSStore", [WS, Evented], {
		
		idProperty: "obj",

		/** 推送的数据到达应该以何种模式处理，可选值为
		 * update : 更新原有数据（默认）或追加
		 * replace : 直接替换原有数据
		*/
		updateMode : "update",

		queryEngine: GridQueryEngine,

		/**
		 * 更新模式直接使用父类中的方法，替换模式需要则清空原有数据
		 */
		progress : function(object) {
			if("replace" === this.updateMode){
				this.data.length = 0;
				this.index = {};
			}

			var data = this.inherited(arguments);

			this.emit("afterprogress", {
				res_seq : object.res_seq, 
				req_seq : object.req_seq,
				res_type : object.res_type, 
				data : data
			});
			return data;
		},
		/**
		 * convert：转换数据格式
		 * 对于一次注册多只股票，第一次返回的是一个多条记录返回的集合。
		 * 
		 * 2013年03月13日
		 * 数据层调整后websocket服务器端会检测table中的head是否为空数组（[]），如果为空数组则返回的数据不包含result。
		 */
		convert:function(object) {
			if( "undefined" === typeof(object.result) || ("undefined" === typeof(object.result.head) && "undefined" === typeof(object.result.datas)) ){
				return [];
			}
			var data = object.result,
				head = data.head,
				datas = data.datas,
				results = [],
				item;
			
			if ( "undefined" != typeof(datas[0]) &&  !(datas[0][1] instanceof Array) && "object" == typeof(datas[0][1]) ) {
				/** 
			 	 * 多结果集支持， 对于推送取第一个结果集。 
			 	 * 
			 	 */
				head = datas[0][1].head;
				datas = datas[0][1].datas;
			}

			datas.forEach(function( datas_item, datas_index ){
				item = {};
				head.forEach(function( head_item, head_index ){
					item[ head_item ] = datas_item[ head_index ];
				});
				results.push(item);
			});

			// this.emit("dataarrived", {data : results});
			this.emit("afterconvert", {data : results});
			return results;
		}
		
	});

});

},
'dojo/store/Observable':function(){
define(["../_base/kernel", "../_base/lang", "../_base/Deferred", "../_base/array" /*=====, "./api/Store" =====*/
], function(kernel, lang, Deferred, array /*=====, Store =====*/){

// module:
//		dojo/store/Observable

var Observable = function(/*Store*/ store){
	// summary:
	//		The Observable store wrapper takes a store and sets an observe method on query()
	//		results that can be used to monitor results for changes.
	//
	// description:
	//		Observable wraps an existing store so that notifications can be made when a query
	//		is performed.
	//
	// example:
	//		Create a Memory store that returns an observable query, and then log some
	//		information about that query.
	//
	//	|	var store = Observable(new Memory({
	//	|		data: [
	//	|			{id: 1, name: "one", prime: false},
	//	|			{id: 2, name: "two", even: true, prime: true},
	//	|			{id: 3, name: "three", prime: true},
	//	|			{id: 4, name: "four", even: true, prime: false},
	//	|			{id: 5, name: "five", prime: true}
	//	|		]
	//	|	}));
	//	|	var changes = [], results = store.query({ prime: true });
	//	|	var observer = results.observe(function(object, previousIndex, newIndex){
	//	|		changes.push({previousIndex:previousIndex, newIndex:newIndex, object:object});
	//	|	});
	//
	//		See the Observable tests for more information.

	var undef, queryUpdaters = [], revision = 0;
	// a Comet driven store could directly call notify to notify observers when data has
	// changed on the backend
	// create a new instance
	store = lang.delegate(store);
	
	store.notify = function(object, existingId){
		revision++;
		var updaters = queryUpdaters.slice();
		for(var i = 0, l = updaters.length; i < l; i++){
			updaters[i](object, existingId);
		}
	};
	var originalQuery = store.query;
	store.query = function(query, options){
		options = options || {};
		var results = originalQuery.apply(this, arguments);
		if(results && results.forEach){
			var nonPagedOptions = lang.mixin({}, options);
			delete nonPagedOptions.start;
			delete nonPagedOptions.count;

			var queryExecutor = store.queryEngine && store.queryEngine(query, nonPagedOptions);
			var queryRevision = revision;
			var listeners = [], queryUpdater;
			results.observe = function(listener, includeObjectUpdates){
				if(listeners.push(listener) == 1){
					// first listener was added, create the query checker and updater
					queryUpdaters.push(queryUpdater = function(changed, existingId){
						Deferred.when(results, function(resultsArray){
							var atEnd = resultsArray.length != options.count;
							var i, l, listener;
							if(++queryRevision != revision){
								throw new Error("Query is out of date, you must observe() the query prior to any data modifications");
							}
							var removedObject, removedFrom = -1, insertedInto = -1;
							if(existingId !== undef){
								// remove the old one
								for(i = 0, l = resultsArray.length; i < l; i++){
									var object = resultsArray[i];
									if(store.getIdentity(object) == existingId){
										removedObject = object;
										removedFrom = i;
										if(queryExecutor || !changed){// if it was changed and we don't have a queryExecutor, we shouldn't remove it because updated objects would be eliminated
											resultsArray.splice(i, 1);
										}
										break;
									}
								}
							}
							if(queryExecutor){
								// add the new one
								if(changed &&
										// if a matches function exists, use that (probably more efficient)
										(queryExecutor.matches ? queryExecutor.matches(changed) : queryExecutor([changed]).length)){

									var firstInsertedInto = removedFrom > -1 ? 
										removedFrom : // put back in the original slot so it doesn't move unless it needs to (relying on a stable sort below)
										resultsArray.length;
									resultsArray.splice(firstInsertedInto, 0, changed); // add the new item
									insertedInto = array.indexOf(queryExecutor(resultsArray), changed); // sort it
									// we now need to push the chagne back into the original results array
									resultsArray.splice(firstInsertedInto, 1); // remove the inserted item from the previous index
									
									if((options.start && insertedInto == 0) ||
										(!atEnd && insertedInto == resultsArray.length)){
										// if it is at the end of the page, assume it goes into the prev or next page
										insertedInto = -1;
									}else{
										resultsArray.splice(insertedInto, 0, changed); // and insert into the results array with the correct index
									}
								}
							}else if(changed){
								// we don't have a queryEngine, so we can't provide any information
								// about where it was inserted or moved to. If it is an update, we leave it's position alone, other we at least indicate a new object
								if(existingId !== undef){
									// an update, keep the index the same
									insertedInto = removedFrom;
								}else if(!options.start){
									// a new object
									insertedInto = store.defaultIndex || 0;
									resultsArray.splice(insertedInto, 0, changed);
								}
							}
							if((removedFrom > -1 || insertedInto > -1) &&
									(includeObjectUpdates || !queryExecutor || (removedFrom != insertedInto))){
								var copyListeners = listeners.slice();
								for(i = 0;listener = copyListeners[i]; i++){
									listener(changed || removedObject, removedFrom, insertedInto);
								}
							}
						});
					});
				}
				var handle = {};
				// TODO: Remove cancel in 2.0.
				handle.remove = handle.cancel = function(){
					// remove this listener
					var index = array.indexOf(listeners, listener);
					if(index > -1){ // check to make sure we haven't already called cancel
						listeners.splice(index, 1);
						if(!listeners.length){
							// no more listeners, remove the query updater too
							queryUpdaters.splice(array.indexOf(queryUpdaters, queryUpdater), 1);
						}
					}
				};
				return handle;
			};
		}
		return results;
	};
	var inMethod;
	function whenFinished(method, action){
		var original = store[method];
		if(original){
			store[method] = function(value){
				if(inMethod){
					// if one method calls another (like add() calling put()) we don't want two events
					return original.apply(this, arguments);
				}
				inMethod = true;
				try{
					var results = original.apply(this, arguments);
					Deferred.when(results, function(results){
						action((typeof results == "object" && results) || value);
					});
					return results;
				}finally{
					inMethod = false;
				}
			};
		}
	}
	// monitor for updates by listening to these methods
	whenFinished("put", function(object){
		store.notify(object, store.getIdentity(object));
	});
	whenFinished("add", function(object){
		store.notify(object);
	});
	whenFinished("remove", function(id){
		store.notify(undefined, id);
	});

	return store;
};

lang.setObject("dojo.store.util.Observable", Observable);

return Observable;
});

},
'dojox/websocket/WebsocketFileReader':function(){
define("dojox/websocket/WebsocketFileReader", ["./_base","dojo/_base/lang", "dojo/_base/declare", "dojo/Deferred"]
, function (_SocketBase, lang, declare, Deferred) {
	
	return declare("dojox.websocket.WebsocketFileReader", [_SocketBase], {
		/**
		 * 据C++端讲，返回的顺序是请求的顺序。
		 */
		constructor : function (options) {
			this.inherited(arguments);
			this.deferreds = [];
		},
		
		read : function (file, convertUrl) {
			file = true == convertUrl ? "dzh2url?" + file : "dzh2data?" + file;
		
			var deferred = new Deferred(function(reason){
			   console.log("cancel");
			});
			
			this.deferreds.push(deferred);
			console.log(new Date().getTime(), "开始读取文件 " + file );
			this.send(file);
			
			return deferred.promise;
		},
		
		_onmessage : function ( evt ) {
			//该方法为socket的onmessage回调函数，不需要返回值。
			//console.dir(evt);
			//console.log(evt.data);
			var detail = evt.data;
			console.log(new Date().getTime(), "读取文件返回，文件严格按照读取顺序返回");
			this.deferreds.shift().resolve( detail );
		},
		
		_cancelDeferred : function(){
			/**
			 *如果下一次调用get时，前一次的socket请求没有返回，即this.deferred.isResolved() == false
			 *那么cancel掉之前的deferred。
			*/
			if( ("undefined" != typeof this.deferred) && !this.deferred.isResolved() ){
				this.deferred.cancel();
			}
		},
		
		close : function(){
			this.inherited(arguments);
			this.deferreds.forEach(function(item, i){
				item.cancel();
			});
			this.deferreds = null;
		}
		
	});
});

},
'dojox/websocket/_base':function(){
define("dojox/websocket/_base", ["dojo/_base/lang", "dojo/_base/declare", "dojo/Deferred"], function (lang, declare, Deferred) {
	
	var undefined/*确保undefined没有被重新定义，undefined是window对象中的变量*/;
	
	return declare("dojox/websocket/_base", null, {
		/* websocket主机 */
		host : "127.0.0.1",
		/* websocket 端口*/
		port : window.external.wsport || '30718',
		
		constructor : function (options) {
			declare.safeMixin(this, options);
			this.send_queue=[];
		},
		/**
		 * 创建一个socket， 并且绑定message、close、error等事件。
		 * 子类需要实现自己的_onmessage函数，_onclose函数，而socket的onerror回调函数一般不用绑定。
		 */
		_getSocket : function(){
			var socket = new WebSocket('ws://' + this.host + ':' + this.port);
			
			socket.onmessage = lang.hitch( this, "_onmessage");
			socket.onclose = lang.hitch( this, "_onclose");
			socket.onopen = lang.hitch( this, "_onopen");

			socket.onerror = function(){
				//TODO 错误重新连接
			};
			
			return socket;
		},
		send : function (data) {
			var websock = this.websock;
			
			if (!websock || websock.readyState === undefined || websock.readyState > 1) {
				//通过父类的方法获取socket
				this.websock = websock = this._getSocket();
				this.send_queue.push(data);
			} else {
				if (websock && websock.readyState == 1) {
					websock.send( data );
				} else {
					//TODO 放入发送队列？ 还是替换到发送队列？
					this.send_queue.push(data);
				}
			}
		},
		close : function () {
			this.websock && this.websock.close();
			this.websock = undefined;
			console.log("closed the socket in _base");
		},
		_onopen : function(evt){
			while(this.send_queue.length >0){
				var temp = this.send_queue.shift();
				try {
					this.websock.send(temp);
				}catch(err){
					console.log(err.description);
				}
			}
		},
		
		_onmessage : function(evt){
			console.log("_base log : ", evt.data);
		},
		
		_onclose : function(evt){
			//空实现，仅仅占位，子类若实现需要重写
		}
		
	});
});

},
'dojo/NodeList-fx':function(){
define(["./query", "./_base/lang", "./_base/connect", "./_base/fx", "./fx"],
function(query, lang, connectLib, baseFx, coreFx){

// module:
//		dojo/NodeList-fx

/*=====
return function(){
	// summary:
	//		Adds dojo.fx animation support to dojo.query() by extending the NodeList class
	//		with additional FX functions.  NodeList is the array-like object used to hold query results.
};
=====*/

var NodeList = query.NodeList;

lang.extend(NodeList, {
	_anim: function(obj, method, args){
		args = args||{};
		var a = coreFx.combine(
			this.map(function(item){
				var tmpArgs = { node: item };
				lang.mixin(tmpArgs, args);
				return obj[method](tmpArgs);
			})
		);
		return args.auto ? a.play() && this : a; // dojo/_base/fx.Animation|dojo/NodeList
	},

	wipeIn: function(args){
		// summary:
		//		wipe in all elements of this NodeList via `dojo/fx.wipeIn()`
		//
		// args: Object?
		//		Additional dojo/_base/fx.Animation arguments to mix into this set with the addition of
		//		an `auto` parameter.
		//
		// returns: dojo/_base/fx.Animation|dojo/NodeList
		//		A special args member `auto` can be passed to automatically play the animation.
		//		If args.auto is present, the original dojo/NodeList will be returned for further
		//		chaining. Otherwise the dojo/_base/fx.Animation instance is returned and must be .play()'ed
		//
		// example:
		//		Fade in all tables with class "blah":
		//		|	dojo.query("table.blah").wipeIn().play();
		//
		// example:
		//		Utilizing `auto` to get the NodeList back:
		//		|	dojo.query(".titles").wipeIn({ auto:true }).onclick(someFunction);
		//
		return this._anim(coreFx, "wipeIn", args); // dojo/_base/fx.Animation|dojo/NodeList
	},

	wipeOut: function(args){
		// summary:
		//		wipe out all elements of this NodeList via `dojo/fx.wipeOut()`
		//
		// args: Object?
		//		Additional dojo/_base/fx.Animation arguments to mix into this set with the addition of
		//		an `auto` parameter.
		//
		// returns: dojo/_base/fx.Animation|dojo/NodeList
		//		A special args member `auto` can be passed to automatically play the animation.
		//		If args.auto is present, the original dojo/NodeList will be returned for further
		//		chaining. Otherwise the dojo/_base/fx.Animation instance is returned and must be .play()'ed
		//
		// example:
		//		Wipe out all tables with class "blah":
		//		|	dojo.query("table.blah").wipeOut().play();
		return this._anim(coreFx, "wipeOut", args); // dojo/_base/fx.Animation|dojo/NodeList
	},

	slideTo: function(args){
		// summary:
		//		slide all elements of the node list to the specified place via `dojo/fx.slideTo()`
		//
		// args: Object?
		//		Additional dojo/_base/fx.Animation arguments to mix into this set with the addition of
		//		an `auto` parameter.
		//
		// returns: dojo/_base/fx.Animation|dojo/NodeList
		//		A special args member `auto` can be passed to automatically play the animation.
		//		If args.auto is present, the original dojo/NodeList will be returned for further
		//		chaining. Otherwise the dojo/_base/fx.Animation instance is returned and must be .play()'ed
		//
		// example:
		//		|	Move all tables with class "blah" to 300/300:
		//		|	dojo.query("table.blah").slideTo({
		//		|		left: 40,
		//		|		top: 50
		//		|	}).play();
		return this._anim(coreFx, "slideTo", args); // dojo/_base/fx.Animation|dojo/NodeList
	},


	fadeIn: function(args){
		// summary:
		//		fade in all elements of this NodeList via `dojo.fadeIn`
		//
		// args: Object?
		//		Additional dojo/_base/fx.Animation arguments to mix into this set with the addition of
		//		an `auto` parameter.
		//
		// returns: dojo/_base/fx.Animation|dojo/NodeList
		//		A special args member `auto` can be passed to automatically play the animation.
		//		If args.auto is present, the original dojo/NodeList will be returned for further
		//		chaining. Otherwise the dojo/_base/fx.Animation instance is returned and must be .play()'ed
		//
		// example:
		//		Fade in all tables with class "blah":
		//		|	dojo.query("table.blah").fadeIn().play();
		return this._anim(baseFx, "fadeIn", args); // dojo/_base/fx.Animation|dojo/NodeList
	},

	fadeOut: function(args){
		// summary:
		//		fade out all elements of this NodeList via `dojo.fadeOut`
		//
		// args: Object?
		//		Additional dojo/_base/fx.Animation arguments to mix into this set with the addition of
		//		an `auto` parameter.
		//
		// returns: dojo/_base/fx.Animation|dojo/NodeList
		//		A special args member `auto` can be passed to automatically play the animation.
		//		If args.auto is present, the original dojo/NodeList will be returned for further
		//		chaining. Otherwise the dojo/_base/fx.Animation instance is returned and must be .play()'ed
		//
		// example:
		//		Fade out all elements with class "zork":
		//		|	dojo.query(".zork").fadeOut().play();
		// example:
		//		Fade them on a delay and do something at the end:
		//		|	var fo = dojo.query(".zork").fadeOut();
		//		|	dojo.connect(fo, "onEnd", function(){ /*...*/ });
		//		|	fo.play();
		// example:
		//		Using `auto`:
		//		|	dojo.query("li").fadeOut({ auto:true }).filter(filterFn).forEach(doit);
		//
		return this._anim(baseFx, "fadeOut", args); // dojo/_base/fx.Animation|dojo/NodeList
	},

	animateProperty: function(args){
		// summary:
		//		Animate all elements of this NodeList across the properties specified.
		//		syntax identical to `dojo.animateProperty`
		//
		// args: Object?
		//		Additional dojo/_base/fx.Animation arguments to mix into this set with the addition of
		//		an `auto` parameter.
		//
		// returns: dojo/_base/fx.Animation|dojo/NodeList
		//		A special args member `auto` can be passed to automatically play the animation.
		//		If args.auto is present, the original dojo/NodeList will be returned for further
		//		chaining. Otherwise the dojo/_base/fx.Animation instance is returned and must be .play()'ed
		//
		// example:
		//	|	dojo.query(".zork").animateProperty({
		//	|		duration: 500,
		//	|		properties: {
		//	|			color:		{ start: "black", end: "white" },
		//	|			left:		{ end: 300 }
		//	|		}
		//	|	}).play();
		//
		// example:
		//	|	dojo.query(".grue").animateProperty({
		//	|		auto:true,
		//	|		properties: {
		//	|			height:240
		//	|		}
		//	|	}).onclick(handler);
		return this._anim(baseFx, "animateProperty", args); // dojo/_base/fx.Animation|dojo/NodeList
	},

	anim: function( /*Object*/			properties,
					/*Integer?*/		duration,
					/*Function?*/		easing,
					/*Function?*/		onEnd,
					/*Integer?*/		delay){
		// summary:
		//		Animate one or more CSS properties for all nodes in this list.
		//		The returned animation object will already be playing when it
		//		is returned. See the docs for `dojo.anim` for full details.
		// properties: Object
		//		the properties to animate. does NOT support the `auto` parameter like other
		//		NodeList-fx methods.
		// duration: Integer?
		//		Optional. The time to run the animations for
		// easing: Function?
		//		Optional. The easing function to use.
		// onEnd: Function?
		//		A function to be called when the animation ends
		// delay:
		//		how long to delay playing the returned animation
		// example:
		//		Another way to fade out:
		//	|	dojo.query(".thinger").anim({ opacity: 0 });
		// example:
		//		animate all elements with the "thigner" class to a width of 500
		//		pixels over half a second
		//	|	dojo.query(".thinger").anim({ width: 500 }, 700);
		var canim = coreFx.combine(
			this.map(function(item){
				return baseFx.animateProperty({
					node: item,
					properties: properties,
					duration: duration||350,
					easing: easing
				});
			})
		);
		if(onEnd){
			connectLib.connect(canim, "onEnd", onEnd);
		}
		return canim.play(delay||0); // dojo/_base/fx.Animation
	}
});

return NodeList;
});

},
'url:stock/firms/view/search.html':"<div style=\"height: 100%;\" data-dojo-attach-point=\"containerNode\">\r\n    <div id=\"main\" data-dojo-type=\"dijit/layout/BorderContainer\" data-dojo-props=\"liveSplitters:false,gutters:false, design:'headline'\">\r\n        <div data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"region:'top'\" class=\"hbox dijitTopBar\">\r\n            <div class=\"spacer\"></div>\r\n            <div style=\"line-height: 25px;\" class=\"topbar\">大智慧企业库</div>\r\n        </div>\r\n        <div data-dojo-type=\"dijit/layout/ContentPane\" data-dojo-props=\"design:'headline',region:'center',gutters:false\" class=\"ss_right vbox\">\r\n            <div id=\"searchTop\"  class=\"searchbar s_search relative\">\r\n                <button class=\"btn_style absolute\" data-dojo-type=\"dijit/form/Button\" id=\"btnExpand\">\r\n                    展开︾\r\n                </button>\r\n                <div id=\"search\" class=\"absolute sea_btn\" data-dojo-type=\"dijit/form/Button\" data-dojo-props=\"label:'执行检索'\"></div>\r\n                <div id=\"reset\" class=\"absolute sea_btn2\" data-dojo-type=\"dijit/form/Button\" data-dojo-props=\"label:'重置检索'\"></div>\r\n                <p class=\"box_title_text\">【基本信息】</p>\r\n                <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\r\n                    <colgroup>\r\n                        <col width=\"5%\"/>\r\n                        <col width=\"14%\"/>\r\n                        <col width=\"5%\"/>\r\n                        <col width=\"10%\"/>\r\n                        <col width=\"20%\"/>\r\n                        <col width=\"10%\"/>\r\n                        <col width=\"40%\"/>\r\n                    </colgroup>\r\n                  <!--  <tr>\r\n                        <td>企业</td>\r\n                        <td colspan=\"6\"></td>\r\n                    </tr> -->\r\n                    <tr>\r\n                        <td>关键字</td>\r\n                        <td colspan=\"2\">\r\n                            <div id=\"comName\" data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false ,placeHolder: '请输入企业名称或主营产品' \"class=\"width_trl3\"></div>\r\n                        </td>\r\n                        <td align=\"right\">一级行业</td>\r\n                        <td align=\"left\">\r\n                            <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"行业\" class=\"width_trl\" id=\"hy\" ></div>\r\n                        </td>\r\n                        <td align=\"right\">所在省市</td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"地区分类\"  class=\"width_trl\"  id=\"dq\" ></div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>注册类型</td>\r\n                        <td colspan=\"2\">\r\n                            <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"地区分类\" class=\"width_trl3\" id=\"zclx\"></div>\r\n                        </td>\r\n                        <td align=\"right\">控股情况</td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"资本时间\" class=\"width_trl\" id=\"kgqk\" ></div>\r\n                        </td>\r\n                        <td align=\"right\">成立时间</td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit/form/DateTextBox\"  class=\"width_trl2\" id=\"clsj_begin\" constraints=\"{datePattern:'yyyy-MM-dd', strict:true}\"></div>\r\n                            至\r\n                            <div data-dojo-type=\"dijit/form/DateTextBox\"  class=\"width_trl2\" id=\"clsj_end\" constraints=\"{datePattern:'yyyy-MM-dd', strict:true}\"></div>\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td>企业规模</td>\r\n                        <td colspan=\"2\">\r\n                            <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"企业规模\" class=\"width_trl3\" id=\"qygm\" ></div>\r\n                        </td>\r\n                        <td align=\"right\">机构类型</td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"机构类型\" class=\"width_trl\" id=\"jglx\" ></div>\r\n                        </td>\r\n                        <td align=\"right\">员工人数</td>\r\n                        <td>\r\n                            <div data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-props=\"hasDownArrow:false, invalidMessage:'只接受数字'\" class=\"width_trl2\" id=\"ygrs_begin\"></div>\r\n                            至\r\n                            <div data-dojo-type=\"dijit/form/NumberTextBox\" data-dojo-props=\"hasDownArrow:false, invalidMessage:'只接受数字'\" class=\"width_trl2\" id=\"ygrs_end\"></div>\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n                <div class=\"ss_title\">\r\n                    <span class=\"box_title_text\">【财务信息】</span>\r\n                </div>\r\n                <div class=\"height_ctrl\">\r\n                <table class=\"cw_mess\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\r\n                <colgroup>\r\n                    <col width=\"6%\"/>\r\n                    <col width=\"4%\"/>\r\n                    <col width=\"19%\"/>\r\n                    <col width=\"14%\"/>\r\n                    <col width=\"15%\"/>\r\n                    <col width=\"13%\"/>\r\n                    <col width=\"26%\"/>\r\n                </colgroup>\r\n                <tr>\r\n                    <td>年&nbsp;&nbsp;&nbsp; 度</td>\r\n                    <td colspan=\"6\" style=\"padding-left:0;\">\r\n                        <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"年度\" id=\"gmzb_Year\"></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>规模指标</td>\r\n                    <td>\r\n                        <!--年度&nbsp\r\n                         <div data-dojo-type=\"dijit/form/ComboBox\" title=\"行业\" >\r\n                            <option value=\"机械设备\">2012</option>\r\n                            <option value=\"化工\">2012</option>\r\n                            <option value=\"医药生物\">2012</option>\r\n                            <option value=\"房地产\">房地产</option>\r\n                            <option value=\"信息服务\">信息服务</option>\r\n                        </div>-->\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"aaa\">总资产</span>\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'aaa', position:['below']\" style=\"display:none; width: 100px;\">总资产\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"总资产\" id=\"zzc\" class=\"option_width\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"baa\">主营业务收入</span>\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'baa', position:['below']\" style=\"display:none; width: 100px;\">主营业务收入\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"主营业务收入\" id=\"zyywsr\" class=\"option_width\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\">\r\n                        <span id=\"caa\">利润总额</span>\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'caa', position:['below']\" style=\"display:none; width: 100px;\">利润总额\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"利润总额\" id=\"jlr\" class=\"option_width\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"daa\">主营业务利润</span>\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'daa', position:['below']\" style=\"display:none; width: 100px;\">主营业务利润\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div data-dojo-type=\"dijit/form/FilteringSelect\" data-dojo-props=\"queryExpr:'*$\\{0\\}*',required:false\" title=\"主营业务利润\" id=\"zyywlr\" class=\"option_width\" ></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tbody id=\"hidd_part\" style=\" display:none\">\r\n                <tr>\r\n                    <td>增长指标</td>\r\n                    <td></td>\r\n                    <td align=\"right\">\r\n                        <span id=\"bbc\">近三年总资产平均增长率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'bbc', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">近三年总资产平均增长率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"bcc\">近三年主营收入平均增长率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'bcc', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">近三年主营收入平均增长率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\">\r\n                        <span id=\"bdc\">近三年利润总额平均增长率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'bdc', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">近三年利润总额平均增长率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"bcb\">近三年资本保值增值率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'bcb', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">近三年资本保值增值率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>盈利能力</td>\r\n                    <td>\r\n         \r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"dda\">长期资本报酬率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'dda', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">长期资本报酬率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\"><span id=\"acc\">净资产收益率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit.Tooltip\" data-dojo-props=\"connectId:'acc', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 净资产收益率（%）\r\n                        </div>\r\n\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n                        <button class=\"btn_style\" data-dojo-type=\"dijit/form/Button\" id=\"btnExpand2\">\r\n                            展开︾\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n                <tr id=\"show_01\" style=\" display:none\">\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\">\r\n                        <span id=\"ddd\">总资产利润率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'ddd', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">总资产利润率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\"><span id=\"ssa\">毛利率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit.Tooltip\" data-dojo-props=\"connectId:'ssa', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 毛利率（%）\r\n                        </div>\r\n\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n\t\t\t\t\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr id=\"show_011\" style=\" display:none\">\r\n\t\t\t\t\t<td></td>\r\n\t\t\t\t\t<td></td>\r\n\t\t\t\t\t<td align=\"right\">\r\n                    <span id=\"fff\">销售净利率（%）</span>\r\n\r\n                    <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'fff', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">销售净利率（%）\r\n                    </div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<td>\r\n                    <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    至\r\n                    <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<td align=\"right\"><span id=\"ffa\">成本费用利润率（%）</span>\r\n\r\n                    <div data-dojo-type=\"dijit.Tooltip\" data-dojo-props=\"connectId:'ffa', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 成本费用利润率（%）\r\n                    </div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t<div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n\t\t\t\t\t<div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td></td>\r\n\t\t\t\t\t\r\n                </tr>\r\n                <tr>\r\n                    <td>经营能力</td>\r\n                    <td>\r\n                        <!--年度&nbsp\r\n                         <div data-dojo-type=\"dijit/form/ComboBox\" title=\"行业\" >\r\n                            <option value=\"机械设备\">2012</option>\r\n                            <option value=\"化工\">2012</option>\r\n                            <option value=\"医药生物\">2012</option>\r\n                            <option value=\"房地产\">房地产</option>\r\n                            <option value=\"信息服务\">信息服务</option>\r\n                        </div>-->\r\n                    </td>\r\n                    <td align=\"right\"><span id=\"aab\">总资产周转率（次）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'aab', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">总资产周转率（次）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"add\">固定资产周转率（次）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'add', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 固定资产周转率（次）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n                        <button class=\"btn_style\" data-dojo-type=\"dijit/form/Button\" id=\"btnExpand3\">\r\n                            展开︾\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n                <tr id=\"show_02\" style=\" display:none\">\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\"><span id=\"saa\">流动资产周转率（次）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'saa', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">流动资产周转率（次）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"qaa\">应收账款周转率（次）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qaa', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 应收账款周转率（次）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tr id=\"show_021\" style=\" display:none\">\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\"><span id=\"qqqa\">存货周转率（次）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qqqa', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">存货周转率（次）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"qqqb\">营业周期（天）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qqqb', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 营业周期（天）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>偿债能力</td>\r\n                    <td>\r\n                    </td>\r\n                    <td align=\"right\"><span id=\"aab\">流动比率（倍）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'aab', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">流动比率（倍）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"add\">速动比率（倍）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'add', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 速动比率（倍）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n                        <button class=\"btn_style\" data-dojo-type=\"dijit/form/Button\" id=\"btnExpand4\">\r\n                            展开︾\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n                <tr id=\"show_03\" style=\" display:none\">\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\"><span id=\"qab\">利息保障倍数（倍）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qab', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">利息保障倍数（倍）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"qac\">资产负债比率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qac', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">资产负债比率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n\t\t\t\t <tr id=\"show_031\" style=\" display:none\">\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\"><span id=\"qaba\">产权比率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qaba', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">产权比率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"qaca\">长期负债比率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qaca', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">长期负债比率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <td>成长能力</td>\r\n                    <td>\r\n                        <!--年度&nbsp\r\n                         <div data-dojo-type=\"dijit/form/ComboBox\" title=\"行业\" >\r\n                            <option value=\"机械设备\">2012</option>\r\n                            <option value=\"化工\">2012</option>\r\n                            <option value=\"医药生物\">2012</option>\r\n                            <option value=\"房地产\">房地产</option>\r\n                            <option value=\"信息服务\">信息服务</option>\r\n                        </div>-->\r\n                    </td>\r\n                    <td align=\"right\"><span id=\"aab\">主营业务收入增长率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'aab', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">主营业务收入增长率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"add\">总资产增长率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'add', position:['below']\"\r\n                             style=\"display:none; width: 100px;\"> 总资产增长率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n                        <button class=\"btn_style\" data-dojo-type=\"dijit/form/Button\" id=\"btnExpand5\">\r\n                            展开︾\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n                <tr id=\"show_04\" style=\"display:none\">\r\n                    <td></td>\r\n                    <td></td>\r\n                    <td align=\"right\"><span id=\"qad\">利润总额增长率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qad', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">利润总额增长率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td align=\"right\">\r\n                        <span id=\"qae\">资本保值增值率（%）</span>\r\n\r\n                        <div data-dojo-type=\"dijit/Tooltip\" data-dojo-props=\"connectId:'qae', position:['below']\"\r\n                             style=\"display:none; width: 100px;\">资本保值增值率（%）\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                        至\r\n                        <div data-dojo-type=\"dijit/form/ComboBox\" data-dojo-props=\"hasDownArrow:false\" style=\"width:40px\"></div>\r\n                    </td>\r\n                    <td>\r\n\r\n                    </td>\r\n                </tr>\r\n                </tbody>\r\n                </table>\r\n                </div>\r\n            </div>\r\n\t\t\t<div id=\"hidTop\"  style=\"position: absolute; top: 260px;width:100%; height:7px;z-index: 999;text-align: center;\">\r\n\t\t\t\t<img id=\"hidTopImg\" src=\"../firms/resources/img/up.png\"/>\r\n\t\t\t</div>\r\n\t\t\t<!--margin-top: -297px; padding-top: 297px; id=\"hidTop\"  class=\"hidTopBut\" -->\r\n            <div data-dojo-type=\"dijit/layout/TabContainer\" style=\"height:100%;box-sizing: border-box;margin-top: -297px; padding-top: 280px; \" id=\"table_bo_list\">\r\n\t\t\t<div id=\"imgLoadingDiv\"  style=\"position: absolute; display: none; width:100%;height:100%;\">\r\n\t\t\t\t<img src=\"../firms/resources/img/Loading.jpg\" style=\" position: absolute;top:30% ;left:50%; height:40px ;width:40px; \" />\r\n\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div id=\"button_top\" class=\"btn_top\">\r\n\t\t\t\t<a id=\"dbcp\">对比企业<b id='dbNumber'>0</b>家</a>|<a style=\"color: #FF5A1A;\" href=\"#\" >去对比</a>\r\n\t\t\t</div>\r\n                \r\n\t\t\t<div id=\"dbcp_tab\">\r\n\t\t\t\t<table id=\"dbTab\" class=\"tab_db\" >\r\n\t\t\t\t\t<colgroup>\r\n\t\t\t\t\t\t<col width=\"85%\" />\r\n\t\t\t\t\t\t<col width=\"15%\" />\r\n\t\t\t\t\t</colgroup>\r\n\t\t\t\t</table>\r\n\t\t\t\t<div class=\"tab_btn\">\r\n\t\t\t\t\t<input id=\"delAll\" type=\"button\" value=\"取消对比\" class=\"btn_css\" />\r\n\t\t\t\t\t<input id=\"beginDB\" type=\"button\" value=\"去对比\" class=\"btn_css\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>  \r\n\t\t\t<div id=\"button_left\" class=\"btn_top\" style=\"width:60px;right:15px;\">\r\n\t\t\t\t<a id=\"favcp\" href=\"#\"  style=\"cursor:pointer; color:#000000;\">我的收藏夹</a>\r\n\t\t\t</div>\r\n                \r\n\t\t\t<div id=\"favcp_tab\"  style=\"right:15px;\">\r\n\t\t\t\t<div style=\"height: 12px;background: #f2f5f9;padding: 5px 10px;font-weight: bold;\">请选择收藏夹：</div>\r\n\t\t\t\t<table id=\"favTab\" class=\"tab_db\" border=\"0\">\r\n\t\t\t\t\t<colgroup>\r\n\t\t\t\t\t\t<col width=\"10%\" />\r\n\t\t\t\t\t\t<col width=\"90%\" />\r\n\t\t\t\t\t</colgroup>\r\n\t\t\t\t\t\r\n\t\t\t\t\t<tr id=\"scj0\">\r\n\t\t\t\t\t\t<td>▶</td>\r\n\t\t\t\t\t\t<td>收藏夹1</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr id=\"scj1\">\r\n\t\t\t\t\t\t<td>▶</td>\r\n\t\t\t\t\t\t<td>收藏夹2</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr id=\"scj2\">\r\n\t\t\t\t\t\t<td>▶</td>\r\n\t\t\t\t\t\t<td>收藏夹3</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t\t<div class=\"tab_btn\">\r\n\t\t\t\t\t<input id=\"done\" type=\"button\" value=\"确定\" class=\"btn_css\" />\r\n\t\t\t\t\t<input id=\"cancel\" type=\"button\" value=\"取消\" class=\"btn_css\" />\r\n\t\t\t\t</div>\r\n\t\t\t</div>  \r\n\t\t\t<div id=\"eroDialog\" data-dojo-type=\"dijit/Dialog\" style=\"top:100px;left:50%;height:80px ;width:300px;\">请先输入财务年度！</div>\r\n\t\t\t<div id=\"dbOver\" data-dojo-type=\"dijit/Dialog\" style=\"top:100px;left:50%;height:80px ;width:300px;\">“最多只能同时对比5家企业！”</div>\r\n\t\t\t<div id=\"favSuc\" data-dojo-type=\"dijit/Dialog\" style=\"top:100px;left:50%;height:80px ;width:300px;\"></div>\r\n        </div>\r\n    </div>\r\n</div>"}});
define("stock/firms/src", [
    'dojo/parser',
    'stock/firms/view/search'
], function (parser) {
    return function () {
        parser.parse().then(function () {

        });
    };
});