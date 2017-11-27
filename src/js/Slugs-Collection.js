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
	}
	,active: function(){

		var a = this.findWhere({active:'is-active'})

		return a

	}//active
})//extend
