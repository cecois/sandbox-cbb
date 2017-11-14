var BitsView = Backbone.View.extend({
    // tagName: "ul",
    el: "#search-bits",
    template: CBB['templates']['bitsView'],
    events: {
      "click i.fa-map-marker": "zoomto",
    },
    // className : "mnuThumbnails",
    initialize: function() {
      // this.listenTo(this.collection,"change","render")
      this.collection.bind("sync", this.render, this);
      return this
      .proxyfetch()
    }
    ,zoomto: function(e){

      e.preventDefault()
      var keys = $(e.currentTarget).attr("data-id")
      var key=keys.split(":")

      console.log(keys)

      var a = _.find(BitGroup.getLayers(),function(l){return (l.options.location_id==key[1] && l.options.location_type.indexOf(key[0])>=0)});

      console.log('found a:',a);
      map.fitBounds(a.getBounds());

      return this
    }
    ,proxyfetch: function(){

      this.collection.fetch()
      return this
    }
    ,render: function(){


        // $(this.el).html(this.template({
        //     baselayers: this.collection.toJSON()
        // }
        // ));
        // $(this.el).html("render of bitsview")
        // this.collection.forEach(function(m){
        //   console.log("rendering ",m)
        //   // var bitv = new BitView({model:m})

        //   // $(this.el).append(bitv.render().el)
        //   //
        //   $(this.el).html.append('<div>divvvv</div>')
        // })
// $("#cbb-pane-menu > li[data-id='search'] a span").attr('data-badge',this.collection.length)
if(this.collection.length<1){

  $(this.el).html(
    "no bits for "+appQuery.get("raw")+appQuery.query_facetadd()
    );
} else {
  $(this.el).html(this.template({rows:this.collection.toJSON()}));}
        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
      }
    });
