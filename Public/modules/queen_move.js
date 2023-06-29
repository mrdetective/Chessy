import {check, checkcolor, piecemove} from "../game.js";

let selectedPositions6 = [];
let caneatPositions6 = [];
function queenmove(position, prevposition, panels) {
  let curnum = position.className[1] - "0";
  let curalpha = position.className[0];
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
  curnum = position.className[1] - "0";
  curalpha = position.className[0];
  let i = curnum + 1,
    j = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i <= 8 && j <= "h") {
    const toclass = j.toString() + i.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i++;
    j = String.fromCharCode(j.charCodeAt(0) + 1);
  }
  let i1 = curnum - 1,
    j1 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i1 >= 1 && j1 >= "a") {
    const toclass = j1.toString() + i1.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i1--;
    j1 = String.fromCharCode(j1.charCodeAt(0) - 1);
  }
  let i2 = curnum + 1,
    j2 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i2 <= 8 && j2 >= "a") {
    const toclass = j2.toString() + i2.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i2++;
    j2 = String.fromCharCode(j2.charCodeAt(0) - 1);
  }
  let i3 = curnum - 1,
    j3 = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i3 >= 1 && j3 <= "h") {
    const toclass = j3.toString() + i3.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i3--;
    j3 = String.fromCharCode(j3.charCodeAt(0) + 1);
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions6.push({position: selectedposition, listener: finalmove});
  });
  const caneat = document.querySelectorAll(".caneat");
  caneat.forEach((selectedposition) => {
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", finalmove);
    caneatPositions6.push({position: imgElement, listener: finalmove});
    selectedPositions6.push({position: selectedposition, listener: finalmove});
  });
}

export {queenmove, selectedPositions6, caneatPositions6};
