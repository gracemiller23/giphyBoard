var topics = ["Ali Wong", "Amy Schumer", "Kevin Hart", "Dave Chapelle", "Jim Gaffigan", "Daniel Tosh"];

$(document).ready(function(){
    $("#more-gifs").hide();
    createButtons();
    getGIFs();
    newTopic();
});


//api function to pull gifs when a button from the topics array is clicked
function getGIFs(){
$("#buttons").on("click", "button", function () {
    var comedian = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        comedian + "&limit=10&api_key=JS5W7YN8LDrCq0DOfPlUINBtxyvdVVdj";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
            var results = response.data;
            console.log(queryURL);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gif-div'>");
                var rating = results[i].rating.toUpperCase();
                var title = results[i].title;
                var heading = $("<h2>").text(title);
                var p = $("<p>").text("Rating: " + rating);
                var comedianGif = $("<img>").attr({
                    "src": results[i].images.fixed_height_still.url,
                    "class": "gif",
                    "data-state":"still",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url
                });

                $(gifDiv).append(heading, comedianGif, p);
                $("#gifs").prepend(gifDiv);
                $("#more-gifs").show();
            }
            pauseGifs();
            displayMore(comedian);
        });
    });
}

//loop to generate buttons from array of comedians
function createButtons(){
    $("#buttons").empty();
    for (var j=0; j < topics.length; j++){
        var newButton = $("<button>");
        $(newButton).attr("data-person", topics[j]).text(topics[j]);
        $("#buttons").append(newButton);
    };
    emptyForm();
};

//empty the search text box after the value is submitted
function emptyForm(){
    $("#new-topic").val("");
}

//function to add new entries to the topics array
function newTopic(){

    $("#submit-btn").on("click", function(event){
       event.preventDefault();
       var topicAdd = $("#new-topic").val().trim();
       //prevent blank buttons from being created
       if (topicAdd === ""){
        return
       }else{
       topics.push(topicAdd);
       createButtons();
        }
    });

};
//gifs load as still images, but animate or become still on click
function pauseGifs(){
    
    $(".gif-div").on("click", "img", function(){
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");
        if ( state === "still"){
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });
}

function displayMore(comedian){
   
    $("#more-gifs").on("click", function(){
    
        var clicks = $(this).attr("data-clicks")+1
       var offset = clicks * 10;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    comedian + "&offset="+ offset +"&limit=10&api_key=JS5W7YN8LDrCq0DOfPlUINBtxyvdVVdj";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
            var results = response.data;
            console.log(queryURL);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gif-div'>");
                var rating = results[i].rating;
                var title = results[i].title;
                var heading = $("<h2>").text(title);
                var p = $("<p>").text("Rating: " + rating);
                var comedianGif = $("<img>").attr({
                    "src": results[i].images.fixed_height_still.url,
                    "class": "gif",
                    "data-state":"still",
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url
                });

                $(gifDiv).append(heading, comedianGif, p);
                $("#gifs").append(gifDiv);
            }
    });
   
    $(this).attr("data-clicks", clicks);
});}