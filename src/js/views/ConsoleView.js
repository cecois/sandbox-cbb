var ConsoleView = Backbone.View.extend({
    el: $("#consoleContainer"),
    template: CBB['templates']['consoleViewTpl'],
    initialize: function() {
        this.render();
        this.listenTo(appCartoQuery, "change", this.render)
        this.model.bind("change", this.render, this);
    },
    render: function() {
        if (this.model.get("error") == true) {
            $(this.el).addClass("error")
        }
        $(this.el).html(this.template(this.model.toJSON()))
        return this;
    },
    reset: function() {
        this.model.set({
            message: "Hi, I'm Console."
        })
        return this.render()
    }
});