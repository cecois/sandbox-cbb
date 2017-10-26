var State = Backbone.Model.extend({
    defaults: {
        facets:''
    }
    ,initialize: function(options) {
        options || (options = {});

        // this.listenTo(this,'change:facets',this.proxy)

        return this
    }
    ,
    facet:function(F){

        var facets = this.get("facets")
        var facetsa = facets.split(",")

        if(_.contains(facetsa,F)){
            var keep = _.uniq(_.partition(facetsa,function(f){return f==fa}))[1]
            this.set({facets:keep.join(",")})
        } else {
            facetsa.push(F)
            this.set({facets:facetsa.join(",")})
        }



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
