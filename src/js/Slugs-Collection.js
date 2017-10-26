var Slugs = Backbone.Collection.extend({
	model:Slug
	,url:null
	,initialize:function(options){
		options||(options={})
	}
	,switch: function(slug){
		
		this.invoke('set',{"is-active":false},{silent:true})
		return this
		.activate(slug)
	}
	,activate: function(slug){
		

		if(typeof slug !== 'undefined'){
			var nm = this.active()
			nm.set({active:'is-active'})}
			return this

	}//activate
	,active: function(){

		var a = this.findWhere({active:'is-active'})

		return a

	}//active
})//extend
