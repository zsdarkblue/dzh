self.onmessage = function(event) {
	try {
		var funcname = event.data.funcname;
		var msg = event.data.msg;
		var source = new EventSource('../../stock/push?isAjax=1&func='+funcname+'&msg='+msg);
		source.onmessage = function(e) {
			self.postMessage(e.data);
		};
		source.addEventListener('closeSSE', function(e) {
			self.postMessage(e.data);
			self.postMessage('closeSSE');
		}, false);
	} catch(e) {
		self.postMessage(e.message);
	}
};
