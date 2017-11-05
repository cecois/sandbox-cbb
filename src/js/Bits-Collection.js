var Bits = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var Q = appQuery.get('raw')

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			// u = 'http://localhost:8983/solr/cbb_bits/select?'
			u = CONFIG.index_root
			// indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=tstart,_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags&q='
			// +encodeURI(Q);
			// +Q;
			break;

			default:
			u = CONFIG.index_root
			// +'indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=tstart,_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags&q='
			// +encodeURI(Q);
			// +Q;
			break;
		}

		return u
	}
	,initialize:function(options){
		options||(options={})
		this.listenTo(appQuery,'change:raw',this.upf)
		this.listenTo(appQueryFacets,'add remove',this.upf)
		// this.listenTo(appQuery,'change:facets',this.upf)
		return this
	}
	,upf:function(){

		// if(CONFIG.verbose == true){
			console.log("updating bits from upf...");
		// }

		// appActivity.set({message:"updating bits..."})
		return this
		.fetch()
	}
	// ,man: function(){


	// 	$.ajax({
	// 		url: this.url(),
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		data: JSON.stringify(appQuery.get("queryobj"),
	// 	})
	// 		.done(function() {
	// 			console.log("success");
	// 		})
	// 		.fail(function() {
	// 			console.log("error");
	// 		})
	// 		.always(function() {
	// 			console.log("complete");
	// 		});

	// 		return this

	// 	},
	,sync: function(method, collection, options) {



		options.dataType = "json";
		// options.jsonpCallback = 'cwmccallback';
		options.async = true;
		// options.crossDomain = true;
		options.url = this.url();
		options.method = "POST";
		options.data = JSON.stringify(appQuery.queryobj())

		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {

		// var locations = _.map(_.filter(data.hits.hits,function(d){
		// 	return d._source.bit=="Location"}),function(d){

		// 	return "cartodb_id:"+UTIL.geom_id_nudge(d._source.location_type,parseFloat(d._source.location_id),"up")
		// })

		// appLocations.fetch({ data: $.param({ q: locations.join(" OR ")}) });

		var fat_bits = _.map(data.aggregations.all_bits.bits.filtered_bits.buckets,function(v,k){

			// var b = 'bit:\"'+v+'\"'
			// console.log('raw facet',v);
			var b = {bit:v.key}
			// console.log('lets see if this b',b);
			// console.log('is in this collx',appQueryFacets);

			var active = (appQueryFacets.findWhere(b))?'is-active':'';
			// console.log('active after findwhere',active)
			return {type:'bits',facet:v.key,count:v.doc_count,active:active}

		})//.Map
		appFacetsBits.reset(fat_bits)

		if(typeof data.aggregations.all_bits.tags !== 'undefined'){
			var fat_tags = _.map(data.aggregations.all_bits.tags.filtered_tags.buckets,function(v,k){

				var active = (_.contains(appState.get("facets"),v.key))?'is-active':'';
				return {type:'tags',facet:v.key,count:v.doc_count,active:active}

		})//.Map
			appFacetsTags.reset(fat_tags)
	}//if.facet

	if(typeof data.aggregations.all_bits.guests !== 'undefined'){
		var fat_guests = _.map(data.aggregations.all_bits.guests.filtered_guests.buckets,function(v,k){

			var active = (_.contains(appState.get("facets"),v.key))?'is-active':'';
			return {type:'guests',facet:v.key,count:v.doc_count,active:active}

		})//.Map

		appFacetsGuests.reset(fat_guests)
	}//if.facet


	appState.set({search_results_count:data.hits.hits.length})


	return data.hits.hits
}

})//extend
