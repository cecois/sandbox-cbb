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
		this.listenTo(appState,'change:facets',this.upf)
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

		var locations = _.map(_.filter(data.hits.hits,function(d){
			return d._source.bit=="Location"}),function(d){

			return "cartodb_id:"+UTIL.geom_id_nudge(d._source.location_type,parseFloat(d._source.location_id),"up")
		})

		appLocations.fetch({ data: $.param({ q: locations.join(" OR ")}) });

		var fat_bits = _.map(data.aggregations.all_bits.bits.filtered_bits.buckets,function(v,k){

			var active = (_.contains(appState.get("facets"),v.key))?'is-active':'';
			return {type:'bits',facet:v.key,count:v.doc_count,active:active}

		})//.Map

		var fat_tags = _.map(data.aggregations.all_bits.tags.filtered_tags.buckets,function(v,k){

			var active = (_.contains(appState.get("facets"),v.key))?'is-active':'';
			return {type:'tags',facet:v.key,count:v.doc_count,active:active}
			
		})//.Map

		var fat_guests = _.map(data.aggregations.all_bits.guests.filtered_guests.buckets,function(v,k){

			var active = (_.contains(appState.get("facets"),v.key))?'is-active':'';
			return {type:'guests',facet:v.key,count:v.doc_count,active:active}

		})//.Map


		// var fat_tags = _.map(data.aggregations.all_bits.tags.filtered_tags.buckets,function(v,k){
		// 	for (var key in v)
		// 		{ if (!v.hasOwnProperty(key))
		// 			{ continue; }

		// 			return {type:'tags',facet:key,count:v[key]}}
		// })//.Map

		// var fat_guests = _.map(data.facet_counts.facet_fields.guests,function(v,k){
		// 	for (var key in v)
		// 		{ if (!v.hasOwnProperty(key))
		// 			{ continue; }

		// 			return {type:'guests',facet:key,count:v[key]}}
		// })//.Map


		// var fats = _.union(fat_bits,fat_tags);
		
		appState.set({search_results_count:data.hits.hits.length})

		appFacetsBits.reset(fat_bits)
		appFacetsTags.reset(fat_tags)
		appFacetsGuests.reset(fat_guests)

		return data.hits.hits
	}

})//extend
