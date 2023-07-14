function setmove(from, to) {
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
  console.log(board);
}

export {setmove};
