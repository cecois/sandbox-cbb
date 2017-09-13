var CartoListView = Backbone.View.extend({
    // tagName: "li",
    el: "#querylist-locations",
    events: {
        // "click .bt-cartoobj-zoomto": 'zoomtointernal',
        // "click .bt-cartoobj-episodes": 'pulleps',
        // "click .bt-cartoobj-episodes": 'triage',
        "click .bt-cartoobj": 'triage',
        "click .copy-trigger": "singular",
        // "click .bt-getid": 'echoid'
    },
    // template: Handlebars.templates['cartoPlainView'],
    initialize: function() {
        if (verbose == true) {
        }
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change:active', this.rendermin);
        if (agent == "desktop") {
            this.template = CBB['templates']['cartoListView'];
        } else if (agent == "mobile") {
            this.template = CBB['templates']['cartoListView-Mobile'];
        }
        return this
    },
    singular: function(e) {
        if (verbose == true) {
        }
        e.preventDefault()
        var ds = $(e.currentTarget).attr("data-string")
        locTrigger(e, true, ds)
        return this
    },
    echoid: function(e) {
        if (verbose == true) {
        }
        // var locid = $(e.target).attr("data-id")
        var locid = $(e.currentTarget).attr("data-id")
        var loctyp = $(e.currentTarget).attr("data-type")
            // var loctyp = $(e.target).attr("data-type")
        var str = '<span class="copy-trigger" data-string="' + loctyp + ':' + locid + '" data-toggle="tooltip" data-original-title="" title=""><span class="loc-string">SOME STRING</span><span class="carto-plain-geomtype icom-' + loctyp + '"></span>'
        return this
    },
    fromzoom: function(cm) {
        if (verbose == true) {
        }
        var czid = cm.get("cartodb_id")
        var a = $(this.el).find("li[data-id='" + czid + "']")
            // return this.activate(a)
        return this
    },
    unwire: function() {
        if (verbose == true) {
        }
        $('.bt-cartoobj').tooltip('destroy')
        return this
    },
    triage: function(e) {
        e.preventDefault()
        if (dev == true) {
            this.echoid(e)
        }
        var locid = $(e.target).attr("data-id")
        var loctype = $(e.target).attr("data-type");
        // appCBB.activate(locid, loctype);
        // activecouple = loctype+":"+locid
        activecouple = activeFactory(loctype + ":" + locid)
        appCBB.activate();
        // this is one we want the url to reflect
        appRoute.navigate(urlFactory("#query"), {
            trigger: false,
            replace: false
        })

        if (agent == "desktop") {
            return this
            .zoomto().pulleps()
        } else if (agent == "mobile") {
            // return this.pulleps_mobile()
            return this
            .zoomto().pulleps()
        }
        // return this.prepeps(e)
    },
    sort: function() {
        if (verbose == true) {
        }
        this.collection.sort()
        return this
    },
    pulleps_mobile: function() {
        if (verbose == true) {
        }
        e.preventDefault()
        var a = $(e.currentTarget).parents('li')
            // return this.activate(a)
        return this
    },
    prepeps: function(e) {
        if (verbose == true) {
        }
        // appQuerySubNavView.episodize("bits")
        // appQuerySubNav.set({patsy:"bits"})
        // if (agent == "desktop") {
        //            return this.pulleps()
        //        } else if (agent == "mobile") {
        //            return this.pulleps_mobile()
        //        }
    },
    pulleps: function() {

            // $("#episodes-list").html('<div class="spinner-gold"></div>')
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
        var locid = actv[1]
        locidDrd = doctorId(loctype, locid)
        appEpisodes.activeloc = Number(locidDrd);
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {
                appQuerySubNavView.episodize("bits")
            }
        });
        return this
        // .render()
    },
    // zoomtointernal: function(e) {
    //     if (verbose == true) {
    //     }
    //     e.preventDefault()
    //     var a = $(e.currentTarget).parents('li')
    //         // return this.activate(a)
    //     return this
    // },
    // zoomfromexternal: function(czid) {
    //     if (verbose == true) {
    //     }
    //     var a = $(this.el).find("li[data-id='" + czid + "']")
    //         // return this.activate(a)
    //     return this
    // },
    rewire: function(zoomto) {
        if (verbose == true) {
        }
        // reactivating some pieces that get wiped in the render
        // actually -- first, since we're here for the same reason -- let's wipe the episodes list, too
        // if (typeof zoomto == 'undefined') {
        //     var zoomto = true
        // }
        $('#querylist-locations').liveFilter("#query-livefilter", 'li', {
            filterChildSelector: 'div'
        });
        $('.bt-cartoobj').tooltip({
                container: 'body',
                placement: 'right',
                trigger: 'hover'
            })
            // a little non-backbone stuff
        $("#stats-hits").html("total hits: " + this.collection.length)
        if (zoomto == true) {
            return this
            // .zoomto()
        } else {
            return this
            // .zoomto()
        }
    },
    zoomto: function() {
console.log("--------> CLV.zoomto");
        var actv = activeFactory();
console.log("--------> CLV.zoomto, actv:");
console.log(actv);
        if (actv !== null && actv.length == 2) {
            var amtyp = actv[0]
            var amid = actv[1]

            console.info("amtyp:")
            console.log(amtyp)
            console.info("amid:")
            console.log(amid)

            // _.each(cbbItems._layers, function(i) {
            //     console.info("inside the cbbitems loop")
            //         if (i.options.cartodb_id == amid) {

            //             var ib = i.getBounds();

            //             i.openPopup()

            //             if (verbose == true) {
            //                 console.log("ib:");
            //                 console.log(ib);
            //             }
            //             // var typ = i.get("geom_type")
            //             switch (amtyp) {
            //                 case 'point':
            //                     // map.setView(i.getBounds(),7)
            //                     map.fitBounds(ib)
            //                     break;
            //                 case 'poly':
            //                     // map.setView(i.getBounds(),7)
            //                     map.fitBounds(ib)
            //                     break;
            //                 default:
            //                     // i.e. line
            //                     map.fitBounds(ib)
            //                         // locid = locid;
            //             }
            //         }
            //     }) //each
            processLeaf(amid, true, amtyp,true)
        } //actv length test
        return this
    },
    activateold: function(a) {
        if (verbose == true) {
        }
        // first wipe the list of any true classes (see ~184 for explanation)
        $(this.el).find(".carto-plain-title").removeClass("true")
        var amid = $(a).data("id").toString();
        var amtyp = $(a).data("type").toString();
        // this should be done already
        // appCBB.activate(amid,amtyp)
        // // actually first silently deactivate the others
        // _.each(_.reject(this.collection.models, function(mod) {
        //         return mod.get("cartodb_id") == amid;
        //     }), function(mo) {
        //         mo.set({
        //             active: false,
        //             queued: false
        //         }, {
        //             silent: true
        //         })
        //     }, this)
        //     //
        // var item = this.collection.findWhere({
        //     "cartodb_id": amid
        // });
        var item = this.collection.findWhere({
            "active": true
        });
        // item.set({
        //         active: true
        //     })
        //
        // SHOULD NOT BE AN EACH #returnto
        //
        _.each(cbbItems._layers, function(i) {
                // we can shop the now-active id to the leaflet layers bc we stored that id when we added them to the map
                if (i.options.cartodb_id == amid) {
                    // if (i.active == true) {
                    // if(item.get("geom_type")=="line"){
                    //     if (map.getBounds().contains(i.getLatLng()) == false) {
                    //     map.setView(i.getLatLng(), 9);
                    // }
                    // }
                    // if (map.getBounds().contains(i.getBounds()) == false) {
                    // map.setView(i.getLatLng(), 9);
                    // map.fitBounds(i.getBounds());
                    // }
                    var ib = i.getBounds();
                    if (verbose == true) {
                        console.log("ib:");
                        console.log(ib);
                    }
                    var typ = item.get("geom_type")
                    switch (typ) {
                        case 'point':
                            // map.setView(i.getBounds(),7)
                            map.fitBounds(ib)
                            break;
                        case 'poly':
                            // map.setView(i.getBounds(),7)
                            map.fitBounds(ib)
                            break;
                        default:
                            // i.e. line
                            map.fitBounds(ib)
                                // locid = locid;
                    }
                    // if (map.getBounds().contains(i.getLatLng()) == false) {
                    //     map.setView(i.getLatLng(), 9);
                    // }
                }
            }) //each
            // $(a).addClass("true") //OG
        $(a).find(".carto-plain-title").addClass("true")
            // if($(a).hasClass('carto-plain-title')){
            // $(a).addClass("true")
            // } else {
            //         $(a).siblings('.carto-plain-title').addClass("true")}
            // $(a).addClass("well")
        processLeaf(amid, true, item.get("geom_type"))
            // GUH? WHAT'S THIS? It's a straight-up jquery hack to waaaaay more quickly light up the active model's list item
            // cuz doing it with a proper backbone re-render took forever (.8 seconds)
        return this
    },
    rendermin: function(e) {
        if (verbose == true) {
            console.info("rendermin - here's the e")
            console.log(e);
        }
        $(this.el).html(this.template({
            count: this.collection.models.length,
            rows: this.collection.toJSON()
        }));

//         var amid = e.get("cartodb_id")
//         var typ = e.get("geom_type")



//                 _.each(cbbItems._layers, function(i) {
//                 // we can shop the now-active id to the leaflet layers bc we stored that id when we added them to the map
//                 // if (verbose == true) {console.log("ex:");console.log(ex);}

//                 if (i.options.cartodb_id == amid) {


// console.info("...based on this i:")
// console.log(i);
//                     var ib = i.getBounds();
// console.info("AN OPTIONS MATCH, LEMME ZOOM to this ib:")
// console.log(ib);
//                             // map.fitBounds(ib)
//                             map.fitBounds(i.getBounds())

//                     // var typ = i.get("geom_type")
//                     switch (typ) {
//                         case 'point':
//                         console.info("ITS a POINT!")
//                             // map.setView(i.getBounds(),9)
//                             map.fitBounds(i.getBounds())
//                             break;
//                         case 'poly':
//                             map.setView(i.getBounds(),7)
//                             // map.fitBounds(ib)
//                             break;
//                         default:
//                             // i.e. line
//                             map.fitBounds(ib)
//                                 // locid = locid;
//                     }

//                 }
//             }) //each
        //
        return this
        // .rewire(true)
    },
    render: function() {
        if (verbose == true) {
        }
        // this.activate4all()
        this.unwire()
        if (this.collection.models.length > 0) {
            _.sortBy(this.collection.models, function(mod) {
                return mod.get("active") == 'true';
            });
            // var esc = appCartoQuery.solrstring()
            // $("#query-form-input").val(esc)
            // notice we are wrapping the collection in rows: cuz cartodb does it
            $(this.el).html(this.template({
                count: this.collection.models.length,
                rows: this.collection.toJSON()
            }));
        } else {
            // if there are no locations we wanna be cute and snide but also not make anybody see it
            // appConsole.set({
            //     message: 'Just fyi - "' + appCartoQuery.get("rawstring") + '" brought zero mappable locations.'
            // })
            $(this.el).html("<span style='font-size:1.3em;'>Zero mappable bits.</span>" + '<div data-string="huell" data-toggle="tooltip" class="copy-trigger"><span class="loc-string">Huell has tons</span><i class="glyphicon glyphicon-map-marker cbb-trigger-inline"></i></div>')
                // appQuerySubNavView.specify("bits")
            appCBBCountView.render()
        }
        return this.rewire()
    }
});