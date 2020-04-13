var db = require("../models");

module.exports = function(app) {
  //Get all clients
  app.get("/api/clients", function(req, res) {
    db.Client.findAll({}).then(function(dbClients) {
      res.json(dbClients);
    });
  });

  //Find one client by id, include programs
  app.get("/api/client/:clientid", function(req, res) {
    db.Client.findOne({
      include: [{ model: db.Program }],
      where: { id: req.params.clientid }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  // Create a new client
  app.post("/api/clients", function(req, res) {
    db.Client.create(req.body).then(function(dbClients) {
      res.json(dbClients);
    });
  });

  // Delete client by id
  app.delete("/api/client/:id", function(req, res) {
    db.Example.destroy({
      where: { id: req.params.id }
    }).then(function(dbClients) {
      res.json(dbClients);
    });
  });

  //Get all programs
  app.get("/api/programs", function(req, res) {
    db.Program.findAll({}).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Get all programs for a specific user
  app.get("/api/programs/client/:clientid", function(req, res) {
    db.Program.findAll({
      include: [{ model: db.Resource }, { model: db.Client }],
      where: { ClientId: req.params.clientid }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Find one program by id, include resources
  app.get("/api/programs/:programid", function(req, res) {
    db.Program.findOne({
      include: [{ model: db.Resource }],
      where: { ClientId: req.params.programid }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  // Create a new program
  app.post("/api/programs", function(req, res) {
    db.Program.create(req.body).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  // Delete program by id
  app.delete("/api/program/:id", function(req, res) {
    db.Program.destroy({
      where: { id: req.params.id }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Get all resources

  app.get("/api/resources", function(req, res) {
    db.Resource.findAll({}).then(function(dbResources) {
      res.json(dbResources);
    });
  });

  // Create a new resource
  app.post("/api/resources", function(req, res) {
    db.Resource.create(req.body).then(function(dbResources) {
      res.json(dbResources);
    });
  });

  // Delete resource by id
  app.delete("/api/resources/:id", function(req, res) {
    db.Resource.destroy({
      where: { id: req.params.id }
    }).then(function(dbResource) {
      res.json(dbResource);
    });
  });
};
