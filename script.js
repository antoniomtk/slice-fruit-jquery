var play = false;
var score;
var trialsLeft;
var step;
var action; // used for set interval function
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];

$(function(){
   // click on start reset button
   $("#start-reset").click(function() {
      // if playing
      if(play == true) {
         location.reload();
      // if not playing
      } else {
         play = true; // game started  
         $("#game-over").hide();       
         score = 0; // set score to zero
         $("#score").css("display", "block");  
         $("#score-value").html(score); 
         // show trials left
         $("#trials").show();
         $("#trials-left").show();
         trialsLeft = 3;
         addHearts();             
         // change button text to reset game
         $("#start-reset").text("Reset Game");
         // starting with fruit flow
         startFruits();
      }
   });

   $('#fruit1').mouseover(function(){
      score++;
      $('#score-value').html(score); 
      $('#slicesound')[0].play(); // play sound when mouse is over fruit
      // fruit is sliced, stop animation and hide fruit
      clearInterval(action);      
      $('#fruit1').hide("explode", 500);
      // send new fruit
      setTimeout(startFruits, 700); // wait until animation is done and then send new fruit
   });

   function addHearts() {
      $("#trials-left").empty(); 
      for(var i = 0; i < trialsLeft; i++ ) {
         $("#trials-left").append('<img src="images/heart.png" class="life">');
      }
   }

   function startFruits() {
      // generate a fruit
      $('#fruit1').show();
      chooseFruit(); //choose a random fruit
      $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
      // generate random step of fruit
      step = 1 + Math.round(5 * Math.random());
      action = setInterval(function() {
         $("#fruit1").css('top', $("#fruit1").position().top + step);
         // check if fruit is to low
         if($("#fruit1").position().top > $("#fruits-container").height()) {
            // check if any atempts left
            if(trialsLeft > 1) {
               // generate a fruit
               $('#fruit1').show();
               chooseFruit(); // Choosing random fruit   
               $("#fruit1").css({'left': Math.round(550 * Math.random()), 'top': -50});
               // generate random speed of fruit
               step = 1 + Math.round(6 * Math.random());
               // reduce attempts by 1
               trialsLeft--;
               addHearts(); // populate hearts box with attempts left
            } else {
               // game over
               play = false;
               $("#start-reset").html("Start Game");
               $('#game-over').show();
               $('#game-over').html('<p><h2>Game Over!</h2></p><p>Your score is '+ score +'</p>');
               $("#trials-left").hide();
               $("#trials").hide();   
               $("#score").hide();  
               clearInterval(action); // stop dropping fruits
               $('#fruit1').hide();
            }
         }
      }, 10);
   }

   function chooseFruit() {
      $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] +'.png');  
   }
   
});