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
var playerName = localStorage["player_name"] || "";
var windowWidth = $(window).width();

if (playerName != "") {
  skipGameboy();
}

function skipGameboy() {
  document.querySelector(".playerName").innerHTML = playerName;
  $("#start-page").animate({ opacity: "0" }, 1000);
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

if ($(window).width() >= 1920) {
  document.body.style.zoom = 1.0;
} else if ($(window).width() >= 1280) {
  document.body.style.zoom = 0.9;
}

//! manual
$(".btnManualOpen").click(function(){
  $(".manualBackdrop").css({ display: "block" });
  $(".gameboyManual").css({ display: "block" });
  $(".manualBackdrop").animate({ opacity: "0.5" }, 500);
  $(".gameboyManual").animate({ opacity: "1" }, 500);
});
var manualBack = $(".manualBtnBack");
manualBack.click(function () {
  $(".manualBackdrop").animate({ opacity: "0" }, 500);
  $(".gameboyManual").animate({ opacity: "0" }, 500);
  setTimeout(function () {
    $(".manualBackdrop").css({ display: "none" });
  }, 500);
  setTimeout(function () {
    $(".gameboyManual").css({ display: "none" });
  }, 500);
});


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
// var currentZoom = 1;

var btnOff = $(".btnOff");
btnOff.click(function () {
  // currentZoom += 0.1;
  // $('html').css({
  //     zoom: currentZoom,
  //     '-moz-transform': 'scale(' + currentZoom + ')'
  // });
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
    localStorage["player_name"] = playerName;
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
    //! pindah dari gameboy ke main menu
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
    if (hour < 10) {
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

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.getElementById("#tempDC");

const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
const key = "d5990b002586fd7e8874376b2f080cbb";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition);
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.iconId = data.weather[0].icon;
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  $("#tempDC").html(`${weather.temperature.value}°C`);
  if (`${weather.iconId}` == "01d") {
    $(".digitalClock").css("background-image", "url(img/DigitalClockDay.png)");
  } else if (`${weather.iconId}` == "01n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockNight.png)"
    );
  } else if (`${weather.iconId}` == "02d" || `${weather.iconId}` == "03d") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockCloudyDay.png)"
    );
  } else if (`${weather.iconId}` == "02n" || `${weather.iconId}` == "03n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockCloudyNight.png)"
    );
  } else if (`${weather.iconId}` == "04d" || `${weather.iconId}` == "04n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockCloudy.png)"
    );
  } else if (`${weather.iconId}` == "09d" || `${weather.iconId}` == "09n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockCloudyRain1.png)"
    );
  } else if (`${weather.iconId}` == "10d" || `${weather.iconId}` == "10n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockCloudyRain2.png)"
    );
  } else if (`${weather.iconId}` == "11d" || `${weather.iconId}` == "11n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockCloudyThunder.png)"
    );
  } else if (`${weather.iconId}` == "13d" || `${weather.iconId}` == "13n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockSnowy.png)"
    );
  } else if (`${weather.iconId}` == "50d" || `${weather.iconId}` == "50n") {
    $(".digitalClock").css(
      "background-image",
      "url(img/DigitalClockWindy.png)"
    );
  }
}

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}
$("#tempDC").click(function () {
  if (weather.temperature.value === undefined) {
    alert(
      "(° ͜ʖ°) Tell me where you are...\nSo that I can show you the weather. (° ͜ʖ°)"
    );
  } else {
    if (weather.temperature.unit == "celsius") {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      $("#tempDC").html(`${fahrenheit}°F`);
      weather.temperature.unit = "fahrenheit";
    } else {
      $("#tempDC").html(`${weather.temperature.value}°C`);
      weather.temperature.unit = "celsius";
    }
  }
});

var yinfo = 0;
var zinfo = 0;
var txt1 = [
  "¬‿¬ Do you want to know my secrets?",
  "Sorry, this menu is not available yet.",
  "Sorry, this menu is not available yet.",
  "Sorry, this menu is not available yet.",
];

function typeWriter1() {
  if (yinfo < txt1[zinfo].length) {
    document.getElementById("infoDesc").innerHTML += txt1[zinfo].charAt(yinfo);
    yinfo++;
    if (yinfo == txt1[zinfo].length) {
      isTyping = false;
    }
    if (isTyping != false) {
      setTimeout(typeWriter1, 50);
    }
  }
}

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
function offPDA() {
  $(".containerPDA").css("display", "none");
  $(".iconPDA").stop();
  $(".iconTitle").stop();
  setTimeout($(".iconPDA").css("opacity", 0), 1);
  setTimeout($(".iconTitle").css("opacity", 0), 1);
}
var menuIndex = 0;
var menuLocation = 0;
$(".menuMyProjects").css({ right: -600 - windowWidth });
$(".menuGames").css({ right: -700 - windowWidth });
$(".menuSettings").css({ right: -375 - windowWidth });

