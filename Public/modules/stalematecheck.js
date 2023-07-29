import {setmove, inrange} from "./checkforcheck.js";

function stalemate(color) {
  let board = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
      board[i][j] = "0";
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let c = String.fromCharCode("a".charCodeAt(0) + j);
      let pos = c + (i + 1);
      let piece = document.querySelector(`.${pos}`).getElementsByTagName("img");
      if (piece.length) {
        board[i][j] = piece[0].classList[1];
      }
    }
  }
  let f = 0,
    x,
    y;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let frompos = String.fromCharCode("a".charCodeAt(0) + j) + (i + 1);
      if (board[i][j] != "0" && board[i][j].includes(color)) {
        if (board[i][j].includes("knight")) {
          let dx = [2, -2];
          let dy = [1, -1];
          for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
              let pos1 = dx[k] + i;
              let pos2 = dy[l] + j;
              let topos =
                String.fromCharCode("a".charCodeAt(0) + pos2) + (pos1 + 1);
              if (pos1 < 8 && pos1 >= 0 && pos2 < 8 && pos2 >= 0) {
                if (
                  !board[pos1][pos2].includes(color) &&
                  setmove(frompos, topos)
                ) {
                  f = 1;
                  break;
                }
              }
              pos1 = dy[l] + i;
              pos2 = dx[k] + j;
              topos =
                String.fromCharCode("a".charCodeAt(0) + pos2) + (pos1 + 1);
              if (pos1 < 8 && pos1 >= 0 && pos2 < 8 && pos2 >= 0) {
                if (
                  !board[pos1][pos2].includes(color) &&
                  setmove(frompos, topos)
                ) {
                  f = 1;
                  break;
                }
              }
            }
          }
        } else if (board[i][j].includes("rook")) {
          for (let k = i + 1; k < 8; k++) {
            let topos = String.fromCharCode("a".charCodeAt(0) + j) + (k + 1);
            if (board[k][j] != "0") {
              if (!board[k][j].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          for (let k = i - 1; k > -1; k--) {
            let topos = String.fromCharCode("a".charCodeAt(0) + j) + (k + 1);
            if (board[k][j] != "0") {
              if (!board[k][j].includes(color) && setmove(frompos, topos)) {
                f = 1;
                break;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          for (let k = j + 1; k < 8; k++) {
            let topos = String.fromCharCode("a".charCodeAt(0) + k) + (i + 1);
            if (board[i][k] != "0") {
              if (!board[i][k].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          for (let k = j - 1; k > -1; k--) {
            let topos = String.fromCharCode("a".charCodeAt(0) + k) + (i + 1);
            if (board[i][k] != "0") {
              let topos = String.fromCharCode("a".charCodeAt(0) + k) + (i + 1);
              if (!board[i][k].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
        } else if (board[i][j].includes("bishop")) {
          let dx = i + 1,
            dy = j + 1;
          while (dx < 8 && dy < 8) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx++;
            dy++;
          }
          (dx = i - 1), (dy = j + 1);
          while (dx > -1 && dy < 8) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx--;
            dy++;
          }
          (dx = i + 1), (dy = j - 1);
          while (dx < 8 && dy > -1) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx++;
            dy--;
          }
          (dx = i - 1), (dy = j - 1);
          while (dx > -1 && dy > -1) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx--;
            dy--;
          }
        } else if (board[i][j].includes("queen")) {
          for (let k = i + 1; k < 8; k++) {
            let topos = String.fromCharCode("a".charCodeAt(0) + j) + (k + 1);
            if (board[k][j] != "0") {
              if (!board[k][j].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          for (let k = i - 1; k > -1; k--) {
            let topos = String.fromCharCode("a".charCodeAt(0) + j) + (k + 1);
            if (board[k][j] != "0") {
              if (!board[k][j].includes(color) && setmove(frompos, topos)) {
                f = 1;
                break;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          for (let k = j + 1; k < 8; k++) {
            let topos = String.fromCharCode("a".charCodeAt(0) + k) + (i + 1);
            if (board[i][k] != "0") {
              if (!board[i][k].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          for (let k = j - 1; k > -1; k--) {
            let topos = String.fromCharCode("a".charCodeAt(0) + k) + (i + 1);
            if (board[i][k] != "0") {
              if (!board[i][k].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
          }
          let dx = i + 1,
            dy = j + 1;
          while (dx < 8 && dy < 8) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx++;
            dy++;
          }
          (dx = i - 1), (dy = j + 1);
          while (dx > -1 && dy < 8) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx--;
            dy++;
          }
          (dx = i + 1), (dy = j - 1);
          while (dx < 8 && dy > -1) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx++;
            dy--;
          }
          (dx = i - 1), (dy = j - 1);
          while (dx > -1 && dy > -1) {
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + (dx + 1);
            if (board[dx][dy] != "0") {
              if (!board[dx][dy].includes(color) && setmove(frompos, topos)) {
                f = 1;
              }
              break;
            } else if (setmove(frompos, topos)) {
              f = 1;
              break;
            }
            dx--;
            dy--;
          }
        } else if (board[i][j].includes("pawn")) {
          if (color == "black") {
            let dy = j + 1;
            let dx = i - 1;
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + dx + 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              !board[dx][dy].includes(color) &&
              board[dx][dy] != "0" &&
              setmove(frompos, topos)
            ) {
              f = 1;
              break;
            }
            dy = j - 1;
            dx = i - 1;
            topos = String.fromCharCode("a".charCodeAt(0) + dy) + dx + 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              !board[dx][dy].includes(color) &&
              board[dx][dy] != "0" &&
              setmove(frompos, topos)
            ) {
              f = 1;
              break;
            }
            dx = i - 1;
            topos = String.fromCharCode("a".charCodeAt(0) + j) + i;
            if (inrange(dx) && board[dx][j] == "0" && setmove(frompos, topos)) {
              f = 1;
              break;
            }
            if (i == 6) {
              topos = String.fromCharCode("a".charCodeAt(0) + j) + (i - 2);
              if (board[i - 2][j] == "0" && setmove(frompos, topos)) {
                f = 1;
                break;
              }
            }
          } else {
            let dy = j + 1;
            let dx = i + 1;
            let topos = String.fromCharCode("a".charCodeAt(0) + dy) + dx + 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              !board[dx][dy].includes(color) &&
              board[dx][dy] != "0" &&
              setmove(frompos, topos)
            ) {
              f = 1;
              break;
            }
            dy = j - 1;
            dx = i + 1;
            topos = String.fromCharCode("a".charCodeAt(0) + dy) + dx + 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              !board[dx][dy].includes(color) &&
              board[dx][dy] != "0" &&
              setmove(frompos, topos)
            ) {
              f = 1;
              break;
            }
            topos = String.fromCharCode("a".charCodeAt(0) + j) + (i + 2);
            if (inrange(dx) && board[dx][j] == "0" && setmove(frompos, topos)) {
              f = 1;
              break;
            }
            if (i == 1) {
              topos = String.fromCharCode("a".charCodeAt(0) + j) + (i + 3);
              if (
                board[i + 1][j] == "0" &&
                board[i + 2][j] == "0" &&
                setmove(frompos, topos)
              ) {
                f = 1;
                break;
              }
            }
          }
        } else if (board[i][j].includes("king")) {
          let d = [0, 1, -1];
          for (let k = 0; k < 3; k++) {
            let posx = i + d[k];
            for (let l = 0; l < 3; l++) {
              if (l == 0 && k == 0) {
                continue;
              }
              let posy = j + d[l];
              let topos =
                String.fromCharCode(posy + "a".charCodeAt(0)) + (posx + 1);
              if (
                inrange(posx) &&
                inrange(posy) &&
                !board[posx][posy].includes(color) &&
                setmove(frompos, topos)
              ) {
                f = 1;
                break;
              }
            }
            if (f) {
              break;
            }
          }
        }
      }
      if (f) {
        break;
      }
    }
    if (f) break;
  }
  if (f == 1) {
    return false;
  }
  return true;
}

export {stalemate, inrange};
