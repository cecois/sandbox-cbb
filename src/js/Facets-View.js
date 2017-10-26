var FacetsView = Backbone.View.extend({
    // tagName: "ul",
    // el: "#search-facets",
    template: CBB['templates']['facetsView'],
    events: {
      "click .instance": "addfac",
    },
    initialize: function(attrs) {
      this.options = attrs;
      this.collection.bind("reset", this.render, this);
      this.listenTo(appState,"change:facets",this.render)
      return this
    }
    ,addfac: function(e) {

      e.preventDefault()
      var bt = $(e.currentTarget).attr('data-type')
      var bs = $(e.currentTarget).attr('data-id')

      // var caf = appState.get("facets");

      var fa = bt+':"'+bs+'"';

      // if(_.contains(caf,fa)){
      //   var keep = _.uniq(_.partition(caf,function(f){return f==fa}))[1]
      //   // var keepe = _.uniq(keep[1])
      //   appState.set({facets:keep})
      //   // appState.set({facets:null})
      // } else {
      //   caf.push(fa)
      //   var cafu = _.uniq(caf)
      //   appState.set({facets:cafu})
      //   // appState.set({facets:null})
      // }
      // 
      // we say appstate, here data facet
      // AS does with it what it needs
      appState.facet(fa)
      // 
      // console.log("af now:",appState.get("facets"));
      // appBits.upf()
      // appRoute.up()
      return this;
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

$(this.el).html(this.template({type:this.options.type,facets:this.collection.toJSON()}));
      // $(this.el).html(this.template({facets:this.subset()}));

      return this
    }
  });
