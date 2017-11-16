var BrowseView = Backbone.View.extend({
    // tagName: "ul",
    // el: "#pane-browse",
    template: CBB['templates']['browseView'],
    events: {
      // "click i.fa-map-marker": "zoomto",
      "click .cbb-trigger": "trigger",
    },
    // className : "mnuThumbnails",
    initialize: function() {
      // this.listenTo(this.collection,"change","render")
      this.collection.bind("reset", this.render, this);
      return this
      .proxyfetch()
    }
    ,trigger: function(e){
      e.preventDefault()
      var q = $(e.currentTarget).attr("data-type")+':"'+$(e.currentTarget).attr("data-target")+'"'


      appQuery.set({"raw":q})

      return this


    }
    ,proxyfetch: function(){

      this.collection.fetch()
      return this
    }
    ,render: function(){

      appActivity.set({message:"rendering aggregations for browse..."})

  // var ubits = _.map(this.collection.all_bits.bits.filtered_bits.buckets,function(v,k){

  //   var b = {unique:v.key}


  //     // return {type:'bits',facet:v.key,count:v.doc_count,active:active}

  //   })//.Map

  // _.each(this.collection.models,function(m){
  //   console.log('model',m)
  // })
  // var B = this.collection.models.where({type: "bit"});
  // var B = this.collection.where({type: "bit"});
  // var E = this.collection.where({type: "episode"});

  // console.log('B.length',B.length)
  // console.log('B',B)
  // console.log('E',E)

  // $(this.el).find('#browse-bits').html(this.template({beez:JSON.stringify(B)}))
  // $(this.el).find('#browse-bits').html(this.template({uniqx:B}))
  // $(this.el).html(this.template(this.collection.length))

// if(this.collection.length<1){

//   $(this.el).html(
//     "no bits for "+appQuery.get("raw")+appQuery.query_facetadd()
//     );
// } else {
  $(this.el).html(this.template({rows:this.collection.toJSON()}));

  appActivityView.stfu();
  return this
}
});
