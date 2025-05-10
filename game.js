var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
document.addEventListener('keydown', function () {
  if (level === 0) {
    $('h1').text('Level ' + level);
    nextSequence();
  }
});

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (gamePattern.length === userClickedPattern.length && level > 0) {
    checkAnswer(level - 1);
  }
});

function nextSequence() {
  level++;
  $('h1').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour)
    .fadeOut()
    .fadeIn();
  playSound(randomChosenColour);
}

//for button press music
function playSound(name) {
  var audio = new Audio('/sounds/' + name + '.mp3');
  audio.play();
}

//for button press animation
function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log('Hurrayyyy!!!');
    setTimeout(() => {
      nextSequence();
    }, 1000);
    userClickedPattern = [];
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
}
