var onCounter = 0;
var menuBGM = new Audio("bgm/mainmenu.mp3");
var textSFX = new Audio("bgm/CursorMove.mp3");
var btnSFX = new Audio("bgm/ButtonClick.mp3");
textSFX.volume = 0.2;
menuBGM.volume = 0.2;
menuBGM.volume = 0.2;
menuBGM.loop = true;
var upperCase = 1;
var lowerCase = 0;

var isTurnedOn = true;
var timeline;
var isTyping = true;
var playerName = "";

if ($(window).width() >= 1920) {
  document.body.style.zoom = 2.0
};

timeline = new TimelineMax({
  paused: true,
});

timeline
  .to(".screen", 0.2, {
    width: "340px",
    height: "2px",
    background: "#eee",
  })
  .to(".screen", 0.2, {
    width: "340px",
    height: "245px",
  });

timelinePhone = new TimelineMax({
  paused: true,
});

timelinePhone
  .to(".screen", 0.2, {
    width: "300px",
    height: "2px",
    background: "#eee",
  })
  .to(".screen", 0.2, {
    width: "300px",
    height: "210px",
  });

function toggleSwitcherTV() {
  if (isTurnedOn) {
    if ($(window).width() <= 440) {
      timelinePhone.restart();
    } else {
      timeline.restart();
    }
  }
  if (!isTurnedOn) {
    if ($(window).width() <= 440) {
      timelinePhone.reverse();
    } else {
      timeline.reverse();
    }
  }
  isTurnedOn = !isTurnedOn;
}

var btnOff = $(".btnOff");
btnOff.click(function () {
  document.getElementById("words").innerHTML = "";
  i = 0;
  new Audio("bgm/btnPower.mp3").play();
  $(".powerLights").toggleClass("powerLightsOn");
  if (onCounter == 0) {
    if ($(window).width() <= 440) {
      btnOff.css("left", "48px");
    } else {
      btnOff.css("left", "105px");
    }
    $(".offBG").stop();
    $(".offBG").animate({ opacity: "0" }, 2000);
    $(".chatbox").stop();
    $(".chatbox").css("opacity", "0");
    $(".chatbox").delay(500).animate({ opacity: "1" }, 2000);
    if (j == 19) {
      $(".nameUser").delay(500).animate({ opacity: "1" }, 2000);
    }
    menuBGM.currentTime = 0;
    setTimeout(function () {
      menuBGM.play();
    }, 500);
    //start animasi chatbox
    isTyping = true;
    setTimeout(typeWriter, 2000);
    //
    onCounter = 1;
  } else if (onCounter == 1) {
    if ($(window).width() <= 440) {
      btnOff.css("left", "30px");
    } else {
      btnOff.css("left", "65px");
    }
    $(".offBG").stop();
    $(".offBG").animate({ opacity: "1" }, 1000);
    $(".chatbox").stop();
    $(".chatbox").css("opacity", "0");
    $(".nameUser").stop();
    $(".nameUser").css("opacity", "0");
    $(".screen").css("background-color", "#eee");
    $(".genderBox").css("opacity", "0");
    menuBGM.pause();
    // buat ngulang animasi chatbox
    isTyping = false;
    i = 0;
    document.getElementById("words").innerHTML = "";
    //
    onCounter = 0;
  }
  toggleSwitcherTV();
});

var i = 0;
var j = 0;
var txt = [
  "Hello, There! Glad to meet you!",
  "Welcome to the world of POKé-",
  " Ahem!",
  "I think I'm in the wrong game..",
  "Oh!That's right!This isn't a game!",
  "Welcome to my website!",
  "My name is Marshall.",
  "People affectionately refer to me as the..",
  "Well, they didn't really give me a nickname..",
  "They're not affectionate to me either..",
  "Well, anyways!",
  "This website..",
  "..is inhabited by a lot of things that are related to me.",
  "There are facts about me..",
  "..some unfunny jokes..",
  "..and my beloved projects!",
  "Now, before we enter the website..",
  "First, tell me a little about yourself.",
  "Are you a boy? Or are you a girl?",
  "Let's begin with your name! What is it?",
];
var speed = 100;

function typeWriter() {
  if (i < txt[j].length) {
    document.getElementById("words").innerHTML += txt[j].charAt(i);
    if (txt[j].charAt(i) == "!") {
      document.getElementById("words").innerHTML += "<br>";
    }
    i++;
    if (i == txt[j].length) {
      isTyping = false;
      if (j == 18) {
        $(".genderBox").css("opacity", "1");
      }
    }
    if (isTyping != false) {
      setTimeout(typeWriter, speed);
    }
  }
}

