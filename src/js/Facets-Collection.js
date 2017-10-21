var Facets = Backbone.Collection.extend({
	model:Bit
	,url:null
	,initialize:function(options){
		options||(options={})
	}
	,subset: function(sub){

		        // return this.filter(function( modul) { return modul.get('bit') == sub;});
		        this.reset(this.models)
		    }
})//extend
