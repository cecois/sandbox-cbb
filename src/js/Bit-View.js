var BitView = Backbone.View.extend({
    tagName:"li"
    ,template: CBB['templates']['bitViewTpl'],
    events: {
    },
    initialize: function() {},
    render: function() {
        $(this.el).html('bitviewrender')
        return this
    }
});