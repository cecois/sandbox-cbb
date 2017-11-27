var Browse = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			u = CONFIG.index_root
			break;

			default:
			u = CONFIG.index_root
			break;
		}

		return u
	}
	,initialize:function(options){
		options||(options={})
		return this
	}
	,upf:function(){

		return this
		.fetch()
	}
	,queryobj: function(){

		var Q = "*:*"

		return {
			"size": 0,
			"query": {
				"query_string": {
					"default_operator": "AND",
					"query": Q
				}
			},
			"aggregations": {
				"all_bits": {
					"global": {},
					"aggregations": {
						"guests": {
							"filter": {
								"query_string": {
									"default_operator": "AND",
									"query": Q
								}
							},
							"aggregations": {
								"filtered_guests": {
									"terms": {
										"size": 1000000,
										"field": "episode_guests.comma_del"
									}
								}
							}
						},
						"tags": {
							"filter": {
								"query_string": {
									"default_operator": "AND",
									"query": "*:*"
								}
							},
							"aggregations": {
								"filtered_tags": {
									"terms": {
										"size": 1000000,
										"field": "tags.comma_del"
									}
								}
							}
						},
						"bits": {
							"filter": {
								"query_string": {
									"default_operator": "AND",
									"query": "*:*"
								}
							},
							"aggregations": {
								"filtered_bits": {
									"terms": {
										"size": 1000000,
										"field": "bit.keyword"
									}
								}
							}
						},
						"episodes": {
							"filter": {
								"query_string": {
									"default_operator": "AND",
									"query": "*:*"
								}
							},
							"aggregations": {
								"filtered_episodes": {
									"terms": {
										"size": 1000000,
										"field": "episode.keyword"
									}
								}
							}
						}
					}
				}
			}
		}

	}
	,sync: function(method, collection, options) {


		options.dataType = "json";
		options.async = true;
		options.url = this.url();
		options.method = "POST";
		options.data = JSON.stringify(this.queryobj())

		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {


		appActivity.set({message:"parsing uniques (for browse)..."})

		var things = []

		var ubits = _.map(data.aggregations.all_bits.bits.filtered_bits.buckets,function(v,k){
			return {type:'bit',unique:v.key,unique_display:v.key,count:v.doc_count}
		})//.Map

		var utags = _.map(data.aggregations.all_bits.tags.filtered_tags.buckets,function(v,k){
			return {type:'tags',unique:v.key,unique_display:v.key,count:v.doc_count}
		})//.Map

		var uguests = _.map(data.aggregations.all_bits.guests.filtered_guests.buckets,function(v,k){
			return {type:'guests',unique:v.key,unique_display:v.key,count:v.doc_count}
		})//.Map

		var utagsn = _.reject(utags,function(t){return t.unique==''})

		var ueps = _.map(data.aggregations.all_bits.episodes.filtered_episodes.buckets,function(v,k){

			var vep = v.key.split("/")

			var ud = (vep.length>1)?vep[vep.length-1]:vep;
			return {type:'episode',unique:v.key,unique_display:ud,count:v.doc_count}
		})//.Map

		appBrowseBits.reset(ubits);
		appBrowseTags.reset(utagsn);
		appBrowseEpisodes.reset(ueps);
		appBrowseGuests.reset(uguests);


		var resp = things

		return resp
	}

})//extend
