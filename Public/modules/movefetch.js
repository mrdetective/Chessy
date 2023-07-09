function movefetch(fen) {
  let details = JSON.parse(localStorage.getItem("details"));
  let data = {
    fen: fen,
    difficulty: details["difficulty"],
  };
  fetch("http://127.0.0.1:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return -1;
    });
}

export {movefetch};