var nameX = 0;
var nameY = 0;
var nameCursor = -1;
var nameCursorX = parseInt($(".selectAlphabet").css("left"));
var nameCursorY = parseInt($(".selectAlphabet").css("top"));
var nameCreation = false;

$("#buttonA").click(function () {
  if (j == 19) {
    if (nameCursor > 0 && nameCursor < 9) {
      if (nameCursor == 1) {
        nameCreation = true;
        $(".inputOne").toggleClass("lineInputAnimation");
        $(".inputTwo").toggleClass("lineInputAnimation");
      } else if (nameCursor == 2) {
        $(".inputTwo").toggleClass("lineInputAnimation");
        $(".inputThree").toggleClass("lineInputAnimation");
      } else if (nameCursor == 3) {
        $(".inputThree").toggleClass("lineInputAnimation");
        $(".inputFour").toggleClass("lineInputAnimation");
      } else if (nameCursor == 4) {
        $(".inputFour").toggleClass("lineInputAnimation");
        $(".inputFive").toggleClass("lineInputAnimation");
      } else if (nameCursor == 5) {
        $(".inputFive").toggleClass("lineInputAnimation");
        $(".inputSix").toggleClass("lineInputAnimation");
      } else if (nameCursor == 6) {
        $(".inputSix").toggleClass("lineInputAnimation");
        $(".inputSeven").toggleClass("lineInputAnimation");
      } else if (nameCursor == 7) {
        $(".inputSeven").toggleClass("lineInputAnimation");
        $(".inputEight").toggleClass("lineInputAnimation");
      }
      if (upperCase == 1) {
        if (nameX == 0 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "A";
        } else if (nameX == 1 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "B";
        } else if (nameX == 2 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "C";
        } else if (nameX == 3 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "D";
        } else if (nameX == 4 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "E";
        } else if (nameX == 5 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "F";
        } else if (nameX == 0 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "G";
        } else if (nameX == 1 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "H";
        } else if (nameX == 2 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "I";
        } else if (nameX == 3 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "J";
        } else if (nameX == 4 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "K";
        } else if (nameX == 5 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "L";
        } else if (nameX == 0 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "M";
        } else if (nameX == 1 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "N";
        } else if (nameX == 2 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "O";
        } else if (nameX == 3 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "P";
        } else if (nameX == 4 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "Q";
        } else if (nameX == 5 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "R";
        } else if (nameX == 6 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "S";
        } else if (nameX == 0 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "T";
        } else if (nameX == 1 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "U";
        } else if (nameX == 2 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "V";
        } else if (nameX == 3 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "W";
        } else if (nameX == 4 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "X";
        } else if (nameX == 5 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "Y";
        } else if (nameX == 6 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "Z";
        }
      } else if (lowerCase == 1) {
        if (nameX == 0 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "a";
        } else if (nameX == 1 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "b";
        } else if (nameX == 2 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "c";
        } else if (nameX == 3 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "d";
        } else if (nameX == 4 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "e";
        } else if (nameX == 5 && nameY == 0) {
          document.getElementById("name" + nameCursor).innerHTML = "f";
        } else if (nameX == 0 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "g";
        } else if (nameX == 1 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "h";
        } else if (nameX == 2 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "i";
        } else if (nameX == 3 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "j";
        } else if (nameX == 4 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "k";
        } else if (nameX == 5 && nameY == 1) {
          document.getElementById("name" + nameCursor).innerHTML = "l";
        } else if (nameX == 0 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "m";
        } else if (nameX == 1 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "n";
        } else if (nameX == 2 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "o";
        } else if (nameX == 3 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "p";
        } else if (nameX == 4 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "q";
        } else if (nameX == 5 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "r";
        } else if (nameX == 6 && nameY == 2) {
          document.getElementById("name" + nameCursor).innerHTML = "s";
        } else if (nameX == 0 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "t";
        } else if (nameX == 1 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "u";
        } else if (nameX == 2 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "v";
        } else if (nameX == 3 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "w";
        } else if (nameX == 4 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "x";
        } else if (nameX == 5 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "y";
        } else if (nameX == 6 && nameY == 3) {
          document.getElementById("name" + nameCursor).innerHTML = "z";
        }
      }
      nameCursor++;
    }
    if (nameCursor <= 0) {
      nameCursor++;
    }
  }
});
$("#buttonB").click(function () {
  if (nameCursor > 1 && nameCursor < 10) {
    nameCursor--;
    document.getElementById("name" + nameCursor).innerHTML = "";
    if (nameCursor == 2) {
      $(".inputTwo").toggleClass("lineInputAnimation");
      $(".inputThree").toggleClass("lineInputAnimation");
    } else if (nameCursor == 3) {
      $(".inputThree").toggleClass("lineInputAnimation");
      $(".inputFour").toggleClass("lineInputAnimation");
    } else if (nameCursor == 4) {
      $(".inputFour").toggleClass("lineInputAnimation");
      $(".inputFive").toggleClass("lineInputAnimation");
    } else if (nameCursor == 5) {
      $(".inputFive").toggleClass("lineInputAnimation");
      $(".inputSix").toggleClass("lineInputAnimation");
    } else if (nameCursor == 6) {
      $(".inputSix").toggleClass("lineInputAnimation");
      $(".inputSeven").toggleClass("lineInputAnimation");
    } else if (nameCursor == 7) {
      $(".inputSeven").toggleClass("lineInputAnimation");
      $(".inputEight").toggleClass("lineInputAnimation");
    } else if (nameCursor == 1) {
      $(".inputOne").toggleClass("lineInputAnimation");
      $(".inputTwo").toggleClass("lineInputAnimation");
    }
  }
});

