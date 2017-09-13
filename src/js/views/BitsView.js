var BitsView = Backbone.View.extend({
    // tagName: "li",
    el: "#querylist-bits",
    events: {
        // "click .bt-cartoobj-zoomto": 'zoomtointernal',
        "click .bt-cartoobj-episodes": 'triage',
        "click .copy-trigger": "singular"
        // "click": 'triage',
        // "click .bt-getid": 'echoid'
    },
    template: CBB['templates']['bitsView'],
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        // this.collection.bind('change', this.render, this);
        // this.listenTo(this.collection, "change active", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change", this.sort);
        // this.listenTo(this.collection, "change queued", this.fromzoom);
        // this.listenTo(this.collection, "change active", this.render);
        // this.listenTo(this.model, "change", this.render);
        // this.listenTo(this.collection, "reset", this.render);
        // this.collection.bind('change', this.render, this);
        if (agent == "desktop") {
            this.template = CBB['templates']['bitsView'];
        } else if (agent == "mobile") {
            this.template = CBB['templates']['bitsView-Mobile'];
        }
        return this
            // .render()
        },
        debug: function() {
            console.log("here cuzza change queued");
        },
        echoid: function(e) {
            var locid = $(e.target).attr("data-id")
            var str = '<span class="copy-trigger" data-string="cartodb_id:' + locid + '"><span class="loc-string">SOME STRING</span><i class="glyphicon glyphicon-map-marker"></i></span>';
            if(verbose==true){console.log(str);}
            return this
        },
        unwire: function() {

            $('.bt-cartoobj').tooltip('destroy')
            $('.copy-trigger').tooltip('destroy')
            return this
        },
        stageeps: function(e) {
            return this.pulleps(e)
        },
        sort: function() {
            this.collection.sort()
            return this
        },
        singular: function(e) {

            this.unwire()
            e.preventDefault()
            var ds = $(e.currentTarget).attr("data-string")
            if(verbose==true){
                console.log("e");
                console.log(e);
                console.log("ds");
                console.log(ds);
            }
            locTrigger(e, true, ds)
            return this
        },
        triage: function(e) {
            e.preventDefault()
            if (dev == true) {
            // this.echoid(e)
        }
        var bitid = $(e.target).attr("data-id")
        activecouple = activeFactory("_id:" + bitid)
        this.collection.activate();
        // this is one we want the url to reflect
        appRoute.navigate(urlFactory("#query"), {
            trigger: false,
            replace: false
        })
        if (agent == "desktop") {
            return this.pulleps()
        } else if (agent == "mobile") {
            // return this.pulleps_mobile()
            return this.pulleps()
        }
    },
    pulleps: function() {


        $("#episodes-list").html('<span class="spinner-gold pull-right"></span>').removeClass("hidden")

        // $("#episodes").removeClass("hidden")

            // we have to find the el to activate
            // var act = appCBB.findWhere({
            //     active: true
            // })
            // var locid = act.get("cartodb_id")
            // var loctype = act.get("geom_type")

            var actv = activeFactory();
        // var a = $("#querylist-locations").find("span[data-id='" + locid + "'][data-type='" + loctype + "']").parents("li")
        // if (source == "self") {
        //     // force the scroll to the top jic we left it at the bottom
            // $("#main").scrollTo(".querysubnavh");
        // } else {
        //     // it means we're coming from somewhere else (prolly a popup or the router), which means in turn we might need to nudge the now-active gui elements into view
        //     $("#main").scrollTo($(a), 200, {
        //         offset: -100
        //     });
        //     $("#episodes-list").addClass("episodespecial")
        //     appHiderView.setpos("episodes-pu", "true")
        // }
        // locidDrd = doctorId(loctype, locid)
        var loctype = actv[0]
        var bitid = actv[1]
        // bitidDrd = doctorId(loctype, bitid)
        appEpisodes.activeloc = bitid;
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {


                appQuerySubNavView.episodize("locations")
            }
        });
        // return this.activate(a)
        return this.render()
    },
    pullepsOG: function(e) {
        if(verbose==true){console.log(e);}
        // appActivity.set({
        //     message: "fetching episodes...",
        //     show: true,
        //     altel: null
        //         // altel: "#episodes-list"
        // })
        var locid = $(e.target).attr("data-id")
        var loctype = $(e.target).attr("data-type");
        switch (loctype) {
            case 'line':
            locid = locid / plierline
            break;
            case 'poly':
            locid = locid / plierpoly
            break;
            default:
            locid = locid;
        }
        appEpisodes.activeloc = Number(locid);
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {

            }
        });
        e.preventDefault()
            // var am = $(e.currentTarget).parents('li').data("id").toString();
            var a = $(e.currentTarget).parents('li')
            // some positioning so it's clear what wz activated
            // $(a).scrollIntoView()
            // var voff = e.currentTarget.offsetTop;
            var voff = $(a).offsetTop;
        // appEpisodes.verticaloffset = voff;
        return this.activate(a)
    },
    rewire: function() {
        // reactivating some pieces that get wiped in the render
        // actually -- first, since we're here for the same reason -- let's wipe the episodes list, too
        appEpisodesView.wipe();
        // $('#querylist-bits').liveFilter("#query-livefilter", 'li', {
        //     filterChildSelector: 'div'
        // });
        // $('.bt-cartoobj').tooltip({
        //     container: 'body',
        //     placement: 'right',
        //     trigger: 'hover'
        // })
        $('.bt-cartoobj-episodes').tooltip({
            container: 'body',
            placement: 'right',
            trigger: 'hover'
        })

        $('.copy-trigger').tooltip({
            container: 'body',
            placement: 'top',
            trigger: 'hover',
            html:true,
            title: function(){

                return "query for "+$(this).attr("data-string")
            }
        })
        // a little non-backbone stuff
        // $("#stats-hits").html("total hits: " + this.collection.length)
        return this
    },
    activate: function(a) {
        // first wipe the list of any true classes (see ~184 for explanation)
        $(this.el).find("li").removeClass("true")
            // var amid = am.get("cartodb_id")
            var amid = $(a).data("id").toString();
            if (verbose == true) {
                console.log("in activate for " + a);
            }
        // actually first silently deactivate the others
        // _.each(_.reject(this.collection.models, function(mod) {
        //     return mod.get("cartodb_id") == amid;
        // }), function(mo) {
        //     mo.set({
        //         active: false,
        //         queued: false
        //     }, {
        //         silent: true
        //     })
        // }, this)
        //
        // var item = this.collection.findWhere({
        //     "cartodb_id": amid
        // });
        // item.set({
        //     active: true
        // })
        // send id and popup flag
        //
        // SHOULD NOT BE AN EACH #returnto
        //
        $(a).addClass("true")
        $(a).addClass("well")
        return this
            // .render()
        },
        render: function() {
            this.unwire()
            _.sortBy(this.collection.models, function(mod) {
                return mod.get("active") == 'true';
            });

            if(this.collection.length>0){
                // notice we are wrapping the collection in rows: cuz cartodb does it
                $(this.el).html(this.template({
                    count: this.collection.models.length,
                    rows: this.collection.toJSON()
                }));} else {
                    $(this.el).html("<div style='font-size:1.2em;padding:44px;text-align:center;'><p>None.</p> <p>They were all mappable (look over there --->) or none came in from the query.</p></div>")
                }
                return this.rewire()
            }
        });