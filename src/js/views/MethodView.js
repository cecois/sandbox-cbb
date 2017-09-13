var MethodView = Backbone.View.extend({
    // tagName: "li",
    events: {
        "click .copy-trigger": "singular",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    el: "#fullstory",
    template: CBB['templates']['fullstory'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    singular: function(e) {

        e.preventDefault()
        var ds = $(e.currentTarget).attr("data-string")
        if(verbose==true){
            console.log("e");
            console.log(e);
            console.log("ds");
            console.log(ds);
        }
        appCartoQuery.set({rawstring:ds})
        locTrigger(e, true, ds)
        return this
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()))
            // }, this);
            return this.rewire()
        },
        rewire: function() {
        // class="copy-trigger" data-toggle="tooltip"
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            html: true,
            trigger:"hover",
            title: "These links load the results in the background - switch to the query tab to interrogate further."
        })
        // $(this.el).find('[data-toggle="tooltip"]').on('mouseleave',function(elf){
        //     console.log(elf)
        //     $(this.el).tooltip('hide')
        // });

        return this
    }
});