const buttonColour = ["green", "red", "purple", "yellow", "blue", "orange"];


let level = 0;
let started = false;

$(document).click(function () {
    if (!started) {
        $(".title").text(`level ${level}`);
        startGame();
    }
});


function startGame() {
    let randomChoose = Math.floor(Math.random() * 6);
    let randomColour = buttonColour[randomChoose];

    playSound(randomColour);
    animatePress(randomColour);
}


$(".btn").click(function () {
    let btnColour = this.id;

    playSound(btnColour);
    animatePress(btnColour);
});

function playSound(btnSound) {
    let audio = new Audio(`sounds/${btnSound}.mp3`);
    audio.play();
}

function animatePress(btnAnimate) {
    $(`#${btnAnimate}`).addClass("pressed");
    setTimeout(() => $(`#${btnAnimate}`).removeClass("pressed"), 200);
}