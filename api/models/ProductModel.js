'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  platform_id: {
    type: String
  },
  product_id: {
    type: String
  },
  client_ids : { 
    type : Array , 
    "default" : [] 
  },
  date: { 
    type: Date, default: Date.now 
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Products', ProductSchema);