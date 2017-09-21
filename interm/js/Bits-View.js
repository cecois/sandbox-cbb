var BitsView = Backbone.View.extend({
    // tagName: "ul",
    el: "#search-bits",
    template: CBB['templates']['bitsView'],
    events: {
    },
    // className : "mnuThumbnails",
    initialize: function() {
      this.listenTo(this,"sync","render")
      return this
    }
  //   ,render: function() {
  //   var element = $(this.el);
  //   // Clear potential old entries first
  //   element.empty();

  //   // Go through the collection items
  //   this.collection.forEach(function(item) {

  //     // Instantiate a PeopleItem view for each
  //     var bitv = new BitView({
  //       model: item
  //     });

  //     // Render the PeopleView, and append its element
  //     // to the table
  //     element.append(bitv.render().el);
  //   });

  //   return this;
  // }
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

        $(this.el).html(this.template({rows:this.collection.models}));
        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
      }
    });