var CartoCollxView = Backbone.View.extend({
    events: {
        // "click .bt.marker": 'stageeps',
        // "click .bt-cartoobj-episodes": 'stageeps'
    },
    initialize: function() {
        // this.collection.bind('change', this.debug, this);
        this.listenTo(this.collection, 'reset', this.render);
        // this.listenTo(this.collection, 'change:active', this.render);
        // this.listenTo(this.collection, "change", this.render);
        // this.listenTo(this.collection, "change:active", this.zoomTo);
        return this
            // .render()
        },
    //     zoomTo: function(){
    // if(verbose==true){
    //     console.log("something was activated in cartocollx, we gotta zoom to it");
    // }
    //         var ai = this.collection.findWhere({"active":true})
    // console.log("ai:");console.log(ai);
    // return this
    //     },
    fitOG: function() {
        map.fitBounds(cbbItems.getBounds())
        return this
    },
    fit: function() {
        // var count = this.collection.length;
        // if (hit.get("active") == true || count == 1) {
            var actv = activeFactory();
            if (actv !== null && actv.length == 2) {
                var amtyp = actv[0]
                var amid = actv[1]
            }
        // if (hit.get("cartodb_id") == amid || hit.get("geom_type" == amtyp)) {
        // console.log("hit foot");
        // console.log(foot);
        // if (map.getBounds().contains(foot.getLatLng()) == false) {
        //     map.setView(foot.getLatLng(), 9);
        // }
        // foot.openPopup()

        // _.each(this.collection.models,function(m){console.log("in each:");console.log(m.get("active"))});

        //
        var amo = this.collection.findWhere({
            "active": true
        })

        if(typeof amo !== 'undefined'){

            if(this.collection.length<2){
                var zoomto=true
            } else {
                var zoomto=false
            }

            processLeaf(amo.get("cartodb_id").toString(), true, amo.get("geomtype"),zoomto);}

            // foot.zoomTo().openPopup()
        // map.fitBounds(foot.getBounds())
        return this
            // }
            // }, this);
        },
        render: function() {
            appActivity.set({
                message: "preparing map objects..."
            })
            cbbItems.clearLayers();
            var silent = true
            appCBB.activate(silent);
            this.collection.each(function(hit, i) {
            // var gjraw = hit.get("the_geom_gj");
            var hitTemplate = CBB['templates']['hitMarkerViewTpl']
            var pu = hitTemplate(hit.toJSON());
            // if(hit.get("active")==true){
            // var mstyle=markerseen
            // } else {
            // var mstyle = markernew
            // }
            // var hitloc = hit.get("loc")
            // Create a new Wicket instance
            // var wkt = new Wkt.Wkt();
            // Read in any kind of WKT string
            // wkt.read(hit.get("the_geom"));
            // var geomtype = wkt.type
            var geomtype = hit.get("geom_type")
                // if(verbose==true){console.log("hit at 39:");console.log(hit);}
                var hitm = {
                    "type": "Feature",
                    "properties": {
                        "name": hit.get("name"),
                        "active":hit.get("active"),
                        "cartodb_id": hit.get("cartodb_id"),
                        "geom_type": hit.get("geom_type"),
                        "anno": hit.get("anno"),
                        "created_at": hit.get("created_at"),
                        "updated_at": hit.get("updated_at")
                    },
                    "geometry": $.parseJSON(hit.get("the_geom"))
                    // hit.get("the_geom")
                };
            // .get("the_geom");
            // console.log("hitm:");console.log(hitm);
            if (geomtype == "point") {
                // var hitll = wkt.toObject().getLatLng()
                // var hitm = L.circleMarker(hitll, markernew)
                var activeStyle = markernew
                var foot = L.geoJson(hitm, {
                    seen: false,
                    cartodb_id: hit.get("cartodb_id"),
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, activeStyle);
                    }
                })
                foot.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                        // first mark it seen
                        var stale = _.find(cbbItems._layers, function(i) {
                            return i.options.seen == true
                        });
                        processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
                        ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                        -----------------------  */
                        p.model = hitm.properties
                        puFactory(p)
                    })
                    //on popup
                    // var seenStyle = markerseen
                } else {
                // var hitm = wkt.toObject().setStyle(linenew)
                var activeStyle = linenew
                    // var zoomer = hitm.coordinates
                    // var seenStyle = lineseen
                    // console.log("hitll:");console.log(hitll);
                    var foot = L.geoJson(hitm, {
                        seen: false,
                        cartodb_id: hit.get("cartodb_id"),
                        style: activeStyle
                    })
                    foot.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                        var stale = _.find(cbbItems._layers, function(i) {
                            return i.options.seen == true
                        });
                        processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
                        ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                        -----------------------  */
                        p.model = hitm.properties
                        puFactory(p)
                    }) //on popup
                }
                foot.on("popupopen", function(p) {
                    activecouple = activeFactory(hit.get("geom_type") + ":" + hit.get("cartodb_id"))
                    var silent = false
                    appCBB.activate(silent);
                }) //.on
                // var hitm = wkt.toObject().addTo(cbbItems).on("click", function(m) {
                // var hitm = L.circleMarker(hitll, mstyle).addTo(cbbItems).on("click", function(m) {
                // console.log("hitm just after bindpopu:");console.log(hitm);
                // hitm.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                //     var stale = _.find(cbbItems._layers, function(i) {
                //         return i.options.seen == true
                //     });
                //     processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                // });
                if (typeof hitm.options == 'undefined') {
                    hitm.options = {
                        cartodb_id: null
                    }
                }
                hitm.options.cartodb_id = hit.get("cartodb_id").toString()
                // appActivity.set({
                //     message: null,
                //     show: false
            })

