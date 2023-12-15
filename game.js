console.log("Welcome to my game");
//setting points, lives and initial position of the items
let points, lives;
const gameTime = 31;
console.log("time is 30 seconds");
let gameRunning;
let timeLeft;
let BgMusic = true;

window.addEventListener("load", titleScreen);

function titleScreen() {
    console.log("titleScreen")
    gameRunning = false;
    stopSounds();


    document.querySelector("#level_complete").classList.add("hidden");
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#instructions_screen").classList.add("hidden");
    document.querySelector("#title_screen").classList.remove("hidden");
    document.querySelector("#playNow").addEventListener("click", start);
    document.querySelector("#seeInstructions").addEventListener("click", instructionScreen);
}

function instructionScreen() {
    console.log("InstructionScreen")
    gameRunning = false;
    // document.querySelector("#title_screen").classList.add("hidden");  
    document.querySelector("#instructions_screen").classList.remove("hidden");
    document.querySelector("#back").addEventListener("click", titleScreen);
}

function start() {
    console.log("game starting now");
    document.querySelector("#BgMusic").play();
    gameRunning = true;
    points = 0;
    lives = 3;
    timeLeft = gameTime;

    showTime();
    document.querySelector("#game").classList.value = "";
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector(".play_again1").addEventListener("click", restartGame);
    document.querySelector(".play_again2").addEventListener("click", restartGame);

    //bad objects
    document.querySelector("#biscuit_container").addEventListener("click", hitBad);
    //document.querySelector("#biscuit_container").addEventListener("animationiteration", hitBad);
    document.querySelector("#donut_container").addEventListener("click", hitBad);
    //document.querySelector("#donut_container").addEventListener("animationiteration", hitBad);
    document.querySelector("#ball_container").addEventListener("click", hitBad);
    //document.querySelector("#ball_container").addEventListener("animationiteration", hitBad);
    document.querySelector("#chickenLeg_container").addEventListener("click", hitBad);
    //document.querySelector("#chickenLeg_container").addEventListener("animationiteration", hitBad);

    //good objects
    document.querySelector("#note_container").addEventListener("click", hitGood);
    //document.querySelector("#note_container").addEventListener("animationiteration", hitGood);
    document.querySelector("#Mglasses_container").addEventListener("click", hitGood);
    //document.querySelector("#Mglasses_container").addEventListener("animationiteration", hitGood);
    document.querySelector("#torch_container").addEventListener("click", hitGood);
    //document.querySelector("#torch_container").addEventListener("animationiteration", hitGood);
    document.querySelector("#footprints_container").addEventListener("click", hitGood);
    //document.querySelector("#footprints_container").addEventListener("animationiteration", hitGood);

    //set all animations for bad elements
    document.querySelector("#biscuit_container").classList.add("position");
    document.querySelector("#biscuit_container").classList.add("fallDown");
    document.querySelector("#biscuit_container").classList.add("speed4");
    document.querySelector("#donut_container").classList.add("position2");
    document.querySelector("#donut_container").classList.add("fallDown");
    document.querySelector("#donut_container").classList.add("speed1");
    document.querySelector("#ball_container").classList.add("position3");
    document.querySelector("#ball_container").classList.add("fallDown");
    document.querySelector("#ball_container").classList.add("speed5");
    document.querySelector("#chickenLeg_container").classList.add("position4");
    document.querySelector("#chickenLeg_container").classList.add("fallDown");
    document.querySelector("#chickenLeg_container").classList.add("speed3");

    //set all animations for good elements
    document.querySelector("#note_container").classList.add("position5");
    document.querySelector("#note_container").classList.add("fallDown");
    document.querySelector("#note_container").classList.add("speed5");
    document.querySelector("#Mglasses_container").classList.add("position6");
    document.querySelector("#Mglasses_container").classList.add("fallDown");
    document.querySelector("#Mglasses_container").classList.add("speed2");
    document.querySelector("#torch_container").classList.add("position7");
    document.querySelector("#torch_container").classList.add("fallDown");
    document.querySelector("#torch_container").classList.add("speed4");
    document.querySelector("#footprints_container").classList.add("position8");
    document.querySelector("#footprints_container").classList.add("fallDown");
    document.querySelector("#footprints_container").classList.add("speed2");

    //UI stuff here
    document.querySelector("#currentTime").classList.add("sec30");
    document.querySelector("#currentLives").classList.add("heart3");
    document.querySelector("#currentScore").classList.add("score0");
    document.querySelector("#home_button").classList.add("home_icon");
    document.querySelector("#sound_button").classList.add("soundOn");

    //UI clickable elements
    document.querySelector("#home_container").addEventListener("click", goHome);
    document.querySelector("#sound_container").addEventListener("click", changeSound);
}

