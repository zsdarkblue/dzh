define("stock/firms/view/_base", [
    'dojo/_base/lang', 'dojo/aspect', 'dojo/query', 'dojo/on', 'dojo/mouse', 'dojo/dom-style', 'dojo/request',
    'dijit/_WidgetBase', 'dijit/_TemplatedMixin', 'dijit/_WidgetsInTemplateMixin', 'dijit/layout/_ContentPaneResizeMixin',
    'stock/firms/view/_data', 'dojo/NodeList-traverse', 'dojo/NodeList-manipulate', 'dojo/NodeList-fx'
], function (lang, aspect, query, on, mouse, domStyle, request, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ContentPaneResizeMixin, _dataMixin) {
    return dojo.declare("stock.firms.view._base", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _ContentPaneResizeMixin, _dataMixin], {
        postCreate:function () {
            this.inherited(arguments);
        }
    });
});
