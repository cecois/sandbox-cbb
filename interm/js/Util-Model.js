var Util = Backbone.Model.extend({
    initialize: function(options) {
        options || (options = {});

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
    ,geom_id_nudge:function(type,id,updown){

        if(typeof updown =='undefined' || updown==null)
            {var updown="down"}

        var cid = null
        switch(type) {
            case 'line':
            if(updown=="down"){cid=Number(id)/CONFIG.pliers.line} else {cid=Number(id)*CONFIG.pliers.line}
                break;
            case 'poly':
            if(updown=="down"){cid=Number(id)/CONFIG.pliers.poly} else {cid=Number(id)*CONFIG.pliers.poly}
                break;
            default:
            cid = Number(id);
        }
        return cid
    }

});//state
