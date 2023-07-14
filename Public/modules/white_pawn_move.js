import {check, checkcolor, piecemove} from "../game.js";
import {setmove} from "./checkforcheck.js";

let selectedPositions7 = [];
let caneatPositions7 = [];
function whitepawnmove(position, prevposition, panels) {
  // console.log(prevposition);
  let frompos = prevposition.substring(0, 2);
  if (position[1] == "3") {
    if (setmove(frompos, position))
      document
        .getElementsByClassName(`${position}`)[0]
        .classList.add("selected");
    let positionArray = position.split("");
    positionArray[1] = String.fromCharCode(position.charCodeAt(1) + 1);
    position = positionArray.join("");
    if (!check(position) && setmove(frompos, position)) {
      document
        .getElementsByClassName(`${position}`)[0]
        .classList.add("selected");
    }
  } else {
    if (setmove(frompos, position))
      document
        .getElementsByClassName(`${position}`)[0]
        .classList.add("selected");
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
  let frompos = prevposition.substring(0, 2);
  if (
    position[0] <= "h" &&
    check(position) &&
    checkcolor(position) &&
    setmove(frompos, position)
  ) {
    document.getElementsByClassName(`${position}`)[0].classList.add("caneat");
  }
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  position = positionArray.join("");
  if (
    position[0] >= "a" &&
    check(position) &&
    checkcolor(position) &&
    setmove(frompos, position)
  ) {
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
function whiteenpassantmove(position, prevposition, panels) {
  let frompos = prevposition.substring(0, 2);
  let positionArray = position.split("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 1);
  positionArray[1] = String.fromCharCode(positionArray[1].charCodeAt(0) - 1);
  position = positionArray.join("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 2);
  let position2 = positionArray.join("");
  positionArray[1] = String.fromCharCode(positionArray[1].charCodeAt(0) + 1);
  let position3 = positionArray.join("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  let position4 = positionArray.join("");
  if (position4[0] >= "a" && position4[0] <= "h" && !check(position4)) {
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
  if (position3[0] <= "h" && position3[0] >= "a" && !check(position3)) {
    if (check(position2) && checkcolor(position2)) {
      const enpassantcheck = document
        .querySelector(`.${position2}`)
        .getElementsByTagName("img")[0]
        .classList.contains("en-passant");
      if (enpassantcheck && setmove(frompos, topos)) {
        document.querySelector(`.${position3}`).classList.add("selected");
      }
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition, 0, 1);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions7.push({position: selectedposition, listener: finalmove});
  });
}
export {
  whitepawnmove,
  whitediagpawnmove,
  selectedPositions7,
  caneatPositions7,
  whiteenpassantmove,
};
