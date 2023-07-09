function opponentmove(result) {
  const prevposition = document.querySelector(`.${result.substring(0, 2)}`);
  const topos = document.querySelector(`.${result.substring(2)}`);
  const img = prevposition.getElementsByTagName("img")[0];
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "h8" &&
    details["color"] == "white"
  ) {
    localStorage.setItem("black_left_castling", "0");
  }
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "a8" &&
    details["color"] == "white"
  ) {
    localStorage.setItem("black_right_castling", "0");
  }
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "h1" &&
    details["color"] == "black"
  ) {
    localStorage.setItem("white_left_castling", "0");
  }
  if (
    img.classList[1].includes("rook") &&
    result.substring(0, 2) == "a1" &&
    details["color"] == "black"
  ) {
    localStorage.setItem("white_right_castling", "0");
  }
  if (img.classList[1].includes("king")) {
    if (details["color"] == "white") {
      localStorage.setItem("black_right_castling", "0");
      localStorage.setItem("black_left_castling", "0");
      if (result.substring(0, 2) == "e8") {
        if (result.substring(2) == "g1") {
          let img2 = document
            .querySelector(".h1")
            .getElementsByTagName("img")[0];
          document.querySelector(".h1").removeChild(img2);
          document.querySelector(".g1").appendChild(img2);
        } else if (result.substring(2) == "c1") {
          let img2 = document
            .querySelector(".a1")
            .getElementsByTagName("img")[0];
          document.querySelector(".a1").removeChild(img2);
          document.querySelector(".c1").appendChild(img2);
        }
      }
    } else {
      localStorage.setItem("white_right_castling", "0");
      localStorage.setItem("white_left_castling", "0");
      if (result.substring(0, 2) == "e8") {
        if (result.substring(2) == "c8") {
          let img2 = document
            .querySelector(".a8")
            .getElementsByTagName("img")[0];
          document.querySelector(".a8").removeChild(img2);
          document.querySelector(".d8").appendChild(img2);
        } else if (result.substring(2) == "h8") {
          let img2 = document
            .querySelector(".h8")
            .getElementsByTagName("img")[0];
          document.querySelector(".h8").removeChild(img2);
          document.querySelector(".f8").appendChild(img2);
        }
      }
    }
  }
  const audio = new Audio("../media/move.mp3");
  audio.play();
  if (topos.getElementsByTagName("img").length != 0) {
    topos.removeChild(topos.getElementsByTagName("img")[0]);
  }
  prevposition.removeChild(img);
  topos.appendChild(img);
}

export {opponentmove};
