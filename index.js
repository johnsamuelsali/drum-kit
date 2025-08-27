const soundFiles = {
  a: "sounds/tom-1.mp3",
  s: "sounds/tom-2.mp3",
  d: "sounds/tom-3.mp3",
  f: "sounds/tom-4.mp3",
  j: "sounds/snare.mp3",
  k: "sounds/crash.mp3",
  l: "sounds/kick-bass.mp3"
};

let useWebAudio = true;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  useWebAudio = false;
}

let audioCtx;
const soundBuffers = {};
const audioElements = {};

async function loadSounds() {
  if (useWebAudio) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    for (let key in soundFiles) {
      const response = await fetch(soundFiles[key]);
      const arrayBuffer = await response.arrayBuffer();
      soundBuffers[key] = await audioCtx.decodeAudioData(arrayBuffer);
    }
  } else {
    for (let key in soundFiles) {
      const audio = new Audio(soundFiles[key]);
      audio.preload = "auto";
      audioElements[key] = audio;
    }
  }
}

function playSound(key) {
  if (useWebAudio) {
    const buffer = soundBuffers[key];
    if (buffer) {
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
    }
  } else {
    const audio = audioElements[key];
    if (audio) {
      const clone = audio.cloneNode();
      clone.play().catch(() => {});
    }
  }
}

function animate(key) {
  const activeButton = document.querySelector("." + key);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => activeButton.classList.remove("pressed"), 100);
  }
}

const drums = document.querySelectorAll(".drum");
for (let i = 0; i < drums.length; i++) {
  drums[i].addEventListener("click", function () {
    const key = this.innerHTML.trim().toLowerCase();
    playSound(key);
    animate(key);
  });
}

document.addEventListener("keydown", function (event) {
  const key = event.key.toLowerCase();
  playSound(key);
  animate(key);
});

loadSounds();
