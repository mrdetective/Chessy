import {check, checkcolor, piecemove} from "../game.js";

let selectedPositions4 = [];
let caneatPositions4 = [];
function kingMove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  let posnum = curnum;
  if (posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum++;
  if (posnum <= 8) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum -= 2;
  if (posnum >= 1) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
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
}

export {kingMove, selectedPositions4, caneatPositions4};
