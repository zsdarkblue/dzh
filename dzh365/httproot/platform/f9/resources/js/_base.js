define(["_base","jquery"],function(b,a){return b.extend(function(){},{loadingMsg:a('<i class="icon-loading"></i>').hide().insertAfter(a(".l_title:eq(0)>b")),showLoadingMsg:function(){this.loadingMsg.show()},hideLoadingMsg:function(){this.loadingMsg.hide()}})});