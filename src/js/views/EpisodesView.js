var EpisodesView = Backbone.View.extend({
    // tagName: "li",
    el: "#episodes-list",
    initialize: function() {
        if(verbose == true){console.log(" -------> EpisodesView --> running initialize")}
        if (verbose == true) {
            // console.log("initting recentsview")
        }
        this.collection.bind('reset', this.render, this);
        this.collection.bind('request', this.speak, this);
        // this.collection.bind("reset", _.bind(this.debug, this));
        // this.listenTo(this.collection, "change", this.render);
        // return this.render()
    },
    speak: function(){
        if(verbose == true){console.log(" -------> EpisodesView --> running speak")}

appActivity.set({message:"pulling episodes for "+activeFactory()+"..."})

return this

    },
    stfu: function(){
        if(verbose == true){console.log(" -------> EpisodesView --> running stfu")}
        // meta stfu
        appActivityView.stfu()
        return this
    },
    debug: function() {
        if(verbose == true){console.log(" -------> EpisodesView --> running debug")}
        console.log("RESET trigger");
    },
    wipe: function() {
        if(verbose == true){console.log(" -------> EpisodesView --> running wipe")}
        $(this.el).empty();
        return this
    },
    reset: function() {
        if(verbose == true){console.log(" -------> EpisodesView --> running reset")}
        $(this.el).addClass("hidden")
        $(".episodes-arrow").addClass("hidden")
        return this
    },
    render: function() {
        if(verbose == true){console.log(" -------> EpisodesView --> running render")}

if(verbose==true){console.log("in EV.render, about to empty the el");}

        $(this.el).empty()
            // by the time we get here, plainview will have an active element, go get it to match its position
        var ael = $(".carto-plain-title.true")
     

if(activeFactory()[0]=="_id"){

$(this.el).html("<div style='text-align:left;' class='cbbepsanno col-sm-12'>referencing (unmappable) bit: <p style='color:white;'>" + appBits.findWhere({
                active: true
            }).get("bit") + "</p></div>")

} else {

    $(this.el).html("<div style='text-align:left;' class='cbbepsanno col-sm-12'>referencing location: <p style='color:white;'>" + appCBB.findWhere({
                active: true
            }).get("name") + "</p></div>")
}


            // we use .episodes cuz we have some stuff outside of the el we wanna unhide, too
        if (this.collection.models.length > 0) {
            $(".episodes").removeClass('hidden')
        } else {
            $(this.el).html("None found (or <em>maybe</em> an error occurred. Who's to know?)")
        }
        

        if(verbose==true){console.log("in EV.render, about to iter thru collx for wikia ids and titles");}

        this.collection.each(function(episode) {
            if (verbose == true) {
                // console.log("gonna render the recentitemview")
            }
            // var wikiaid = Number(episode.get("id_wikia"))
            // var wikia = appWikiaz.findWhere({
            //     "id": wikiaid
            // })
            // if (typeof wikia !== 'undefined') {
            //     episode.set({
            //         title: wikia.get("title")
            //     })
            // } else {
            //     episode.set({
            //         title: "[title not found at comedybangbang.wikia.com]"
            //     })
            // }
            var thisEpView = new EpisodeView({
                model: episode
            });
            // console.log((thisRecentItemView));
            // console.log("$(this.el):");console.log($(this.el));
            $(this.el).append(thisEpView.render().el
                // "recent item will go here"
            );
        }, this);


        return this
        .stfu()
    }
});