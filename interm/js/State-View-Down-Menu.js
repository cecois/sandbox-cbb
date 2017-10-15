var StateViewDownMenu = Backbone.View.extend({
    el: $("#cbb-map-toggle"),
    template: CBB['templates']['statesViewTpl_default']
    ,template_default: CBB['templates']['statesViewTpl_default']
    ,template_down: CBB['templates']['statesViewTpl_down']
    ,events: {
        "click #cbb-bt-copy-map": "setm"
    }
    ,initialize: function() {


        this.model.bind("change:downout", this.render, this);
        return this
        .render();
    }
    ,setm: function(){
        console.log("in setm",this.model.get("downout"));
        var news = (this.model.get("downout")=="out")?"down":"out";
        this.model.set({downout:news})

        return this
    }
    ,render: function(){

        if(this.model.get("downout")=="down"){
            $("#cbb-main").addClass("down")
            // $(this.el).addClass("down")
            // $(this.el).html(this.template_down())
        } else {
            $("#cbb-main").removeClass("down")
            // $(this.el).html(this.template())
            // $(this.el).removeClass("down")

        }

        $(this.el).html(this.template(this.model.toJSON()))
        return this
    }
    ,rewire: function() {
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
