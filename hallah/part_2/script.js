var intro = $("#intro");
var intro1 = $("#intro1");
var intro2 = $("#intro2");
var intro3 = $("#intro3");
var intro4 = $("#intro4");
var clickSFX = new Audio("audio/click.mp3");
var envelopeSFX = new Audio("audio/envelope.mp3");
var paperSFX = new Audio("audio/paper.mp3");
var windowWidth = $(window).width();
intro1.animate({ opacity: "0.5" }, 2000);
intro1.hover(
  function () {
    intro1.animate({ opacity: "1" }, 500);
  },
  function () {
    intro1.animate({ opacity: "0.5" }, 500);
  }
);
function awal() {
  playSFX(clickSFX);
  playSFX(envelopeSFX);
  intro1.fadeOut(2000, function () {
    intro1.css("display", "none");
    $('.paper').css("display", "block");
    $('.paper').animate({ opacity: "1" }, 500);
  });
}
function sret(duar) {
  playSFX(clickSFX);
  playSFX(paperSFX);
  $("#" + duar).animate({ right: -800 - windowWidth, opacity: 0 }, 1000);
  setTimeout(function () {
    $("#" + duar).css("display", "none");
  }, 1000);
}

function playSFX(sfx) {
  sfx.pause();
  sfx.currentTime = 0;
  sfx.play();
}
