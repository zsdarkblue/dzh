var LazyLoader = {
	window_height: $(window).height(),
	document_scroll_top: $(document).scrollTop(),
	
	// 按滚动加载的元素列表
	elements: [],
	
	init: function(elements) {
		this.elements = elements;
	},
	
	// 判断元素是否已经出现
	check_appears: function(element, func) {
		if (this.document_scroll_top + this.window_height + 200 > $(element).offset().top && $(element).offset().top + $(element).height() >= this.document_scroll_top + 100) {
			//console.log(element + "出现了");
			eval(func);
			return true;
		} else {
			return false;
		}
	},
	
	// 缩放或滚动窗口
	reset: function() {
		var that = this;
		this.document_scroll_top = $(document).scrollTop();
		
		$.each(this.elements, function(k, v) {
			if (v.appeared == false) {
				if (that.check_appears(v.element, v.func)) {
					that.elements[k].appeared = true;
				}
			}
		})
	}
};

$(window).resize(function() {
	LazyLoader.window_height = $(window).height();
	LazyLoader.reset();
});

$(window).scroll(function() {
	LazyLoader.reset();
});

/* 按滚动加载使用举例：
LazyLoader.init([
	{element: "#box2", appeared: false, func: "load_box2()"},
	{element: "#box3", appeared: false, func: "load_box3()"}
]);
*/