var HuhView = Backbone.View.extend({
    // tagName: "li",
    el: "#huh-copy",
    events: {
        // "click #bt-showmain":"reset"
    },
    template: CBB['templates']['home'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
            // }, this);
            return this
        },
        reset: function() {
        // console.log("showmain clicked");
        // console.log(e);
        // $("#bt-showmain").addClass('hidden')
        // $("#main").addClass('hiddenish')
        return this
    }
});