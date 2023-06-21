const chessPieces = document.querySelectorAll(".chesspieces img");
const selectedPositions = [];
function removeselected(panels) {
  const selected = document.querySelectorAll(".selected");
  selected.forEach((position) => {
    position.classList.remove("selected");
  });
  panels.forEach((panel) => panel.classList.remove("caneat"));
}
function removeSelectedEventListeners() {
  selectedPositions.forEach((item) => {
    item.position.removeEventListener("click", item.listener);
  });
  selectedPositions.length = 0;
}
const piecemove = (panels, prevposition) => (event) => {
  const position = event.target;
  const topos = position.className[0] + position.className[1];
  const curpos = prevposition[0] + prevposition[1];
  const from = document.querySelector(`.${curpos}`);
  const to = document.querySelector(`.${topos}`);
  const piece = from.getElementsByTagName("img");
  if (piece.length > 0) {
    const image = piece[0];
    from.removeChild(image);
    to.appendChild(image);
    const audio = new Audio("../media/move.mp3");
    audio.play();
    removeselected(panels);
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
  if (imgElements[0].className.substring(0, 5) == "white") {
    return false;
  }
  return true;
}
var finalmove;
function pawnmove(position, prevposition, panels) {
  removeselected(panels);
  if (position[1] == "6") {
    document.getElementsByClassName(`${position}`)[0].classList.add("selected");
    let positionArray = position.split("");
    positionArray[1] = String.fromCharCode(position.charCodeAt(1) - 1);
    position = positionArray.join("");
    if (!check(position)) {
      document
        .getElementsByClassName(`${position}`)[0]
        .classList.add("selected");
    }
  } else {
    document.getElementsByClassName(`${position}`)[0].classList.add("selected");
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions.push({position: selectedposition, listener: finalmove});
  });
}
function diagpawnmove(position) {
  let positionArray = position.split("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 1);
  position = positionArray.join("");
  if (position[0] <= "h" && check(position) && checkcolor(position)) {
    document.getElementsByClassName(`${position}`)[0].classList.add("caneat");
  }
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  position = positionArray.join("");
  if (position[0] >= "a" && check(position) && checkcolor(position)) {
    document.getElementsByClassName(`${position}`)[0].classList.add("caneat");
  }
}

function parallelmove(position, prevposition, panels) {
  removeselected(panels);
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  for (let i = curnum + 1; i <= 8; i++) {
    if (i != curnum) {
      const toclass = position.className[0] + i;
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("selected");
      }
    }
  }
  for (let i = curnum - 1; i >= 1; i--) {
    if (i != curnum) {
      const toclass = position.className[0] + i;
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("selected");
      }
    }
  }
  for (let i = curalpha.charCodeAt(0) + 1; i <= 104; i++) {
    const charCode = String.fromCharCode(i);
    if (charCode != curalpha) {
      const toclass = charCode + position.className[1];
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("selected");
      }
    }
  }
  for (let i = curalpha.charCodeAt(0) - 1; i >= 97; i--) {
    const charCode = String.fromCharCode(i);
    if (charCode != curalpha) {
      const toclass = charCode + position.className[1];
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("caneat");
        }
        break;
      }
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions.push({position: selectedposition, listener: finalmove});
  });
}
function diagonalMove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let i = curnum + 1,
    j = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i <= 8 && j <= "h") {
    const toclass = j.toString() + i.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i++;
    j = String.fromCharCode(j.charCodeAt(0) + 1);
  }
  let i1 = curnum - 1,
    j1 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i1 >= 1 && j1 >= "a") {
    const toclass = j1.toString() + i1.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i1--;
    j1 = String.fromCharCode(j1.charCodeAt(0) - 1);
  }
  let i2 = curnum + 1,
    j2 = String.fromCharCode(curalpha.charCodeAt(0) - 1);
  while (i2 <= 8 && j2 >= "a") {
    const toclass = j2.toString() + i2.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i2++;
    j2 = String.fromCharCode(j2.charCodeAt(0) - 1);
  }
  let i3 = curnum - 1,
    j3 = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i3 >= 1 && j3 <= "h") {
    const toclass = j3.toString() + i3.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("selected");
    i3--;
    j3 = String.fromCharCode(j3.charCodeAt(0) + 1);
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions.push({position: selectedposition, listener: finalmove});
  });
}

function knightMove(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posnum = curnum + 2,
    posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("caneat");
      }
    }
  }
  (posnum = curnum + 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass)) {
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    } else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions.push({position: selectedposition, listener: finalmove});
  });
}

function kingMove(position, prevposition, panels) {
  removeselected(panels);
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  let posnum = curnum;
  if (posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum++;
  if (posnum <= 8) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum -= 2;
  if (posnum >= 1) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document
        .getElementsByClassName(`${toclass}`)[0]
        .classList.add("selected");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("caneat");
    }
  }
  const selected = document.querySelectorAll(".selected");
  selected.forEach((selectedposition) => {
    finalmove = piecemove(panels, prevposition);
    selectedposition.addEventListener("click", finalmove);
    selectedPositions.push({position: selectedposition, listener: finalmove});
  });
}
chessPieces.forEach((piece) => {
  piece.addEventListener("click", function handleClick() {
    const panels = document.querySelectorAll(".panel div");
    const parentPanel = piece.parentNode;
    const piecename = piece.className;
    removeSelectedEventListeners();
    removeselected(panels);
    if (piecename == "white_pawn") {
      const tonum = parentPanel.className[1] - "0" - 1;
      const toclass = parentPanel.className[0] + tonum;
      if (!check(toclass)) {
        pawnmove(toclass, parentPanel.className, panels);
      }
      diagpawnmove(toclass);
    } else if (piecename == "white_rook") {
      parallelmove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_bishop") {
      diagonalMove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_knight") {
      knightMove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_king") {
      kingMove(parentPanel, parentPanel.className, panels);
    } else if (piecename == "white_queen") {
      parallelmove(parentPanel, parentPanel.className, panels);
      diagonalMove(parentPanel, parentPanel.className, panels);
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
