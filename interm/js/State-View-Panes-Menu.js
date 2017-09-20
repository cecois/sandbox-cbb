var StateViewPanesMenu = Backbone.View.extend({
    el: $("#cbb-pane-menu"),
    template: CBB['templates']['statesViewTpl_menu']
    ,events: {
        "click li":"setp"
    }
    ,initialize: function() {


        this.model.bind("change:slugs", this.render, this);
        return this
        .render();
    }
    ,setp: function(e){

        e.preventDefault()

        appState.slugify($(e.currentTarget).attr("data-id"))

        return this
    }
    ,render: function(){

        $(this.el).html(this.template(this.model.toJSON()));


        return this
    }
    ,
    rewire: function() {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> rewire")
        }
        $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy')
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            container: 'body'
        })
        return this
    },
    reset: function() {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> reset")
        }
        return this.render()
    }
});