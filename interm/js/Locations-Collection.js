var Locations = Backbone.Collection.extend({
	model:Bit
	,initialize:function(options){
		options||(options={})
		// this.listenTo(appState,'change:baselayer',this.switch)
	}
	,url: function(){

		var u =null;

		// var u= "http://localhost:8983/solr/cbb_carto/select?wt=json&json.wrf=cwmccallback&q=cartodb_id:829917"

		switch(CONFIG.mode) {
			case 'T':
			u = 'http://localhost:8983/solr/cbb_carto/select?wt=json&json.wrf=cwmccallback&q='+encodeURI(this.map(function(m){return "cartodb_id:"+UTIL.geom_id_nudge(m.get("location_type"),m.get("location_id"),"up")}).join(" OR "));
			break;
			default:
			u = CONFIG.geom_root+'wt=json&json.wrf=cwmccallback&q='+encodeURI(this.map(function(m){return "cartodb_id:"+UTIL.geom_id_nudge(m.get("location_type"),m.get("location_id"),"up")}).join(" OR "));
		}

		return u

	}
	,sync: function(method, collection, options) {
		options.dataType = "jsonp";
		options.jsonpCallback = 'cwmccallback';
		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {

		var drd = data.response.docs
		console.log("og models in parse",this.models);
		console.log("daa.resonse.docs",data.response.docs);

		var actuals = _.map(this.models,function(m){
			var the_geom_m = _.findWhere(drd,{cartodb_id:m.get("cartodb_id")})
			m.the_geom=the_geom_m.the_geom
			m.the_geom_anno=the_geom_m.anno
			m.the_geom_name=the_geom_m.name
			return m
		})

		console.log("actuals",actuals)
		// heres wehre where z ip back with bits?

		// return data.response.docs
		return actuals
	}

})//extend
