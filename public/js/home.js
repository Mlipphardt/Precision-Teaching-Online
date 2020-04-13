var targets = [];

//Function to change image source randomly for trials
function nextImageSource() {
  var randomTarget = Math.floor(Math.random() * targets.length);
  var nextTarget = targets[randomTarget];
  console.log(nextTarget);
  $("#operant-display").attr("src", nextTarget);
}

//Displays black screen to demarcate targets, then changes target source
function changeTarget() {
  $("#operant-display").attr("src", "/images/blankscreen.png");
  setTimeout(nextImageSource, 50);
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

$(document).on("click", "#update-button", function(event) {
  $("#program-list").empty();
  var id = $(this).attr("program-id");
  var resourceTable = $(
    "<table id = 'resource-table'> <tr> <th> Name </th> <th> Link </th> </tr> </table>"
  );
  $("#program-list").append(resourceTable);
  $.get("/api/resources/program/" + id).then(function(data) {
    for (var i = 0; i < data.length; i++) {
      var newRow = $(
        "<tr id = 'table-row-" +
          data[i].id +
          "'> <td>" +
          data[i].name +
          "</td> <td>" +
          data[i].link +
          "</td> <td> <button class = 'delete-resource bg-danger' data-id = " +
          data[i].id +
          " id = 'resource-button-" +
          data[i].id +
          "' > Delete </button> </td> </tr>"
      );
      $("#resource-table").append(newRow);
    }
  });
});

$(document).on("click", ".delete-resource", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  $.ajax({
    url: "/api/resources/" + id,
    type: "DELETE"
  }).then(function() {
    $("#table-row-" + id).remove();
  });
});

//Moves image, part of legacy image function
$("#nextImage").on("click", changeTarget);

//Calls populateButtons to create initial client selection.
populateButtons("/api/clients", "#client-list", "client");
$("#operant-display").hide();
$("#nextImage").hide();
