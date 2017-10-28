var Bits = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var Q = appQuery.querystring()

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			u = 'http://localhost:8983/solr/cbb_bits/select?'
			// indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=tstart,_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags&q='
			+encodeURI(Q);
			break;

			default:
			u = CONFIG.index_root
			// +'indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=tstart,_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags&q='
			+encodeURI(Q);
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
	,sync: function(method, collection, options) {

		options.dataType = "jsonp";
		options.jsonpCallback = 'cwmccallback';

		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {


		var locations = _.map(_.filter(data.response.docs,function(d){return d.bit=="Location"}),function(d){

			return "cartodb_id:"+UTIL.geom_id_nudge(d.location_type,parseFloat(d.location_id),"up")
		})

		appLocations.fetch({ data: $.param({ q: locations.join(" OR ")}) });

		var fat_bits = _.map(data.facet_counts.facet_fields.fat_name,function(v,k){

			for (var key in v)
				{ if (!v.hasOwnProperty(key))
					{ continue; }

					var fkey = 'bit:"'+key+'"'
					// var active = (_.contains(appState.get("facets"),fkey))?'is-active':'';
					var active = (_.contains(appState.facetArray(),fkey))?'is-active':'';

					// console.log("active for "+fkey,active);

					return {type:'bits',facet:key,count:v[key],active:active}}
		})//.Map

		var fat_tags = _.map(data.facet_counts.facet_fields.tags,function(v,k){
			for (var key in v)
				{ if (!v.hasOwnProperty(key))
					{ continue; }

					return {type:'tags',facet:key,count:v[key]}}
		})//.Map

		var fat_guests = _.map(data.facet_counts.facet_fields.guests,function(v,k){
			for (var key in v)
				{ if (!v.hasOwnProperty(key))
					{ continue; }

					return {type:'guests',facet:key,count:v[key]}}
		})//.Map

		// var fats = _.union(fat_bits,fat_tags);
		
		appState.set({search_results_count:data.response.docs.length})

		appFacetsBits.reset(fat_bits)
		appFacetsTags.reset(fat_tags)
		appFacetsGuests.reset(fat_guests)

		return data.response.docs
	}

})//extend
