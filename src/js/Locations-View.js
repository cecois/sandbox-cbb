var LocationsView = Backbone.View.extend({
    // tagName: "ul",
    el: null,
    // template: CBB['templates']['bitsView'],
    events: {
    },
    // className : "mnuThumbnails",
    initialize: function() {
      // this.listenTo(this.collection,"change","render")
      // this.collection.bind("sync", this.render, this);
      return this
    }
    ,map_for_map: function(){

var arr = this.collection.map(function(m){
  var ndgd = UTIL.geom_id_nudge(m.get("location_type"),m.get("location_id"),"up")
  return "cartodb_id:"+ndgd
})
      return arr//array of doctored IDs
    }
  ,render: function(){

        // $(this.el).html(this.template({rows:this.collection.toJSON()}));
        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
      }
    });
