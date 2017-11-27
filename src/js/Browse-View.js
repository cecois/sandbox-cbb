var BrowseView = Backbone.View.extend({
  template: CBB['templates']['browseView'],
  events: {
    "click .cbb-trigger": "trigger",
  },
  initialize: function() {
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

    $(this.el).html(this.template({rows:this.collection.toJSON()}));

    appActivityView.stfu();
    return this
  }
});
