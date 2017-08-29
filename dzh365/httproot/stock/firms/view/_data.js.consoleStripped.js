define("stock/firms/view/_data", [
    'dojo/io-query', 'dojox/store/MultiResultStore', 'dojox/store/GridWSStore', 'dojox/websocket/WebsocketFileReader'
], function (ioQuery, MultiResultStore, GridWSStore, FileReader) {
    var debug = (location.search.match(/debug=([^&]*)/) || [, ''])[1],
        http_debug = (debug ? 'http://' + debug : ''),//debug=10.15.94.171:9189
        socket_debug = (debug ? '/debug/' + debug : '');
    return dojo.declare('stock.firms.view._data', null, {
        userId:window.external && external.getDZHProperty ? external.getDZHProperty('userid') : 'dzh112_098',
        getSearchInitData:function () {
            return new MultiResultStore().query({
                service:'rpc',
                so:'javadataproxy.jar',
                'function':'gw/UIMain',
                paraencode:'base64',
                parameter:"Z2V0," + btoa(http_debug + '/personib/PersonIB/html5_SearchCompanyInfo/SearchCompanyInfo/initData.mod'),
                response_times:1,
                response_mode:0
            });
        },
        getFirms:function () {
            return new MultiResultStore({
				serviceUrl:socket_debug + '/personib/PersonIB/html5_SearchCompanyInfo/SearchCompanyInfo/searchCompanyBySolr.mod'
            });
        }
    });
});