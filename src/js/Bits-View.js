var BitsView = Backbone.View.extend({
    // tagName: "ul",
    el: "#search-bits",
    template: CBB['templates']['bitsView'],
    events: {
    },
    // className : "mnuThumbnails",
    initialize: function() {
    }
    ,render: function(){


        // $(this.el).html(this.template({
        //     baselayers: this.collection.toJSON()
        // }
        // ));

        this.collection.each(function(m){
            var bitv = new BitView({model:m})
            $(this.el).append(bitv.render())
        })

        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
    }
});