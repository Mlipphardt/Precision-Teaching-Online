var db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Program.findAll({}).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  },

  findById: function(req, res) {
    db.Program.findOne({
      include: [{ model: db.Program }],
      where: { id: req.params.Programid }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  },

  create: function(req, res) {
    db.Program.create(req.body).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  },

  update: function(req, res) {
    db.Program.update(req.body, { where: { id: req.params.id } }).then(function(
      dbPrograms
    ) {
      res.json(dbPrograms);
    });
  },

  remove: function(req, res) {
    db.Program.destroy({
      where: { id: req.params.id }
    }).then(function(dbPrograms) {
      res.json(dbPrograms);
    });
  }
};