function naviRight() {
  yinfo = 0;
  zinfo++;
  document.getElementById("infoDesc").innerHTML = "";
  isTyping = true;
  setTimeout(typeWriter1(), 50);
}

function naviLeft() {
  yinfo = 0;
  zinfo--;
  document.getElementById("infoDesc").innerHTML = "";
  isTyping = true;
  setTimeout(typeWriter1(), 50);
}

$(".naviArrowRight").click(function () {
  if (isTurnedOnPDA == false) {
    toggleSwitcherPDA();
    $(".lightAboutMe").toggleClass("lightAboutMeOn");
    offPDA();
    closeIG();
    closeProfile();
    $(".containerPDA a").stop();
    setTimeout($(".containerPDA a").css("opacity", 0), 1);
  }
  if (menuIndex < 3) {
    menuIndex++;
  }
  if (menuIndex == 1) {
    if (menuLocation == 0) {
      menuLocation++;
      $(".menuAboutMe").animate({ left: -800 - windowWidth, opacity: 0 }, 1000);
      $(".menuMyProjects").animate({ right: 0, opacity: 1 }, 1000);
      naviRight();
      // $(".infoDesc").html("Sorry, this menu is not available yet.");
      // $(".infoDesc").html("My children of blood, sweat and tears..");
      $(".menuTitle").html("My Projects");
    }
  } else if (menuIndex == 2) {
    if (menuLocation == 1) {
      menuLocation++;
      $(".menuMyProjects").animate(
        { left: -600 - windowWidth, opacity: 0 },
        { duration: 1000, queue: false }
      );
      $(".menuGames").animate({ right: 0, opacity: 1 }, 1000);
      naviRight();
      // $(".infoDesc").html("Sorry, this menu is not available yet.");
      // $(".infoDesc").html("( ͡° ͜ʖ ͡°) Wanna play sum games?");
      $(".menuTitle").html("Games");
    }
  } else if (menuIndex == 3) {
    if (menuLocation == 2) {
      menuLocation++;
      $(".menuGames").animate(
        { left: -700 - windowWidth, opacity: 0 },
        { duration: 1000, queue: false }
      );
      $(".menuSettings").animate({ right: 0, opacity: 1 }, 1000);
      naviRight();
      // $(".infoDesc").html("Sorry, this menu is not available yet.");
      // $(".infoDesc").html("This thing can change stuff! (゜ロ゜)");
      $(".menuTitle").html("Settings");
    }
  }
});

$(".naviArrowLeft").click(function () {
  if (menuIndex > 0) {
    menuIndex--;
  }
  if (menuIndex == 0) {
    if (menuLocation == 1) {
      menuLocation--;
      $(".menuAboutMe").animate({ left: 0, opacity: 1 }, 1000);
      $(".menuMyProjects").animate(
        { right: -600 - windowWidth, opacity: 0 },
        { duration: 1000, queue: false }
      );
      naviLeft();
      // $(".infoDesc").html("¬‿¬ Do you want to know my secrets?");
      $(".menuTitle").html("About Me");
    }
  } else if (menuIndex == 1) {
    if (menuLocation == 2) {
      menuLocation--;
      $(".menuMyProjects").animate({ left: 0, opacity: 1 }, 1000);
      $(".menuGames").animate(
        { right: -700 - windowWidth, opacity: 0 },
        { duration: 1000, queue: false }
      );
      naviLeft();
      // $(".infoDesc").html("Sorry, this menu is not available yet.");
      // $(".infoDesc").html("My children of blood, sweat and tears..");
      $(".menuTitle").html("My Projects");
    }
  } else if (menuIndex == 2) {
    if (menuLocation == 3) {
      menuLocation--;
      $(".menuGames").animate({ left: 0, opacity: 1 }, 1000);
      $(".menuSettings").animate(
        { right: -375 - windowWidth, opacity: 0 },
        1000
      );
      naviLeft();
      // $(".infoDesc").html("Sorry, this menu is not available yet.");
      // $(".infoDesc").html("( ͡° ͜ʖ ͡°) Wanna play sum games?");
      $(".menuTitle").html("Games");
    }
  }
});

