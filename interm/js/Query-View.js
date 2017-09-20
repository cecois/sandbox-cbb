var QueryView = Backbone.View.extend({
	el: $("#query-form")
	,template: CBB['templates']['queryViewTpl']
	,events: {
        // "click .activity-cancel": "stfu",
    }
    ,bindings: {
    	'input': 'querystring'
    }
    ,initialize: function() {
    	return this
    	.render()
    },
    render: function(){

    	$(this.el).html(this.template(this.model.toJSON()))

    	return this.stickit();
    }
});