var PopupView = Backbone.View.extend({
    // el: $("#activityContainer"),
    template: CBB['templates']['hitMarkerViewTpl'],
    initialize: function() {
        this.ogwidth = null;
        // this.model.bind("change", this.render, this);
        // this.model.bind("change", this.triage, this);
        this.listenTo(appCBB, 'change:active', this.triage);
        return this.render();
    },
    events: {
        "click .bt-cartoobj-episodes": "triage",
        // "click .bt-cartoobj-feedback": "ghsubmit",
        // "click .bt-cartoobj-leafletcloser": "reset"
        "click button[type='submit']": "issue_submit",
        "click .btn-pu-nav": "navinternal"
    },
    yo: function(e){
        console.log("in yo, e");
        console.log(e);
        return this
    },
    navinternal: function(e) {
        $cuta = $(e.currentTarget)
            // so few no real performance hit here
            $(this.el).find(".btn-pu-nav").removeClass("active")
            $cuta.addClass("active")
            // var tel = e.currentTarget.getAttribute("data-target")
            var tel = $cuta.attr("data-target")
            $(".leaflet-popup-content").css("width", this.ogwidth + "px")
            $(this.el).find(".pu-copy").addClass("hidden")
            $(this.el).find(".pu-copy-" + tel).removeClass("hidden")
            if (tel == "episodes") {
                return this.pulleps()
            } else if (tel == "feedback") {
                return this.issue($cuta)
            } else {
                return this
            }
        },
        rewire: function() {
        // wire up those tooltips
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right"
        })
            // and the submit button
            //
            // $(this.el).find("button[type='submit']").click(function(t){
            // this.issue_submit()
            // });
            return this
            // .triage()
        },
        issue_submit: function(e) {
            var it = $(this.el).find("[data-class='pu-issue-title']").attr("placeholder")
            var ic = $(this.el).find("[data-class='pu-issue-contact']").val()
            var ib = $(this.el).find("[data-class='pu-issue-body']").val()+" -- "+ic;
            if (typeof ib == 'undefined' || ib == null || ib == '') {
                $(this.el).find("[data-class='pu-issue-body']").attr("placeholder", "please provide some sort of clue to what's wrong")
                $(e.currentTarget).html("<span class='glyphicon glyphicon-warning-sign'></span> Submit")
            } else {

                // do the submit
                if(verbose==true){
                    console.log(it);
                    console.log(ib);
                    console.log(ic);}

            octo.repos('cecois','bitmap').issues.create({"title":it,"body":ib}) //daOG
            
            

            // success will put a checkmark in submit button or something - github (octokat) doesn't return much

            $(e.currentTarget).html("<span class='glyphicon glyphicon-thumbs-up' disabled></span> Thanks")
        }
        return this
    },
    triage: function(){

        var actv = activeFactory();
        var loctype = actv[0]
        var locid = actv[1]

        if(verbose==true){
            console.log('<span class="copy-trigger" data-string="location_id:'+locid+ ' AND location_type:'+loctype+'" data-toggle="tooltip" data-original-title="" title=""><span class="loc-string">SOME STRING</span><span class="carto-plain-geomtype icom-'+loctype+'"></span>')}

            if (agent == "desktop") {
                return this.pulleps()
            } else if (agent == "mobile") {
            // return this.pulleps_mobile()
            return this.pulleps()
        }

    },
    pulleps: function() {


        $("#episodes-list").html('<div class="spinner-gold"></div>')

        var actv = activeFactory();
        var loctype = actv[0]
        var locid = actv[1]
        locidDrd = doctorId(loctype, locid)
        appEpisodes.activeloc = Number(locidDrd);
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {
            }
        });
        return this
        .rewire()
    },
    // navaway: function() {
    //     appRoute.navigate(urlFactory("#query"), {
    //         trigger: true,
    //         replace: true
    //     })
    // },
    issue: function(el) {
        // this.prepspace()
        $(".leaflet-popup-content").css("width", "450px")
        var locid = this.model.get("cartodb_id")
        return this
    },
    //     prepspace: function(replace) {
    // $guts = $(this.el)
    // var gwide = $guts.width()
    // // $guts.parent().css("overflow","hidden").css("height","400px").css("weight","500px")
    // $guts.parent().addClass("newspaceready")
    // // $guts.css("position","relative").css("left","85%");
    // // $guts.parent().prepend('<div class="altspace pull-left" style="width:'+gwide+'px;">stuff can actually go here?</div>');
    // $guts.parent().prepend('<div class="altspace pull-left">stuff can actually go here?</div>');
    //     return this
    //     },
    render: function() {
        // bc we'll be messing with this width once in a while, we sock away the original
        if(verbose==true){
            console.log("in popup render, name:");console.log(this.model.get("name"));}
            this.ogwidth = $(".leaflet-popup-content").width()
            $(this.el).html(this.template(this.model.toJSON()))
            return this
        // .triage()
    }
});