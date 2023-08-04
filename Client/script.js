function retrieveinfo() {
  let details = {
    mode: "stockfish",
    difficulty: "Medium",
    color: "white",
  };
  let mode = document.querySelectorAll(".mod");
  mode.forEach((element) => {
    element.addEventListener("click", (event) => {
      document
        .querySelector(`.${details["mode"]}`)
        .classList.remove("selected");
      document
        .querySelector(`.${element.innerHTML.toLowerCase()}`)
        .classList.add("selected");
      details["mode"] = element.innerHTML.toLowerCase();
      if (details["mode"] == "friend") {
        document.querySelector(`.difficulty`).style.display = "none";
      } else {
        document.querySelector(`.difficulty`).style.display = "revert";
      }
    });
  });

  let difficulty = document.querySelectorAll(".diff");
  difficulty.forEach((element) => {
    element.addEventListener("click", (event) => {
      document
        .querySelector(`.${details["difficulty"]}`)
        .classList.remove("selected");
      document.querySelector(`.${element.innerHTML}`).classList.add("selected");
      details["difficulty"] = element.innerHTML;
    });
  });

  let color = document.querySelectorAll(".col");
  color.forEach((element) => {
    element.addEventListener("click", (event) => {
      document
        .querySelector(`.${details["color"]}`)
        .classList.remove("selected");
      document
        .querySelector(`.${element.innerHTML.toLocaleLowerCase()}`)
        .classList.add("selected");
      details["color"] = element.innerHTML;
      details["color"] = details["color"].toLocaleLowerCase();
    });
  });
  let playgame = document.querySelector(".playgame");
  playgame.addEventListener("click", (event) => {
    localStorage.setItem("details", JSON.stringify(details));
    localStorage.setItem("turn", "white");
    localStorage.setItem("movenumber", "1");
    localStorage.setItem("white_left_castling", "1");
    localStorage.setItem("white_right_castling", "1");
    localStorage.setItem("black_left_castling", "1");
    localStorage.setItem("black_right_castling", "1");
    localStorage.setItem("to_draw", "0");
    window.location.href = "game.html";
  });
}
retrieveinfo();
window.speechSynthesis.cancel();
