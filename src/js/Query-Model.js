var Query = Backbone.Model.extend({
	defaults:{
		// qroot:"http://solr-lbones.rhcloud.com/cbb_bits/select?json.wrf=cwmccallback&wt=json&q="
		// &facet.query=holding:false AND " + appCartoQuery.get("solrstring") + "&wt=json&facet=true&facet.field=episode&facet.field=fat_name&facet.field=tags&facet.field=slug_earwolf&json.nl=arrarr&facet.mincount=1"
		querystring:"*:*"
		,numRows:20
		,recordOffset:0
		,page:1
		,facetstring:"facet=true&facet.mincount=1&facet.field=fat_name&facet.field=tags&json.nl=arrmap"
	}


})//Query