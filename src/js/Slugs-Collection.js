var Slugs = Backbone.Collection.extend({
	model:Slug
	,url:null
	,initialize:function(options){
		options||(options={})
	}
	,switch: function(slug){
		
		this.invoke('set',{"active":false},{silent:true})

		var newm = this.map(function(m){
			if(m.get("slug")==slug){
				m.set({active:'is-active'})
			} else {
				m.set({active:false})	
			}
			return m
		})

		return this.reset(newm)
		// .activate(slug)
	}
	// ,activate: function(slug){
		


	// 	if(typeof slug !== 'undefined'){
	// 		// var nm = this.active()
	// 		var nm = this.findWhere({"slug":slug})
	// 		console.log("we gonna change this one:",nm.attributes);
	// 		nm.set({active:'is-active'},{silent:false})}
	// 		return this

	// }//activate
	,active: function(){

		var a = this.findWhere({active:'is-active'})

		return a

	}//active
})//extend
