var LocationsView = Backbone.View.extend({
    // tagName: "ul",
    el: null,
    // template: CBB['templates']['bitsView'],
    events: {
    },
    // className : "mnuThumbnails",
    initialize: function() {
      BitGroup = new L.featureGroup().addTo(map);
      // this.listenTo(this.collection,"change","render")
      this.collection.bind("sync", this.render, this);
      return this
    }
    ,render: function(){

      BitGroup.clearLayers();

      this.collection.each(function(bit, i) {
            // var bitTemplate = CBB['templates']['bitMarkerViewTpl']
            // var pu = bitTemplate(bit.toJSON());
            var pu = "ankfaldn";
            var geomtype = bit.get("geom_type")
            var bitm = {
              "type": "Feature",
              "properties": {
                "name": bit.get("name"),
                "active":bit.get("active"),
                "cartodb_id": bit.get("cartodb_id"),
                "geom_type": bit.get("geom_type"),
                "anno": bit.get("anno"),
                "created_at": bit.get("created_at"),
                "updated_at": bit.get("updated_at")
              },
              "geometry": $.parseJSON(bit.get("the_geom"))
            };
            if (geomtype == "point") {
              var activeStyle = markernew
              var foot = L.geoJson(bitm, {
                seen: false,
                cartodb_id: bit.get("cartodb_id"),
                pointToLayer: function(feature, latlng) {
                  return L.circleMarker(latlng, activeStyle);
                }
              })
              foot.bindPopup(pu).addTo(BitGroup).on("click", function(m) {
                        // first mark it seen
                        var stale = _.find(BitGroup._layers, function(i) {
                          return i.options.seen == true
                        });
                        processLeaf(bit.get("cartodb_id").toString(), false, geomtype);
                      }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
                        ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = bitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                        -----------------------  */
                        // p.model = bitm.properties
                        // puFactory(p)
                      })
                    //on popup
                  } else {
                    var activeStyle = linenew
                    var foot = L.geoJson(bitm, {
                      seen: false,
                      cartodb_id: bit.get("cartodb_id"),
                      style: activeStyle
                    })
                    foot.bindPopup(pu).addTo(BitGroup).on("click", function(m) {
                      var stale = _.find(BitGroup._layers, function(i) {
                        return i.options.seen == true
                      });
                      processLeaf(bit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
                        ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = bitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                        -----------------------  */
                        // p.model = bitm.properties
                        // puFactory(p)
                    }) //on popup
                  }
                  foot.on("popupopen", function(p) {
                    activecouple = activeFactory(bit.get("geom_type") + ":" + bit.get("cartodb_id"))
                    var silent = false
                    appCBB.activate(silent);
                }) //.on
                  if (typeof bitm.options == 'undefined') {
                    bitm.options = {
                      cartodb_id: null
                    }
                  }
                  bitm.options.cartodb_id = bit.get("cartodb_id").toString()
                })

if(this.collection.length > 0){
  map.fitBounds(BitGroup.getBounds());
}

appActivityView.stfu()

return this
}
});
