var FacetsView = Backbone.View.extend({
    // tagName: "ul",
    // el: "#search-facets",
    template: CBB['templates']['facetsView'],
    events: {
    },
    initialize: function() {
      this.collection.bind("reset", this.render, this);
      return this
    }
    ,subset: function(){
      var which = $(this.el).attr("id").split("-")[2]
      var subset = this.collection.filter({type:which});
      // console.log("subset before return toJSON",subset.toJSON())
      // this.collection.reset(subset)
      return subset
    }
    ,render: function(){

// this.subset();
// console.log("raw collection",this.collection)
// console.log("subset",this.subset())

      $(this.el).html(this.template({facets:this.collection.toJSON()}));
      // $(this.el).html(this.template({facets:this.subset()}));

      return this
    }
  });
