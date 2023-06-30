import {check, checkcolor, piecemove} from "../game.js";

let selectedPositions7 = [];
let caneatPositions7 = [];
function whitepawnmove(position, prevposition, panels) {
  if (position[1] == "3") {
    document.getElementsByClassName(`${position}`)[0].classList.add("selected");
    let positionArray = position.split("");
    positionArray[1] = String.fromCharCode(position.charCodeAt(1) + 1);
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
    selectedPositions7.push({position: selectedposition, listener: finalmove});
  });
}
function whitediagpawnmove(position, prevposition, panels) {
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
    caneatPositions7.push({position: imgElement, listener: finalmove});
    selectedPositions7.push({position: selectedposition, listener: finalmove});
  });
}

export {whitepawnmove, whitediagpawnmove, selectedPositions7, caneatPositions7};
