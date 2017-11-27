var BaseLayersMenuView = Backbone.View.extend({
    tagName: "ul",
    el: "#basemap-menu",
    template: CBB['templates']['baseLayerMnu'],
    events: {
    },
    initialize: function() {
        this.collection.bind('change:active', this.render, this);
        this.render()
    }
    ,render: function(){


        $(this.el).html(this.template({
            baselayers: this.collection.toJSON()
        }
        ));


        return this
    }
    ,renderOG: function() {
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
        $(".mnuThumbnail").tooltip()
        $("#BaseMapConsole").html($(".mnuThumbnail.true").attr("title"))
        this.$(".mnuThumbnail").hover(function() {
                $("#BaseMapConsole").addClass("temp")
                $("#BaseMapConsole").html(this.title)
            }, function() {
                $("#BaseMapConsole").removeClass("temp")
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