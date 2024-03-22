var buttonColor = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var start = false;



$("body").on("keydown",function(){
    if(!start){
        nextSequence();
        $("#level-title").html("Level "+level);
        start=true;
    }
});

$(".btn").on("click", function () {
    var  userChosenColour = this.id;
    userClickPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickPattern.length-1);
});





function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        console.log("success");
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
            }  
    }
    else {  
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }      
}



function nextSequence() {
    userClickPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level "+level);
}



function playSound(soundName){
    var audio = new Audio("./sounds/"+soundName+".mp3");
    audio.play();
}



function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}



function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}