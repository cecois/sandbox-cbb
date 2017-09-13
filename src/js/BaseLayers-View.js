var BaseLayersView = Backbone.View.extend({
    id: "map",
    initialize: function() {

        window.map = new L.Map('map',
        {
            zoomControl:true,
            center: [51.505, -0.09],
            zoom:7
            ,attributionControl:false
        });
        this.listenTo(this.collection,'change:active',this.render)
        return this
        .render()
    },
    render: function() {

        var am = this.collection.findWhere({active:true})
        ,def = (typeof am !=='undefined')?am.get("definition"):null;

        
        if(typeof baseLayer == 'undefined'){
            baseLayer=null;
        } else {
            map.removeLayer(baseLayer)
        }

        if(typeof am !== 'undefined' && am.get("source")=='stamen'){
            baseLayer = new L.StamenTileLayer(def.id);
        } else if (typeof def.subdomains !== 'undefined'){
            baseLayer = new L.TileLayer(def.url,{subdomains:def.subdomains,maxZoom:18})
        } else {
            baseLayer=new L.TileLayer(def.url,{maxZoom:18})
        }

        map.addLayer(baseLayer);
        baseLayer.bringToBack();

        return this
    }
});