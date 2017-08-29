/*
	Copyright (c) 2012-2013,   To get sources and documentation, please visit:

		http://dms.gw.com.cn
*/

//>>built
require({cache:{"fund/fundCompanyAdv/view/util":function(){define([],function(){return{soUrl177:"http://10.15.107.177:9089",soUrl:""}})}}});
define("fund/fundCompanyAdv/src",["dojo/parser","dojox/store/GridWSStore","./view/util"],function(b,c,d){return function(){b.parse().then(function(){var b=new c({}),a=window.location.search,a=a.match(/\=(\S*)(\.fnd)/i)[1]+".fnd",a=d.soUrl+"/webquery/common?__qid=dzh_ad_content&co="+a;b.query({service:"rpc",so:"javadataproxy.jar","function":"gw/UIMain",paraencode:"base64",parameter:"Z2V0,"+btoa(a),response_times:1,response_mode:0}).then(function(a){if(!a.level&&!("undefined"==typeof a||0==a.length))document.body.innerHTML=
a[0].value})})}});