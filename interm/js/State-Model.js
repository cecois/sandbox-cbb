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
    facetArray: function(){

        var A = [];
        if(this.get("facets").indexOf(",")>0){
            A=this.get("facets").split(",")
        } else if(this.get("facets")!==""){
            A.push(this.get("facets"))
        }
        return A;
    }
    ,facet:function(F){

        var FA = this.facetArray()
        console.log("before",FA);


        console.log("checking...");
        console.log(_.contains(FA,F));

        if(_.contains(FA,F)){
            this.set({facets:_.without(FA,F).join(",")})
        } else {
            FA.push(F)
            this.set({facets:FA.join(",")});
        }
        
        console.log("now?");
        console.log(this.facetArray());

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
