import {check, checkcolor, piecemove} from "../game.js";
import {tofen} from "./to_fen.js";
import {setmove, inrange} from "./checkforcheck.js";

let selectedPositions1 = [];
let caneatPositions1 = [];
function knightMove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posnum = curnum + 2,
    posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  let frompos = position.classList[0].substring(0, 2);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else {
      if (checkcolor(toclass) && setmove(frompos, toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
    }
  }
  (posnum = curnum + 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum >= 1 && posalpha >= "a" && setmove(frompos, toclass)) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass) && setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass) && setmove(frompos, toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions1.push({position: selectedposition, listener: finalmove});
  });
  const caneat = document.querySelectorAll(".caneat");
  caneat.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", finalmove);
    caneatPositions1.push({position: imgElement, listener: finalmove});
    selectedPositions1.push({position: selectedposition, listener: finalmove});
  });
}
export {knightMove, selectedPositions1, caneatPositions1};
