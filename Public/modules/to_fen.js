let turn = "w",
  k = "k",
  K = "K",
  Q = "Q",
  q = "q",
  todraw = 0;
function tofen() {
  let val = "",
    num = 0;
  for (let i = 1; i <= 8; i++) {
    for (let c = "h".charCodeAt(0); c >= "a".charCodeAt(0); c--) {
      let j = String.fromCharCode(c);
      const img = document
        .querySelector(`.${j + i}`)
        .getElementsByTagName("img")[0];
      if (img == undefined) {
        num++;
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
      }
    }
    if (num) val += num;
    if (i != 8) val += "/";
    num = 0;
  }
  let movenumber = localStorage.getItem("movenumber");
  val += ` ${turn} ${K + Q + k + q} - ${todraw} ${movenumber}`;
  console.log(val);
}
export {tofen, turn, K, k, Q, q, todraw};
