var CartoCollxCountView = Backbone.View.extend({
    el: ".query-subnav-count-locations",
    initialize: function() {
        this.listenTo(this.collection, 'request', this.throb);
        this.listenTo(this.collection, 'reset', this.render);
        // this.listenTo(appActivityView, 'stfu', this.render); DIDN'T WORK
        return this.render()
    },
    throb: function(){

// $(".query-subnav-count-locations").html('<div class="spinner" style="margin:0;"></div>');
$(".query-subnav-count-locations").html('<div class="spinner" style="margin:0;"></div>');

return this

    },
    throbtab: function(){

// i don't know about this, guys - point is to be able to highlight when there are new query results but the query tab isn't active. good idea?

if($("#query.mainpanel").hasClass("hidden")==true){

var newz = appBits.length+appCBB.length

// oof #returnto
if(agent=="mobile"){
$("#query-new-throb").addClass("nonbadge")
$("#query-new-throb").removeClass("badge-homemade")
$("#query-new-throb").html("("+newz+")")
} else {

$("#query-new-throb").html(newz)}

$("#query-new-throb").removeClass("hidden")



} else {

if($("#query-new-throb").hasClass("hidden")==false){

    $("#query-new-throb").addClass("hidden")
}
}

return this

    },
    render: function() {
        var len = this.collection.models.length

        $(this.el).html("("+this.collection.models.length+")");
        return this.throbtab()
    }
}); //bitscountview