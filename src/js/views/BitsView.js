var BitsView = Backbone.View.extend({
    el: "#querylist-bits",
    events: {
        "click .bt-cartoobj-episodes": 'triage',
        "click .copy-trigger": "singular"
    },
    template: CBB['templates']['bitsView'],
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        
        if (agent == "desktop") {
            this.template = CBB['templates']['bitsView'];
        } else if (agent == "mobile") {
            this.template = CBB['templates']['bitsView-Mobile'];
        }
        return this
    },
    debug: function() {
    },
    echoid: function(e) {
        var locid = $(e.target).attr("data-id")
        var str = '<span class="copy-trigger" data-string="cartodb_id:' + locid + '"><span class="loc-string">SOME STRING</span><i class="glyphicon glyphicon-map-marker"></i></span>';
        return this
    },
    unwire: function() {

        $('.bt-cartoobj').tooltip('destroy')
        $('.copy-trigger').tooltip('destroy')
        return this
    },
    stageeps: function(e) {
        return this.pulleps(e)
    },
    sort: function() {
        this.collection.sort()
        return this
    },
    singular: function(e) {

        this.unwire()
        e.preventDefault()
        var ds = $(e.currentTarget).attr("data-string")
        locTrigger(e, true, ds)
        return this
    },
    triage: function(e) {
        e.preventDefault()
        if (dev == true) {
        }
        var bitid = $(e.target).attr("data-id")
        activecouple = activeFactory("_id:" + bitid)
        this.collection.activate();
        // this is one we want the url to reflect
        appRoute.navigate(urlFactory("#query"), {
            trigger: false,
            replace: false
        })
        if (agent == "desktop") {
            return this.pulleps()
        } else if (agent == "mobile") {
            return this.pulleps()
        }
    },
    pulleps: function() {


        $("#episodes-list").html('<span class="spinner-gold pull-right"></span>').removeClass("hidden")

        var actv = activeFactory();

        var loctype = actv[0]
        var bitid = actv[1]
        appEpisodes.activeloc = bitid;
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {


                appQuerySubNavView.episodize("locations")
            }
        });
        return this.render()
    },
    pullepsOG: function(e) {

        var locid = $(e.target).attr("data-id")
        var loctype = $(e.target).attr("data-type");
        switch (loctype) {
            case 'line':
            locid = locid / plierline
            break;
            case 'poly':
            locid = locid / plierpoly
            break;
            default:
            locid = locid;
        }
        appEpisodes.activeloc = Number(locid);
        appEpisodes.loctype = loctype;
        appEpisodes.fetch({
            reset: true,
            success: function(c, r, o) {

            }
        });
        e.preventDefault()
        var a = $(e.currentTarget).parents('li')
            // some positioning so it's clear what wz activated

            var voff = $(a).offsetTop;

            return this.activate(a)
        },
        rewire: function() {
        // reactivating some pieces that get wiped in the render
        // actually -- first, since we're here for the same reason -- let's wipe the episodes list, too
        appEpisodesView.wipe();

        $('.bt-cartoobj-episodes').tooltip({
            container: 'body',
            placement: 'right',
            trigger: 'hover'
        })

        $('.copy-trigger').tooltip({
            container: 'body',
            placement: 'top',
            trigger: 'hover',
            html:true,
            title: function(){

                return "query for "+$(this).attr("data-string")
            }
        })

        return this
    },
    activate: function(a) {
        // first wipe the list of any true classes (see ~184 for explanation)
        $(this.el).find("li").removeClass("true")
        var amid = $(a).data("id").toString();

        $(a).addClass("true")
        $(a).addClass("well")
        return this
    },
    render: function() {
        this.unwire()
        _.sortBy(this.collection.models, function(mod) {
            return mod.get("active") == 'true';
        });

        if(this.collection.length>0){
                // notice we are wrapping the collection in rows: cuz cartodb does it
                $(this.el).html(this.template({
                    count: this.collection.models.length,
                    rows: this.collection.toJSON()
                }));} else {
                    $(this.el).html("<div style='font-size:1.2em;padding:44px;text-align:center;'><p>None.</p> <p>They were all mappable (look over there --->) or none came in from the query.</p></div>")
                }
                return this.rewire()
            }
        });