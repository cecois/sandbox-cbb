var QueryView = Backbone.View.extend({
	el: $("#query-form")
	,template: CBB['templates']['queryViewTpl']
	,events: {
        // "click .activity-cancel": "stfu",
        "click #cbb-bt-search": 'set'
    }
    ,bindings: {
    	'input': 'raw'
    }
    ,initialize: function() {
    	return this
    	.render()
    },
    set: function(e){

        console.log(e);

        this.model.set({raw:"episode:200"})

        return this

    },
    render: function(){

    	$(this.el).html(this.template(this.model.toJSON()))

    	return this
        .stickit();
    }
});