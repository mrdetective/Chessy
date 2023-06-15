const chessPieces = document.querySelectorAll(".chesspieces img");
chessPieces.forEach((piece) => {
  piece.addEventListener("click", () => {
    const panels = document.querySelectorAll(".panel div");
    panels.forEach((panel) => panel.classList.remove("selected"));
    const parentPanel = piece.parentNode;
    const piecename = piece.className;
    // console.log(className);
    // console.log(parentPanel.className);
    // console.log(piecename);
    if (piecename == "white_pawn") {
      console.log(piecename);
    } else if (piecename == "white_rook") {
      console.log(piecename);
    } else if (piecename == "white_bishop") {
      console.log(piecename);
    } else if (piecename == "white_knight") {
      console.log(piecename);
    } else if (piecename == "white_king") {
      console.log(piecename);
    } else if (piecename == "white_queen") {
      console.log("white_queen");
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
