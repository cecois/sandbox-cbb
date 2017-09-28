var GULP = require('gulp')
,LESS = require('gulp-less')
,FS = require('fs')
,MONGO = require('mongodb').MongoClient
,__ = require('underscore')
,CONCAT = require('gulp-concat')
,UGLIFY = require('gulp-uglify')
,BROWSERSYNC = require('browser-sync')
,DEL = require('del')
,HANDLEBARS      = require('gulp-handlebars')
,PLUMBER     = require('gulp-plumber')
,HTMLMIN     = require('gulp-htmlmin')
,DEBUG     = require('gulp-debug')
,WRAP    = require('gulp-wrap')
,DECLARE    = require('gulp-declare')
,RENAME = require('gulp-rename')
,CLEANCSS = require('gulp-clean-css')
,SOLR = require('solr-client')
,DEL = require('del')
,IMAGEMIN    = require('gulp-imagemin')
,CP          = require('child_process')
,MOMENT = require('moment')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,ZLIB = require('zlib')
RP=require('request-promise')
;

var paths = {
  staging:"staging"
  ,interm:"../interm"
  ,site:{
    src:"./"
    ,dist:"../dist"
  }
};

var browsersync =()=>{
  BROWSERSYNC({
    // files: [
    // paths.site.src+"/js/*.js"
    // ,paths.site.src+"/*.html"
    // ]
    files: [paths.interm+'/*']
    // ,
    ,server: [paths.interm+'/']
  });
};

/* ------------------------- IMG ------------- */

var img = ()=>{
  return GULP.src(paths.site.src+"/images/**/*.{jpg,png,gif,svg}")
  .pipe(PLUMBER())
  .pipe(IMAGEMIN({ optimizationLevel: 3, progressive: true, interlaced: true }))
  // .pipe(DEBUG())
  .pipe(GULP.dest(paths.interm+"/images/"));
 }//img


 /* ------------------------- FONTS ------------- */
 var fonts = ()=> {
  return GULP.src(
    [
    paths.site.src+"/css/fonts/**/*.{otf,ttf}"
    ,paths.site.src+"/lib/icomoon/fonts/**/*.{eot,svg,ttf,woff}"
    // ,paths.site.src+"/lib/components/bootstrap/fonts/**/*.{eot,svg,ttf,woff}"
    ,paths.site.src+"/lib/icomoon/fonts/*.{woff,ttf,svg,eot}"
    ]
    )
  // .pipe(DEBUG())
  .pipe(GULP.dest(paths.interm+"/fonts/"))
};

/* ------------------------- JS ------------- */

var copyjs=  ()=>{
  return GULP.src([
    paths.site.src+"/node_modules/handlebars/dist/handlebars.runtime.min.js"
    ,paths.site.src+"/node_modules/leaflet/dist/leaflet.js"
    ,paths.site.src+"/node_modules/jquery/dist/jquery.min.js"
    ,paths.site.src+"/node_modules/nprogress/nprogress.js"
    ,paths.site.src+"/node_modules/underscore/underscore-min.js"
    ,paths.site.src+"/node_modules/backbone.stickit/backbone.stickit.js"
    ,paths.site.src+"/node_modules/backbone/backbone-min.js"
//
,paths.site.src+"/js/Query-Model.js"
,paths.site.src+"/js/Query-View.js"
,paths.site.src+"/js/Util-Model.js"
,paths.site.src+"/js/Bit-Model.js"
,paths.site.src+"/js/Facets-Collection.js"
,paths.site.src+"/js/Locations-Collection.js"
,paths.site.src+"/js/Locations-View.js"
,paths.site.src+"/js/Bits-Collection.js"
,paths.site.src+"/js/Bit-View.js"
,paths.site.src+"/js/Bits-View.js"
,paths.site.src+"/js/Facets-View.js"
,paths.site.src+"/js/BaseLayer-Model.js"
,paths.site.src+"/js/BaseLayers-Collection.js"
,paths.site.src+"/js/BaseLayers-View.js"
,paths.site.src+"/js/BaseLayersMenuItem-View.js"
,paths.site.src+"/js/BaseLayersMenu-View.js"
   //
   ,paths.site.src+"/js/Activity-Model.js"
   ,paths.site.src+"/js/Activity-View.js"
   ,paths.site.src+"/js/State-Model.js"
   ,paths.site.src+"/js/State-View-Down-Menu.js"
   ,paths.site.src+"/js/State-View-Panes.js"
   ,paths.site.src+"/js/State-View-Panes-Menu.js"
   ,paths.site.src+"/js/App.js"
   ,paths.site.src+"/js/Routes.js"
    // ,paths.site.src+"/js/globals.js"
    ])
  .pipe(GULP.dest(paths.interm+"/js/"));
};

