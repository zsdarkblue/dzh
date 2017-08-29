var common = common || {};
common = {
	debug: false,
	v: [],
	getjson: function(data, f) {
		return f ? eval(data) : eval("(" + data + ")");
	},
	Timeout: function(_type, _time, _arr) {
		if (typeof _time == "undefined") _time = 0;
		var _fun = null;
		switch (_type) {
			case "location":
				_fun = function() {
					top.location.href = _arr;
				};
				break;

			default:
				if (_arr && typeof _arr === "function") _fun = _arr;
				break;
		}
		setTimeout(_fun, _time);
	},
	isempty: function(a) {
		a = $.trim(a);
		return (typeof(a) == "undefined" || a == undefined || a == "undefined" || a == null || a == "null" || a == "" || !a) ? true : false
	},
	changeURLPar: function(destiny, par, par_value) {
		var pattern = par + "=([^&]*)";
		var replaceText = par + "=" + par_value;
		if (destiny.match(pattern)) {
			tmp = destiny.replace(new RegExp(pattern, "gi"), replaceText);
			return tmp;
		} else {
			if (destiny.match("[?]")) {
				return destiny + "&" + replaceText;
			} else {
				return destiny + "?" + replaceText;
			}
		}
		return destiny + "\n" + par + "\n" + par_value;
	}
};

var Socket = {
	root: window.external && external.wsroot ? external.wsroot : 'ws://127.0.0.1:30718',
	queue: [],
	callbacks: [],
	waiting: false,
	instance: function() {
		if (this._instance === undefined) {
			var me = this,
				events = ['open', 'message', 'error', 'close'];
			this._instance = new WebSocket(this.root);
			events.forEach(function(item) {
				me._instance.addEventListener(item, me);
			});
			addEventListener('unload', function() {
				me._instance.close();
				events.forEach(function(item) {
					me._instance.removeEventListener(item, me);
				});
				removeEventListener('unload', arguments.callee);
			});
		}
		return this._instance;
	},
	handleEvent: function(e) {
		e.type in this && this[e.type](e);
	},
	send: function(url, callback) {
		if (this.proxy.enable) {
			this.proxy(url, callback);
		} else {
			this.queue.push([url, callback]);
			if (!this.waiting && this.instance()
				.readyState === 1) {
				this.waiting = true;
				this.subscribe();
			}
		}
	},
	subscribe: function() {
		this.instance()
			.send('/json/subscribe?' + this.queue[0][0]);

	},
	open: function(e) {
		this.queue.length && this.subscribe();
	},
	error: function(e) {
		if (this.queue.length) {
			this.queue.push(this.queue.shift());
			this.subscribe();
		}
	},
	message: function(e) {
		var data = JSON.parse(e.data);
		if (data.res_seq === '0') {
			if (this.queue.length) {
				this.callbacks[data.req_seq] = this.queue.shift()[1];
			}
			if (this.queue.length) {
				this.subscribe();
			} else {
				this.waiting = false;
			}
		} else {
			if (data.req_seq > 0 && data.req_seq in this.callbacks) {
				data.res_type >= 0 && data.result && data.result.datas && this.callbacks[data.req_seq]({
					results: data.result.datas
				});
				if (data.result === undefined) {
					this.callbacks[data.req_seq]({
						results: null
					});
				}
				delete this.callbacks[data.req_seq];
			}
		}
	},
	close: function() {
		this.queue.length = 0;
		for (var key in this.queue.callbacks) {
			delete this.queue.callbacks[key];
		}
	},
	proxy: function(url, callback) {
		var socket = new WebSocket(this.root);
		socket.addEventListener('open', function(e) {
			e.target.send('/proxy/' + url);
		});
		socket.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			callback(data);
		});
		socket.addEventListener('error', function(e) {
			e.target.close();
			callback({
				results: []
			});
		});
	},
	phpProxy: function(url, callback) {
		var socket = new WebSocket(this.root);
		socket.addEventListener('open', function(e) {
			e.target.send('/proxy/' + url);
		});
		socket.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			callback(data);
		});
		socket.addEventListener('error', function(e) {
			e.target.close();
			callback({
				results: []
			});
		});
	},
	read: function(url, callback, convertUrl) {
		var socket = new WebSocket(this.root);
		url = true == convertUrl ? "dzh2url?" + url : "dzh2data?" + url;
		socket.addEventListener('open', function(e) {
			e.target.send(url);
		});
		socket.addEventListener('message', function(e) {
			var data = e;
			callback(data);
		});
		socket.addEventListener('error', function(e) {
			e.target.close();
			callback({
				results: []
			});
		});
	},
	soSend: function(so, parameter, fn, callback) {
		var socket = new WebSocket(this.root);
		var _parameter = this.soHandle(parameter);
		var url = "/json/subscribe?service=rpc&async_response_mode=0&paraencode=base64&function=" + fn + "&parameter=" + _parameter + "&so=" + so + "&field=&where=&start=1&count=0&response_times=1&response_mode=0";
		socket.addEventListener('open', function(e) {
			e.target.send(url);
		});
		socket.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			if (data.result !== undefined) {
				callback(data);
			}
		});
		socket.addEventListener('error', function(e) {
			e.target.close();
			callback({
				results: []
			});
		});
	},
	soHandle: function(parameter) {
		var str = "";
		for (var x in parameter) {
			str += btoa(parameter[x]) + ",";
		}
		return str.substring(0, str.length - 1);
	},
	speSend: function(url, callback) {
		var socket = new WebSocket(this.root);
		socket.addEventListener('open', function(e) {
			e.target.send('/json/subscribe?' + url);
		});
		socket.addEventListener('message', function(e) {
			var data = JSON.parse(e.data);
			callback(data);
		});
		socket.addEventListener('error', function(e) {
			e.target.close();
			callback({
				results: []
			});
		});
	}
};
Socket.proxy.enable = false;