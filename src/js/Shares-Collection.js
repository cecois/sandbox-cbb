var Shares = Backbone.Collection.extend({
	model: Share,
	url: null,
	initialize: function(options) {
		options || (options = {});
		return this
	}
}); //shares