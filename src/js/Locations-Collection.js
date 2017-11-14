var Locations = Backbone.Collection.extend({
	model:Bit
	,initialize:function(options){
		options||(options={})
		// this.listenTo(appState,'change:locations',this.fetch)
		//  this.on("reset", this.fetch, this);
	}
	,url:function(){

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			u = 'http://localhost:3030/geoms/cbb?q='+appState.get("locations");
			break;
			case '33':
			u = 'http://localhost:3030/geoms/cbb?q='+appState.get("locations");
			break;
			default:
			u = 'http://milleria.org:3030/geoms/cbb?q='+appState.get("locations");
		}

		return u

	}
	,sync: function(method, collection, options) {
		options.dataType = "jsonp";
		options.jsonpCallback = 'cwmccallback';
		return Backbone.sync(method, collection, options)
	}
	// ,parse: function(data) {

	// 	return data;
	// 	// var DRD = data

	// 	// var actuals = _.map(DRD,function(D){
	// 	// 	var assoc_bits = appBits.filter(function(B){
	// 	// 		return (UTIL.geom_id_nudge(D.geom_type,D.cartodb_id,"down")==B.get("location_id") && D.geom_type==B.get("location_type"))
	// 	// 	});

	// 	// 	D.associated_bits=assoc_bits
	// 	// 	return D
	// 	// })

	// 	// return actuals
	// }

})//extend
