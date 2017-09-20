/* -------------------------------------------------- GLOBALS -----------------------  */
var CONFIG = {
	verbose:true
    ,dev:true
    ,mode:"T"
    ,proxy:null
    ,query:"*:*"
    ,basemap:"pencil"
    ,index_root:"http://solr-lbones.rhcloud.com/cbb_bits/select?json.wrf=cwmccallback&wt=json&q="
}

window.map = new L.Map('map',
{
    zoomControl:true,
    center: [51.505, -0.09],
    zoom:7
    ,attributionControl:false
}).on('moveend',function(e){
    // hey not great but Route's .listenTo method wz causing a deep undefined in leafletjs
    if(typeof appRoute !== 'undefined'){
        appRoute.up()
    }
})

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     window.agent = "mobile";
// } else {
//     window.agent = "desktop";
// }

// window.thedomain="bitmap-lbones.rhcloud.com"

NProgress.configure({
    parent: '#cbb-main'
});

/* -------------------------------------------------- HANDLEBARS START 
Handlebars.registerHelper('debug', function(options) {

    return new Handlebars.SafeString("check console");
});

Handlebars.registerHelper('timeize', function(options) {
    return new Handlebars.SafeString(moment(options.fn(this)).format('YYYY.MMM.D'));
});

Handlebars.registerHelper('indev', function(id,type, options) {
    if(dev == true){

        cid=doctorId(type,id)

        return '<span data-id="'+cid+'" class="glyphicon glyphicon-asterisk bt-getid" title="echo model id (dev only)"></span>'} else{return '';}
    });

Handlebars.registerHelper('urler', function(str,options) {

});
-----------------------  */

/* -------------------------------------------------- HANDLEBARS END -----------------------  */
// jeez i hate to bootstrap this w/ an extra ajax call but i don't wanna have to remember to update this when i change the solr schema
// $.getJSON(solrhost+'/cbb_bits/admin/luke?numTerms=0', {wt: 'json'}, function(json, textStatus) {
//   console.log("fields call:");console.log(json);
// });
markernew = {
    radius: 6,
    fillColor: "rgba(126, 223, 216, 100)",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6,
};
markeractive = {
    radius: 18,
    fillColor: "#fecd0b",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6,
};
markerseen = {
    radius: 6,
    fillColor: "#ffffff",
    color: "#1288b9",
    weight: 1,
    opacity: .6,
    fillOpacity: 0.3,
};
linenew = {
    fillColor: "rgba(126, 223, 216, 100)",
    color: "rgba(126, 223, 216, 100)",
    weight: 6,
    opacity: .8,
};
lineactive = {
    fillColor: "#fecd0b",
    color: "#fecd0b",
    weight: 8,
    opacity: 1,
};
lineseen = {
    fillColor: "#ffffff",
    color: "#ffffff",
    weight: 6,
    opacity: .6,
};
//

// window.appURL = new URL();
/*
var appEpisodes = new Episodes();
var appEpisodesView = new EpisodesView({
    collection: appEpisodes
});
*/

/* -------------------------------------------------- BASEMAPS -----------------------  */
var baselayersdummified = {
    "layers": [{
        "name": "dummy",
        "active": true,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "/images/bm-dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "/images/bm-dummy-thumb.png",
            "noWrap": true
        }
    },{
        "name": "dummy",
        "active": false,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "/images/bm-dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "/images/bm-dummy-thumb.png",
            "noWrap": true
        }
    }]
}
var baselayersdesk = {
    "layers": [{
        "name": "super_mario",
        "active": false,
        "source": "mapbox",
        "nom": "Duncan Graham's Super Mario",
        "thumb": "/images/bm-mapbox-mario.png",
        "mapis": "light",
        "definition": {
            "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "https://{s}.tiles.mapbox.com/v4/duncangraham.552f58b0/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ",
            "noWrap": true
        }
    }, {
        "name": "lichtenstein",
        "active": false,
        "source": "mapbox",
        "nom": "Katie Kowalsky's Pop Art (Inspored by Roy lichtenstein)",
        "thumb": "/images/bm-mapbox-popart.png",
        "mapis": "dark",
        "definition": {
            "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "https://{s}.tiles.mapbox.com/v4/katiekowalsky.236692c1/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1Ijoia2F0aWVrb3dhbHNreSIsImEiOiJHR2hfdlBNIn0.GUMLsSnT-SYx4ew7b77kqw",
            "noWrap": true
        }
    },
    {
        "name": "pencil",
        "active": true,
        "source": "mapbox",
        "nom": "Aj Ashton's Pencil Map",
        "thumb": "/images/bm-mapbox-pencil.png",
        "mapis": "dark",
        "definition": {
            "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A",
            "noWrap": true
        }
    }
    , {
        "name": "opencycle_landscape",
        "active": false,
        "source": "opencycle",
        "nom": "OpenCycle Landscape",
        "thumb": "/images/bm-opencycleland.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "subdomains": ["a", "b", "c"],
            "noWrap": true,
            "url": "http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png"
        }
    }
    ]
}

