function retrieveinfo() {
  let details = {
    mode: "stockfish",
    difficulty: "Medium",
    color: "white",
    serverconfig: "create",
  };
  document.querySelector(".createserver").classList.add("selected");
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
        document.querySelector(".diffheading").innerHTML =
          "Choose your Server:";
        document.querySelector(`.servername`).style.display = "revert";
        document.querySelectorAll(`.serverconfig`)[0].style.display = "flex";
      } else {
        document.querySelector(`.difficulty`).style.display = "revert";
        document.querySelector(".diffheading").innerHTML =
          "Choose your difficulty";
        document.querySelector(`.servername`).style.display = "none";
        document.querySelectorAll(`.serverconfig`)[0].style.display = "none";
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

  let serverconfig = document.querySelector(".serverconfig").childNodes;
  serverconfig.forEach((element) => {
    element.addEventListener("click", (event) => {
      element.classList.add("selected");
      details["serverconfig"] = element.innerHTML.toLocaleLowerCase();
      if (element.classList[0] == "createserver") {
        if (
          document
            .getElementsByClassName("joinserver")[0]
            .classList.contains("selected")
        )
          document
            .getElementsByClassName("joinserver")[0]
            .classList.remove("selected");
      } else {
        if (
          document
            .getElementsByClassName("createserver")[0]
            .classList.contains("selected")
        )
          document
            .getElementsByClassName("createserver")[0]
            .classList.remove("selected");
      }
    });
  });
  let playgame = document.querySelector(".playgame");
  playgame.addEventListener("click", (event) => {
    sessionStorage.setItem("turn", "white");
    sessionStorage.setItem("movenumber", "1");
    sessionStorage.setItem("white_left_castling", "1");
    sessionStorage.setItem("white_right_castling", "1");
    sessionStorage.setItem("black_left_castling", "1");
    sessionStorage.setItem("black_right_castling", "1");
    sessionStorage.setItem("to_draw", "0");
    sessionStorage.setItem("details", JSON.stringify(details));
    if (details["mode"] == "friend") {
      const val = document.getElementsByClassName("servername")[0].value;
      if (details["color"] == "white") {
        if (
          document.querySelector(".joinserver").classList.contains("selected")
        ) {
          const serverame = {
            roomname: val,
          };
          fetch("http://localhost:3000/checkServer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(serverame),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data) {
                window.location.href = `gamewhite.html?id=${val}`;
              } else {
                alert("The server doesnot exist");
              }
            });
        } else {
          const serverame = {
            roomname: val,
          };
          fetch("http://localhost:3000/checkServer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(serverame),
          })
            .then((response) => response.json())
            .then((data) => {
              if (!data) {
                window.location.href = `gamewhite.html?id=${val}`;
              } else {
                alert("Sorry but the server already exist");
              }
            });
        }
      } else window.location.href = `gameblack.html?id=${val}`;
    } else {
      sessionStorage.setItem("details", JSON.stringify(details));
      if (details["color"] == "white") window.location.href = "gamewhite.html";
      else window.location.href = "gameblack.html";
    }
  });
}
retrieveinfo();
window.speechSynthesis.cancel();
