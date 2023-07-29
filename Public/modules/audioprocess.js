let messages = [];
let currentMessageIndex = 0;

function findMaleVoiceIndex(voices) {
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name.includes("male")) {
      return i;
    }
  }
  return -1;
}
function talk(message) {
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1.5;
  utterance.pitch = 2;
  let ind = findMaleVoiceIndex(window.speechSynthesis.getVoices());
  utterance.voice = window.speechSynthesis.getVoices()[ind];
  utterance.onend = function () {
    playNextMessage();
  };
  window.speechSynthesis.speak(utterance);
}

function pause() {
  window.speechSynthesis.cancel();
}

function resume() {
  window.speechSynthesis.resume();
}

function playNextMessage() {
  pause();
  if (currentMessageIndex < messages.length) {
    console.log(messages[currentMessageIndex]);
    talk(messages[currentMessageIndex]);
    currentMessageIndex++;
  } else {
    currentMessageIndex = 0;
  }
}
function stopSpeechSynthesis() {
  pause();
}
function processaudio() {
  window.addEventListener("beforeunload", stopSpeechSynthesis);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      stopSpeechSynthesis();
    }
  });
  document.querySelector(".interactor").style.display = "revert";
  messages.push(
    `Welcome to Chessy, a chess game with voice control mode. Challenge yourself against Stockfish, where I'll guide your moves. Specify source and destination positions; I'll handle the rest. Stay updated with Stockfish's moves for strategic gameplay. Enjoy the unique experience, have fun, and conquer Stockfish!`
  );
  let details = JSON.parse(localStorage.getItem("details"));

  if (details["color"] == "white") {
    messages.push(
      `As you have selected the color white, you will make the first move.`
    );
  } else {
    messages.push(
      "As you have selected the color black, the first move is given by the opponent. It gave d2."
    );
  }
  playNextMessage();
  document.querySelector("#skipbutton").addEventListener("click", () => {
    document.querySelector("#skipbutton").style.display = "none";
  });
}

export {
  processaudio,
  talk,
  pause,
  resume,
  playNextMessage,
  messages,
  currentMessageIndex,
  findMaleVoiceIndex,
  stopSpeechSynthesis,
};
