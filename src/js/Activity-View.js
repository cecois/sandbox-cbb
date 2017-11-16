var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: CBB['templates']['activityViewTpl'],
    events: {
        "click .activity-cancel": "stfu",
    },
    initialize: function() {

        this.model.bind("change", this.render, this);
    },
    stfu: function(){
        // $(this.el).hide()
        $(this.el).fadeOut("slow")

        // $(this.el).removeClass('warn')

        return this
    },
    warn: function(){

        $(this.el).find(".activity-cancel").show()

        setTimeout(_.bind(this.stfu, this), 4000);

        return this

    },
    render: function() {
        $(this.el).show()

        $(this.el).html(this.template(this.model.toJSON()))
        var to = (typeof this.model.get("hang")=='undefined')?4000:parseInt(this.model.get("hang"))*1000;
        setTimeout(_.bind(this.stfu, this), to);

        return this
    }
});
