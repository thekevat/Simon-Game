var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function soundPlay(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function Animate(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level = " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level = " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  Animate(randomChosenColour);
  soundPlay(randomChosenColour);
}
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  Animate(userChosenColor);
  soundPlay(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    soundPlay("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over, Press any key to restart.");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