function goHome() {
    console.log("you clicked the home button");
    gameRunning = false;
    stopSounds();
    //remove all animations from items
    document.querySelector("#biscuit_container").classList.value = "";
    document.querySelector("#donut_container").classList.value = "";;
    document.querySelector("#ball_container").classList.value = "";
    document.querySelector("#chickenLeg_container").classList.value = "";
    document.querySelector("#note_container").classList.value = "";
    document.querySelector("#Mglasses_container").classList.value = "";
    document.querySelector("#torch_container").classList.value = "";
    document.querySelector("#footprints_container").classList.value = "";
    document.querySelector("#currentLives").classList.value = "";
    document.querySelector("#currentScore").classList.value = "";

    //remove all event listeners from items
    document.querySelector("#biscuit_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#donut_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#ball_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#chickenLeg_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#note_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#Mglasses_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#torch_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#footprints_container").removeEventListener("animationiteration", hitGood);

    document.querySelector("#title_screen").classList.remove("hidden");
}



//good item gets clicked
function hitGood() {
    console.log("Good item has been clicked");
    console.log(this);
    //it stops
    this.classList.add("stop");
    //item no more clickable
    this.removeEventListener("click", hitGood);
    // document.querySelector("#biscuit_sprite").classList.add("wiggleDisappear");
    //item animation
    this.firstElementChild.classList.add("wiggleDisappear");
    //second animation
    this.firstElementChild.classList.add("zoomIn");
    //restarting after the animation ends
    this.firstElementChild.addEventListener("animationend", restartGood);
    //good sound plays
    document.querySelector("#GoodSound").play();
    getPoint();
}

//bad item gets clicked 
function hitBad() {
    console.log("Bad item has been clicked");
    console.log(this);
    //it stops
    this.classList.add("stop");
    //item no more clickable
    this.removeEventListener("click", hitBad);
    //item animation
    this.firstElementChild.classList.add("wiggleDisappear");
    //item restarts after the animation ends
    this.firstElementChild.addEventListener("animationend", restartBad);
    //bad sound plays
    document.querySelector("#BadSound").play();
    loseLife();
}



//restart good items
function restartGood() {
    console.log("good item restarting");
    console.log(this);
    //remove all classes from container and sprite
    this.parentNode.classList.value = "";
    this.classList.value = "";
    //remove event listeners for when the animation ends
    this.removeEventListener("animationend", restartGood);
    //skip a line
    document.querySelector("html").offsetHeight;
    //new random position 
    let randomPositionNumber = generateRandomNumber();
    console.log("The random number is " + randomPositionNumber);
    this.parentNode.classList.add("position" + randomPositionNumber);
    randomPositionNumber = generateRandomNumber();
    this.parentNode.classList.add("speed" + randomPositionNumber);
    this.parentNode.classList.add("fallDown");
    this.parentNode.addEventListener("click", hitGood);
}

//restart bad items
function restartBad() {
    console.log("bad item restarting");
    console.log(this);
    //remove all classes from container and sprite
    this.parentNode.classList.value = "";
    this.classList.value = "";
    //remove event listeners for when the animation ends
    this.removeEventListener("animationend", restartBad);
    //skip a line
    document.querySelector("html").offsetHeight;
    //new random position 
    let randomPositionNumber = generateRandomNumber();
    console.log("The random number is " + randomPositionNumber);
    this.parentNode.classList.add("position" + randomPositionNumber);
    randomPositionNumber = generateRandomNumber();
    this.parentNode.classList.add("speed" + randomPositionNumber);
    this.parentNode.classList.add("fallDown");
    this.parentNode.addEventListener("click", hitBad);
}


//get a point
function getPoint() {
    console.log("you got a point");
    //get a point
    points++;
    //show how many points
    if (points > 0) {
        console.log("you have " + points + " points");
        let totalPoints = "score" + points;
        console.log(totalPoints);
        document.querySelector("#currentScore").classList = "";
        document.querySelector("#currentScore").classList.add(totalPoints);
    }
    // //enough points?
    if (points >= 5) {
        console.log("you got all the points");
        winGame();
    } else {
        console.log("get more points!");
    }
    document.querySelector("#GoodSound").currentTime = 0;
    document.querySelector("#GoodSound").play();
}

//life lost
function loseLife() {
    console.log("you lost a life");
    lives--;
    if (lives > 0) {
        console.log("you have " + lives + " left");
        let totalLives = "heart" + lives;
        console.log(totalLives);
        document.querySelector("#currentLives").classList = "";
        document.querySelector("#currentLives").classList.add(totalLives);
    }
    if (lives < 1) {
        console.log("no more lives");
        loseGame();
    } else {
        console.log("you still have lives left");
    }
    document.querySelector("#BadSound").currentTime = 0;
    document.querySelector("#BadSound").play();
}





//generate rnd number fucntion

function generateRandomNumber() {
    console.log("generate random number");
    let rndNo = Math.floor(Math.random() * 8 + 1);
    console.log(rndNo);
    return rndNo;
}

