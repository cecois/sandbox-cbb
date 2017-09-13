var HelpView = Backbone.View.extend({
    // tagName: "li",
    el: "#help-copy",
    events: {
        "click .copy-trigger": "singular",
        "click .mobile-slide-nav li": "wiremobile"
    },
    template: CBB['templates']['help'],
    template_mobile: CBB['templates']['help-mobile'],
    initialize: function() {
        if (verbose == true) {
            // console.log("initting huhview")
        }
        this.model.bind('change active', this.render, this);
        this.render()
    },
    singular: function(e) {

        e.preventDefault()
         var ds = $(e.currentTarget).attr("data-string")
        locTrigger(e, true, ds)
        return this
    },
    render: function() {
        if(agent=="mobile"){
                $(this.el).html(this.template_mobile(this.model.toJSON()))
        return this
        .initmobile()
            }
                else {
        $(this.el).html(this.template(this.model.toJSON()))
                    return this
                }
            // }, this);
    },
    reset: function() {
        // console.log("showmain clicked");
        // console.log(e);
        // $("#bt-showmain").addClass('hidden')
        // $("#main").addClass('hiddenish')
        return this
    },
    initmobile: function(){

// find all the mobile-wrappers, hide em
$(this.el).find(".mobile-wrapper").addClass("hidden")

// there should at least be a 1 (usually at least a 1-2), show it
$(this.el).find(".mobile-wrapper-1").removeClass("hidden")

return this


    },
    wiremobile: function(e){
if(verbose==true){
console.log("in wiremobile");}
e.preventDefault()
var ds = $(e.currentTarget).attr("data-target")

$(this.el).find(".mobile-slide-nav ul li").toggleClass('active');

$(this.el).find(".mobile-wrapper").toggleClass('hidden');
// $(this.el).find(ds).removeClass("hidden")
// $(this.el).find(ds).scrollTop()

return this

    }

});