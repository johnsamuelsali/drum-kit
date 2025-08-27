const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const soundFiles = {
  a: "sounds/tom-1.mp3",
  s: "sounds/tom-2.mp3",
  d: "sounds/tom-3.mp3",
  f: "sounds/tom-4.mp3",
  j: "sounds/snare.mp3",
  k: "sounds/crash.mp3",
  l: "sounds/kick-bass.mp3"
};

const soundBuffers = {};

async function loadSounds() {
  for (let key in soundFiles) {
    const response = await fetch(soundFiles[key]);
    const arrayBuffer = await response.arrayBuffer();
    soundBuffers[key] = await audioCtx.decodeAudioData(arrayBuffer);
  }
}

function playSound(key) {
  const buffer = soundBuffers[key];
  if (buffer) {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
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
    const key = this.innerHTML.trim();
    playSound(key);
    animate(key);
  });
}

document.addEventListener("keydown", function (event) {
  playSound(event.key);
  animate(event.key);
});

loadSounds();
