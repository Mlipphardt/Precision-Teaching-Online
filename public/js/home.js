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
    var id = apiPath.split("/");
    console.log(id[4]);
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
    var addOne = $(
      "<button class = 'btn mx-3 mb-5 active rounded-circle bg-success' data-toggle = 'modal' data-target = '#add-modal' id = 'add-" +
        type +
        "'> + </button>"
    );
    $(destination).append(addOne);
    if (type === "program") {
      console.log("yo");
      console.log(id[4]);
      $("#add-program").attr("data-id", id[4]);
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
  event.preventDefault();
  $("#program-list").empty();
  var id = $(this).attr("program-id");
  var resourceTable = $(
    "<table id = 'resource-table'> <tr> <th> Name </th> <th> Link </th> </tr> </table>"
  );
  $("#program-list").append(resourceTable);
  var updateForm = $(
    "<form id = 'update-form> <label for 'resource-name'> Name: </label> <input type = 'text' id = 'resource-name' class = 'm-4' name='resource-name'> <label for = 'resource-link'> Image link: </label> <input type = 'text' class = 'mx-2' id ='resource-link' name = 'resource-link'> </form>"
  );
  $("#operant-holder").append(updateForm);
  var updateButton = $(
    "<button class = 'btn bg-primary mt-2 mx-3' id = 'submit-button' data-id = '" +
      id +
      "'> Submit </button>"
  );
  var returnButton = $(
    "<button class = 'btn bg-primary mt-2 mx-3' id = 'return-button' data-id = '" +
      id +
      "'> Return </button>"
  );
  $("#operant-holder").append(updateButton);
  $("#operant-holder").append(returnButton);
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

$(document).on("click", "#submit-button", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  var newResource = {
    name: $("#resource-name")
      .val()
      .trim(),
    link: $("#resource-link")
      .val()
      .trim(),
    ProgramId: id
  };
  $.post("/api/resources", newResource).then(function() {
    $("#resource-table").empty();
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
        $("#resource-name").val("");
        $("#resource-link").val("");
        $("#resource-table").append(newRow);
      }
    });
  });
});

$(document).on("click", "#return-button", function(event) {
  event.preventDefault();
  $("#program-list").empty();
  $("#operant-holder").empty();
  createOneButton("Update", "#program-list");
  createOneButton("Start", "#program-list");
  createOneButton("Cancel", "#program-list");
  // $(".options-button").attr({ "program-id": id, "client-id": clientId });
});

//Moves image, part of legacy image function
$("#nextImage").on("click", changeTarget);

$(document).on("click", "#add-program", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  $(".modal-title").text("Add a Program");
  $(".modal-body").empty();
  var newEntryForm = $(
    "<form id = 'entry-form' data-id = '" +
      id +
      "'> <label for 'program-name'> Name: </label> <input type = 'text' id = 'program-name' class = 'm-4' name='program-name'> </form>"
  );
  $("#add-entry-button").attr("data-id", id);
  $(".modal-body").append(newEntryForm);
});

$(document).on("click", "#add-entry-button", function(event) {
  event.preventDefault();
  var id = $(this).attr("data-id");
  var newProgram = {
    name: $("#program-name")
      .val()
      .trim(),
    ClientId: id
  };
  $.post("/api/programs", newProgram).then(function() {
    location.reload();
  });
});

//Calls populateButtons to create initial client selection.
populateButtons("/api/clients", "#client-list", "client");
$("#operant-display").hide();
$("#nextImage").hide();
