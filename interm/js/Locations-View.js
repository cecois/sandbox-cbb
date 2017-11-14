var LocationsView = Backbone.View.extend({
  el: null,
  events: {
  },
  initialize: function() {
    BitGroup = new L.featureGroup().addTo(map);
      // this.listenTo(this.collection,"change","render")
      this.collection.bind("sync", this.render, this);
      return this
    }
    ,render: function(){

      BitGroup.clearLayers();

      this.collection.each(function(geom, i) {
        var geomTemplate = CBB['templates']['bitMarkerViewTpl']
        var pu = geomTemplate(geom.get("properties"));
        var geomtype = geom.get("geometry").type
        var stile = this.get_style();
        var acdive = this.get_style('active');
        var ceen = this.get_style('seen');
        // var bitm = {
        //   "type": "Feature",
        //   "properties": {
        //     "name": bit.get("name"),
        //     "active":bit.get("active"),
        //     "cartodb_id": bit.get("cartodb_id"),
        //     "geom_type": bit.get("geom_type"),
        //     "anno": bit.get("anno"),
        //     "created_at": bit.get("created_at"),
        //     "updated_at": bit.get("updated_at")
        //   },
        //   "geometry": $.parseJSON(bit.get("the_geom"))
        // };
        var bitm = geom.attributes
        if (geomtype.toLowerCase() == "point") {
          var foot = L.geoJson(bitm, {
            seen: false,
            location_id: geom.get("properties").cartodb_id,
            location_type: geom.get("geometry").type.toLowerCase(),
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, stile);
            }
          })
          foot.bindPopup(pu).addTo(BitGroup).on("click", function(m) {
                        // first mark it seen
                        // var stale = _.find(BitGroup._layers, function(i) {
                        //   return i.options.seen == true
                        // });
                        m.target.setStyle(acdive);
                        // processLeaf(bit.get("cartodb_id").toString(), false, geomtype);
                      }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
                        ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = bitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                        -----------------------  */
                        // p.model = bitm.properties
                        // puFactory(p)
                      })
                    //on popup
                  } else {
                    // var stile = this.get_style()
                    var foot = L.geoJson(bitm, {
                      seen: false,
                      location_id: geom.get("properties").cartodb_id,
                      location_type: geom.get("geometry").type.toLowerCase(),
                      style: stile
                    })
                    foot.bindPopup(pu).addTo(BitGroup).on("click", function(m) {
                      m.target.setStyle(acdive);
                      var stale = _.find(BitGroup._layers, function(i) {
                        return i.options.seen == true
                      });
                      // processLeaf(bit.get("cartodb_id").toString(), false, geomtype);
                    }).addOneTimeEventListener("popupopen", function(p) {
                        /* --------------------------------------------------
                        ok what dafuk is going on here? Well in order to use native Backbone stuff *within* the popup we needed to be able inject a model-view couple into its guts - i.e. we want the guts of this popup to be the $el of a BB view. The way to do that is to throw the popupopen event to an external popup factory that *we* write - just so happens to be a BB view generator based on the "model" we also pass as part of the object. See that piece where we add an attribute to p? p.model = bitm.properties is us passing along this (this!) model to the popup factory. Kinda. You know what i mean.
                        -----------------------  */
                        // p.model = bitm.properties
                        // puFactory(p)
                    }) //on popup
                  }
                  foot.on("popupclose", function(p) {
                    // activecouple = activeFactory(bit.get("geom_type") + ":" + bit.get("cartodb_id"))
                    // var silent = false
                    // appCBB.activate(silent);
                    p.target.setStyle(ceen)
                }) //.on
                  if (typeof bitm.options == 'undefined') {
                    bitm.options = {
                      cartodb_id: null
                    }
                  }
                  bitm.options.cartodb_id = geom.get("properties").cartodb_id.toString()
                },this)

if(this.collection.length > 0){
  map.fitBounds(BitGroup.getBounds());
}

appActivityView.stfu()

return this
}
,get_style: function(s){

  switch (s) {
    case 'active':
    return {
      radius: 18,
      fillColor: "#fecd0b",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.6,
    };
    break;
    case 'seen':
    return {
      radius: 6,
      fillColor: "#ffffff",
      color: "#1288b9",
      weight: 1,
      opacity: .6,
      fillOpacity: 0.3,
    };
    break;
    case 'linenew':
    return {
      fillColor: "rgba(126, 223, 216, 100)",
      color: "rgba(126, 223, 216, 100)",
      weight: 6,
      opacity: .8,
    };
    break;
    case 'lineactive':
    return {
      fillColor: "#fecd0b",
      color: "#fecd0b",
      weight: 8,
      opacity: 1,
    };
    break;
    case 'lineseen':
    return {
      fillColor: "#ffffff",
      color: "#ffffff",
      weight: 6,
      opacity: .6,
    };
    default:
    return {
      radius: 6,
      fillColor: "rgba(6, 6, 6, 50)",
      color: "#000",
      weight: 1,
      opacity: 1,
    };
    break;
}//switch

}
});
