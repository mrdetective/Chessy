function inrange(val) {
  return val < 8 && val >= 0;
}

function setmove(from, to) {
  let board = [];
  let details = JSON.parse(sessionStorage.getItem("details"));
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
  let fromx = parseInt(from[1]) - 1,
    fromy = from[0].charCodeAt(0) - "a".charCodeAt(0),
    tox = parseInt(to[1]) - 1,
    toy = from[0].charCodeAt(0) - "a".charCodeAt(0);
  if (
    board[fromx][fromy].includes("pawn") &&
    Math.abs(fromy - toy) == 1 &&
    board[tox][toy] == "0"
  ) {
    if (details["color"] == "white") board[tox - 1][toy] = "0";
    else board[tox + 1][toy] = "0";
  }
  if (board[fromx][fromy].includes("king") && Math.abs(toy - fromy) == 2) {
    if (fromy == 6) {
      board[fromx][5] = board[fromx][7];
      board[fromx][7] = "0";
    } else {
      board[fromx][3] = board[fromx][0];
      board[fromx][0] = "0";
    }
  }
  board[parseInt(to[1]) - 1][to[0].charCodeAt(0) - "a".charCodeAt(0)] =
    board[parseInt(from[1]) - 1][from[0].charCodeAt(0) - "a".charCodeAt(0)];
  if (from != to)
    board[parseInt(from[1]) - 1][from[0].charCodeAt(0) - "a".charCodeAt(0)] =
      "0";
  let f = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] != "0" && !board[i][j].includes(details["color"])) {
        if (board[i][j].includes("knight")) {
          let dx = [2, -2];
          let dy = [1, -1];
          for (let k = 0; k < 2; k++) {
            for (let l = 0; l < 2; l++) {
              let pos1 = dx[k] + i;
              let pos2 = dy[l] + j;
              if (pos1 < 8 && pos1 >= 0 && pos2 < 8 && pos2 >= 0) {
                if (
                  board[pos1][pos2].includes(`${details["color"]}`) &&
                  board[pos1][pos2].includes("king")
                ) {
                  f = 1;
                  break;
                }
              }
              pos1 = dy[l] + i;
              pos2 = dx[k] + j;
              if (pos1 < 8 && pos1 >= 0 && pos2 < 8 && pos2 >= 0) {
                if (
                  board[pos1][pos2].includes(`${details["color"]}`) &&
                  board[pos1][pos2].includes("king")
                ) {
                  f = 1;
                  break;
                }
              }
            }
          }
        } else if (board[i][j].includes("rook")) {
          for (let k = i + 1; k < 8; k++) {
            if (board[k][j] != "0") {
              if (
                board[k][j].includes(`${details["color"]}`) &&
                board[k][j].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          for (let k = i - 1; k > -1; k--) {
            if (board[k][j] != "0") {
              if (
                board[k][j].includes(`${details["color"]}`) &&
                board[k][j].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          for (let k = j + 1; k < 8; k++) {
            if (board[i][k] != "0") {
              if (
                board[i][k].includes(`${details["color"]}`) &&
                board[i][k].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          for (let k = j - 1; k > -1; k--) {
            if (board[i][k] != "0") {
              if (
                board[i][k].includes(`${details["color"]}`) &&
                board[i][k].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
        } else if (board[i][j].includes("bishop")) {
          let dx = i + 1,
            dy = j + 1;
          while (dx < 8 && dy < 8) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx++;
            dy++;
          }
          (dx = i - 1), (dy = j + 1);
          while (dx > -1 && dy < 8) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx--;
            dy++;
          }
          (dx = i + 1), (dy = j - 1);
          while (dx < 8 && dy > -1) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx++;
            dy--;
          }
          (dx = i - 1), (dy = j - 1);
          while (dx > -1 && dy > -1) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx--;
            dy--;
          }
        } else if (board[i][j].includes("queen")) {
          for (let k = i + 1; k < 8; k++) {
            if (board[k][j] != "0") {
              if (
                board[k][j].includes(`${details["color"]}`) &&
                board[k][j].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          for (let k = i - 1; k > -1; k--) {
            if (board[k][j] != "0") {
              if (
                board[k][j].includes(`${details["color"]}`) &&
                board[k][j].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          for (let k = j + 1; k < 8; k++) {
            if (board[i][k] != "0") {
              if (
                board[i][k].includes(`${details["color"]}`) &&
                board[i][k].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          for (let k = j - 1; k > -1; k--) {
            if (board[i][k] != "0") {
              if (
                board[i][k].includes(`${details["color"]}`) &&
                board[i][k].includes("king")
              ) {
                f = 1;
              }
              break;
            }
          }
          let dx = i + 1,
            dy = j + 1;
          while (dx < 8 && dy < 8) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx++;
            dy++;
          }
          (dx = i - 1), (dy = j + 1);
          while (dx > -1 && dy < 8) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx--;
            dy++;
          }
          (dx = i + 1), (dy = j - 1);
          while (dx < 8 && dy > -1) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx++;
            dy--;
          }
          (dx = i - 1), (dy = j - 1);
          while (dx > -1 && dy > -1) {
            if (board[dx][dy] != "0") {
              if (
                board[dx][dy].includes(`${details["color"]}`) &&
                board[dx][dy].includes("king")
              ) {
                f = 1;
              }
              break;
            }
            dx--;
            dy--;
          }
        } else if (board[i][j].includes("pawn")) {
          if (details["color"] == "white") {
            let dy = j + 1;
            let dx = i - 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              board[dx][dy] != "0" &&
              board[dx][dy].includes("white_king")
            ) {
              f = 1;
              break;
            }
            dy = j - 1;
            dx = i - 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              board[dx][dy] != "0" &&
              board[dx][dy].includes("white_king")
            ) {
              f = 1;
              break;
            }
          } else {
            let dy = j + 1;
            let dx = i + 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              board[dx][dy] != "0" &&
              board[dx][dy].includes("black_king")
            ) {
              f = 1;
              break;
            }
            dy = j - 1;
            dx = i + 1;
            if (
              inrange(dx) &&
              inrange(dy) &&
              board[dx][dy] != "0" &&
              board[dx][dy].includes("black_king")
            ) {
              f = 1;
              break;
            }
          }
        }
      }
    }
  }
  if (f == 1) {
    return false;
  }
  return true;
}

export {setmove, inrange};
