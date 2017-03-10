$(document).ready(function () {

var moves = ["Svetlana Zakharova", "American Ballet Theater", "Fouette", "Corps de Ballet", "Grand Jete", "Pas de Deux", "Arabesque", "Paris Opera Ballet"];
var gifs = [
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	},
	{ 
		rating: "", 
		src: "",
		state: ""
	}
];

var selectedButtonValue; 
var queryURL; 
var newMove;
var results; 
displayButtons(); 
getButtonValue ();
addNew(); 

/*function gets button value which is the text of the button and replaces any white space with +. */
function getButtonValue () {
	$(".move-button").on("click", function() {
		$(".giphs").empty();
		selectedButtonValue = $(this).text(); 
		console.log(selectedButtonValue);
		if(selectedButtonValue.indexOf(" ") >= 0){
			selectedButtonValue = selectedButtonValue.replace(/\s/g, "+");
		}
		console.log(selectedButtonValue);
		getUrl(selectedButtonValue); 
		// addNew(); 
	});
}	

/*function adds new buttons for new dance terms */
function addNew () {
	$(".add-move").on("click", function (event) {
		event.preventDefault(); 
		newMove = $("#move").val(); 
			console.log(newMove);		
		moves.push(newMove);
			console.log(moves);
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

/* function displays buttons for item in the array and trims white space at the end of each array item if any */
function displayButtons () { 
	for (var i = 0; i < moves.length; i++) {
		moves[i]= moves[i].trim(); 
		var moveButton = $("<button type='button' class='btn btn-default move-button'>" + moves[i] + "</button>");
		$(".buttons-area").append(moveButton);
	}
}

/* goes out to the giphy API and renders the first 10 gifs for the topic of the button */
function getUrl (moveTerm) {
	queryUrl = "http://api.giphy.com/v1/gifs/search?q=" +  moveTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryUrl);
	renderGifs(); 
}

function renderGifs () {		
	$.ajax({
		url: queryUrl,
        method: "GET"
     })
		.done(function(response) {
         results = response.data;
         console.log(response.data);
       


for (var i = 0; i < results.length; i++) {
    gifs[i].rating = response.data[i].rating.toUpperCase(); 
      	var a = gifs[i].src;
      	 	a = $("<img>");
        	a.addClass=("gifStill");
         	a.attr("id", [i]);
         	a.attr("state", "still");
       		a.attr("src", response.data[i].images.fixed_height_still.url);
       	$(".giphs").append(a);
       	console.log(a); 
         	// $(".giphs").append("<figure><img class='gifStill' src='" + response.data[i].images.fixed_height_still.url+ "'>");
        $(".giphs").append("<figcaption class='caption'>Rating: " + gifs[i].rating + "</figcaption></figure><br>");	 

       	$("#0").on("click", function animate (){
         	var b = $(this);
		  	b.attr("state", "animated");
		  	b.attr("src", response.data[0].images.fixed_height.url);
         	$("#0").html(b);
         		
         });


} 

	});
}    




		



});