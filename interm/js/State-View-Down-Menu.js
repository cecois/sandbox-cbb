var StateViewDownMenu = Backbone.View.extend({

    el: $("#cbb-bt-map-toggle"),
    template: CBB['templates']['statesViewTpl_default']

    ,events: {
        "click i": "setm"
    }
    ,initialize: function() {


        this.model.bind("change:downout", this.render, this);
        return this
        .render();
    }
    ,setm: function(){

        var news = (this.model.get("downout")=="out")?"down":"out";
        this.model.set({downout:news})

        return this
    }
    ,render: function(){

        if(this.model.get("downout")=="down"){
            $("#cbb-main").addClass("down")
        } else {
            $("#cbb-main").removeClass("down")

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
