$(document).ready(function () {

var moves = ["Svetlana Zakharova", "American Ballet Theater", "Fouette", "Corps de Ballet", "Grand Jete", "Pas de Deux", "Arabesque", "Paris Opera Ballet"];
var selectedButtonValue; 
var queryURL; 
var newMove;
displayButtons(); 
getButtonValue ();
addNew(); 

/*function 
--Gets button value which is the text of the button. 
--Stores that text and replaces any white space with + in a variable selectedButtonValue. 
--Empties out the giphs area so that the new gifs can appear. 
--Sends the selectedButtonValueto the getUrl function.*/
function getButtonValue () {
	$(".move-button").on("click", function() {
		
		$(".giphs").empty();
		
		selectedButtonValue = $(this).text(); 

		if(selectedButtonValue.indexOf(" ") >= 0){
			selectedButtonValue = selectedButtonValue.replace(/\s/g, "+");
		}

		getUrl(selectedButtonValue);  
	});
}	

/*function 
--Adds new buttons for new dance terms that user supplies. 
--Adds the new move to the moves array. 
--Calls displaysButtons to include the new button in the buttons above. 
--Empties the giphs area so that the newly entered move can have its gifs appear upon entering it. 
--Takes the newMove and takes out whitespace and gives it to the getURL function. */
function addNew () {
	$(".add-move").on("click", function (event) {
		event.preventDefault(); 
		newMove = $("#move").val(); 
					
		moves.push(newMove);
			
		$(".buttons-area").empty();
			displayButtons();

		$(".giphs").empty();
		if(newMove.indexOf(" ") >= 0){
			newMove = newMove.replace(/\s/g, "+");
		}
		getUrl(newMove); 
		getButtonValue();

	});
}

/* function 
--Displays buttons for items in the moves array and trims white space at the end of each array item if any */
function displayButtons () { 
	for (var i = 0; i < moves.length; i++) {
		moves[i]= moves[i].trim(); 
		var moveButton = $("<button type='button' class='btn btn-default move-button'>" + moves[i] + "</button>");
		$(".buttons-area").append(moveButton);
	}
}

/* function 
--Goes out to the giphy API with the url this function builds.
--Calls the renderGifs funtion which makes the gifs from the giphy API appear.*/
function getUrl (moveTerm) {
	queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +  moveTerm + "&api_key=dc6zaTOxFJmzC&limit=10";	
	renderGifs(); 
}

/* function 
--makes a GET request of the giphy API with the url from getUrl. 
--Inserts a label with directions above the gifs.
--Inserts a rating made to uppercase for each gif.
--Adds class "gif" to all gifs.
--Adds id of [i] to all gifs. 
--Adds a data-state of still to gifs upon first render.
--Adds the src of the image.
--Renders the images and the ratings.
*/
function renderGifs () {		
	$.ajax({
		url: queryUrl,
        method: "GET"
     })
		.done(function(response) {
         var results = response.data;
         console.log(response.data);

         $(".giphs").append("<label>Click gifs to animate or stop them</label><br>");
         for (var i = 0; i < results.length; i++) {
         	var rating = response.data[i].rating.toUpperCase(); 
         	
         	var a = $("<img>");
         		a.addClass("gif");
         		a.attr("id", [i]);
         		a.attr("data-state", "still");
         		a.attr("src", response.data[i].images.fixed_height_still.url);
         	$(".giphs").append(a);
         	
         	$(".giphs").append("<figcaption class='caption'>Rating: " + rating + "</figcaption></figure><br>");	 
         	} 

         /*listener on click of any gif with the class "gif" 
         --Changes the data state to "still or "animated" as needed to 
         stop and start the animation.*/
		$(".gif").on("click", function () {
		
			if ($(this).data("state") === "still") {
				var id = $(this).attr("id");
				$(this).attr("src",response.data[id].images.fixed_height.url);
				$(this).data("state", "animated");

			} else if ($(this).data("state") === "animated") {
				var id = $(this).attr("id");
				$(this).attr("src", response.data[id].images.fixed_height_still.url);
				$(this).data("state", "still");
			}

		});


    });
		
}


         	
});