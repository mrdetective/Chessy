import {knightMove, selectedPositions1} from "./modules/knight_move.js";
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
import {kingMove, selectedPositions4} from "./modules/king_move.js";
import {
  pawnmove,
  diagpawnmove,
  selectedPositions5,
  caneatPositions5,
} from "./modules/pawn_move.js";
import {queenmove, selectedPositions6} from "./modules/queen_move.js";

const chessPieces = document.querySelectorAll(".chesspieces img");
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
function removeSelectedEventListeners() {
  const selectedPositions = selectedPositions1.concat(
    selectedPositions2,
    selectedPositions3,
    selectedPositions4,
    selectedPositions5,
    selectedPositions6
  );
  const caneatPositions = caneatPositions2.concat(
    caneatPositions5,
    caneatPositions3
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
  removeselected(panels);
  removeSelectedEventListeners();
};
function check(position) {
  const check = document.querySelector(`.${position}`);
  const imgElements = check.getElementsByTagName("img");
  return imgElements.length;
}

function checkcolor(postion) {
  const check = document.querySelector(`.${postion}`);
  const imgElements = check.getElementsByTagName("img");
  if (imgElements[0].className.substring(0, 5) == "white") {
    return false;
  }
  return true;
}

chessPieces.forEach((piece) => {
  piece.addEventListener("click", function handleClick() {
    const panels = document.querySelectorAll(".panel div");
    const parentPanel = piece.parentNode;
    const piecename = piece.className;
    if (piecename.substring(0, 10) != "blackpiece") {
      removeSelectedEventListeners();
      removeselected(panels);
    }
    if (piecename == "white_pawn") {
      const tonum = parentPanel.className[1] - "0" - 1;
      const toclass = parentPanel.className[0] + tonum;
      if (!check(toclass)) {
        pawnmove(toclass, parentPanel.className, panels);
      }
      diagpawnmove(toclass, parentPanel.className, panels);
    } else if (piecename == "white_rook") {
      parallelmove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_bishop") {
      diagonalMove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_knight") {
      knightMove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_king") {
      kingMove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_queen") {
      queenmove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "black_pawn") {
      console.log(piecename);
    } else if (piecename == "black_rook") {
      console.log(piecename);
    } else if (piecename == "black_knight") {
      console.log(piecename);
    } else if (piecename == "black_bishop") {
      console.log(piecename);
    } else if (piecename == "black_king") {
      console.log(piecename);
    } else if (piecename == "black_queen") {
      console.log(piecename);
    }
  });
});

export {check, checkcolor, piecemove};
