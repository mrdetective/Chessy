import {movefetch} from "./movefetch.js";
function tofen() {
  let val = "",
    num = 0;
  for (let i = 8; i >= 1; i--) {
    for (let c = "a".charCodeAt(0); c <= "h".charCodeAt(0); c++) {
      let j = String.fromCharCode(c);
      const img = document
        .querySelector(`.${j + i}`)
        .getElementsByTagName("img")[0];
      if (img == undefined) {
        num++;
      } else if (img.classList.contains("black_rook")) {
        if (num) val += num;
        val += "r";
        num = 0;
      } else if (img.classList.contains("black_knight")) {
        if (num) val += num;
        val += "n";
        num = 0;
      } else if (img.classList.contains("black_pawn")) {
        if (num) val += num;
        val += "p";
        num = 0;
      } else if (img.classList.contains("black_bishop")) {
        if (num) val += num;
        val += "b";
        num = 0;
      } else if (img.classList.contains("black_king")) {
        if (num) val += num;
        val += "k";
        num = 0;
      } else if (img.classList.contains("black_queen")) {
        if (num) val += num;
        val += "q";
        num = 0;
      } else if (img.classList.contains("white_rook")) {
        if (num) val += num;
        val += "R";
        num = 0;
      } else if (img.classList.contains("white_pawn")) {
        if (num) val += num;
        val += "P";
        num = 0;
      } else if (img.classList.contains("white_knight")) {
        if (num) val += num;
        val += "N";
        num = 0;
      } else if (img.classList.contains("white_bishop")) {
        if (num) val += num;
        val += "B";
        num = 0;
      } else if (img.classList.contains("white_queen")) {
        if (num) val += num;
        val += "Q";
        num = 0;
      } else if (img.classList.contains("white_king")) {
        if (num) val += num;
        val += "K";
        num = 0;
      }
    }
    if (num) val += num;
    if (i != 1) val += "/";
    num = 0;
  }
  let details = JSON.parse(localStorage.getItem("details"));
  if (details["color"] == "white") val += " b ";
  else val += " w ";
  let f = 0;
  if (localStorage.getItem("white_left_castling") != "0") {
    f = 1;
    val += "K";
  }
  if (localStorage.getItem("white_right_castling") != "0") {
    f = 1;
    val += "Q";
  }
  if (localStorage.getItem("black_left_castling") != "0") {
    f = 1;
    val += "k";
  }
  if (localStorage.getItem("black_right_castling") != "0") {
    f = 1;
    val += "q";
  }
  if (f == 0) {
    val += "-";
  }
  val += " -";
  val += " " + localStorage.getItem("to_draw");
  val += " " + localStorage.getItem("movenumber");
  return movefetch(val);
}
export {tofen};