$(".dialogIconA").click(function () {
  if (menuIndex == 0) {
    if (isTurnedOnPDA == true) {
      $(".containerPDA").css("display", "block");
      toggleSwitcherPDA();
      // $(".screenPDA a").animate({ opacity: "1" }, 1);
      $(".containerPDA a").delay(500).animate({ opacity: "1" }, 1000);
      $(".iconPDA").delay(500).animate({ opacity: "1" }, 1000);
      $(".iconTitle").delay(500).animate({ opacity: "1" }, 1000);
      $(".lightAboutMe").toggleClass("lightAboutMeOn");
    }
  }
});
$(".dialogIconB").click(function () {
  if (menuIndex == 0) {
    if (isTurnedOnPDA == false) {
      toggleSwitcherPDA();
      offPDA();
      closeIG();
      closeProfile();
      $(".containerPDA a").stop();
      setTimeout($(".containerPDA a").css("opacity", 0), 1);
      $(".lightAboutMe").toggleClass("lightAboutMeOn");
    }
  }
});

function nFormatter(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}

var igUsername = "shrallok";

$.instagramFeed({
  username: igUsername,
  callback: function (data) {
    $(".igProfilePic").css(
      "background-image",
      "url(" + JSON.stringify(data.profile_pic_url).replace(/\"/g, "") + ")"
    );
    $(".igProfileName").html(JSON.stringify(data.full_name).replace(/\"/g, ""));
    $(".igUsername").html(JSON.stringify(data.username).replace(/\"/g, ""));
    $(".igPosts").html(
      nFormatter(
        JSON.stringify(data.edge_owner_to_timeline_media.count).replace(
          /\"/g,
          ""
        )
      ) + "<br>posts"
    );
    $(".igFollowers").html(
      nFormatter(
        JSON.stringify(data.edge_followed_by.count).replace(/\"/g, "")
      ) + "<br>followers"
    );
    $(".igFollowing").html(
      nFormatter(JSON.stringify(data.edge_follow.count).replace(/\"/g, "")) +
        "<br>following"
    );
    posts = JSON.stringify(data.edge_owner_to_timeline_media.edges).replace(
      /\"/g,
      ""
    );
    if (data.edge_owner_to_timeline_media.count > 0 && posts.length == 0) {
      $(".igPost1").css("background-image", "url()");
      $(".igPost2").css("background-image", "url()");
      $(".igPost3").css("background-image", "url()");
    }
    if (data.edge_owner_to_timeline_media.count < 1) {
      $(".igPost1").css("background-image", "url()");
      $(".igPost2").css("background-image", "url()");
      $(".igPost3").css("background-image", "url()");
    } else if (data.edge_owner_to_timeline_media.count < 2) {
      $(".igPost1").css(
        "background-image",
        "url(" +
          JSON.stringify(
            data.edge_owner_to_timeline_media.edges[0].node.display_url
          ).replace(/\"/g, "") +
          ")"
      );
      $(".igPost2").css("background-image", "url()");
      $(".igPost3").css("background-image", "url()");
    } else if (data.edge_owner_to_timeline_media.count < 3) {
      $(".igPost1").css(
        "background-image",
        "url(" +
          JSON.stringify(
            data.edge_owner_to_timeline_media.edges[0].node.display_url
          ).replace(/\"/g, "") +
          ")"
      );
      $(".igPost2").css(
        "background-image",
        "url(" +
          JSON.stringify(
            data.edge_owner_to_timeline_media.edges[1].node.display_url
          ).replace(/\"/g, "") +
          ")"
      );
      $(".igPost3").css("background-image", "url()");
    } else {
      $(".igPost1").css(
        "background-image",
        "url(" +
          JSON.stringify(
            data.edge_owner_to_timeline_media.edges[0].node.display_url
          ).replace(/\"/g, "") +
          ")"
      );
      $(".igPost2").css(
        "background-image",
        "url(" +
          JSON.stringify(
            data.edge_owner_to_timeline_media.edges[1].node.display_url
          ).replace(/\"/g, "") +
          ")"
      );
      $(".igPost3").css(
        "background-image",
        "url(" +
          JSON.stringify(
            data.edge_owner_to_timeline_media.edges[2].node.display_url
          ).replace(/\"/g, "") +
          ")"
      );
    }
  },
});

function instagramSearch() {
  igUsername = $("#igNavbarInput").val();
  $.instagramFeed({
    username: igUsername,
    callback: function (data) {
      $(".igProfilePic").css(
        "background-image",
        "url(" + JSON.stringify(data.profile_pic_url).replace(/\"/g, "") + ")"
      );
      $(".igProfileName").html(
        JSON.stringify(data.full_name).replace(/\"/g, "")
      );
      $(".igUsername").html(JSON.stringify(data.username).replace(/\"/g, ""));
      $(".igPosts").html(
        nFormatter(
          JSON.stringify(data.edge_owner_to_timeline_media.count).replace(
            /\"/g,
            ""
          )
        ) + "<br>posts"
      );
      $(".igFollowers").html(
        nFormatter(
          JSON.stringify(data.edge_followed_by.count).replace(/\"/g, "")
        ) + "<br>followers"
      );
      $(".igFollowing").html(
        nFormatter(JSON.stringify(data.edge_follow.count).replace(/\"/g, "")) +
          "<br>following"
      );
      posts = JSON.stringify(data.edge_owner_to_timeline_media.edges).replace(
        /\"/g,
        ""
      );
      if (data.edge_owner_to_timeline_media.count > 0 && posts.length == 0) {
        $(".igPost1").css("background-image", "url()");
        $(".igPost2").css("background-image", "url()");
        $(".igPost3").css("background-image", "url()");
      }
      if (data.edge_owner_to_timeline_media.count < 1) {
        $(".igPost1").css("background-image", "url()");
        $(".igPost2").css("background-image", "url()");
        $(".igPost3").css("background-image", "url()");
      } else if (data.edge_owner_to_timeline_media.count < 2) {
        $(".igPost1").css(
          "background-image",
          "url(" +
            JSON.stringify(
              data.edge_owner_to_timeline_media.edges[0].node.display_url
            ).replace(/\"/g, "") +
            ")"
        );
        $(".igPost2").css("background-image", "url()");
        $(".igPost3").css("background-image", "url()");
      } else if (data.edge_owner_to_timeline_media.count < 3) {
        $(".igPost1").css(
          "background-image",
          "url(" +
            JSON.stringify(
              data.edge_owner_to_timeline_media.edges[0].node.display_url
            ).replace(/\"/g, "") +
            ")"
        );
        $(".igPost2").css(
          "background-image",
          "url(" +
            JSON.stringify(
              data.edge_owner_to_timeline_media.edges[1].node.display_url
            ).replace(/\"/g, "") +
            ")"
        );
        $(".igPost3").css("background-image", "url()");
      } else {
        $(".igPost1").css(
          "background-image",
          "url(" +
            JSON.stringify(
              data.edge_owner_to_timeline_media.edges[0].node.display_url
            ).replace(/\"/g, "") +
            ")"
        );
        $(".igPost2").css(
          "background-image",
          "url(" +
            JSON.stringify(
              data.edge_owner_to_timeline_media.edges[1].node.display_url
            ).replace(/\"/g, "") +
            ")"
        );
        $(".igPost3").css(
          "background-image",
          "url(" +
            JSON.stringify(
              data.edge_owner_to_timeline_media.edges[2].node.display_url
            ).replace(/\"/g, "") +
            ")"
        );
      }
    },
  });
}

$(".igNavbarSearch").click(function () {
  instagramSearch();
});

const igSearch = document.getElementById("igNavbarInput");
igSearch.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    instagramSearch();
  }
});

$(".iconProfile").click(function () {
  $(".containerPDA a").stop();
  setTimeout($(".containerPDA a").css("opacity", 0), 1);
  $(".profilePDA").css("display", "block");
  $(".iconPDA").stop();
  $(".iconTitle").stop();
  $(".iconPDA").animate({ opacity: "0" }, 500);
  $(".iconTitle").animate({ opacity: "0" }, 500);
  $(".profileTop").delay(500).animate({ opacity: "1" }, 500);
  $(".profileBody").delay(500).animate({ opacity: "1" }, 500);
});

function closeProfile() {
  $(".containerPDA a").stop();
  setTimeout($(".containerPDA a").css("opacity", 1), 1);
  $(".profilePDA").css("display", "none");
  $(".profileTop").stop();
  $(".profileBody").stop();
  $(".profileTop").css("opacity", 0);
  $(".profileBody").css("opacity", 0);
}

$(".iconIG").click(function () {
  $(".containerPDA a").stop();
  setTimeout($(".containerPDA a").css("opacity", 0), 1);
  $(".igPDA").css("display", "block");
  $(".iconPDA").stop();
  $(".iconTitle").stop();
  $(".iconPDA").animate({ opacity: "0" }, 500);
  $(".iconTitle").animate({ opacity: "0" }, 500);
  $(".igNavbar").delay(500).animate({ opacity: "1" }, 500);
  $(".igBody").delay(500).animate({ opacity: "1" }, 500);
});

function closeIG() {
  $(".containerPDA a").stop();
  setTimeout($(".containerPDA a").css("opacity", 1), 1);
  $(".igPDA").css("display", "none");
  $(".igNavbar").stop();
  $(".igBody").stop();
  $(".igNavbar").css("opacity", 0);
  $(".igBody").css("opacity", 0);
}

$(".aboutMeBackBtn").click(function () {
  if (menuIndex == 0) {
    if (isTurnedOnPDA == false) {
      closeIG();
      closeProfile();
      $(".iconPDA").animate({ opacity: "1" }, 500);
      $(".iconTitle").animate({ opacity: "1" }, 500);
    }
  }
});

$(".igVisitProfile").click(function () {
  window.open("https://www.instagram.com/" + igUsername);
});
