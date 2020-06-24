var db = require("../models");

module.exports = function(app) {
  //Get all Programs
  app.get("/api/Programs", function(req, res) {
    db.Program.findAll({}).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Find one Program by id, include programs
  app.get("/api/Program/:Programid", function(req, res) {
    db.Program.findOne({
      include: [{ model: db.Program }],
      where: { id: req.params.Programid }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  // Create a new Program
  app.post("/api/Programs", function(req, res) {
    db.Program.create(req.body).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  // Delete Program by id
  app.delete("/api/Program/:id", function(req, res) {
    db.Example.destroy({
      where: { id: req.params.id }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Get all programs
  app.get("/api/programs", function(req, res) {
    db.Program.findAll({}).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Get all programs for a specific user
  app.get("/api/programs/Program/:Programid", function(req, res) {
    db.Program.findAll({
      include: [{ model: db.Resource }, { model: db.Program }],
      where: { ProgramId: req.params.Programid }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  });

  //Find one program by id, include resources
  app.get("/api/programs/:programid", function(req, res) {
    db.Program.findOne({
      include: [{ model: db.Resource }],
      where: { ProgramId: req.params.programid }
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

  //Get resource by program ID
  app.get("/api/resources/program/:id", function(req, res) {
    db.Resource.findAll({
      where: { ProgramId: req.params.id }
    }).then(function(dbResources) {
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
