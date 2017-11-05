var Route = Backbone.Router.extend({
    routes: {
        "(:slug)(/:page)(/:query)(/:panestate)(/:activecouple)(/:basemap)(/:bbox)(/:facets)(/)": "default"
    },
    initialize: function(options) {
        options || (options={});
        this.listenTo(map,'moveend',this.up)
        this.listenTo(appBaseLayers,'change:active',this.up)
        this.listenTo(appSlugs,'reset',this.up)
        // this.listenTo(appState,'change:slugs',this.up)
        // this.listenTo(appQuery,'change:raw',this.up)
        // this.listenTo(appState,'change:facets',this.up)
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
        ,udown=(typeof appState.get("downout") == 'undefined')?'nil':appState.get("downout")
        ,uacti=(typeof appState.get("active") == 'undefined')?'nil':appState.get("active")
        ,ubbox = _.map(map.getBounds().toBBoxString().split(","),function(c){
            return Number(Math.round(c+'e5')+'e-5');
            // return Number(Math.round(c).toFixed(4));
        })
        // ,ufac = _.map(appState.get("facets").split(","),function(f){return encodeURI(f);}).join(",")
        // ,ufac=null
        ,ufac = _.map(appQueryFacets.models,function(f){return encodeURI(JSON.stringify(f));}).join(",")
        ;
        // ,ubbox=map.getBounds().toBBoxString()
        // ,ubbox=bndsjor
        
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
        ,query = (typeof q == 'undefined' || q==null)?CONFIG.default_query:q
        ,page = (typeof p == 'undefined' || p==null)?1:p
        ,active = (typeof a == 'undefined' || a==null)?"nil":a
        ,downout = (typeof d == 'undefined' || d==null)?"out":d
        ,basemap = (typeof b == 'undefined' || b==null)?"pencil":b
        ,bbox = (typeof x == 'undefined' || x==null)?"-112.851,22.105998,37.4414,57.610107":x
        ,facets = (typeof f == 'undefined' || f==null)?null:_.map(f.split(","),function(f){ return decodeURI(JSON.parse(f));}).join(",")
        ;

        if(x!==null && (typeof x!=='undfined')){
            map.fitBounds(UTIL.bounds_ob_from_bbox_string(x))
        }

        if(appBaseLayers.findWhere({active:true}).get("name")!==b && b!==null){appBaseLayers.switch(b)}

            appQuery.set({
                raw:query
                ,page:page
            })


    //     var newslugs = _.filter(_.map(appState.get("slugs"),function(s){


    //         if(typeof s !== 'undefined'){
    //             var active = (s.slug == slug)?'is-active':null;
    //             return {name:s.name,slug:s.slug,active:active}
    //     }//if.undefined

    // })
    //     ,function(s){return (typeof s) !== 'undefined'})//filter;
//newslugs

appSlugs.switch(slug)
if(facets!==null){appQueryFacets.reset(facets)}
appState.set({
    downout:downout
    ,active:active
            // ,slug:slug
            // ,facets:facets
            // ,slugs:newslugs
        })


return this
        } // default
    });
var appRoute = new Route();
Backbone.history.start();
