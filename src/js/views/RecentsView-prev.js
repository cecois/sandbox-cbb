var RecentsView = Backbone.View.extend({
    // tagName: "li",
    el: ".recents",
    events: {
        "click .copy-trigger": "singular"
    },
    template: Handlebars.templates['recentsViewTpl'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('change active', this.render, this);
        return this.render()
    },
    singular: function(e) {
        e.preventDefault()
        locTrigger(e)
        return this
    },
    render: function() {
        if (verbose == true) {
            // console.log("rendering recentsview")
            // console.log(this.collection)
        }
        this.collection.sortBy('location_id')
            // this.collection.sortBy(function(m) {
            // console.log("803 sortby:");console.log(m);
            //     return -m.get('updated_at') });
            // sorted.each(function(recentitem) {
        this.collection.each(function(recentitem) {
            if (verbose == true) {
                // console.log("gonna render the recentitemview")
            }
            var thisRecentItemView = new RecentItemView({
                model: recentitem
            });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            // $(this.el).append(thisRecentItemView.render().el
            // "recent item will go here"
            // );
            $(this.el).html(this.template(this.collection.toJSON()));
        }, this);
        return this
    }
});