// game lost screen 
function loseGame() {
    console.log("game lost");
    gameRunning = false;
    document.querySelector("#game_over").classList.remove("hidden");
    document.querySelector(".goBack1").addEventListener("click", titleScreen);
    resetAll();
    stopSounds();
    document.querySelector("#LoseMusic").play();

}
// you win game screen
function winGame() {
    console.log("you have won");
    gameRunning = false;
    document.querySelector("#level_complete").classList.remove("hidden");
    document.querySelector(".goBack2").addEventListener("click", titleScreen);
    resetAll();
    stopSounds();
    document.querySelector("#WinMusic").play();
}

function stopSounds() {
    document.querySelector("#GoodSound").currentTime = 0;
    document.querySelector("#GoodSound").pause();
    document.querySelector("#BadSound").currentTime = 0;
    document.querySelector("#BadSound").pause();
    document.querySelector("#BgMusic").currentTime = 0;
    document.querySelector("#BgMusic").pause();
    document.querySelector("#WinMusic").currentTime = 0;
    document.querySelector("#WinMusic").pause();
    document.querySelector("#LoseMusic").currentTime = 0;
    document.querySelector("#LoseMusic").pause();
}

function changeSound() {
    console.log("you clicked the sound button");
    if (BgMusic) {
        BgMusic = false;
        document.querySelector("#BgMusic").muted = true;
        document.querySelector("#LoseMusic").muted = true;
        document.querySelector("#WinMusic").muted = true;
        document.querySelector("#sound_button").classList = "";
        document.querySelector("html").offsetHeight;
        document.querySelector("#sound_button").classList.add("soundOff");
    } else {
        BgMusic = true;
        document.querySelector("#BgMusic").muted = false;
        document.querySelector("#LoseMusic").muted = false;
        document.querySelector("#WinMusic").muted = false;
        document.querySelector("#sound_button").classList = "";
        document.querySelector("html").offsetHeight;
        document.querySelector("#sound_button").classList.add("soundOn");


    }
}

// timer
function showTime() {
    console.log("show time");
    timeLeft--;
    if (timeLeft > 0) {
        console.log("time left is " + timeLeft);
        let timeimg = "sec" + timeLeft;
        console.log(timeimg);
        document.querySelector("#currentTime").classList = "";
        document.querySelector("#currentTime").classList.add(timeimg);
        startTimer();
    } else {
        gameOver();
    }
}

function startTimer() {
    console.log("timer has started");
    if (gameRunning) {
        if (timeLeft === 0) {
            gameOver();
        } else {
            setTimeout(showTime, 1000);
        }
    }
}

function resetAll() {
    gameRunning = false;
    //remove all animations 
    document.querySelector("#biscuit_container").classList.value = "";
    document.querySelector("#donut_container").classList.value = "";;
    document.querySelector("#ball_container").classList.value = "";
    document.querySelector("#chickenLeg_container").classList.value = "";
    document.querySelector("#note_container").classList.value = "";
    document.querySelector("#Mglasses_container").classList.value = "";
    document.querySelector("#torch_container").classList.value = "";
    document.querySelector("#footprints_container").classList.value = "";


    document.querySelector("#currentLives").classList.value = "";
    document.querySelector("#currentScore").classList.value = "";

    //remove all event listeners
    document.querySelector("#biscuit_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#donut_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#ball_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#chickenLeg_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#note_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#Mglasses_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#torch_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#footprints_container").removeEventListener("animationiteration", hitGood);
}
// game over animation stops
function gameOver() {
    console.log("game is over");
    gameRunning = false;
    //remove all animations 
    document.querySelector("#biscuit_container").classList.value = "";
    document.querySelector("#donut_container").classList.value = "";;
    document.querySelector("#ball_container").classList.value = "";
    document.querySelector("#chickenLeg_container").classList.value = "";
    document.querySelector("#note_container").classList.value = "";
    document.querySelector("#Mglasses_container").classList.value = "";
    document.querySelector("#torch_container").classList.value = "";
    document.querySelector("#footprints_container").classList.value = "";


    document.querySelector("#currentLives").classList.value = "";
    document.querySelector("#currentScore").classList.value = "";

    //remove all event listeners
    document.querySelector("#biscuit_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#donut_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#ball_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#chickenLeg_container").removeEventListener("animationiteration", hitBad);
    document.querySelector("#note_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#Mglasses_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#torch_container").removeEventListener("animationiteration", hitGood);
    document.querySelector("#footprints_container").removeEventListener("animationiteration", hitGood);

    if (points >= 5) {
        winGame();
    } else {
        loseGame();
    }
}

function restartGame() {
    console.log("game restarting");
    document.querySelector("#screen").offsetHeight;
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#level_complete").classList.add("hidden");
    document.querySelector("#sound_button").classList.value="";
    
    stopSounds();
    points = 0;
    lives = 3;
    start();

}