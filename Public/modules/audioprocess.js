function robotappear() {
  document.getElementsByClassName("interactor")[0].style.display = "revert";
}

function welcomemessage() {
  let welcomespeech = new SpeechSynthesisUtterance();
  welcomespeech.text = `Welcome to Chessy, a chess game with voice control mode. Challenge yourself against Stockfish, where I'll guide your moves. Specify source and destination positions; I'll handle the rest. Stay updated with Stockfish's moves for strategic gameplay. Enjoy the unique experience, have fun, and conquer Stockfish!`;
  welcomespeech.rate = 2;
  window.speechSynthesis.speak(welcomespeech);
  document.querySelector("#skipbutton").addEventListener("click", () => {
    speechSynthesis.cancel(welcomespeech);
    document.querySelector("#skipbutton").style.display = "none";
    let movespeech = new SpeechSynthesisUtterance(),
      details = JSON.parse(localStorage.getItem("details"));
    movespeech.rate = 2;
    if (details["color"] == "white") {
      movespeech.text = `As you have selected the color white, you will make the first move.`;
    } else {
      movespeech.text = `Since you've chosen the color black, the opponent will make the first move.`;
    }
    document.querySelector(".messagetext").innerHTML = movespeech.text;
    window.speechSynthesis.speak(movespeech);
    movespeech.onend = function () {
      if (details["color"] == "white") {
        setTimeout(() => {
          usertalk();
        }, 200);
      } else {
        setTimeout(() => {
          response();
        }, 200);
      }
    };
  });
  welcomespeech.onend = function () {
    document.querySelector("#skipbutton").style.display = "none";
    let movespeech = new SpeechSynthesisUtterance(),
      details = JSON.parse(localStorage.getItem("details"));
    movespeech.rate = 2;
    if (details["color"] == "white") {
      movespeech.text = `As you have selected the color white, you will make the first move.`;
    } else {
      movespeech.text = `Since you've chosen the color black, the opponent will make the first move.`;
    }
    document.querySelector(".messagetext").innerHTML = movespeech.text;
    window.speechSynthesis.speak(movespeech);
    movespeech.onend = function () {
      if (details["color"] == "white") {
        setTimeout(() => {
          usertalk();
        }, 200);
      } else {
        setTimeout(() => {
          response();
        }, 200);
      }
    };
  };
}
function response() {}
function usertalk() {
  document.querySelector(".messagetext").innerHTML = "Enter starting position:";
  let EnteringStart = new SpeechSynthesisUtterance();
  EnteringStart.text = "Enter starting position: ";
  window.speechSynthesis.speak(EnteringStart);
  EnteringStart.onend = function () {
    let speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.addEventListener("result", (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript);
      document.querySelector(".messagetext").innerHTML =
        "Enter destination position: " + transcript;
    });
    if (speech) {
      recognition.start();
      recognition.onaudioend = () => {
        let startingpos =
          document.querySelector(".messagetext").textContent.slice(-2) +
          document.querySelector(".messagetext").textContent.slice(-1);
        document.querySelector(".messagetext").innerHTML =
          "Enter destination position:";
        let Enteringdest = new SpeechSynthesisUtterance();
        Enteringdest.text = "Enter destination position: ";
        window.speechSynthesis.speak(Enteringdest);
        Enteringdest.onend = function () {
          speech = true;
          recognition = new SpeechRecognition();
          recognition.interimResults = true;
          recognition.addEventListener("result", (e) => {
            const transcript = Array.from(e.results)
              .map((result) => result[0])
              .map((result) => result.transcript);
            document.querySelector(".messagetext").innerHTML =
              "Enter destination position: " + transcript;
          });
          if (speech) {
            recognition.start();
            recognition.onaudioend = () => {
              let destinationpos =
                document.querySelector(".messagetext").textContent.slice(-2) +
                document.querySelector(".messagetext").textContent.slice(-1);
              console.log(startingpos, destinationpos);
            };
          }
        };
      };
    }
  };
}

export {robotappear, welcomemessage, response, usertalk};
