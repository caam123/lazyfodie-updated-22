$(document).ready(function(){
    // ===firebase===

        var config = {
            apiKey: "AIzaSyCpq0tQ_Vkd6lMOA4s7dWmoTn45cTzIwvc",
            authDomain: "proyect1-27081.firebaseapp.com",
            databaseURL: "https://proyect1-27081.firebaseio.com",
            projectId: "proyect1-27081",
            storageBucket: "proyect1-27081.appspot.com",
            messagingSenderId: "998295644330"
        };
      
      firebase.initializeApp(config);
      var contadorjs = 0;

          
           
        var database = firebase.database();
        var searchTerm = "";
        var connectionsRef = database.ref("/connections");
        var connectedRef = database.ref(".info/connected");
            searchTerm = $("#ingredients").val().trim(); 

        database.ref().push({
        searchTerm:searchTerm,
        });  


          

        connectedRef.on("value", function(snap) {
            if (snap.val()) {
            var con = connectionsRef.push(true);
            console.log("guardar contador", contadorjs)
        
            }//Cierra If
        }) ; 


        database.ref("contador").on("value", function(snap){
            console.log("actualizar contador")
            console.log(snap.val().contador)
            contadorjs = snap.val().contador
            $(".visitas").text("Visitor "+ contadorjs + " thanks for coming!");    

        });


        connectionsRef.on("value", function(snapshot) {
            contadorjs ++ ;
            database.ref("contador").set({
                contador: contadorjs
            })
        });

 
        // var ref = firebase.database().ref(searchTerm);
        // ref.orderByChild(searchTerm).limitToLast(5).on("child_added", function(snapshot) {
        // console.log(snapshot.searchTerm);
        // // });


    // ===== Global Variables =====

    var ingredientsArray = [];
    var addedIngredient = "";
    var ingredientsString="";



    // ===== Add On click  ===== 
    $("#addIngredients").on("click", function(event) {
        event.preventDefault();
        addedIngredient = $("#ingredients").val().trim();

        if (addedIngredient == ""){
            $("#labelAdd").text("You're missing something, type me an ingredient!").addClass("invalid");
        }else{
            $("#labelAdd").text("Add another ingredient").addClass("valid");
        ingredientsArray.push(addedIngredient);
        $("#ingredients").val("");
        renderButtons();
        console.log("ingredientes sin borrar", ingredientsArray);

        ingredientsString = ingredientsArray.join("-");

        $(".recipesContainer").empty();
            
        ajaxCall();
        };

    }); 

    // Function that calls the quote each time you load the page
    ajaxAdvice();


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
            closeX.text("close");
            closeX.addClass("close material-icons");
            closeX.attr("data-name", ingredientsArray[i]);
            $(".chip").append(closeX);
    
        };

   
    // ===== CLOSE CHIPS ===== 
    $(document).on("click", ".close", function(){

        var parent = $(this).parent();
        var name = parent.data("name");
        console.log("CLick close");
        var adios = ingredientsArray.splice(ingredientsArray.indexOf(name), 1);
        console.log("adios", adios)    
        console.log("despues de borrar", ingredientsArray)
        console.log("ingredients strings", ingredientsString);
        $(".recipesContainer").empty();
        $("#labelAdd").text("Add another ingredient").addClass("valid");

        ajaxCall();
    }); 
        



    // ====================== AJAX CALL ===============================

    function ajaxCall(){
        ingredientsString = ingredientsArray.join("-");
        var key= "d700cd0ee0b7bf70739c9bd846d3080d"	;	
        var queryURL = "https://api.edamam.com/search?q=" +
        ingredientsString + "&to=12&app_id=" +  "f1e5b0de" + "&app_key=" + key;
        console.log(queryURL);
        
        
        
        console.log(queryURL);
                
        // metodo ajax  para objetener de la url lo que quermos
        $.ajax({
        url: queryURL, 
        method: "GET"
        })
        // hace una promesa. de que se cargue hasta .que lo de arriba este listo o no se ejecute mientras
        
        .then(function(response) {
        
            if (response.more == false){

                var noresultsContainer = $("<div>");
                    noresultsContainer.addClass("no-results");
                    $(".recipesContainer").append(noresultsContainer);
                    
                var noresultsText = $("<p>");
                    noresultsText.addClass("no-results-text");
                    noresultsText.text("Sorry, no results available for this query. Try again")
                    noresultsContainer.append(noresultsText);
                
                var noIcon = $("<i>");
                    noIcon.addClass("material-icons sad-face");
                    noIcon.text("sentiment_very_dissatisfied");
                    noresultsText.append(noIcon);
            }else{
                

            var results = response.hits;
            //console.log("Results", results);

            for (var i = 0; i < results.length; i++) {
                    // $(".recipesContainer").empty();

                var cardContainer = $("<div>");
                    cardContainer.addClass("cardContainer col s12 m6 l4 xl3");
                    $(".recipesContainer").append(cardContainer);

                var singleCard = $("<div>");
                    singleCard.addClass("card sticky-action col s12");
                    cardContainer.append(singleCard);
                    
                var imageContainer = $("<div>");
                    imageContainer.addClass("card-image waves-effect waves-block waves-light"); 
                    singleCard.append(imageContainer);
                
                    var image = response.hits[i].recipe.image;
                    //console.log(image);
                
                var imageCard = $("<img>");
                    imageCard.addClass("activator");
                    imageCard.attr("src", image);
                    imageContainer.append(imageCard);

                // ===== CARD CONTENT =====

                var cardContent = $("<div>");
                    cardContent.addClass("card-content");
                    singleCard.append(cardContent);    


                    var nameRecipe = response.hits[i].recipe.label;
                    //console.log(nameRecipe);
                
                var cardTitle = $("<div>");
                    cardTitle.addClass("cardTitle");
                    cardContent.append(cardTitle);

                var nombre = $("<div>");
                    nombre.addClass("card-title activator truncate flexTitle");
                    nombre.text(nameRecipe);    
                    cardTitle.append(nombre);

                var iconContainer = $("<div>");
                    iconContainer.addClass("card-title activator");
                    cardTitle.append(iconContainer);
                    
                var iconoMas = $("<i>");
                    iconoMas.addClass("material-icons small right");
                    iconoMas.text("add_circle");
                    iconContainer.append(iconoMas); 

                    var cookingTime = response.hits[i].recipe.totalTime;
                    //console.log(cookingTime);

                var cardTime = $("<div>");
                    cardTime.addClass("cardText");
                    cardContent.append(cardTime);

                    if (cookingTime === 0){
                        cookingTime = "N/A";
                        var time = $("<p>")
                        time.text(cookingTime);
                        cardTime.append(time);

                    }else{
                        var time = $("<p>")
                        time.text(cookingTime + " min");
                        cardTime.append(time);
                    };
                    

                
                var iconoReloj = $("<i>");
                    iconoReloj.addClass("material-icons left");
                    iconoReloj.text("timer");
                    time.append(iconoReloj);



                var calories = response.hits[i].recipe.calories;
                var parseCalories = parseInt(calories);
                //console.log(calories);

                var cardCalories = $("<div>");
                    cardCalories.addClass("cardText");
                    cardContent.append(cardCalories);

                var calorias = $("<p>");
                    calorias.text(parseCalories + " cal");
                    cardCalories.append(calorias);
                    
                var iconoFeliz = $("<i>");
                    iconoFeliz.addClass("material-icons left");
                    iconoFeliz.text("mood");
                    calorias.append(iconoFeliz);
                
                // =========== CARD REVEAL ============

                var servings = response.hits[i].recipe.yield;
                //console.log(servings);
                
                var reveal = $("<div>");
                    reveal.addClass("card-reveal");
                    singleCard.append(reveal);



                var titleReveal = $("<div>");
                    titleReveal.addClass("card-title flexTitle truncate");
                    titleReveal.text(nameRecipe);
                    reveal.append(titleReveal);

                var iconoContenedor = $("<div>");
                    iconoContenedor.addClass("card-title");
                    reveal.append(iconoContenedor);

                
                var closeReveal = $("<i>");
                    closeReveal.addClass("material-icons small right");
                    closeReveal.text("close");
                    iconoContenedor.append(closeReveal); 

                var yieldServings = $("<p>");
                    yieldServings.addClass("yields");
                    yieldServings.text(servings + " servings");
                    reveal.append(yieldServings);


                var ingredientsLines = response.hits[i].recipe.ingredientLines;
                    ////console.log(ingredientsLines)
            
                        var createlist= function() {
                        var list = $("<ul>");
                            reveal.append(list);
                            for (var e = 0; e < ingredientsLines.length; e++) {
                                var itemIngredient = ingredientsLines[e];
                                var itemList = $("<li>");
                                    itemList.text(itemIngredient);
                                    list.append(itemList);
                                }; // Cierra for loop
                        reveal.append(list)
                        } // Cierra createList function

                createlist()

                var source = response.hits[i].recipe.url
                    //console.log(source);

                var link= $("<a>");
                    link.addClass("waves-effect waves-light btn-small");
                    link.text("Full Recipe");
                    link.attr("href", source)
                    link.attr("target", "_blank");
                    reveal.append(link);


                var plusIcon = $("<i>");
                    plusIcon.addClass("material-icons right");
                    plusIcon.text("add");
                    link.append(plusIcon);

                }; // cierra loop results.length display de los resultados
            };
        
        });  // cierra Response 
        
    }; // Cierra Ajax Call


    // =============== AJAX CALL 2 FOR QUOTE

    function ajaxAdvice(){

        var queryURL = "https://api.adviceslip.com/advice";
  
          
        $.ajax({
            url:queryURL,
            method: "GET",
            jsonp: "callback",
        })
        .then(function(response){
  
          console.log("response", response);
  
          // NO entiendo que pas?? aqu?? pero finalmente funciona. Necesario un JSON.parse ??? dunno why!
          var resultados = JSON.parse(response);
          var advice = resultados.slip.advice;
           $("#quote").text(advice);
        });
  
      }




}); // La segunda cierra on document ready
    
