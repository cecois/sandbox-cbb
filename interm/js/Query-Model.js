var Query = Backbone.Model.extend({
	defaults:{
		// qroot:"http://solr-lbones.rhcloud.com/cbb_bits/select?json.wrf=cwmccallback&wt=json&q="
		// &facet.query=holding:false AND " + appCartoQuery.get("solrstring") + "&wt=json&facet=true&facet.field=episode&facet.field=fat_name&facet.field=tags&facet.field=slug_earwolf&json.nl=arrarr&facet.mincount=1"
		// querystring:"*:*"
		// querystring:null
		numRows:20
		,facets:[]
		,recordOffset:0
		,page:1
		,facetstring:"&facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&facet.field=guests&json.nl=arrmap"
	}
	,querystring:function(){
		var facetadd = (this.get("facets").length>0)?" AND ("+this.get("facets").join(" AND ")+")":'';
		return this.get("raw")+facetadd+this.get("facetstring");
	}

})//Query
