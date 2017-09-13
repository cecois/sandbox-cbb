var SolrFieldzView = Backbone.View.extend({
    // tagName: "li",
    el: "#solrfields-list",
    events: {
        "click .copy-trigger": "singular"
    },
    template: CBB['templates']['solrfieldsView'],
    initialize: function() {
        // this.listenTo(this.collection, "reset", this.render);
        this.collection.bind('reset', this.render, this);
        this.collection.bind('change', this.render, this);
        return this.render()
    },
    singular: function(e) {
        $(this.el).addClass('hidden')
        console.log("singuler in qv");
        e.preventDefault()
        locTrigger(e)
        return this
    },
    render: function() {
        this.collection.sortBy('order')
        if (verbose == true) {
            // console.log("rendering solrfieldsview")
            // console.log(this.collection.models);
        }
        // $(this.el).html(this.template(this.collection.toJSON()))
        $(this.el).html(this.template({
            count: this.collection.models.length,
            fields: this.collection.toJSON()
        }));
        return this
    }
});