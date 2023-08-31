function extrapiecepick(pos, color) {
  const parentDiv = document.createElement("div");
  parentDiv.className = "piece-pick";
  let queenImg, rookImg, knightImg, bishopImg;
  if (color == "white") {
    queenImg = document.createElement("img");
    queenImg.src = "../media/white_queen.svg";
    queenImg.className = "white_queen queen_pick";

    rookImg = document.createElement("img");
    rookImg.src = "../media/white_rook.svg";
    rookImg.className = "white_rook rook_pick";

    knightImg = document.createElement("img");
    knightImg.src = "../media/white_knight.svg";
    knightImg.className = "white_knight knight_pick";

    bishopImg = document.createElement("img");
    bishopImg.src = "../media/white_bishop.svg";
    bishopImg.className = "white_bishop bishop_pick";
  } else {
    parentDiv.classList.add("extra-pick-margin");
    queenImg = document.createElement("img");
    queenImg.src = "../media/black_queen.svg";
    queenImg.className = "pick-extra-margin black_queen queen_pick";

    rookImg = document.createElement("img");
    rookImg.src = "../media/black_rook.svg";
    rookImg.className = "black_rook rook_pick";

    knightImg = document.createElement("img");
    knightImg.src = "../media/black_knight.svg";
    knightImg.className = "black_knight knight_pick";

    bishopImg = document.createElement("img");
    bishopImg.src = "../media/black_bishop.svg";
    bishopImg.className = "black_bishop bishop_pick";
  }
  parentDiv.appendChild(queenImg);
  parentDiv.appendChild(rookImg);
  parentDiv.appendChild(knightImg);
  parentDiv.appendChild(bishopImg);

  document.getElementsByClassName(`${pos}`)[0].appendChild(parentDiv);
}

export {extrapiecepick};
