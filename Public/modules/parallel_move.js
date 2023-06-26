import {check, checkcolor, piecemove} from "../script.js";

let selectedPositions3 = [];
let caneatPositions3 = [];
function parallelmove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  for (let i = curnum + 1; i <= 8; i++) {
    if (i != curnum) {
      const toclass = position.className[0] + i;
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("selected");
      }
    }
  }
  for (let i = curnum - 1; i >= 1; i--) {
    if (i != curnum) {
      const toclass = position.className[0] + i;
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("selected");
      }
    }
  }
  for (let i = curalpha.charCodeAt(0) + 1; i <= 104; i++) {
    const charCode = String.fromCharCode(i);
    if (charCode != curalpha) {
      const toclass = charCode + position.className[1];
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("selected");
      }
    }
  }
  for (let i = curalpha.charCodeAt(0) - 1; i >= 97; i--) {
    const charCode = String.fromCharCode(i);
    if (charCode != curalpha) {
      const toclass = charCode + position.className[1];
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions3.push({position: selectedposition, listener: finalmove});
  });
  const caneat = document.querySelectorAll(".caneat");
  caneat.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", finalmove);
    caneatPositions3.push({position: imgElement, listener: finalmove});
    selectedPositions3.push({position: selectedposition, listener: finalmove});
  });
}

export {parallelmove, selectedPositions3, caneatPositions3};
