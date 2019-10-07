$(document).ready(function() {

    var topics = ["Rick and Morty", "Batman", "Space", "The Office", "Beagles", "Bob's Burgers", ];

    function displayInfo() {
        $("#gif-view").empty();
        var topic = $(this).attr("topic-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=euSDt6A81v13PssJgeUQWnDSNU1hbYeb&limit=12";
        
        $.ajax({url: queryURL, method: "GET"})
        .then(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                var gifDiv = $("<div>");
                gifDiv.addClass("displayedGIf");

                var rating = results[i].rating;
                var pRating = $("<p>").text("Rating: " + rating);

                var urlStill = results[i].images.fixed_height_still.url;
                var urlPlay = results[i].images.fixed_height.url;

                var gifImage = $("<img>");
                gifImage.addClass("gif");
                gifImage.addClass("col-md-4");
                gifImage.attr("src", urlStill);
                gifImage.attr("data-still", urlStill);
                gifImage.attr("data-animate", urlPlay);
                gifImage.attr("data-state", "still");

                gifDiv.append(gifImage);
                gifDiv.append(pRating);

                $("#gif-view").append(gifDiv);
            }

            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>");

            newButton.addClass("topic");
            newButton.attr("topic-name", topics[i]);
            newButton.text(topics[i]);
            $("#buttons-view").append(newButton);
        }
    }

    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();

        topics.push(topic);
            $("#topic-input").val("");
        renderButtons();
    });

    $(document).on("click", ".topic", displayInfo);

    renderButtons();

});


