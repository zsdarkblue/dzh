window.$record = {
	url:(external.httproot || ' http://127.0.0.1:30719') + '/platform/customerService/record.html', // 聊天记录页的地址
	init:function () {
		/// 创建无边框iframe
		this.frame = document.createElement('iframe');
		this.frame.setAttribute('frameborder', 0);
		this.frame.setAttribute('allowtransparency', true);
		this.frame.id = 'record';
		this.frame.style.width = '100%';
		this.frame.style.height = '100%';
		this.frame.style.display = 'none';
		this.frame.style.position = 'fixed';
		this.frame.style.top = '0%';
		this.frame.style.left = '0%';
		this.frame.style.margin = '0px';
		this.frame.style.background = '#fff';
		this.frame.src = this.url;
		document.body.appendChild(this.frame);
		/// 监听聊天记录页发来的信息
		window.addEventListener('message', function (e) {
			e.source === this.frame.contentWindow && e.data === 'close' && this.hide();
		}.bind(this));
		/// 返回
		return this;
	},
	send:function (oJson) {
		if (oJson.user && oJson.service_user && oJson.msg_type && (oJson.msg_html || oJson.msg_content)) {
			/// 组装msg_time
			var nowTime = new Date();
			var FullYear = nowTime.getFullYear();
			var FullMonth = nowTime.getMonth() + 1 > 9 ? nowTime.getMonth() + 1 : "0" + (nowTime.getMonth() + 1);
			var FullDate = nowTime.getDate() > 9 ? nowTime.getDate() : "0" + nowTime.getDate();
			var FullHours = nowTime.getHours() > 9 ? nowTime.getHours() : "0" + nowTime.getHours();
			var FullMinutes = nowTime.getMinutes() > 9 ? nowTime.getMinutes() : "0" + nowTime.getMinutes();
			var FullSeconds = nowTime.getSeconds() > 9 ? nowTime.getSeconds() : "0" + nowTime.getSeconds();
			oJson.msg_time = FullYear.toString() + FullMonth + FullDate + FullHours + FullMinutes + FullSeconds;
			/// 发送消息
			var str = JSON.stringify([oJson]);
			this.frame.contentWindow.postMessage(str, this.url);
			return true;
		}
		else {
			return false;
		}
	},
	show:function () {
		this.frame.contentWindow.postMessage("query", this.url); // 通知消息记录页面请求数据
		this.frame.style.display = 'block';
	},
	hide:function () {
		this.frame.style.display = 'none';
	}
}.init();
