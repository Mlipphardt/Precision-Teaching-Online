let occupations = [
  "./assets/images/mechanic.jpg",
  "./assets/images/nurse.jpg",
  "./assets/images/gardener.jpg",
  "./assets/images/pilot.jpg"
];
let kitchenitems = ["./"];
let lastImage;

function nextImage() {
  imageRoll = Math.floor(Math.random() * occupations.length);
  if (imageRoll === lastImage) {
    nextImage();
  }
  let nextImage = occupations[lastImage];
  console.log(nextImage);
  $("#operant-display").attr("src", nextImage);
  lastImage = imageRoll;
}

$("#nextImage").on("click", nextImage);
