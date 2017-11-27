var BaseMapView = Backbone.View.extend({
    id: "map",
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        return this.wireup()
    },
    debug: function() {
        console.log("debug bmv 338:");
        console.log(this.model);
        return this
    },
    render: function() {
        var mapBounds = this.model.getBounds();
        return this
    },
    zoomCheck: function() {
        var def = this.model.get("definition");
        if (typeof def.minZoom != "undefined") {
            map.setZoom(def.minZoom)
        }
    },
    updateBaseMap: function() {
        var def = this.model.get("definition");
        // remove global layer here first so we don't keep stacking baselayers
        // (we only need one baselayer at a time, of course)
        if (typeof baseLayer == 'undefined') {
            baseLayer = null;
        } else {
            map.removeLayer(baseLayer);
        }
        // a little special handling for stamen maps
        if (this.model.get("source") == "stamen") {
            baseLayer = new L.StamenTileLayer(def.id);
            appConsole.set({
                message: "FYI, some of the Stamen layers have zoom restrictions."
            })
        } else if (def.subdomains != undefined) {
            baseLayer = new L.TileLayer(def.url, {
                subdomains: def.subdomains,
                maxZoom: 18
            });
        } else {
            baseLayer = new L.TileLayer(def.url, {
                maxZoom: 18
            });
        }
        map.addLayer(baseLayer);
        baseLayer.bringToBack();
        return this
    }
});