$(".btnStarts").click(function () {
  btnSFX.play();
  if (nameCreation == true) {
    if (j == 19) {
      j++;
    }
    for (z = 1; z < nameCursor; z++) {
      playerName += document.getElementById("name" + z).innerHTML;
    }
    txt.push("Alright!So your name is " + playerName + ", huh?");
    $(".nameUser").animate({ opacity: "0" }, 500);
    $(".screen").delay(500).animate({ backgroundColor: "#eee" }, 1000);
    $(".introScreen").delay(500).animate({ opacity: "1" }, 1000);
    i = 0;
    document.getElementById("words").innerHTML = "";
    isTyping = true;
    setTimeout(typeWriter, 2000);
    nameCreation = false;
    afterNaming();
  }
});

function afterNaming() {
  txt.push(playerName + "!");
  txt.push("You are about to unfold my legendary website!");
  txt.push("My world of dreams and adventures awaits! Let's go!");
}

$(".btnAB").click(function () {
  btnSFX.play();
  if (onCounter == 1) {
    if (i != txt[j].length) {
      if (j == 19) {
        textSFX.play();
      }
      i = txt[j].length;
      i = 0;
      document.getElementById("words").innerHTML = "";
      while (i < txt[j].length) {
        document.getElementById("words").innerHTML += txt[j].charAt(i);
        if (txt[j].charAt(i) == "!") {
          document.getElementById("words").innerHTML += "<br>";
        }
        i++;
        if (j == 18 && i == txt[j].length) {
          $(".genderBox").css("opacity", "1");
        }
      }
    } else {
      textSFX.play();
      if (j == 19) {
        if (nameArrowLoop < 1) {
          loopArrow();
          $(".screen").animate({ backgroundColor: "#000" }, 500);
          $(".introScreen").animate({ opacity: "0" }, 500);
          $(".nameUser").delay(500).animate({ opacity: "1" }, 1000);
          nameArrowLoop = 1;
        }
      } else {
        j++;
      }
      i = 0;
      document.getElementById("words").innerHTML = "";
      isTyping = true;
      setTimeout(typeWriter, 500);
    }
  }
  if (j != 18) {
    $(".genderBox").css("opacity", "0");
  }

  if (j >= 24) {
    fade();
    document.querySelector(".playerName").innerHTML = playerName;
    setTimeout(stopBGM, 2200);
    $(".circle1").animate(
      { width: "3000px" },
      { duration: 1500, queue: false }
    );
    $(".circle1").animate(
      { height: "3000px" },
      { duration: 1500, queue: false }
    );
    $(".circle1").animate({ opacity: "1" }, { duration: 500, queue: false });
    setTimeout(function () {
      $("#start-page").css({ opacity: "0" });
    }, 1500);
    setTimeout(function () {
      $(".circle1").animate({ opacity: "0" }, 1000);
    }, 1500);
    setTimeout(function () {
      $("#start-page").css({ display: "none" });
    }, 1500);
    setTimeout(function () {
      $(".circle1").css({ display: "none" });
    }, 2500);
    setTimeout(function () {
      $("#home-page").css({ display: "block" });
    }, 1500);
    setTimeout(function () {
      $("#home-page").animate({ opacity: "1" }, 1000);
    }, 2500);
  }
});

function fade() {
  menuBGM.volume -= 0.01;
  setTimeout(fade1, 100);
}
function fade1() {
  menuBGM.volume -= 0.01;
  setTimeout(fade, 100);
}
function stopBGM() {
  menuBGM.volume = 0;
}

var genderUp = 1;

