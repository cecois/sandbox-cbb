var FacetsView = Backbone.View.extend({
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

    var tkey = bt
    console.log('tkey',tkey);
    // var fa = {[tkey]:bs}
    var fa = {'bit':bs}

    appQueryFacets.facet(fa)

    return this;
  }
  ,subset: function(){
    var which = $(this.el).attr("id").split("-")[2]
    var subset = this.collection.filter({type:which});
    return subset
  }
  ,render: function(){

    if(this.collection.length>0){
      $(this.el).html(this.template({type:this.options.type,facets:this.collection.toJSON()}));}

      return this
    }
  });
