var express = require('express');
var router = express.Router();
var models = require('../models/schemas');
var mongoose = require('mongoose');
var request = require('request');

router.route('/lookup/:query')
.get(function(req, res) {
  var url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=" + req.params.query;
  request.get(url, function(error, response, body) {
    // var results = JSON.parse(body);
    res.send(body);
  })
});

router.route('/quote/:query')
.get(function(req, res) {
  var url = "http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=" + req.params.query;
  request.get(url, function(error, response, body) {
    // var results = JSON.parse(body);
    res.send(body);
  })
});

router.route('/chart/:query')
.get(function(req, res) {
  var url = "http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=" + req.params.query;
  request.get(url, function(error, response, body) {
    // var results = JSON.parse(body);
    res.send(body);
  })
});

module.exports = router;
