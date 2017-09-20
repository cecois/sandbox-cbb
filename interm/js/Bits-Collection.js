var Bits = Backbone.Collection.extend({
	model:Bit
	,url:function(){

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			// &json.wrf=parse
			u = 'http://localhost:8983/solr/cbb_bits/select?wt=json&q='+encodeURI(appQuery.get("querystring"))
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
	,sync : function(method, collection, options) {
		options.dataType = "jsonp";
		return Backbone.sync(method, collection, options);
	}
	,parse: function(r){
		return r.response
	}

})//extend