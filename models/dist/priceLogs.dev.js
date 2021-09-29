"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var priceLogsSchema = new Schema({
  productName: {
    type: String,
    require: true
  },
  productBarcode: {
    type: String,
    require: true
  },
  productStockCode: {
    type: String,
    require: true
  },
  productTrendyolPrice: {
    type: Number,
    require: true
  },
  productMerchantMinPrice: {
    type: Number,
    require: true
  },
  productChangePrice: {
    type: Number,
    require: true
  },
  productNewPrice: {
    type: Number,
    require: true
  },
  productSystemLog: {
    type: String,
    require: true
  },
  customerMinPrice: {
    type: Number,
    require: true
  },
  customerMaxPrice: {
    type: Number,
    require: true
  },
  customerID: {
    type: Number,
    require: true
  },
  customerOption: {
    type: Number,
    require: true
  },
  updated: {
    type: Date,
    "default": Date.now()
  }
});
var priceLogs = mongoose.model('priceLogs', priceLogsSchema);
module.exports = priceLogs;