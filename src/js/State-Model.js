var State = Backbone.Model.extend({
    initialize: function(options) {
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