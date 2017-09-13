var BaseLayersMenuItemView = Backbone.View.extend({
    tagName: "li",
    className: "pull-left",
    template: CBB['templates']['baseLayerMnuItem'],
    events: {
        "click .mnuThumbnail": "setActive",
        // "click a":"killtt",
        // "click a":"rewire"
    },
    initialize: function() {
        // this.model.bind("change", this.render, this);
    },
    debug: function() {
        // console.log(this);
        return this
    },
    killtt: function() {
        // we need to be sure we kill any active tooltips
        $(this.el).find(".mnuThumbnail").tooltip('destroy');
    },
    setActive: function(e) {
        e.preventDefault()
            // first a little sugar
            // $("#BaseMapConsole").css("color","white").animate(1500)
            if (this.model.get("active") == true) {
            // it's already active, do nothing
            return this
        } else {
            // voodoo? let's verify this works
            _.invoke(appBaseLayers.models, function() {
                this.set({
                    active: false
                }, {
                    silent: true
                })
            });
            this.model.set({
                active: true
            })
            // appConsole.set({
            //     message: "basemap switched to " + this.model.get("nom")
            // })
            return this
        }
        // return this
    },
    setBaseMap: function() {
        // the clicked one becomes active
        // (noting that the collx will post-process this to deactivate the others)
        this.model.set({
            "active": true
        });
        var newBLayer = this.model;
        appBaseMap.set(newBLayer);
    },
    render: function() {
        // this.killtt();
        $(this.el).html(this.template(this.model.toJSON()));
        return this.rewire()
    },
    rewire: function() {
        $(this.el).find(".mnuThumbnail").tooltip('destroy');
        $(this.el).find(".mnuThumbnail").tooltip({
        // this.$(".mnuThumbnail").tooltip({
            container: "body",
            placement: 'right',
            trigger: 'hover'
        });
        // this.$(".tooltip").css("top","-140px");
        // this.$(" > .tooltip").css("top","-140px")
        return this
    }
});