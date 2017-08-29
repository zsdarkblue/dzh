define("repositories/news",["repository_base"],function(t){return new(t.extend({getNewsDrive:function(t){return $.send("/rpc",{so:"jso-ui-zhpnews.jar","function":"gw.sh.func.NewsDriveRequest",paraencode:"base64",parameter:btoa(JSON.stringify({type:t}))},{after:function(t){if(t&&t.length)switch(Number(this)){case 1:t.forEach(function(t){if(t.C10){var e=t.C10.split(","),i=t.C3a.split(","),n=t.C3c.split(","),s=t.C4c.split(","),r=t.C5c.split(",");t.stocks=[],t.obj=e[0],t.C3a=i[0],t.chg=[n[0],s[0],r[0]],t.C8=t.C8.split(",")[0];for(var o=0,h=e.length;h>o;o++)t.stocks.push({obj:e[o],name:i[o]})}});break;case 2:t.forEach(function(t){if(t.C10){var e=(t.C10||"").split(","),i=t.C3b.split(",");t.commodities=[],t.obj=e[0],t.name=i[0];for(var n=0,s=e.length;s>n;n++)t.commodities.push({obj:e[n],name:i[n],C3a:t.C3a})}})}return t}.bind(t)})}}))}),define("presenters/stocks",["presenter_base","../repositories/news"],function(t,e){return t.extend(function(){this.view.on("filterInput",this.onFilterInput.bind(this)),this.view.on("stockFilterChange",this.onStockFilterChange.bind(this))},{filters:{},onInit:function(){e.getNewsDrive(1).then(function(t){this.view.renderGrid(t)}.bind(this))},onFilterInput:function(t){t?this.filters.search=function(t){return[t.C3,t.C10,t.C3a].join("\n").indexOf(this)>-1}.bind(t):delete this.filters.search,this.filterItems()},onStockFilterChange:function(t){switch(t){case 1:case 2:this.filters.stock=function(t){return this.test(t.obj)}.bind([,/^S[HZ]/,/^HK/][t]);break;default:delete this.filters.stock}this.filterItems()},filterItems:function(){var t=this.view.mainGrid.items;for(var e in this.filters)t=t.filter(this.filters[e]);this.view.mainGrid.setRows(t)}})}),define("views/stocks",["view_base","../presenters/stocks","quotes_grid","select"],function(t,e,i){var n=t.extend(function(){this.filter.on("input",this.onFilterInput.bind(this)),this.grids.eq(0).on("mouseenter","td:nth-of-type(2)",this.onCellMouseEnter.bind(this))},{onFilterInput:function(t){this.emit("filterInput",t.currentTarget.value.trim())},onCellMouseEnter:function(t){var e=this.mainGrid.getItem(t.currentTarget.parentNode.dataset.index);if(e&&e.stocks.length>1){var n=$(t.currentTarget),s=n.offset(),r=n.height(),o=this.tips.outerHeight(),h=this.root.height();s.top+=r,s.left+=14,s.top+o>h&&(s.top-=o+r),this.tipGrid=this.tipGrid||new i(this.grids[1],{columns:[{width:"100",name:"代码",css:"blue l",value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.obj.split(".")[0]+"</a>"}},{width:"75",name:"名称",title:!0,css:"l",value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.name+"</a>"}},{width:"50",name:"最新",color:!0,value:function(t){return this.fixValue(this.fixLastTrade(t))}},{width:"60",name:"涨幅",color:!0,value:function(t){return this.fixPercent(this.fixChg(t))}},{width:"auto",name:"",value:function(){return""}}],items:[]}),this.tipGrid.setItems(e.stocks),this.tips.css(s).show(),this.tipSelector=[t.currentTarget.parentNode,this.tips],this.onCellMouseLeave=function(t){$(t.target).closest(this.tipSelector).length||(this.tips.hide(),this.root.off("mousemove",this.onCellMouseLeave))}.bind(this),this.root.on("mousemove",this.onCellMouseLeave)}else this.tips.hide()},renderGrid:function(t){this.mainGrid=new i(this.grids[0],{fields:"new,lastclose,volume",columns:[{width:"40",name:"序号",css:"white c",value:function(t,e){return e+1}},{width:"20",name:"",css:"blue r",value:function(t){return t.stocks.length>1?'<i class="fa fa-caret-down"></i>':""}},{width:"auto",name:"标题",title:!0,css:"white l",sort:!0,value:function(t){return"<a href=\"dzh://navigate?'root://news/details/index.html#"+t.C1+"#DZHPOPUP(854,504)#'\">"+t.C3+"</a>"}},{width:"70",name:"时间",css:"white",sort:!0,value:function(t){return this.fixTime(t.C6)}},{width:"70",name:"影响力",css:"c",sort:function(t){return Number(t.C28i)},value:function(t){for(var e=Number(t.C28i),i=['<i class="',0===e?"white":0>e?"green":"red",'">'],n=0,s=Math.abs(e);s>n;n++)i.push("★");return i.push(s?"":"☆","</i>"),i.join("")}},{width:"90",name:"<select data-option><option>股票</option><option>A股</option><option>H股</option></select>",css:"blue l",sort:!0,value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.obj.split(".")[0]+"</a>"}},{width:"100",name:"简称",css:"l",sort:!0,value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.C3a+"</a>"}},{width:"60",name:"最新",color:!0,sort:!0,value:function(t){return this.fixValue(this.fixLastTrade(t))}},{width:"70",name:"涨幅",color:!0,sort:!0,value:function(t){return this.fixPercent(this.fixChg(t))}},{width:"100",name:"<select data-option><option>周涨幅</option><option>月涨幅</option><option>季涨幅</option></select>",color:function(t,e,i){return this.fixColor(parseFloat(this.parse(t,this.columns[i],e,i)))},sort:!0,value:function(t){return this.fixPercent(100*(t.chg[this.chgIndex]*((t.new||t.lastclose)/t.lastclose||1)-1))}},{width:"70",name:"换手率",sort:!0,value:function(t){return this.fixPercent(t.volume/t.C7c.split(",")[0])}},{width:"125",name:"行业",css:"white l",sort:!0,value:function(t){return t.C8}}],items:t,chgIndex:0,init:function(){this.send(),this.items.forEach(function(t){this.items[t.obj]instanceof Array?this.items[t.obj].push(t):this.items[t.obj]=[t]},this),this.base(arguments)},compare:function(t){return function(t,e){return this(t,e)||t.C1.localeCompare(e.C1)}.bind(this.base(t))},updateItems:function(t){t.length&&t.forEach(function(t){var e=this.items[t.obj];if(e)for(var i=0,n=e.length;n>i;i++)this.updateItem(e[i],t)},this),this.refresh(!0)},onCreate:function(t){t.target.find("thead")[0].addEventListener("mousedown",function(t){"SELECT"===t.target.tagName&&t.stopPropagation()},!0),t.target.find("select").eq(0).on("change",function(t){this.emit("stockFilterChange",t.target.selectedIndex)}.bind(this)).widget("select"),t.target.find("select").eq(1).on("change",function(t){this.chgIndex=t.target.selectedIndex,this.target.find("th").removeClass("asc desc"),this.sort(9,"desc"),this.changes.renderRows=!0}.bind(t)).widget("select")}.bind(this),onDblClick:function(t){location.assign($(t.currentTarget).find("a").eq(1).attr("href"))}})}});return n.init=function(){new e(new this({root:$(document),grids:$(".grid"),filter:$("input[type=search]"),tips:$(".tooltips")}))},n}),define("presenters/commodities",["presenter_base","../repositories/news"],function(t,e){return t.extend(function(){this.view.on("filterInput",this.onFilterInput.bind(this))},{filters:{},onInit:function(){e.getNewsDrive(2).then(function(t){this.view.renderGrid(t)}.bind(this))},onFilterInput:function(t){t?this.filters.search=function(t){return[t.C3,t.C3a,t.C3b].join("\n").indexOf(this)>-1}.bind(t):delete this.filters.search,this.filterItems()},filterItems:function(){var t=this.view.mainGrid.items;for(var e in this.filters)t=t.filter(this.filters[e]);this.view.mainGrid.setRows(t)}})}),define("views/commodities",["view_base","../presenters/commodities","quotes_grid","select"],function(t,e,i){var n=t.extend(function(){this.filter.on("input",this.onFilterInput.bind(this)),this.grids.eq(0).on("mouseenter","td:nth-of-type(2)",this.onCellMouseEnter.bind(this))},{onFilterInput:function(t){this.emit("filterInput",t.currentTarget.value.trim())},onCellMouseEnter:function(t){var e=this.mainGrid.getItem(t.currentTarget.parentNode.dataset.index);if(e&&e.commodities.length>1){var n=$(t.currentTarget),s=n.offset(),r=n.height(),o=this.tips.outerHeight(),h=this.root.height();s.top+=r,s.left+=14,s.top+o>h&&(s.top-=o+r),this.tipGrid=this.tipGrid||new i(this.grids[1],{columns:[{width:"70",name:"代码",css:"blue l",value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.C3a+"</a>"}},{width:"90",name:"名称",title:!0,css:"l",value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.name+"</a>"}},{width:"60",name:"最新",color:!0,value:function(t){return this.fixValue(this.fixLastTrade(t))}},{width:"65",name:"涨幅",color:!0,value:function(t){return this.fixPercent(this.fixChg(t))}},{width:"auto",name:"",value:function(){return""}}],items:[]}),this.tipGrid.setItems(e.commodities),this.tips.css(s).show(),this.tipSelector=[t.currentTarget.parentNode,this.tips],this.onCellMouseLeave=function(t){$(t.target).closest(this.tipSelector).length||(this.tips.hide(),this.root.off("mousemove",this.onCellMouseLeave))}.bind(this),this.root.on("mousemove",this.onCellMouseLeave)}else this.tips.hide()},renderGrid:function(t){this.mainGrid=new i(this.grids[0],{fields:"new,lastclose,volume",columns:[{width:"40",name:"序号",css:"white c",value:function(t,e){return e+1}},{width:"20",name:"",css:"blue r",value:function(t){return t.commodities.length>1?'<i class="fa fa-caret-down"></i>':""}},{width:"auto",name:"标题",title:!0,css:"white l",sort:!0,value:function(t){return"<a href=\"dzh://navigate?'root://news/details/index.html#"+t.C1+"#DZHPOPUP(854,504)#'\">"+t.C3+"</a>"}},{width:"8%",name:"时间",css:"white",sort:!0,value:function(t){return this.fixTime(t.C6)}},{width:"8%",name:"影响力",css:"c",sort:function(t){return Number(t.C28i)},value:function(t){for(var e=Number(t.C28i),i=['<i class="',0===e?"white":0>e?"green":"red",'">'],n=0,s=Math.abs(e);s>n;n++)i.push("★");return i.push(s?"":"☆","</i>"),i.join("")}},{width:"8%",name:"商品名称",css:"blue l",sort:!0,value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.C3a+"</a>"}},{width:"8%",name:"商品期货",css:"l",sort:!0,value:function(t){return'<a href="dzh://VIEWSTOCK?DATATYPE=DAY&LAYOUT=Level2默认&PAGE=分时走势&LABEL='+t.obj+'">'+t.name+"</a>"}},{width:"8%",name:"最新",color:!0,sort:!0,value:function(t){return this.fixValue(this.fixLastTrade(t))}},{width:"8%",name:"涨幅",color:!0,sort:!0,value:function(t){return this.fixPercent(this.fixChg(t))}}],items:t,init:function(){this.send(),this.items.forEach(function(t){this.items[t.obj]instanceof Array?this.items[t.obj].push(t):this.items[t.obj]=[t]},this),this.base(arguments)},compare:function(t){return function(t,e){return this(t,e)||t.C1.localeCompare(e.C1)}.bind(this.base(t))},updateItems:function(t){t.length&&t.forEach(function(t){var e=this.items[t.obj];if(e)for(var i=0,n=e.length;n>i;i++)this.updateItem(e[i],t)},this),this.refresh(!0)},onDblClick:function(t){location.assign($(t.currentTarget).find("a").eq(1).attr("href"))}})}});return n.init=function(){new e(new this({root:$(document),grids:$(".grid"),filter:$("input[type=search]"),tips:$(".tooltips")}))},n}),require(["views/stocks","views/commodities"],function(){require(["views/"+(location.pathname.match(/([^\/]+)\.html/)||[,"index"])[1]],function(){arguments[0]&&arguments[0].init&&arguments[0].init()})}),define("src",function(){});