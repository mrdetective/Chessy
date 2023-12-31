import {check, checkcolor, piecemove} from "../game.js";
import {setmove} from "./checkforcheck.js";

let selectedPositions2 = [];
let caneatPositions2 = [];
function diagonalMove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  const frompos = prevposition.substring(0, 2);
  let i = curnum + 1,
    j = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i <= 8 && j <= "h") {
    const toclass = j.toString() + i.toString();
    if (check(toclass)) {
      if (checkcolor(toclass) && setmove(frompos, toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    } else if (setmove(frompos, toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    }
    i++;
    j = String.fromCharCode(j.charCodeAt(0) + 1);
  }
  let i1 = curnum - 1,
    j1 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i1 >= 1 && j1 >= "a") {
    const toclass = j1.toString() + i1.toString();
    if (check(toclass)) {
      if (checkcolor(toclass) && setmove(frompos, toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    } else if (setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    i1--;
    j1 = String.fromCharCode(j1.charCodeAt(0) - 1);
  }
  let i2 = curnum + 1,
    j2 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i2 <= 8 && j2 >= "a") {
    const toclass = j2.toString() + i2.toString();
    if (check(toclass)) {
      if (checkcolor(toclass) && setmove(frompos, toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    } else if (setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    i2++;
    j2 = String.fromCharCode(j2.charCodeAt(0) - 1);
  }
  let i3 = curnum - 1,
    j3 = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i3 >= 1 && j3 <= "h") {
    const toclass = j3.toString() + i3.toString();
    if (check(toclass)) {
      if (checkcolor(toclass) && setmove(frompos, toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    } else if (setmove(frompos, toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    i3--;
    j3 = String.fromCharCode(j3.charCodeAt(0) + 1);
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions2.push({position: selectedposition, listener: finalmove});
  });
  const caneat = document.querySelectorAll(".caneat");
  caneat.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", finalmove);
    caneatPositions2.push({position: imgElement, listener: finalmove});
    selectedPositions2.push({position: selectedposition, listener: finalmove});
  });
}
export {diagonalMove, selectedPositions2, caneatPositions2};
