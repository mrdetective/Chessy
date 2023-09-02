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
import {io} from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import {extrapiecepick} from "./modules/extrapiecepick.js";
import {configurevideo} from "./config_video.js";

let chessPieces = Array.from(document.querySelectorAll(".chesspieces img"));
const details = JSON.parse(sessionStorage.getItem("details"));
const urlParams = new URLSearchParams(window.location.search);
const socket = io(`http://127.0.0.1:3000`, {
  query: {
    roomname: urlParams.get("id"),
  },
});
function removeenpassant() {
  const enpassant = document.querySelectorAll(".en-passant");
  enpassant.forEach((position) => {
    position.classList.remove("en-passant");
  });
}
function removeselected(panels) {
  const selected = document.querySelectorAll(".selected");
  const caneat = document.querySelectorAll(".caneat");
  const castling = document.querySelectorAll(".castling");
  selected.forEach((position) => {
    position.classList.remove("selected");
  });
  caneat.forEach((position) => {
    position.classList.remove("caneat");
  });
  castling.forEach((position) => {
    position.classList.remove("castling");
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
    removeenpassant();
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
        sessionStorage.setItem("white_right_castling", "0");
      } else if (piece[0].parentNode.classList.contains("a1")) {
        sessionStorage.setItem("white_left_castling", "0");
      }
    } else if (piece[0].classList.contains("black_rook")) {
      if (piece[0].parentNode.classList.contains("h8")) {
        sessionStorage.setItem("black_right_castling", "0");
      } else if (piece[0].parentNode.classList.contains("a8")) {
        sessionStorage.setItem("black_left_castling", "0");
      }
    } else if (piece[0].classList.contains("black_king")) {
      sessionStorage.setItem("black_left_castling", "0");
      sessionStorage.setItem("black_right_castling", "0");
    } else if (piece[0].classList.contains("white_king")) {
      sessionStorage.setItem("white_left_castling", "0");
      sessionStorage.setItem("white_right_castling", "0");
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
        to.classList[0][1] == "5" &&
        from.classList[0][1] == "7"
      ) {
        piece[0].classList.add("en-passant");
      }
    }
    if (piecetoeat.length != 0) {
      sessionStorage.setItem("to_draw", "0");
      if (piecetoeat[0].classList[1].includes("rook")) {
        if (details["color"] == "white") {
          if (to.classList.contains("a8")) {
            sessionStorage.setItem("black_left_castling", "0");
          } else if (to.classList.contains("h8")) {
            sessionStorage.setItem("black_right_castling", "0");
          }
        } else {
          if (to.classList.contains("h1")) {
            sessionStorage.setItem("white_left_castling", "0");
          } else if (to.classList.contains("a1")) {
            sessionStorage.setItem("white_right_castling", "0");
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
        sessionStorage.setItem("to_draw", "0");
      } else {
        let enpassantpos = to.className[0] + (parseInt(to.className[1]) - 1);
        let piece = document.querySelector(`.${enpassantpos}`);
        piece.removeChild(piece.getElementsByTagName("img")[0]);
        sessionStorage.setItem("to_draw", "0");
      }
    }
    if (piece[0].classList[1].includes("pawn")) {
      sessionStorage.setItem("to_draw", "0");
    }
    if (details["color"] == "black") {
      let movenumber = sessionStorage.getItem("movenumber");
      sessionStorage.setItem("movenumber", `${parseInt(movenumber) + 1}`);
    }
    const image = piece[0];
    from.removeChild(image);
    to.appendChild(image);
    audio.play();
    removeselected(panels);
    removeSelectedEventListeners();

    // Check for piece-conversion for white
    if (
      to.classList[0].includes("8") &&
      details["color"] == "white" &&
      image.classList[1].includes("pawn")
    ) {
      to.removeChild(image);
      extrapiecepick(to.classList[0], details["color"]);
      let piece_choice = Array.from(
        document
          .getElementsByClassName("piece-pick")[0]
          .getElementsByTagName("img")
      );
      piece_choice.forEach((piece) => {
        piece.addEventListener("click", function () {
          let ExtraPiece = "";
          if (piece.classList[0].includes("queen")) {
            const queenImg = document.createElement("img");
            queenImg.src = "../media/white_queen.svg";
            queenImg.className = "whitepiece white_queen";
            ExtraPiece = queenImg.classList[1];
            to.appendChild(queenImg);
          } else if (piece.classList[0].includes("rook")) {
            const rookImg = document.createElement("img");
            rookImg.src = "../media/white_rook.svg";
            rookImg.className = "whitepiece white_rook";
            ExtraPiece = rookImg.classList[1];
            to.appendChild(rookImg);
          } else if (piece.classList[0].includes("knight")) {
            const knightImg = document.createElement("img");
            knightImg.src = "../media/white_knight.svg";
            knightImg.className = "whitepiece white_knight";
            ExtraPiece = knightImg;
            ExtraPiece = knightImg.classList[1];
            to.appendChild(knightImg);
          } else {
            const bishopImg = document.createElement("img");
            bishopImg.src = "../media/white_bishop.svg";
            bishopImg.className = "whitepiece white_bishop";
            ExtraPiece = bishopImg;
            ExtraPiece = bishopImg.classList[1];
            to.appendChild(bishopImg);
          }
          document.getElementsByClassName("piece-pick")[0].remove();
          to.getElementsByTagName("img")[0].addEventListener(
            "click",
            PieceClick(to.getElementsByTagName("img")[0])
          );
          let pos;
          if (details["color"] == "white")
            pos = document.querySelector(`.black_king`).parentNode.classList[0];
          else
            pos = document.querySelector(`.white_king`).parentNode.classList[0];
          if (stalemate(details["color"]) && !setmove(pos, pos)) {
            console.log("did_checkmated");
          }
          if (details["mode"] == "stockfish") {
            tofen().then((result) => {
              setTimeout(() => {
                opponentmove(result);
              }, 2000);
            });
            if (details["color"] == "white")
              sessionStorage.setItem("turn", "black");
            else sessionStorage.setItem("turn", "white");
          } else {
            const enpassant = document.querySelectorAll(".en-passant");
            let positions = [];
            enpassant.forEach((position) => {
              positions.push(position.parentNode.classList[0]);
            });
            socket.emit(
              "move",
              from.classList[0],
              to.classList[0],
              positions,
              ExtraPiece
            );
            if (sessionStorage.getItem("turn") == "white")
              sessionStorage.setItem("turn", "black");
            else sessionStorage.setItem("turn", "white");
          }
        });
      });
    }
    // Check for piece-conversion for black
    else if (
      to.classList[0].includes("1") &&
      details["color"] == "black" &&
      image.classList[1].includes("pawn")
    ) {
      to.removeChild(image);
      extrapiecepick(to.classList[0], details["color"]);
      let piece_choice = Array.from(
        document
          .getElementsByClassName("piece-pick")[0]
          .getElementsByTagName("img")
      );
      piece_choice.forEach((piece) => {
        piece.addEventListener("click", function () {
          let ExtraPiece = "";
          if (piece.classList[1].includes("queen")) {
            const queenImg = document.createElement("img");
            queenImg.src = "../media/black_queen.svg";
            queenImg.className = "blackpiece black_queen";
            to.appendChild(queenImg);
            ExtraPiece = queenImg.classList[1];
          } else if (piece.classList[1].includes("rook")) {
            const rookImg = document.createElement("img");
            rookImg.src = "../media/black_rook.svg";
            rookImg.className = "blackpiece black_rook";
            to.appendChild(rookImg);
            ExtraPiece = rookImg.classList[1];
          } else if (piece.classList[1].includes("knight")) {
            const knightImg = document.createElement("img");
            knightImg.src = "../media/black_knight.svg";
            knightImg.className = "blackpiece black_knight";
            to.appendChild(knightImg);
            ExtraPiece = knightImg.classList[1];
          } else {
            const bishopImg = document.createElement("img");
            bishopImg.src = "../media/black_bishop.svg";
            bishopImg.className = "blackpiece black_bishop";
            to.appendChild(bishopImg);
            ExtraPiece = bishopImg.classList[1];
          }
          document.getElementsByClassName("piece-pick")[0].remove();
          to.getElementsByTagName("img")[0].addEventListener(
            "click",
            PieceClick(to.getElementsByTagName("img")[0])
          );
          let pos;
          if (details["color"] == "white")
            pos = document.querySelector(`.black_king`).parentNode.classList[0];
          else
            pos = document.querySelector(`.white_king`).parentNode.classList[0];
          if (stalemate(details["color"]) && !setmove(pos, pos)) {
            console.log("did_checkmated");
          }
          if (details["mode"] == "stockfish") {
            tofen().then((result) => {
              setTimeout(() => {
                opponentmove(result);
              }, 2000);
            });
            if (details["color"] == "white")
              sessionStorage.setItem("turn", "black");
            else sessionStorage.setItem("turn", "white");
          } else {
            const enpassant = document.querySelectorAll(".en-passant");
            let positions = [];
            enpassant.forEach((position) => {
              positions.push(position.parentNode.classList[0]);
            });
            socket.emit(
              "move",
              from.classList[0],
              to.classList[0],
              positions,
              ExtraPiece
            );
            if (sessionStorage.getItem("turn") == "white")
              sessionStorage.setItem("turn", "black");
            else sessionStorage.setItem("turn", "white");
          }
        });
      });
    } else {
      let pos;
      if (details["color"] == "white")
        pos = document.querySelector(`.black_king`).parentNode.classList[0];
      else pos = document.querySelector(`.white_king`).parentNode.classList[0];
      if (stalemate(details["color"]) && !setmove(pos, pos)) {
        console.log("did_checkmated");
      }
      if (details["mode"] == "stockfish") {
        tofen().then((result) => {
          setTimeout(() => {
            opponentmove(result);
          }, 2000);
        });
        if (details["color"] == "white")
          sessionStorage.setItem("turn", "black");
        else sessionStorage.setItem("turn", "white");
      } else {
        const enpassant = document.querySelectorAll(".en-passant");
        let positions = [];
        enpassant.forEach((position) => {
          positions.push(position.parentNode.classList[0]);
        });
        socket.emit("move", from.classList[0], to.classList[0], positions, "");
        if (sessionStorage.getItem("turn") == "white")
          sessionStorage.setItem("turn", "black");
        else sessionStorage.setItem("turn", "white");
      }
    }
  };
function check(position) {
  const check = document.querySelector(`.${position}`);
  const imgElements = check.getElementsByTagName("img");
  return imgElements.length;
}

function checkcolor(postion) {
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

// Each Piece click event listener
const PieceClick = (piece) => (event) => {
  let pos = document.querySelector(`.${details["color"]}_king`).parentNode
    .classList[0];
  if (stalemate(details["color"]) && !setmove(pos, pos)) {
    console.log("got_checkmated");
  } else if (
    !stalemate(details["color"]) &&
    details["color"] == sessionStorage.getItem("turn")
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
};

function gamestart() {
  if (details["mode"] == "stockfish") {
    document.getElementsByClassName("username2")[0].innerHTML =
      sessionStorage.getItem("username");
  }
  if (details["mode"] == "friend") {
    configurevideo();
    if (document.title.includes("White")) {
      details["color"] = "white";
      document.getElementsByClassName("stockfish-img")[0].src =
        "../media/blank-prof.png";
      document.getElementsByClassName("username2")[0].innerHTML =
        sessionStorage.getItem("username");
    } else {
      details["color"] = "black";
      document.getElementsByClassName("bplayer-stockfish-img")[0].src =
        "../media/blank-prof.png";
      document.getElementsByClassName("busername2")[0].innerHTML =
        sessionStorage.getItem("username");
    }
    if (sessionStorage.getItem("server-type") == "join") {
      socket.emit("join-create", sessionStorage.getItem("username"));
      socket.on("create-join", function (username) {
        if (details["color"] == "white") {
          document.getElementsByClassName("username1")[0].innerHTML = username;
        } else {
          document.getElementsByClassName("busername1")[0].innerHTML = username;
        }
      });
    } else {
      if (details["color"] == "white") {
        document.getElementsByClassName("stockfish-img")[0].style.opacity =
          "0.4";
        document.getElementsByClassName("username1")[0].style.opacity = "0.4";
        document.getElementsByClassName("username1")[0].innerHTML =
          "Not Joined";
      } else {
        document.getElementsByClassName(
          "bplayer-stockfish-img"
        )[0].style.opacity = "0.4";
        document.getElementsByClassName("busername1")[0].style.opacity = "0.4";
        document.getElementsByClassName("busername1")[0].innerHTML =
          "Not Joined";
      }
      socket.on("join-create", function (username) {
        alert(`${username} joined`);
        if (details["color"] == "white") {
          document.getElementsByClassName("username1")[0].innerHTML = username;
          document.getElementsByClassName("stockfish-img")[0].style.opacity =
            "1";
          document.getElementsByClassName("username1")[0].style.opacity = "1";
        } else {
          document.getElementsByClassName("busername1")[0].innerHTML = username;
          document.getElementsByClassName(
            "bplayer-stockfish-img"
          )[0].style.opacity = "1";
          document.getElementsByClassName("busername1")[0].style.opacity = "1";
        }
        socket.emit("create-join", sessionStorage.getItem("username"));
      });
    }
    socket.on("Player-left", function () {
      alert("Opponent left");
      if (details["color"] == "white") {
        document.getElementsByClassName("stockfish-img")[0].style.opacity =
          "0.4";
        document.getElementsByClassName("username1")[0].style.opacity = "0.4";
        document.getElementsByClassName("username1")[0].innerHTML =
          "Not Joined";
      } else {
        document.getElementsByClassName(
          "bplayer-stockfish-img"
        )[0].style.opacity = "0.4";
        document.getElementsByClassName("busername1")[0].style.opacity = "0.4";
        document.getElementsByClassName("busername1")[0].innerHTML =
          "Not Joined";
      }
    });
    socket.on(`recieve-move`, function (from, to, positions, ExtraPiece) {
      const frompiece = document
        .querySelector(`.${from}`)
        .getElementsByTagName("img")[0];
      let topiece = document
        .querySelector(`.${to}`)
        .getElementsByTagName("img");
      if (topiece.length) {
        topiece = topiece[0];
        document.querySelector(`.${to}`).removeChild(topiece);
      }
      document.querySelector(`.${to}`).appendChild(frompiece);
      if (
        from == "e1" &&
        to == "g1" &&
        frompiece.classList[1].includes("king")
      ) {
        const img = document
          .querySelector(".h1")
          .getElementsByTagName("img")[0];
        document.querySelector(`.f1`).appendChild(img);
      }
      if (
        from == "e1" &&
        to == "c1" &&
        frompiece.classList[1].includes("king")
      ) {
        const img = document
          .querySelector(".a1")
          .getElementsByTagName("img")[0];
        document.querySelector(`.d1`).appendChild(img);
      }
      if (
        from == "e8" &&
        to == "g8" &&
        frompiece.classList[1].includes("king")
      ) {
        const img = document
          .querySelector(".h8")
          .getElementsByTagName("img")[0];
        document.querySelector(`.f8`).appendChild(img);
      }
      if (
        from == "e8" &&
        to == "c8" &&
        frompiece.classList[1].includes("king")
      ) {
        const img = document
          .querySelector(".a8")
          .getElementsByTagName("img")[0];
        document.querySelector(`.d8`).appendChild(img);
      }
      positions.forEach((position) => {
        document
          .getElementsByClassName(`${position}`)[0]
          .childNodes[0].classList.add("en-passant");
      });
      if (ExtraPiece != "") {
        document.querySelector(`.${to}`).lastChild.remove();
        let ExtraPieceImg = document.createElement("img");
        ExtraPieceImg.src = `../media/${ExtraPiece}.svg`;
        if (details["color"] == "white")
          ExtraPieceImg.classList.add("blackpiece");
        else ExtraPieceImg.classList.add("whitepiece");
        ExtraPieceImg.classList.add(ExtraPiece);
        document.querySelector(`.${to}`).appendChild(ExtraPieceImg);
      }
      sessionStorage.setItem("turn", details["color"]);
    });
  }
  chessPieces.forEach((piece) => {
    piece.addEventListener("click", PieceClick(piece));
  });
}
gamestart();
export {check, checkcolor, piecemove};
