var BitsCountView = Backbone.View.extend({
    el: ".query-subnav-count-bits",
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'request', this.throb);
        return this.render()
    },
        throb: function(){

$(".query-subnav-count-bits").html('<div class="spinner pull-right" style="margin:0;"></div>');

return this

    },
    render: function() {
        var len = this.collection.models.length
        $(this.el).html("("+this.collection.models.length+")");
        return this
    }
}); //bitscountview