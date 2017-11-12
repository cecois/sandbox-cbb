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
		return this
	}
	,upf:function(){

		return this
		.fetch()
	}
	,sync: function(method, collection, options) {



		options.dataType = "json";
		options.async = true;
		options.url = this.url();
		options.method = "POST";
		options.data = JSON.stringify(appQuery.queryobj())

		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {

		var fat_bits = _.map(data.aggregations.all_bits.bits.filtered_bits.buckets,function(v,k){

			var b = {bit:v.key}

			var active = (appQueryFacets.findWhere(b))?'is-active':'';
			return {type:'bits',facet:v.key,count:v.doc_count,active:active}

		})//.Map
		appFacetsBits.reset(fat_bits)

		
		var fat_bits = _.map(data.aggregations.all_bits.bits.filtered_bits.buckets,function(v,k){

			var b = {bit:v.key}

			var active = (appQueryFacets.findWhere(b))?'is-active':'';
			return {type:'bits',facet:v.key,count:v.doc_count,active:active}

		})//.Map
		appFacetsBits.reset(fat_bits)

		if(typeof data.aggregations.all_bits.tags !== 'undefined'){
			var fat_tags = _.map(data.aggregations.all_bits.tags.filtered_tags.buckets,function(v,k){
				var b = {tags:v.key}
				var active = (appQueryFacets.findWhere(b))?'is-active':'';
				return {type:'tags',facet:v.key,count:v.doc_count,active:active}

		})//.Map
			appFacetsTags.reset(fat_tags)
	}//if.facet

	if(typeof data.aggregations.all_bits.guests !== 'undefined'){
		var fat_guests = _.map(data.aggregations.all_bits.guests.filtered_guests.buckets,function(v,k){
			var b = {episode_guests:v.key}
			var active = (appQueryFacets.findWhere(b))?'is-active':'';
			return {type:'guests',facet:v.key,count:v.doc_count,active:active}

		})//.Map

		appFacetsGuests.reset(fat_guests)
	}//if.facet

	if(typeof data.aggregations.all_bits.episodes !== 'undefined'){
		var fat_episodes = _.map(data.aggregations.all_bits.episodes.filtered_episodes.buckets,function(v,k){
			var b = {episode:v.key}
			var active = (appQueryFacets.findWhere(b))?'is-active':'';
			return {type:'episode',facet:v.key,count:v.doc_count,active:active}

		})//.Map
		appFacetsEpisodes.reset(fat_episodes)
	}//if.facet


	appState.set({search_results_count:data.hits.hits.length})


	return data.hits.hits
}

})//extend
