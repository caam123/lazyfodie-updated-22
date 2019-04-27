$(document).ready(function(){

var config = {
  apiKey: "AIzaSyCpq0tQ_Vkd6lMOA4s7dWmoTn45cTzIwvc",
  authDomain: "proyect1-27081.firebaseapp.com",
  databaseURL: "https://proyect1-27081.firebaseio.com",
  projectId: "proyect1-27081",
  storageBucket: "proyect1-27081.appspot.com",
  messagingSenderId: "998295644330"
};
firebase.initializeApp(config);

var ingredientsArray = [];
var addedIngredient = "";
var ingredientsString="";


// === Render buttons ===
function renderButtons(){

  $(".chipsRow").empty();

  for (var i = 0; i < ingredientsArray.length; i++) {
    var chipX = $("<div>");
    chipX.addClass("chip");
    chipX.attr("data-name", ingredientsArray[i]);
    chipX.text(ingredientsArray[i]);
    $(".chipsRow").append(chipX);

  };
  var closeX = $("<i>");
  closeX.text("close")
  closeX.addClass("close material-icons");
  $(".chip").append(closeX);
};

// === Add On click === 
$("#addIngredients").on("click", function(event) {
  event.preventDefault();
  addedIngredient = $("#ingredients").val().trim();
  ingredientsArray.push(addedIngredient);
  $("#ingredients").val("");
  renderButtons();
  console.log(ingredientsArray);
  ingredientsString = ingredientsArray.join("-");
  console.log(ingredientsString);

  ajaxCall();

      });



  function ajaxCall(){
    var key= "d700cd0ee0b7bf70739c9bd846d3080d"	;	
    var queryURL = "https://api.edamam.com/search?q=" +
    ingredientsString + "&app_id=" +  "f1e5b0de" + "&app_key=" + key;
      
      
      
    console.log(queryURL);
              
  // metodo ajax  para objetener de la url lo que quermos
    $.ajax({
    url: queryURL, 
    method: "GET"
    })
  // hace una promesa. de que se cargue hasta .que lo de arriba este listo o no se ejecute mientras
    
    .then(function(response) {

      console.log(response);
      var image = response.hits[0].recipe.image;
      console.log(image);
      var nameRecipe = response.hits[0].recipe.label;
      console.log(nameRecipe);           
      var cookingTime = response.hits[0].recipe.totalTime;
      console.log(cookingTime);
      var calories = response.hits[0].recipe.calories;
      console.log(calories);
      var servings = response.hits[0].recipe.yield;
      console.log(servings);
      var ingredientsLines = response.hits[0].recipe.ingredientLines;
      console.log(ingredientsLines)
      var source = response.hits[0].recipe.url
      console.log(source);
       });

  }
      



  

});