$(".btnUp").click(function () {
  btnSFX.play();
  if (j == 18 && i == txt[j].length) {
    if (genderUp == 0) {
      $(".genderArrow").css("top", "19px");
      textSFX.play();
    }
    genderUp = 1;
  }
  if (j >= 19) {
    if (nameY > 0) {
      nameCursorY -= 27;
      $(".selectAlphabet").css("top", nameCursorY);
      nameY--;
    }
  }
});
$(".btnDown").click(function () {
  btnSFX.play();
  if (j == 18 && i == txt[j].length) {
    if (genderUp == 1) {
      $(".genderArrow").css("top", 47);
      textSFX.play();
    }
    genderUp = 0;
  }
  if (j >= 19) {
    if (nameY < 3) {
      nameCursorY += 27;
      $(".selectAlphabet").css("top", nameCursorY);
      nameY++;
    }
  }
});
$(".btnRight").click(function () {
  btnSFX.play();
  if (j >= 19) {
    if (nameY < 2) {
      if (nameX < 5) {
        nameCursorX += 20;
        if (nameX == 2) {
          $(".selectAlphabet").css("left", 123);
          nameCursorX = 123;
        } else {
          $(".selectAlphabet").css("left", nameCursorX);
        }
        nameX++;
      }
    } else {
      if (nameX < 6) {
        nameCursorX += 20;
        if (nameX == 2) {
          $(".selectAlphabet").css("left", 123);
          nameCursorX = 123;
        } else {
          $(".selectAlphabet").css("left", nameCursorX);
        }
        nameX++;
      }
    }
  }
});
$(".btnLeft").click(function () {
  btnSFX.play();
  if (j >= 19) {
    if (nameX > 0) {
      nameCursorX -= 20;
      if (nameX == 3) {
        $(".selectAlphabet").css("left", 59);
        nameCursorX = 59;
      } else {
        $(".selectAlphabet").css("left", nameCursorX);
      }
      nameX--;
    }
  }
});
$(".btnSelects").click(function () {
  btnSFX.play();
  if (j >= 19) {
    if (upperCase == 1) {
      $(".nameKeyboardUpper").css("opacity", 0);
      $(".nameKeyboardLower").css("opacity", 1);
      upperCase--;
      lowerCase++;
    } else if (lowerCase == 1) {
      $(".nameKeyboardUpper").css("opacity", 1);
      $(".nameKeyboardLower").css("opacity", 0);
      upperCase++;
      lowerCase--;
    }
  }
});

var nameArrowLoop = 0;

timelineNameArrow = new TimelineMax({
  paused: true,
});

timelineNameArrow
  .to(".nameArrow", 0.2, {
    left: "25px",
  })
  .to(".nameArrow", 0.2, {
    left: "30px",
  });

function loopArrow() {
  timelineNameArrow.restart();
  setTimeout(loopArrows, 500);
}
function loopArrows() {
  timelineNameArrow.restart();
  setTimeout(loopArrow, 500);
}

function currentTime() {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  hour = updateTime(hour);
  min = updateTime(min);
  if (hour >= 12) {
    if (hour > 12) {
      hour -= 12;
    }
    if (hour <10){
      document.getElementById("hourDC").innerText = "0" + hour;
    } else {
      document.getElementById("hourDC").innerText = hour;
    }
    document.getElementById("meridiemDC").innerText = "PM";
  } else if (hour == 0) {
    document.getElementById("hourDC").innerText = hour;
    document.getElementById("meridiemDC").innerText = "AM";
  } else {
    document.getElementById("hourDC").innerText = hour;
    document.getElementById("meridiemDC").innerText = "AM";
  }
  document.getElementById("minuteDC").innerText = min;
  var t = setTimeout(function () {
    currentTime();
  }, 1000);
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}

currentTime();

timelinePDA = new TimelineMax({
  paused: true,
});

timelinePDA
  .to(".screenPDA", 0.2, {
    width: "2px",
    height: "342px",
    background: "#eee",
  })
  .to(".screenPDA", 0.2, {
    width: "625px",
    height: "342px",
  });

var isTurnedOnPDA = true;

function toggleSwitcherPDA() {
  if (isTurnedOnPDA) {
    timelinePDA.restart();
  }
  if (!isTurnedOnPDA) {
    timelinePDA.reverse();
  }
  isTurnedOnPDA = !isTurnedOnPDA;
}
$(".dialogIconA").click(function () {
  if (isTurnedOnPDA == true) {
    toggleSwitcherPDA();
    $(".screenPDA a").delay(500).animate({ opacity: "1" }, 1000);
    $(".lightAboutMe").toggleClass("lightAboutMeOn");
  }
});
$(".dialogIconB").click(function () {
  if (isTurnedOnPDA == false) {
    toggleSwitcherPDA();
    setTimeout($(".screenPDA a").css("opacity", 0),1);
    $(".lightAboutMe").toggleClass("lightAboutMeOn");
  }
});