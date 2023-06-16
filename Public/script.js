const chessPieces = document.querySelectorAll(".chesspieces img");

function parallelmove(postion) {
  const curnum = postion.className[1] - "0";
  const curalpha = postion.className[0];
  for (let i = 1; i <= 8; i++) {
    if (i != curnum) {
      const toclass = postion.className[0] + i;
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    }
  }
  for (let i = 97; i <= 104; i++) {
    const charCode = String.fromCharCode(i);
    if (charCode != curalpha) {
      const toclass = charCode + postion.className[1];
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    }
  }
}
function diagonalMove(position) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let i = curnum + 1,
    j = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i <= 8 && j <= "h") {
    const toclass = j.toString() + i.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i++;
    j = String.fromCharCode(j.charCodeAt(0) + 1);
  }
  let i1 = curnum - 1,
    j1 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i1 >= 1 && j1 >= "a") {
    const toclass = j1.toString() + i1.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i1--;
    j1 = String.fromCharCode(j1.charCodeAt(0) - 1);
  }
  let i2 = curnum + 1,
    j2 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i2 <= 8 && j2 >= "a") {
    const toclass = j2.toString() + i2.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i2++;
    j2 = String.fromCharCode(j2.charCodeAt(0) - 1);
  }
  let i3 = curnum - 1,
    j3 = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i3 >= 1 && j3 <= "h") {
    const toclass = j3.toString() + i3.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i3--;
    j3 = String.fromCharCode(j3.charCodeAt(0) + 1);
  }
}

function knightMove(position) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posnum = curnum + 2,
    posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum + 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
}

function kingMove(position) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  let posnum = curnum;
  if (posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum++;
  if (posnum <= 8) {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum -= 2;
  if (posnum >= 1) {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
  }
}
chessPieces.forEach((piece) => {
  piece.addEventListener("click", () => {
    const panels = document.querySelectorAll(".panel div");
    panels.forEach((panel) => panel.classList.remove("selected"));
    const parentPanel = piece.parentNode;
    const piecename = piece.className;
    if (piecename == "white_pawn") {
      const tonum = parentPanel.className[1] - "0" - 1;
      const toclass = parentPanel.className[0] + tonum;
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else if (piecename == "white_rook") {
      parallelmove(parentPanel);
    } else if (piecename == "white_bishop") {
      diagonalMove(parentPanel);
    } else if (piecename == "white_knight") {
      knightMove(parentPanel);
    } else if (piecename == "white_king") {
      kingMove(parentPanel);
    } else if (piecename == "white_queen") {
      parallelmove(parentPanel);
      diagonalMove(parentPanel);
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
