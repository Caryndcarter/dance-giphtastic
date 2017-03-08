$(document).ready(function () {

var moves = ["Svetlana Zakharova", "American Ballet Theater", "Fouette", "Misty Copeland", "Pirouettes", "Pointe Shoes", "Grand Jete", "Ballet Barre", "Arabesque"];
var buttonValue = ""; 
var queryURL = ""; 
displayButtons (); 
renderGifs(); 

function displayButtons () {
	for (var i = 0; i < moves.length; i++) {
		var moveButton = $("<button type='button' class='btn btn-default move-button' value=" + moves[i] + ">" + moves[i] + "</button>");
		$(".buttons-area").append(moveButton);
	}
}

function renderGifs () {
	$(".move-button").on("click", function() {
		buttonValue = $(this).attr("value"); 
		console.log(buttonValue);
		queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + buttonValue + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryUrl);
		
		
		
	});
}
		

			// $.ajax({
	// 	url: queryURL,
 //        method: "GET"
 //     })
	// 	.done(function(response) {
 //         var results = response.data;
 //         console.log(response.data);
	// });
//       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
//         person + "&api_key=dc6zaTOxFJmzC&limit=10";

//       $.ajax({
//           
//         

//           for (var i = 0; i < results.length; i++) {
//             var gifDiv = $("<div class='item'>");

//             var rating = results[i].rating;

//             var p = $("<p>").text("Rating: " + rating);

//             var personImage = $("<img>");
//             personImage.attr("src", results[i].images.fixed_height.url);

//             gifDiv.prepend(p);
//             gifDiv.prepend(personImage);

//             $("#gifs-appear-here").prepend(gifDiv);
//           }
//         });	


});