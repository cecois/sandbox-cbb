var State = Backbone.Model.extend({
    defaults: {slugs:[
        ,{name:"Home",slug:"home",active:'is-active'}
        ,{name:"Huh?",slug:"huh",active:null}
        ,{name:"Search",slug:"search",active:null}
        ,{name:"Browse",slug:"browse",active:null}
        ,{name:"Updates",slug:"updates",active:null}
        ,{name:"Help",slug:"help",active:null}
        ]
    }
    ,initialize: function(options) {
        options || (options = {});

        //this.listenTo(this, "change", this.update)
        return this
    },
    slugify: function(ss){

// map through this.slugs, setting active:"is-active" where it matches s
// 
var ogs = this.get("slugs")
,ns = _.map(ogs,function(s){
    if(s.slug==ss){return {name:s.name,slug:s.slug,active:"is-active"}}
        else {
         return {name:s.name,slug:s.slug,active:null}
     }
})//map
console.log("ns",ns);
this.set({slugs:ns})
console.log("appstate.slugs",this.get("slugs"));
return this
}
});//state