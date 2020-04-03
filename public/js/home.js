var items = [];
var lastImage;
console.log(items);

function nextImage() {
  imageRoll = Math.floor(Math.random() * occupations.length);
  if (imageRoll === lastImage) {
    nextImage();
  }
  var nextImage = occupations[lastImage];
  console.log(nextImage);
  $("#operant-display").attr("src", nextImage);
  lastImage = imageRoll;
}

$("#nextImage").on("click", nextImage);
