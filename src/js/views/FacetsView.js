var FacetsView = Backbone.View.extend({
    // el: ".blocks-explore",
    events: {
        "click .bt-facet": 'facetize'
    },
    template: CBB['templates']['facetView'],
    initialize: function() {
        this.listenTo(this.collection, 'request', this.speak);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change', this.render);
    },
    facetize: function(e) {
        e.preventDefault()

// we're changing things fast - kill these here so there aren't any stragglers
// $(this).tooltip('destroy')
$(this.el).find(".bt-facet").tooltip('destroy')

// also kill an episodes pane if it's up
appQuerySubNavView.reset()

switch (this.group) {
 case "Tags":
 var fpre = "tags:"
 break;
 case "Bits":
 var fpre = "bit:"
 break;
 case "Episodes":
      // var fpre = "slug_earwolf:" // OG
      var fpre = "episode:"
      break;
      default:
      var fpre = "tags:"
  }

// note the quoting - solr gonna need that
var fstr = fpre+ '"'+$(e.target).attr("data-id")+'"'
        // this is one we want the url to reflect

        this.collection.toggle(fstr)


        return this
    },
    speak: function() {
        appActivity.set({
            message: "facetizing for " + appCartoQuery.get("displaystring") + "..."
        })
        return this.throb()
    },
    stfu: function() {
        // meta stfu
        appActivityView.stfu()
        $(this.el).find('.spinner').remove()
        return this
    },
    throb: function() {
        $(this.el).html('<div class="spinner"></div>');
        return this
    },
    render: function() {
        if (verbose == true) {
            console.log("rendering a facetsview")
        }
        // $(this.el).html(this.template(this.collection.toJSON()))
        $(this.el).html(this.template({
            group: this.group,
            facets: this.collection.toJSON()
        }));
        return this
        .rewire()
        // .stfu()
    },
    rewire: function(){

        var group = this.group

        switch(group) {
                case "Tags":
            var gstr = "tag:"
                    break;
                case "Bits":
                    var gstr="bit name:"
                    break;
                default:
            var gstr=''
        }

        $(this.el).find(".bt-facet").each(function(index, el) {
            if($(el).hasClass("true")){
                var ht = "click to remove this limiter from the current query"
            } else {
                var ht = "click to add "+gstr+" '"+$(el).attr("data-id")+"' as a limiter TO THE CURRENT QUERY (which is '"+appCartoQuery.get("displaystring")+"')"
            } //end if

            $(this).tooltip({
                container: "body",
                placement: 'left',
                trigger: 'hover',
                title: ht
            });

        });

// $(this.el).find(".bt-facet").hover(function() {
//      Stuff to do when the mouse enters the element
// });

return this.stfu()
}
}); //bitscountview