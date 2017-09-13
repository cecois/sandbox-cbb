var EpisodeView = Backbone.View.extend({
    tagName: "li",
    template: CBB['templates']['episodeViewTpl'],
    template_howl:CBB['templates']['HowlEpisodeViewTpl'],
    // className: "fi-social-instagram",
    // className: function(){return this.model.get("icon")},
    events: {
        "change": "render",
        // "click": function() {
        //     appRoute.navigate(this.model.get("url"), {
        //         trigger: true,
        //         replace: true
        //     })
        // }
    } //events
    ,
    initialize: function() {
        // console.log("rim:");
        // console.log(this.model);
        return this.render()
    },
    rewire: function() {
        this.$("a").tooltip({
            container: "body",
            placement: 'right',
            trigger: 'hover'
        });
        return this
    },
    // ,className:"general foundicon-plus"
    render: function() {
        if (verbose == true) {
            // console.log("rendering recentitemview")
        }
        if(this.model.get("episode").indexOf("howl.fm")>0){
        $(this.el).html(this.template_howl(this.model.toJSON()));
        } else {

// non-Howl
        $(this.el).html(this.template(this.model.toJSON()));
        }
        return this.rewire()
    }
});