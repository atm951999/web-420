/*
============================================
; Title: Assignment 4.2
; Author: Professor Krasso
; Date: 24 June 2021
; Modified By: Angela Martin
; Description: This program demonstrates the 
; use of Node.js in the Composer API.
===========================================
*/

// Required
const mongoose = require("mongoose");

// Create Schema variable
const Schema = mongoose.Schema;

// Create composerSchema
const composerSchema = new Schema ({
    firstName: String,
    lastName: String
})

// Create Composer - assign mongoose model
const Composer = mongoose.model("Composer", composerSchema);

// Export Composer
module.exports = Composer;

