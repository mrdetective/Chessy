function opponentmove(result) {
  const prevposition = document.querySelector(`.${result.substring(0, 2)}`);
  const topos = document.querySelector(`.${result.substring(2)}`);
  const img = prevposition.getElementsByTagName("img")[0];
  let details = JSON.parse(sessionStorage.getItem("details"));
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "h8" &&
    details["color"] == "white"
  ) {
    sessionStorage.setItem("black_left_castling", "0");
  }
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "a8" &&
    details["color"] == "white"
  ) {
    sessionStorage.setItem("black_right_castling", "0");
  }
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "h1" &&
    details["color"] == "black"
  ) {
    sessionStorage.setItem("white_left_castling", "0");
  }
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "a1" &&
    details["color"] == "black"
  ) {
    sessionStorage.setItem("white_right_castling", "0");
  }
  if (img.classList[1].includes("king")) {
    if (details["color"] == "white") {
      sessionStorage.setItem("black_right_castling", "0");
      sessionStorage.setItem("black_left_castling", "0");
      if (result.substring(0, 2) == "e8") {
        if (result.substring(2) == "g8") {
          let img2 = document
            .querySelector(".h8")
            .getElementsByTagName("img")[0];
          document.querySelector(".h8").removeChild(img2);
          document.querySelector(".f8").appendChild(img2);
        } else if (result.substring(2) == "a8") {
          let img2 = document
            .querySelector(".a8")
            .getElementsByTagName("img")[0];
          document.querySelector(".a8").removeChild(img2);
          document.querySelector(".c8").appendChild(img2);
        }
      }
    } else {
      sessionStorage.setItem("white_right_castling", "0");
      sessionStorage.setItem("white_left_castling", "0");
      if (result.substring(0, 2) == "e1") {
        if (result.substring(2) == "c1") {
          let img2 = document
            .querySelector(".a1")
            .getElementsByTagName("img")[0];
          document.querySelector(".a1").removeChild(img2);
          document.querySelector(".d1").appendChild(img2);
        } else if (result.substring(2) == "h1") {
          let img2 = document
            .querySelector(".h1")
            .getElementsByTagName("img")[0];
          document.querySelector(".h1").removeChild(img2);
          document.querySelector(".f1").appendChild(img2);
        }
      }
    }
  }
  const audio = new Audio("../media/move.mp3");
  audio.play();
  if (topos.getElementsByTagName("img").length != 0) {
    let img2 = topos.getElementsByTagName("img")[0];
    topos.removeChild(img2);
    if (details["color"] == "white") {
      if (
        img2.classList[1].includes("rook") &&
        topos.classList.contains("h1")
      ) {
        sessionStorage.setItem("white_left_castling", "0");
      }
      if (
        img2.classList[1].includes("rook") &&
        topos.classList.contains("a1")
      ) {
        sessionStorage.setItem("white_right_castling", "0");
      }
    } else {
      if (
        img2.classList[1].includes("rook") &&
        topos.classList.contains("h8")
      ) {
        sessionStorage.setItem("black_left_castling", "0");
      }
      if (
        img2.classList[1].includes("rook") &&
        topos.classList.contains("a8")
      ) {
        sessionStorage.setItem("black_right_castling", "0");
      }
    }
  }
  prevposition.removeChild(img);
  topos.appendChild(img);
  sessionStorage.setItem("turn", `${details["color"]}`);
  if (details["color"] == "white") {
    let movenumber = sessionStorage.getItem("movenumber");
    sessionStorage.setItem("movenumber", `${parseInt(movenumber) + 1}`);
  }
}

export {opponentmove};
