var StateViewPanes = Backbone.View.extend({
    el: $("#cbb-main-panes")
    ,template_home: CBB['templates']['0-home']
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
        // 
        var s = _.findWhere(this.model.get("slugs"),{active:"is-active"}).slug

        var tpl = null;
        tpl=this.template_home

    //     switch (s) {
    //         case "home":
    //         tpl=this.template_home
    //         break;
    //         default:
    //     // statements_def
    //     break;
    // }

// if(s=="home"){
//     // $(this.el).html(this.template_home())
//     $(this.el).html(this.template(this.model.toJSON()))

// }

$(this.el).html(tpl(this.model.toJSON()))


        // $(".cbb-main-pane").each(function(l){
        //     $(l).addClass("hidden")
        // });

        // $(".cbb-main-pane").each(function(l){
        //     if($(l).attr("id")==s){
        //         $(l).removeClass("hidden")
        //     }
        // });
        

        return this
    }
});