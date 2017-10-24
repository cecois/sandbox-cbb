var StateViewPanesMenu = Backbone.View.extend({
    el: $("#cbb-pane-menu"),
    template: CBB['templates']['statesViewTpl_menu']
    ,events: {
        "click li":"setp"
    }
    ,initialize: function() {


        this.model.bind("change:slugs", this.render, this);
        this.model.bind("change:search_results_count", this.render, this);
        // this.model.bind("change", this.render, this);
        // this.listenTo(this.model,'change',this.render)
        return this
        .render();
    }
    ,setp: function(e){

        e.preventDefault()

        appState.slugify($(e.currentTarget).attr("data-id"))

        return this
    }
    ,render: function(){

        // if(CONFIG.verbose == true){console.log("in render of statev",this.model.get("search_results_count"));}
        
        $(this.el).html(this.template(this.model.toJSON()));


        return this
    }
    ,rerender: function(){

        // if(CONFIG.verbose == true){console.log("in rerender of statev",this.model.get("search_results_count"));}


        return this
    }
    ,reset: function() {
        
        return this.render()
    }
});
