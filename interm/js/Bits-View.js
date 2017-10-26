var BitsView = Backbone.View.extend({
    // tagName: "ul",
    el: "#search-bits",
    template: CBB['templates']['bitsView'],
    events: {
      // "click .instance": "addfac",
    },
    // className : "mnuThumbnails",
    initialize: function() {
      // this.listenTo(this.collection,"change","render")
      this.collection.bind("sync", this.render, this);
      return this
      .proxyfetch()
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
    "no bits for "+appQuery.querystring()
    );
} else {
  $(this.el).html(this.template({rows:this.collection.toJSON()}));}
        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
      }
    });
