var SlugsViewPanes = Backbone.View.extend({
  el: $("#cbb-main-panes")
  ,events: {
    "click .cbb-trigger": "trigger",
    }
    ,initialize: function() {


      this.collection.bind("change", this.render, this);
      return this
      .render();
    }
    ,trigger: function(e){
      e.preventDefault()

      if($(e.currentTarget).attr("data-type")==""){
        var q = $(e.currentTarget).attr("data-target")
      } else {
        var q = $(e.currentTarget).attr("data-type")+':"'+$(e.currentTarget).attr("data-target")+'"'
      }

      console.log(q)
      appQuery.set({"raw":q})
      appSlugs.switch('search')

      return this


    }
    ,setp: function(e){

      e.preventDefault()

      appState.slugify($(e.currentTarget).attr("data-id"))

      return this
    }
    ,render: function(){

      var s = this.collection.active().get("slug")

        var tpl = null;
        tpl=CBB['templates']['0-'+s]

        $('.cbb-main-pane').each(function(){

          if($(this).hasClass("hidden")==false){
            $(this).addClass("hidden")
          }

        })
        var subel = $( ".cbb-main-pane[id='pane-"+s+"']" )

if(s!=='search' && s!=='browse'){
  $(subel).html(tpl(this.collection.toJSON()))
  }
  if($(subel).hasClass('hidden')){$(subel).removeClass('hidden')}


    return this
}
});
