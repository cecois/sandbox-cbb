/* -------------------------------------------------- GLOBALS -----------------------  */
var CONFIG = {
	verbose:true
    ,dev:true
    ,mode:"33"
    ,proxy:null
    ,query:"*:*"
    ,basemap:"pencil"
    ,index_root:"http://10.0.0.150:8983/solr/cbb_bits/select?"
    ,geom_root:"http://10.0.0.150:8983/solr/cbb_carto/select?"
    ,pliers:{line:999,poly:9999,point:1}
    ,default_query:"(episode:510 OR episode:511)"
}

window.map = new L.Map('map',
{
    zoomControl:false,
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

// NProgress.configure({
//     parent: 'html body.layout-documentation.page-columns section#cbb-header.columns div#query-form.column.is-half div.field.has-addons.level div.control.level-item input.input.is-large'
// });

/* -------------------------------------------------- HANDLEBARS START

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
}
});

*/

//http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
Handlebars.registerHelper('equal', function(lvalue, rvalue, options) {

    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper('debug', function(thing) {
    console.log(thing)
    return new Handlebars.SafeString(this.instance);
});

/*
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
//

// window.appURL = new URL();
/*
var appEpisodes = new Episodes();
var appEpisodesView = new EpisodesView({
    collection: appEpisodes
});
*/

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


var appQuery = new Query({raw:CONFIG.default_query});
var appQueryView = new QueryView({
    model: appQuery
});

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

var appFacetsBits = new Facets();
var appFacetsTags = new Facets();
var appFacetsGuests = new Facets();

var appLocations = new Locations();
var appBits = new Bits();
var appBitsView = new BitsView({collection:appBits});
var appLocationsView = new LocationsView({collection:appLocations});

var appFacetsBitsView = new FacetsView({el:"#search-facets-bits",collection:appFacetsBits,type:'bit'});
var appFacetsTagsView = new FacetsView({el:"#search-facets-tags",collection:appFacetsTags,type:'tags'});
var appFacetsGuestsView = new FacetsView({el:"#search-facets-guests",collection:appFacetsGuests,type:'guests'});




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


if(CONFIG.mode=='T'){
    baselayers=baselayersdummified
} else {

        // if(agent=='mobile'){
        // }else{
            baselayers=baselayersdesk
        // }
    }

    // baselayers=baselayersdummified
    var appBaseLayers = new BaseLayersCollection(baselayers.layers);
    var appBaseLayersMenuView = new BaseLayersMenuView({
        collection: appBaseLayers
    });

    var appBaseMapView = new BaseLayersView({
        collection: appBaseLayers
    });


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

    /* -------------------------------------------------- READY -----------------------  */
    $(document).ready(function() {


}); //ready

    $(document).keydown(function(e) {
        if (e.keyCode == 17) {

            appStateView.swap();


        }
    });
