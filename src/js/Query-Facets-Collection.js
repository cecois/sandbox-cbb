var QueryFacets = Backbone.Collection.extend({
	model:Bit
	,url:null
	,initialize:function(options){
		options||(options={})
	}
	,facet:function(F){

		if(typeof appQueryFacets.findWhere(F) == 'undefined'){
			this.add(F);} else {
				this.remove(appQueryFacets.findWhere(F))
			}

			
			return this

		}
		,
		facetArray: function(){

			var A = [];

			_.each(this.models,function(m){
				for ( var prop in m.attributes ) {
					if ( m.attributes.hasOwnProperty(prop) ) {
						var bt = prop;
					}
				}
				A.push(bt+":"+m.get(bt))
			})

			return A;
		}
})//extend
