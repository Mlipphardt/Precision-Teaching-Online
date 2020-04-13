var items = [];
var lastImage;

//Legacy image-moving function
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

/*
function populateClients() {
  $.get("/api/clients").then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newClient = $(
        "<button class = 'btn bg-success mx-3 mb-5 client-button' data-id = '" +
          data[i].id +
          "'> " +
          data[i].name +
          "</button>"
      );
      $("#client-list").append(newClient);
    }
  });
}
*/

/*
$(document).on("click", ".client-button", function() {
  var id = $(this).attr("data-id");
  $.get("/api/programs/client/" + id).then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newProgram = $(
        "<button class = 'btn bg-warning mx-3 mb-5 program-button' data-id = '" +
          data[i].id +
          "'> " +
          data[i].type +
          "</button>"
      );
      $("#program-list").append(newProgram);
    }
  });
});
*/

//Creates buttons from api calls, appends for user.
function populateButtons(apiPath, destination, type) {
  console.log("Creating buttons...");
  $.get(apiPath).then(function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var newButton = $(
        "<button class = 'btn mx-3 mb-5 " +
          type +
          "-button' data-id = '" +
          data[i].id +
          "'> " +
          data[i].name +
          "</button>"
      );
      if (data[i].ClientId) {
        $(newButton).attr("client-id", data[i].ClientId);
      }
      $(destination).append(newButton);
    }
  });
}

function createOneButton(name, destination) {
  var button = $(
    "<button class = 'options-button bg-primary' id = '" +
      name.toLowerCase() +
      "-button'>" +
      name +
      "</button>"
  );
  $(destination).append(button);
}

$(document).on("click", ".client-button", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  $("#program-list").empty();
  populateButtons("/api/programs/client/" + id, "#program-list", "program");
});

$(document).on("click", ".program-button", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  var clientId = $(this).attr("client-id");
  console.log(clientId);
  $("#program-list").empty();
  $("#client-list").empty();
  createOneButton("Update", "#program-list");
  createOneButton("Start", "#program-list");
  createOneButton("Cancel", "#program-list");
  $(".options-button").attr({ "program-id": id, "client-id": clientId });
});

$(document).on("click", "#cancel-button", function(event) {
  event.preventDefault();
  var id = $(this).attr("client-id");
  $("#program-list").empty();
  populateButtons("/api/clients", "#client-list", "client");
  populateButtons("/api/programs/client/" + id, "#program-list", "program");
});

//Moves image, part of legacy image function
$("#nextImage").on("click", nextImage);

//Calls populateButtons to create initial client selection.
populateButtons("/api/clients", "#client-list", "client");
$("#operant-display").hide();
$("#nextImage").hide();
