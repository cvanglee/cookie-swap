var db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {
  //Pull all TCMs with SUMID (foreign key) matching SUM ID
  app.get("/api/sums_TCM/:id", function(req, res) {
    db.TCM.findAll({
      where: {
        SUMId: req.params.id
      }
    })
      .then(function(users) {
        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  });

  //See all TCM Inventories
  app.get("/api/tcms/", function(req, res) {
    db.TCM.findAll({})
      .then(function(users) {
        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  });

  //Pull user inventory based on their ID
  app.get("/api/tcms/:id", function(req, res) {
    db.TCM.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(users) {
        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  });

  //See All Open Trades available to claim
  app.get("/api/trades", function(req, res) {
    db.Trade.findAll({   
        where: {
          tcmID_taker: null
        }
    })
      .then(function(users) {
        res.json(users);
        console.log(users);
      })
      .catch(err => res.status(422).json(err));
  });

  //See Your trades that are currently open for someone to take
  app.get("/api/yourOpenTrades/:id", function(req, res) {
    db.Trade.findAll({
      where: {
        tcmID_giver: req.params.id,
        tcmID_taker: null
      }
    })
      .then(function(users) {
        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  });

  //The follow 2 calls could be merged into a single call
  // but this will be done for now for simplicity

  //See the current Users Trades they are the giver
  app.get("/api/outgoingtrades/:id", function(req, res) {
    db.Trade.findAll({
      where: {
        tcmID_giver: req.params.id
      }
    })
      .then(function(users) {
        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  });

  //See the current Users Trades they are the reciever
  app.get("/api/incomingtrades/:id", function(req, res) {
    db.Trade.findAll({
      where: {
        tcmID_taker: req.params.id
      }
    })
      .then(function(users) {
        res.json(users);
      })
      .catch(err => res.status(422).json(err));
  });
};
