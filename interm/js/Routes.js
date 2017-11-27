var Route = Backbone.Router.extend({
    routes: {
        "(:slug)(/:page)(/:query)(/:panestate)(/:activecouple)(/:basemap)(/:bbox)(/:facets)(/)": "default"
    },
    initialize: function(options) {
        options || (options={});
        this.listenTo(appBaseLayers,'change:active',this.up)
        this.listenTo(appSlugs,'reset',this.up)
        this.listenTo(appQueryFacets,'add remove',this.up)
        this.listenTo(appQuery,'change:raw',this.up)
        return this
    },
    ups: function(){

        return this
    }
    ,up: function(){


        return this
        .navigate(this.url(),{trigger:true,replace:false})
    }
    ,url:function(){

        vz=[]

        var bnds = _.map(map.getBounds().toBBoxString().split(","),function(co){
            return Math.round(co).toFixed(1)
        })


        var uslug=appSlugs.active().get("slug")
        ,upage=(typeof appQuery.get("page")=='undefined')?1:appQuery.get("page")
        ,uquer=(typeof appQuery.get("raw") == 'undefined')?'nil':appQuery.get("raw")
        ,ublay=appBaseLayers.findWhere({active:true}).get("name")
        ,udown=(typeof appState.get("downout") == 'undefined')?'out':appState.get("downout")
        ,uacti=(typeof appState.get("active") == 'undefined')?'nil':appState.get("active")
        ,ubbox = _.map(map.getBounds().toBBoxString().split(","),function(c){
            return Number(Math.round(c+'e5')+'e-5');
        })
        ,ufac = _.map(appQueryFacets.models,function(f){return encodeURI(JSON.stringify(f));}).join("::")
        ;

        vz.push(uslug)
        vz.push(upage)
        vz.push(uquer)
        vz.push(ublay)
        vz.push(udown)
        vz.push(uacti)
        vz.push(ubbox)
        vz.push(ufac)

        var url = "#"+vz.join("/")

        return url
    }
    ,default: function(s,p,q,b,d,a,x,f) {


        var slug = (typeof s == 'undefined' || s==null)?appSlugs.active().get("slug"):s
        ,page = (typeof p == 'undefined' || p==null)?1:p
        ,query = (typeof q == 'undefined' || q==null)?CONFIG.default_query:q
        ,basemap = (typeof b == 'undefined' || b==null)?"pencil":b
        ,downout = (typeof d == 'undefined' || d==null)?"out":d
        ,active = (typeof a == 'undefined' || a==null)?"nil":a
        ,bbox = (typeof x == 'undefined' || x==null)?"-112.851,22.105998,37.4414,57.610107":x
        ;

        if(typeof f !== 'undefined' && f!==null){
// presume we having incoming stringified JSON facet objects, e.g. {bit:"Oh Boy"}
// first we split em...
_.each(f.split("::"),function(f){
    // parse em back as obj

    var J = $.parseJSON(decodeURI(f))
    // if the're already in appQueryFacets (e.g. they were just added and the route is updating) we do nothing
    // if they're not (e.g. we're coming in hot w a url that contains em); we add em
    if(typeof appQueryFacets.findWhere(J) == 'undefined'){
        console.log("adding...");
        appQueryFacets.add(J);
    }
})

        }//if.f

        if(x!==null && (typeof x!=='undfined')){
            map.fitBounds(UTIL.bounds_ob_from_bbox_string(x))
        }

        if(appBaseLayers.findWhere({active:true}).get("name")!==b && b!==null){appBaseLayers.switch(b)}

            appQuery.set({
                raw:query
                ,page:page
            })


        appSlugs.switch(slug)


        appState.set({
            downout:downout
            ,active:active

        })

        return this
        } // default
    });
var appRoute = new Route();
Backbone.history.start();
