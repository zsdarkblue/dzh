//var websocket;
var ws = {
	//curr_req_seq: {},
	init: function(msg, callback) {
        var websocket;
        var curr_req_seq = {};
		var funcname = callback.name;
		msg = msg + '&user_data=' + funcname;
        if (websocket == undefined) {
			try {
				websocket = new WebSocket(WS_SERVER);
				websocket.binaryType = 'arraybuffer';
				websocket.onopen = function(evt) {
					websocket.send(msg);
				}
				websocket.onerror = function(evt) {
					//if (!IS_TIMEOUT) ps(msg, callback);
				}
				websocket.onclose = function(evt) {
					if (!IS_TIMEOUT) ps(msg, callback);
				}
				websocket.onmessage = function(evt) {
					var data = _zlib(evt.data);
					//alert(data);
                    var json = JSON.parse(data);
                    callback(json);
                    return;

                    var fname = json.user_data;
					if (json.res_seq == 0) {
						//ws.curr_req_seq[fname] = json.req_seq;
                        curr_req_seq[fname] = json.req_seq;
                    } else {
						try{eval(fname+'(json)');}catch(e){console.log(e.message);}
					}
				}
				setTimeout(function() {
					if (websocket.readyState == 0) {
						IS_TIMEOUT = true;
						websocket.close();
						ps(msg, callback);
					}
				}, WS_TIMEOUT*1000);
			} catch(e) {
                //alert(e);
				ps(msg, callback);
			}
		} else if (websocket.readyState == 1) {
			if (funcname == 'getKline' || funcname == 'getMin') {
				if (ws.curr_req_seq['getKline']) {
					websocket.send('/json/cancel?'+ws.curr_req_seq['getKline']);
					ws.curr_req_seq['getKline'] = null;
				}
				if (ws.curr_req_seq['getMin']) {
					websocket.send('/json/cancel?'+ws.curr_req_seq['getMin']);
					ws.curr_req_seq['getMin'] = null;
				}
			}
			websocket.send(msg);
		} else {
			ps(msg, callback);
		}
	}
};
var worker = {};
function ps(msg, callback) {
	document.title += '.';
	var funcname = callback.name;
	if (typeof(Worker) !== 'undefined') {
		var encodedMsg = encodeURIComponent(msg);
		if (!worker[funcname]) {
			worker[funcname] = new Worker(RESOURCE_HOST + 'js/eventSource.js');
			worker[funcname].onmessage = function(event) {
				if (event.data == 'EventSource is not defined') {
					if (typeof(EventSource) !== 'undefined') {
						worker[funcname].source = new EventSource(APP_URL + 'stock/push?isAjax=1&func='+funcname+'&msg='+encodedMsg);
						worker[funcname].source.onmessage = function(e) {
							var data = eval('('+e.data+')');
							callback(data);
						};
						worker[funcname].source.addEventListener('closeSSE', function(e) {
							var data = eval('('+e.data+')');
							callback(data);
							worker[funcname].source.close();
						});
					} else {
						console.log('Server-Sent Event not support');
					}
				} else if (event.data) {
					if (event.data == 'closeSSE') {
						worker[funcname].terminate();
					} else {
						var data = eval('('+event.data+')');
						callback(data);
					}
				}
			};
			worker[funcname].postMessage({'msg':encodedMsg,'funcname':funcname});
		} else {
			if (worker[funcname].source) {
				worker[funcname].source.close();
			}
			worker[funcname].terminate();
			worker[funcname] = null;
			ps(msg, callback);
		}
	} else {
		$.post(APP_URL + 'stock/'+funcname+'?isAjax=1', {msg:msg}, function(json) {
			callback(json);
		},'json');
	}
}
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth()+1, //月
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds() //毫秒
	}; 
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	}
	for (var k in o) {
		if(new RegExp("("+ k +")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt; 
}
function numberFormat(number,precision) {
	if (precision==undefined) precision = 2;
	var unit = '';
	var wanyi = 1000000000000;
	var yi = 100000000;
	var wan = 10000;
	if (number >= wanyi) {
		number = (number/wanyi).toFixed(precision);
		unit = '万亿';
	} else if (number >= yi) {
		number = (number/yi).toFixed(precision);
		unit = '亿';
	} else if (number >= wan) {
		number = (number/wan).toFixed(precision);
		unit = '万';
	} else {
		number = number.toFixed(precision);
	}
	return number+unit;
}
function strFromUtf8Ab(ab) {

	// 浏览器会限制fromCharCode参数长度不能超过65535，因此需要分段转换
	if (ab.length > 65535) {
		var start = 0,
			results = [];
		do {
			var subArray = ab.subarray(start, start += 65535);
			results.push(String.fromCharCode.apply(null, subArray));
		} while (start < ab.length);

		return decodeURIComponent(escape(results.join('')));
	} else {
		return decodeURIComponent(escape(String.fromCharCode.apply(null, ab)));
	}
}

function _zlib(input) {
	var data;

	if (typeof(input) == "string") {
		data = input;
	} else {
		// 是二进制压缩的
		var dv = new DataView(input);
		var isCompressed = dv.getInt8(0);
		var cdata = new Uint8Array(input.slice(1));
		if (isCompressed) {
			var inflate = new Zlib.Inflate(cdata);
			var decompress = inflate.decompress();
			data = strFromUtf8Ab(decompress);
		} else {
			data = strFromUtf8Ab(cdata);
		}
	}

	return data;
}