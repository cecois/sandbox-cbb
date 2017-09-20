var Bits = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			// &json.wrf=parse
			u = 'http://localhost:8983/solr/cbb_bits/select?indent=off&rows=50&json.wrf=cwmccallback&wt=json&q='+encodeURI(appQuery.get("querystring"))

					// return Config.SOLRROOT+"select/?version=2.2&rows=50&indent=off&wt=json&json.wrf=cwmccallback&q=" + quQuery.get_query()


					break;
					default:
					u = CONFIG.index_root+encodeURI(appQuery.get("querystring"))
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

		return data.response.docs
	}

})//extend