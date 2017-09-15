var StateView = Backbone.View.extend({
    el: $("#cbb-map-toggle"),
    template_default: CBB['templates']['statesViewTpl_default']
    ,template_down: CBB['templates']['statesViewTpl_down']
    ,template_menu: CBB['templates']['statesViewTpl_menu']
    ,events: {
        "click #cbb-map-toggle-copy": "setm",
    }
    ,initialize: function() {


        this.model.bind("change", this.render, this);
        return this
        .render();
    }
    ,setp: function(e){

        console.log(e)

        return this
    },setm: function(){

        var news = (this.model.get("downout")=="out")?"down":"out";
        this.model.set({downout:news})

        return this
    }
    ,render: function(){

        $("#cbb-pane-menu").html(this.template_menu(this.model.toJSON()));

        if(this.model.get("downout")=="down"){
            $("#cbb-main").addClass("down")
            $(this.el).html(this.template_down())
        } else {
            $("#cbb-main").removeClass("down")
            $(this.el).html(this.template_default())

        }

        return this
    }
    ,set: function(){
        return this
    }
    ,swap: function(){
        $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy')
        return this.render()
    },
    prebaked: function(set) {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> prebakedOG")
        }
        if (CONFIG.verbose == true) {
            console.log("prebaked set:");
            console.log(set);
        }
        console.log("set:");
        console.log(set);
        if (set.indexOf("query") >= 0) {
            if (CONFIG.verbose == true) {
                console.log("indexof query >= 0")
            }
            if (appEpisodes.length == 0) {
                appStates.set([{
                    "name": "main",
                    "posish": "open"
                }, {
                    "name": "episodes",
                    "visible": false,
                    "posish": "open"
                }, {
                    "name": "banner-bang",
                    "posish": "open"
                }])
            } else {
                if (CONFIG.verbose == true) {
                    console.log("indexof query musta been 0")
                }
                appStates.set([{
                    "name": "main",
                    "posish": "open"
                }, {
                    "name": "episodes",
                    "visible": false,
                    // "posish": "momap"
                    "posish": "open"
                }, {
                    "name": "banner-bang",
                    "posish": "open"
                }])
            } //episodes.length test
        } else if (set == "") {
            if (CONFIG.verbose == true) {
                console.log("set == 0")
            }
            appStates.set([{
                "name": "main",
                "posish": "open"
            }, {
                "name": "episodes",
                "visible": false,
                "posish": "open"
            }, {
                "name": "banner-bang",
                "posish": "open"
            }])
        } else {
            appStates.set([{
                "name": "main",
                "posish": "full"
            }, {
                "name": "episodes",
                "visible": false
            }, {
                "name": "banner-bang",
                "posish": "open"
            }])
        }
        // break;
        // }
        return this.render()
    },
    setpos: function(newforwhom, collaps) {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> setpos")
        }
        if (typeof newforwhom == 'undefined' || newforwhom == null) {
            var newforwhom = "main"
        }
        if (typeof collaps == 'undefined' || collaps == null) {
            // nothing explicit came in -- let's swap whatever current state is
            if (this.model.get("collapsed") == "true") {
                var collaps = "false"
            } else {
                var collaps = "true"
            }
        }
        switch (collaps) {
            case "true":
            var op = "plus"
            var instro = "expand main pane"
            break;
            case "false":
            var op = "minus"
            var instro = "collapse/hide main pane"
        }

        return this
    },
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