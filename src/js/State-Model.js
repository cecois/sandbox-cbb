var State = Backbone.Model.extend({
    defaults: {
        locations:null
    }
    ,initialize: function(options) {
        options || (options = {});

        this.listenTo(this,'change:locations',this.proxy)

        return this
    }
    ,proxy: function(){
        appLocations.fetch()
        return this
    }
    ,slugify: function(ss){

// map through this.slugs, setting active:"is-active" where it matches s
var ogs = this.get("slugs")
,ns = _.map(ogs,function(s){
    if(s.slug==ss){return {name:s.name,slug:s.slug,active:"is-active"}}
        else {
         return {name:s.name,slug:s.slug,active:null}
     }
})//map
this.set({slugs:ns})
return this
}
});//state
