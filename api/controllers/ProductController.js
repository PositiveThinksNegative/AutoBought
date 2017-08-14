'use strict';

var KijijiParser = require('../parser/KijijiParser');

var mongoose = require('mongoose'),
  Product = mongoose.model('Products');

exports.list_all_products = function(req, res) {
  var url = "test"
  makeCall(url, function(results) {
      res.json(results);
  });
};

function makeCall(url, callback) {
  KijijiParser.load_search_results(url, callback);
};  

exports.create_a_product = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.read_a_product = function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.update_a_product = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.delete_a_product = function(req, res) {
  Product.remove({
    _id: req.params.productId
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};