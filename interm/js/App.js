/* -------------------------------------------------- GLOBALS -----------------------  */
var CONFIG = {
	verbose:true
    ,dev:true
    ,mode:"33"
    ,proxy:null
    ,basemap:"pencil"
    ,index_root:"http://milleria.org:9200/cbb/_search?"
    // ,index_root:"http://localhost:9200/cbb/_search?"
    ,default_query:"watch"
}

window.map = new L.Map('map',
{
    zoomControl:false,
    center: [51.505, -0.09],
    zoom:7
    ,attributionControl:false
})
.on('moveend',function(e){
    // hey not great but Route's .listenTo method wz causing a deep undefined in leafletjs
    if(typeof appRoute !== 'undefined'){
        appRoute.up()
    }
}
)

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//     window.agent = "mobile";
// } else {
//     window.agent = "desktop";
// }

/* -------------------------------------------------- HANDLEBARS START */

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

Handlebars.registerHelper('episodizer', function(v,options) {

    var vep = v.split("/")
    var slug = vep[vep.length-1];

    return new Handlebars.SafeString(slug);
});

/* -------------------------------------------------- HANDLEBARS END -----------------------  */

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
    }]
}
var baselayersdesk = {
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
    }
    ]
}


var appSlugs = new Slugs(
    [
    {name:"Home",slug:"home",active:false}
    ,{name:"Huh?",slug:"huh",active:false}
    ,{name:"Search",slug:"search",active:'is-active'}
    ,{name:"Browse",slug:"browse",active:false}
    ,{name:"Updates",slug:"updates",active:false}
    ,{name:"Help",slug:"help",active:false}
    ]
        ); //new Slugs

var appQueryFacets = new QueryFacets();
var appQuery = new Query({raw:CONFIG.default_query});
var appQueryView = new QueryView({
    model: appQuery
});

var appState = new State();
var appStateViewDownMenu = new StateViewDownMenu({
    model: appState
});


var appFacetsBits = new Facets();
var appFacetsEpisodes = new Facets();
var appFacetsTags = new Facets();
var appFacetsGuests = new Facets();

var appLocations = new Locations();
var appBits = new Bits();
var appBitsView = new BitsView({collection:appBits});

var appBrowseBits = new Browse();
var appBrowseTags = new Browse();
var appBrowseEpisodes = new Browse();
var appBrowseGuests = new Browse();
var appBrowseMaster = new Browse();

var appBrowseBitsView = new BrowseView({el:"#browse-bits",collection:appBrowseBits,type:'bit'});
var appBrowseTagsView = new BrowseView({el:"#browse-tags",collection:appBrowseTags,type:'tag'});
var appBrowseEpisodesView = new BrowseView({el:"#browse-episodes",collection:appBrowseEpisodes,type:'episode'});
var appBrowseGuestsView = new BrowseView({el:"#browse-guests",collection:appBrowseGuests,type:'episode'});

var appLocationsView = new LocationsView({collection:appLocations});

var appSlugsViewPanes = new SlugsViewPanes({
    collection: appSlugs
});
var appSlugsViewPanesMenu = new SlugsViewPanesMenu({
    collection: appSlugs
});

var appFacetsBitsView = new FacetsView({el:"#search-facets-bits",collection:appFacetsBits,type:'bit'});
var appFacetsEpisodesView = new FacetsView({el:"#search-facets-episodes",collection:appFacetsEpisodes,type:'episode'});
var appFacetsTagsView = new FacetsView({el:"#search-facets-tags",collection:appFacetsTags,type:'tags'});
var appFacetsGuestsView = new FacetsView({el:"#search-facets-guests",collection:appFacetsGuests,type:'guests'});

var UTIL = new Util();

// new activity model and view
var appActivity = new Activity({message:"loading..."});
var appActivityView = new ActivityView({
    model: appActivity
});


if(CONFIG.mode=='T'){
    baselayers=baselayersdummified
} else {

    baselayers=baselayersdesk
}

var appBaseLayers = new BaseLayersCollection(baselayers.layers);
var appBaseLayersMenuView = new BaseLayersMenuView({
    collection: appBaseLayers
});

var appBaseMapView = new BaseLayersView({
    collection: appBaseLayers
});


/* -------------------------------------------------- READY -----------------------  */
$(document).ready(function() {


}); //ready

$(document).keydown(function(e) {

// ctrl on mac anyway
if (e.keyCode == 17) {

    appStateViewDownMenu.setm()


}
});
