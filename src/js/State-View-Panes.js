var StateViewPanes = Backbone.View.extend({
    el: $("#cbb-main-panes")
    // ,template_home: CBB['templates']['0-home']
    ,initialize: function() {


        this.model.bind("change:slugs", this.render, this);
        return this
        .render();
    }
    ,setp: function(e){

        e.preventDefault()

        appState.slugify($(e.currentTarget).attr("data-id"))

        return this
    }
    ,render: function(){

        var s = _.findWhere(this.model.get("slugs"),{active:"is-active"}).slug

        var tpl = null;
        tpl=CBB['templates']['0-'+s]

        $('.cbb-main-pane').each(function(){

            if($(this).hasClass("hidden")==false){
                $(this).addClass("hidden")
            }

        })
// $(this.el).find(".cbb-main-pane").
var subel = $( ".cbb-main-pane[id='pane-"+s+"']" )
if(s!=='search'){
    $(subel).html("this yo subel-->"+s)} 
    if($(subel).hasClass('hidden')){$(subel).removeClass('hidden')}
        // $(this.el).html(tpl(this.model.toJSON()))


    return this
}
});