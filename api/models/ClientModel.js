'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ClientSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter the name of the client'
  },
  email: {
    type: String,
    Required: 'Enter the email of the client'
  },
  registration_ids : { 
    type : Array, 
    "default" : [] 
  },
  date: { 
    type: Date, default: Date.now 
  },
  update_status: {
    type: [{
      type: String,
      enum: ['pending', 'updated']
    }],
    default: ['pending']
  },
  account_status: {
    type: [{
      type: String,
      enum: ['free', 'trial', 'premium']
    }],
    default: ['free']
  }
});

module.exports = mongoose.model('Clients', ClientSchema);