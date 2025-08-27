var drums = document.querySelectorAll(".drum");

var sounds = {
  a: new Audio("./sounds/tom-1.mp3"),
  s: new Audio("./sounds/tom-2.mp3"),
  d: new Audio("./sounds/tom-3.mp3"),
  f: new Audio("./sounds/tom-4.mp3"),
  j: new Audio("./sounds/snare.mp3"),
  k: new Audio("./sounds/crash.mp3"),
  l: new Audio("./sounds/kick-bass.mp3")
};

for (let key in sounds) {
  sounds[key].load();
}

for (var i = 0; i < drums.length; i++) {
  drums[i].addEventListener("click", function() {
    playSound(this.innerHTML);
     animate(this.innerHTML);
  });
}


document.addEventListener("keydown", function (KeyboardEvent) {
    playSound(KeyboardEvent.key);
     animate(KeyboardEvent.key);
});


function playSound(key) {
  if (sounds[key]) {
    sounds[key].currentTime = 0;
    sounds[key].play();
  }
}

function animate(key) {
    var activeButton = document.querySelector("." +key);
     if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}
}