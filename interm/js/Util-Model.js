var Util = Backbone.Model.extend({
    initialize: function(options) {
        options || (options = {});
        
        //this.listenTo(this, "change", this.update)
        return this
    }
    ,bounds_ob_from_bbox_string:function(bboxstring){

        var bba = bboxstring.split(",")
        if(bba.length<4){
            return "incomplete bbox submitted"
        }
        var sw = L.latLng(bba[1],bba[0])
        var ne = L.latLng(bba[3],bba[2])
        return L.latLngBounds(sw,ne)

    }

});//state