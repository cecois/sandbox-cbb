var Route = Backbone.Router.extend({
    routes: {
        "(:slug)(/:page)(/:query)(/:panestate)(/:activecouple)(/:basemap)(/:bbox)(/)": "default"
    },
    initialize: function(options) {
        options || (options={});
        this.listenTo(map,'moveend',this.upm)
        this.listenTo(appBaseLayers,'change:active',this.up)
        this.listenTo(appState,'change',this.up)
        this.listenTo(appQuery,'change:raw',this.up)
        return this
    },
    upm: function(){


        return this
    }
    // ,up: function(){
    //     return this
    //     .navigate(this.url(),{trigger:true,replace:false})
    // }
    ,url:function(){

        vz=[]
        var uslug=_.findWhere(appState.get("slugs"),{active:'is-active'}).slug
        ,upage=(typeof appQuery.get("page")=='undefined')?1:appQuery.get("page")
        ,uquer=(typeof appQuery.querystring() == 'undefined')?'nil':appQuery.querystring()
        ,ublay=appBaseLayers.findWhere({active:true}).get("name")
        ,udown=(typeof appState.get("downout") == 'undefined')?'nil':appState.get("downout")
        ,uacti=(typeof appState.get("active") == 'undefined')?'nil':appState.get("active")
        ,ubbox=map.getBounds().toBBoxString()


        vz.push(uslug)
        vz.push(upage)
        vz.push(uquer)
        vz.push(ublay)
        vz.push(udown)
        vz.push(uacti)
        vz.push(ubbox)

        var url = "#"+vz.join("/")

        return url
    }
    ,default: function(s,p,q,b,d,a,x) {


        console.log("q in routes.default",q);
        console.log("CONFIG.default_query in routes.default",CONFIG.default_query);

        var slug = (typeof s == 'undefined' || s==null)?_.findWhere(appState.get("slugs"),{active:'is-active'}).slug:s
        ,query = (typeof q == 'undefined' || q==null)?CONFIG.default_query:q
        ,page = (typeof p == 'undefined' || p==null)?1:p
        ,active = (typeof a == 'undefined' || a==null)?"nil":a
        ,downout = (typeof d == 'undefined' || d==null)?"out":d
        ,basemap = (typeof b == 'undefined' || b==null)?"pencil":b
        ,bbox = (typeof x == 'undefined' || x==null)?"-112.8515625,22.105998799750566,37.44140625,57.61010702068388":x
        ;

        if(x!==null && (typeof x!=='undfined')){
            map.fitBounds(UTIL.bounds_ob_from_bbox_string(x))
        }

        if(appBaseLayers.findWhere({active:true}).get("name")!==b && b!==null){appBaseLayers.switch(b)}

            appQuery.set({
                raw:query
                ,page:page
            })


        var newslugs = _.filter(_.map(appState.get("slugs"),function(s){


            if(typeof s !== 'undefined'){
                var active = (s.slug == slug)?'is-active':null;
                return {name:s.name,slug:s.slug,active:active}
        }//if.undefined

    })
        ,function(s){return (typeof s) !== 'undefined'})//filter;
//newslugs

appState.set({
    downout:downout
    ,active:active
            // ,slug:slug
            ,slugs:newslugs
        })


return this
        } // default
    });
var appRoute = new Route();
Backbone.history.start();
