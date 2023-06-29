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
} from "./modules/pawn_move.js";
import {
  queenmove,
  caneatPositions6,
  selectedPositions6,
} from "./modules/queen_move.js";

const chessPieces = document.querySelectorAll(".chesspieces img");
let turn = "w",
  k = "k",
  K = "K",
  Q = "Q",
  q = "q",
  movenumber = 0,
  todraw = 0;
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
  const kingposition = document.querySelector(".white_king");
  return kingposition.parentNode.classList.contains("caneat");
}

function tofen() {
  let val = "",
    num = 0;
  for (let i = 1; i <= 8; i++) {
    for (let c = "h".charCodeAt(0); c >= "a".charCodeAt(0); c--) {
      let j = String.fromCharCode(c);
      const img = document
        .querySelector(`.${j + i}`)
        .getElementsByTagName("img")[0];
      if (img == undefined) {
        num++;
      } else if (img.classList.contains("white_rook")) {
        if (num) val += num;
        val += "R";
        num = 0;
      } else if (img.classList.contains("white_pawn")) {
        if (num) val += num;
        val += "P";
        num = 0;
      } else if (img.classList.contains("white_knight")) {
        if (num) val += num;
        val += "N";
        num = 0;
      } else if (img.classList.contains("white_bishop")) {
        if (num) val += num;
        val += "B";
        num = 0;
      } else if (img.classList.contains("white_queen")) {
        if (num) val += num;
        val += "Q";
        num = 0;
      } else if (img.classList.contains("white_king")) {
        if (num) val += num;
        val += "K";
        num = 0;
      } else if (img.classList.contains("black_rook")) {
        if (num) val += num;
        val += "r";
        num = 0;
      } else if (img.classList.contains("black_knight")) {
        if (num) val += num;
        val += "n";
        num = 0;
      } else if (img.classList.contains("black_pawn")) {
        if (num) val += num;
        val += "p";
        num = 0;
      } else if (img.classList.contains("black_bishop")) {
        if (num) val += num;
        val += "b";
        num = 0;
      } else if (img.classList.contains("black_king")) {
        if (num) val += num;
        val += "k";
        num = 0;
      } else if (img.classList.contains("black_queen")) {
        if (num) val += num;
        val += "q";
        num = 0;
      }
    }
    if (num) val += num;
    if (i != 8) val += "/";
    num = 0;
  }
  val += ` ${turn} ${K + Q + k + q} - ${todraw} ${movenumber}`;
  console.log(val);
}
function removeSelectedEventListeners() {
  const selectedPositions = selectedPositions1.concat(
    selectedPositions2,
    selectedPositions3,
    selectedPositions4,
    selectedPositions5,
    selectedPositions6
  );
  const caneatPositions = caneatPositions1.concat(
    caneatPositions2,
    caneatPositions3,
    caneatPositions4,
    caneatPositions5,
    caneatPositions6
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
