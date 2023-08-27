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
          "Choose difficulty : ";
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
    const username = document.getElementsByClassName("username")[2].value;
    if (username == "") {
      alert("Username can't be empty");
    }
    if (username != "") {
      sessionStorage.setItem("turn", "white");
      sessionStorage.setItem("movenumber", "1");
      sessionStorage.setItem("white_left_castling", "1");
      sessionStorage.setItem("white_right_castling", "1");
      sessionStorage.setItem("black_left_castling", "1");
      sessionStorage.setItem("black_right_castling", "1");
      sessionStorage.setItem("to_draw", "0");
      sessionStorage.setItem("details", JSON.stringify(details));
      sessionStorage.setItem("username", username);
      if (details["mode"] == "friend") {
        const val = document.getElementsByClassName("servername")[0].value;
        if (val == "") {
          alert("Sorry but the servername can't be empty");
        } else {
          const servername = {
            roomname: val,
          };
          fetch("http://localhost:3000/checkServer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(servername),
          })
            .then((response) => response.json())
            .then((data) => {
              let checkforservername = JSON.parse(data.split(" ")[0]);
              let noofclients = parseInt(data.split(" ")[1]);
              if (
                document
                  .getElementsByClassName("joinserver")[0]
                  .classList.contains("selected") &&
                checkforservername &&
                noofclients < 2
              ) {
                sessionStorage.setItem("server-type", "join");
                if (details["color"] == "white")
                  window.location.href = `gamewhite.html?id=${val}`;
                else window.location.href = `gameblack.html?id=${val}`;
              } else if (
                document
                  .getElementsByClassName("createserver")[0]
                  .classList.contains("selected") &&
                !checkforservername &&
                noofclients < 2
              ) {
                sessionStorage.setItem("server-type", "create");
                if (details["color"] == "white")
                  window.location.href = `gamewhite.html?id=${val}`;
                else window.location.href = `gameblack.html?id=${val}`;
              } else if (noofclients >= 2) {
                alert("Server Full!");
              } else if (
                document
                  .getElementsByClassName("joinserver")[0]
                  .classList.contains("selected")
              ) {
                alert("Server doesnot exist!");
              } else {
                alert("Server already exist!");
              }
            });
        }
      } else {
        sessionStorage.setItem("details", JSON.stringify(details));
        if (details["color"] == "white")
          window.location.href = "gamewhite.html";
        else window.location.href = "gameblack.html";
      }
    }
  });
}
retrieveinfo();
window.speechSynthesis.cancel();