var baselayersmobile = {
    "layers": [{
        "name": "pencil",
        "active": true,
        "source": "mapbox",
        "nom": "Aj Ashton's Pencil Map",
        "thumb": "/images/bm-mapbox-pencil.png",
        "mapis": "dark",
        "definition": {
            "subdomains": ["a", "b", "c"],
            "maxZoom": 18,
            "url": "https://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWoiLCJhIjoiY2lrZW1pczJzMDA1d3VybTJha216azVtdSJ9.vJBkGAq6CvN9vt0IwakQ-A",
            "noWrap": true
        }
    }, {
        "name": "dummy",
        "active": false,
        "source": "localhost",
        "nom": "A Real Dummy",
        "thumb": "/images/bm-dummy-thumb.png",
        "mapis": "dark",
        "definition": {
            "maxZoom": 18,
            "url": "/images/bm-dummy-thumb.png",
            "noWrap": true
        }
    }
    ]
}



// var appCartoQuery = new CartoQuery();
// var appCartoQueryView = new QueryView({
//     model: appCartoQuery
// });
// 
// 
var appQuery = new Query();
var appQueryView = new QueryView({
    model: appQuery
});

var appBits = new Bits();


// var appConsole = new Console().set({
//     message: "Console. Quasi-important messages will appear here."
// });
// var appConsoleView = new ConsoleView({
//     model: appConsole
// });

// var appQuerySubNav = new QuerySubNav();
// var appQuerySubNavView = new QuerySubNavView({
//     model: appQuerySubNav
// });


var states = [{
    "name": "main",
    "posish": "open",
    "visible":true
}, {
    "name": "episodes",
    "posish": "open",
    "visible":true
}, {
    "name": "banner-bang",
    "posish": "open",
    "visible":true
}

]

var shares = [

{"id":"social-twitter",
"href":"https://twitter.com/share",
"page.title":null,
"page.url":null,
"tip":"share on Twitter",
"hashtags":null,
"copy":null
}
]

var UTIL = new Util();

// new activity model and view
var appActivity = new Activity({message:"loading..."});
var appActivityView = new ActivityView({
    model: appActivity
});

/*var appState = new State(
  states
    );
    */
    var appState = new State();
    var appStateViewDownMenu = new StateViewDownMenu({
        model: appState
    });
    var appStateViewPanes = new StateViewPanes({
        model: appState
    });
    var appStateViewPanesMenu = new StateViewPanesMenu({
        model: appState
    });

    // if(CONFIG.dev==true){
    //     baselayers=baselayersdummified
    // } else {

    //     if(agent=='mobile'){
    //     }else{baselayers=baselayersdesk}}

    baselayers=baselayersdummified
    var appBaseLayers = new BaseLayersCollection(baselayers.layers);
    var appBaseLayersMenuView = new BaseLayersMenuView({
        collection: appBaseLayers
    });

    var appBaseMapView = new BaseLayersView({
        collection: appBaseLayers
    });

// var appShares = new Shares(
//     shares
//     );
// var appSharesView = new SharesView({
//     collection: appShares
// });

/* -------------------------------------------------- INITS -----------------------  */

// var appBits = new BitCollection();
// var appCBB = new CartoCollection();
// var appRecents = new RecentsCollection();


// var appCBBListView = new CartoListView({
//     collection: appCBB
// })
// var appBitsView = new BitsView({
//     collection: appBits
// })
// var appBitsCountView = new BitsCountView({
//     collection: appBits
// })
// var appBitsRecentsView = new RecentsView({
//     collection: appRecents
// })
// var appCBBMapView = new CartoCollxView({
//     collection: appCBB
// })
// var appCBBCountView = new CartoCollxCountView({
//     collection: appCBB
// })

