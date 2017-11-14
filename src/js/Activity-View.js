var ActivityView = Backbone.View.extend({
    el: $("#activityContainer"),
    template: CBB['templates']['activityViewTpl'],
    events: {
        "click .activity-cancel": "stfu",
    },
    initialize: function() {
        // this.listenTo(appConsole,"change",this.listler)

        // NProgress.configure({
        //     parent: "#activity-console"
        // });

        this.model.bind("change", this.render, this);
        //this.render();
    },
    stfu: function(){
        // $("#cbb-bt-search").removeClass("is-loading")
        // NProgress.done()
        $(this.el).hide()
        // $("#query-form").removeClass("hidden")

        $(this.el).removeClass('warn')

        // better these would listen for this but it wasn't working/i was lazy
        // appCBBCountView.render()
        // appBitsCountView.render()
        // this.model.set({message:""},{silent:true})
        return this
    },
    warn: function(){

        // NProgress.done()

        $(this.el).find(".activity-cancel").show()

// setTimeout(function(this){ this.stfu() }, 3000);
setTimeout(_.bind(this.stfu, this), 4000);

return this

},
render: function() {
    if(CONFIG.verbose==true){console.log("rendering activityview")}
        // NProgress.start();
        // var show = this.model.get("show")
        $(this.el).show()
        // var show = true
        // var msg = this.model.get("message")
        // var altelstring = this.model.get("altel")
        // $("#cbb-bt-search").addClass("is-loading")
        // $(this.el).removeClass("idle")
        // $("#query-form").addClass("hidden")
        // $(this.el).find(".throbber").removeClass("hidden")
        // if (typeof altelstring == 'undefined' || altelstring == false || altelstring == null) {
        //     // var altel = $("#activity-default").find(".throbber");
        //     var altel = $("#activityContainer");
        // } else {
        //     var altel = $(altelstring)
        // }
        // if (show == true) {
            // altel.addClass("refreshing-loader")

        // } else {
            // altel.remove(".throbber")
                // NProgress.done()
        // }
        $(this.el).html(this.template(this.model.toJSON()))
        // if(this.model.get("warn")==true){
            // return this.warn()
        // } else {
            return this
            // }
        }
    });
