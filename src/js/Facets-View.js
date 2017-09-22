var FacetsView = Backbone.View.extend({
    // tagName: "ul",
    // el: "#search-facets",
    template: CBB['templates']['facetsView'],
    events: {
    },
    initialize: function() {
      this.collection.bind("change", this.render, this);
      return this
    }
    ,render: function(){

      $(this.el).html(this.template({facets:this.collection.toJSON()}));

      return this
    }
  });