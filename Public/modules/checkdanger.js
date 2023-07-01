function todanger(position) {
  console.log(position);
  if (document.querySelector(`.${position}`).classList.contains("danger")) {
    return false;
  }
  return true;
}

export {todanger};
