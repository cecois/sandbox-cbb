var RecentsView = Backbone.View.extend({
    // tagName: "li",
    el: "#huh-recent",
    events: {
        "click .copy-trigger": "singular"
    },
    template: CBB['templates']['recentsViewTpl'],
    initialize: function() {
        if (verbose == true) {
            console.log("initting recentsview")
        }
        this.collection.bind('reset', this.render, this);
        return this
    },
    singular: function(e) {
        e.preventDefault()
        var ds = $(e.currentTarget).attr("data-string")
        locTrigger(e, true, ds)
        return this
    },
    rewire: function() {
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            html: true,
            trigger:"hover",
            title: "These links load the results in the background - switch to the query tab to interrogate further."
        })
        
        return this
    },
    render: function() {
        if(verbose==true){console.log("in recentsview render");}
        
        var rec = _.first(this.collection.toJSON(),6)
        $(this.el).html(this.template({
                    // recents: rec.toJSON()
                    recents: rec
                }));
        // }, this);
        return this
        .rewire()
    }
});