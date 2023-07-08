function movefetch(fen) {
  fetch("http://127.0.0.1:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fen),
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export {movefetch};
