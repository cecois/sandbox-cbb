var QueryView = Backbone.View.extend({
    el: $("#query-form"),
    events: {
        // "click #query-form-bt": "fire",
        "click #query-form-bt": "btfire",
        "click #query-form-heynongmantzoukas": "heynong",
        "click #query-form-randomizer": "randomize",
        "click #solrfields .glyphicon": "togglehelp"
            // "change": "render"
        },
        template: CBB['templates']['queryViewTpl'],
        initialize: function() {
        // this.render();
        var q = this.model;
        // q.on("change", q.setstrings);
        // this.listenTo(this.model, "change", this.render)
        this.listenTo(this.model, "change:solrstring", this.fire)
            // this.listenTo(this.model, "change", this.test)
            // this.model.bind("change:urlstring", this.fire, this);
        },
        heynong: function() {
        // $(this.el).tooltip('destroy')
        $("#query-form-heynongmantzoukas").tooltip('destroy')
            // appCartoQuery.set({});
            appCartoQuery.set({
                facetarray: [],
                rawstring: "*"
            });
            return this
        // .fire()
    },
    test: function() {
        console.log("queryview should fire here? Using: ")
        console.log("rawstring:                         " + this.model.get("rawstring"))
        console.log("displaystring:                     " + this.model.get("displaystring"))
        console.log("urlstring:                         " + this.model.get("urlstring"))
        console.log("facetarray:                        " + this.model.get("facetarray"))
        return this
    },
    reset: function(){

        appCartoQuery.set({offset:"0",rows:"9999"});
        return this

    },
    randomize: function(){

        $("#query-form-randomizer").tooltip('destroy')
        var top = Math.floor((Math.random() * 1040) + 1);
        var ss = "bit:Location"

        appCartoQuery.set({rawstring:ss,offset:top,rows:1});


        return this
        .reset()

    },
    btfire: function(e) {
        if(verbose==true){
            console.log("btfire's e:")
            console.log(e);}


// this.model.set({"facetarray":[]},{silent:true})
var ss = $("#query-form-input").val()
this.model.set({facetarray:[],rawstring:ss});

return this
        // .fire()
    },
    fire: function(e) {

        $(this.el).tooltip('destroy')
        appQuerySubNavView.reset()
        if (verbose == true) {
            console.log("acqv.fire")
        }
        appCBB.deactivate()
            // $(".episodes-arrow").addClass("hidden")
            // if (typeof goto == 'undefined' || goto==null) {
            //     console.log("not sure who fired this, setting goto to false:");
            //     console.log(goto);
            //     goto = false
            // }
            if (typeof e !== 'undefined' && e.type == "click") {
            // goto = true
            var ss = $("#query-form-input").val()
                // if (ss == '' || ss == null) {
                //             this.model.set({
                //                 urlstring: "",
                //                 rawstring: "",
                //                 displaystring: ""
                //             })
                // } else {
                    this.model.set({
                        rawstring: ss
                    })
                // }
                //
                appRoute.navigate(urlFactory("#query"), {
                    trigger: true,
                    replace: true
                })
            }
        // var ss = $("#query-form-input").val()
        // if (goto == true) {
        //     // goto true, we'll basically run ourselves by visiting #query, which runs this
        // } else {
        // ok we didn't wanna disrupt pane state but we still wanna fire off a query
        // gotta do this here rather than rely on a route to do it
        //
        appActivity.set({
            message: "querying bits..."
        })
        appBits.fetch({
            reset: true,
                // dataType: "jsonp"
                success: function() {
                    // i can't for the life of me get that view to bind to this collection's events - dunno
                    // appBitsView.render()
                    // appBitsCountView.render()
                    appActivity.set({
                        message: "extracting mappable locations..."
                    })
                    appCBB.fetch({
                        reset: true,
                        // dataType: "jsonp"
                        success: function(collx) {
                            // appCBBListView.render()
                            // appCBBMapView.render()
                            // appCBBCountView.render()
                            // if (typeof activecouple !== 'undefined' && activecouple !== null) {
                            //     console.info("WOA - ONE OF THESE IS ACTIVE")
                            //         collx.activate(false);
                            //     }
                            //
                            appActivityView.stfu()
                        },
                        error: function() {
                            appActivity.set({
                                message: "query errored out"
                            })
                            appActivityView.warn()
                        }
                    })
                }, //success fetch
                error: function() {
                    appConsole.set({
                        message: "query errored out"
                    })
                        // actually, if it's a true error we wanna be more forthcoming:
                        $("#querylist-locations").append("<li style='margin-top:50px;font-size:2em;'></li>")
                        $("#querylist-bits").append("<li style='margin-top:50px;font-size:2em;'></li>")
                    }
                })
            //
            //
            // }
            return this.render()
        },
        setstage: function() {
            $("#querylist-locations").html("")
        },
        rewire: function() {
            if(verbose==true){
                console.log("rewiring queryview...")}
                $(this.el).tooltip('destroy')
                var heynongcopy = "Heynong the current query ( reset it to show everything [cept it'll take a while]"
                if (appCartoQuery.get("facetarray").length > 0) {
                    heynongcopy += "[still limited to current facets:"
                    heynongcopy += appCartoQuery.get("facetarray").join(",")
                    heynongcopy += "])"
                } else {
                    heynongcopy += ")"
                }
                $("#query-form-heynongmantzoukas").tooltip({
                    placement: 'bottom',
                    trigger: 'hover',
                    container: 'body',
                    delay: 0,
                    title: heynongcopy
                });

                $("#query-form-randomizer").tooltip({
                    placement: 'bottom',
                    trigger: 'hover',
                    container: 'body',
                    delay: 0,
                    title: "pull one random location"
                });
                return this
            },
            render: function() {
        // appRoute.update()
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
        $(this.el).html(this.template(this.model.toJSON()))
            // $(this.el).val(this.model.get("solrstring"))
            return this.rewire()
        }
    });