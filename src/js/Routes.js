var Route = Backbone.Router.extend({
    routes: {
        "(:slug)(/:page)(/:query)(/:panestate)(/:activecouple)(/:basemap)(/:bbox)(/)": "default"
    },
    initialize: function(options) {
        options || (options={});
        this.listenTo(map,'moveend',this.up)
        this.listenTo(appBaseLayers,'change:active',this.up)
        return this
    },
    up: function(){
        console.log("upping to ",this.url());
        return this
        .navigate(this.url(),{trigger:true,replace:false})
    }
    ,url:function(){

        vz=[]
        var uslug=appState.get("slug")
        ,upage=(typeof appQuery.get("page")=='undefined')?1:appQuery.get("page")
        ,uquer=(typeof appQuery.get("querystring") == 'undefined')?'nil':appQuery.get("querystring")
        ,ublay=appBaseLayers.findWhere({active:true}).get("name")
        ,udown=(typeof appState.get("downout") == 'undefined')?'nil':appState.get("downout")
        ,uacti=(typeof appState.get("active") == 'undefined')?'nil':appState.get("active")
        ,ubbox=map.getBounds().toBBoxString()

        console.log("in url, uslug",uslug)
        console.log("in url, upage",upage)
        console.log("in url, uquer",uquer)
        console.log("in url, ublay",ublay)
        console.log("in url, udown",udown)
        console.log("in url, uacti",uacti)
        console.log("in url, ubbox",ubbox)

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

        var slug = (typeof s == 'undefined' || s==null)?"home":s
        ,query = (typeof q == 'undefined' || q==null)?"*:*":q
        ,page = (typeof p == 'undefined' || p==null)?1:p
        ,active = (typeof a == 'undefined' || a==null)?"nil":a
        ,downout = (typeof d == 'undefined' || d==null)?"down":d
        ,basemap = (typeof b == 'undefined' || b==null)?"pencil":b
        ,bbox = (typeof x == 'undefined' || x==null)?"-112.8515625,22.105998799750566,37.44140625,57.61010702068388":x
        ;

        if(x!==null && (typeof x!=='undfined')){
            console.log("fitting incoming bounds, x",x);
            map.fitBounds(UTIL.bounds_ob_from_bbox_string(x))
        }

        if(appBaseLayers.findWhere({active:true}).get("name")!==b && b!==null){appBaseLayers.switch(b)}

            appQuery.set({
                querystring:query
                ,page:page
            })

        appState.set({
            downout:downout
            ,active:active
            ,slug:slug
        })


        return this
        } // default
    });
var appRoute = new Route();
Backbone.history.start();