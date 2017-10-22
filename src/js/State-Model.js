var State = Backbone.Model.extend({
    defaults: {slugs:[
        {name:"Home",slug:"home",active:'is-active'}
        ,{name:"Huh?",slug:"huh",active:null}
        ,{name:"Search",slug:"search",active:null}
        // ,{name:"Browse",slug:"browse",active:null}
        ,{name:"Updates",slug:"updates",active:null}
        ,{name:"Support",slug:"support",active:null}
        ]
    }
    ,initialize: function(options) {
        options || (options = {});

        // this.listenTo(appBits,'change',this.set_bits_length)

        return this
    }
    // ,
    // set_bits_length:function(){

    //     console.log("borrowing this len from appbits:",appBits.length);
    //     this.set({search_results_count:appBits.length})

    //     return this

    // }
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