var views_y_models = ()=>{
  return GULP.src([
    //paths.site.src+"/js/Config.js"
    // paths.site.src+"/js/H-templates-compiled.js"
    // ,paths.site.src+"/js/models.js"
    // ,paths.site.src+"/js/views/BaseLayerMenuItemView.js"
    // ,paths.site.src+"/js/views/ActivityView.js"
    // ,paths.site.src+"/js/views/BaseLayersView.js"
    // ,paths.site.src+"/js/views/BaseMapView.js"
    // ,paths.site.src+"/js/views/CartoCollxCountView.js"
    // ,paths.site.src+"/js/views/BitsView.js"
    // ,paths.site.src+"/js/views/BitsCountView.js"
    // ,paths.site.src+"/js/views/CartoCollxView.js"
    // ,paths.site.src+"/js/views/CartoListView.js"
    // ,paths.site.src+"/js/views/ConsoleView.js"
    // ,paths.site.src+"/js/views/EpisodesView.js"
    // ,paths.site.src+"/js/views/EpisodeView.js"
    // ,paths.site.src+"/js/views/RecentsView.js"
    // ,paths.site.src+"/js/views/FacetsView.js"
    // ,paths.site.src+"/js/views/StatesView.js"
    // ,paths.site.src+"/js/views/SharesView.js"
    // ,paths.site.src+"/js/views/HuhView.js"
    // ,paths.site.src+"/js/views/UpdateView.js"
    // ,paths.site.src+"/js/views/HelpView.js"
    // ,paths.site.src+"/js/views/MethodView.js"
    // ,paths.site.src+"/js/views/PopupView.js"
    // ,paths.site.src+"/js/views/QuerySubNavView.js"
    // ,paths.site.src+"/js/views/QueryView.js"
    // ,paths.site.src+"/js/views/SolrFieldzView.js"
    ,paths.site.src+"/js/BaseLayersMenuItem-View.js"
    ,paths.site.src+"/js/BaseLayersMenu-View.js"
    ,paths.site.src+"/js/Activity-Model.js"
    ,paths.site.src+"/js/Activity-View.js"
    ,paths.site.src+"/js/State-Model.js"
    ,paths.site.src+"/js/State-View.js"
    ,paths.site.src+"/js/App.js"
    ,paths.site.src+"/js/Routes.js"
    ])
  .pipe(PLUMBER())
  .pipe(UGLIFY())
  .pipe(CONCAT('vm.min.js'))
  .pipe(GULP.dest(paths.interm+"/js/"))
}

/* ------------------------- STYLE ------------- */
var lessen = ()=>{

  return GULP.src(
    paths.site.src+"/css/app.less"
    )
  .pipe(LESS())
  // .pipe(DEBUG())
  // .pipe(RENAME({
  //   basename: 'zzzz'
  // }))
  .pipe(GULP.dest(paths.interm+"/css/"))
}

var copycss=  ()=>{
  return GULP.src(
    [
      // paths.site.src+"/css/banner.css"
      // ,paths.site.src+"/css/debug.css"
      // ,paths.site.src+"/css/devmarkers.css"
      paths.site.src+"/css/googlefont.mandali.css"
      ,paths.site.src+"/node_modules/leaflet/dist/leaflet.css"
      ,paths.site.src+"/node_modules/nprogress/nprogress.css"
      ,paths.site.src+"/css/fonts/fonts-offline.css"
      ,paths.site.src+"/node_modules/font-awesome/css/font-awesome.min.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/vendor/normalize.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/off-canvas-menu.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/header.css"
      // ,paths.site.src+"/lib/components/off-canvas-menu/general.css"
      // ,paths.site.src+"/lib/components/bootstrap/docs/dist/css/bootstrap.min.css"
      ,paths.site.src+"/node_modules/bulma/css/bulma.css"
      ,paths.site.src+"/lib/icomoon/style.css"
      ]
      )
  .pipe(GULP.dest(paths.interm+"/css/"));
};

/* ------------------------- HTML ------------- */
var htmlmin = ()=>{
  return GULP.src(paths.site.src+"/index.html")
  .pipe(HTMLMIN({collapseWhitespace: true}))
  .pipe(RENAME({
    basename: 'index'
  }))
  .pipe(GULP.dest(paths.interm+"/"))
}

var clean = ()=>{
  return DEL(paths.interm+"/*",{force:true})
}


/* ------------------------- TEMPLATES ------------- */

var handlez = ()=>{
  return GULP.src(paths.site.src+'/js/templates/*.handlebars')
  .pipe(HANDLEBARS({handlebars:require('handlebars')}))
  .pipe(WRAP('Handlebars.template(<%= contents %>)'))
  .pipe(DECLARE({
    namespace: 'CBB.templates',
      noRedeclare: true, // Avoid duplicate declarations
    }))
  .pipe(CONCAT('H-templates-compiled.js'))
  .pipe(GULP.dest(paths.interm+"/js/"));
}


/* ------------------------- WATCHES ------------- */

var watch = ()=>{
  return GULP
  .watch([
    paths.site.src+"js/*.js"
    ,paths.site.src+"js/templates/*.handlebars"
    ,paths.site.src+"*.html"
    // ,paths.site.src+"/css/*.less"
  ], GULP.parallel(
      handlez
      ,htmlmin
      ,copyjs
      ,img
      ,copycss
      ,lessen
      ))
}


exports.img = img;
exports.fonts = fonts;
exports.lessen = lessen;
exports.handlez = handlez;
exports.copycss = copycss;
exports.copyjs = copyjs;
exports.fonts = fonts;
exports.views_y_models = views_y_models;
exports.htmlmin = htmlmin;
exports.clean = clean;

var develop = GULP.series(
  clean
  ,handlez
  ,GULP.parallel(
    htmlmin
    ,fonts
    ,copyjs
    ,img
    ,copycss
    ,lessen
    ,fonts)
  ,GULP.parallel(
    browsersync
    ,watch
    )
  );//develop

GULP.task('default', develop);