if(this.collection.length > 0){
    map.fitBounds(cbbItems.getBounds());
}

appActivityView.stfu()
return this
.fit()
},
renderWITHZOOM: function() {
    console.log("--------> CCXV.render");
    appActivity.set({
        message: "preparing map objects..."
    })
    cbbItems.clearLayers();
    this.collection.each(function(hit, i) {
            // var gjraw = hit.get("the_geom_gj");
            var hitTemplate = CBB['templates']['hitMarkerViewTpl']
            var pu = hitTemplate(hit.toJSON());
            // if(hit.get("active")==true){
            // var mstyle=markerseen
            // } else {
            // var mstyle = markernew
            // }
            // var hitloc = hit.get("loc")
            // Create a new Wicket instance
            // var wkt = new Wkt.Wkt();
            // Read in any kind of WKT string
            // wkt.read(hit.get("the_geom"));
            // var geomtype = wkt.type
            var geomtype = hit.get("geom_type")
                // if(verbose==true){console.log("hit at 39:");console.log(hit);}
                var hitm = {
                    "type": "Feature",
                    "properties": {
                        "name": hit.get("name"),
                    // "active":hit.get("active"),
                    "cartodb_id": hit.get("cartodb_id"),
                    "geom_type": hit.get("geom_type"),
                    "anno": hit.get("anno"),
                    "created_at": hit.get("created_at"),
                    "updated_at": hit.get("updated_at")
                },
                "geometry": $.parseJSON(hit.get("the_geom"))
                    // hit.get("the_geom")
                };
            // .get("the_geom");
            // console.log("hitm:");console.log(hitm);
            if (geomtype == "point") {
                // var hitll = wkt.toObject().getLatLng()
                // var hitm = L.circleMarker(hitll, markernew)
                var activeStyle = markernew
                var foot = L.geoJson(hitm, {
                    seen: false,
                    cartodb_id: hit.get("cartodb_id"),
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, activeStyle);
                    }
                })
                foot.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                        // first mark it seen
                        var stale = _.find(cbbItems._layers, function(i) {
                            return i.options.seen == true
                        });
                        processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
-----------------------  */
p.model = hitm.properties
puFactory(p)
})
                    //on popup
                    // var seenStyle = markerseen
                } else {
                // var hitm = wkt.toObject().setStyle(linenew)
                var activeStyle = linenew
                    // var zoomer = hitm.coordinates
                    // var seenStyle = lineseen
                    // console.log("hitll:");console.log(hitll);
                    var foot = L.geoJson(hitm, {
                        seen: false,
                        cartodb_id: hit.get("cartodb_id"),
                        style: activeStyle
                    })
                    foot.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                        var stale = _.find(cbbItems._layers, function(i) {
                            return i.options.seen == true
                        });
                        processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = hitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
-----------------------  */
p.model = hitm.properties
puFactory(p)
                    }) //on popup
                    // var hitm = L.multiPolyline(hitll, linenew);
                }
            //             if (hit.get("active" == "true")) {
            //                 console.info("hit - check for active == true")
            // console.log(hit);
            // // hit.openPopup()
            // if(verbose==true){
            //                 console.log("active hit! we'll pop its popup...");
            //                 console.log(foot);
            //             }
            //                 }
            // foot.openPopup()
            // if (this.collection.length == 1) {
            //     cbbItems.openPopup()
            // }
            foot.on("popupopen", function(p) {
                activecouple = activeFactory(hit.get("geom_type") + ":" + hit.get("cartodb_id"))
                appCBB.activate();
                }) //.on
                // var hitm = wkt.toObject().addTo(cbbItems).on("click", function(m) {
                // var hitm = L.circleMarker(hitll, mstyle).addTo(cbbItems).on("click", function(m) {
                // console.log("hitm just after bindpopu:");console.log(hitm);
                // hitm.bindPopup(pu).addTo(cbbItems).on("click", function(m) {
                //     var stale = _.find(cbbItems._layers, function(i) {
                //         return i.options.seen == true
                //     });
                //     processLeaf(hit.get("cartodb_id").toString(), false, geomtype);
                // });
                if (typeof hitm.options == 'undefined') {
                    hitm.options = {
                        cartodb_id: null
                    }
                }
                hitm.options.cartodb_id = hit.get("cartodb_id").toString()
                var count = this.collection.length;
            // if (hit.get("active") == true || count == 1) {
                var actv = activeFactory();
                if (actv !== null && actv.length == 2) {
                    var amtyp = actv[0]
                    var amid = actv[1]
                }
                if (hit.get("cartodb_id") == amid || hit.get("geom_type" == amtyp)) {
                    console.log("hit foot");
                    console.log(foot);
                // if (map.getBounds().contains(foot.getLatLng()) == false) {
                //     map.setView(foot.getLatLng(), 9);
                // }
                foot.openPopup()
                map.fitBounds(foot.getBounds())
                    // foot.zoomTo().openPopup()
                }
            }, this);
        // appActivity.set({
        //     message: null,
        //     show: false
        // })
        appActivityView.stfu()
        return this
            // .fit()
        }
    });