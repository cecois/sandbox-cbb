var SharesView = Backbone.View.extend({
    el: $("#cbb-bt-share"),
    template: CBB['templates']['sharesViewTpl'],
    initialize: function() {
        // this.collection.bind("change", this.render, this);
    },
    events: {
        // "click": "render"
        "click": "test"
        ,"click body > .modal-close": "close"
        // "click": "shorten"
        // "click": "shortenDEBUG"
    },
    shortenDEBUG0: function(){

        var longurl = captureState()


        appActivity.set({
            message: "FAKE shortening url for sharing..."
        })
        var self = this;

        var shawty = "fake.as.hell.url"
        appActivityView.stfu()

        return self.render(shawty)

    }
    ,close: function(e){

        console.log(e)

        $("#cbb-modal").removeClass("is-active")

        return this

    }
    ,test: function(){

        console.log("test.31")

        $("#cbb-modal").addClass("is-active")

        return this


    },
    shorten: function(){

        // var longurl = captureState()
// var longurl = encodeURIComponent(captureState())


appActivity.set({
    message: "shortening url for sharing..."
})
// shorten it w goo.gl

var self = this;

$.ajax({
    url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDpaSYbhk8jM56yn1J_Z4XeTHxIIncD_zw',
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: '{ longUrl: "' + longurl +'"}',
    dataType: 'json',
    success: function(data) {
        shawty = data.id;
        appActivityView.stfu()

        return self.render(shawty)
// return shawty.id

},
error: function(data){

    appActivity.set({
        message: "shortening FAILED!"
    })
    appActivityView.stfu()

    return self.errorout(data)

}
});

// return this.render($.parseJSON(shawted))
// return this.render(shawted)
// if(shawty.error !== 'undefined'){
// return this.render(shawty)} else {
//     return this.errorout(shawty)}

},
shortenDEBUG: function(){

    var longurl = captureState()


    appActivity.set({
        message: "shortening url for sharing..."
    })
// shorten it w goo.gl

var self = this;

console.info(longurl)

return 0

$.ajax({
    url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDpaSYbhk8jM56yn1J_Z4XeTHxIIncD_zw',
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: '{ longUrl: "' + longurl +'"}',
    dataType: 'json',
    success: function(data) {
        shawty = data.id;
        appActivityView.stfu()

        return self.render(shawty)
// return shawty.id

},
error: function(data){

    appActivity.set({
        message: "shortening FAILED!"
    })
    appActivityView.stfu()

    return self.errorout(data)

}
});

// return this.render($.parseJSON(shawted))
// return this.render(shawted)
// if(shawty.error !== 'undefined'){
// return this.render(shawty)} else {
//     return this.errorout(shawty)}

},
errorout: function(data){

    $("#share-container-modal").html("couldn't shortern the url with goo.gl - you can try if you want:<pre class='social-share-value'>"+captureState()+"</pre>")
    return this
    .show()
},
render: function(shaw) {

    var shawty = shaw


        // kill stragglers
        // $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy');

        // $("#share-container-modal").html(this.template(this.collection.toJSON()))

        var tagstring = "comedybangbang,"+appCartoQuery.get("facetarray").join(",")
        var tagstringfinal = tagstring.replace(/,\s*$/, "").replace(/\s+/g, '').replace(/tags\:/g,'').replace(/\"/g,'')

        $("#share-container-modal").html(this.template({
            shares: this.collection.toJSON(),
            purl: shawty,
            query: appCartoQuery.get("displaystring"),
            tags: tagstringfinal,
            copy: "Look! Look! It's a map of @comedybangbang."
        }));

        return this
        // .show()
    },
    // show: function() {
    //     // $("#share-container-modal").removeClass('hidden')
    //     $('#cbb-modal').modal()
    //     // $('#share-container-modal').modal()

    //     return this
    // },
    reset: function() {
        return this.render()
    }
});