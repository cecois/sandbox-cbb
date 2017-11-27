var Bits = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var u =CONFIG.index_root;

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


		appActivity.set({message:"extracting locations..."})
		var locations = _.map(_.filter(data.hits.hits,function(d){
			return d._source.bit=="Location"}),function(d){

			return d._source.location_type+":"+d._source.location_id
		})

		appActivity.set({message:"fetching geoms..."})
		appState.set({locations:locations.join(",")})

		appActivity.set({message:"setting facets..."})
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

	appActivity.set({message:"done!",hang:10})

	var mock = _.map(data.hits.hits,function(b){
		var o = b._source;
		var upd = (b._source.created_at==b._source.updated_at)?null:moment(b._source.updated_at).format("YYYY.MMM.DD")


		var eti = (b._source.episode_title==null ||b._source.episode_title=='')?b._source.episode.split("/")[b._source.episode.split("/").length-1]:b._source.episode_title;
		var elnk = (b._source.episode.indexOf("http:")>=0)?b._source.episode:"http://earwolf.com/episode/"+b._source.slug_earwolf

		o.meta={
			created:moment(b._source.created_at).format("YYYY.MMM.DD")
			,updated:upd
			,episode_string:eti
			,tags:b._source.tags.split(",")
			,link:elnk
		}
		return o
	})

	return mock
}

})//extend
