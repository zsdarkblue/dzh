var Socket={root:window.external&&external.wsroot?external.wsroot:"ws://127.0.0.1:30718",queue:[],callbacks:{},waiting:false,instance:function(){if(this._instance===undefined){var b=this,a=["open","message","error","close"];this._instance=new WebSocket(this.root);a.forEach(function(c){b._instance.addEventListener(c,b)});addEventListener("unload",function(){b._instance.close();a.forEach(function(c){b._instance.removeEventListener(c,b)});removeEventListener("unload",arguments.callee)})}return this._instance},handleEvent:function(a){a.type in this&&this[a.type](a)},send:function(a,b){this.queue.push([a,b]);if(!this.waiting&&this.instance().readyState===1){this.waiting=true;this.subscribe()}},subscribe:function(){this.instance().send("/json/subscribe?"+this.queue[0][0])},open:function(a){this.queue.length&&this.subscribe()},error:function(a){if(this.queue.length){this.queue.push(this.queue.shift());this.subscribe()}},message:function(d){var b=JSON.parse(d.data);if(b.res_seq==="0"){if(this.queue.length){this.callbacks[b.req_seq]=this.queue.shift()[1]}if(this.queue.length){this.subscribe()}else{this.waiting=false}}else{if(b.req_seq>0&&b.req_seq in this.callbacks){if(b.res_type>=0&&b.result&&b.result.datas&&b.result.head){var g=[],n=b.result.datas,f=n.length,h=b.result.head,k=h.length;for(var c=0;c<f;c++){var m=n[c],l={};for(var a=0;a<k;a++){l[h[a]]=m[a]}g.push(l)}this.callbacks[b.req_seq](g)}else{this.callbacks[b.req_seq]([])}delete this.callbacks[b.req_seq]}}},close:function(){this.queue.length=0;for(var a in this.queue.callbacks){delete this.queue.callbacks[a]}}};