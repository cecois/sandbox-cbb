var SlugsViewPanes = Backbone.View.extend({
  el: $("#cbb-main-panes")
  ,events: {
      // "click i.fa-map-marker": "zoomto",
      "click .cbb-trigger": "trigger",
    }
    // ,template_home: CBB['templates']['0-home']
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

        // var s = _.findWhere(this.model.get("slugs"),{active:"is-active"}).slug
        var s = this.collection.active().get("slug")

        var tpl = null;
        tpl=CBB['templates']['0-'+s]

        $('.cbb-main-pane').each(function(){

          if($(this).hasClass("hidden")==false){
            $(this).addClass("hidden")
          }

        })
// $(this.el).find(".cbb-main-pane").
var subel = $( ".cbb-main-pane[id='pane-"+s+"']" )

if(s!=='search' && s!=='browse'){
    // $(subel).html("this yo subel-->"+s)
    $(subel).html(tpl(this.collection.toJSON()))
  }
  if($(subel).hasClass('hidden')){$(subel).removeClass('hidden')}


    return this
}
});
