import {check, checkcolor, piecemove} from "../game.js";

let selectedPositions5 = [];
let caneatPositions5 = [];

function blackpawnmove(position, prevposition, panels) {
  if (position[1] == "6") {
    document.getElementsByClassName(`${position}`)[0].classList.add("selected");
    let positionArray = position.split("");
    positionArray[1] = String.fromCharCode(position.charCodeAt(1) - 1);
    position = positionArray.join("");
    if (!check(position)) {
      document
        .getElementsByClassName(`${position}`)[0]
        .classList.add("selected");
    }
  } else {
    document.getElementsByClassName(`${position}`)[0].classList.add("selected");
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions5.push({position: selectedposition, listener: finalmove});
  });
}
function blackdiagpawnmove(position, prevposition, panels) {
  let positionArray = position.split("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 1);
  position = positionArray.join("");
  if (position[0] <= "h" && check(position) && checkcolor(position)) {
    document.getElementsByClassName(`${position}`)[0].classList.add("caneat");
  }
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  position = positionArray.join("");
  if (position[0] >= "a" && check(position) && checkcolor(position)) {
    document.getElementsByClassName(`${position}`)[0].classList.add("caneat");
  }
  const selected = document.querySelectorAll(".caneat");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", finalmove);
    caneatPositions5.push({position: imgElement, listener: finalmove});
    selectedPositions5.push({position: selectedposition, listener: finalmove});
  });
}

function blackenpassantmove(position, prevposition, panels) {
  let positionArray = position.split("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 1);
  positionArray[1] = String.fromCharCode(positionArray[1].charCodeAt(0) + 1);
  position = positionArray.join("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  let position2 = positionArray.join("");
  positionArray[1] = String.fromCharCode(positionArray[1].charCodeAt(0) - 1);
  let position3 = positionArray.join("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 2);
  let position4 = positionArray.join("");
  if (!check(position4)) {
    if (check(position) && checkcolor(position)) {
      const enpassantcheck = document
        .querySelector(`.${position}`)
        .getElementsByTagName("img")[0]
        .classList.contains("en-passant");
      if (enpassantcheck) {
        document.querySelector(`.${position4}`).classList.add("selected");
      }
    }
  }
  if (!check(position3)) {
    if (check(position2) && checkcolor(position2)) {
      const enpassantcheck = document
        .querySelector(`.${position2}`)
        .getElementsByTagName("img")[0]
        .classList.contains("en-passant");
      if (enpassantcheck) {
        document.querySelector(`.${position3}`).classList.add("selected");
      }
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition, 0, 1);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions5.push({position: selectedposition, listener: finalmove});
  });
}
export {
  blackpawnmove,
  blackdiagpawnmove,
  selectedPositions5,
  caneatPositions5,
  blackenpassantmove,
};
