var StateViewPanes = Backbone.View.extend({
    el: $("#cbb-main-panes")
    // template: CBB['templates']['statesViewTpl_menu']
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

        // $(this.el).html(this.template(this.model.toJSON()));
        var s = _.findWhere(this.model.get("slugs"),{active:"is-active"}).slug

        $(this.el).find("li").each(function(l){
            l.addClass("hidden")
        });

        $(this.el).find("li").each(function(l){
            if(l.attr("id")==s){
                l.removeClass("hidden")
            }
        });
        

        return this
    }
});