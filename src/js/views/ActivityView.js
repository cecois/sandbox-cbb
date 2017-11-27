var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: CBB['templates']['activityViewTpl'],
    events: {
        "click .activity-cancel": "stfu",
    },
    initialize: function() {

        this.model.bind("change", this.render, this);
        this.render();
    },
    stfu: function(){
        $(this.el).addClass("idle")
        $("#query-form").removeClass("hidden")

        $(this.el).removeClass('warn')
        
        return this
    },
    warn: function(){


        $(this.el).addClass('warn')

        setTimeout(_.bind(this.stfu, this), 4000);

        return this

    },
    render: function() {
        if(CONFIG.verbose==true){console.log("rendering activityview")}

            $(this.el).removeClass("idle")
        $("#query-form").addClass("hidden")

        $(this.el).html(this.template(this.model.toJSON()))
        return this
    }
});