var Bits = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var u =null;

		switch(CONFIG.mode) {
			case 'T':

//http://localhost:8983/solr/cbb_bits/select?q=titular&wt=json&indent=true&facet=true&facet.query=titular&facet.field=fat_name
u = 'http://localhost:8983/solr/cbb_bits/select?indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=_id,episode,slug_earwolf,bit,instance,created_at,updated_at,elucidation,tags&q=(holding:false) AND '+encodeURI(appQuery.get("querystring"))
+'&'+appQuery.get("facetstring")+'&facet.query='+encodeURI(appQuery.get("querystring"))

					// return Config.SOLRROOT+"select/?version=2.2&rows=50&indent=off&wt=json&json.wrf=cwmccallback&q=" + quQuery.get_query()


					break;
					default:
					u = CONFIG.index_root+'indent=off&rows='+appQuery.get("numRows")+'&json.wrf=cwmccallback&wt=json&fl=_id,episode,slug_earwolf,bit,instance,created_at,updated_at,elucidation,tags&q=(holding:false) AND '+encodeURI(appQuery.get("querystring"))
					+'&'+appQuery.get("facetstring")+'&facet.query='+encodeURI(appQuery.get("querystring"))
				}

				return u
			}
			,initialize:function(options){
				options||(options={})
		// this.listenTo(appState,'change:baselayer',this.switch)
	}
	,sync: function(method, collection, options) {

		options.dataType = "jsonp";
		options.jsonpCallback = 'cwmccallback';
		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {
		var locations = _.filter(data.response.docs,function(d){return d.bit=="Location"})


		var fat_bits = _.map(data.facet_counts.facet_fields.fat_name,function(v,k){

			for (var key in v)
			  { if (!v.hasOwnProperty(key))
			    { continue; }

			return {type:'bits',facet:key,count:v[key]}}
		})//.Map

		var fat_tags = _.map(data.facet_counts.facet_fields.tags,function(v,k){
			for (var key in v)
			  { if (!v.hasOwnProperty(key))
			    { continue; }

			return {type:'tags',facet:key,count:v[key]}}
		})//.Map

		// var fats = _.union(fat_bits,fat_tags);

		appFacetsBits.reset(fat_bits)
		appFacetsTags.reset(fat_tags)

		return data.response.docs
	}

})//extend
