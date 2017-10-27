var SlugsViewPanesMenu = Backbone.View.extend({
    el: $("#cbb-pane-menu"),
    template: CBB['templates']['slugsViewTpl_menu']
    ,events: {
        "click li":"setp"
    }
    ,initialize: function() {


        this.collection.bind("change reset", this.render, this);
        // this.collection.on('change reset add remove', this.render, this);
        // this.model.bind("change:search_results_count", this.render, this);
        this.listenTo(appState,"change:search_results_count", this.render);
        // this.model.bind("change", this.render, this);
        this.listenTo(appBits,'sync',this.render)
        return this
        .render();
    }
    ,setp: function(e){

        e.preventDefault()

        var s = $(e.currentTarget).attr("data-id");
        // console.log("switch to s in SVPm",s);
        // appState.slugify($(e.currentTarget).attr("data-id"))
        this.collection.switch(s)

        return this
    }
    ,render: function(){

        // if(CONFIG.verbose == true){console.log("in render of statev",this.model.get("search_results_count"));}
        
        // console.log("appbits in svpm render",appBits.length);

        $(this.el).html(this.template({qcount:appBits.length,slugs:this.collection.toJSON()}));


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
