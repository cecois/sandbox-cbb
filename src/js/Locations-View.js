var LocationsView = Backbone.View.extend({
  el: null,
  events: {
  },
  initialize: function() {
    BitGroup = new L.featureGroup().addTo(map);
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
                        m.target.setStyle(acdive);
                      }).addOneTimeEventListener("popupopen", function(p) {

                      })
                    //on popup
                  } else {
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
                    }).addOneTimeEventListener("popupopen", function(p) {
                    }) //on popup
                  }
                  foot.on("popupclose", function(p) {

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
      fillColor: "#ff8000",
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
      fillColor: "#00d1b2",
      color: "#00d1b2",
      weight: 6,
      opacity: .8,
    };
    break;
    case 'lineactive':
    return {
      fillColor: "#00d1b2",
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
      fillColor: "#00d1b2",
      color: "#000",
      weight: 1,
      opacity: 1,
    };
    break;
}//switch

}
});
