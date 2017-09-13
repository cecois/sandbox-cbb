var MinutiaeView = Backbone.View.extend({
    // tagName: "li",
    events: {
        // "click .copy-trigger": "singular",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    el: "#minutiae",
    template: CBB['templates']['minutiae'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    singular: function(e) {
        e.preventDefault()
        locTrigger(e, false)
        return this
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
            // }, this);
            return this
        }
    });