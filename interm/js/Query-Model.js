var Query = Backbone.Model.extend({
	defaults:{
		// qroot:"http://solr-lbones.rhcloud.com/cbb_bits/select?json.wrf=cwmccallback&wt=json&q="
		// &facet.query=holding:false AND " + appCartoQuery.get("solrstring") + "&wt=json&facet=true&facet.field=episode&facet.field=fat_name&facet.field=tags&facet.field=slug_earwolf&json.nl=arrarr&facet.mincount=1"
		// querystring:"*:*"
		// querystring:null
		numRows:20
		,recordOffset:0
		,page:1
		// ,facetstring:"&facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap"
		,facetstring:'&facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap&facet.query='

		// &facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap
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



		var Q1 = this.get("raw");
		var Q2 = this.get("raw")+facetadd;
		var Q3 = Q2+this.get("facetstring")+Q1

		console.log("facetadd:",facetadd);
		console.log("Q1:",Q1);
		console.log("Q2:",Q2);
		console.log("Q3:",Q3);

		// return this.get("raw")+facetadd+this.get("facetstring");
		return Q3;

	}

})//Query
