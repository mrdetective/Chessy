import {check, checkcolor, piecemove} from "../script.js";

let selectedPositions5 = [];
function pawnmove(position, prevposition, panels) {
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

function diagpawnmove(position, prevposition, panels) {
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
    let clickEvent = new Event("click");
    let finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    let imgElement = selectedposition.querySelector("img");
    imgElement.addEventListener("click", () => {
      finalmove = piecemove(panels, prevposition);
      selectedposition.addEventListener("click", finalmove);
      clickEvent = new Event("click");
      selectedposition.dispatchEvent(clickEvent);
    });
    selectedPositions5.push({position: selectedposition, listener: finalmove});
  });
}

export {pawnmove, diagpawnmove, selectedPositions5};
