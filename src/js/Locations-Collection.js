var Locations = Backbone.Collection.extend({
	model:Bit
			,initialize:function(options){
				options||(options={})
		// this.listenTo(appState,'change:baselayer',this.switch)
	}
	,url: function(){

		// var u =null;

		var u= "http://localhost:8983/solr/cbb_carto/select?wt=json&q=cartodb_id:829917"

		// switch(CONFIG.mode) {
		// 	case 'T':
		// u = 'http://localhost:8983/solr/cbb_carto/select?wt=json&q='+encodeURI(this.map(function(m){return "cartodb_id:"+UTIL.geom_id_nudge(m.get("location_type"),m.get("location_id"),"up")}).join(" OR "));
		// 			break;
		// 			default:
		// 			u = CONFIG.index_root+'indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags&q=(holding:false) AND '+encodeURI(appQuery.get("querystring"))
		// 			+'&'+appQuery.get("facetstring")+'&facet.query='+encodeURI(appQuery.get("querystring"))
		// 		}

				return u

	}
	,sync: function(method, collection, options) {
console.log("26, sync");
		options.dataType = "jsonp";
		options.jsonpCallback = 'cwmccallback';
		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {
console.log("32, parse");

		// heres wehre where z ip back with bits?

		return data.response.docs
	}
	,fetch_geoms: function(){

// var mfm = this.map_for_map()
		$.getJSON(this.vurl(), null, function(json, textStatus) {
			console.log("json in fetch_geoms:");console.log(json);
		});

		return null
	}

})//extend
