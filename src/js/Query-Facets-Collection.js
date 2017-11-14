var QueryFacets = Backbone.Collection.extend({
	model:Bit
	,url:null
	,initialize:function(options){
		options||(options={})
	}
	,facet:function(F){

		console.log('testing aQF for ',F)
		console.log('where aQF.models is currnetly',this.models)
		if(typeof appQueryFacets.findWhere(F) == 'undefined'){
			console.log('wasnt there, adding...')
			this.add(F);} else {
				console.log('extant, removing...')
				this.remove(appQueryFacets.findWhere(F))
			}

			console.log('now is:',this.models)

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
