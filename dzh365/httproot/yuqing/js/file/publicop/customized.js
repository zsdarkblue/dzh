/*
    @名称: publicopinion
    @功能: 舆情监测页面弹出框js
	@时间: 2013年5月25日
	@姓名: 冯静华
*/

$(function(){
	
	//加载关键字

	//左边模块点击效果
	$("#left_section").on("click","li",function(){
		$(this).siblings().removeClass("cur").removeClass("right");
		$(this).addClass("cur").addClass("right");
	});
	
	//中间模块的浮动效果
	$("#mid_section_article").on("mouseenter","li",function(){
		$(this).find("span").after("<span class='fs1' aria-hidden='true' data-icon='&#xe013;'></span>");
	});	
	$("#mid_section_article").on("mouseleave","li",function(){
		$(this).find(".fs1").remove();
	});
	
	//"+"号点击效果
	$("#mid_section_article").on("click",".fs1",function(){
		if(!$(this).hasClass("icon_down")){
			var _text = $(this).prev().text();
			//右边模块添加
			$("#rigth_section article header").append("<p><a href='javascript:;'><span>"+_text+"</span></a></p>");
		}
	});
	
	//右边模块的浮动效果
	$("#rigth_section").on("mouseenter","a",function(){
		$(this).find("span").after("<span class='fs1' aria-hidden='true' data-icon='&#xe014;'></span>");
	});
	$("#rigth_section").on("mouseleave","a",function(){
		$(this).find(".fs1").remove();
	});
	
	//"-"号点击效果
	$("#rigth_section").on("click",".fs1",function(){
		$(this).parent().parent().remove();
	});
	
	//"closebtn"关闭按钮点击效果
	$(".closebtn").on("click","span",function(){
		top.$("#winbg").remove();
		top.$("#dialog").remove();
	});
	
	//鼠标上移显示滚动条
	var mid_section_header = new mouse("mid_section_header");
	mid_section_header.Hover(); 
	var rigth_section_header = new mouse("rigth_section_header");
	rigth_section_header.Hover();
	
});