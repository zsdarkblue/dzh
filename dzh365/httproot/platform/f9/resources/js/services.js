define(["jquery"],function(a){return{baseUrl:[Array("http://f9data.gw.com.cn","http://f9databeta.gw.com.cn","http://f9dataalpha.gw.com.cn","http://f9datadev.gw.com.cn"),Array("http://dsj.gw.com.cn","http://dsjbeta.gw.com.cn","http://dsjalpha.gw.com.cn","http://dsjtest.gw.com.cn")][("prod" in external&&external.prod==127)?1:0]["env" in external?external.env:2],code:(location.search.match(/obj=([^&]*)/)||[,"SH600000.stk"])[1],key_Prefix:function(){var b=location.pathname.split("/");b.pop();return b.join("__")},getNav:function(c){var b=(location.search.match(/type=([^&]*)/)||[,"SOULENCE"])[1];if(b=="SOULENCE"){var d={obj:c||this.code}}else{var d={type:b,obj:c||this.code}}return a.ajax({url:this.baseUrl+(("prod" in external&&external.prod==127)?"/f9":"/f9/app_f9/www")+"/?m=Home&c=Home&f=getLeft",data:d,dataType:"jsonp"}).then(function(e){for(var f in e.APIUrl){localStorage.setItem(this.key_Prefix()+f,this.baseUrl+e.APIUrl[f])}localStorage.setItem(this.key_Prefix()+"code_code",e.title.code);localStorage.setItem(this.key_Prefix()+"sObj",e.title.obj)}.bind(this))},getFinancialReport:function(b){return a.ajax({url:localStorage.getItem(this.key_Prefix()+"GetDataUrl"),data:b,dataType:"jsonp"})},getFinancialReportUrl:function(b){return localStorage.getItem(this.key_Prefix()+"GetDataUrl")+a.param(b)},getFinancialForecastUrl:function(b){b.type="dialog";return localStorage.getItem(this.key_Prefix()+"ForecastUrl")+a.param(b)},getFinancialChartUrl:function(b){b.type="dialog";return localStorage.getItem(this.key_Prefix()+"ChartUrl")+a.param(b)},getExportUrl:function(b){return a.ajax({url:localStorage.getItem(this.key_Prefix()+"ExportUrl"),data:{U:b},dataType:"jsonp"}).then(function(c){var f="dzh://FILEMGR?";if(c.ErrorCode==200){var e=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toJSON().substr(0,10);var d=decodeURI((location.search.match(/title=([^&]*)/)||[,""])[1]);f+=a.param({LINK:c.DownAddr,OPEN:1,SHOWUI:1,FILE:d+e,SAVEAS:d+e+"("+localStorage.getItem(this.key_Prefix()+"code_code")+").xlsx"})}if(external.download){external.download(decodeURIComponent(f))}else{alert(decodeURIComponent(f));console.log(c)}}.bind(this))}}});