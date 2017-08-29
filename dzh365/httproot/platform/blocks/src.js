define("repositories/block",["repository_base"],function(e){return new(e.extend({getBlocks:function(e){return $.send("/rpc",e?{so:"jso-ui-commoncode.jar","function":"gw.sh.func.StockPlateCodeRequest",paraencode:"base64",parameter:btoa(JSON.stringify({index:e}))}:{so:"jso-ui-commoncode.jar","function":"gw.sh.func.IdeaPlateCodeRequest",paraencode:"base64",parameter:btoa(JSON.stringify({type:1}))})},getPlates:function(e){return $.send("/rpc",{so:"jso-ui-commoncode.jar","function":"gw.sh.func.SOMarketPlateCodeRequest",paraencode:"base64",parameter:btoa(JSON.stringify({index:e}))})}}))}),define("presenters/index",["presenter_base","../repositories/block"],function(e,t){return e.extend(function(){this.view.on("tabActive",this.onTabActive.bind(this))},{onInit:function(){this.onTabActive(Number(decodeURI((location.search.match(/\btab=([^&]*)/)||[,"0"])[1])))},onTabActive:function(e){var n="cache"+e;if(!(n in this))switch(this[n]=!0,e){case 0:case 1:(this.promise||(this.promise=t.getBlocks())).then(function(e,t){e?this.view.renderTypePane(t):this.view.renderLetterPane([].slice.call(t).sort(function(e,t){return e.C8.localeCompare(t.C8)}))}.bind(this,e));break;case 2:case 3:t.getPlates(e-1).then(function(e,t){this.view.renderPlatePane(e,t.sort(function(e,t){return e.py.localeCompare(t.py)}))}.bind(this,e));break;case 4:t.getBlocks(decodeURI((location.search.match(/\bindex=([^&]*)/)||[,"1"])[1])).then(this.view.renderCommonPane.bind(this.view))}}})}),define("widgets/pane",{init:function(){this.pane=this.pane||$(this.$el).find(">ul"),this.onResize(),addEventListener("resize",this.onResize.bind(this))},onResize:function(){this.width=this.pane.parent().width()+1,this.height=this.pane.height(),this.rect=this.pane.children()[0].getBoundingClientRect(),this.rows=this.height/(this.rect.height-32767),this.cols=this.width/this.rect.width,this.pageCount=Math.ceil(this.blocks.length/(this.rows*this.cols)),this.go(this.pageIndex)},onItemClick:function(e){var t=e.target.dataset.block;t&&(external.saveas?location.assign("dzh://SHOWBLOCK?"+t)+external.closeDialog():alert(t))},onPrevBtnClick:function(){this.go(this.pageIndex-1)},onNextBtnClick:function(){this.go(this.pageIndex+1)},go:function(e){1>e?e=1:e>this.pageCount&&(e=this.pageCount),this.pageIndex=e,this.pane.css({"-webkit-transition-duration":"300ms","-webkit-transform":"translateX(-"+--e*this.width+"px)"})}}),define("views/index",["view_base","../presenters/index","../widgets/pane","vue","tabs"],function(e,t,n,i){var s=e.extend(function(){this.tabs.on("active",this.onTabActive.bind(this))},{onTabActive:function(e,t){this.emit("tabActive",t)},renderLetterPane:function(e){new i({data:{index:"",indexes:e.filter(function(e,t){var n=e.C8;return e.index=t,this.test(n)||n in this?!1:this[n]=!0},/\d/),blocks:e,pageIndex:1,pageCount:1},methods:$.extend({onIndexBtnClick:function(e){this.index=e.target.innerText,this.go(Math.ceil(this.blocks.filter(function(e){return e.C8===this.valueOf()},this.index)[0].index/(this.rows*this.cols)))}},n)}).$mount(this.tabs.widget("tabs").panes[0]).init()},renderTypePane:function(e){var t=1,s=this.tabs.widget("tabs");s.selectItem(t),new i({data:{blocks:e,pageIndex:1,pageCount:1},methods:n}).$mount(s.panes[t]).init()},renderPlatePane:function(e,t){var s=this.tabs.widget("tabs");s.selectItem(e),s.target.hide(),new i({data:{index:"",indexes:t.filter(function(e,t){var n=e.py;return e.index=t,this.test(n)||n in this?!1:this[n]=!0},/\d/),blocks:t,pageIndex:1,pageCount:1},methods:$.extend({onIndexBtnClick:function(e){this.index=e.target.innerText,this.go(Math.ceil(this.blocks.filter(function(e){return e.py===this.valueOf()},this.index)[0].index/(this.rows*this.cols)))}},n)}).$mount(s.panes[e]).init()},renderCommonPane:function(e){var t=4,s=this.tabs.widget("tabs");s.selectItem(t),s.target.hide(),new i({data:{blocks:e,pageIndex:1,pageCount:1},methods:n}).$mount(s.panes[t]).init()}});return s.init=function(){new t(new this({root:$(document.body),tabs:$(".nav-tabs")}))},s}),define("repositories/industry",["repository_base"],function(e){return new(e.extend({getIndustries:function(e){return $.send("/rpc",{so:"jso-ui-commoncode.jar","function":"gw.sh.func.IndustryPlateCodeRequest",paraencode:"base64",parameter:btoa(JSON.stringify({type:e}))})}}))}),define("presenters/industry",["presenter_base","../repositories/industry"],function(e,t){return e.extend(function(){this.view.on("tabActive",this.onTabActive.bind(this))},{onInit:function(){this.onTabActive(Number(decodeURI((location.search.match(/\btab=([^&]*)/)||[,"0"])[1])))},onTabActive:function(e){var n="cache"+e;n in this||(this[n]=t.getIndustries(e+1).then(function(e,t){this.view.renderPane(e,t.reduce(function(e,t){return e[t.C1+"\f"]=t,t.C5>0?e[t.C5+"\f"].children.push(t):(t.children=[],e.push(t)),e},[]))}.bind(this,e)))}})}),define("views/industry",["view_base","../presenters/industry","../widgets/pane","vue","tabs"],function(e,t,n,i){var s=e.extend(function(){this.tabs.on("active",this.onTabActive.bind(this))},{onTabActive:function(e,t){this.emit("tabActive",t)},renderPane:function(e,t){var n=this.tabs.widget("tabs");n.selectItem(e),n.target.hide(),new i({data:{items:t,active:t[0]||{}},methods:{onItemClick:function(e){var t=e.target.dataset.industry;t&&(external.saveas?location.assign("dzh://SHOWBLOCK?"+t)+external.closeDialog():alert(t))},onItemActive:function(e){var t=e.target.dataset.industry;t&&(this.active=this.items[t+"\f"])}}}).$mount(n.panes[e])}});return s.init=function(){new t(new this({root:$(document.body),tabs:$(".nav-tabs")}))},s}),require(["views/index","views/industry"],function(){require(["views/"+(location.pathname.match(/([^\/]+)\.html/)||[,"index"])[1]],function(){arguments[0]&&arguments[0].init&&arguments[0].init()})}),define("src",function(){});