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
  castlingpositions,
} from "./modules/king_move.js";
import {
  blackpawnmove,
  blackdiagpawnmove,
  selectedPositions5,
  caneatPositions5,
  blackenpassantmove,
} from "./modules/black_pawn_move.js";
import {
  queenmove,
  caneatPositions6,
  selectedPositions6,
} from "./modules/queen_move.js";
import {
  whitepawnmove,
  whitediagpawnmove,
  selectedPositions7,
  caneatPositions7,
  whiteenpassantmove,
} from "./modules/white_pawn_move.js";
import {movefetch} from "./modules/movefetch.js";
import {opponentmove} from "./modules/opponentmove.js";
import {tofen} from "./modules/to_fen.js";
import {setmove, inrange} from "./modules/checkforcheck.js";
import {stalemate} from "./modules/stalematecheck.js";
import {
  processaudio,
  talk,
  pause,
  resume,
  playNextMessage,
  messages,
  currentMessageIndex,
  findMaleVoiceIndex,
  stopSpeechSynthesis,
} from "./modules/audioprocess.js";

const chessPieces = document.querySelectorAll(".chesspieces img");
const details = JSON.parse(localStorage.getItem("details"));

function toblack() {
  document.getElementsByClassName("panel")[0].style.transform =
    "rotate(360deg)";
  let imgElements = document.getElementsByTagName("img");
  Array.from(imgElements).forEach((element) => {
    element.style.transform = "rotate(360deg)";
  });
  let rolabel = document.querySelector(".rolabel");
  rolabel.innerHTML = `
  1 <br /><br />
  2 <br /><br />
  3 <br /><br />
  4 <br /><br />
  5 <br /><br />
  6 <br /><br />7<br /><br />8<br />
`;
  let colabel = document.querySelector(".colabel");
  colabel.innerHTML = ` <span>h</span>
  <span>g</span>
  <span>f</span>
  <span>e</span>
  <span>d</span>
  <span>c</span>
  <span>b</span>
  <span>a</span>`;
  tofen().then((result) => {
    opponentmove(result);
  });
}
if (details["color"] == "black") {
  toblack();
}

