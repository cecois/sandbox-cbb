var BaseLayersMenuView = Backbone.View.extend({
    tagName: "ul",
    el: "#basemap-menu",
    template: CBB['templates']['baseLayerMnu'],
    events: {
        // "click .mnuThumbnail":"process",
        // "click a":"killtt",
        // "click a":"rewire"
        // "change": "render"
    },
    // className : "mnuThumbnails",
    initialize: function() {
        this.collection.bind('change:active', this.render, this);
        this.render()
    }
    ,render: function(){


        $(this.el).html(this.template({
            baselayers: this.collection.toJSON()
        }
        ));

        // $(this.el).html(this.template({baselayers:this.collection.models}));
        // $(this.el).html("loolaknlkan");

        return this
    }
    ,renderOG: function() {
        // console.log("in render of BLsMV");
        $(this.el).empty();
        this.collection.each(function(baselayer) {
            var baseLayersMenuItemView = new BaseLayersMenuItemView({
                model: baselayer
            });
            $(this.el).append(baseLayersMenuItemView.render().el);
        }, this);
        return this.rewire()
    },
    rewire: function() {
        // $("#BaseMapConsole").html(this.model.get("nom"))
        // #returnto -- use underscore to pull this from the collx
        // $("#mnuBaseMap").attr("title",this.title)
        // $("#mnuBaseMap").tooltip()
        $(".mnuThumbnail").tooltip()
        $("#BaseMapConsole").html($(".mnuThumbnail.true").attr("title"))
            //
            this.$(".mnuThumbnail").hover(function() {
                $("#BaseMapConsole").addClass("temp")
                $("#BaseMapConsole").html(this.title)
            }, function() {
                /* Stuff to do when the mouse leaves the element */
            // $("#BaseMapConsole").html(og)
            $("#BaseMapConsole").removeClass("temp")
                // $("#BaseMapConsole").html(_.findWhere(this.collection,model.get("active")==true));
                $("#BaseMapConsole").html($(".mnuThumbnail.true").attr("title"));
            }, this);
            return this
        },
        process: function(amodel) {
            //A model was toggled (on or off)
            if (amodel.get('active') == true) {
                //A model was toggled ON, so check if a different model is already selected
                var nonActive = this.collection.find(function(model) {
                    return amodel !== model && model.get('active');
                });
                if (nonActive != null) {
                    //Another model was selected, so toggle it to off
                    nonActive.set({
                        'active': false
                    });
                }
            }
        } //process
    });