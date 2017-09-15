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
    }
    ,update:function(){

        if(this.hasChanged()==true){
            this.set({url:this.url_factory()})
        }
        return this
    }
    // ,url_factory:function(){

    //     return "/#"+this.get("slug")
    // }


});//state