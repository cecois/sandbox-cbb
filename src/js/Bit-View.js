var BitView = Backbone.View.extend({
    // el: $("#activityContainer"),
    // className: 'bit-view'
    tagName:"li"
    ,template: CBB['templates']['bitViewTpl'],
    events: {
    },
    initialize: function() {},
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
        return this
    }
});