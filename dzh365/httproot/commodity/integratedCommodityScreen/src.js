/*
	Copyright (c) 2012-2013,   To get sources and documentation, please visit:

		http://dms.gw.com.cn
*/

//>>built
require({cache:{"commodity/integratedCommodityScreen/view/main":function(){define("dojo/_base/declare,dijit/_WidgetBase,dijit/_TemplatedMixin,dijit/_WidgetsInTemplateMixin,dijit/layout/_ContentPaneResizeMixin,dojo/_base/array,dojo/_base/lang,dijit/registry,dojo/text!./main.html,dojo/parser,dojox/slickgrid/slickgrid,dojox/slickgrid/quotegrid,dojo/store/Memory,dojox/store/GridWSStore,dojox/kline/Kline,commodity/integratedCommodityScreen/public/htmlFormat,commodity/integratedCommodityScreen/public/dataFormat,dojox/store/KlineWSStore,dojo/topic,dijit/layout/ContentPane,dijit/layout/TabContainer".split(","),
function(g,h,b,d,a,e,c,f,l,m,i,o,p,j,q,n,r,s,t){return g("demos.quotegrid.view.main",[h,b,d,a],{templateString:l,handle:null,postMixInProperties:function(){},startup:function(){this.inherited(arguments);this.bindBtnEvents();this.createNewsGrid();this.createDraw();this.createGrid()},bindBtnEvents:function(){var a=this;dijit.byId("newsBtns").getChildren().forEach(function(b){var c=b.searchKey;b.on("click",function(){a.queryNews(c,!1)})})},queryNews:function(a,b){var d,e={service:"rpc",so:"jso-ui-zhpnews.jar",
"function":"gw.sh.func.SearchByRegexRequest",paraencode:"base64",response_times:-1,response_mode:0};"yw"==a?d=c.mixin({},e,{parameter:btoa('{"fids":"C1,C2,C3,C4,C8,C16","code":"000000000001000100010001","dcategory":"1-100","sort":"C16:-1","skip":"0","amount":"50"}')}):"ncp"==a?d=c.mixin({},e,{parameter:btoa('{"fids":"C1,C2,C3,C4,C8,C16","code":"0000000000010001000100010000","dcategory":"1-100","sort":"C16:-1","skip":"0","amount":"50"}')}):"js"==a?d=c.mixin({},e,{parameter:btoa('{"fids":"C1,C2,C3,C4,C8,C16","code":"0000000000010001000100010001","dcategory":"1-100","sort":"C16:-1","skip":"0","amount":"50"}')}):
"nyhg"==a&&(d=c.mixin({},e,{parameter:btoa('{"fids":"C1,C2,C3,C4,C8,C16","code":"0000000000010001000100010002","dcategory":"1-100","sort":"C16:-1","skip":"0","amount":"50"}')}));var f=new j,g=function(){f.req_seq&&f.cancel(f.req_seq);f.query(d).then(function(a){var b=[];if(a)for(var c=0;50>c;c++)b[c]={id:a[c].C1,orgin:c+1+") "+a[c].C8,time:a[c].C16,title:a[c].C3,link:a[c].C4};dijit.byId("scrollNews").refresh(b)})};g();b||this.handle.remove();this.handle=t.subscribe("integratedCommodityScreen/topic",
function(){g()})},createDraw:function(){document.getElementById("tuli").innerHTML="\u8c46\u4e00\u8fde\u7eed";var a={store:new s,query:{obj:[{code:"DCa0001.cmdty"}]},chartParams:{type:4,toFixNum:2,timetrendType:1,timetrendIsFill:!0},plotCss:{background:"#111",timetrendFillColors:["#111111","#0071FB"],timetrendFillAlpha:0.7}};this.kline=new q(a,"fenshitu");this.kline.startup()},createGridDetail:function(a,b){function d(a,b,e){var f=new r,k=new j({idProperty:"stockid",data:a,formatter:function(a){var b=
a[0];if(0==b["new"]){var d=b.stockid,a=["SELECT B.CO,B.C10,B.C12,B.C14,B.C5,B.C2,B.C7 FROM ( SELECT CO,max(c2) C2 FROM ST28002_main WHERE CO ='",d,"' GROUP BY CO) A LEFT JOIN ST28002_main B ON A.CO = B.CO AND A.C2 = B.C2"].join(""),e=new j;e.req_seq?e.cancel(k.req_seq):e.query({service:"sql",dbtype:"mysql",sql:a,response_times:1,response_mode:0}).then(function(a){if(a[0]){b.his=!0;b["new"]=a[0].C10;b.updn=a[0].C12;b.open=isNaN(a[0].C7)?0:a[0].C7;b.time=a[0].C2;for(var e in b)b[e]=f.handleRawData(e,
b[e]);i.updateRow(k.index[d]);i.oldVRangeValues[d]=c.clone(b[0])}})}else{for(e in b)b[e]=f.handleRawData(e,b[e]);return b}}}),i=new o({store:k,service:"objinfo",type:"getinfo",field:"obj,new,lastclose,open,high,low,presettle,updn,time",columns:h,options:g},"newGrid"+b);i.startup();i.on("click",c.hitch(e,function(a){var b=a.target.dataset.id,a=a.target.dataset.name;if(null!=b&&""!=b&&null!=a&&""!=a)document.getElementById("tuli").innerHTML=a,e.kline.changeCode({code:b})}));i.on("dblclick",function(a){location.href=
" DZH://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2\u9ed8\u8ba4&PAGE=\u5206\u65f6\u8d70\u52bf&LABEL="+a.target.dataset.id})}var e=this,f=new n,g={colDragMode:"fixOtherColsBorder",forceFitColumns:!0,hideBorder:"all"};if(6!=b){var h=[{id:"scodeName",name:"\u540d\u79f0",field:"stockname",width:105,formatter:f.hidden,cssClass:"font-left",headerCssClass:"font-center",sortable:!0},{id:"newPrice",name:"\u6700\u65b0",field:"new",width:69,formatter:f.priceNewFormatter,cssClass:"font-right",headerCssClass:"font-center",
sortable:!0},{id:"priceUd",name:"\u6da8\u8dcc",field:"updn",width:69,formatter:f.priceUdFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"open",name:"\u4eca\u5f00",field:"open",width:69,formatter:f.priceFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"lastClose",name:"\u6628\u6536",field:"lastclose",width:69,formatter:f.priceLsclosFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"time",name:"\u65f6\u95f4",field:"time",
formatter:f.timeFormatter,width:55,cssClass:"font-center",headerCssClass:"font-center",sortable:!0}];(new j).query(a).then(function(a){d(a,b,e)})}else h=[{id:"scodeName",name:"\u540d\u79f0",field:"stockname",width:105,formatter:f.hidden,cssClass:"font-left",headerCssClass:"font-center",sortable:!0},{id:"newPrice",name:"\u6700\u65b0",field:"new",width:69,formatter:f.priceNewFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"priceUd",name:"\u6da8\u8dcc",width:69,field:"updn",
formatter:f.priceUdFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"high",name:"\u6700\u9ad8",field:"high",width:69,formatter:f.priceFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"low",name:"\u6700\u4f4e",field:"low",width:69,formatter:f.priceFormatter,cssClass:"font-right",headerCssClass:"font-center",sortable:!0},{id:"time",name:"\u65f6\u95f4",field:"time",width:55,formatter:f.timeFormatter,cssClass:"font-center",headerCssClass:"font-center",
sortable:!0}],d([{stockid:"IXUDI.index",stockname:"\u7f8e\u5143\u6307\u6570"},{stockid:"IXSPX.index",stockname:"\u6807\u666e500\u6307\u6570"},{stockid:"IXDJIA.index",stockname:"\u9053\u743c\u65af\u5de5\u4e1a\u6307\u6570"},{stockid:"IXN225.index",stockname:"\u65e5\u7ecf225"},{stockid:"IXCRBI.index",stockname:"R/J CRB\u6307\u6570"},{stockid:"SPEC3XX.index",stockname:"\u6807\u666eGSCI\u52a0\u5f3a\u5546\u54c1\u603b\u6536\u76ca"},{stockid:"SPG05XX.index",stockname:"\u6807\u666eGSCI\u519c\u4ea7\u54c1\u603b\u6536\u76ca"},
{stockid:"SPG46XX.index",stockname:"\u6807\u666eGSCI\u80fd\u6e90\u603b\u6536\u76ca"},{stockid:"SPG63XX.index",stockname:"\u6807\u666eGSCI\u5de5\u4e1a\u91d1\u5c5e\u603b\u6536\u76ca"},{stockid:"IXPLYI.index",stockname:"\u6ce2\u7f57\u7684\u6d77BDI\u6307\u6570"}],b,e)},createGrid:function(){for(var a="(108073,108074,108079,108078,108082,108083) (108075,108076,108080,108085,108086) (108045,108051,108056) (108047,108048,108049,108053,108054,108058,108059) (108062,108063,108068,108069) (108065,108066,108071)".split(" "),
b=0;b<a.length;b++)this.createGridDetail({service:"sql",dbtype:"mysql",sql:"SELECT DISTINCT CO stockid,C8 stockname FROM ST41503_main WHERE C10=1 AND C7=-1 AND  length(CO)>0 and C2 in "+a[b],response_times:1,response_mode:0},b);this.createGridDetail("",6)},createNewsGrid:function(){var a;a=new n;a=[{id:"orgin",name:"\u6765\u6e90 ",field:"orgin",width:125,formatter:a.hiddenNewsId,headerCssClass:"font-center",cssClass:"font-yellow font-left"},{id:"time",name:"\u65f6\u95f4",field:"time",width:55,formatter:a.dateTimeformat,
headerCssClass:"font-center",cssClass:"font-center"},{id:"title",name:"\u6807\u9898",field:"title",width:230,formatter:a.hiddenNewsId,headerCssClass:"font-center",cssClass:"font-yellow font-left"}];var b=new p({data:[]});a=new i({store:b,columns:a,options:{colDragMode:"fixOtherColsBorder",hideBorder:"all"}},"scrollNews");a.startup();this.queryNews("yw",!0);a.on("click",function(a){location.href="dzh://browse?'dzhd://DZH2/news/nBrowse.dzh.ui?nID="+a.target.dataset.id+"&dc=1'"})}})})},"url:commodity/integratedCommodityScreen/view/main.html":'<div data-dojo-attach-point="containerNode">\r\n\t<div class="hbox mainDrawTowLine">\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u56fd\u5185\u519c\u4ea7\u54c1</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div  id="newGrid0"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u56fd\u9645\u519c\u4ea7\u54c1</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div id="newGrid1"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u5206\u65f6\u56fe</div>\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\r\n\t\t\t\t<span id="tuli" class="slick-column-name"></span><span class="slick-column-name">&nbsp;\u5206\u65f6\u8d70\u52bf</span>\r\n\t\t\t</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid" style="height:173px">\r\n\t\t\t\t<div id="fenshitu"  style="height:100%"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="hbox mainDrawTowLine">\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u56fd\u5185\u91d1\u5c5e</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div id="newGrid2"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u56fd\u9645\u91d1\u5c5e</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div id="newGrid3"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u76f8\u5173\u884c\u60c5</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div id="newGrid6"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class="hbox mainDrawTowLine">\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u56fd\u5185\u80fd\u6e90\u5316\u5de5</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div id="newGrid4"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div class="dijitRegionalPane">&nbsp;\u56fd\u9645\u80fd\u6e90\u5316\u5de5</div>\r\n\t\t\t<div data-dojo-type="dijit.layout.ContentPane" class="mainGrid">\r\n\t\t\t\t<div id="newGrid5"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="vbox myvbox">\r\n\t\t\t<div data-dojo-type="dijit/layout/ContentPane" class="hbox dijitRegionalPane" id="newsBtns">\r\n\t\t\t\t&nbsp;<button data-dojo-type="dijit/form/Button" data-dojo-props="searchKey:\'yw\'">\u8981\u95fb</button>\r\n\t\t\t\t&nbsp;<button data-dojo-type="dijit/form/Button" data-dojo-props="searchKey:\'ncp\'">\u519c\u4ea7\u54c1</button>\r\n\t\t\t\t&nbsp;<button data-dojo-type="dijit/form/Button" data-dojo-props="searchKey:\'js\'">\u91d1\u5c5e</button>\r\n\t\t\t\t&nbsp;<button data-dojo-type="dijit/form/Button" data-dojo-props="searchKey:\'nyhg\'">\u80fd\u6e90\u5316\u5de5</button>\r\n\t\t\t</div>\r\n\t\t\t<div data-dojo-type="dijit/layout/ContentPane" class="spacer">\r\n\t\t\t\t<div id="scrollNews"></div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<\!-- \r\n\t\t\t<div class="dijitRegionalPane">\r\n\t\t\t\t<span data-dojo-type="dijit/layout/StackController" id="controller" containerId="myStackContainer">\r\n\t\t\t\t</span>\r\n\t\t\t</div>\r\n\t\t\t<div id="myStackContainer" data-dojo-type="dijit/layout/StackContainer" class="mainGrid">\r\n\t\t\t\t<div id="newsGrid1" data-dojo-type="dijit/layout/ContentPane" title="\u8981\u95fb">\r\n\t\t\t\t\t<div id="scrollNews0"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id="newsGrid2" data-dojo-type="dijit/layout/ContentPane" title="\u519c\u4ea7\u54c1">\r\n\t\t\t\t\t<div id="scrollNews1"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id="newsGrid3" data-dojo-type="dijit/layout/ContentPane" title="\u91d1\u5c5e">\r\n\t\t\t\t\t<div id="scrollNews2"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div id="newsGrid4" data-dojo-type="dijit/layout/ContentPane" title="\u80fd\u6e90\u5316\u5de5">\r\n\t\t\t\t\t<div id="scrollNews3"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t --\>\r\n\t\t</div>\r\n\t</div>\r\n</div>',
"commodity/integratedCommodityScreen/public/htmlFormat":function(){define(["dojo/_base/declare","dojox/slickgrid/formatter/formattersQuote"],function(g,h){return g([h],{_getOldRowValue:function(b,d){return(d.get("oldVRangeValues")||{})[b.obj]},_getOldCellValue:function(b,d,a){_this._getOldRowValue(d,a);return oldV},timeFormatter:function(b,d,a,e,c,f){if((b=_this._getOldRowValue(c,f))&&b.his)return a=a.substr(4,2)+"/"+a.substr(6,2),["<div data-id='",c.obj,"' title='",a,"' data-name='",c.stockname,
"'>",a,"</div>"].join("");if(0==c["new"]||void 0==a)return["<div data-id='",c.obj,"' data-name='",c.stockname,"'>-</div>"].join("");b=new Date(parseFloat(a)+"000"-288E5);d=b.getMonth()+1;e=b.getDate();f=new Date;f.getMonth();if(f.getDate()!=e){if(14==a.length)return a=a.substr(4,2)+"/"+a.substr(6,2),["<div data-id='",c.obj,"' title='",a,"' data-name='",c.stockname,"'>",a,"</div>"].join("");a=(10>d?"0":"")+d+"/"+((10>e?"0":"")+e);return["<div style='overflow:hidden;text-overflow:ellipsis;' data-id='",
c.obj,"' title='",a,"' data-name='",c.stockname,"'>",a,"</div>"].join("")}a=(10>b.getHours()?"0":"")+b.getHours()+":"+((10>b.getMinutes()?"0":"")+b.getMinutes());return["<div style='overflow:hidden;text-overflow:ellipsis;' data-id='",c.obj,"' title='",a,"' data-name='",c.stockname,"'>",a,"</div>"].join("")},priceFormatter:function(b,d,a,e,c){b=a>c.lastclose;d=a<c.lastclose;return 0==c["new"]||void 0==a?["<div data-id='",c.obj,"' data-name='",c.stockname,"'>-</div>"].join(""):['<div style="overflow:hidden;text-overflow:ellipsis;" class="',
b?"font-red":d?"font-green":"",'"title="',a,'" data-id ="',c.obj,'" data-name ="',c.stockname,'">',a,"</div>"].join("")},priceNewFormatter:function(b,d,a,e,c,f){if(void 0==a||null==a||0==a)return["<div data-id='",c.obj,"' data-name='",c.stockname,"'>-</div>"].join("");e=(b=(f.get("oldVRangeValues")||{})[c.obj])?b[e.field]:void 0;return['<div class="',0==c["new"]?"":c["new"]>c.open?"font-red":c["new"]<c.open?"font-green":"",'"title="',a,'" data-id ="',c.obj,'" data-name ="',c.stockname,'">',e>a?"\u2193":
e<a?"\u2191":"",a,"</div>"].join("")},priceLsclosFormatter:function(b,d,a,e,c){return void 0==a||""==a?["<div data-id='",c.obj,"' data-name='",c.stockname,"'>-</div>"].join(""):['<div style="overflow:hidden;text-overflow:ellipsis;" class="',0==c.presettle?"":c.lastclose>c.presettle?"font-red":c.lastclose<c.presettle?"font-green":"",'"title="',a,'" data-id ="',c.obj,'" data-name ="',c.stockname,'">',a,"</div>"].join("")},priceUdFormatter:function(b,d,a,e,c,f){if(void 0==c["new"]||0==c["new"])return["<div data-id='",
c.obj,"' data-name='",c.stockname,"'>-</div>"].join("");a=Math.abs(a);a=0>a.toString().indexOf(".")?parseFloat(a):parseFloat(a).toFixed(2);e=(b=(f.get("oldVRangeValues")||{})[c.obj])?Math.abs(b[e.field]):void 0;return['<div class="',0==c.updn?"":0<c.updn?"font-red":0>c.updn?"font-green":"",'"title="',a,'" data-id ="',c.obj,'" data-name ="',c.stockname,'">',e>a?"\u2193":e<a?"\u2191":"",a,"</div>"].join("")},hidden:function(b,d,a,e,c){return["<div data-id=",c.obj," data-name='",c.stockname,"' style='overflow:hidden;text-overflow:ellipsis;' class='font-yellow' title='",
a," '>",a," </div>"].join("")},hiddenNewsId:function(b,d,a,e,c){return["<div data-id=",c.id," style='overflow:hidden;text-overflow:ellipsis;' title='",a," '> ",a,"</div>"].join("")},dateTimeformat:function(b,d,a,e,c){a=a.substr(8,2)+":"+a.substr(10,2);return["<div data-id=",c.id," style='overflow:hidden;text-overflow:ellipsis;' class='font-yellow font-left' title='",a,"'>",a,"</div>"].join("")}})})},"dojox/slickgrid/formatter/formattersQuote":function(){define("dojox/slickgrid/formatter/formattersQuote",
["dojo/_base/declare","dojox/slickgrid/formatter/_formattersBaseFunc"],function(g,h){return g([h],{keepPrecision:function(b,d,a){return _this._keepPrecision(a)},index:function(b){return'<a><div class="font-gray">'+parseInt(b+1)+"</div></a>"},stockCode:function(b,d,a,e,c,f){a=a.replace(".stk","").replace("SH","").replace("SZ","");return _this.lineFontColor(b,d,a,e,c,f)},underlineDecimal:function(b,d,a){return a?(d=a.indexOf("."),b=a.substring(0,d),a=a.substring(d+1,a.length),b+"<span style='text-decoration:underline'>"+
a+"</span>"):"--"},cellBgColor:function(b,d,a,e){b="--";a&&(e=_this._nodeCellChangeState(a,e),b="","g"==e?b="#FDCCDA":"l"==e&&(b="#D3FEBC"),imgStr='<img src="" style="display:none"  onerror= "  var img=this;   setTimeout(function(){    \tif(img.parentNode){    \t\timg.parentNode.style.backgroundColor=\'transparent\' ;    \t}     },1000);  " />',b='<div style=" background-color:'+b+' " >'+a+imgStr+"</div>");return b},nullToGG:function(b,d,a){b="";return b=a?_this.charsReplace(a):"--"},nullToBlank:function(b,
d,a){b="";a&&(b=_this.charsReplace(a));return b},addMinusSign:function(b,d,a){if(0>a)return"-"+vaule},addMinusSignAndColor:function(b,d,a){return 0>a?"<div class='font-green'>-"+vaule+"</div>":0<a?"<div class='font-red'>"+vaule+"</div>":"<div class='font-gray'>"+vaule+"</div>"},addBothSign:function(b,d,a){return 0<a?"+"+vaule:0>a?"-"+vaule:a},treeGridFormatter:function(b,d,a,e,c){return"<div style='padding-left:"+15*c.indentation+"px' ><span class='"+("leaf"==c._collapsed?"place-holder":"toggle "+
("collapse"==c._collapsed?"collapse":"expand"))+"'></span>"+a+"</div>"},addBothSignAndColor:function(b,d,a){return 0>a?"<div class='font-green'>-"+vaule+"</div>":0<a?"<div class='font-red'>+"+vaule+"</div>":"<div class='font-gray'>"+vaule+"</div>"},firstItem:function(b,d,a){return a instanceof Array?(b=a.shift(),_this._keepPrecision(b)):""},lastItem:function(b,d,a){return a instanceof Array?(b=a.pop(),_this._keepPrecision(b)):""},grayFont:function(b,d,a){a=_this._keepPrecision(a);return'<div class="font-gray">'+
a+"</div>"}})})},"dojox/slickgrid/formatter/_formattersBaseFunc":function(){define("dojox/slickgrid/formatter/_formattersBaseFunc",["dojo/_base/declare","dojox/slickgrid/formatter/_formattersBase"],function(g,h){return g([h],{precision:2,_keepPrecision:function(b,d){if(null==b)return"";var a=new Number(b);return a==b?a.toFixed(d||_this.precision):b.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},_nodeCellChangeState:function(b,d){if(null==b)return"e";var b=parseFloat(b),
a=void 0;d&&(a=""==d.innerText?"":parseFloat(d.innerText));return void 0==a||""==a||a==b?"e":b>a?"g":"l"},charsReplace:function(b){return null==b?"":b.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},lineFontColor:function(b,d,a,e,c,f){d=_this._getColorClass(c["new"],c.lastclose);return f.rowsCache[b]?(f.rowsCache[b].removeClass("font-red"),f.rowsCache[b].removeClass("font-gray"),f.rowsCache[b].removeClass("font-green"),f.rowsCache[b].addClass(d),a):"<div>"+a+('<img class src="" style="display:none" onerror=" dojo.query(this.parentNode.parentNode.parentNode).addClass(\''+
d+"'); \" />")+" </div>"},_minus:function(b,d){return b-d},_compareValue:function(b,d){return b>d?"g":b==d?"e":"l"},_getColorClass:function(b,d){var a=_this._compareValue(b,d);return"g"==a?"font-red":"e"==a?"font-gray":"font-green"},_addPlusMinusSign:function(b){0<b&&(b="+"+b);return b}})})},"dojox/slickgrid/formatter/_formattersBase":function(){define("dojox/slickgrid/formatter/_formattersBase",["dojo/_base/declare","dojo/aspect"],function(g,h){return g([],{_this:null,beforeFuncs:[],afterFuncs:[],
bothFuncs:[],constructor:function(b){g.safeMixin(this,b);_this=this;if(_this.before||_this.after){var b=_this.__proto__,d=","+this.beforeFuncs.concat(this.bothFuncs).join(",")+",",a=","+this.afterFuncs.concat(this.bothFuncs).join(",")+",",e;for(e in b)if("function"==typeof b[e]){var c=","+e+",";_this.before&&-1<d.indexOf(c)&&h.before(_this,e,function(a,b,c,d,e,g){if(a=_this.before(a,b,c,d,e,g))return a});_this.after&&-1<a.indexOf(c)&&h.after(_this,e,function(a,b,c,d,e,g){return _this.after(a,b,c,
d,e,g)})}}}})})},"commodity/integratedCommodityScreen/public/dataFormat":function(){define(["dojo/_base/declare","dojox/slickgrid/formatter/formattersQuote"],function(g){return g([],{handleRawData:function(g,b){return g in{"new":"",updn:"",open:"",lastclose:"",high:"",low:"",presettle:""}?(value=parseFloat(b).toString(),value=0>value.indexOf(".")?parseFloat(value):parseFloat(value).toFixed(2)):b}})})},"dojox/store/KlineWSStore":function(){define("dojox/store/KlineWSStore","dojo/_base/declare,dojo/_base/lang,dojo/json,dojo/Deferred,dojo/store/util/QueryResults,dojo/store/Observable,dojo/_base/array,dojo/io-query,dojo/topic,dojox/store/WebSocket".split(","),
function(g,h,b,d,a,e,c,f,l,m){return g("dojox.store.KlineWSStore",m,{convert:function(a){return[a]}})})}}});define("commodity/integratedCommodityScreen/src",["dijit/dijit","dojo/parser","dojo/topic","dojo/ready","commodity/integratedCommodityScreen/view/main"],function(g,h,b){return function(){h.parse();var d;(function(){d&&clearInterval(d);d=setInterval(function(){b.publish("integratedCommodityScreen/topic",{msg:"["+(new Date).toLocaleString()+"]\u5b9a\u65f6\u5237\u65b0\u6570\u636e!"})},1E4)})()}});