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
		,query_root:'indent=off&rows=20&facet=true&facet.mincount=1&json.wrf=cwmccallback&wt=json&fl=tstart,_id,episode,slug_earwolf,bit,instance,location_type,location_id,created_at,updated_at,elucidation,tags'
		+'&facet.field=tags'
		+'&facet.field=guests'
		+'&facet.field=fat_name'
		+'&json.nl=arrmap'
		+'&facet.field={!ex=bitf}fat_name'
		+'&facet.field={!ex=tagsf}tags'
		+'&facet.field={!ex=guestsf}guests'
		// ,facetstring:'&facet=true&facet.mincount=1'
		// +'&facet.field=fat_name'
		// +'&facet.query='
		// +'&facet.field={!ex=tagsf}tags'
		// +'&facet.field={!ex=guestsf}guests'

		// &facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap
		// q=episode%3A333&fq={!tag%3Dbitf}bit%3ALocation&fq=episode%3A333&rows=0&wt=json&indent=true&facet=true&facet.mincount=1&facet.field={!ex=bitf}bit
	}
	,query_primitive:function(){

		return {
			"query_string" : {
				"default_operator" : "AND",
				"query" : this.get("raw")
			}
		}

		return null

	}
	,queryobj:function(){


		return {
			"query": this.query_primitive(),
			"aggregations": {
				"all_bits": {
					"global": {},
					"aggregations": {
						"bits": {
							"filter": {
								"bool": {"must":[
								{
									"terms": {"episode": ["333"]}
								}
								]}
							},
							"aggregations": {
								"filtered_bits": {
									"terms": {"field": "bit.keyword"}
								}
							}
						},
						"tags": {
							"filter": {
								"bool": {"must":[
								{
									"terms": {"episode": ["333"]}
								}
								]}
							},
							"aggregations": {
								"filtered_tags": {
									"terms": {"field": "tags.comma_del"}
								}
							}
						},
						"guests": {
							"filter": {
								"bool": {"must":[
								{
									"terms": {"episode": ["333"]}
								}
								]}
							},
							"aggregations": {
								"filtered_guests": {
									"terms": {"field": "episode_guests.comma_del"}
								}
							}
						}
					}
				}
			}
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
