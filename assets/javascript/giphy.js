$(document).ready(function () {
	var topics = [
		"Rick and Morty",
		"Batman",
		"Space",
		"The Office",
		"Beagles",
		"Bob's Burgers",
	];

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

    renderButtons();

    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();

        topics.push(topic);
        $("#topic-input").val("");
        renderButtons();
    });
    
	function displayInfo() {
		$("#gif-view").empty();
		var topic = $(this).attr("topic-name");
		var queryURL =
			"https://api.giphy.com/v1/gifs/search?q=" +
			topic +
			"&api_key=euSDt6A81v13PssJgeUQWnDSNU1hbYeb&limit=12";

		$.ajax({ url: queryURL, method: "GET" }).then(function (response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				console.log(results[i]);

				var gifContainer = $("<div>");
				gifContainer.addClass("gif__container");

				var gifImgDiv = $("<div>");
				gifImgDiv.addClass("gif__img-div");

				var rating = results[i].rating;
				var pRating = $("<p>").text("Rating: " + rating);

                // var clickToPlay = $("<p>").text("Click to Play");
				// clickToPlay.addClass("clickToPlay");

				var urlStill = results[i].images.fixed_height_still.url;
				var urlPlay = results[i].images.fixed_height.url;

				var gifImage = $("<img>");
				gifImage.addClass("gif");
				gifImage.addClass("col-md-4");
				gifImage.attr("src", urlStill);
				gifImage.attr("data-still", urlStill);
				gifImage.attr("data-animate", urlPlay);
				gifImage.attr("data-state", "still");

				gifImgDiv.append(gifImage);
                // gifImgDiv.append(clickToPlay);
				gifContainer.append(gifImgDiv);
				gifContainer.append(pRating);

				$("#gif-view").append(gifContainer);
			}

			$(".gif").on("click", function () {
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


	$(document).on("click", ".topic", displayInfo);
});
