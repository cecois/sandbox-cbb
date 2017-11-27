var SlugsViewPanesMenu = Backbone.View.extend({
    el: $("#cbb-pane-menu"),
    template: CBB['templates']['slugsViewTpl_menu']
    ,events: {
        "click li":"setp"
    }
    ,initialize: function() {


        this.collection.bind("change reset", this.render, this);
        this.listenTo(appState,"change:search_results_count", this.render);
        this.listenTo(appBits,'sync',this.render)
        return this
        .render();
    }
    ,setp: function(e){

        e.preventDefault()

        var s = $(e.currentTarget).attr("data-id");
        this.collection.switch(s)

        return this
    }
    ,render: function(){

        
        
        $(this.el).html(this.template({qcount:appBits.length,slugs:this.collection.toJSON()}));


        return this
    }
    ,rerender: function(){

        

        return this
    }
    ,reset: function() {

        return this.render()
    }
});
