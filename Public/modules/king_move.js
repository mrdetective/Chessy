import {check, checkcolor, piecemove} from "../game.js";
import {todanger} from "./checkdanger.js";

let selectedPositions4 = [];
let caneatPositions4 = [];
let castlingpositions = [];
function kingMove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  let posnum = curnum;
  if (posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum++;
  if (posnum <= 8) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum -= 2;
  if (posnum >= 1) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && todanger(`${toclass}`))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (check(toclass) && checkcolor(toclass) && todanger(`${toclass}`)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  let details = JSON.parse(localStorage.getItem("details"));
  if (localStorage.getItem(`${details["color"]}_right_castling`) != "0") {
    posalpha = position.className[0];
    let f = 0;
    for (let i = posalpha.charCodeAt(0) + 1; i <= "g".charCodeAt(0); i++) {
      let classname = String.fromCharCode(i) + position.className[1];
      if (
        document
          .querySelector(`.${classname}`)
          .getElementsByTagName("img")[0] != undefined
      ) {
        f = 1;
        break;
      }
    }
    let castlingplace =
      String.fromCharCode(posalpha.charCodeAt(0) + 2) + position.className[1];
    if (f == 0 && todanger(`${castlingplace}`)) {
      document.querySelector(`.${castlingplace}`).classList.add("castling");
    }
  }
  if (localStorage.getItem(`${details["color"]}_left_castling`) != "0") {
    posalpha = position.className[0];
    let f = 0;
    for (let i = posalpha.charCodeAt(0) - 1; i >= "b".charCodeAt(0); i--) {
      let classname = String.fromCharCode(i) + position.className[1];
      if (
        document
          .querySelector(`.${classname}`)
          .getElementsByTagName("img")[0] != undefined
      ) {
        f = 1;
        break;
      }
    }
    let castlingplace =
      String.fromCharCode(posalpha.charCodeAt(0) - 2) + position.className[1];
    if (f == 0 && todanger(`${castlingplace}`)) {
      document.querySelector(`.${castlingplace}`).classList.add("castling");
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions4.push({position: selectedposition, listener: finalmove});
  });
  const caneat = document.querySelectorAll(".caneat");
  caneat.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", finalmove);
    caneatPositions4.push({position: imgElement, listener: finalmove});
    selectedPositions4.push({position: selectedposition, listener: finalmove});
  });
  const castling = document.querySelectorAll(".castling");
  castling.forEach((castlingposition) => {
    let finalmove = piecemove(panels, prevposition, 1);
    castlingposition.addEventListener("click", finalmove);
    castlingpositions.push({position: castlingposition, listener: finalmove});
  });
}

export {kingMove, selectedPositions4, caneatPositions4, castlingpositions};
