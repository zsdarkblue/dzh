require([
	'js/record.js'
],function(recordJs){
	var pathname = location.pathname.match(/([^\/]+)\.html/) || [,'index'];
	if(pathname[1] == 'record'){
		recordJs.init();
	}
	/*
	if(pathname[1] == 'index'){
		index.init();
	}else if(pathname[1] =='record'){
		recordJs.init();
	
	}else if(pathname[1] =='insert'){
		insertJs.init();
	
	}
	*/
});