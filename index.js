var gamePattern=[];
var gameColors=['green','red', 'yellow', 'blue'];

function nextSequence(){
    userPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    gamePattern.push(gameColors[randomNumber]);
    $("#"+gameColors[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio=new Audio("./sounds/"+gameColors[randomNumber]+".mp3");
    audio.play();
}


function playSound(color){
    var audio=new Audio("./sounds/"+color+".mp3");
    audio.play();
}



var userPattern=[];
$(".btn").click(function(){
    var clickedColor=$(this).attr("id");
    userPattern.push(clickedColor);
    console.log(userPattern);
    playSound(clickedColor);
    userAnimation(clickedColor);
    checkAnswer(userPattern.length-1);
});


function userAnimation(color){
    $("#"+color).addClass("pressed");
    setTimeout(()=>{$("#"+color).removeClass("pressed");}, 100);

}

var gameStart=false;
var level=0;

$(document).keydown(function(){
    if(gameStart===false){
        gameStart=true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
})

function resetGame(){
    gameStart=false;
    level=0;
    gamePattern=[];
}

function checkAnswer(level){
    if (userPattern[level]===gamePattern[level]){
        console.log("Success");
        if (userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound('wrong');
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");}, 200
        );
        resetGame();
    }        
}