function removeselected(panels) {
  const selected = document.querySelectorAll(".selected");
  const caneat = document.querySelectorAll(".caneat");
  const castling = document.querySelectorAll(".castling");
  const enpassant = document.querySelectorAll(".en-passant");
  selected.forEach((position) => {
    position.classList.remove("selected");
  });
  caneat.forEach((position) => {
    position.classList.remove("caneat");
  });
  castling.forEach((position) => {
    position.classList.remove("castling");
  });
  enpassant.forEach((position) => {
    position.classList.remove("en-passant");
  });
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
  castlingpositions.forEach((item) => {
    item.position.removeEventListener("click", item.listener);
  });
  selectedPositions.length = 0;
  caneatPositions.length = 0;
  castlingpositions.length = 0;
}
const piecemove =
  (panels, prevposition, castling = 0, enpassant = 0) =>
  (event) => {
    const position = event.target;
    let topos;
    if (position.tagName === "IMG") {
      topos =
        position.parentNode.className[0] + position.parentNode.className[1];
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
    if (piece[0].classList.contains("white_rook")) {
      if (piece[0].parentNode.classList.contains("h1")) {
        localStorage.setItem("white_right_castling", "0");
      } else if (piece[0].parentNode.classList.contains("a1")) {
        localStorage.setItem("white_left_castling", "0");
      }
    } else if (piece[0].classList.contains("black_rook")) {
      if (piece[0].parentNode.classList.contains("h8")) {
        localStorage.setItem("black_right_castling", "0");
      } else if (piece[0].parentNode.classList.contains("a8")) {
        localStorage.setItem("black_left_castling", "0");
      }
    } else if (piece[0].classList.contains("black_king")) {
      localStorage.setItem("black_left_castling", "0");
      localStorage.setItem("black_right_castling", "0");
    } else if (piece[0].classList.contains("white_king")) {
      localStorage.setItem("white_left_castling", "0");
      localStorage.setItem("white_right_castling", "0");
    }
    const audio = new Audio("../media/move.mp3");
    if (castling == 1) {
      if (details["color"] == "white") {
        if (to.className.substring(0, 2) == "g1") {
          let rookimg = document
            .querySelector(".h1")
            .getElementsByTagName("img")[0];
          audio.play();
          document.querySelector(".h1").removeChild(rookimg);
          document.querySelector(".f1").appendChild(rookimg);
        } else {
          let rookimg = document
            .querySelector(".a1")
            .getElementsByTagName("img")[0];
          audio.play();
          document.querySelector(".a1").removeChild(rookimg);
          document.querySelector(".d1").appendChild(rookimg);
        }
      } else {
        if (to.className.substring(0, 2) == "g8") {
          let rookimg = document
            .querySelector(".h8")
            .getElementsByTagName("img")[0];
          audio.play();
          document.querySelector(".h8").removeChild(rookimg);
          document.querySelector(".f8").appendChild(rookimg);
        } else {
          let rookimg = document
            .querySelector(".a8")
            .getElementsByTagName("img")[0];
          audio.play();
          document.querySelector(".a8").removeChild(rookimg);
          document.querySelector(".d8").appendChild(rookimg);
        }
      }
    }
    if (piece[0].classList.contains("en-passant")) {
      piece[0].classList.remove("en-passant");
    }
    if (details["color"] == "white") {
      if (
        piece[0].classList.contains("white_pawn") &&
        to.classList[0][1] == "4" &&
        from.classList[0][1] == "2"
      ) {
        piece[0].classList.add("en-passant");
      }
    } else {
      if (
        piece[0].classList.contains("black_pawn") &&
        to.classList[0][1] == "4" &&
        from.classList[0][1] == "2"
      ) {
        piece[0].classList.add("en-passant");
      }
    }
    // console.log(to.classList);
    if (piecetoeat.length != 0) {
      localStorage.setItem("to_draw", "0");
      if (piecetoeat[0].classList[1].includes("rook")) {
        if (details["color"] == "white") {
          if (to.classList.contains("a8")) {
            localStorage.setItem("black_left_castling", "0");
          } else if (to.classList.contains("h8")) {
            localStorage.setItem("black_right_castling", "0");
          }
        } else {
          if (to.classList.contains("h1")) {
            localStorage.setItem("white_left_castling", "0");
          } else if (to.classList.contains("a1")) {
            localStorage.setItem("white_right_castling", "0");
          }
        }
      }
      to.removeChild(piecetoeat[0]);
    }
    if (enpassant == 1) {
      if (details["color"] == "black") {
        let enpassantpos = to.className[0] + (parseInt(to.className[1]) + 1);
        let piece = document.querySelector(`.${enpassantpos}`);
        piece.removeChild(piece.getElementsByTagName("img")[0]);
        localStorage.setItem("to_draw", "0");
      } else {
        let enpassantpos = to.className[0] + (parseInt(to.className[1]) - 1);
        let piece = document.querySelector(`.${enpassantpos}`);
        piece.removeChild(piece.getElementsByTagName("img")[0]);
        localStorage.setItem("to_draw", "0");
      }
    }
    if (piece[0].classList[1].includes("pawn")) {
      localStorage.setItem("to_draw", "0");
    }
    if (details["color"] == "black") {
      let movenumber = localStorage.getItem("movenumber");
      localStorage.setItem("movenumber", `${parseInt(movenumber) + 1}`);
    }
    const image = piece[0];
    from.removeChild(image);
    to.appendChild(image);
    audio.play();
    if (details["color"] == "white") localStorage.setItem("turn", "black");
    else localStorage.setItem("turn", "white");
    removeselected(panels);
    removeSelectedEventListeners();
    let pos;
    if (details["color"] == "white")
      pos = document.querySelector(`.black_king`).parentNode.classList[0];
    else pos = document.querySelector(`.white_king`).parentNode.classList[0];
    if (stalemate(details["color"]) && !setmove(pos, pos)) {
      console.log("did_checkmated");
    }
    tofen().then((result) => {
      setTimeout(() => {
        opponentmove(result);
      }, 2000);
    });
  };
function check(position) {
  const check = document.querySelector(`.${position}`);
  const imgElements = check.getElementsByTagName("img");
  return imgElements.length;
}

function checkcolor(postion) {
  // console.log(postion);
  const check = document.querySelector(`.${postion}`);
  const imgElements = check.getElementsByTagName("img");
  if (
    imgElements.length > 0 &&
    imgElements[0].className.substring(0, 5) == details["color"]
  ) {
    return false;
  }
  return true;
}
function gamestart() {
  if (details["mode"] == "Manual") {
    chessPieces.forEach((piece) => {
      piece.addEventListener("click", function handleClick() {
        let pos = document.querySelector(`.${details["color"]}_king`).parentNode
          .classList[0];
        if (stalemate(details["color"]) && !setmove(pos, pos)) {
          console.log("got_checkmated");
        } else if (
          !stalemate(details["color"]) &&
          details["color"] == localStorage.getItem("turn")
        ) {
          const panels = document.querySelectorAll(".panel div");
          const parentPanel = piece.parentNode;
          const piecename = piece.className;
          let color, bishoppos, knightpos, rookpos, pawnpos, kingpos, queenpos;
          if (details["color"] == "white") color = "black";
          else color = "white";
          if (piecename.substring(0, 10) != `${color}piece`) {
            removeSelectedEventListeners();
            removeselected(panels);
          }
          if (details["color"] == "white") {
            bishoppos = document.querySelectorAll(".black_bishop");
            knightpos = document.querySelectorAll(".black_knight");
            rookpos = document.querySelectorAll(".black_rook");
            pawnpos = document.querySelectorAll(".black_pawn");
            queenpos = document.querySelectorAll(".black_queen");
            kingpos = document.querySelectorAll(".black_king");
          } else {
            bishoppos = document.querySelectorAll(".white_bishop");
            knightpos = document.querySelectorAll(".white_knight");
            rookpos = document.querySelectorAll(".white_rook");
            pawnpos = document.querySelectorAll(".white_pawn");
            queenpos = document.querySelectorAll(".white_queen");
            kingpos = document.querySelectorAll(".white_king");
          }
          if (piecename.substring(11, 21) == `${details["color"]}_pawn`) {
            if (details["color"] == "white") {
              const tonum = parentPanel.className[1] - "0" + 1;
              const toclass = parentPanel.className[0] + tonum;
              if (!check(toclass)) {
                whitepawnmove(toclass, parentPanel.className, panels);
              }
              whitediagpawnmove(toclass, parentPanel.className, panels);
              whiteenpassantmove(toclass, parentPanel.className, panels);
            } else {
              const tonum = parentPanel.className[1] - "0" - 1;
              const toclass = parentPanel.className[0] + tonum;
              if (!check(toclass)) {
                blackpawnmove(toclass, parentPanel.className, panels);
              }
              blackdiagpawnmove(toclass, parentPanel.className, panels);
              blackenpassantmove(toclass, parentPanel.className, panels);
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
        }
      });
    });
  } else if (details["mode"] == "Voicecontrol") {
    processaudio();
  }
}
gamestart();
export {check, checkcolor, piecemove};
