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

function populateClients() {
  $.get("/api/clients").then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newClient = $(
        "<button class = 'btn bg-success mx-3 mb-5 client-button'> " +
          data[i].name +
          "</button>"
      );
      $("#client-list").append(newClient);
    }
  });
}

populateClients();

$("#nextImage").on("click", nextImage);
