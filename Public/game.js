import {
  knightMove,
  selectedPositions1,
  caneatPositions1,
} from "./modules/knight_move.js";
import {
  diagonalMove,
  caneatPositions2,
  selectedPositions2,
} from "./modules/diagonal_move.js";
import {
  caneatPositions3,
  parallelmove,
  selectedPositions3,
} from "./modules/parallel_move.js";
import {
  kingMove,
  caneatPositions4,
  selectedPositions4,
} from "./modules/king_move.js";
import {
  pawnmove,
  diagpawnmove,
  selectedPositions5,
  caneatPositions5,
} from "./modules/white_pawn_move.js";
import {
  queenmove,
  caneatPositions6,
  selectedPositions6,
} from "./modules/queen_move.js";
import {
  blackpawnmove,
  blackdiagpawnmove,
  selectedPositions7,
  caneatPositions7,
} from "./modules/black_pawn_move.js";
import {tofen} from "./modules/to_fen.js";

const chessPieces = document.querySelectorAll(".chesspieces img");
const details = JSON.parse(localStorage.getItem("details"));

function toblack() {
  document.getElementsByClassName("panel")[0].style.transform =
    "rotate(180deg)";

  let imgElements = document.getElementsByTagName("img");
  Array.from(imgElements).forEach((element) => {
    element.style.transform = "rotate(180deg)";
  });
}
if (details["color"] == "black") {
  toblack();
}

function removeselected(panels) {
  const selected = document.querySelectorAll(".selected");
  const caneat = document.querySelectorAll(".caneat");
  selected.forEach((position) => {
    position.classList.remove("selected");
  });
  caneat.forEach((position) => {
    position.classList.remove("caneat");
  });
}

function checkforcheck() {
  const kingposition = document.querySelector(`.${details["mode"]}_king`);
  return kingposition.parentNode.classList.contains("caneat");
}

function removeSelectedEventListeners() {
  const selectedPositions = selectedPositions1.concat(
    selectedPositions2,
    selectedPositions3,
    selectedPositions4,
    selectedPositions5,
    selectedPositions6,
    selectedPositions7
  );
  const caneatPositions = caneatPositions1.concat(
    caneatPositions2,
    caneatPositions3,
    caneatPositions4,
    caneatPositions5,
    caneatPositions6,
    caneatPositions7
  );
  selectedPositions.forEach((item) => {
    item.position.removeEventListener("click", item.listener);
  });
  caneatPositions.forEach((item) => {
    item.position.removeEventListener("click", item.listener);
  });
  selectedPositions.length = 0;
  caneatPositions.length = 0;
}
const piecemove = (panels, prevposition) => (event) => {
  const position = event.target;
  let topos;
  if (position.tagName === "IMG") {
    topos = position.parentNode.className[0] + position.parentNode.className[1];
  } else {
    topos = position.className[0] + position.className[1];
  }
  const curpos = prevposition[0] + prevposition[1];
  const from = document.querySelector(`.${curpos}`);
  const to = document.querySelector(`.${topos}`);
  const piece = from.getElementsByTagName("img");
  const piecetoeat = to.getElementsByTagName("img");
  if (piece.length === 0) {
    return;
  }
  if (piecetoeat.length != 0) {
    to.removeChild(piecetoeat[0]);
  }
  const image = piece[0];
  from.removeChild(image);
  to.appendChild(image);
  const audio = new Audio("../media/move.mp3");
  audio.play();
  let curcolor = localStorage.getItem("curcolor");
  if (curcolor == "white") {
    localStorage.setItem("curcolor", "black");
  } else {
    let movenumber = localStorage.getItem("movenumber");
    let number = parseInt(movenumber) + 1;
    localStorage.setItem("movenumber", `${number}`);
    localStorage.setItem("curcolor", "white");
  }
  removeselected(panels);
  removeSelectedEventListeners();
  tofen();
};
function check(position) {
  const check = document.querySelector(`.${position}`);
  const imgElements = check.getElementsByTagName("img");
  return imgElements.length;
}

function checkcolor(postion) {
  const check = document.querySelector(`.${postion}`);
  const imgElements = check.getElementsByTagName("img");
  if (imgElements[0].className.substring(0, 5) == details["color"]) {
    return false;
  }
  return true;
}
chessPieces.forEach((piece) => {
  piece.addEventListener("click", function handleClick() {
    const panels = document.querySelectorAll(".panel div");
    const parentPanel = piece.parentNode;
    const piecename = piece.className;
    let color;
    if (details["color"] == "white") color = "black";
    else color = "white";
    if (piecename.substring(0, 10) != `${color}piece`) {
      removeSelectedEventListeners();
      removeselected(panels);
    }
    if (piecename.substring(11) == `${details["color"]}_pawn`) {
      if (details["color"] == "white") {
        const tonum = parentPanel.className[1] - "0" - 1;
        const toclass = parentPanel.className[0] + tonum;
        if (!check(toclass)) {
          pawnmove(toclass, parentPanel.className, panels);
        }
        diagpawnmove(toclass, parentPanel.className, panels);
      } else {
        const tonum = parentPanel.className[1] - "0" + 1;
        const toclass = parentPanel.className[0] + tonum;
        if (!check(toclass)) {
          blackpawnmove(toclass, parentPanel.className, panels);
        }
        blackdiagpawnmove(toclass, parentPanel.className, panels);
      }
    } else if (piecename.substring(11) == `${details["color"]}_rook`) {
      parallelmove(parentPanel, parentPanel.className, panels);
    } else if (piecename.substring(11) == `${details["color"]}_bishop`) {
      diagonalMove(parentPanel, parentPanel.className, panels);
    } else if (piecename.substring(11) == `${details["color"]}_knight`) {
      knightMove(parentPanel, parentPanel.className, panels);
    } else if (piecename.substring(11) == `${details["color"]}_king`) {
      kingMove(parentPanel, parentPanel.className, panels);
    } else if (piecename.substring(11) == `${details["color"]}_queen`) {
      queenmove(parentPanel, parentPanel.className, panels);
    }
  });
});

export {check, checkcolor, piecemove};