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
		// ,facetstring:'&facet=true&facet.mincount=1'
		// +'&facet.field=fat_name'
		+'&facet.field=tags&facet.field=guests&json.nl=arrmap'
		// +'&facet.query='
		+'&facet.field={!ex=bitf}fat_name'
		// +'&facet.field={!ex=tagsf}tags'
		// +'&facet.field={!ex=guestsf}guests'

		// &facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap
		// q=episode%3A333&fq={!tag%3Dbitf}bit%3ALocation&fq=episode%3A333&rows=0&wt=json&indent=true&facet=true&facet.mincount=1&facet.field={!ex=bitf}bit
	}
	,querystring:function(){
		

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



		var Q1 = this.get("query_root")+'&q='+this.get("raw");
		// var FQ1 = '&fq='+Q1
		var Q2 = this.get("raw")+facetadd;
		// var FQ2 = '&fq={!tag=bitf}'+facetadd
		var Q3 = Q1
		// +FQ1
		// +FQ2
		// 
		
		// console.log("ideal:");
		// console.log('&q=episode:333&fq={!tag=bitf}bit:Location&fq=episode:333&rows=0&wt=json&indent=true&facet=true&facet.mincount=1&facet.field={!ex=bitf}bit');

		// console.log("facetadd:",facetadd);
		// console.log("Q1:",Q1);
		// console.log("Q2:",Q2);
		console.log("Q3:",Q3);

		// return this.get("raw")+facetadd+this.get("facetstring");
		return Q3;
		// return '&q=episode:333&fq={!tag=bitf}bit:Location&fq=episode:333&rows=0&wt=json&indent=true&facet=true&facet.mincount=1&facet.field={!ex=bitf}bit';

	}

})//Query
