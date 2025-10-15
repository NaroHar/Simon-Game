const buttonColour = ["green", "red", "purple", "yellow", "blue", "orange"];
let buttonChooseColours = [];
let playerChooseColours = [];

let level = 0;
let started = false;

$("#restart-game").hide();

$("#start-game").click(function () {
    if (!started) {
        $(".title").text(`level ${level}`);
        $("#start-game").fadeOut();
        gameLevel();
        started = true;
    }
});


function gameLevel() {
    playerChooseColours = [];
    level++;
    $(".title").text(`level ${level}`);

    buttonChooseColours.forEach((colour, i) => {
        setTimeout(() => {
            playSound(colour);
            animatePress(colour);
        }, 500 * i)
    });

    let randomChoose = Math.floor(Math.random() * buttonColour.length);
    let randomColour = buttonColour[randomChoose];

    buttonChooseColours.push(randomColour);

    setTimeout(() => {
        playSound(randomColour);
        animatePress(randomColour);
    }, 500 * (buttonChooseColours.length - 1));
}


$(".btn").click(function () {
    if (!started) return;
    let btnColour = this.id;

    playSound(btnColour);
    animatePress(btnColour);
    playerChooseColours.push(btnColour);

    checkColour(playerChooseColours.length - 1);
});

function playSound(btnSound) {
    let audio = new Audio(`sounds/${btnSound}.mp3`);
    audio.play();
}

function animatePress(btnAnimate) {
    $(`#${btnAnimate}`).addClass("pressed");
    setTimeout(() => $(`#${btnAnimate}`).removeClass("pressed"), 200);
}

function checkColour(checkBtnColour) {
    if (playerChooseColours[checkBtnColour] === buttonChooseColours[checkBtnColour]) {
        if (playerChooseColours.length === buttonChooseColours.length) {
            setTimeout(x => gameLevel(), 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $(".title").text(`請點擊按鈕重新開始 !`);
        setTimeout(x => $("body").removeClass("game-over"), 500);
        gameOver();
    }
}

function gameOver() {
    started = false;
    level = 0;
    buttonChooseColours = [];

    $("#restart-game").fadeIn();
    $("#restart-game").click(function () {
        if (!started) {
            $(".title").text(`level ${level}`);
            $("#start-game").fadeOut();
            started = true;
            gameLevel();
            $("#restart-game").fadeOut();
        }
    });
}