var topics = ["Ali Wong", "Amy Schumer", "Kevin Hart", "Dave Chapelle", "Jim Gaffigan", "Daniel Tosh"];

$(document).ready(function(){
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
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var comedianGif = $("<img>").attr({
                    "class": "gif",
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state":"still"
                });

                $(gifDiv).append(comedianGif, rating);
                $("#gifs").prepend(gifDiv);
                pauseGifs();
            }
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
};

//function to add new entries to the topics array
function newTopic(){

    $("#submit-btn").on("click", function(event){
       event.preventDefault();
       var topicAdd = $("#new-topic").val().trim();
       console.log(topicAdd);
       topics.push(topicAdd);
       createButtons();
  
    });

};

function pauseGifs(){
    
    $(".gif").on("click", function(){
        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");
        if ( state === "still"){
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });
}


//api key JS5W7YN8LDrCq0DOfPlUINBtxyvdVVdj