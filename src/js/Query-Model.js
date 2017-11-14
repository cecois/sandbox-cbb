var Query = Backbone.Model.extend({
	defaults:{
		// qroot:"http://solr-lbones.rhcloud.com/cbb_bits/select?json.wrf=cwmccallback&wt=json&q="
		// &facet.query=holding:false AND " + appCartoQuery.get("solrstring") + "&wt=json&facet=true&facet.field=episode&facet.field=fat_name&facet.field=tags&facet.field=slug_earwolf&json.nl=arrarr&facet.mincount=1"
		// querystring:"*:*"
		// querystring:null
		recordOffset:0
		// ,numRows:20
		,page:1
		// ,facetstring:"&facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap"
		// ,query_root:'indent=off&rows=20&facet=true&facet.mincount=1&json.wrf=cwmccallback&wt=json&fl=tstart,_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags'
		// +'&facet.field=tags'
		// +'&facet.field=guests'
		// +'&facet.field=fat_name'
		// +'&json.nl=arrmap'
		// +'&facet.field={!ex=bitf}fat_name'
		// +'&facet.field={!ex=tagsf}tags'
		// +'&facet.field={!ex=guestsf}guests'
		// ,facetstring:'&facet=true&facet.mincount=1'
		// +'&facet.field=fat_name'
		// +'&facet.query='
		// +'&facet.field={!ex=tagsf}tags'
		// +'&facet.field={!ex=guestsf}guests'

		// &facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap
		// q=episode%3A333&fq={!tag%3Dbitf}bit%3ALocation&fq=episode%3A333&rows=0&wt=json&indent=true&facet=true&facet.mincount=1&facet.field={!ex=bitf}bit
	}
	,query_facetadd:function(){

		// var A = appQueryFacets.facetArray();
		var A = []

		_.each(this.get("facetstring").join(","),function(m){
			for ( var prop in m.attributes ) {
				if ( m.attributes.hasOwnProperty(prop) ) {
					var bt = prop;
				}
			}
			A.push(bt+":"+m.get(bt))
		})


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

		// var facetadd=(A.length>0)?' AND ('+A.join(" AND ")+")":'';
		var facetadd=(AA.length>0)?' AND ('+AA.join(" AND ")+")":'';
		
		return facetadd;
	}
	,query_primitive:function(which){

		var fac = (typeof which == 'undefined' || which == null)?'':this.query_facetadd();

		return {
			"query_string" : {
				"default_operator" : "AND",
				"query" : (this.get("raw")+fac)
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
					"terms": {"size":1000,"field": "bit.keyword"}
				}
			}
		}

		var guests = {
			"filter": this.query_primitive()
			,"aggregations": {
				"filtered_guests": {
					"terms": {"size":1000,"field": "episode_guests.comma_del"}
				}
			}
		}

		var tags = {
			"filter": this.query_primitive()
			,"aggregations": {
				"filtered_tags": {
					"terms": {"size":1000,"field": "tags.comma_del"}
				}
			}
		}

		var episodes = {
			"filter": this.query_primitive()
			,"aggregations": {
				"filtered_episodes": {
					"terms": {"size":1000,"field": "episode.keyword"}
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
							"size" : 100,
							"query": this.query_primitive('full'),
							"aggregations": aggs
						}

					}
					,querystringSOLR:function(){


		// var facetadd = (appState.get("facets").indexOf(",")>=0)?" AND ("+appState.get("facets").split(",").join(" AND ")+")":'';
		var facetadd = '';

		// if(appState.get("facets").indexOf(",")>0){
		// 	facetadd=' AND '+appState.get("facets").split(",")
		// } else if(appState.get("facets")!==""){
		// 	facetadd=' AND '+appState.get("facets")
		// }
		// 
		// 
		var A = appState.facetArray();

		if(A.length>0){
			facetadd=' AND ('+A.join(" AND ")+")";
		}



		// http://10.0.0.150:8983/solr/cbb_bits/select?q=episode:333
		var Q1 = this.get("query_root")+'&q='+this.get("raw");
		// &fq=episode:333


		// var FQ1 = '&fq={!tag=bitf}bit:Location'
		// var FQ = '&'+fqz.join("&")
		//var FQ2 = &fq={!tag%3Dtagsf}&fq={!tag%3Dguestsf}'
		var Q2 = Q1+facetadd
		// +FQ
		// +FQ1;
		// var FQ2 = '&fq={!tag=bitf}'+facetadd
		// var Q3 = Q1
		// +FQ1
		// +FQ2
		// 
		
		// WORKS:
		// http://10.0.0.150:8983/solr/cbb_bits/select?q=episode:333
		// &fq=episode:333
		// &rows=0
		// &wt=json
		// &indent=true
		// &facet=true
		// &facet.mincount=1
		// &facet.field={!ex=bitf}fat_name

		// console.log("Q1:",Q1);
		// console.log("FQ:",FQ);
		// console.log("Q2:",Q2);

		return Q2;

	}

})//Query
