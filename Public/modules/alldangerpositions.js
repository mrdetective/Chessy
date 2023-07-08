import {check, checkcolor} from "../game.js";
function bishopdanger(position, prevposition, panels) {
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    i3--;
    j3 = String.fromCharCode(j3.charCodeAt(0) + 1);
  }
}

function kingdanger(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  let posnum = curnum;
  if (posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum++;
  if (posnum <= 8) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  posnum -= 2;
  if (posnum >= 1) {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) + 1);
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  posalpha = String.fromCharCode(posalpha.charCodeAt(0) - 2);
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
}

function knightdanger(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  let posnum = curnum + 2,
    posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    } else {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
      }
    }
  }
  (posnum = curnum + 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    } else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 1));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    } else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  (posnum = curnum - 2),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 1));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum <= 8 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  (posnum = curnum + 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum <= 8 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) + 2));
  if (posnum >= 1 && posalpha <= "h") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  (posnum = curnum - 1),
    (posalpha = String.fromCharCode(curalpha.charCodeAt(0) - 2));
  if (posnum >= 1 && posalpha >= "a") {
    let toclass = posalpha.toString() + posnum.toString();
    if (!check(toclass))
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    else if (checkcolor(toclass)) {
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
}

function paralleldanger(position, prevposition, panels) {
  const curnum = position.className[1] - "0";
  const curalpha = position.className[0];
  for (let i = curnum + 1; i <= 8; i++) {
    if (i != curnum) {
      const toclass = position.className[0] + i;
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("danger");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
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
            .classList.add("danger");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
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
            .classList.add("danger");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
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
            .classList.add("danger");
        }
        break;
      }
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
}

function blackdiagpawndanger(position, prevposition, panels) {
  let positionArray = position.split("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 1);
  position = positionArray.join("");
  if (position[0] <= "h") {
    document.getElementsByClassName(`${position}`)[0].classList.add("danger");
  }
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  position = positionArray.join("");
  if (position[0] >= "a") {
    document.getElementsByClassName(`${position}`)[0].classList.add("danger");
  }
}

function queendanger(position, prevposition, panels) {
  let curnum = position.className[1] - "0";
  let curalpha = position.className[0];
  for (let i = curnum + 1; i <= 8; i++) {
    if (i != curnum) {
      const toclass = position.className[0] + i;
      if (check(toclass)) {
        if (checkcolor(toclass)) {
          document
            .getElementsByClassName(`${toclass}`)[0]
            .classList.add("danger");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
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
            .classList.add("danger");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
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
            .classList.add("danger");
        }
        break;
      }
      if (!check(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
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
            .classList.add("danger");
        }
        break;
      }
      document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    }
  }
  curnum = position.className[1] - "0";
  curalpha = position.className[0];
  let i = curnum + 1,
    j = String.fromCharCode(curalpha.charCodeAt(0) + 1);
  while (i <= 8 && j <= "h") {
    const toclass = j.toString() + i.toString();
    if (check(toclass)) {
      if (checkcolor(toclass)) {
        document
          .getElementsByClassName(`${toclass}`)[0]
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
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
          .classList.add("danger");
      }
      break;
    }
    document.getElementsByClassName(`${toclass}`)[0].classList.add("danger");
    i3--;
    j3 = String.fromCharCode(j3.charCodeAt(0) + 1);
  }
}
function whitediagpawndanger(position, prevposition, panels) {
  let positionArray = position.split("");
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) + 1);
  position = positionArray.join("");
  if (position[0] <= "h") {
    document.getElementsByClassName(`${position}`)[0].classList.add("danger");
  }
  positionArray[0] = String.fromCharCode(positionArray[0].charCodeAt(0) - 2);
  position = positionArray.join("");
  if (position[0] >= "a") {
    document.getElementsByClassName(`${position}`)[0].classList.add("danger");
  }
}
export {
  kingdanger,
  knightdanger,
  queendanger,
  blackdiagpawndanger,
  whitediagpawndanger,
  bishopdanger,
  paralleldanger,
};
