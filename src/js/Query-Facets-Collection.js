var QueryFacets = Backbone.Collection.extend({
	model:Bit
	,url:null
	,initialize:function(options){
		options||(options={})
	}
	,facet:function(F){

		console.log('findwhre',appQueryFacets.findWhere(F))

		if(typeof appQueryFacets.findWhere(F) == 'undefined'){
			console.log('not in there, adding...')
			this.add(F);} else {
				console.log('in there, removing...')
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
