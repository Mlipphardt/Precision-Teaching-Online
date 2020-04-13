var targets = [];

//Function to change image source randomly for trials
function nextImageSource() {
  var randomTarget = Math.floor(Math.random() * targets.length);
  var nextTarget = targets[randomTarget];
  console.log(nextTarget);
  $("#operant-display").attr("src", nextTarget);
}

function changeTarget() {
  $("#operant-display").attr("src", "/images/blankscreen.png");
  setTimeout(nextImageSource, 50);
}

//Function to display loading screen to demarcate targets
function loadingScreen() {
  $("#operant-display").attr("src", "/images/blankscreen.png");
}

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

$(document).on("click", "#start-button", function(event) {
  event.preventDefault();
  $("#program-list").empty();
  targets = [];
  var id = $(this).attr("program-id");
  $.get("/api/resources/program/" + id).then(function(data) {
    for (var i = 0; i < data.length; i++) {
      targets.push(data[i].link);
    }
    $("#nextImage").show();
    $("#operant-display").show();
    changeTarget();
  });
});

//Moves image, part of legacy image function
$("#nextImage").on("click", changeTarget);

//Calls populateButtons to create initial client selection.
populateButtons("/api/clients", "#client-list", "client");
$("#operant-display").hide();
$("#nextImage").hide();
