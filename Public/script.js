let mode, color, difficulty;

function retrieveinfo() {
  mode = document.querySelector(".mod");
  mode.addEventListener("click", (event) => {
    console.log(event);
  });

  difficulty = document.querySelector(".diff");
  difficulty.addEventListener("click", (event) => {
    console.log(event);
  });

  color = document.querySelector(".col");
  color.addEventListener("click", (event) => {
    console.log(event);
  });
}

retrieveinfo();