// window.appFats = new MetaFacets();
// window.appFatTags = new FacetsTags();
// window.appFatSlugs = new FacetsSlugs();
// window.appFatNames = new FacetsNames();
// window.aFTV = new FacetsView({collection:appFatTags,el:$("#facet-tags")})
// aFTV.group="Tags"
// window.aFNV = new FacetsView({collection:appFatNames,el:$("#facet-names")})
// aFNV.group="Bits"
// window.aFSV = new FacetsView({collection:appFatSlugs,el:$("#facet-slugs")})
// aFSV.group="Episodes"

// var huh = new Huh();
// var huhV = new HuhView({
//     model: huh
// })

// var ups = new Update();
// var upsV = new UpdateView({
//     model: ups
// })

// var help = new Help();
// var helpV = new HelpView({
//     model: help
// })

// var method = new Method();
// var methodV = new MethodView({
//     model: method
// })


/* -------------------------------------------------- Free Funcs 
function locTrigger(e, goto, active) {
    if(verbose==true){
        console.log("loctriggered!")
        console.log("e:");
        console.log(e)
        console.log("goto:");
        console.log(goto)
        console.log("active:");
        console.log(active)
    }

    if(typeof e !== 'undefined' && e !== null){
        e.preventDefault()}

        if (typeof goto == 'undefined') {
            var goto = true
        }

        if(typeof active !== 'undefined'){
            if(active.indexOf("point:")>=0 || active.indexOf("poly:")>=0 || active.indexOf("line:")>=0){
                var loctype = active.split(":")[0]
                var locid = doctorId(loctype,active.split(":")[1]);
                activeFactory(active)
                qstring = "location_type:"+loctype+" AND location_id:"+locid
            } else {
                qstring = $(e.currentTarget).attr("data-string")
            }
            appCartoQuery.set({rawstring:qstring})
        }
    }

    function activeFactory(a){

        if(typeof a == 'undefined' || a == null){

            if(typeof activecouple !== 'undefined' && activecouple !== null){
                var activeid = activecouple.split(":")[1]
                var activetype = activecouple.split(":")[0]

                return [activetype,activeid]}
                else {
                    return null
                }
            } else {
                activecouple=a
                return a
            }

        }

        function urlFactory(goto,qs) {
            if (typeof goto == 'undefined') {
                var hel = $(".mainpanel:not('.hidden')")
                var h = '#' + $(hel).attr("id")
                if (h == "#undefined") {
                    h = "#huh"
                }
            } else {
                var h = goto;
            }
            var bbx = map.getBounds().toBBoxString();

            var qs = appCartoQuery.get("urlstring")
            var bl = appBaseLayers.findWhere({
                active: true
            }).get("name")
            var fa = appCartoQuery.get("facetarray").join(",");

            var url = h + "/" + qs + "/" + bbx + "/" + bl 

            if(typeof activecouple !== 'undefined' && activecouple !== null){
                var ac = activeFactory();

                url+="/"+ac.join(":")

            }

            return url
        }

        function captureState(){

            // eh not great - we just troll the gui for the mainpanel that's currently showing - hope it's right!
            var hel = $(".mainpanel:not('.hidden')")
            var h = '#' + $(hel).attr("id")
            var bbx = map.getBounds().toBBoxString();
            var qs = encodeURIComponent(appCartoQuery.get("urlstring"))
            var bl = appBaseLayers.findWhere({
                active: true
            }).get("name")

            var fa = encodeURIComponent(appCartoQuery.get("facetarray").join(","));


            if(typeof activecouple !== 'undefined' && activecouple !== null){
                var ac = activeFactory();

                acv=ac.join(":")

            } else {
                acv="noactive"
            }
            var url = "http://" + thedomain+ "/"+ h + "/" + qs + "/" + bbx + "/" + bl +"/"+acv+"/"+fa

            return url

        }

        function processLeaf(mid, pop, geom, zoomto) {

            if(typeof pop == 'undefined'){
                var pop = true
            }
            if (geom == "point") {
            // points get their own style
            var activeStyle = markeractive
        } else {
            var activeStyle = lineactive
        }
        _.each(cbbItems._layers, function(i) {

            if (i.options.seen == true) {
                // feature clicks set them as seen - if they're set here, they're stale and we restyle them
                if (typeof i._point == 'undefined') {
                    // not a point, so
                    i.setStyle(lineseen)
                } else {
                    i.setStyle(markerseen)
                }
            }
            if (i.options.cartodb_id.toString() == mid) {
                i.setStyle(activeStyle)
                i.options.seen = true;

                if (pop == true) {
                    i.openPopup()
                }

                if(zoomto==true){
                    map.fitBounds(i.getBounds())
                }

            }
        }) //each
    }
    -----------------------  FREEFUNCS */

    /* -------------------------------------------------- RUN! -----------------------  */
    // cbbItems = L.geoJson().addTo(map);
    // window.appWikiaz = new Wikiaz()
    // appWikiaz.fetch();
    // appRecents.fetch({reset:true});

    var fields = {
        "fields": [{
            "order": 1,
            "name": "anno",
            "nom": "short annotation of the location -- e.g. 'one of Huell Howser's homes'",
            "scope_and_use": "use it freely, e.g. <span class='copy-trigger' data-string='anno:huell'><span class='loc-string'>anno:huell</span><i class='glyphicon glyphicon-map-marker cbb-trigger-inline'></i></span> or <span class='copy-trigger' data-string='anno:cake+boss'><span class='loc-string'>anno:cake+boss</span><i class='glyphicon glyphicon-map-marker cbb-trigger-inline'></i></span>"
        }, {
            "order": 5,
            "name": "cartodb_id",
            "nom": "unique id per site",
            "scope_and_use": "use it to link to a specific instance, e.g. <span class='copy-trigger' data-string='cartodb_id:108'><span class='loc-string'>cartodb_id:108</span><i class='glyphicon glyphicon-map-marker cbb-trigger-inline'></i></span> - ~site of Bob Ducca's booth at the Silver Lake Farmers Market"
        }, {
            "order": 3,
            "name": "created_at",
            "nom": "date the location was logged (has nothing to do with its appearance on the show)",
            "scope_and_use": "I'm not sure anybody could possibly care. But I guess you could do Solr range queries with it."
        }, {
            "order": 0,
            "name": "name",
            "nom": "name of the site (e.g. 'Six Flags Valencia' or 'Boston, MA'",
            "scope_and_use": "this and anno are the primary fields and this is the one with the placename"
        }, {
            "order": 2,
            "name": "text",
            "nom": "catch-all field",
            "scope_and_use": "searching this field queries both anno and name fields (and eventually any other text we wanna throw in). If you don't type a specific field (e.g. you just type 'Dimello') this is the field that gets called."
        }, {
            "order": 4,
            "name": "updated_at",
            "nom": "date of the last update to this record",
            "scope_and_use": "Eh. You can <a href='#recent'>query for updates</a> with it I suppose."
        }]
    }
    // window.appSoFoz = new SolrFieldz(fields.fields);
    // window.appSoFozView = new SolrFieldzView({
    //     collection: appSoFoz
    // });

    /* -------------------------------------------------- READY -----------------------  */
    $(document).ready(function() {

    //     $("#bt-solrfields").click(function(e) {
    //         e.preventDefault()
    //         $("#solrfields-list").toggleClass('hidden')
    // }) //solrfields.click

    // L.control.zoom({position:'topright'}).addTo(map)
    // new L.HistoryControl().addTo(map);

    // appActivityView.stfu()

    //
}); //ready

    $(document).keydown(function(e) {
        if (e.keyCode == 17) {

            appStateView.swap();


        }
    });

    /* -------------------------------------------------- STRAIGHT UP FUNCS 

    function doctorId(type,id,updown){

        if(typeof updown =='undefined' || updown==null)
            {var updown="down"}

        var cid = null
        switch(type) {
            case 'line':
            if(updown=="down"){cid=Number(id)/plierline} else {cid=Number(id)*plierline}
                break;
            case 'poly':
            if(updown=="down"){cid=Number(id)/plierpoly} else {cid=Number(id)*plierpoly}
                break;
            default:
            cid = Number(id);
        }
        return cid
    }
    function cwmccallback(){
        if(verbose==true){console.log("breaker breaker")}
            if(verbose==true){console.log("------> (generic) cwmccallback")}
        }

    function puFactory(p){

    // first grab the pu's container node
    var nel = p.popup._contentNode

    // and since the p obj has been affixed with the original leaflet object's model ("model") we just pass it along like so
// but also we affix the leaflet id of the feature so we can close this mofo later (among other ops maybe)
var pm = new Popup(p.model).set({leafletid:p.layer._leaflet_id});
var pv = new PopupView({model:pm,el: nel})

}   
-----------------------  */
