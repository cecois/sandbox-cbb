var Query = Backbone.Model.extend({
	defaults:{
		recordOffset:0
		,page:1

	}
	,query_facetadd:function(){

		var A = appQueryFacets.facetArray();

		var AA = _.map(A,function(f){
			var ff = f.split(":")
			var b = ff[0]
			,v=ff[1];
			var kee = null;
			switch (b) {
				case 'tags':
				kee = 'tags.comma_del'
				break;
				default:
				kee=b
				break;
			}

			return kee+":"+'"'+v+'"'

		})

		var facetadd=(AA.length>0)?' AND ('+AA.join(" AND ")+")":'';

		return facetadd;
	}
	,query_primitive:function(which){

		var fac = (typeof which == 'undefined' || which == null)?'':this.query_facetadd();

		return {
			"query_string" : {
				"default_operator" : "AND",
				"query" : (this.get("raw")+fac+' AND holding:false')
				.replace('?','\\?')
				.replace('!','\\!')
				.replace('!','\\!')
			}
		}

	}
	,queryobj:function(){

		var bits = {
			"filter":this.query_primitive()
			,"aggregations": {
				"filtered_bits": {
					"terms": {"size":10000,"field": "bit.keyword"}
				}
			}
		}

		var guests = {
			"filter": this.query_primitive()
			,"aggregations": {
				"filtered_guests": {
					"terms": {"size":10000,"field": "episode_guests.comma_del"}
				}
			}
		}

		var tags = {
			"filter": this.query_primitive()
			,"aggregations": {
				"filtered_tags": {
					"terms": {"size":10000,"field": "tags.comma_del"}
				}
			}
		}

		var episodes = {
			"filter": this.query_primitive()
			,"aggregations": {
				"filtered_episodes": {
					"terms": {"size":10000,"field": "episode.keyword"}
				}
			}
		}

// aggs stem
var aggs = {
	"all_bits": {
		"global": {},
		"aggregations": {
		}
	}
}

		// null out facets we don't want
		if(appQuery.get("raw").indexOf("episode:")>=0){
			guests=null;
		}

		if(guests!==null){aggs.all_bits.aggregations.guests=guests}
			if(tags!==null){aggs.all_bits.aggregations.tags=tags}
				if(bits!==null){aggs.all_bits.aggregations.bits=bits}
					if(episodes!==null){aggs.all_bits.aggregations.episodes=episodes}


						return {
							"size" : 10000,
							"query": this.query_primitive('full'),
							"aggregations": aggs
						}

					}
					,querystringSOLR:function(){


						var facetadd = '';

						var A = appState.facetArray();

						if(A.length>0){
							facetadd=' AND ('+A.join(" AND ")+")";
						}



						var Q1 = this.get("query_root")+'&q='+this.get("raw");
						var Q2 = Q1+facetadd

						return Q2;

					}

})//Query
