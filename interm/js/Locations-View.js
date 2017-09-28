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

    var as_geojson = this.collection.each(function(m){
      console.log("m in map - soon added to bitgroup",m)
    })



        // $(this.el).html(this.template({rows:this.collection.toJSON()}));
        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
      }
    });
