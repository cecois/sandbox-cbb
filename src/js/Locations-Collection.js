var Locations = Backbone.Collection.extend({
	model:Bit
	,url:null
	,initialize:function(options){
		options||(options={})
		// this.listenTo(appState,'change:baselayer',this.switch)
	}

})//extend